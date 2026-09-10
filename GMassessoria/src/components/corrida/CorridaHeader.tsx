import { FiPlus } from 'react-icons/fi';

interface CorridaHeaderProps {
  onOpenModal?: () => void;
}

export default function CorridaHeader({ onOpenModal }: CorridaHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
      <div>
        <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white">Corrida</h1>
        <p className="text-zinc-400 text-xs md:text-sm">Gerencie os alunos, contratos e informações do plano de corrida.</p>
      </div>
      <div className="flex items-center gap-2 w-full md:w-auto">
        <button 
          onClick={onOpenModal}
          className="flex items-center gap-2 bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors whitespace-nowrap"
        >
          <FiPlus />
          Adicionar Contrato
        </button>
      </div>
    </div>
  );
}
