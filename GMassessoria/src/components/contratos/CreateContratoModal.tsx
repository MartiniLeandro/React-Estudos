import { FiX, FiUser, FiSave, FiChevronDown, FiPlus, FiArrowLeft } from 'react-icons/fi';
import { useState, useEffect, useMemo, useRef } from 'react';
import { alunosService } from '../../services/alunosService';
import { planosService } from '../../services/planosService';
import { contratosService } from '../../services/contratosService';
import type { AlunoListagemView } from '../../services/alunosService';
import type { PlanoResponseListagemDTO } from '../../services/planosService';
import toast from 'react-hot-toast';
import SearchableSelect from '../common/SearchableSelect';

interface CreateContratoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  defaultCategoria?: string;
  defaultAlunoNome?: string;
}

export default function CreateContratoModal({ isOpen, onClose, onSuccess, defaultCategoria, defaultAlunoNome }: CreateContratoModalProps) {
  const [alunos, setAlunos] = useState<AlunoListagemView[]>([]);
  const [planos, setPlanos] = useState<PlanoResponseListagemDTO[]>([]);
  const [loadingDados, setLoadingDados] = useState(false);

  const [alunoId, setAlunoId] = useState<number | ''>('');
  const [planoId, setPlanoId] = useState<number | ''>('');
  const [dataInicio, setDataInicio] = useState(new Date().toISOString().split('T')[0]);
  const [descontoPerc, setDescontoPerc] = useState<string>('');
  const [motivoDesconto, setMotivoDesconto] = useState<string>('');
  const [numeroParcelas, setNumeroParcelas] = useState<number>(1);
  const [formaPagamento, setFormaPagamento] = useState<string>('PIX');

  const [isCreatingAluno, setIsCreatingAluno] = useState(false);
  const [novoAlunoNome, setNovoAlunoNome] = useState('');
  const [novoAlunoTelefone, setNovoAlunoTelefone] = useState('');
  
  const [alunoSearch, setAlunoSearch] = useState('');
  const [isAlunoDropdownOpen, setIsAlunoDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsAlunoDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      fetchInitialData();
      setAlunoId('');
      setPlanoId('');
      setDataInicio(new Date().toISOString().split('T')[0]);
      setDescontoPerc('');
      setMotivoDesconto('');
      setNumeroParcelas(1);
      setFormaPagamento('PIX');
      setIsCreatingAluno(false);
      setNovoAlunoNome('');
      setNovoAlunoTelefone('');
    }
  }, [isOpen, defaultCategoria, defaultAlunoNome]);

  const fetchInitialData = async () => {
    setLoadingDados(true);
    try {
      const planosFilter = defaultCategoria ? { nome: defaultCategoria } : {};
      
      const [alunosData, planosData] = await Promise.all([
        alunosService.getAlunos(),
        planosService.getPlanos(planosFilter)
      ]);
      
      setAlunos(alunosData);
      setPlanos(planosData);

      if (defaultAlunoNome) {
        const found = alunosData.find(a => a.nome.toLowerCase() === defaultAlunoNome.toLowerCase());
        if (found) setAlunoId(found.id);
      }

      if (planosData.length > 0) {
        setPlanoId(planosData[0].id);
      }
    } catch (error) {
      console.error('Erro ao buscar dados iniciais:', error);
      toast.error('Erro ao carregar lista de alunos e planos.');
    } finally {
      setLoadingDados(false);
    }
  };

  const handleCreateAluno = async () => {
    if (!novoAlunoNome) {
      toast.error('Nome do aluno é obrigatório');
      return;
    }
    setLoading(true);
    try {
      const response = await alunosService.createAluno({
        nome: novoAlunoNome,
        telefone: novoAlunoTelefone || '',
        status: 'ATIVO'
      });
      toast.success('Aluno criado com sucesso!');
      
      const novosAlunos = await alunosService.getAlunos();
      setAlunos(novosAlunos);
      setAlunoId(response.id);
      setIsCreatingAluno(false);
    } catch (error) {
      console.error('Erro ao criar aluno rápido', error);
      toast.error('Erro ao criar aluno');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveContrato = async () => {
    if (!alunoId || !planoId) {
      toast.error('Selecione um aluno e um plano.');
      return;
    }

    setLoading(true);
    try {
      await contratosService.create({
        alunoId: Number(alunoId),
        planoId: Number(planoId),
        dataInicio: dataInicio,
        desconto: Number(descontoPerc) || 0,
        motivoDesconto: motivoDesconto || undefined,
        numeroParcelas: Number(numeroParcelas),
        formaPagamento: formaPagamento
      });
      toast.success('Contrato criado com sucesso!');
      if (onSuccess) onSuccess();
      else onClose();
    } catch (error: any) {
      console.error('Erro ao criar contrato:', error);
      toast.error(error.response?.data?.message || 'Erro ao criar contrato.');
    } finally {
      setLoading(false);
    }
  };

  const planoSelecionado = useMemo(() => planos.find(p => p.id === Number(planoId)), [planoId, planos]);
  const valorBase = planoSelecionado?.valorBase || 0;
  const valorDesconto = (valorBase * (Number(descontoPerc) || 0)) / 100;
  const valorFinal = valorBase - valorDesconto;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-6 md:p-12">
      <div className="bg-[#121212] border border-zinc-800 rounded-2xl w-full max-w-xl overflow-hidden flex flex-col shadow-2xl animate-in fade-in zoom-in duration-200">
        
        {}
        <div className="flex items-start justify-between p-5 border-b border-zinc-800/50 shrink-0">
          <div>
            <h2 className="text-white text-lg font-semibold tracking-tight">Adicionar Contrato</h2>
            <p className="text-zinc-400 text-sm mt-1">Vincule um plano a um aluno.</p>
          </div>
          <button 
            onClick={onClose}
            className="text-zinc-500 hover:text-white transition-colors p-1 cursor-pointer"
          >
            <FiX size={20} />
          </button>
        </div>

        {}
        <div className="p-6 flex flex-col gap-6 overflow-y-auto custom-scrollbar flex-1 max-h-[calc(100vh-240px)]">
          
          {loadingDados ? (
            <div className="flex flex-col items-center justify-center py-10 gap-3">
              <div className="w-8 h-8 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-zinc-400 text-sm">Carregando dados...</span>
            </div>
          ) : (
            <>
              {}
              <div className="flex flex-col gap-1.5 p-4 rounded-xl border border-zinc-800 bg-[#1A1A1A]/30">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-zinc-300 text-sm font-medium flex items-center gap-2">
                    {isCreatingAluno ? (
                      <button onClick={() => setIsCreatingAluno(false)} className="text-zinc-400 hover:text-white transition-colors" title="Voltar para seleção">
                        <FiArrowLeft size={16} />
                      </button>
                    ) : (
                      <FiUser className="text-zinc-400" />
                    )}
                    {isCreatingAluno ? 'Novo Aluno' : 'Selecionar Aluno'}
                  </label>
                  {!isCreatingAluno && (
                    <button 
                      onClick={() => setIsCreatingAluno(true)}
                      className="text-xs text-red-400 hover:text-red-300 transition-colors flex items-center gap-1 font-medium"
                    >
                      <FiPlus size={12} /> Cadastro Rápido
                    </button>
                  )}
                </div>

                {isCreatingAluno ? (
                  <div className="flex flex-col gap-3 animate-in fade-in slide-in-from-top-2">
                    <input 
                      type="text" 
                      value={novoAlunoNome}
                      onChange={(e) => setNovoAlunoNome(e.target.value)}
                      placeholder="Nome completo do novo aluno *" 
                      className="w-full bg-[#1A1A1A] border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-red-600 transition-colors"
                    />
                    <input 
                      type="text" 
                      value={novoAlunoTelefone}
                      onChange={(e) => setNovoAlunoTelefone(e.target.value)}
                      placeholder="Telefone / WhatsApp" 
                      className="w-full bg-[#1A1A1A] border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-red-600 transition-colors"
                    />
                    <button 
                      onClick={handleCreateAluno}
                      disabled={loading}
                      className="mt-1 flex items-center justify-center gap-2 w-full bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      {loading ? 'Salvando...' : 'Salvar Aluno Rápido'}
                    </button>
                  </div>
                ) : (
                  <div className="relative" ref={dropdownRef}>
                    <div 
                      className="w-full bg-[#1A1A1A] border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-white flex justify-between items-center cursor-pointer hover:border-zinc-700 transition-colors"
                      onClick={() => setIsAlunoDropdownOpen(!isAlunoDropdownOpen)}
                    >
                      <span className={alunoId ? "text-white" : "text-zinc-500"}>
                        {alunoId ? alunos.find(a => a.id === alunoId)?.nome : 'Selecione um aluno...'}
                      </span>
                      <FiChevronDown className={`text-zinc-500 transition-transform ${isAlunoDropdownOpen ? 'rotate-180' : ''}`} size={16} />
                    </div>
                    
                    {isAlunoDropdownOpen && (
                      <div className="absolute z-10 w-full mt-1 bg-[#1A1A1A] border border-zinc-700 rounded-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-100">
                        <div className="p-2 border-b border-zinc-800/50">
                          <input
                            type="text"
                            placeholder="Buscar aluno por nome..."
                            value={alunoSearch}
                            onChange={(e) => setAlunoSearch(e.target.value)}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full bg-[#121212] border border-zinc-800 rounded-md px-3 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-red-600 transition-colors"
                            autoFocus
                          />
                        </div>
                        <div className="max-h-48 overflow-y-auto custom-scrollbar">
                          {alunos.filter(a => a.nome.toLowerCase().includes(alunoSearch.toLowerCase())).length > 0 ? (
                            alunos.filter(a => a.nome.toLowerCase().includes(alunoSearch.toLowerCase())).map(a => (
                              <div 
                                key={a.id}
                                className={`px-4 py-2.5 text-sm cursor-pointer transition-colors ${alunoId === a.id ? 'bg-red-600/10 text-red-500 font-medium' : 'text-zinc-300 hover:bg-zinc-800/80 hover:text-white'}`}
                                onClick={() => {
                                  setAlunoId(a.id);
                                  setIsAlunoDropdownOpen(false);
                                  setAlunoSearch('');
                                }}
                              >
                                {a.nome}
                              </div>
                            ))
                          ) : (
                            <div className="px-4 py-4 text-sm text-zinc-500 text-center flex flex-col gap-1 items-center justify-center">
                              <span>Nenhum aluno encontrado.</span>
                              <span className="text-xs text-zinc-600">Tente buscar por outro termo ou cadastre um novo.</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {}
              <div className="flex flex-col gap-1.5">
                <label className="text-zinc-300 text-sm font-medium">Plano</label>
                <div className="relative">
                  <SearchableSelect
                    value={String(planoId)}
                    onChange={(val) => setPlanoId(Number(val) || '')}
                    options={planos.map(p => ({ value: String(p.id), label: `${p.nome} - ${p.ciclo}` }))}
                    placeholder="Selecione um plano..."
                    className="!h-[42px] !py-2.5 !text-sm pl-4"
                    showSearch={true}
                  />
                </div>
              </div>

              {}
              <div className="flex flex-col gap-4 bg-zinc-900/50 p-4 rounded-xl border border-zinc-800/50">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex flex-col">
                    <span className="text-zinc-500 text-xs font-medium mb-1">Valor Base</span>
                    <span className="text-white text-lg font-semibold mt-1">R$ {valorBase.toFixed(2)}</span>
                  </div>
                  <div className="flex flex-col md:items-center">
                    <div className="w-full md:w-3/4">
                      <span className="text-zinc-500 text-xs font-medium mb-1 block">Desconto (%)</span>
                      <div className="relative">
                        <input 
                          type="number" 
                          min="0"
                          max="100"
                          value={descontoPerc}
                          onChange={(e) => {
                            let val = e.target.value;
                            if (val !== '') {
                              if (Number(val) > 100) val = '100';
                              if (Number(val) < 0) val = '0';
                            }
                            setDescontoPerc(val);
                          }}
                          placeholder="0"
                          className="w-full bg-[#1A1A1A] border border-zinc-800 rounded-lg pl-3 pr-7 py-1.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-red-600 transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-500 text-sm pointer-events-none">%</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col md:items-end text-left md:text-right">
                    <span className="text-zinc-500 text-xs font-medium mb-1">Valor Final</span>
                    <span className="text-green-400 text-2xl font-bold mt-1">R$ {valorFinal.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex flex-col border-t border-zinc-800/50 pt-4">
                  <span className="text-zinc-500 text-xs font-medium mb-1">Motivo do Desconto</span>
                  <input 
                    type="text"
                    value={motivoDesconto}
                    onChange={(e) => setMotivoDesconto(e.target.value)}
                    placeholder="Opcional"
                    disabled={!descontoPerc || Number(descontoPerc) <= 0}
                    className="w-full bg-[#1A1A1A] border border-zinc-800 rounded-lg px-3 py-1.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {}
                <div className="flex flex-col gap-1.5">
                  <label className="text-zinc-300 text-sm font-medium">Data de Início</label>
                  <input 
                    type="date" 
                    value={dataInicio}
                    onChange={(e) => setDataInicio(e.target.value)}
                    style={{ colorScheme: 'dark' }}
                    className="w-full bg-[#1A1A1A] border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-red-600 transition-colors"
                  />
                </div>

                {}
                <div className="flex flex-col gap-1.5">
                  <label className="text-zinc-300 text-sm font-medium">Forma de Pagamento</label>
                  <div className="relative">
                    <SearchableSelect
                      value={formaPagamento}
                      onChange={(val) => setFormaPagamento(val)}
                      options={[
                        { value: 'PIX', label: 'PIX' },
                        { value: 'DINHEIRO', label: 'Dinheiro' },
                        { value: 'CARTAO_CREDITO', label: 'Cartão de Crédito' },
                        { value: 'CARTAO_DEBITO', label: 'Cartão de Débito' }
                      ]}
                      className="!h-[42px] !py-2.5 !text-sm pl-4"
                    />
                  </div>
                </div>

                {}
                <div className="flex flex-col gap-1.5 md:col-span-2">
                  <label className="text-zinc-300 text-sm font-medium">Número de Parcelas</label>
                  <div className="relative">
                    <SearchableSelect
                      value={String(numeroParcelas)}
                      onChange={(val) => setNumeroParcelas(Number(val))}
                      options={[1,2,3,4,5,6,7,8,9,10,11,12].map(n => ({ value: String(n), label: `${n}x ${n > 1 ? 'parcelas' : 'parcela'}` }))}
                      className="!h-[42px] !py-2.5 !text-sm pl-4"
                    />
                  </div>
                </div>

              </div>
            </>
          )}

        </div>

        {}
        <div className="p-4 border-t border-zinc-800/50 flex items-center justify-end gap-3 bg-[#121212] shrink-0">
          <button 
            onClick={onClose}
            disabled={loading || loadingDados}
            className="px-4 py-2 text-sm font-medium text-zinc-300 hover:text-white bg-transparent border border-zinc-800 hover:bg-zinc-800 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
          >
            Cancelar
          </button>
          <button 
            onClick={handleSaveContrato}
            disabled={loading || loadingDados || isCreatingAluno}
            className="flex items-center gap-2 px-6 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading && !isCreatingAluno ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : <FiSave size={16} />}
            {loading && !isCreatingAluno ? 'Salvando...' : 'Criar Contrato'}
          </button>
        </div>

      </div>
    </div>
  );
}
