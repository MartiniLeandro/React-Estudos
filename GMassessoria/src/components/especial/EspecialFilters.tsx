import { useState } from 'react';
import { FiSearch, FiCalendar, FiRefreshCw, FiFilter, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import SearchableSelect from '../common/SearchableSelect';

export interface ContratosFiltrosState {
  nomeAluno: string;
  statusContrato: string;
  situacaoFinanceira: string;
  cicloPlano: string;
  tempoRestante: string;
}

interface EspecialFiltersProps {
  filtros: ContratosFiltrosState;
  onChange: (field: string, value: string) => void;
  onClear: () => void;
}

export default function EspecialFilters({ filtros, onChange, onClear }: EspecialFiltersProps) {
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

  return (
    <div className="bg-[#121212] border border-zinc-800 rounded-xl p-3 shrink-0">
      <div className="flex flex-col gap-3">
        {}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {}
          <div className="flex flex-col gap-1 lg:col-span-2">
            <label className="text-zinc-400 text-[11px]">Buscar por nome</label>
            <div className="relative">
              <input 
                type="text" 
                placeholder="Digite o nome do aluno..." 
                value={filtros.nomeAluno}
                onChange={(e) => onChange('nomeAluno', e.target.value)}
                className="w-full bg-[#1A1A1A] border border-zinc-800 rounded-lg pl-3 pr-8 py-1.5 text-xs text-white focus:outline-none focus:border-red-600 transition-colors"
              />
              <FiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-500" size={12} />
            </div>
          </div>

          {}
          <div className="flex flex-col gap-1">
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
          <div className="flex flex-col gap-1">
            <label className="text-zinc-400 text-[11px]">Financeiro</label>
            <SearchableSelect
              value={filtros.situacaoFinanceira}
              onChange={(val) => onChange('situacaoFinanceira', val)}
              options={[
                { value: 'Todas', label: 'Todas' },
                { value: 'EM_DIA', label: 'Em Dia' },
                { value: 'PENDENTE', label: 'Pendente' },
                { value: 'INADIMPLENTE', label: 'Inadimplente' }
              ]}
            />
          </div>

          {}
          <div className="lg:col-span-2 flex items-end justify-end gap-2 mt-2 lg:mt-0">
            <button 
              onClick={onClear}
              className="flex items-center justify-center gap-1.5 text-zinc-400 hover:text-white px-2 py-1.5 rounded-lg text-[11px] transition-colors" title="Limpar filtros">
              <FiRefreshCw size={12} />
              Limpar
            </button>
            <button 
              onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
              className={`flex items-center justify-center gap-1.5 px-2 py-1.5 rounded-lg text-[11px] transition-colors border ${isAdvancedOpen ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-[#1A1A1A] border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800'}`}
            >
              Avançados {isAdvancedOpen ? <FiChevronUp size={12} /> : <FiChevronDown size={12} />}
            </button>
            <button className="flex items-center justify-center gap-1.5 bg-red-600 text-white px-3 py-1.5 rounded-lg text-[11px] font-medium hover:bg-red-700 transition-colors">
              <FiFilter size={12} />
              Aplicar
            </button>
          </div>
        </div>

        {}
        {isAdvancedOpen && (
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-3 pt-2 border-t border-zinc-800/50">
            {}
            <div className="flex flex-col gap-1">
              <label className="text-zinc-400 text-[11px]">Ciclo do plano</label>
              <SearchableSelect
                value={filtros.cicloPlano}
                onChange={(val) => onChange('cicloPlano', val)}
                options={[
                  { value: 'Todos', label: 'Todos' },
                  { value: 'MENSAL', label: 'Mensal' },
                  { value: 'BIMESTRAL', label: 'Bimestral' },
                  { value: 'TRIMESTRAL', label: 'Trimestral' },
                  { value: 'SEMESTRAL', label: 'Semestral' },
                  { value: 'ANUAL', label: 'Anual' }
                ]}
              />
            </div>

            {}
            <div className="flex flex-col gap-1">
              <label className="text-zinc-400 text-[11px]">Status</label>
              <SearchableSelect
                value={filtros.statusContrato}
                onChange={(val) => onChange('statusContrato', val)}
                options={[
                  { value: 'Todos', label: 'Todos os status' },
                  { value: 'ATIVO', label: 'Ativo' },
                  { value: 'PAUSADO', label: 'Pausado' },
                  { value: 'ENCERRADO', label: 'Encerrado' },
                  { value: 'CANCELADO', label: 'Cancelado' }
                ]}
              />
            </div>

            {}
            <div className="flex flex-col gap-1">
              <label className="text-zinc-400 text-[11px]">Início do contrato</label>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Data inicial" 
                  className="w-full bg-[#1A1A1A] border border-zinc-800 rounded-lg pl-3 pr-8 py-1.5 text-xs text-zinc-400 focus:outline-none focus:border-red-600 transition-colors"
                />
                <FiCalendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-500" size={12} />
              </div>
            </div>

            {}
            <div className="flex flex-col gap-1">
              <label className="text-zinc-400 text-[11px]">Fim do contrato</label>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Data final" 
                  className="w-full bg-[#1A1A1A] border border-zinc-800 rounded-lg pl-3 pr-8 py-1.5 text-xs text-zinc-400 focus:outline-none focus:border-red-600 transition-colors"
                />
                <FiCalendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-500" size={12} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
