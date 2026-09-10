import { FiMoreHorizontal } from 'react-icons/fi';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import type { AlunosPorPlanoDTO } from '../../services/dashboardService';

interface PlanDistributionChartProps {
  data: AlunosPorPlanoDTO[];
  loading?: boolean;
}

export default function PlanDistributionChart({ data, loading }: PlanDistributionChartProps) {
  const totalStudents = data.reduce((acc, curr) => acc + curr.quantidadeAlunos, 0);

  const formatPlanoName = (name: string) => {
    if (!name) return 'Desconhecido';
    const upper = name.toUpperCase();
    if (upper === 'NUTRICAO' || upper === 'NUTRIÇÃO') return 'Nutrição';
    if (upper === 'PERSONAL_TRAINER' || upper === 'PERSONAL TRAINER') return 'Personal Trainer';
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };

  const getColor = (plano: string) => {
    switch (plano.toUpperCase()) {
      case 'CORRIDA': return 'bg-red-500';
      case 'NUTRICAO':
      case 'NUTRIÇÃO': return 'bg-blue-500';
      case 'ESPECIAL': return 'bg-green-500';
      case 'PERSONAL_TRAINER':
      case 'PERSONAL TRAINER': return 'bg-purple-500';
      default: return 'bg-zinc-500';
    }
  };

  return (
    <div className="bg-[#121212] border border-zinc-800/60 p-5 rounded-xl flex flex-col h-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-semibold text-base">Distribuição de Planos</h2>
        <FiMoreHorizontal className="text-zinc-500 cursor-pointer" />
      </div>

      <div className="flex-1 flex flex-col justify-center relative min-h-[150px]">
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-6 w-6 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : data.length === 0 ? (
          <div className="absolute inset-0 flex items-center justify-center text-zinc-500 text-xs">
            Nenhum aluno em planos.
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 my-auto justify-center w-full">
            <div className="relative w-40 h-40 flex-shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    innerRadius={55}
                    outerRadius={75}
                    paddingAngle={2}
                    dataKey="quantidadeAlunos"
                    nameKey="plano"
                    stroke="none"
                  >
                    {data.map((entry, index) => {
                      let color = '#71717A';
                      switch (entry.plano.toUpperCase()) {
                        case 'CORRIDA': color = '#EF4444'; break;
                        case 'NUTRICAO':
                        case 'NUTRIÇÃO': color = '#3B82F6'; break;
                        case 'ESPECIAL': color = '#22C55E'; break;
                        case 'PERSONAL_TRAINER':
                        case 'PERSONAL TRAINER': color = '#a855f7'; break;
                      }
                      return <Cell key={`cell-${index}`} fill={color} />;
                    })}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: '#27272A', border: 'none', borderRadius: '8px', color: '#fff' }}
                    itemStyle={{ color: '#fff' }}
                    formatter={(value: any, name: any) => [`${value} alunos`, formatPlanoName(String(name))]}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                <span className="text-2xl font-bold leading-tight">{totalStudents}</span>
                <span className="text-xs text-zinc-500">alunos</span>
              </div>
            </div>

            <div className="w-full sm:flex-1 space-y-3 sm:max-w-[180px]">
              {data.map((item, i) => {
                const percentage = totalStudents === 0 ? 0 : Math.round((item.quantidadeAlunos / totalStudents) * 100);
                const colorClass = getColor(item.plano);
                return (
                  <div key={i} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${colorClass}`} />
                      <span className="text-zinc-300">{formatPlanoName(item.plano)}</span>
                    </div>
                    <span className="text-zinc-400">{item.quantidadeAlunos} ({percentage}%)</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
