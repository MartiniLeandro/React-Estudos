import { useState, useEffect, useCallback } from 'react';
import KPICards from '../components/dashboard/KPICards';
import StudentsGrowthChart from '../components/dashboard/StudentsGrowthChart';
import PlanDistributionChart from '../components/dashboard/PlanDistributionChart';
import ExpiringContractsTable from '../components/dashboard/ExpiringContractsTable';
import MonthYearPicker from '../components/common/MonthYearPicker';
import { dashboardService } from '../services/dashboardService';
import type { 
  ResumoCardsDashboardDTO, 
  AlunosPorPlanoDTO, 
  EvolucaoAlunosDTO, 
  AlunosContratosProximoFimListagemDTO 
} from '../services/dashboardService';

export default function Dashboard() {
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());

  const [resumo, setResumo] = useState<ResumoCardsDashboardDTO | null>(null);
  const [distribuicao, setDistribuicao] = useState<AlunosPorPlanoDTO[]>([]);
  const [evolucao, setEvolucao] = useState<EvolucaoAlunosDTO[]>([]);
  const [contratosVencendo, setContratosVencendo] = useState<AlunosContratosProximoFimListagemDTO[]>([]);
  
  const [loading, setLoading] = useState(true);
  const [loadingEvo, setLoadingEvo] = useState(true);

  const [growthYear, setGrowthYear] = useState(new Date().getFullYear());

  const fetchDashboard = useCallback(async () => {
    setLoading(true);
    try {
      const [cards, planos, vencendo] = await Promise.all([
        dashboardService.getResumoCards(month, year),
        dashboardService.getDistribuicaoPlanos(month, year),
        dashboardService.getContratosVencendo(month, year)
      ]);
      setResumo(cards);
      setDistribuicao(planos);
      setContratosVencendo(vencendo);
    } catch (error) {
      console.error("Erro ao buscar dados principais do dashboard:", error);
    } finally {
      setLoading(false);
    }
  }, [month, year]);

  const fetchEvolucao = useCallback(async () => {
    setLoadingEvo(true);
    try {
      const evo = await dashboardService.getEvolucao(growthYear);
      setEvolucao(evo);
    } catch (error) {
      console.error("Erro ao buscar evolução:", error);
    } finally {
      setLoadingEvo(false);
    }
  }, [growthYear]);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  useEffect(() => {
    fetchEvolucao();
  }, [fetchEvolucao]);

  return (
    <div className="p-4 md:p-6 w-full min-h-full text-white flex flex-col gap-5 bg-[#0A0A0A]">
      {}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-zinc-400 mt-1 text-xs md:text-sm">Panorama financeiro e operacional da assessoria.</p>
        </div>
        <MonthYearPicker 
          month={month} 
          year={year} 
          onChange={(m, y) => {
            setMonth(m);
            setYear(y);
          }} 
        />
      </div>

      {}
      <div className="w-full">
        <KPICards resumo={resumo} loading={loading} />
      </div>

      {}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 min-h-[250px]">
          <StudentsGrowthChart 
            data={evolucao} 
            loading={loadingEvo} 
            year={growthYear} 
            onYearChange={setGrowthYear} 
          />
        </div>
        <div className="min-h-[250px]">
          <PlanDistributionChart data={distribuicao} loading={loading} />
        </div>
      </div>

      {}
      <div className="w-full min-h-[300px]">
        <ExpiringContractsTable contratos={contratosVencendo} loading={loading} />
      </div>
    </div>
  );
}





