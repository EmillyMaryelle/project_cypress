import { useEffect, useState } from 'react';
import {
  LogIn,
  LogOut,
  Mail,
  Lock,
  Sparkles,
  User as UserIcon,
  UserPlus,
} from 'lucide-react';
import ModalPanel from './ModalPanel';
import { useUiStore } from '@/stores/uiStore';
import { useAuthStore } from '@/stores/authStore';
import { Link, useNavigate } from 'react-router-dom';

export default function LoginModal() {
  const aberto = useUiStore((s) => s.modalAberto) === 'login';
  const fechar = useUiStore((s) => s.fecharModal);
  const abrir = useUiStore((s) => s.abrirModal);
  const { usuario, login, logout, loading, erro, limparErro } = useAuthStore();
  const navigate = useNavigate();

  const [email, setEmail] = useState('usuario@exemplo.com');
  const [senha, setSenha] = useState('123456');

  useEffect(() => {
    if (aberto) {
      if (!usuario) {
        setEmail('usuario@exemplo.com');
        setSenha('123456');
      }
      limparErro();
    }
  }, [aberto, usuario, limparErro]);

  if (!aberto) return null;

  if (usuario) {
    return (
      <ModalPanel
        aoFechar={fechar}
        posicao="center"
        title="Minha conta"
        dataCy="login-modal"
      >
        <div className="px-6 py-7 space-y-5 text-center">
          <div
            data-cy="login-modal-user-avatar"
            className="mx-auto w-20 h-20 rounded-full bg-detail/80 flex items-center justify-center text-white shadow-soft"
          >
            <span className="font-display text-3xl font-bold">
              {usuario.nome.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <h4
              data-cy="login-modal-user-name"
              className="font-display text-2xl font-bold text-dark"
            >
              Ola, {usuario.nome.split(' ')[0]}
            </h4>
            <p data-cy="login-modal-user-email" className="text-muted/80 mt-1 text-sm">
              {usuario.email}
            </p>
            <p className="mt-2 inline-block text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-secondary/60 text-dark">
              {usuario.tipo === 'cliente' ? 'Cliente' : 'Fornecedor'}
            </p>
          </div>
          <div className="rounded-2xl bg-secondary/40 border border-dark/5 p-4 text-sm text-muted">
            <p className="flex items-center justify-center gap-1.5 mb-1">
              <Sparkles className="w-4 h-4 text-detail" strokeWidth={2} />
              <span className="font-semibold text-dark">Conta simulada</span>
            </p>
            <p>Dados sao mantidos apenas durante a sessao.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <button
              type="button"
              data-cy="login-modal-buy-more"
              onClick={() => {
                fechar();
                navigate('/');
              }}
              className="btn-outline !py-2.5"
            >
              Comprar mais
            </button>
            <Link
              to="/carrinho"
              onClick={() => fechar()}
              data-cy="login-modal-go-cart"
              className="btn-outline !py-2.5"
            >
              Meu carrinho
            </Link>
            <button
              type="button"
              data-cy="login-modal-logout-btn"
              onClick={() => {
                logout();
                fechar();
                navigate('/');
              }}
              className="btn-primary !py-2.5"
            >
              <LogOut className="w-4 h-4" strokeWidth={2} />
              Sair
            </button>
          </div>
        </div>
      </ModalPanel>
    );
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await login({ email: email.trim(), senha });
  };

  return (
    <ModalPanel
      aoFechar={fechar}
      posicao="center"
      title="Entrar"
      dataCy="login-modal"
    >
      <form onSubmit={onSubmit} className="px-5 sm:px-6 py-6 space-y-5">
        <div className="rounded-2xl bg-secondary/40 border border-dark/5 p-4 text-sm text-muted space-y-1">
          <p className="font-semibold text-dark flex items-center gap-1.5">
            <UserIcon className="w-4 h-4 text-detail" strokeWidth={2} />
            Conta de demonstracao
          </p>
          <p>
            <strong>Email:</strong> usuario@exemplo.com
          </p>
          <p>
            <strong>Senha:</strong> 123456
          </p>
        </div>

        <div className="space-y-4">
          <label className="block">
            <span className="block text-sm font-medium text-dark mb-1.5">
              E-mail
            </span>
            <span className="relative block">
              <Mail
                className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted/60"
                strokeWidth={2}
              />
              <input
                type="email"
                required
                data-cy="login-input-email"
                placeholder="voce@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-base pl-11"
                autoComplete="email"
              />
            </span>
          </label>

          <label className="block">
            <span className="block text-sm font-medium text-dark mb-1.5">
              Senha
            </span>
            <span className="relative block">
              <Lock
                className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted/60"
                strokeWidth={2}
              />
              <input
                type="password"
                required
                data-cy="login-input-senha"
                placeholder="Senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="input-base pl-11"
                autoComplete="current-password"
              />
            </span>
          </label>
        </div>

        {erro && (
          <div
            data-cy="login-alert-error"
            className="rounded-xl px-4 py-3 text-sm bg-[#fde6dd] text-dark border border-detail/40"
          >
            {erro}
          </div>
        )}

        <button
          type="submit"
          data-cy="login-submit-btn"
          disabled={loading}
          className="btn-primary w-full !py-3.5"
        >
          {loading ? (
            <span className="inline-flex items-center gap-2">
              <span className="w-4 h-4 rounded-full border-2 border-dark/40 border-t-dark animate-spin" />
              Entrando
            </span>
          ) : (
            <>
              <LogIn className="w-4 h-4" strokeWidth={2} />
              Entrar
            </>
          )}
        </button>

        <div className="border-t border-dark/5 pt-4 mt-2">
          <button
            type="button"
            data-cy="login-go-create-account"
            onClick={() => {
              fechar();
              abrir('cadastro');
              navigate('/login');
            }}
            className="w-full btn-outline !py-3 gap-2"
          >
            <UserPlus className="w-4 h-4" strokeWidth={2} />
            Nao tem conta? Criar agora
          </button>
        </div>

        <p className="text-xs text-muted/70 text-center">
          Ao entrar, voce concorda com os termos de uso da loja.
        </p>
      </form>
    </ModalPanel>
  );
}
