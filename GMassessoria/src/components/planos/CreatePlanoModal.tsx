import { FiX, FiSave } from 'react-icons/fi';
import { useState } from 'react';
import { planosService } from '../../services/planosService';
import toast from 'react-hot-toast';
import SearchableSelect from '../common/SearchableSelect';

interface CreatePlanoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function CreatePlanoModal({ isOpen, onClose, onSuccess }: CreatePlanoModalProps) {
  const [nome, setNome] = useState('');
  const [ciclo, setCiclo] = useState('MENSAL');
  const [valorBase, setValorBase] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!nome || !valorBase) {
      toast.error('Preencha os campos obrigatórios (Nome e Valor Base)');
      return;
    }

    setLoading(true);
    try {
      const valorNum = Number(valorBase.replace(',', '.'));
      await planosService.createPlano({
        nome,
        ciclo,
        valorBase: isNaN(valorNum) ? 0 : valorNum
      });
      setNome('');
      setCiclo('MENSAL');
      setValorBase('');
      toast.success('Plano criado com sucesso!');
      if (onSuccess) onSuccess();
    } catch (error: any) {
      console.error('Erro ao criar plano:', error);
      toast.error(error.response?.data?.message || 'Erro ao criar o plano. Verifique o console.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-6 md:p-8">
      <div className="bg-[#121212] border border-zinc-800 rounded-2xl w-full max-w-md overflow-hidden flex flex-col shadow-2xl animate-in fade-in zoom-in duration-200">
        
        {}
        <div className="flex items-start justify-between p-5 border-b border-zinc-800/50">
          <div>
            <h2 className="text-white text-lg font-semibold tracking-tight">Adicionar Plano</h2>
            <p className="text-zinc-400 text-sm mt-1">Preencha as informações para criar um novo plano.</p>
          </div>
          <button 
            onClick={onClose}
            className="text-zinc-500 hover:text-white transition-colors p-1 cursor-pointer"
          >
            <FiX size={20} />
          </button>
        </div>

        {}
        <div className="p-6 flex flex-col gap-5 overflow-y-auto custom-scrollbar max-h-[calc(100vh-220px)]">
          
          {}
          <div className="flex flex-col gap-1.5">
            <label className="text-zinc-300 text-sm font-medium">Nome do plano</label>
            <input 
              type="text" 
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Ex: Musculação Premium..." 
              className="w-full bg-[#1A1A1A] border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-red-600 transition-colors"
            />
          </div>

          {}
          <div className="flex flex-col gap-1.5">
            <label className="text-zinc-300 text-sm font-medium">Ciclo</label>
            <div className="relative">
              <SearchableSelect
                value={ciclo}
                onChange={(val) => setCiclo(val)}
                options={[
                  { value: 'MENSAL', label: 'Mensal' },
                  { value: 'TRIMESTRAL', label: 'Trimestral' },
                  { value: 'SEMESTRAL', label: 'Semestral' },
                  { value: 'ANUAL', label: 'Anual' }
                ]}
                className="!h-[42px] !py-2.5 !text-sm pl-4"
              />
            </div>
          </div>

          {}
          <div className="flex flex-col gap-1.5">
            <label className="text-zinc-300 text-sm font-medium">Valor base (R$)</label>
            <input 
              type="text" 
              value={valorBase}
              onChange={(e) => setValorBase(e.target.value)}
              placeholder="0,00" 
              className="w-full bg-[#1A1A1A] border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-red-600 transition-colors"
            />
          </div>

        </div>

        {}
        <div className="p-4 border-t border-zinc-800/50 flex items-center justify-end gap-3 bg-[#121212]">
          <button 
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-zinc-300 hover:text-white bg-transparent border border-zinc-800 hover:bg-zinc-800 rounded-lg transition-colors cursor-pointer"
          >
            Cancelar
          </button>
          <button 
            onClick={handleSave}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
          >
            <FiSave size={16} />
            {loading ? 'Salvando...' : 'Salvar plano'}
          </button>
        </div>

      </div>
    </div>
  );
}
