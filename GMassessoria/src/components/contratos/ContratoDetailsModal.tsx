import { FiX, FiCheckCircle, FiAlertCircle, FiPhone, FiExternalLink } from 'react-icons/fi';
import type { ContratoDetalhesDTO } from '../../services/contratosService';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { contratosService } from '../../services/contratosService';
import { getImageUrl } from '../../utils/imageUrl';

interface ContratoDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  contratoId: number | null;
}

export default function ContratoDetailsModal({ isOpen, onClose, contratoId }: ContratoDetailsModalProps) {
  const navigate = useNavigate();
  const [contrato, setContrato] = useState<ContratoDetalhesDTO | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && contratoId) {
      const fetchContrato = async () => {
        setLoading(true);
        try {
          const data = await contratosService.getDetalhesContrato(contratoId);
          setContrato(data);
        } catch (error) {
          console.error("Erro ao buscar detalhes do contrato:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchContrato();
    } else {
      setContrato(null);
    }
  }, [isOpen, contratoId]);

  if (!isOpen) return null;

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

  const getStatusColor = (status: string) => {
    switch (status?.toUpperCase()) {
      case 'ATIVO': return 'text-blue-400 border-blue-500/30 bg-blue-500/10';
      case 'CANCELADO': return 'text-red-400 border-red-500/30 bg-red-500/10';
      case 'ENCERRADO': return 'text-orange-400 border-orange-500/30 bg-orange-500/10';
      case 'PAUSADO': return 'text-yellow-400 border-yellow-500/30 bg-yellow-500/10';
      default: return 'text-zinc-400 border-zinc-500/30 bg-zinc-500/10';
    }
  };

  const getStatusText = (status: string) => {
    switch (status?.toUpperCase()) {
      case 'ATIVO': return 'Contrato Ativo';
      case 'CANCELADO': return 'Contrato Cancelado';
      case 'ENCERRADO': return 'Contrato Encerrado';
      case 'PAUSADO': return 'Contrato Pausado';
      default: return status ? status.charAt(0).toUpperCase() + status.slice(1).toLowerCase() : 'Desconhecido';
    }
  };

  const getDiasColor = (dias: number) => {
    if (dias === null || dias === undefined) return 'text-zinc-500';
    if (dias < 0) return 'text-red-500';
    if (dias <= 15) return 'text-orange-400';
    return 'text-green-500';
  };

  const formatCurrency = (value?: number) => {
    if (value === undefined || value === null) return '-';
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const getTempoRestante = (fim: any) => {
    if (!fim) return 0;

    let dataFim = Array.isArray(fim) ? new Date(fim[0], fim[1] - 1, fim[2]) : new Date(fim + 'T00:00:00');
    dataFim.setHours(0, 0, 0, 0);

    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    const diff = Math.round((dataFim.getTime() - hoje.getTime()) / (1000 * 60 * 60 * 24));
    return diff;
  };

  const getComputedStatus = (fim: any) => {
    const diff = getTempoRestante(fim);
    return diff < 0 ? 'ENCERRADO' : 'ATIVO';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm transition-opacity">
      <div
        className="bg-[#0A0A0A] border border-zinc-800 rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200"
        onClick={e => e.stopPropagation()}
      >

        {}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800/60 bg-[#121212]">
          <h2 className="text-white text-lg font-semibold tracking-tight">Detalhes do Contrato</h2>
          <button
            onClick={onClose}
            className="text-zinc-500 hover:text-white hover:bg-zinc-800 p-1.5 rounded-full transition-colors cursor-pointer"
          >
            <FiX size={20} />
          </button>
        </div>

        {loading ? (
          <div className="p-12 flex flex-col items-center justify-center space-y-4">
            <div className="w-8 h-8 border-4 border-zinc-800 border-t-red-600 rounded-full animate-spin"></div>
            <p className="text-zinc-400 text-sm">Carregando detalhes...</p>
          </div>
        ) : !contrato ? (
          <div className="p-12 text-center text-zinc-500">Contrato não encontrado.</div>
        ) : (
          <div className="overflow-y-auto custom-scrollbar flex-1 p-6 space-y-6">

            {}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-5 bg-[#121212] rounded-xl border border-zinc-800/50">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-zinc-800 bg-zinc-900 flex-shrink-0">
                  {contrato.imagemAluno ? (
                    <img src={getImageUrl(contrato.imagemAluno) || ''} alt={contrato.nomeAluno} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-zinc-500 text-xl font-medium">
                      {contrato.nomeAluno ? contrato.nomeAluno.substring(0, 2).toUpperCase() : '-'}
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="text-white font-medium text-lg leading-tight">{contrato.nomeAluno}</h3>
                  <div className="flex items-center gap-1.5 mt-1">
                    <FiPhone className="text-zinc-500" size={12} />
                    <p className="text-zinc-500 text-sm">{contrato.telefoneAluno || 'Não informado'}</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 md:mt-0 flex flex-col items-start md:items-end gap-2">
                <div className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(getComputedStatus(contrato.finalContrato))}`}>
                  {getStatusText(getComputedStatus(contrato.finalContrato))}
                </div>
                <div className="text-right">
                  <p className="text-zinc-400 text-xs">Tempo restante</p>
                  <p className={`text-sm font-bold ${getDiasColor(getTempoRestante(contrato.finalContrato))}`}>
                    {getTempoRestante(contrato.finalContrato) >= 0 ? `${getTempoRestante(contrato.finalContrato)} dias` : 'Finalizado'}
                  </p>
                </div>
                <p className="text-zinc-500 text-xs">Vencimento: {formatarData(contrato.finalContrato)}</p>
              </div>
            </div>

            {}
            <div className="space-y-4">
              <h4 className="text-white text-sm font-medium border-b border-zinc-800/50 pb-2">Informações do Contrato</h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                <div className="flex justify-between items-center text-sm border-b border-zinc-800/30 pb-2">
                  <span className="text-zinc-400">Plano</span>
                  <span className="text-blue-400 font-medium">{contrato.planoCiclo || '-'}</span>
                </div>
                <div className="flex justify-between items-center text-sm border-b border-zinc-800/30 pb-2">
                  <span className="text-zinc-400">Modalidade</span>
                  <span className="text-zinc-200">{contrato.planoCategoria || '-'}</span>
                </div>
                <div className="flex justify-between items-center text-sm border-b border-zinc-800/30 pb-2">
                  <span className="text-zinc-400">Início do contrato</span>
                  <span className="text-zinc-200">{formatarData(contrato.inicioContrato)}</span>
                </div>
                <div className="flex justify-between items-center text-sm border-b border-zinc-800/30 pb-2">
                  <span className="text-zinc-400">Fim do contrato</span>
                  <span className="text-zinc-200">{formatarData(contrato.finalContrato)}</span>
                </div>
                <div className="flex justify-between items-center text-sm border-b border-zinc-800/30 pb-2">
                  <span className="text-zinc-400">Duração inicial</span>
                  <span className="text-zinc-200">{contrato.planoCiclo === 'MENSAL' ? '1 mês' : contrato.planoCiclo === 'TRIMESTRAL' ? '3 meses' : contrato.planoCiclo === 'SEMESTRAL' ? '6 meses' : contrato.planoCiclo === 'ANUAL' ? '1 ano' : '-'}</span>
                </div>
                <div className="flex justify-between items-center text-sm border-b border-zinc-800/30 pb-2">
                  <span className="text-zinc-400">Valor mensal</span>
                  <span className="text-zinc-200 font-medium">{formatCurrency(contrato.valorContrato)}</span>
                </div>
                <div className="flex justify-between items-center text-sm border-b border-zinc-800/30 pb-2">
                  <span className="text-zinc-400">Forma de pagamento</span>
                  <span className="text-zinc-200">{contrato.formaPagamento || '-'}</span>
                </div>
                <div className="flex justify-between items-center text-sm border-b border-zinc-800/30 pb-2">
                  <span className="text-zinc-400">Desconto</span>
                  <span className="text-green-500 font-medium">{contrato.descontoContrato > 0 ? `${contrato.descontoContrato}%` : '-'}</span>
                </div>
                <div className="col-span-1 sm:col-span-2 flex justify-between items-center text-sm border-b border-zinc-800/30 pb-2">
                  <span className="text-zinc-400">Motivo do desconto</span>
                  <span className="text-zinc-200">{contrato.descontoContrato > 0 ? (contrato.motivoDesconto || 'Não informado') : '-'}</span>
                </div>
              </div>
            </div>

            {}
            <div className="space-y-4 pt-4 border-t border-zinc-800/50">
              <h4 className="text-white text-sm font-medium">Histórico de Pagamentos</h4>

              <div className="bg-[#121212] border border-zinc-800/50 rounded-xl overflow-hidden">
                {(!contrato.historicoPagamento || contrato.historicoPagamento.length === 0) ? (
                  <div className="p-6 text-center text-zinc-500 text-sm">
                    Nenhum pagamento registrado.
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-[1fr_1.2fr_1fr_1fr_40px] sm:grid-cols-[1fr_1.2fr_1fr_1fr_1fr_70px] gap-3 sm:gap-8 px-4 py-3 border-b border-zinc-800/50 bg-zinc-900/80 text-[10px] text-zinc-400 font-semibold uppercase tracking-wider">
                      <div>Vencimento</div>
                      <div>Pagamento</div>
                      <div>Valor</div>
                      <div>Status</div>
                      <div className="hidden sm:block">Forma</div>
                      <div></div>
                    </div>
                    {contrato.historicoPagamento.map((item, idx) => {
                      const statusColors = {
                        'PAGO': 'bg-green-500/10 text-green-500',
                        'ATRASADO': 'bg-red-500/10 text-red-500',
                        'VENCIDA': 'bg-red-500/10 text-red-500',
                        'PENDENTE': 'bg-yellow-500/10 text-yellow-500'
                      };
                      const badgeColor = statusColors[item.statusPagamento?.toUpperCase() as keyof typeof statusColors] || 'bg-zinc-500/10 text-zinc-500';
                      const Icon = item.statusPagamento?.toUpperCase() === 'PAGO' ? FiCheckCircle : FiAlertCircle;
                      const iconColor = item.statusPagamento?.toUpperCase() === 'PAGO' ? 'text-green-500' : (item.statusPagamento?.toUpperCase() === 'PENDENTE' ? 'text-yellow-500' : 'text-red-500');

                      return (
                        <div key={idx} className={`grid grid-cols-[1fr_1.2fr_1fr_1fr_40px] sm:grid-cols-[1fr_1.2fr_1fr_1fr_1fr_70px] gap-3 sm:gap-8 items-center px-4 py-3 ${idx !== contrato.historicoPagamento.length - 1 ? 'border-b border-zinc-800/50' : ''} hover:bg-zinc-800/20 transition-colors`}>
                          <div>
                            <span className="text-xs text-zinc-400">{formatarData(item.dataVencimento)}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Icon className={iconColor} size={14} />
                            <span className="text-xs text-zinc-200 font-medium">{item.dataPagamento ? formatarData(item.dataPagamento) : '-'}</span>
                          </div>
                          <div className="text-xs text-zinc-300 font-medium">
                            {formatCurrency(item.valorPagamento)}
                          </div>
                          <div>
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold tracking-wide ${badgeColor}`}>
                              {item.statusPagamento}
                            </span>
                          </div>
                          <div className="text-xs text-zinc-400 hidden sm:block truncate">
                            {item.formaPagamento}
                          </div>
                          <div className="flex justify-end">
                            <button
                              title="Visualizar fatura correspondente"
                              onClick={(e) => {
                                e.stopPropagation();
                                const d = new Date(item.dataVencimento + 'T12:00:00');
                                if (!isNaN(d.getTime())) {
                                  navigate('/financeiro', { 
                                    state: { 
                                      aluno: contrato.nomeAluno, 
                                      mes: d.getMonth() + 1, 
                                      ano: d.getFullYear(),
                                      scrollToFaturas: true 
                                    } 
                                  });
                                  onClose();
                                }
                              }}
                              className="flex items-center justify-center gap-1 px-1.5 py-1 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/20 rounded transition-colors cursor-pointer w-full sm:w-auto"
                            >
                              <span className="text-[9px] font-semibold uppercase tracking-wider hidden sm:block">Fatura</span>
                              <FiExternalLink size={10} />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </>
                )}
              </div>
            </div>

          </div>
        )}

        {}
        <div className="p-4 border-t border-zinc-800/60 bg-[#121212] flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors cursor-pointer"
          >
            Fechar
          </button>
        </div>

      </div>
    </div>
  );
}
