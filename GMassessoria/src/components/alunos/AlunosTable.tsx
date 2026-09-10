import { useState } from 'react';
import { FiChevronDown, FiChevronUp, FiCalendar, FiFileText } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import EditAlunoModal from './EditAlunoModal';
import CreateContratoModal from '../contratos/CreateContratoModal';
import { getImageUrl } from '../../utils/imageUrl';
import type { AlunoListagemView } from '../../services/alunosService';

interface AlunosTableProps {
  alunos: AlunoListagemView[];
  loading?: boolean;
  onRefresh?: () => void;
  sortField?: string;
  sortDirection?: 'asc' | 'desc';
  onSort?: (field: string) => void;
}

const formatarData = (data: any) => {
  if (!data) return '-';
  if (Array.isArray(data)) {
    return new Date(data[0], data[1] - 1, data[2]).toLocaleDateString('pt-BR');
  }
  return new Date(data + 'T00:00:00').toLocaleDateString('pt-BR');
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

const getProgressColor = (diasRestantes: number) => {
  if (diasRestantes > 15) return 'bg-green-500';
  if (diasRestantes > 5) return 'bg-yellow-500';
  if (diasRestantes >= 0) return 'bg-orange-500';
  return 'bg-red-500';
};

const getProgressTextColor = (diasRestantes: number) => {
  if (diasRestantes > 15) return 'text-green-500';
  if (diasRestantes > 5) return 'text-yellow-500';
  if (diasRestantes >= 0) return 'text-orange-500';
  return 'text-red-500';
};

export default function AlunosTable({ alunos, loading, onRefresh, sortField, sortDirection, onSort }: AlunosTableProps) {
  const navigate = useNavigate();
  const [editModalStudent, setEditModalStudent] = useState<any | null>(null);
  const [createModalStudent, setCreateModalStudent] = useState<any | null>(null);

  const renderSortIcon = (field: string) => {
    if (sortField !== field) return <FiChevronDown className="opacity-0 group-hover:opacity-30 transition-opacity" />;
    return sortDirection === 'asc' ? <FiChevronUp className="text-red-500" /> : <FiChevronDown className="text-red-500" />;
  };

  return (
    <div className="bg-[#121212] border border-zinc-800 rounded-xl flex flex-col h-full overflow-hidden relative">

      {}
      <div className="px-4 py-2 flex flex-col md:flex-row justify-between items-start md:items-center border-b border-zinc-800 gap-2 shrink-0">
        <h2 className="text-white font-medium text-sm">Lista de Alunos</h2>
      </div>

      {}
      <div className="flex-1 overflow-auto custom-scrollbar">
        <table className="w-full text-left text-xs whitespace-nowrap min-w-[900px]">
          <thead className="text-zinc-400 text-[10px] uppercase border-b border-zinc-800 bg-[#1A1A1A]/30">
            <tr>
              <th className="px-4 py-2 font-medium cursor-pointer group hover:text-zinc-200 transition-colors" onClick={() => onSort?.('nome')}>
                <div className="flex items-center gap-1">Aluno {renderSortIcon('nome')}</div>
              </th>
              <th className="px-4 py-2 font-medium text-center cursor-pointer group hover:text-zinc-200 transition-colors" onClick={() => onSort?.('statusAluno')}>
                <div className="flex items-center justify-center gap-1">Status (Aluno) {renderSortIcon('statusAluno')}</div>
              </th>
              <th className="px-4 py-2 font-medium cursor-pointer group hover:text-zinc-200 transition-colors" onClick={() => onSort?.('tempoRestante')}>
                <div className="flex items-center gap-1">Contrato Vigente {renderSortIcon('tempoRestante')}</div>
              </th>
              <th className="px-4 py-2 font-medium text-center cursor-pointer group hover:text-zinc-200 transition-colors" onClick={() => onSort?.('statusFinanceiro')}>
                <div className="flex items-center justify-center gap-1">Financeiro {renderSortIcon('statusFinanceiro')}</div>
              </th>
              <th className="px-4 py-2 font-medium text-center">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/50">
            {loading ? (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-zinc-500">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-zinc-600 border-t-red-500 rounded-full animate-spin"></div>
                    <span className="text-xs">Carregando alunos...</span>
                  </div>
                </td>
              </tr>
            ) : alunos.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-zinc-500 text-xs">
                  Nenhum aluno encontrado.
                </td>
              </tr>
            ) : (
              alunos.map((aluno) => {
                const hasPlano = aluno.plano && aluno.plano.toUpperCase() !== 'NENHUM' && aluno.plano.trim() !== '';

                return (
                  <tr key={aluno.id} className="hover:bg-[#1A1A1A]/50 transition-colors group">
                    {}
                    <td className="px-4 py-2">
                      <div className="flex items-center gap-3">
                        {aluno.imagem ? (
                          <img src={getImageUrl(aluno.imagem) || ''} alt={aluno.nome} className="w-7 h-7 rounded-full object-cover border border-zinc-700" />
                        ) : (
                          <div className="w-7 h-7 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-300 font-medium shrink-0 text-[10px]">
                            {aluno.nome.substring(0, 2).toUpperCase()}
                          </div>
                        )}
                        <span className="text-white font-medium text-xs">{aluno.nome}</span>
                      </div>
                    </td>

                    {}
                    <td className="px-4 py-2 text-center">
                      <div className="flex flex-col items-center justify-center gap-0.5">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold tracking-wide border border-transparent ${aluno.statusAluno?.toUpperCase() === 'ATIVO' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                          {aluno.statusAluno?.toUpperCase() === 'ATIVO' ? 'ATIVO' : 'INATIVO'}
                        </span>
                        <div className="flex items-center gap-1 text-zinc-500 text-[9px]">
                          <FiCalendar size={8} className="shrink-0" />
                          <span>{formatarData(aluno.dataCadastro || aluno.data_cadastro)}</span>
                        </div>
                      </div>
                    </td>

                    {}
                    <td className="px-4 py-2 min-w-[300px]">
                      {!hasPlano ? (
                        <div className="flex items-center gap-2 opacity-60 h-[36px]">
                          <FiFileText className="text-zinc-500 shrink-0" size={14} />
                          <span className="text-zinc-400 font-medium text-xs">Nenhum contrato ativo</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-4 w-full max-w-[350px]">
                          <div className="flex items-center gap-2 min-w-[90px]">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center border shrink-0 ${aluno.plano.toLowerCase().includes('corrida') ? 'bg-blue-500/10 border-blue-500/30 text-blue-400' :
                              aluno.plano.toLowerCase().includes('nutri') ? 'bg-purple-500/10 border-purple-500/30 text-purple-400' :
                                aluno.plano.toLowerCase().includes('especial') ? 'bg-pink-500/10 border-pink-500/30 text-pink-400' :
                                  aluno.plano.toLowerCase().includes('personal') ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400' :
                                    'bg-zinc-800 border-zinc-700 text-zinc-300'
                              }`}>
                              <FiFileText size={10} />
                            </div>
                            <span className="text-white font-medium text-[11px] truncate">{aluno.plano}</span>
                          </div>

                          <div className="flex-1 flex flex-col justify-center">
                            <div className="flex items-center justify-between text-[9px] font-medium mb-1">
                              <span className={getProgressTextColor(aluno.tempoRestante)}>
                                {aluno.tempoRestante >= 0 ? `${aluno.tempoRestante} dias restantes` : 'Expirado'}
                              </span>
                              <span className="text-zinc-400">Venc: {formatarData(aluno.dataFim)}</span>
                            </div>
                            <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full transition-all duration-500 ${getProgressColor(aluno.tempoRestante)}`}
                                style={{ width: `${calculateProgress(aluno.dataInicio, aluno.dataFim)}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </td>

                    {}
                    <td className="px-4 py-2 text-center">
                      <div className="flex flex-col items-center justify-center gap-0.5">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold tracking-wide border border-transparent ${aluno.statusFinanceiro === 'PAGO' || aluno.statusFinanceiro === 'EM_DIA' || aluno.statusFinanceiro === 'EM DIA' || aluno.statusFinanceiro === 'TUDO_PAGO' || aluno.statusFinanceiro === 'ENCERRADO' ? 'bg-green-500/10 text-green-500' :
                          aluno.statusFinanceiro === 'ATRASADO' || aluno.statusFinanceiro === 'VENCIDA' || aluno.statusFinanceiro === 'INADIMPLENTE' ? 'bg-red-500/10 text-red-500' :
                            'bg-yellow-500/10 text-yellow-500'
                          }`}>
                          {aluno.statusFinanceiro === 'EM_DIA' || aluno.statusFinanceiro === 'EM DIA' ? 'EM DIA' :
                            aluno.statusFinanceiro === 'TUDO_PAGO' || aluno.statusFinanceiro === 'ENCERRADO' ? 'TUDO PAGO' :
                              aluno.statusFinanceiro?.replace('_', ' ')}
                        </span>
                        <div className="flex items-center gap-1 text-zinc-500 text-[9px]">
                          {(() => {
                            const dataFatura = aluno.dataProximaFatura || aluno.data_proxima_fatura;
                            if (dataFatura) {
                              return (
                                <>
                                  <FiCalendar size={8} className="shrink-0" />
                                  <span>Fat: {formatarData(dataFatura)}</span>
                                </>
                              );
                            }
                            if (!hasPlano) {
                              return <span>S/ contrato</span>;
                            }
                            if (aluno.statusFinanceiro === 'TUDO_PAGO' || aluno.statusFinanceiro === 'ENCERRADO') {
                              return <span>Faturas quitadas</span>;
                            }
                            return <span>S/ fatura gerada</span>;
                          })()}
                        </div>
                      </div>
                    </td>

                    {}
                    <td className="px-4 py-2 text-center">
                      <div className="flex items-center justify-center gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => setEditModalStudent(aluno)}
                          className="w-[50px] text-center text-blue-400 font-medium hover:text-blue-300 border border-blue-500 hover:bg-blue-500/10 rounded py-0.5 text-[10px] transition-colors cursor-pointer"
                        >
                          Editar
                        </button>
                        {!hasPlano ? (
                          <button
                            onClick={() => setCreateModalStudent(aluno)}
                            className="w-[85px] text-center text-green-400 font-medium hover:text-green-300 border border-green-500 hover:bg-green-500/10 rounded py-0.5 text-[10px] transition-colors cursor-pointer"
                          >
                            Criar Contrato
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              const p = aluno.plano.toLowerCase();
                              const rota = p.includes('nutri') ? '/planos/nutricao' :
                                p.includes('corrida') ? '/planos/corrida' :
                                  p.includes('especial') ? '/planos/especial' :
                                    p.includes('personal') ? '/planos/personal' : '/planos';
                              navigate(rota, { state: { filterAluno: aluno.nome } });
                            }}
                            className="w-[85px] text-center text-zinc-300 font-medium hover:text-white border border-zinc-500 hover:bg-zinc-800/50 rounded py-0.5 text-[10px] transition-colors cursor-pointer"
                          >
                            Contratos
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

      <EditAlunoModal
        isOpen={!!editModalStudent}
        onClose={() => setEditModalStudent(null)}
        student={editModalStudent}
        onSuccess={() => {
          setEditModalStudent(null);
          if (onRefresh) onRefresh();
        }}
      />

      <CreateContratoModal
        isOpen={!!createModalStudent}
        onClose={() => setCreateModalStudent(null)}
        defaultAlunoNome={createModalStudent?.nome}
        onSuccess={() => {
          setCreateModalStudent(null);
          if (onRefresh) onRefresh();
        }}
      />
    </div>
  );
}
