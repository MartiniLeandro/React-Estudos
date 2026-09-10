import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import DashboardLayout from "./components/layout/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Alunos from "./pages/Alunos";
import Financeiro from "./pages/Financeiro";
import Planos from "./pages/Planos/Planos";
import Nutricao from "./pages/Planos/Nutricao";
import Corrida from "./pages/Planos/Corrida";
import Especial from "./pages/Planos/Especial";
import Personal from "./pages/Planos/Personal";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem('@GMAssessoria:token') || localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      { path: "/", element: <Navigate to="/dashboard" replace /> },
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/alunos", element: <Alunos /> },
      { path: "/planos", element: <Planos /> },
      { path: "/planos/nutricao", element: <Nutricao /> },
      { path: "/planos/corrida", element: <Corrida /> },
      { path: "/planos/especial", element: <Especial /> },
      { path: "/planos/personal", element: <Personal /> },
      { path: "/financeiro", element: <Financeiro /> }
    ]
  },
  {
    path: "/login",
    element: <Login />
  }
]);

export default routes;