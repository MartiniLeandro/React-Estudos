import { useEffect } from 'react';
import { FiSearch, FiRefreshCw, FiChevronDown } from 'react-icons/fi';
import SearchableSelect from '../common/SearchableSelect';

export interface PlanoFiltros {
  nome: string;
  modalidade: string;
  ciclo: string;
  status: string;
}

interface PlanosFiltersProps {
  filtros: PlanoFiltros;
  onChange: (key: keyof PlanoFiltros, value: string) => void;
  onClear: () => void;
}

export default function PlanosFilters({ filtros, onChange, onClear }: PlanosFiltersProps) {

  return (
    <div className="bg-[#121212] border border-zinc-800 rounded-xl p-3 shrink-0">
      <div className="flex flex-col lg:flex-row lg:items-end gap-3 w-full">
        {}
        <div className="flex flex-col gap-1 flex-grow min-w-[200px] w-full lg:w-[250px] shrink-0">
          <label className="text-zinc-400 text-[11px]">Buscar Plano</label>
          <div className="relative">
            <input 
              type="text" 
              value={filtros.nome}
              onChange={(e) => onChange('nome', e.target.value)}
              placeholder="Digite o nome do plano..." 
              className="w-full bg-[#1A1A1A] border border-zinc-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white focus:outline-none focus:border-red-600 transition-colors"
            />
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500 pointer-events-none" size={12} />
          </div>
        </div>

        {}
        <div className="flex flex-col gap-1 flex-1">
          <label className="text-zinc-400 text-[11px]">Modalidade</label>
          <SearchableSelect
            value={filtros.modalidade}
            onChange={(val) => onChange('modalidade', val)}
            options={[
              { value: 'Todas', label: 'Todas as modalidades' },
              { value: 'Corrida', label: 'Corrida' },
              { value: 'Nutrição', label: 'Nutrição' },
              { value: 'Especial', label: 'Especial' },
              { value: 'Personal', label: 'Personal' }
            ]}
          />
        </div>

        {}
        <div className="flex flex-col gap-1 flex-1">
          <label className="text-zinc-400 text-[11px]">Ciclo</label>
          <SearchableSelect
            value={filtros.ciclo}
            onChange={(val) => onChange('ciclo', val)}
            options={[
              { value: 'Todos', label: 'Todos os ciclos' },
              { value: 'Mensal', label: 'Mensal' },
              { value: 'Bimestral', label: 'Bimestral' },
              { value: 'Trimestral', label: 'Trimestral' },
              { value: 'Semestral', label: 'Semestral' },
              { value: 'Anual', label: 'Anual' }
            ]}
          />
        </div>

        {}
        <div className="flex flex-col gap-1 flex-1">
          <label className="text-zinc-400 text-[11px]">Status</label>
          <SearchableSelect
            value={filtros.status}
            onChange={(val) => onChange('status', val)}
            options={[
              { value: 'Todos', label: 'Todos os status' },
              { value: 'Ativo', label: 'Ativo' },
              { value: 'Inativo', label: 'Inativo' }
            ]}
          />
        </div>
        
        {}
        <div className="flex items-end justify-end gap-2 shrink-0 h-full whitespace-nowrap">
          <button 
            onClick={onClear}
            className="flex items-center justify-center gap-1.5 text-zinc-400 hover:text-white px-2 py-1.5 rounded-lg text-[11px] transition-colors" 
            title="Limpar filtros"
          >
            <FiRefreshCw size={12} />
            Limpar
          </button>
        </div>
      </div>
    </div>
  );
}
