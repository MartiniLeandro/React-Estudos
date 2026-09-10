import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { 
  FiHome, 
  FiUsers, 
  FiCreditCard, 
  FiLogOut, 
  FiChevronDown, 
  FiBook
} from 'react-icons/fi';

export default function Sidebar() {
  const [planosOpen, setPlanosOpen] = useState(true);

  const navLinkClass = ({ isActive }: { isActive: boolean }) => 
    `flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all ${
      isActive 
        ? 'bg-gradient-to-r from-[#e60000]/40 to-transparent text-white font-medium' 
        : 'text-zinc-400 hover:bg-gradient-to-r hover:from-[#e60000]/20 hover:to-transparent hover:text-white'
    }`;

  const subNavLinkClass = ({ isActive }: { isActive: boolean }) => 
    `flex items-center gap-3 px-4 py-2 rounded-xl transition-colors text-sm ${
      isActive 
        ? 'text-[#e60000] font-medium' 
        : 'text-zinc-500 hover:text-[#e60000]'
    }`;

  return (
    <aside className="w-60 bg-[#050505] border-r border-white/5 flex flex-col h-full flex-shrink-0">
      {}
      <div className="pt-6 pb-2 px-6 flex flex-col items-center border-b border-white/5">
        <img src="/logo.png" alt="GM Assessoria" className="w-36 object-contain" />
      </div>

      {}
      <nav className="flex-1 overflow-y-auto py-4 px-4 space-y-1.5 custom-scrollbar">
        <NavLink to="/dashboard" className={navLinkClass}>
          <FiHome className="w-4 h-4" />
          <span className="text-sm">Dashboard</span>
        </NavLink>
        
        <NavLink to="/alunos" className={navLinkClass}>
          <FiUsers className="w-4 h-4" />
          <span className="text-sm">Alunos</span>
        </NavLink>

        {}
        <div className="relative">
          <NavLink 
            to="/planos"
            end
            onClick={() => {
              if (!planosOpen) setPlanosOpen(true);
            }}
            className={({ isActive }) => 
              `w-full flex items-center justify-between px-4 py-2.5 rounded-xl transition-all ${
                isActive 
                  ? 'bg-gradient-to-r from-[#e60000]/40 to-transparent text-white font-medium' 
                  : 'text-zinc-400 hover:bg-gradient-to-r hover:from-[#e60000]/20 hover:to-transparent hover:text-white'
              }`
            }
          >
            <div className="flex items-center gap-3">
              <FiBook className="w-4 h-4" />
              <span className="text-sm">Planos</span>
            </div>
            <button
              onClick={(e) => {
                e.preventDefault();
                setPlanosOpen(!planosOpen);
              }}
              className={`transition-transform duration-300 p-1 -mr-1 rounded-md hover:bg-white/10 ${planosOpen ? 'rotate-180' : ''}`}
            >
              <FiChevronDown className="w-3.5 h-3.5" />
            </button>
          </NavLink>
          
          <div className={`grid transition-all duration-300 ease-in-out ${planosOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
            <div className="overflow-hidden">
              <div className="mt-1 mb-1 ml-4 pl-4 border-l border-zinc-800 space-y-0.5">
                <NavLink to="/planos/corrida" className={subNavLinkClass}>
                  <div className="w-1 h-1 rounded-full bg-current"></div>
                  Corrida
                </NavLink>
                <NavLink to="/planos/nutricao" className={subNavLinkClass}>
                  <div className="w-1 h-1 rounded-full bg-current"></div>
                  Nutrição
                </NavLink>
                <NavLink to="/planos/especial" className={subNavLinkClass}>
                  <div className="w-1 h-1 rounded-full bg-current"></div>
                  Especial
                </NavLink>
                <NavLink to="/planos/personal" className={subNavLinkClass}>
                  <div className="w-1 h-1 rounded-full bg-current"></div>
                  Personal Trainer
                </NavLink>
              </div>
            </div>
          </div>
        </div>

        <NavLink to="/financeiro" className={navLinkClass}>
          <FiCreditCard className="w-4 h-4" />
          <span className="text-sm">Financeiro</span>
        </NavLink>
      </nav>

      {}
      <div className="p-4 border-t border-white/5">
        <Link 
          to="/login"
          onClick={() => {
            localStorage.removeItem('@GMAssessoria:token');
            localStorage.removeItem('token');
          }}
          className="flex items-center gap-3 px-3 py-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
        >
          <FiLogOut className="w-4 h-4" />
          <span className="text-sm">Sair</span>
        </Link>
      </div>
    </aside>
  );
}
