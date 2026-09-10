import { FiChevronDown, FiChevronUp, FiCalendar, FiClock, FiCreditCard, FiActivity, FiEdit2, FiFileText, FiPower, FiPlay, FiRefreshCw, FiMoreVertical } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import EditContratoModal from '../contratos/EditContratoModal';
import ContratoDetailsModal from '../contratos/ContratoDetailsModal';
import { contratosService } from '../../services/contratosService';
import toast from 'react-hot-toast';
import ConfirmActionModal from '../alunos/ConfirmActionModal';
import { getImageUrl } from '../../utils/imageUrl';
import type { ContratoListagemView } from '../../services/contratosService';

interface EspecialTableProps {
  contratos: ContratoListagemView[];
  loading?: boolean;
  onRefresh?: () => void;
  onRenovar?: (nomeAluno: string) => void;
  sortField?: string;
  sortDirection?: 'asc' | 'desc';
  onSort?: (field: string) => void;
}

export default function EspecialTable({ contratos, loading, onRefresh, onRenovar, sortField, sortDirection, onSort }: EspecialTableProps) {
  const navigate = useNavigate();
  const [editModalContrato, setEditModalContrato] = useState<any | null>(null);
  const [detailsModalContratoId, setDetailsModalContratoId] = useState<number | null>(null);
  const [encerrarContrato, setEncerrarContrato] = useState<any | null>(null);
  const [isEncerrando, setIsEncerrando] = useState(false);

  const [retomarContrato, setRetomarContrato] = useState<any | null>(null);
  const [isRetomando, setIsRetomando] = useState(false);
  const [showEncerrados, setShowEncerrados] = useState(false);

  const contratosFiltrados = contratos.filter(c => {
    if (showEncerrados) return true;
    const status = c.statusContrato?.toUpperCase();
    return status !== 'ENCERRADO' && status !== 'CANCELADO' && status !== 'PAUSADO' && status !== 'FINALIZADO';
  });

  const handleEncerrar = async () => {
    if (!encerrarContrato) return;
    setIsEncerrando(true);
    try {
      await contratosService.encerrar(encerrarContrato.contratoId);
      toast.success('Contrato encerrado com sucesso!');
      onRefresh?.();
      setEncerrarContrato(null);
    } catch (error: any) {
      console.error('Erro ao encerrar contrato', error);
      toast.error(error.response?.data?.message || 'Erro ao encerrar contrato');
    } finally {
      setIsEncerrando(false);
    }
  };

  const handleRetomar = async () => {
    if (!retomarContrato) return;
    setIsRetomando(true);
    try {
      await contratosService.update(retomarContrato.contratoId, {
        formaPagamento: retomarContrato.formaPagamento || 'PIX',
        status: 'ATIVO'
      });
      toast.success('Contrato retomado com sucesso!');
      onRefresh?.();
      setRetomarContrato(null);
    } catch (error: any) {
      console.error('Erro ao retomar contrato:', error);
      toast.error(error.response?.data?.message || 'Erro ao retomar contrato');
    } finally {
      setIsRetomando(false);
    }
  };

  const formatarData = (dataArray: any) => {
    if (!dataArray) return '-';
    if (Array.isArray(dataArray) && dataArray.length >= 3) {
      const [ano, mes, dia] = dataArray;
      return `${String(dia).padStart(2, '0')}/${String(mes).padStart(2, '0')}/${ano}`;
    }
    if (typeof dataArray === 'string') {
      const d = new Date(dataArray + 'T12:00:00');
      return isNaN(d.getTime()) ? '-' : d.toLocaleDateString('pt-BR');
    }
    return '-';
  };

  const getCicloColor = (ciclo: string) => {
    switch (ciclo?.toUpperCase()) {
      case 'MENSAL': return 'text-purple-400 border-purple-400/20';
      case 'TRIMESTRAL': return 'text-green-400 border-green-400/20';
      case 'SEMESTRAL': return 'text-blue-400 border-blue-400/20';
      case 'ANUAL': return 'text-yellow-400 border-yellow-400/20';
      default: return 'text-zinc-400 border-zinc-400/20';
    }
  };

  const getFinBadgeClasses = (situacao: string) => {
    const s = situacao?.toUpperCase();
    if (s === 'EM DIA' || s === 'EM_DIA' || s === 'PAGO' || s === 'ENCERRADO' || s === 'TUDO_PAGO') return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
    if (s === 'PENDENTE') return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
    if (s === 'ATRASADO' || s === 'INADIMPLENTE') return 'bg-rose-500/10 text-rose-500 border-rose-500/20';
    return 'bg-rose-500/10 text-rose-500 border-rose-500/20';
  };

  const getFinText = (situacao: string) => {
    const s = situacao?.toUpperCase();
    if (s === 'ENCERRADO' || s === 'PAGO' || s === 'TUDO_PAGO') return 'Tudo Pago';
    if (s === 'EM DIA' || s === 'EM_DIA') return 'Em Dia';
    if (s === 'PENDENTE') return 'Pendente';
    if (s === 'ATRASADO') return 'Atrasado';
    if (s === 'INADIMPLENTE') return 'Inadimplente';
    return situacao ? situacao.charAt(0).toUpperCase() + situacao.slice(1).toLowerCase() : '-';
  };

  const getDiasText = (dias: number) => {
    if (dias === null || dias === undefined) return '-';
    if (dias <= 0) return 'Finalizado';
    return `${dias} dias`;
  };

  const getDiasColor = (dias: number) => {
    if (dias === null || dias === undefined) return 'text-zinc-500';
    if (dias < 0) return 'text-rose-500';
    if (dias <= 15) return 'text-amber-500';
    return 'text-emerald-500';
  };

  const calculateProgress = (dataInicio: any, dataFim: any) => {
    if (!dataInicio || !dataFim) return 0;

    const parseDate = (data: any) => {
      if (Array.isArray(data)) return new Date(data[0], data[1] - 1, data[2]).getTime();
      return new Date(data + 'T00:00:00').getTime();
    };

    const start = parseDate(dataInicio);
    const end = parseDate(dataFim);
    const now = new Date().getTime();

    if (now >= end) return 100;
    if (now <= start) return 5;

    const total = end - start;
    const passed = now - start;
    const percentage = (passed / total) * 100;

    return Math.min(100, Math.max(5, percentage));
  };

  const getProgressBgColor = (dias: number) => {
    if (dias === null || dias === undefined) return 'bg-zinc-600';
    if (dias < 0) return 'bg-rose-500';
    if (dias <= 15) return 'bg-amber-500';
    return 'bg-emerald-500';
  };

  const getStatusBadge = (status: string) => {
    const s = status?.toUpperCase();
    if (s === 'ATIVO') return { classes: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20', text: 'Ativo' };
    if (s === 'CANCELADO') return { classes: 'bg-rose-500/10 text-rose-400 border-rose-500/20', text: 'Cancelado' };
    if (s === 'ENCERRADO' || s === 'FINALIZADO') return { classes: 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20', text: 'Encerrado' };
    if (s === 'PAUSADO') return { classes: 'bg-amber-500/10 text-amber-400 border-amber-500/20', text: 'Pausado' };
    return { classes: 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20', text: status ? status.charAt(0).toUpperCase() + status.slice(1).toLowerCase() : 'Inativo' };
  };

  const renderSortIcon = (field: string) => {
    if (sortField !== field) return <FiChevronDown className="opacity-0 group-hover:opacity-30 transition-opacity" />;
    return sortDirection === 'asc' ? <FiChevronUp className="text-red-500" /> : <FiChevronDown className="text-red-500" />;
  };

  return (
    <div className="bg-[#121212] border border-zinc-800 rounded-xl flex flex-col h-full overflow-hidden">
      {}
      <div className="p-2 flex flex-col md:flex-row justify-between items-start md:items-center border-b border-zinc-800 gap-2 shrink-0">
        <h2 className="text-white font-medium text-sm">
          Lista de Alunos do Plano Nutrição
        </h2>
        <div className="flex items-center gap-2 text-[11px] w-full md:w-auto">
          <button
            onClick={() => setShowEncerrados(!showEncerrados)}
            className="flex items-center gap-2.5 bg-[#1A1A1A] border border-zinc-800 px-3 py-1.5 rounded-lg cursor-pointer hover:bg-[#222222] transition-colors group"
          >
            <div className={`relative w-7 h-4 rounded-full transition-colors duration-300 ${showEncerrados ? 'bg-red-500' : 'bg-zinc-700'}`}>
              <div className={`absolute top-0.5 left-0.5 w-3 h-3 bg-white rounded-full transition-transform duration-300 shadow-sm ${showEncerrados ? 'translate-x-3' : 'translate-x-0'}`} />
            </div>
            <span className="text-zinc-400 group-hover:text-zinc-300 font-medium select-none transition-colors">Mostrar inativos/finalizados</span>
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto custom-scrollbar">
        <table className="w-full text-left text-xs whitespace-nowrap min-w-[850px]">
          <thead className="text-zinc-400 text-[10px] uppercase border-b border-zinc-800 bg-[#1A1A1A]/50">
            <tr>
              <th className="px-4 py-2 font-medium cursor-pointer group hover:text-zinc-200 transition-colors" onClick={() => onSort?.('nomeAluno')}>
                <div className="flex items-center gap-1">Aluno {renderSortIcon('nomeAluno')}</div>
              </th>
              <th className="px-4 py-2 font-medium cursor-pointer group hover:text-zinc-200 transition-colors" onClick={() => onSort?.('cicloPlano')}>
                <div className="flex items-center gap-1">Ciclo {renderSortIcon('cicloPlano')}</div>
              </th>
              <th className="px-4 py-2 font-medium cursor-pointer group hover:text-zinc-200 transition-colors" onClick={() => onSort?.('dataInicio')}>
                <div className="flex items-center gap-1">Início {renderSortIcon('dataInicio')}</div>
              </th>
              <th className="px-4 py-2 font-medium cursor-pointer group hover:text-zinc-200 transition-colors" onClick={() => onSort?.('dataFim')}>
                <div className="flex items-center gap-1">Fim {renderSortIcon('dataFim')}</div>
              </th>
              <th className="px-4 py-2 font-medium cursor-pointer group hover:text-zinc-200 transition-colors" onClick={() => onSort?.('tempoRestante')}>
                <div className="flex items-center gap-1">Restante {renderSortIcon('tempoRestante')}</div>
              </th>
              <th className="px-4 py-2 font-medium cursor-pointer group hover:text-zinc-200 transition-colors" onClick={() => onSort?.('situacaoFinanceira')}>
                <div className="flex items-center gap-1">Financeiro {renderSortIcon('situacaoFinanceira')}</div>
              </th>
              <th className="px-4 py-2 font-medium cursor-pointer group hover:text-zinc-200 transition-colors" onClick={() => onSort?.('statusContrato')}>
                <div className="flex items-center gap-1">Status {renderSortIcon('statusContrato')}</div>
              </th>
              <th className="px-4 py-2 font-medium text-center">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/50">
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className="animate-pulse">
                  <td className="px-4 py-2"><div className="h-6 bg-zinc-800 rounded-full w-32"></div></td>
                  <td className="px-4 py-2"><div className="h-4 bg-zinc-800 rounded w-16"></div></td>
                  <td className="px-4 py-2"><div className="h-4 bg-zinc-800 rounded w-20"></div></td>
                  <td className="px-4 py-2"><div className="h-4 bg-zinc-800 rounded w-20"></div></td>
                  <td className="px-4 py-2"><div className="h-5 bg-zinc-800 rounded-md w-20"></div></td>
                  <td className="px-4 py-2"><div className="h-5 bg-zinc-800 rounded w-20"></div></td>
                  <td className="px-4 py-2"><div className="h-5 bg-zinc-800 rounded w-16"></div></td>
                  <td className="px-4 py-2"><div className="h-5 bg-zinc-800 rounded w-24 mx-auto"></div></td>
                </tr>
              ))
            ) : contratosFiltrados.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-4 py-12 text-center text-zinc-500 flex-col items-center justify-center">
                  <FiActivity className="mx-auto text-zinc-700 mb-2" size={24} />
                  <p>Nenhum contrato encontrado para este plano.</p>
                </td>
              </tr>
            ) : (
              contratosFiltrados.map((student) => {
                const statusInfo = getStatusBadge(student.statusContrato);
                const isInactive = student.statusContrato?.toUpperCase() === 'ENCERRADO' || student.statusContrato?.toUpperCase() === 'CANCELADO';

                return (
                  <tr
                    key={student.id || student.contratoId}
                    onClick={() => setDetailsModalContratoId(student.id || student.contratoId || null)}
                    className={`hover:bg-zinc-800/30 transition-colors group cursor-pointer ${isInactive ? 'opacity-50 grayscale-[0.5]' : ''}`}
                  >
                    <td className="px-4 py-2">
                      <div className="flex items-center gap-3">
                        <img src={getImageUrl(student.imagemAluno) || `https://ui-avatars.com/api/?name=${encodeURIComponent(student.nomeAluno)}&background=222222&color=ffffff`} alt={student.nomeAluno} className="w-7 h-7 rounded-full border border-zinc-700 object-cover" />
                        <span className="text-white font-medium text-xs">{student.nomeAluno}</span>
                      </div>
                    </td>
                    <td className="px-4 py-2">
                      <span className={`${getCicloColor(student.cicloPlano)} font-medium bg-[#1A1A1A] px-2 py-1 rounded-md`}>{student.cicloPlano}</span>
                    </td>
                    <td className="px-4 py-2">
                      <div className="flex items-center gap-1.5 text-zinc-400">
                        <FiCalendar size={12} className="opacity-70" />
                        <span>{formatarData(student.dataInicio)}</span>
                      </div>
                    </td>
                    <td className="px-4 py-2">
                      <div className="flex items-center gap-1.5 text-zinc-400">
                        <FiCalendar size={12} className="opacity-70" />
                        <span>{formatarData(student.dataFim)}</span>
                      </div>
                    </td>
                    <td className="px-4 py-2">
                      <div className="flex flex-col gap-1 w-24">
                        <div className="flex items-center justify-between text-[10px] font-medium">
                          <span className={`${getDiasColor(student.tempoRestante)}`}>
                            {getDiasText(student.tempoRestante)}
                          </span>
                        </div>
                        <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${getProgressBgColor(student.tempoRestante)}`}
                            style={{ width: `${calculateProgress(student.dataInicio, student.dataFim)}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-2">
                      <div className="flex items-center">
                        <div className={`flex items-center gap-1.5 px-2 py-1 rounded border ${getFinBadgeClasses(student.situacaoFinanceira)}`}>
                          <FiCreditCard size={11} />
                          <span className="text-[10px] font-bold tracking-wide uppercase">{getFinText(student.situacaoFinanceira)}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-2">
                      <div className="flex items-center">
                        <span className={`px-2 py-1 rounded-full text-[10px] font-semibold tracking-wide border ${statusInfo.classes}`}>
                          {statusInfo.text}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-2">
                      <div className="flex items-center justify-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                        <button
                          title="Editar"
                          onClick={(e) => { e.stopPropagation(); setEditModalContrato(student); }}
                          className="p-1.5 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 rounded-md transition-colors cursor-pointer">
                          <FiEdit2 size={14} />
                        </button>
                        <button
                          title="Faturas"
                          onClick={(e) => { e.stopPropagation(); navigate('/financeiro', { state: { aluno: student.nomeAluno, scrollToFaturas: true } }); }}
                          className="p-1.5 text-zinc-300 hover:text-white hover:bg-zinc-800 rounded-md transition-colors cursor-pointer">
                          <FiFileText size={14} />
                        </button>
                        {(student.statusContrato?.toUpperCase() === 'ATIVO') && (
                          <button
                            title="Encerrar"
                            onClick={(e) => { e.stopPropagation(); setEncerrarContrato(student); }}
                            className="p-1.5 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-md transition-colors cursor-pointer">
                            <FiPower size={14} />
                          </button>
                        )}
                        {(student.statusContrato?.toUpperCase() === 'PAUSADO') && (
                          <button
                            title="Retomar"
                            onClick={(e) => { e.stopPropagation(); setRetomarContrato(student); }}
                            className="p-1.5 text-amber-400 hover:text-amber-300 hover:bg-amber-500/10 rounded-md transition-colors cursor-pointer">
                            <FiPlay size={14} />
                          </button>
                        )}
                        {(student.statusContrato?.toUpperCase() === 'ENCERRADO' || student.statusContrato?.toUpperCase() === 'FINALIZADO' || student.statusContrato?.toUpperCase() === 'CANCELADO') && (
                          <button
                            title="Renovar"
                            onClick={(e) => { e.stopPropagation(); onRenovar?.(student.nomeAluno); }}
                            className="p-1.5 text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10 rounded-md transition-colors cursor-pointer">
                            <FiRefreshCw size={14} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <EditContratoModal
        isOpen={!!editModalContrato}
        onClose={() => setEditModalContrato(null)}
        contrato={editModalContrato}
        onSuccess={() => {
          setEditModalContrato(null);
          onRefresh?.();
        }}
      />

      <ConfirmActionModal
        isOpen={!!encerrarContrato}
        onClose={() => setEncerrarContrato(null)}
        onConfirm={handleEncerrar}
        loading={isEncerrando}
        title="Encerrar Contrato"
        message={`Tem certeza que deseja encerrar o contrato de ${encerrarContrato?.nomeAluno}?`}
        actionText="Encerrar Contrato"
        isDestructive={true}
      />

      <ConfirmActionModal
        isOpen={!!retomarContrato}
        onClose={() => setRetomarContrato(null)}
        onConfirm={handleRetomar}
        loading={isRetomando}
        title="Retomar Contrato"
        message={`Tem certeza que deseja retomar o contrato de ${retomarContrato?.nomeAluno}? O status voltará a ser Ativo.`}
        actionText="Retomar Contrato"
      />

      <ContratoDetailsModal
        isOpen={!!detailsModalContratoId}
        onClose={() => setDetailsModalContratoId(null)}
        contratoId={detailsModalContratoId}
      />
    </div>
  );
}


