import { FiSearch, FiPlus } from 'react-icons/fi';

interface PlanosHeaderProps {
  onOpenModal: () => void;
}

export default function PlanosHeader({ onOpenModal }: PlanosHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
      <div>
        <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white">Planos</h1>
        <p className="text-zinc-400 text-xs md:text-sm">Gerencie os planos, valores base e edite os serviços disponíveis.</p>
      </div>
      <div className="flex items-center gap-2 w-full md:w-auto">
        <div className="relative flex-1 md:w-64">
          <input
            type="text"
            placeholder="Buscar plano..."
            className="w-full bg-[#1A1A1A] border border-zinc-800 rounded-lg pl-4 pr-10 py-1.5 text-sm text-white focus:outline-none focus:border-red-600 transition-colors"
          />
          <FiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-500" />
        </div>
        <button
          onClick={onOpenModal}
          className="flex items-center gap-2 bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors whitespace-nowrap cursor-pointer"
        >
          <FiPlus />
          Adicionar Plano
        </button>
      </div>
    </div>
  );
}
