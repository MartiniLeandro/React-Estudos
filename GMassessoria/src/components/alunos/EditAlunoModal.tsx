import { FiX, FiSave, FiUser } from 'react-icons/fi';
import { useState, useEffect, useRef } from 'react';
import { alunosService } from '../../services/alunosService';
import { getImageUrl } from '../../utils/imageUrl';
import SearchableSelect from '../common/SearchableSelect';

interface EditAlunoModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: any | null;
  onSuccess?: () => void;
}

export default function EditAlunoModal({ isOpen, onClose, student, onSuccess }: EditAlunoModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState('ativo');
  const [loading, setLoading] = useState(false);
  
  const [imagemFile, setImagemFile] = useState<File | null>(null);
  const [imagemPreview, setImagemPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (student) {
      setName(student.nome || '');
      setPhone(student.telefone || '');
      setStatus(student.statusAluno?.toLowerCase() === 'ativo' ? 'ativo' : 'inativo');
      setImagemFile(null);
      setImagemPreview(student.imagem ? getImageUrl(student.imagem) : null);
    }
  }, [student]);

  if (!isOpen || !student) return null;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImagemFile(file);
      setImagemPreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      await alunosService.updateAluno(student.id, {
        nome: name,
        telefone: phone || '',
        status: status.toUpperCase() as 'ATIVO' | 'INATIVO' | 'PAUSADO',
      }, imagemFile || undefined);
      if (onSuccess) onSuccess();
      else onClose();
    } catch (error) {
      console.error('Erro ao atualizar aluno:', error);
      alert('Erro ao atualizar aluno.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-6 md:p-8">
      <div className="bg-[#121212] border border-zinc-800 rounded-2xl w-full max-w-lg overflow-hidden flex flex-col shadow-2xl animate-in fade-in zoom-in duration-200">
        
        {}
        <div className="flex items-start justify-between p-5 border-b border-zinc-800/50">
          <div>
            <h2 className="text-white text-lg font-semibold tracking-tight">Editar Aluno</h2>
            <p className="text-zinc-400 text-sm mt-1">Altere as informações do aluno selecionado.</p>
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
            <label className="text-zinc-300 text-sm font-medium">Nome completo</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Digite o nome completo do aluno..." 
              className="w-full bg-[#1A1A1A] border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-red-600 transition-colors"
            />
          </div>

          {}
          <div className="flex flex-col gap-1.5">
            <label className="text-zinc-300 text-sm font-medium">Telefone / WhatsApp</label>
            <input 
              type="text" 
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="(11) 99999-9999" 
              className="w-full bg-[#1A1A1A] border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-red-600 transition-colors"
            />
          </div>

          {}
          <div className="flex flex-col gap-1.5">
            <label className="text-zinc-300 text-sm font-medium">Imagem do aluno</label>
            <div 
              className="w-full border border-dashed border-zinc-700 hover:border-zinc-500 bg-[#1A1A1A]/50 rounded-xl p-6 flex flex-col sm:flex-row items-center justify-center gap-4 cursor-pointer transition-colors group"
              onClick={() => fileInputRef.current?.click()}
            >
              <input 
                type="file" 
                ref={fileInputRef}
                className="hidden"
                accept="image/png, image/jpeg, image/jpg"
                onChange={handleImageChange}
              />
              <div className="w-12 h-12 rounded-full border border-zinc-600 bg-[#222] flex items-center justify-center text-zinc-400 overflow-hidden group-hover:text-white group-hover:border-zinc-400 transition-colors shrink-0">
                {imagemPreview ? (
                  <img src={imagemPreview} alt={name} className="w-full h-full object-cover" />
                ) : (
                  <FiUser size={20} />
                )}
              </div>
              <div className="text-center sm:text-left">
                <p className="text-zinc-300 text-sm font-medium group-hover:text-white transition-colors">Clique para alterar a imagem</p>
                <p className="text-zinc-500 text-xs mt-0.5">PNG ou JPG. Máx. 5MB</p>
              </div>
            </div>
          </div>

          {}
          <div className="flex flex-col gap-1.5">
            <label className="text-zinc-300 text-sm font-medium">Status</label>
            <div className="relative">
              <SearchableSelect
                value={status}
                onChange={(val) => setStatus(val)}
                options={[
                  { value: 'ativo', label: 'Ativo' },
                  { value: 'inativo', label: 'Inativo' }
                ]}
                className="!h-[42px] !py-2.5 !text-sm pl-8"
              />
              <div className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-2 h-2 z-10 rounded-full ${status === 'ativo' ? 'bg-green-500' : 'bg-zinc-500'} pointer-events-none`}></div>
            </div>
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
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 disabled:opacity-50 rounded-lg transition-colors cursor-pointer"
          >
            {loading ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : <FiSave size={16} />}
            {loading ? 'Salvando...' : 'Salvar aluno'}
          </button>
        </div>

      </div>
    </div>
  );
}
