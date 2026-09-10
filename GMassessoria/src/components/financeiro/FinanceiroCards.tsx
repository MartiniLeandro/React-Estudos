import { FiFileText, FiDollarSign, FiAlertTriangle } from 'react-icons/fi';
import type { FinanceiroResumoDTO } from '../../services/financeiroService';

interface FinanceiroCardsProps {
  resumo: FinanceiroResumoDTO | null;
  loading?: boolean;
}

export default function FinanceiroCards({ resumo, loading }: FinanceiroCardsProps) {
  const formatCurrency = (value?: number) => {
    if (value === undefined || value === null) return 'R$ 0,00';
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const cards = [
    {
      title: 'Previsão de Faturamento',
      value: formatCurrency(resumo?.faturamentoPrevisto),
      description: 'Previsto para o mês',
      icon: <FiFileText className="text-red-500" size={24} />,
      bgIcon: 'bg-red-500/10'
    },
    {
      title: 'Receita Recebida',
      value: formatCurrency(resumo?.faturamentoRecebido),
      description: 'Recebido no mês',
      icon: <FiDollarSign className="text-green-500" size={24} />,
      bgIcon: 'bg-green-500/10'
    },
    {
      title: 'A Receber',
      value: formatCurrency(resumo?.faturamentoReceber),
      description: 'Receita que falta ser recebida',
      icon: <FiDollarSign className="text-yellow-500" size={24} />,
      bgIcon: 'bg-yellow-500/10'
    },
    {
      title: 'Inadimplência',
      value: formatCurrency(resumo?.inadimplenciaTotal ?? resumo?.inadimplenciaTotal),
      description: 'Total em atraso',
      icon: <FiAlertTriangle className="text-red-500" size={24} />,
      bgIcon: 'bg-red-500/10'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
      {cards.map((card, idx) => (
        <div key={idx} className="bg-[#121212] border border-zinc-800 rounded-xl px-4 py-3 flex items-center justify-between hover:border-zinc-700 transition-colors cursor-pointer group relative overflow-hidden">
          {loading ? (
            <div className="absolute inset-0 bg-[#1A1A1A] animate-pulse flex items-center gap-3 px-4 py-3">
              <div className="w-10 h-10 rounded-full bg-zinc-800 shrink-0" />
              <div className="flex flex-col gap-2 w-full">
                <div className="h-2.5 bg-zinc-800 rounded w-20" />
                <div className="h-5 bg-zinc-800 rounded w-28" />
                <div className="h-2 bg-zinc-800 rounded w-32" />
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${card.bgIcon}`}>
                {card.icon}
              </div>
              <div className="flex flex-col justify-center">
                <p className="text-zinc-400 text-[11px] leading-tight">{card.title}</p>
                <h3 className={`font-bold text-lg md:text-xl leading-tight ${card.title === 'Receita Recebida' ? 'text-green-500' : card.title === 'Inadimplência' ? 'text-red-500' : card.title === 'A Receber' ? 'text-yellow-500' : 'text-white'}`}>
                  {card.value}
                </h3>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <p className="text-zinc-500 text-[10px] truncate max-w-[120px]">{card.description}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
