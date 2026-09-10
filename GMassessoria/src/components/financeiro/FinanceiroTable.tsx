import { useState, useRef, useEffect } from 'react';
import { FiMoreVertical, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import financeiroService, { type ListagemFaturasDTO } from '../../services/financeiroService';
import ConfirmActionModal from '../alunos/ConfirmActionModal';
import toast from 'react-hot-toast';
import MonthYearPicker from '../common/MonthYearPicker';

interface FinanceiroTableProps {
  faturas: ListagemFaturasDTO[];
  loading?: boolean;
  onRefresh?: () => void;
  month: number;
  year: number;
  onMonthChange: (month: number) => void;
  onYearChange: (year: number) => void;
  sortField?: string;
  sortDirection?: 'asc' | 'desc';
  onSort?: (field: string) => void;
  isScrollable?: boolean;
}

export default function FinanceiroTable({ faturas, loading, onRefresh, month, year, onMonthChange, onYearChange, sortField, sortDirection, onSort, isScrollable = true }: FinanceiroTableProps) {
  const [faturaToPay, setFaturaToPay] = useState<ListagemFaturasDTO | null>(null);
  const [faturaToCancel, setFaturaToCancel] = useState<ListagemFaturasDTO | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
  }, [isScrollable]);

  const formatCurrency = (value?: number) => {
    if (value === undefined || value === null) return 'R$ 0,00';
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
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

  const checkMonthDifference = (venc: any, pag: any) => {
    if (!venc || !pag) return false;
    
    let m1, y1, m2, y2;
    
    if (Array.isArray(venc) && venc.length >= 2) {
      y1 = venc[0]; m1 = venc[1];
    } else if (typeof venc === 'string') {
      const d = new Date(venc + 'T12:00:00');
      if (!isNaN(d.getTime())) { y1 = d.getFullYear(); m1 = d.getMonth() + 1; }
    }
    
    if (Array.isArray(pag) && pag.length >= 2) {
      y2 = pag[0]; m2 = pag[1];
    } else if (typeof pag === 'string') {
      const d = new Date(pag + 'T12:00:00');
      if (!isNaN(d.getTime())) { y2 = d.getFullYear(); m2 = d.getMonth() + 1; }
    }
    
    if (m1 && y1 && m2 && y2) {
      return m1 !== m2 || y1 !== y2;
    }
    return false;
  };

  const renderDatas = (vencimento: any, pagamento: any) => {
    const vStr = formatarData(vencimento);
    const pStr = formatarData(pagamento);
    const isPaid = !!pagamento;
    const diffMonth = checkMonthDifference(vencimento, pagamento);

    return (
      <div className="flex flex-col gap-1.5 py-1">
        <div className="flex items-center gap-1.5 text-zinc-300">
          <div className="bg-zinc-800/80 px-1.5 py-0.5 rounded text-[9px] uppercase font-bold text-zinc-400 w-10 text-center">Venc</div>
          <span>{vStr}</span>
        </div>
        
        {isPaid ? (
          <div className="flex items-center gap-1.5">
            <div className="bg-green-500/10 border border-green-500/20 px-1.5 py-0.5 rounded text-[9px] uppercase font-bold text-green-500 w-10 text-center">Pago</div>
            <span className="text-green-400 font-medium">{pStr}</span>
            {diffMonth && (
              <span className="ml-1 text-[9px] bg-orange-500/10 text-orange-400 border border-orange-500/20 px-1.5 py-0.5 rounded-full font-medium whitespace-nowrap">
                Mês Diferente
              </span>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-1.5">
            <div className="bg-zinc-800/40 px-1.5 py-0.5 rounded text-[9px] uppercase font-bold text-zinc-600 w-10 text-center">Pgto</div>
            <span className="text-zinc-500 italic text-[11px]">Pendente</span>
          </div>
        )}
      </div>
    );
  };

  const getStatusInfo = (status: string) => {
    const s = status?.toUpperCase();
    if (s === 'PAGO' || s === 'ENCERRADO') return { text: s === 'ENCERRADO' ? 'Tudo Pago' : 'Pago', color: 'text-green-500 bg-green-500/10', action: 'Cancelar Pagamento', highlight: false, isPayable: false, isCancelable: true };
    if (s === 'PENDENTE') return { text: 'Pendente', color: 'text-yellow-500 bg-yellow-500/10', action: 'Realizar Pagamento', highlight: true, isPayable: true, isCancelable: false };
    if (s === 'ATRASADO' || s === 'VENCIDA') return { text: s === 'VENCIDA' ? 'Vencido' : 'Atrasado', color: 'text-red-500 bg-red-500/10', action: 'Realizar Pagamento', highlight: true, isPayable: true, isCancelable: false };
    return { text: status, color: 'text-zinc-500 bg-zinc-500/10', action: '-', highlight: false, isPayable: false, isCancelable: false };
  };

  const getPlanoColor = (plano: string) => {
    const p = plano?.toLowerCase() || '';
    if (p.includes('corrida')) return 'text-blue-400';
    if (p.includes('nutri')) return 'text-green-400';
    if (p.includes('especial')) return 'text-purple-400';
    return 'text-zinc-300';
  };

  const renderSortIcon = (field: string) => {
    if (sortField !== field) return <FiChevronDown className="opacity-0 group-hover:opacity-30 transition-opacity" />;
    return sortDirection === 'asc' ? <FiChevronUp className="text-red-500" /> : <FiChevronDown className="text-red-500" />;
  };

  const handleConfirmPay = async () => {
    if (!faturaToPay || !faturaToPay.id) return;
    try {
      await financeiroService.pagamentoFatura(faturaToPay.id);
      toast.success('Pagamento registrado com sucesso!');
      if (onRefresh) onRefresh();
    } catch (error: any) {
      console.error('Erro ao pagar fatura', error);
      toast.error(error.response?.data?.message || 'Erro ao processar o pagamento.');
    } finally {
      setFaturaToPay(null);
    }
  };

  const handleConfirmCancel = async () => {
    if (!faturaToCancel || !faturaToCancel.id) return;
    try {
      await financeiroService.estornarFatura(faturaToCancel.id);
      toast.success('Pagamento cancelado com sucesso!');
      if (onRefresh) onRefresh();
    } catch (error: any) {
      console.error('Erro ao cancelar pagamento', error);
      toast.error(error.response?.data?.message || 'Erro ao cancelar o pagamento.');
    } finally {
      setFaturaToCancel(null);
    }
  };

  return (
    <div className="bg-[#121212] border border-zinc-800 rounded-xl flex flex-col h-full overflow-hidden relative">
      {}
      <div className="px-4 py-2 flex flex-col md:flex-row justify-between items-start md:items-center border-b border-zinc-800 gap-2 shrink-0">
        <h2 className="text-white font-medium text-sm">Faturas do Mês</h2>
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

      {}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-auto custom-scrollbar"
      >
        <table className="w-full text-left text-xs whitespace-nowrap min-w-[800px]">
          <thead className="text-zinc-400 text-[10px] uppercase border-b border-zinc-800 bg-[#1A1A1A]/30">
            <tr>
              <th className="px-4 py-2 font-medium cursor-pointer group hover:text-zinc-200 transition-colors" onClick={() => onSort?.('dataVencimento')}>
                <div className="flex items-center gap-1">Datas {renderSortIcon('dataVencimento')}</div>
              </th>
              <th className="px-4 py-2 font-medium cursor-pointer group hover:text-zinc-200 transition-colors" onClick={() => onSort?.('aluno')}>
                <div className="flex items-center gap-1">Aluno {renderSortIcon('aluno')}</div>
              </th>
              <th className="px-4 py-2 font-medium cursor-pointer group hover:text-zinc-200 transition-colors" onClick={() => onSort?.('plano')}>
                <div className="flex items-center gap-1">Contrato {renderSortIcon('plano')}</div>
              </th>
              <th className="px-4 py-2 font-medium cursor-pointer group hover:text-zinc-200 transition-colors" onClick={() => onSort?.('valorCobrado')}>
                <div className="flex items-center gap-1">Valor {renderSortIcon('valorCobrado')}</div>
              </th>
              <th className="px-4 py-2 font-medium text-center cursor-pointer group hover:text-zinc-200 transition-colors" onClick={() => onSort?.('formaPagamento')}>
                <div className="flex items-center justify-center gap-1">Forma Pgto {renderSortIcon('formaPagamento')}</div>
              </th>
              <th className="px-4 py-2 font-medium text-center cursor-pointer group hover:text-zinc-200 transition-colors" onClick={() => onSort?.('status')}>
                <div className="flex items-center justify-center gap-1">Status {renderSortIcon('status')}</div>
              </th>
              <th className="px-4 py-2 font-medium text-center">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/50">
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={`skel-${i}`} className="animate-pulse">
                  <td className="px-4 py-3"><div className="h-8 bg-zinc-800 rounded w-28"></div></td>
                  <td className="px-4 py-3"><div className="h-6 bg-zinc-800 rounded w-32"></div></td>
                  <td className="px-4 py-3"><div className="h-4 bg-zinc-800 rounded w-28"></div></td>
                  <td className="px-4 py-3"><div className="h-4 bg-zinc-800 rounded w-20"></div></td>
                  <td className="px-4 py-3"><div className="h-4 bg-zinc-800 rounded w-16 mx-auto"></div></td>
                  <td className="px-4 py-3"><div className="h-4 bg-zinc-800 rounded w-16 mx-auto"></div></td>
                  <td className="px-4 py-3"><div className="h-4 bg-zinc-800 rounded w-20 mx-auto"></div></td>
                </tr>
              ))
            ) : faturas.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-8 text-center text-zinc-500 text-xs">
                  Nenhuma fatura encontrada com os filtros atuais.
                </td>
              </tr>
            ) : (
              faturas.map((fatura, idx) => {
                const statusInfo = getStatusInfo(fatura.status);
                const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(fatura.aluno)}&background=222222&color=ffffff`;

                return (
                  <tr key={idx} className="hover:bg-[#1A1A1A]/50 transition-colors group">
                    <td className="px-4 py-2">
                      {renderDatas(fatura.dataVencimento, fatura.dataPagamento)}
                    </td>
                    <td className="px-4 py-2">
                      <div className="flex items-center gap-2">
                        <img src={avatarUrl} alt={fatura.aluno} className="w-6 h-6 rounded-full border border-zinc-700" />
                        <span className="text-white font-medium">{fatura.aluno}</span>
                      </div>
                    </td>
                    <td className="px-4 py-2 text-zinc-300">
                      <span className={`font-semibold ${getPlanoColor(fatura.plano)}`}>{fatura.plano}</span> - {fatura.ciclo}
                    </td>
                    <td className="px-4 py-2 text-white font-medium">
                      {formatCurrency(fatura.valorCobrado)}
                    </td>
                    <td className="px-4 py-2 text-zinc-300 text-center">
                      {fatura.formaPagamento || '-'}
                    </td>
                    <td className="px-4 py-2 text-center">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-medium border border-transparent ${statusInfo.color}`}>
                        {statusInfo.text}
                      </span>
                    </td>
                    <td className="px-4 py-2">
                      <div className="flex items-center justify-center gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => {
                            if (statusInfo.isPayable) {
                              setFaturaToPay(fatura);
                            } else if (statusInfo.isCancelable) {
                              setFaturaToCancel(fatura);
                            }
                          }}
                          className={`rounded px-2 py-0.5 text-[10px] transition-colors cursor-pointer ${statusInfo.highlight
                              ? 'text-red-400 font-medium hover:text-red-300 border border-red-500 hover:bg-red-500/10'
                              : 'text-zinc-300 font-medium hover:text-white border border-zinc-500 hover:bg-zinc-800/50'
                            }`}
                        >
                          {statusInfo.action}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <ConfirmActionModal 
        isOpen={!!faturaToPay}
        onClose={() => setFaturaToPay(null)}
        onConfirm={handleConfirmPay}
        title="Confirmar Pagamento"
        message={`Você deseja confirmar o recebimento desta fatura no valor de ${formatCurrency(faturaToPay?.valorCobrado)} do aluno(a) ${faturaToPay?.aluno}?`}
        actionText="Confirmar Pagamento"
        isDestructive={true}
      />

      <ConfirmActionModal 
        isOpen={!!faturaToCancel}
        onClose={() => setFaturaToCancel(null)}
        onConfirm={handleConfirmCancel}
        title="Cancelar Pagamento"
        message={`Você deseja cancelar o pagamento da fatura de ${formatCurrency(faturaToCancel?.valorCobrado)} do aluno(a) ${faturaToCancel?.aluno}? A fatura voltará a constar como pendente.`}
        actionText="Confirmar Cancelamento"
        isDestructive={true}
      />
    </div>
  );
}
