import { FiChevronDown } from 'react-icons/fi';

export default function RevenueChart() {
  return (
    <div className="bg-[#121212] border border-zinc-800/60 p-5 rounded-xl flex flex-col h-full">
      <div className="flex justify-between items-center mb-3">
        <h2 className="font-semibold text-base">Visão Geral do Faturamento</h2>
        <button className="flex items-center gap-1.5 bg-[#1A1A1A] border border-zinc-800 px-3 py-1.5 rounded-md text-xs hover:bg-zinc-800 transition-colors">
          Agosto/2026
          <FiChevronDown className="text-zinc-500" />
        </button>
      </div>
      
      <div className="flex gap-4 text-xs text-zinc-400 mb-3">
        <div className="flex items-center gap-1.5"><div className="w-3 h-3 bg-red-600 rounded-[2px]" /> Previsto</div>
        <div className="flex items-center gap-1.5"><div className="w-3 h-3 bg-zinc-300 rounded-[2px]" /> Recebido</div>
      </div>

      <div className="flex-1 flex items-end justify-between gap-1.5 border-l border-b border-zinc-800/50 pb-2 pl-2 relative mt-2 ml-6">
        {}
        <div className="absolute -left-8 top-0 h-full flex flex-col justify-between text-[10px] text-zinc-500 py-0.5 pb-5">
          <span>10k</span>
          <span>8k</span>
          <span>6k</span>
          <span>4k</span>
          <span>2k</span>
          <span>0</span>
        </div>

        {}
        {[
          { month: 'Jan', p: 60, r: 50 },
          { month: 'Fev', p: 70, r: 60 },
          { month: 'Mar', p: 75, r: 60 },
          { month: 'Abr', p: 75, r: 48 },
          { month: 'Mai', p: 65, r: 55 },
          { month: 'Jun', p: 82, r: 65 },
          { month: 'Jul', p: 90, r: 65 },
          { month: 'Ago', p: 0, r: 0 },
        ].map((data, i) => (
          <div key={i} className="flex-1 flex flex-col items-center group h-full">
            <div className="flex items-end gap-1 w-full justify-center h-full">
              {data.p > 0 && <div className="w-3 sm:w-4 bg-red-600 rounded-t-[2px]" style={{ height: `${data.p}%` }} />}
              {data.r > 0 && <div className="w-3 sm:w-4 bg-zinc-300 rounded-t-[2px]" style={{ height: `${data.r}%` }} />}
            </div>
            <span className="text-[10px] text-zinc-500 mt-2">{data.month}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

