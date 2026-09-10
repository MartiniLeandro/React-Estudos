import { useState, useEffect } from 'react';
import { FiX, FiSave } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { contratosService } from '../../services/contratosService';
import SearchableSelect from '../common/SearchableSelect';

interface EditContratoModalProps {
  isOpen: boolean;
  onClose: () => void;
  contrato: any | null;
  onSuccess: () => void;
}

export default function EditContratoModal({ isOpen, onClose, contrato, onSuccess }: EditContratoModalProps) {
  const [loading, setLoading] = useState(false);
  const [formaPagamento, setFormaPagamento] = useState('PIX');
  const [statusContrato, setStatusContrato] = useState('ATIVO');
  const [motivoDesconto, setMotivoDesconto] = useState('');



  useEffect(() => {
    if (contrato && isOpen) {
      setFormaPagamento(contrato.formaPagamento || 'PIX');
      setStatusContrato(contrato.statusContrato || 'ATIVO');
      setMotivoDesconto(contrato.motivoDesconto || '');

      const fetchDetalhes = async () => {
        setFetching(true);
        try {
          const id = contrato.contratoId || contrato.id;
          if (id) {
            const detalhes = await contratosService.getDetalhesContrato(id);
            if (detalhes.motivoDesconto) {
              setMotivoDesconto(detalhes.motivoDesconto);
            }
          }
        } catch (err) {
          console.error('Erro ao buscar detalhes do contrato:', err);
        } finally {
          setFetching(false);
        }
      };
      
      fetchDetalhes();
    }
  }, [contrato, isOpen]);

  if (!isOpen || !contrato) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contrato) return;

    setLoading(true);
    try {
      await contratosService.update(contrato.contratoId || contrato.id, {
        formaPagamento,
        status: statusContrato,
        motivoDesconto: motivoDesconto || undefined
      });
      toast.success('Contrato atualizado com sucesso!');
      onSuccess();
    } catch (error: any) {
      console.error('Erro ao atualizar contrato:', error);
      toast.error(error.response?.data?.message || 'Erro ao atualizar contrato');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-6 md:p-8">
      <div 
        className="bg-[#121212] border border-zinc-800 rounded-2xl w-full max-w-md overflow-hidden flex flex-col shadow-2xl animate-in fade-in zoom-in duration-200"
        onClick={e => e.stopPropagation()}
      >
        {}
        <div className="flex items-start justify-between p-5 border-b border-zinc-800/50">
          <div>
            <h2 className="text-white text-lg font-semibold tracking-tight">Editar Contrato</h2>
            <p className="text-zinc-400 text-sm mt-1">Altere o status e o pagamento de {contrato?.nomeAluno}</p>
          </div>
          <button 
            onClick={onClose}
            className="text-zinc-500 hover:text-white transition-colors p-1 cursor-pointer"
          >
            <FiX size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col">
          {}
          <div className="p-6 flex flex-col gap-5 overflow-y-auto custom-scrollbar max-h-[calc(100vh-220px)]">
            
            {}
            <div className="flex flex-col gap-1.5">
              <label className="text-zinc-300 text-sm font-medium">
                Forma de Pagamento
              </label>
              <div className="relative">
                <SearchableSelect
                  value={formaPagamento}
                  onChange={(val) => setFormaPagamento(val)}
                  options={[
                    { value: 'PIX', label: 'PIX' },
                    { value: 'CARTAO', label: 'Cartão' },
                    { value: 'DINHEIRO', label: 'Dinheiro' }
                  ]}
                  className="!h-[42px] !py-2.5 !text-sm pl-4"
                />
              </div>
            </div>

            {}
            <div className="flex flex-col gap-1.5">
              <label className="text-zinc-300 text-sm font-medium">
                Status do Contrato
              </label>
              <div className="relative">
                <SearchableSelect
                  value={statusContrato}
                  onChange={(val) => setStatusContrato(val)}
                  options={[
                    { value: 'ATIVO', label: 'Ativo' },
                    { value: 'ENCERRADO', label: 'Encerrado' },
                    { value: 'CANCELADO', label: 'Cancelado' },
                    { value: 'PAUSADO', label: 'Pausado' }
                  ]}
                  className="!h-[42px] !py-2.5 !text-sm pl-8"
                />
                <div className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-2 h-2 z-10 rounded-full ${
                  statusContrato === 'ATIVO' ? 'bg-green-500' : 
                  statusContrato === 'ENCERRADO' ? 'bg-orange-500' : 
                  statusContrato === 'CANCELADO' ? 'bg-red-500' : 
                  statusContrato === 'PAUSADO' ? 'bg-yellow-500' :
                  'bg-zinc-500'} pointer-events-none`}></div>
              </div>
            </div>
            
            {}
            <div className="flex flex-col gap-1.5">
              <label className="text-zinc-300 text-sm font-medium">
                Motivo do Desconto
              </label>
              <input
                type="text"
                value={motivoDesconto}
                onChange={(e) => setMotivoDesconto(e.target.value)}
                placeholder="Opcional"
                className="w-full bg-[#1A1A1A] border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-red-600 transition-colors"
              />
            </div>

          </div>

          {}
          <div className="p-4 border-t border-zinc-800/50 flex items-center justify-end gap-3 bg-[#121212]">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2 text-sm font-medium text-zinc-300 hover:text-white bg-transparent border border-zinc-800 hover:bg-zinc-800 rounded-lg transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 disabled:opacity-50 rounded-lg transition-colors cursor-pointer"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <FiSave size={16} />
              )}
              {loading ? 'Salvando...' : 'Salvar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
