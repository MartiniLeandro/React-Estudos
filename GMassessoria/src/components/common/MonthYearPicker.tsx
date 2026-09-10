import { useState, useRef, useEffect } from 'react';
import { FiCalendar, FiChevronDown } from 'react-icons/fi';

interface MonthYearPickerProps {
  month: number;
  year: number;
  onChange: (month: number, year: number) => void;
}

export default function MonthYearPicker({ month, year, onChange }: MonthYearPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
  const fullMeses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-[#1A1A1A] border border-zinc-800 px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm hover:bg-zinc-800 transition-colors text-white"
      >
        <FiCalendar className="text-zinc-400" />
        {fullMeses[month - 1]} {year}
        <FiChevronDown className={`text-zinc-500 ml-1 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 p-3 bg-[#121212] border border-zinc-800 rounded-xl shadow-2xl z-50 w-64 flex flex-col gap-3 animate-in fade-in zoom-in-95 duration-150">
          {}
          <div className="flex justify-between items-center px-1">
             <button onClick={() => onChange(month, year - 1)} className="text-zinc-400 hover:text-white p-1 hover:bg-zinc-800 rounded transition-colors">&lt;</button>
             <span className="text-white font-medium">{year}</span>
             <button onClick={() => onChange(month, year + 1)} className="text-zinc-400 hover:text-white p-1 hover:bg-zinc-800 rounded transition-colors">&gt;</button>
          </div>
          
          {}
          <div className="grid grid-cols-3 gap-2">
            {meses.map((m, idx) => (
              <button 
                key={m}
                onClick={() => {
                  onChange(idx + 1, year);
                  setIsOpen(false);
                }}
                className={`py-1.5 rounded-lg text-sm transition-colors ${month === idx + 1 ? 'bg-red-600 text-white font-medium' : 'text-zinc-400 hover:bg-[#1A1A1A] hover:text-white border border-transparent hover:border-zinc-800'}`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
