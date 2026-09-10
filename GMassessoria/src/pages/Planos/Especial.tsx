import { useState, useEffect, useCallback, useRef } from 'react';
import EspecialHeader from '../../components/especial/EspecialHeader';
import EspecialCards from '../../components/especial/EspecialCards';
import EspecialFilters, { type ContratosFiltrosState } from '../../components/especial/EspecialFilters';
import EspecialTable from '../../components/especial/EspecialTable';
import CreateContratoModal from '../../components/contratos/CreateContratoModal';
import { contratosService } from '../../services/contratosService';
import type { ContratoListagemView, ContratoCardsDTO } from '../../services/contratosService';

export default function Especial() {
  const [contratos, setContratos] = useState<ContratoListagemView[]>([]);
  const [resumo, setResumo] = useState<ContratoCardsDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [sortField, setSortField] = useState<string>('nomeAluno');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  
  const [filtros, setFiltros] = useState<ContratosFiltrosState>({
    nomeAluno: '',
    statusContrato: 'Todos',
    situacaoFinanceira: 'Todas',
    cicloPlano: 'Todos',
    tempoRestante: 'Todos',
  });
  
  const filtrosRef = useRef(filtros);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [defaultAlunoNome, setDefaultAlunoNome] = useState<string | undefined>();

  const handleRenovar = (nomeAluno: string) => {
    setDefaultAlunoNome(nomeAluno);
    setIsModalOpen(true);
  };

  const fetchDados = useCallback(async (currentFiltros: ContratosFiltrosState = filtrosRef.current) => {
    setLoading(true);
    try {
      const queryParams: any = { planoCategoria: 'ESPECIAL' };
      
      if (currentFiltros.nomeAluno && currentFiltros.nomeAluno.trim() !== '') {
        queryParams.nomeAluno = currentFiltros.nomeAluno.trim();
      }
      if (currentFiltros.statusContrato !== 'Todos') {
        queryParams.statusContrato = currentFiltros.statusContrato;
      }
      if (currentFiltros.situacaoFinanceira !== 'Todas') {
        queryParams.situacaoFinanceira = currentFiltros.situacaoFinanceira;
      }
      if (currentFiltros.cicloPlano !== 'Todos') {
        queryParams.cicloPlano = currentFiltros.cicloPlano;
      }
      if (currentFiltros.tempoRestante && currentFiltros.tempoRestante !== 'Todos') {
        if (currentFiltros.tempoRestante === 'Expirado') {
          queryParams.maxDiasRestantes = -1;
        } else if (currentFiltros.tempoRestante === 'Crítico') {
          queryParams.minDiasRestantes = 0;
          queryParams.maxDiasRestantes = 4;
        } else if (currentFiltros.tempoRestante === 'Atenção') {
          queryParams.minDiasRestantes = 5;
          queryParams.maxDiasRestantes = 15;
        } else if (currentFiltros.tempoRestante === 'Seguro') {
          queryParams.minDiasRestantes = 16;
        }
      }

      if (sortField) {
        queryParams.sort = `${sortField},${sortDirection}`;
      }

      const [lista, cards] = await Promise.all([
        contratosService.getContratos(queryParams),
        contratosService.getResumo('ESPECIAL')
      ]);
      const ativos = lista.filter((c: any) => c.statusContrato === 'ATIVO');
      const naoAtivos = lista.filter((c: any) => c.statusContrato !== 'ATIVO');
      setContratos([...ativos, ...naoAtivos]);
      setResumo(cards);
    } catch (error) {
      console.error('Erro ao buscar dados de Especial:', error);
    } finally {
      setLoading(false);
    }
  }, [sortField, sortDirection]);

  useEffect(() => {
    const isNameChange = filtros.nomeAluno !== filtrosRef.current.nomeAluno;
    const isOtherFilterChange = 
      filtros.statusContrato !== filtrosRef.current.statusContrato ||
      filtros.situacaoFinanceira !== filtrosRef.current.situacaoFinanceira ||
      filtros.cicloPlano !== filtrosRef.current.cicloPlano ||
      filtros.tempoRestante !== filtrosRef.current.tempoRestante;

    filtrosRef.current = filtros;

    if (isNameChange) {
      const timeoutId = setTimeout(() => {
        fetchDados(filtros);
      }, 400);
      return () => clearTimeout(timeoutId);
    } else if (isOtherFilterChange) {
      fetchDados(filtros);
    } else {
      fetchDados(filtros);
    }
  }, [fetchDados, sortField, sortDirection, filtros]);

  const handleFilterChange = (field: string, value: string) => {
    setFiltros(prev => ({ ...prev, [field]: value }));
  };

  const handleClearFilters = () => {
    setFiltros({
      nomeAluno: '',
      statusContrato: 'Todos',
      situacaoFinanceira: 'Todas',
      cicloPlano: 'Todos',
      tempoRestante: 'Todos',
    });
  };

  return (
    <div className="p-4 w-full h-full flex flex-col gap-3 text-white overflow-hidden bg-[#0A0A0A] relative">
      <div className="shrink-0"><EspecialHeader onOpenModal={() => { setDefaultAlunoNome(undefined); setIsModalOpen(true); }} /></div>
      <div className="shrink-0"><EspecialCards resumo={resumo} loading={loading} /></div>
      <div className="shrink-0">
        <EspecialFilters 
          filtros={filtros}
          onChange={handleFilterChange}
          onClear={handleClearFilters}
        />
      </div>
      <div className="flex-1 min-h-0">
        <EspecialTable 
          contratos={contratos} 
          loading={loading} 
          onRefresh={fetchDados} 
          onRenovar={handleRenovar} 
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

      <CreateContratoModal 
        isOpen={isModalOpen} 
        onClose={() => { setIsModalOpen(false); setDefaultAlunoNome(undefined); }} 
        onSuccess={() => {
          setIsModalOpen(false);
          setDefaultAlunoNome(undefined);
          fetchDados();
        }}
        defaultCategoria="Especial"
        defaultAlunoNome={defaultAlunoNome}
      />
    </div>
  );
}
