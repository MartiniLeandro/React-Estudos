import {
  FiBarChart2,
  FiDollarSign,
  FiAlertTriangle,
  FiUsers,
  FiCalendar,
  FiUserPlus
} from 'react-icons/fi';
import type { ResumoCardsDashboardDTO } from '../../services/dashboardService';

interface KPICardsProps {
  resumo: ResumoCardsDashboardDTO | null;
  loading?: boolean;
}

export default function KPICards({ resumo, loading }: KPICardsProps) {
  const formatCurrency = (val?: number) => {
    if (val == null) return 'R$ 0,00';
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-[#121212] border border-zinc-800/60 p-4 rounded-xl flex flex-col justify-between h-[104px]">
            <div className="w-9 h-9 rounded-md bg-zinc-800/50 mb-3 animate-pulse"></div>
            <div className="space-y-2">
              <div className="h-3 bg-zinc-800 rounded w-20 animate-pulse"></div>
              <div className="h-5 bg-zinc-800 rounded w-16 animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {}
      <div className="bg-[#121212] border border-zinc-800/60 p-4 rounded-xl flex flex-col justify-between hover:border-blue-500/50 transition-colors">
        <div className="w-9 h-9 rounded-md bg-blue-500/10 flex items-center justify-center mb-3">
          <FiBarChart2 className="text-blue-500 text-lg" />
        </div>
        <div>
          <p className="text-zinc-400 text-xs mb-1">Previsão de Faturamento</p>
          <p className="text-xl font-bold text-white">{formatCurrency(resumo?.faturamentoPrevisto)}</p>
        </div>
      </div>

      {}
      <div className="bg-[#121212] border border-zinc-800/60 p-4 rounded-xl flex flex-col justify-between hover:border-green-500/50 transition-colors">
        <div className="w-9 h-9 rounded-md bg-green-500/10 flex items-center justify-center mb-3">
          <FiDollarSign className="text-green-500 text-lg" />
        </div>
        <div>
          <p className="text-zinc-400 text-xs mb-1">Receita Recebida</p>
          <p className="text-xl font-bold text-green-400">{formatCurrency(resumo?.faturamentoRecebido)}</p>
        </div>
      </div>

      {}
      <div className="bg-[#121212] border border-zinc-800/60 p-4 rounded-xl flex flex-col justify-between hover:border-red-500/50 transition-colors">
        <div className="w-9 h-9 rounded-md bg-red-500/10 flex items-center justify-center mb-3">
          <FiAlertTriangle className="text-red-500 text-lg" />
        </div>
        <div>
          <p className="text-zinc-400 text-xs mb-1">Inadimplência</p>
          <p className="text-xl font-bold text-red-400">{formatCurrency(resumo?.inadimplenciaTotal)}</p>
        </div>
      </div>

      {}
      <div className="bg-[#121212] border border-zinc-800/60 p-4 rounded-xl flex flex-col justify-between hover:border-purple-500/50 transition-colors">
        <div className="w-9 h-9 rounded-md bg-purple-500/10 flex items-center justify-center mb-3">
          <FiUsers className="text-purple-500 text-lg" />
        </div>
        <div>
          <p className="text-zinc-400 text-xs mb-1">Alunos Ativos</p>
          <p className="text-xl font-bold text-white">{resumo?.alunosAtivos ?? 0}</p>
        </div>
      </div>

      {}
      <div className="bg-[#121212] border border-zinc-800/60 p-4 rounded-xl flex flex-col justify-between hover:border-orange-500/50 transition-colors">
        <div className="w-9 h-9 rounded-md bg-orange-500/10 flex items-center justify-center mb-3">
          <FiCalendar className="text-orange-500 text-lg" />
        </div>
        <div>
          <p className="text-zinc-400 text-xs mb-1">Contratos a Vencer</p>
          <p className="text-xl font-bold text-orange-400">{resumo?.contratosVencendo ?? 0}</p>
        </div>
      </div>

      {}
      <div className="bg-[#121212] border border-zinc-800/60 p-4 rounded-xl flex flex-col justify-between hover:border-emerald-500/50 transition-colors">
        <div className="w-9 h-9 rounded-md bg-emerald-500/10 flex items-center justify-center mb-3">
          <FiUserPlus className="text-emerald-500 text-lg" />
        </div>
        <div>
          <p className="text-zinc-400 text-xs mb-1">Novos Alunos</p>
          <p className="text-xl font-bold text-emerald-400">{resumo?.novosAlunos ?? 0}</p>
        </div>
      </div>
    </div>
  );
}


