import { FiChevronDown } from 'react-icons/fi';
import type { EvolucaoAlunosDTO } from '../../services/dashboardService';
import SearchableSelect from '../common/SearchableSelect';

interface StudentsGrowthChartProps {
  data: EvolucaoAlunosDTO[];
  loading?: boolean;
  year: number;
  onYearChange?: (year: number) => void;
}

export default function StudentsGrowthChart({ data, loading, year, onYearChange }: StudentsGrowthChartProps) {
  const maxValue = data.length > 0 ? Math.max(...data.map(d => Math.max(d.alunosAtivos, d.novosAlunos))) : 60;
  const maxScale = Math.ceil(maxValue / 15) * 15 || 60;


  return (
    <div className="bg-[#121212] border border-zinc-800/60 p-5 rounded-xl flex flex-col h-full">
      <div className="flex justify-between items-center mb-3">
        <h2 className="font-semibold text-base">Evolução de Alunos</h2>
        <div className="relative group w-[100px]">
          <SearchableSelect
            value={String(year)}
            onChange={(val) => onYearChange?.(Number(val))}
            options={[2024, 2025, 2026, 2027, 2028].map(y => ({ value: String(y), label: String(y) }))}
          />
        </div>
      </div>
      
      <div className="flex gap-4 text-xs text-zinc-400 mb-3">
        <div className="flex items-center gap-1.5"><div className="w-3 h-3 bg-red-600 rounded-[2px]" /> Alunos Ativos</div>
        <div className="flex items-center gap-1.5"><div className="w-3 h-3 bg-zinc-300 rounded-[2px]" /> Novos Alunos</div>
      </div>

      <div className="flex-1 flex items-end justify-between gap-1.5 border-l border-b border-zinc-800/50 pb-2 pl-2 relative mt-2 ml-6">
        {}
        <div className="absolute -left-8 top-0 h-full flex flex-col justify-between text-[10px] text-zinc-500 py-0.5 pb-5">
          <span>{maxScale}</span>
          <span>{Math.round(maxScale * 0.75)}</span>
          <span>{Math.round(maxScale * 0.5)}</span>
          <span>{Math.round(maxScale * 0.25)}</span>
          <span>0</span>
        </div>

        {}
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-6 w-6 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : data.length === 0 ? (
          <div className="absolute inset-0 flex items-center justify-center text-zinc-500 text-xs">
            Nenhum dado encontrado para o ano.
          </div>
        ) : (
          data.map((item, i) => {
            const realAlunosAtivos = item.alunosAtivos;
            const realNovosAlunos = item.novosAlunos;

            const heightStudents = (realAlunosAtivos / maxScale) * 100;
            const heightNew = (realNovosAlunos / maxScale) * 100;
            return (
              <div key={i} className="flex-1 flex flex-col items-center group h-full justify-end relative">
                {}
                <div className="opacity-0 group-hover:opacity-100 absolute -top-10 bg-zinc-800 text-white text-xs px-2 py-1 rounded transition-opacity whitespace-nowrap z-10 pointer-events-none flex flex-col items-center gap-1">
                  <span>{realAlunosAtivos} ativos</span>
                  <span className="text-[10px] text-zinc-400">+{realNovosAlunos} novos</span>
                </div>
                
                <div className="flex items-end gap-1 w-full justify-center h-full">
                  {}
                  {realAlunosAtivos > 0 && (
                    <div 
                      className="w-3 sm:w-4 bg-red-600 rounded-t-[2px] transition-all duration-300 group-hover:bg-red-500" 
                      style={{ height: `${heightStudents}%` }} 
                    />
                  )}
                  {}
                  {realNovosAlunos > 0 && (
                    <div 
                      className="w-3 sm:w-4 bg-zinc-300 rounded-t-[2px] transition-all duration-300 group-hover:bg-zinc-200" 
                      style={{ height: `${heightNew}%` }} 
                    />
                  )}
                </div>
                <span className="text-[10px] text-zinc-500 mt-2">{item.mes}</span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
