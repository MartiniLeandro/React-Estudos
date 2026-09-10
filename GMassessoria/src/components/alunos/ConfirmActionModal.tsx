import { FiX, FiAlertTriangle } from 'react-icons/fi';

interface ConfirmActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  actionText: string;
  isDestructive?: boolean;
  loading?: boolean;
}

export default function ConfirmActionModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message, 
  actionText, 
  isDestructive = true,
  loading = false
}: ConfirmActionModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-6 md:p-8">
      <div className="bg-[#121212] border border-zinc-800 rounded-2xl w-full max-w-sm overflow-hidden flex flex-col shadow-2xl animate-in fade-in zoom-in duration-200">
        <div className="p-6 flex flex-col items-center text-center gap-4">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isDestructive ? 'bg-red-500/10 text-red-500' : 'bg-zinc-500/10 text-zinc-400'}`}>
            <FiAlertTriangle size={24} />
          </div>
          <div>
            <h2 className="text-white text-lg font-semibold">{title}</h2>
            <p className="text-zinc-400 text-sm mt-2">{message}</p>
          </div>
        </div>
        <div className="p-4 border-t border-zinc-800/50 flex items-center justify-end gap-3 bg-[#1A1A1A]/30">
          <button 
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-zinc-300 hover:text-white bg-transparent border border-zinc-800 hover:bg-zinc-800 rounded-lg transition-colors cursor-pointer w-full sm:w-auto"
          >
            Cancelar
          </button>
          <button 
            onClick={() => { onConfirm(); onClose(); }}
            disabled={loading}
            className={`flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors cursor-pointer w-full sm:w-auto disabled:opacity-50 ${isDestructive ? 'bg-red-600 hover:bg-red-700' : 'bg-zinc-700 hover:bg-zinc-600'}`}
          >
            {loading && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>}
            {loading ? 'Aguarde...' : actionText}
          </button>
        </div>
      </div>
    </div>
  );
}
