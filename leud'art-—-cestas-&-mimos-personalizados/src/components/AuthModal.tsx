import React, { useState } from 'react';
import { X, Lock, Mail, User, CheckCircle2, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { login, register } = useAuth();

  const [mode, setMode] = useState<'login' | 'register' | 'recovery'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setIsLoading(true);

    try {
      if (mode === 'login') {
        const res = await login(email, password);
        if (res.success) {
          onSuccess();
          onClose();
        } else {
          setErrorMsg(res.message || 'Falha ao autenticar.');
        }
      } else if (mode === 'register') {
        const res = await register(name, email, password);
        if (res.success) {
          onSuccess();
          onClose();
        } else {
          setErrorMsg(res.message || 'Erro ao criar conta.');
        }
      } else if (mode === 'recovery') {
        if (!email) {
          setErrorMsg('Digite seu e-mail para receber as instruções.');
        } else {
          setSuccessMsg(`Enviamos um link de redefinição para ${email}.`);
        }
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Ocorreu um erro inesperado.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div
        className="relative bg-white rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-[#E8DCD1] animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#8C7A70] hover:text-[#241A15] p-1.5 rounded-lg hover:bg-[#FAF8F5]"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="font-serif text-2xl font-bold text-[#241A15]">
            Leud'Art
          </div>
          <p className="text-xs text-[#7A6A60] mt-1">
            {mode === 'login' && 'Acesse sua conta para ver pedidos e mimos'}
            {mode === 'register' && 'Cadastre-se para uma experiência exclusiva'}
            {mode === 'recovery' && 'Recuperação de acesso por e-mail'}
          </p>
        </div>

        {/* Tab switch */}
        {mode !== 'recovery' && (
          <div className="flex p-1 bg-[#FAF8F5] rounded-xl border border-[#EFE8E1] mb-6">
            <button
              onClick={() => {
                setMode('login');
                setErrorMsg('');
              }}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors ${
                mode === 'login'
                  ? 'bg-white text-[#241A15] shadow-xs'
                  : 'text-[#6C5B52] hover:text-[#241A15]'
              }`}
            >
              Entrar
            </button>
            <button
              onClick={() => {
                setMode('register');
                setErrorMsg('');
              }}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors ${
                mode === 'register'
                  ? 'bg-white text-[#241A15] shadow-xs'
                  : 'text-[#6C5B52] hover:text-[#241A15]'
              }`}
            >
              Cadastrar
            </button>
          </div>
        )}

        {/* Alert Messages */}
        {errorMsg && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-lg flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <div>
              <label className="block text-xs font-semibold text-[#241A15] mb-1">
                Nome Completo
              </label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#8C7A70]" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Seu nome"
                  className="w-full pl-9 pr-3 py-2.5 text-xs bg-[#FAF8F5] border border-[#E2D5CA] rounded-lg focus:outline-none focus:border-[#9B543D]"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-[#241A15] mb-1">
              E-mail
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#8C7A70]" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seuemail@exemplo.com"
                className="w-full pl-9 pr-3 py-2.5 text-xs bg-[#FAF8F5] border border-[#E2D5CA] rounded-lg focus:outline-none focus:border-[#9B543D]"
              />
            </div>
          </div>

          {mode !== 'recovery' && (
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-[#241A15]">
                  Senha
                </label>
                {mode === 'login' && (
                  <button
                    type="button"
                    onClick={() => {
                      setMode('recovery');
                      setErrorMsg('');
                    }}
                    className="text-[11px] text-[#9B543D] hover:underline"
                  >
                    Esqueceu?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#8C7A70]" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mínimo 6 caracteres"
                  className="w-full pl-9 pr-3 py-2.5 text-xs bg-[#FAF8F5] border border-[#E2D5CA] rounded-lg focus:outline-none focus:border-[#9B543D]"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-[#9B543D] hover:bg-[#854432] text-white text-xs font-semibold rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <span>Processando...</span>
            ) : mode === 'login' ? (
              <span>Entrar na Conta</span>
            ) : mode === 'register' ? (
              <span>Criar Minha Conta</span>
            ) : (
              <span>Enviar Link de Recuperação</span>
            )}
          </button>

          {mode === 'recovery' && (
            <button
              type="button"
              onClick={() => {
                setMode('login');
                setErrorMsg('');
                setSuccessMsg('');
              }}
              className="w-full py-2 text-xs text-[#5C4D44] hover:underline text-center block"
            >
              Voltar ao login
            </button>
          )}
        </form>

      </div>
    </div>
  );
};
