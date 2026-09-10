import { FiDollarSign } from 'react-icons/fi';

export default function OperationalSummary() {
  return (
    <div className="bg-[#121212] border border-zinc-800/60 p-5 rounded-xl flex flex-col justify-between h-full">
      <div>
        <h2 className="font-semibold text-base mb-5">Resumo Operacional</h2>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center text-sm border-b border-zinc-800/40 pb-2">
            <span className="text-zinc-400">Novos alunos</span>
            <span className="font-medium">4</span>
          </div>
          <div className="flex justify-between items-center text-sm border-b border-zinc-800/40 pb-2">
            <span className="text-zinc-400">Cancelamentos</span>
            <span className="font-medium">1</span>
          </div>
          <div className="flex justify-between items-center text-sm border-b border-zinc-800/40 pb-2">
            <span className="text-zinc-400">Renovações</span>
            <span className="font-medium">6</span>
          </div>
          <div className="flex justify-between items-center text-sm border-b border-zinc-800/40 pb-2">
            <span className="text-zinc-400">Recorrência ativa</span>
            <span className="font-medium">R$ 6.180,00</span>
          </div>
          <div className="flex justify-between items-center text-sm border-b border-zinc-800/40 pb-2">
            <span className="text-zinc-400">Ticket médio</span>
            <span className="font-medium">R$ 318,10</span>
          </div>
        </div>
      </div>

      <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-4 mt-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0">
            <FiDollarSign className="text-red-500 text-lg" />
          </div>
          <div>
            <p className="text-zinc-400 text-xs mb-0.5">Inadimplência Total</p>
            <p className="text-red-500 font-bold text-xl">R$ 740,00</p>
          </div>
        </div>
        <div className="flex justify-between items-center mt-3">
          <span className="text-zinc-500 text-xs">3 alunos inadimplentes</span>
          <a href="#" className="text-red-500 text-xs hover:text-red-400 transition-colors">
            Ver detalhes &rarr;
          </a>
        </div>
      </div>
    </div>
  );
}

