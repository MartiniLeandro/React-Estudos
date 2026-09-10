import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { FiMoreVertical } from 'react-icons/fi';
import type { FinanceiroResumoDTO } from '../../services/financeiroService';

interface FinanceiroChartsProps {
  resumo: FinanceiroResumoDTO | null;
  loading?: boolean;
  month: number;
  year: number;
}

export default function FinanceiroCharts({ resumo, loading, month, year }: FinanceiroChartsProps) {
  const mesesAbreviados = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

  const ultimos6MesesInfo = Array.from({ length: 6 }, (_, i) => {
    let m = month - 5 + i;
    let y = year;
    if (m <= 0) {
      m += 12;
      y -= 1;
    }
    return { m, y };
  });

  const barData = ultimos6MesesInfo.map(({ m, y }) => {
    const mesData = resumo?.fluxoCaixa?.find(item =>
      Number(item.mes) === m && (!item.ano || Number(item.ano) === y)
    );
    return {
      name: mesesAbreviados[m - 1],
      Previsto: mesData?.valorPrevisto || 0,
      Recebido: mesData?.valorRecebido || 0
    };
  });

  const formatPlanoName = (name: string) => {
    if (!name || name.toUpperCase() === 'DESCONHECIDO') return 'Personal Trainer';
    const upper = name.toUpperCase();
    if (upper === 'NUTRICAO' || upper === 'NUTRIÇÃO') return 'Nutrição';
    if (upper === 'PERSONAL_TRAINER' || upper === 'PERSONAL TRAINER') return 'Personal Trainer';
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };

  const pieData = (resumo?.recebimentoPorPlano || []).map(item => {
    let color = '#a855f7';
    const planoNameOrig = item.plano || 'PERSONAL_TRAINER';
    const planoName = formatPlanoName(planoNameOrig);
    switch (planoNameOrig.toUpperCase()) {
      case 'CORRIDA': color = '#ef4444'; break;
      case 'NUTRICAO':
      case 'NUTRIÇÃO': color = '#3b82f6'; break;
      case 'ESPECIAL': color = '#22c55e'; break;
      case 'PERSONAL_TRAINER':
      case 'PERSONAL TRAINER':
      case 'DESCONHECIDO': color = '#a855f7'; break;
    }
    return { name: planoName, value: item.valorRecebido || 0, color };
  }).sort((a, b) => b.value - a.value);

  const totalRecebido = pieData.reduce((acc, curr) => acc + curr.value, 0);

  const isPieEmpty = pieData.length === 0 || totalRecebido === 0;
  const displayPieData = isPieEmpty 
    ? [{ name: 'Sem Recebimentos', value: 1, color: '#27272a' }] 
    : pieData;

  const CustomTooltipBar = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#1A1A1A] border border-zinc-800 p-3 rounded-lg shadow-xl">
          <p className="text-white font-medium mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center gap-2 text-xs">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }}></div>
              <span className="text-zinc-400">{entry.name}:</span>
              <span className="text-white font-medium">
                R$ {entry.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const CustomTooltipPie = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#1A1A1A] border border-zinc-800 p-3 rounded-lg shadow-xl">
          <div className="flex items-center gap-2 text-xs">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: payload[0].payload.color }}></div>
            <span className="text-white font-medium">{payload[0].name}:</span>
            <span className="text-white">
              R$ {payload[0].value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">

      {}
      <div className="bg-[#121212] border border-zinc-800 rounded-xl p-4 flex flex-col h-[260px]">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-white font-semibold text-sm">Fluxo de Caixa - Últimos 6 Meses</h3>
          <button className="text-zinc-500 hover:text-white transition-colors">
            <FiMoreVertical size={16} />
          </button>
        </div>
        <div className="flex-1 min-h-0 w-full relative -ml-4">
          {loading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-6 w-6 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : barData.length === 0 ? (
            <div className="absolute inset-0 flex items-center justify-center text-zinc-500 text-xs">
              Nenhum dado encontrado.
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                <XAxis dataKey="name" stroke="#71717a" fontSize={10} tickLine={false} axisLine={false} dy={10} />
                <YAxis stroke="#71717a" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(value) => value >= 1000 ? `${value / 1000}k` : value} />
                <Tooltip cursor={{ fill: '#1A1A1A' }} content={<CustomTooltipBar />} />
                <Legend wrapperStyle={{ fontSize: '10px', paddingTop: '10px' }} iconType="circle" />
                <Bar dataKey="Previsto" fill="#3f3f46" radius={[4, 4, 0, 0]} maxBarSize={30} />
                <Bar dataKey="Recebido" fill="#dc2626" radius={[4, 4, 0, 0]} maxBarSize={30} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {}
      <div className="bg-[#121212] border border-zinc-800 rounded-xl p-4 flex flex-col h-auto min-h-[260px] lg:h-[260px]">
        <div className="flex justify-between items-center mb-2 shrink-0">
          <h3 className="text-white font-semibold text-sm">Recebimento por Plano</h3>
          <button className="text-zinc-500 hover:text-white transition-colors">
            <FiMoreVertical size={16} />
          </button>
        </div>

        <div className="flex flex-col sm:flex-row h-full items-center gap-2 sm:gap-6 flex-1 relative min-h-[150px]">
          {loading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-6 w-6 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <>
              <div className="h-[140px] w-[140px] relative shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={displayPieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={70}
                      paddingAngle={2}
                      dataKey="value"
                      stroke="none"
                      isAnimationActive={!isPieEmpty}
                    >
                      {displayPieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    {!isPieEmpty && <Tooltip content={<CustomTooltipPie />} />}
                  </PieChart>
                </ResponsiveContainer>
                {}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-white font-bold text-sm">
                    {totalRecebido === 0 ? 'R$ 0,00' : `R$ ${(totalRecebido / 1000).toFixed(1)}k`}
                  </span>
                  <span className="text-[9px] text-zinc-500">Total</span>
                </div>
              </div>

              {}
              <div className="flex-1 w-full pb-2 sm:pb-0 flex flex-col justify-center">
                {isPieEmpty ? (
                  <div className="text-zinc-500 text-xs text-center sm:text-left px-4">
                    Nenhum recebimento registrado neste mês.
                  </div>
                ) : (
                  <div className="space-y-3 mt-2 sm:mt-0">
                    {pieData.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center text-[11px]">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: item.color }}></div>
                          <span className="text-zinc-300 truncate">{item.name}</span>
                        </div>
                        <div className="flex gap-3 sm:gap-4 shrink-0">
                          <span className="text-zinc-400 text-right w-14 sm:w-16">
                            R$ {item.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </span>
                          <span className="text-white font-medium text-right w-7 sm:w-8">
                            {totalRecebido === 0 ? '0.0' : ((item.value / totalRecebido) * 100).toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>

    </div>
  );
}
