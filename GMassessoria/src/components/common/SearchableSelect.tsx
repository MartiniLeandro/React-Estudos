import { useState, useRef, useEffect } from 'react';
import { FiChevronDown, FiCheck, FiSearch } from 'react-icons/fi';

interface Option {
  value: string;
  label: string;
}

interface SearchableSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  placeholder?: string;
  className?: string;
  showSearch?: boolean;
}

export default function SearchableSelect({ value, onChange, options, placeholder = "Selecione...", className, showSearch = false }: SearchableSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find(opt => opt.value === value);
  const displayValue = selectedOption ? selectedOption.label : placeholder;

  const filteredOptions = showSearch && searchQuery 
    ? options.filter(opt => opt.label.toLowerCase().includes(searchQuery.toLowerCase()))
    : options;

  return (
    <div className="relative w-full" ref={wrapperRef}>
      <div 
        className={`w-full bg-[#1A1A1A] border rounded-lg pl-3 pr-8 py-1.5 text-xs text-white transition-colors cursor-pointer flex items-center h-[30px] ${isOpen ? 'border-red-600' : 'border-zinc-800'} ${className || ''}`}
        onClick={() => {
          setIsOpen(!isOpen);
          if (!isOpen) setSearchQuery('');
        }}
      >
        <span className="truncate">{displayValue}</span>
        <FiChevronDown 
          className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
          size={12} 
        />
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-[#1e1e1e] border border-zinc-700/50 rounded-lg shadow-2xl overflow-hidden flex flex-col max-h-[250px] animate-in fade-in slide-in-from-top-1 duration-200">
          
          {showSearch && (
            <div className="p-2 border-b border-zinc-800 shrink-0">
              <div className="relative">
                <FiSearch className="absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-500" size={14} />
                <input
                  type="text"
                  className="w-full bg-[#121212] border border-zinc-800 rounded-md pl-8 pr-3 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-red-600 transition-colors"
                  placeholder="Pesquisar..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  autoFocus
                />
              </div>
            </div>
          )}

          <div className="overflow-y-auto overflow-x-hidden p-1 custom-scrollbar">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((opt) => (
                <div
                  key={opt.value}
                  className={`px-2 py-2 text-xs rounded-md cursor-pointer flex items-center justify-between group transition-all duration-150 ${
                    value === opt.value 
                      ? 'bg-red-600/10 text-red-500 font-medium' 
                      : 'text-zinc-300 hover:bg-zinc-800 hover:text-white'
                  }`}
                  onClick={() => {
                    onChange(opt.value);
                    setIsOpen(false);
                  }}
                >
                  <span className="truncate">{opt.label}</span>
                  {value === opt.value && <FiCheck size={14} className="shrink-0 text-red-500" />}
                </div>
              ))
            ) : (
              <div className="px-2 py-4 text-xs text-zinc-500 text-center flex flex-col items-center gap-1">
                <span>Nenhuma opção encontrada</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
