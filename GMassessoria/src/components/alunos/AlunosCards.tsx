import { FiUsers, FiCheckCircle, FiClock, FiAlertTriangle, FiChevronRight } from 'react-icons/fi';
import type { AlunoCardsDTO } from '../../services/alunosService';

interface AlunosCardsProps {
  resumo: AlunoCardsDTO | null;
  loading?: boolean;
}

export default function AlunosCards({ resumo, loading }: AlunosCardsProps) {
  const cards = [
    {
      title: 'Total de Alunos',
      value: resumo?.quantidadeAlunos ?? 0,
      description: 'Todos os alunos cadastrados',
      icon: <FiUsers className="text-red-500" size={24} />,
      bgIcon: 'bg-red-500/10'
    },
    {
      title: 'Contratos Ativos',
      value: resumo?.contratosAtivos ?? 0,
      description: 'Alunos com contrato ativo',
      icon: <FiCheckCircle className="text-green-500" size={24} />,
      bgIcon: 'bg-green-500/10'
    },
    {
      title: 'Próximos do fim',
      value: resumo?.proximosFim ?? 0,
      description: 'Contratos terminam em breve',
      icon: <FiClock className="text-yellow-500" size={24} />,
      bgIcon: 'bg-yellow-500/10',
      actionIcon: <FiChevronRight className="text-zinc-500" size={20} />
    },
    {
      title: 'Inadimplentes',
      value: resumo?.inadimplentes ?? 0,
      description: 'Com pagamentos em atraso',
      icon: <FiAlertTriangle className="text-red-500" size={24} />,
      bgIcon: 'bg-red-500/10'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
      {cards.map((card, idx) => (
        <div key={idx} className="bg-[#121212] border border-zinc-800 rounded-xl px-4 py-3 flex items-center justify-between hover:border-zinc-700 transition-colors cursor-pointer group">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${card.bgIcon}`}>
              {card.icon}
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-zinc-400 text-[11px] leading-tight">{card.title}</p>
              {loading ? (
                <div className="h-6 w-12 bg-zinc-800 rounded animate-pulse mt-1"></div>
              ) : (
                <h3 className="text-white font-bold text-lg md:text-xl leading-tight">{card.value}</h3>
              )}
            </div>
          </div>
          {card.actionIcon && (
            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
              {card.actionIcon}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
