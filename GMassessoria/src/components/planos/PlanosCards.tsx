import { FiUsers, FiCheckCircle, FiLayers, FiDollarSign } from 'react-icons/fi';
import type { PlanoCardsDTO } from '../../services/planosService';

interface PlanosCardsProps {
  resumo: PlanoCardsDTO | null;
  loading?: boolean;
}

export default function PlanosCards({ resumo, loading }: PlanosCardsProps) {
  const formatCurrency = (val: number) => {
    if (val == null) return 'R$ 0,00';
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
  };
  const cards = [
    {
      title: 'Total de Planos',
      value: resumo?.totalPlanos ?? 0,
      description: 'Todos os planos cadastrados',
      icon: <FiUsers className="text-red-500" size={24} />,
      bgIcon: 'bg-red-500/10'
    },
    {
      title: 'Planos Ativos',
      value: resumo?.planosAtivos ?? 0,
      description: 'Planos disponíveis e ativos',
      icon: <FiCheckCircle className="text-green-500" size={24} />,
      bgIcon: 'bg-green-500/10'
    },
    {
      title: 'Valor Médio Base',
      value: formatCurrency(resumo?.mediaValor ?? 0),
      description: 'Média de todos os planos',
      icon: <FiDollarSign className="text-blue-500" size={24} />,
      bgIcon: 'bg-blue-500/10'
    },
    {
      title: 'Maior Valor Base',
      value: formatCurrency(resumo?.maiorValor ?? 0),
      description: 'Entre todos os planos',
      icon: <FiDollarSign className="text-red-500" size={24} />,
      bgIcon: 'bg-red-500/10'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
      {cards.map((card, idx) => (
        <div key={idx} className="bg-[#121212] border border-zinc-800 rounded-xl px-4 py-3 flex items-center justify-between hover:border-zinc-700 transition-colors cursor-pointer group">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${card.bgIcon}`}>
              {card.icon}
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-zinc-400 text-[11px] leading-tight">{card.title}</p>
              {loading ? (
                <div className="h-6 w-16 bg-zinc-800 rounded animate-pulse mt-1"></div>
              ) : (
                <h3 className="text-white font-bold text-lg md:text-xl leading-tight">{card.value}</h3>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
