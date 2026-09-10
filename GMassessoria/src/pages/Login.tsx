import { useState } from 'react';
import { FiMail, FiEye, FiEyeOff } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import toast from 'react-hot-toast';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setLoading(true);
    try {
      const baseUrl = api.defaults.baseURL?.replace(/\/api$/, '') || 'http://localhost:8080';
      const response = await api.post(`${baseUrl}/auth/login`, { email, senha: password });

      const token = response.data.token || response.data.accessToken;

      if (token) {
        localStorage.setItem('@GMAssessoria:token', token);
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }

      toast.success('Login efetuado com sucesso!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      toast.error('Credenciais inválidas ou erro no servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-zinc-950 relative overflow-hidden"
      style={{
        backgroundImage: "url('/bg-login.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {}
      <div className="absolute inset-0 bg-black/40 z-0"></div>

      <div className="relative z-10 w-full max-w-xl p-6 sm:p-8 bg-black/20 backdrop-blur-md rounded-2xl border border-white/5 shadow-2xl mx-4">

        <div className="flex flex-col items-center mb-5">
          <img
            src="/logo.png"
            alt="Gabriel Martini Assessoria Esportiva"
            className="w-48 md:w-56 object-contain mx-auto"
          />
          <h1 className="text-lg md:text-xl font-medium text-zinc-100 mb-1">Acesso ao Sistema</h1>
          <p className="text-xs md:text-sm text-zinc-400">Entre para acessar sua gestão</p>
        </div>

        <form className="space-y-4" onSubmit={handleLogin}>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-zinc-300 block">E-mail</label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className="w-full bg-white/5 border border-white/10 text-white text-sm rounded-xl focus:ring-1 focus:ring-red-600 focus:border-red-600 block p-2.5 pr-10 outline-none transition-all placeholder-zinc-500 backdrop-blur-sm"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-zinc-500">
                <FiMail className="w-4 h-4" />
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-zinc-300 block">Senha</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite sua senha"
                className="w-full bg-white/5 border border-white/10 text-white text-sm rounded-xl focus:ring-1 focus:ring-red-600 focus:border-red-600 block p-2.5 pr-10 outline-none transition-all placeholder-zinc-500 backdrop-blur-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                {showPassword ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center items-center gap-2 text-white bg-[#cc0000] hover:bg-[#a30000] focus:ring-4 focus:outline-none focus:ring-red-900/50 font-medium rounded-xl text-sm px-5 py-2.5 text-center transition-colors mt-2 shadow-[0_0_15px_rgba(204,0,0,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : 'Entrar'}
          </button>
        </form>

        <div className="mt-5 text-center border-t border-white/5 pt-4">
          <p className="text-[10px] text-zinc-600">
            © 2024 Gabriel Martini Assessoria Esportiva. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </div>
  );
}