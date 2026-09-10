import { useNavigate } from 'react-router-dom';
import { getImageUrl } from '../../utils/imageUrl';
import type { AlunosContratosProximoFimListagemDTO } from '../../services/dashboardService';

interface ExpiringContractsTableProps {
  contratos: AlunosContratosProximoFimListagemDTO[];
  loading?: boolean;
}

export default function ExpiringContractsTable({ contratos, loading }: ExpiringContractsTableProps) {
  const navigate = useNavigate();

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

  const getDiasColor = (dias: number) => {
    if (dias < 0) return 'bg-red-500/10 border-red-500/30 text-red-400';
    if (dias <= 5) return 'bg-orange-500/10 border-orange-500/30 text-orange-400';
    if (dias <= 15) return 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400';
    return 'bg-green-500/10 border-green-500/30 text-green-400';
  };

  return (
    <div className="bg-[#121212] border border-zinc-800/60 p-5 rounded-xl h-full flex flex-col overflow-hidden shadow-lg shadow-black/20">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-6 bg-orange-500 rounded-full"></div>
          <h2 className="font-bold text-lg text-white">Contratos Próximos do Fim</h2>
        </div>
        <button
          onClick={() => navigate('/alunos')}
          className="text-orange-500 text-xs font-medium hover:text-orange-400 hover:underline transition-all cursor-pointer bg-orange-500/10 px-3 py-1.5 rounded-lg border border-orange-500/20 hover:border-orange-500/40"
        >
          Ver todos
        </button>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-zinc-800/60 uppercase tracking-wider">
              <th className="pb-3 pt-2 text-[10px] font-bold text-zinc-400">Aluno</th>
              <th className="pb-3 pt-2 text-[10px] font-bold text-zinc-400">Início</th>
              <th className="pb-3 pt-2 text-[10px] font-bold text-zinc-400">Fim</th>
              <th className="pb-3 pt-2 text-[10px] font-bold text-zinc-400 text-center">Dias Restantes</th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-zinc-800/30">
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className="animate-pulse">
                  <td className="py-3"><div className="h-6 bg-zinc-800/50 rounded w-32"></div></td>
                  <td className="py-3"><div className="h-4 bg-zinc-800/50 rounded w-20"></div></td>
                  <td className="py-3"><div className="h-4 bg-zinc-800/50 rounded w-20"></div></td>
                  <td className="py-3"><div className="h-4 bg-zinc-800/50 rounded w-20 mx-auto"></div></td>
                </tr>
              ))
            ) : contratos.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-8 text-center text-zinc-500 text-xs font-medium">
                  Nenhum contrato vencendo encontrado.
                </td>
              </tr>
            ) : (
              contratos.map((row, i) => (
                <tr key={i} className="border-b border-zinc-800/30 last:border-0 hover:bg-zinc-800/40 transition-colors group">
                  <td className="py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-zinc-800 overflow-hidden flex-shrink-0 border border-zinc-700 group-hover:border-orange-500/50 transition-colors">
                        <img src={getImageUrl(row.imagemAluno) || `https://ui-avatars.com/api/?name=${encodeURIComponent(row.nomeAluno)}&background=222222&color=ffffff`} alt={row.nomeAluno} className="w-full h-full object-cover opacity-90 group-hover:opacity-100" />
                      </div>
                      <span className="text-zinc-200 font-medium group-hover:text-white transition-colors">{row.nomeAluno}</span>
                    </div>
                  </td>
                  <td className="py-3 text-zinc-400 font-medium text-xs">{formatarData(row.dataInicio)}</td>
                  <td className="py-3 text-zinc-400 font-medium text-xs">{formatarData(row.dataFim)}</td>
                  <td className="py-3 text-center">
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-md border ${getDiasColor(row.diasRestantes)} shadow-sm`}>
                      {row.diasRestantes < 0 ? 'Expirado' : `${row.diasRestantes} dias`}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
