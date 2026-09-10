import { useState, useEffect, useCallback, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import FinanceiroHeader from '../components/financeiro/FinanceiroHeader';
import FinanceiroCards from '../components/financeiro/FinanceiroCards';
import FinanceiroCharts from '../components/financeiro/FinanceiroCharts';
import FinanceiroFilters from '../components/financeiro/FinanceiroFilters';
import FinanceiroTable from '../components/financeiro/FinanceiroTable';
import financeiroService from '../services/financeiroService';
import type { FinanceiroResumoDTO, ListagemFaturasDTO } from '../services/financeiroService';

export default function Financeiro() {
  const location = useLocation();
  const tableRef = useRef<HTMLDivElement>(null);
  const currentDate = new Date();
  const [month, setMonth] = useState(location.state?.mes || currentDate.getMonth() + 1);
  const [year, setYear] = useState(location.state?.ano || currentDate.getFullYear());

  const [searchName, setSearchName] = useState(location.state?.aluno || '');
  const [statusFilter, setStatusFilter] = useState('Todos');
  const [sortField, setSortField] = useState('aluno');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [isAtBottom, setIsAtBottom] = useState(false);

  const [resumo, setResumo] = useState<FinanceiroResumoDTO | null>(null);
  const [faturas, setFaturas] = useState<ListagemFaturasDTO[]>([]);

  const [loadingResumo, setLoadingResumo] = useState(true);
  const [loadingFaturas, setLoadingFaturas] = useState(true);

  const fetchResumo = useCallback(async () => {
    setLoadingResumo(true);
    try {
      const data = await financeiroService.getResumoFinanceiro(month, year);
      setResumo(data);
    } catch (error) {
      console.error("Erro ao buscar resumo financeiro:", error);
    } finally {
      setLoadingResumo(false);
    }
  }, [month, year]);

  const fetchListagem = useCallback(async () => {
    setLoadingFaturas(true);
    try {
      const data = await financeiroService.getListagemFaturas({
        mes: month,
        ano: year,
        nomeAluno: searchName || undefined,
        status: statusFilter && statusFilter !== 'Todos' ? statusFilter.toUpperCase() : undefined,
        sort: `${sortField},${sortDirection}`
      });
      setFaturas(data);
    } catch (error) {
      console.error("Erro ao buscar listagem de faturas:", error);
    } finally {
      setLoadingFaturas(false);
    }
  }, [month, year, searchName, statusFilter, sortField, sortDirection]);

  useEffect(() => {
    fetchResumo();
  }, [fetchResumo]);

  const prevSearchName = useRef(searchName);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    if (searchName !== prevSearchName.current) {
      timeoutId = setTimeout(() => {
        fetchListagem();
      }, 400);
    } else {
      fetchListagem();
    }

    prevSearchName.current = searchName;

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [fetchListagem, searchName]);

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  useEffect(() => {
    if (location.state?.scrollToFaturas && tableRef.current) {
      setTimeout(() => {
        tableRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
    }
    if (location.state?.mes) setMonth(location.state.mes);
    if (location.state?.ano) setYear(location.state.ano);
    if (location.state?.aluno !== undefined) setSearchName(location.state.aluno);
  }, [location.state]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (Math.ceil(scrollTop + clientHeight) >= scrollHeight - 5) {
      if (!isAtBottom) setIsAtBottom(true);
    } else {
      if (isAtBottom) setIsAtBottom(false);
    }
  };

  return (
    <div 
      id="financeiro-main-scroll"
      className="p-4 w-full h-full text-white overflow-y-auto custom-scrollbar bg-[#0A0A0A]"
      onScroll={handleScroll}
    >
      {}
      <div className="flex flex-col gap-3">
        <FinanceiroHeader month={month} year={year} onMonthChange={setMonth} onYearChange={setYear} />
        <FinanceiroCards resumo={resumo} loading={loadingResumo} />
        <FinanceiroCharts resumo={resumo} loading={loadingResumo} month={month} year={year} />
      </div>

      {}
      <div ref={tableRef} className="flex flex-col gap-3 h-[calc(100%-1rem)] pt-3">
        <div className="shrink-0">
          <FinanceiroFilters
            searchName={searchName}
            onSearchNameChange={setSearchName}
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
            onClear={() => {
              setSearchName('');
              setStatusFilter('Todos');
              setSortField('aluno');
              setSortDirection('asc');
            }}
          />
        </div>
        <div className="flex-1 min-h-0">
          <FinanceiroTable
            faturas={faturas}
            loading={loadingFaturas}
            onRefresh={() => { fetchResumo(); fetchListagem(); }}
            month={month}
            year={year}
            onMonthChange={setMonth}
            onYearChange={setYear}
            sortField={sortField}
            sortDirection={sortDirection}
            onSort={handleSort}
            isScrollable={isAtBottom}
          />
        </div>
      </div>
    </div>
  );
}
