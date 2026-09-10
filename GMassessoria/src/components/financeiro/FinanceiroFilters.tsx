import { FiSearch, FiRefreshCw } from 'react-icons/fi';
import SearchableSelect from '../common/SearchableSelect';

interface FinanceiroFiltersProps {
  searchName: string;
  onSearchNameChange: (value: string) => void;
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
  onClear: () => void;
}

export default function FinanceiroFilters({
  searchName,
  onSearchNameChange,
  statusFilter,
  onStatusFilterChange,
  onClear
}: FinanceiroFiltersProps) {
  return (
    <div className="bg-[#121212] border border-zinc-800 rounded-xl p-3 shrink-0">
      <div className="flex flex-col md:flex-row gap-3">
        
        {}
        <div className="flex flex-col gap-1 flex-1">
          <label className="text-zinc-400 text-[11px]">Buscar aluno</label>
          <div className="relative">
            <input 
              type="text" 
              value={searchName}
              onChange={(e) => onSearchNameChange(e.target.value)}
              placeholder="Digite o nome do aluno..." 
              className="w-full bg-[#1A1A1A] border border-zinc-800 rounded-lg pl-3 pr-8 py-1.5 text-xs text-white focus:outline-none focus:border-red-600 transition-colors"
            />
            <FiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-500" size={12} />
          </div>
        </div>

        <div className="flex flex-col gap-1 w-full md:w-48">
          <label className="text-zinc-400 text-[11px]">Status da Fatura</label>
          <SearchableSelect
            value={statusFilter}
            onChange={onStatusFilterChange}
            options={[
              { value: 'Todos', label: 'Todos' },
              { value: 'Pago', label: 'Pago' },
              { value: 'Pendente', label: 'Pendente' },
              { value: 'Atrasado', label: 'Atrasado' }
            ]}
          />
        </div>

        {}
        <div className="flex items-end gap-2 mt-2 md:mt-0">
          <button 
            onClick={onClear}
            className="flex items-center justify-center gap-1.5 bg-[#1A1A1A] border border-zinc-800 hover:bg-zinc-800 text-white px-3 py-1.5 rounded-lg text-xs transition-colors h-[30px] cursor-pointer" 
            title="Limpar"
          >
            <FiRefreshCw size={12} />
            Limpar
          </button>
        </div>

      </div>
    </div>
  );
}
