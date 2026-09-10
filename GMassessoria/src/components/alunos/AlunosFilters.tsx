import { useState } from 'react';
import { FiRefreshCw, FiChevronDown, FiChevronUp, FiSearch } from 'react-icons/fi';
import SearchableSelect from '../common/SearchableSelect';

export interface AlunoFiltros {
  nome: string;
  plano: string;
  statusAluno: string;
  statusFinanceiro: string;
  tempoRestante: string;
  inicioMin: string;
  inicioMax: string;
  fimMin: string;
  fimMax: string;
}

interface AlunosFiltersProps {
  filtros: AlunoFiltros;
  onChange: (key: keyof AlunoFiltros, value: string) => void;
  onClear: () => void;
}

export default function AlunosFilters({ filtros, onChange, onClear }: AlunosFiltersProps) {
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

  return (
    <div className="bg-[#121212] border border-zinc-800 rounded-xl p-3 shrink-0">
      <div className="flex flex-col gap-3">
        {}
        <div className="flex flex-col lg:flex-row lg:items-end gap-3 w-full">
          {}
          <div className="flex flex-col gap-1 w-full lg:w-[250px] shrink-0">
            <label className="text-zinc-400 text-[11px]">Buscar Aluno</label>
            <div className="relative">
              <input 
                type="text"
                placeholder="Nome do aluno..."
                value={filtros.nome}
                onChange={(e) => onChange('nome', e.target.value)}
                className="w-full bg-[#1A1A1A] border border-zinc-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white focus:outline-none focus:border-red-600 transition-colors"
              />
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500 pointer-events-none" size={12} />
            </div>
          </div>

          {}
          <div className="flex flex-col gap-1 flex-1">
            <label className="text-zinc-400 text-[11px]">Plano</label>
            <SearchableSelect
              value={filtros.plano}
              onChange={(val) => onChange('plano', val)}
              options={[
                { value: 'Todos', label: 'Todos os planos' },
                { value: 'Corrida', label: 'Corrida' },
                { value: 'Nutrição', label: 'Nutrição' },
                { value: 'Especial', label: 'Especial' },
                { value: 'Personal', label: 'Personal' }
              ]}
            />
          </div>

          {}
          <div className="flex flex-col gap-1 flex-1">
            <label className="text-zinc-400 text-[11px]">Status</label>
            <SearchableSelect
              value={filtros.statusAluno}
              onChange={(val) => onChange('statusAluno', val)}
              options={[
                { value: 'Todos', label: 'Todos os status' },
                { value: 'Ativo', label: 'Ativo' },
                { value: 'Inativo', label: 'Inativo' },
                { value: 'Pausado', label: 'Pausado' }
              ]}
            />
          </div>

          {}
          <div className="flex flex-col gap-1 flex-1">
            <label className="text-zinc-400 text-[11px]">Financeiro</label>
            <SearchableSelect
              value={filtros.statusFinanceiro}
              onChange={(val) => onChange('statusFinanceiro', val)}
              options={[
                { value: 'Todos', label: 'Todos' },
                { value: 'Inadimplente', label: 'Inadimplente' },
                { value: 'Pendente', label: 'Pendente' },
                { value: 'Em dia', label: 'Em dia' }
              ]}
            />
          </div>

          {}
          <div className="flex flex-col gap-1 flex-1">
            <label className="text-zinc-400 text-[11px]">Tempo restante</label>
            <SearchableSelect
              value={filtros.tempoRestante}
              onChange={(val) => onChange('tempoRestante', val)}
              options={[
                { value: 'Todos', label: 'Todos' },
                { value: 'Seguro', label: 'Seguro (> 15 dias)' },
                { value: 'Atenção', label: 'Atenção (< 15 dias)' },
                { value: 'Crítico', label: 'Crítico (< 5 dias)' },
                { value: 'Expirado', label: 'Expirado' }
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
            <button 
              onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
              className={`flex items-center justify-center gap-1.5 px-2 py-1.5 rounded-lg text-[11px] transition-colors border ${isAdvancedOpen ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-[#1A1A1A] border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800'}`}
            >
              Avançados {isAdvancedOpen ? <FiChevronUp size={12} /> : <FiChevronDown size={12} />}
            </button>
          </div>
        </div>

        {}
        {isAdvancedOpen && (
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-3 pt-2 border-t border-zinc-800/50">
            {}
            <div className="flex flex-col gap-1">
              <label className="text-zinc-400 text-[11px]">Início (Data Mínima)</label>
              <input 
                type="date" 
                value={filtros.inicioMin}
                onChange={(e) => onChange('inicioMin', e.target.value)}
                className="w-full bg-[#1A1A1A] border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-zinc-400 focus:outline-none focus:border-red-600 transition-colors [color-scheme:dark]"
              />
            </div>

            {}
            <div className="flex flex-col gap-1">
              <label className="text-zinc-400 text-[11px]">Início (Data Máxima)</label>
              <input 
                type="date" 
                value={filtros.inicioMax}
                onChange={(e) => onChange('inicioMax', e.target.value)}
                className="w-full bg-[#1A1A1A] border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-zinc-400 focus:outline-none focus:border-red-600 transition-colors [color-scheme:dark]"
              />
            </div>

            {}
            <div className="flex flex-col gap-1">
              <label className="text-zinc-400 text-[11px]">Fim (Data Mínima)</label>
              <input 
                type="date" 
                value={filtros.fimMin}
                onChange={(e) => onChange('fimMin', e.target.value)}
                className="w-full bg-[#1A1A1A] border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-zinc-400 focus:outline-none focus:border-red-600 transition-colors [color-scheme:dark]"
              />
            </div>

            {}
            <div className="flex flex-col gap-1">
              <label className="text-zinc-400 text-[11px]">Fim (Data Máxima)</label>
              <input 
                type="date" 
                value={filtros.fimMax}
                onChange={(e) => onChange('fimMax', e.target.value)}
                className="w-full bg-[#1A1A1A] border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-zinc-400 focus:outline-none focus:border-red-600 transition-colors [color-scheme:dark]"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
