import { useState } from 'react';
import { FiDownload, FiChevronDown, FiChevronUp, FiPower } from 'react-icons/fi';
import EditPlanoModal from './EditPlanoModal';
import ConfirmActionModal from '../alunos/ConfirmActionModal';
import type { PlanoResponseListagemDTO } from '../../services/planosService';
import { planosService } from '../../services/planosService';
import toast from 'react-hot-toast';

interface PlanosTableProps {
  planos: PlanoResponseListagemDTO[];
  loading?: boolean;
  onRefresh?: () => void;
  sortField?: string;
  sortDirection?: 'asc' | 'desc';
  onSort?: (field: string) => void;
}

export default function PlanosTable({ planos, loading, onRefresh, sortField, sortDirection, onSort }: PlanosTableProps) {
  const [editModalPlano, setEditModalPlano] = useState<any | null>(null);
  const [confirmModalPlano, setConfirmModalPlano] = useState<PlanoResponseListagemDTO | null>(null);
  const [isToggling, setIsToggling] = useState(false);

  const formatCurrency = (val: number) => {
    if (val == null) return 'R$ 0,00';
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
  };

  const getCicloColor = (ciclo: string) => {
    switch (ciclo.toUpperCase()) {
      case 'MENSAL': return 'text-purple-400 border-purple-400/20';
      case 'TRIMESTRAL': return 'text-green-400 border-green-400/20';
      case 'SEMESTRAL': return 'text-blue-400 border-blue-400/20';
      case 'ANUAL': return 'text-yellow-400 border-yellow-400/20';
      default: return 'text-zinc-400 border-zinc-400/20';
    }
  };

  const handleToggleStatus = async () => {
    if (!confirmModalPlano) return;
    setIsToggling(true);
    try {
      if ((confirmModalPlano.planoStatus || (confirmModalPlano as any).status)?.toUpperCase() === 'ATIVO') {
        await planosService.inativarPlano(confirmModalPlano.id);
        toast.success('Plano desativado com sucesso!');
      } else {
        await planosService.reativarPlano(confirmModalPlano.id);
        toast.success('Plano ativado com sucesso!');
      }
      if (onRefresh) onRefresh();
      setConfirmModalPlano(null);
    } catch (error: any) {
      console.error('Erro ao alterar status do plano', error);
      toast.error(error.response?.data?.message || 'Ocorreu um erro ao tentar alterar o status do plano.');
    } finally {
      setIsToggling(false);
    }
  };

  const renderSortIcon = (field: string) => {
    if (sortField !== field) return <FiChevronDown className="opacity-0 group-hover:opacity-30 transition-opacity" />;
    return sortDirection === 'asc' ? <FiChevronUp className="text-red-500" /> : <FiChevronDown className="text-red-500" />;
  };

  return (
    <div className="bg-[#121212] border border-zinc-800 rounded-xl flex flex-col h-full overflow-hidden relative">
      {}
      <div className="p-2 flex flex-col md:flex-row justify-between items-start md:items-center border-b border-zinc-800 gap-2 shrink-0">
        <h2 className="text-white font-medium text-sm">Lista de Planos</h2>
      </div>

      {}
      <div className="flex-1 overflow-auto custom-scrollbar">
        <table className="w-full text-left text-xs whitespace-nowrap min-w-[800px]">
          <thead className="text-zinc-400 text-[10px] uppercase border-b border-zinc-800 bg-[#1A1A1A]/30">
            <tr>
              <th className="px-4 py-2 font-medium cursor-pointer group hover:text-zinc-200 transition-colors" onClick={() => onSort?.('nome')}>
                <div className="flex items-center gap-1">Plano {renderSortIcon('nome')}</div>
              </th>
              <th className="px-4 py-2 font-medium cursor-pointer group hover:text-zinc-200 transition-colors" onClick={() => onSort?.('ciclo')}>
                <div className="flex items-center gap-1">Ciclo {renderSortIcon('ciclo')}</div>
              </th>
              <th className="px-4 py-2 font-medium cursor-pointer group hover:text-zinc-200 transition-colors" onClick={() => onSort?.('valor_base')}>
                <div className="flex items-center gap-1">Valor Base {renderSortIcon('valor_base')}</div>
              </th>
              <th className="px-4 py-2 font-medium text-center cursor-pointer group hover:text-zinc-200 transition-colors" onClick={() => onSort?.('quantidadeAlunos')}>
                <div className="flex items-center justify-center gap-1">Alunos Vinculados {renderSortIcon('quantidadeAlunos')}</div>
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
                <tr key={i} className="animate-pulse">
                  <td className="px-4 py-3"><div className="h-4 bg-zinc-800 rounded w-3/4"></div></td>
                  <td className="px-4 py-3"><div className="h-4 bg-zinc-800 rounded w-1/2"></div></td>
                  <td className="px-4 py-3"><div className="h-4 bg-zinc-800 rounded w-16"></div></td>
                  <td className="px-4 py-3"><div className="h-4 bg-zinc-800 rounded w-8 mx-auto"></div></td>
                  <td className="px-4 py-3"><div className="h-4 bg-zinc-800 rounded w-12 mx-auto"></div></td>
                  <td className="px-4 py-3"><div className="h-4 bg-zinc-800 rounded w-16 mx-auto"></div></td>
                </tr>
              ))
            ) : planos.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-zinc-500">
                  Nenhum plano cadastrado.
                </td>
              </tr>
            ) : (
              planos.map((plano) => (
                <tr key={plano.id} className="hover:bg-[#1A1A1A]/50 transition-colors group">
                  <td className="px-4 py-2 text-zinc-300 font-medium">
                    {plano.nome}
                  </td>
                  <td className="px-4 py-2">
                    <span className={`${getCicloColor(plano.ciclo)} font-medium bg-[#1A1A1A] px-2 py-1 rounded-md`}>{plano.ciclo}</span>
                  </td>
                  <td className="px-4 py-2 text-zinc-300">{formatCurrency(plano.valorBase)}</td>
                  <td className="px-4 py-2 text-center text-zinc-300">
                    {plano.quantidadeAlunos}
                  </td>
                  <td className="px-4 py-2 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      <div className={`w-1.5 h-1.5 rounded-full ${(plano.planoStatus || (plano as any).status)?.toUpperCase() === 'ATIVO' ? 'bg-green-500' : 'bg-zinc-600'}`}></div>
                      <span className={(plano.planoStatus || (plano as any).status)?.toUpperCase() === 'ATIVO' ? 'text-green-500' : 'text-zinc-500'}>
                        {(plano.planoStatus || (plano as any).status)?.toUpperCase() === 'ATIVO' ? 'Ativo' : 'Inativo'}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex items-center justify-center gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => setEditModalPlano(plano)}
                        className="w-[50px] text-center text-blue-400 font-medium hover:text-blue-300 border border-blue-500 hover:bg-blue-500/10 rounded py-0.5 text-[10px] transition-colors cursor-pointer"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => setConfirmModalPlano(plano)}
                        className={`w-[75px] justify-center border rounded py-0.5 text-[10px] transition-colors cursor-pointer flex items-center gap-1 font-medium ${(plano.planoStatus || (plano as any).status)?.toUpperCase() === 'ATIVO' ? 'text-red-400 border-red-500 hover:bg-red-500/10 hover:text-red-300' : 'text-green-400 border-green-500 hover:bg-green-500/10 hover:text-green-300'}`}
                      >
                        <FiPower size={10} className="shrink-0" />
                        {(plano.planoStatus || (plano as any).status)?.toUpperCase() === 'ATIVO' ? 'Desativar' : 'Ativar'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <EditPlanoModal
        isOpen={!!editModalPlano}
        onClose={() => setEditModalPlano(null)}
        plano={editModalPlano}
        onSuccess={() => {
          setEditModalPlano(null);
          if (onRefresh) onRefresh();
        }}
      />

      <ConfirmActionModal
        isOpen={!!confirmModalPlano}
        onClose={() => setConfirmModalPlano(null)}
        onConfirm={handleToggleStatus}
        loading={isToggling}
        title={(confirmModalPlano?.planoStatus || (confirmModalPlano as any)?.status)?.toUpperCase() === 'ATIVO' ? 'Desativar Plano' : 'Ativar Plano'}
        message={(confirmModalPlano?.planoStatus || (confirmModalPlano as any)?.status)?.toUpperCase() === 'ATIVO'
          ? `Você tem certeza que deseja desativar o plano ${confirmModalPlano?.nome}? Ele não estará mais disponível para novos contratos.`
          : `Você deseja reativar o plano ${confirmModalPlano?.nome}? Ele voltará a aparecer nas opções.`}
        actionText={(confirmModalPlano?.planoStatus || (confirmModalPlano as any)?.status)?.toUpperCase() === 'ATIVO' ? 'Desativar' : 'Ativar'}
        isDestructive={(confirmModalPlano?.planoStatus || (confirmModalPlano as any)?.status)?.toUpperCase() === 'ATIVO'}
      />

    </div>
  );
}
