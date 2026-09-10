import MonthYearPicker from '../common/MonthYearPicker';

interface FinanceiroHeaderProps {
  month: number;
  year: number;
  onMonthChange: (month: number) => void;
  onYearChange: (year: number) => void;
}

export default function FinanceiroHeader({ month, year, onMonthChange, onYearChange }: FinanceiroHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white">Financeiro</h1>
          <div className="w-5 h-5 rounded-full border border-red-500 text-red-500 flex items-center justify-center text-[10px]">
            $
          </div>
        </div>
        <p className="text-zinc-400 text-xs md:text-sm mt-0.5">Controle o fluxo de caixa, acompanhe receitas e gerencie as faturas.</p>
      </div>
      <div className="flex items-center gap-2 w-full md:w-auto">
        <MonthYearPicker 
          month={month}
          year={year}
          onChange={(m, y) => {
            onMonthChange(m);
            if (y !== year) onYearChange(y);
          }}
        />
      </div>
    </div>
  );
}
