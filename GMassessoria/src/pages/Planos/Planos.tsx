import { useState, useEffect, useCallback, useRef } from 'react';
import { planosService } from '../../services/planosService';
import PlanosHeader from '../../components/planos/PlanosHeader';
import PlanosCards from '../../components/planos/PlanosCards';
import PlanosFilters from '../../components/planos/PlanosFilters';
import type { PlanoFiltros } from '../../components/planos/PlanosFilters';
import PlanosTable from '../../components/planos/PlanosTable';
import CreatePlanoModal from '../../components/planos/CreatePlanoModal';

export default function Planos() {
  const [planos, setPlanos] = useState<any[]>([]);
  const [resumo, setResumo] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortField, setSortField] = useState<string>('nome');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const [filtros, setFiltros] = useState<PlanoFiltros>({
    nome: '',
    modalidade: 'Todas',
    ciclo: 'Todos',
    status: 'Todos'
  });

  const handleFilterChange = (key: keyof PlanoFiltros, value: string) => {
    setFiltros(prev => ({ ...prev, [key]: value }));
  };

  const handleClearFilters = () => {
    setFiltros({
      nome: '',
      modalidade: 'Todas',
      ciclo: 'Todos',
      status: 'Todos'
    });
  };

  const fetchDados = useCallback(async () => {
    setLoading(true);
    try {
      const queryParams: any = {};

      if (filtros.nome && filtros.nome.trim() !== '') {
        queryParams.nome = filtros.nome.trim();
      }
      if (filtros.modalidade && filtros.modalidade !== 'Todas') {
        const mod = filtros.modalidade.toUpperCase();
        queryParams.planoCategoria = mod === 'NUTRIÇÃO' ? 'NUTRICAO' : mod;
      }
      if (filtros.ciclo && filtros.ciclo !== 'Todos') {
        queryParams.ciclo = filtros.ciclo.toUpperCase();
      }
      if (filtros.status && filtros.status !== 'Todos') {
        queryParams.status = filtros.status.toUpperCase();
      }

      if (sortField) {
        queryParams.sort = `${sortField},${sortDirection}`;
      }

      const [planosData, resumoData] = await Promise.all([
        planosService.getPlanos(queryParams),
        planosService.getResumo()
      ]);
      setPlanos(planosData);
      setResumo(resumoData);
    } catch (error) {
      console.error('Erro ao buscar dados dos planos:', error);
    } finally {
      setLoading(false);
    }
  }, [filtros, sortField, sortDirection]);

  const prevFiltros = useRef(filtros);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    if (prevFiltros.current === filtros) {
      fetchDados();
    } else if (prevFiltros.current.nome !== filtros.nome) {
      timeoutId = setTimeout(() => {
        fetchDados();
      }, 400);
    } else {
      fetchDados();
    }

    prevFiltros.current = filtros;

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [fetchDados, filtros, sortField, sortDirection]);

  return (
    <div className="p-4 w-full h-full flex flex-col gap-3 text-white overflow-hidden bg-[#0A0A0A] relative">
      <div className="shrink-0"><PlanosHeader onOpenModal={() => setIsModalOpen(true)} /></div>
      <div className="shrink-0"><PlanosCards resumo={resumo} loading={loading} /></div>
      <div className="shrink-0">
        <PlanosFilters 
          filtros={filtros}
          onChange={handleFilterChange}
          onClear={handleClearFilters}
        />
      </div>
      <div className="flex-1 min-h-0">
        <PlanosTable 
          planos={planos} 
          loading={loading} 
          onRefresh={fetchDados} 
          sortField={sortField}
          sortDirection={sortDirection}
          onSort={(field) => {
            if (sortField === field) {
              setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
            } else {
              setSortField(field);
              setSortDirection('asc');
            }
          }}
        />
      </div>

      <CreatePlanoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => {
          setIsModalOpen(false);
          fetchDados();
        }}
      />
    </div>
  );
}
