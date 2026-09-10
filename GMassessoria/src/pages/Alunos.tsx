import { useState, useEffect, useCallback, useRef } from 'react';
import AlunosHeader from '../components/alunos/AlunosHeader';
import AlunosCards from '../components/alunos/AlunosCards';
import AlunosFilters from '../components/alunos/AlunosFilters';
import type { AlunoFiltros } from '../components/alunos/AlunosFilters';
import AlunosTable from '../components/alunos/AlunosTable';
import CreateAlunoModal from '../components/alunos/CreateAlunoModal';
import { alunosService } from '../services/alunosService';
import type { AlunoListagemView, AlunoCardsDTO } from '../services/alunosService';

export default function Alunos() {
  const [alunos, setAlunos] = useState<AlunoListagemView[]>([]);
  const [resumo, setResumo] = useState<AlunoCardsDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortField, setSortField] = useState<string>('nome');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const [filtros, setFiltros] = useState<AlunoFiltros>({
    nome: '',
    plano: 'Todos',
    statusAluno: 'Todos',
    statusFinanceiro: 'Todos',
    tempoRestante: 'Todos',
    inicioMin: '',
    inicioMax: '',
    fimMin: '',
    fimMax: ''
  });

  const handleFilterChange = (key: keyof AlunoFiltros, value: string) => {
    setFiltros(prev => ({ ...prev, [key]: value }));
  };

  const handleClearFilters = () => {
    setFiltros({
      nome: '',
      plano: 'Todos',
      statusAluno: 'Todos',
      statusFinanceiro: 'Todos',
      tempoRestante: 'Todos',
      inicioMin: '',
      inicioMax: '',
      fimMin: '',
      fimMax: ''
    });
  };

  const fetchDados = useCallback(async () => {
    setLoading(true);
    try {
      const queryParams: any = {};
      
      if (filtros.nome && filtros.nome.trim() !== '') {
        queryParams.nome = filtros.nome.trim();
      }

      if (filtros.plano && filtros.plano !== 'Todos') {
        queryParams.plano = filtros.plano;
      }
      
      if (filtros.statusAluno && filtros.statusAluno !== 'Todos') {
        queryParams.statusAluno = filtros.statusAluno.toUpperCase();
      }

      if (filtros.statusFinanceiro && filtros.statusFinanceiro !== 'Todos') {
        queryParams.statusFinanceiro = filtros.statusFinanceiro.toUpperCase().replace(' ', '_');
      }

      if (filtros.tempoRestante && filtros.tempoRestante !== 'Todos') {
        if (filtros.tempoRestante === 'Expirado') {
          queryParams.maxDias = -1;
        } else if (filtros.tempoRestante === 'Crítico') {
          queryParams.minDias = 0;
          queryParams.maxDias = 4;
        } else if (filtros.tempoRestante === 'Atenção') {
          queryParams.minDias = 5;
          queryParams.maxDias = 15;
        } else if (filtros.tempoRestante === 'Seguro') {
          queryParams.minDias = 16;
        }
      }

      if (filtros.inicioMin) queryParams.inicioMin = filtros.inicioMin;
      if (filtros.inicioMax) queryParams.inicioMax = filtros.inicioMax;
      if (filtros.fimMin) queryParams.fimMin = filtros.fimMin;
      if (filtros.fimMax) queryParams.fimMax = filtros.fimMax;

      if (sortField) {
        queryParams.sort = `${sortField},${sortDirection}`;
      }

      const [alunosData, resumoData] = await Promise.all([
        alunosService.getAlunos(queryParams),
        alunosService.getResumo()
      ]);

      console.log('=== DEBUG ALUNOS API ===');
      console.log('Filtros enviados na URL:', queryParams);
      console.log('Resposta da API (alunosData):', alunosData);
      console.log('========================');
      
      setAlunos(alunosData);
      setResumo(resumoData);
    } catch (error) {
      console.error('Erro ao buscar dados dos alunos:', error);
    } finally {
      setLoading(false);
    }
  }, [filtros, sortField, sortDirection]);

  const prevFiltros = useRef(filtros);

  useEffect(() => {
    let timerId: ReturnType<typeof setTimeout>;

    if (prevFiltros.current === filtros) {
      fetchDados();
    } else if (prevFiltros.current.nome !== filtros.nome) {
      timerId = setTimeout(() => {
        fetchDados();
      }, 400);
    } else {
      fetchDados();
    }

    prevFiltros.current = filtros;

    return () => {
      if (timerId) clearTimeout(timerId);
    };
  }, [fetchDados, filtros, sortField, sortDirection]);

  return (
    <div className="p-4 w-full h-full flex flex-col gap-3 text-white overflow-hidden relative">
      <div className="shrink-0 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="w-full">
          <AlunosHeader onOpenModal={() => setIsModalOpen(true)} />
        </div>
      </div>
      
      <div className="shrink-0"><AlunosCards resumo={resumo} loading={loading} /></div>
      <div className="shrink-0">
        <AlunosFilters 
          filtros={filtros} 
          onChange={handleFilterChange} 
          onClear={handleClearFilters} 
        />
      </div>
      <div className="flex-1 min-h-0">
        <AlunosTable 
          alunos={alunos} 
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
      
      <CreateAlunoModal 
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
