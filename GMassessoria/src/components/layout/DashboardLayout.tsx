import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar.tsx';

export default function DashboardLayout() {
  return (
    <div className="flex h-screen bg-[#0a0a0a] overflow-hidden text-zinc-100">
      <Sidebar />
      <main className="flex-1 overflow-y-auto custom-scrollbar">
        <Outlet />
      </main>
    </div>
  );
}
