import { Link, useNavigate } from 'react-router-dom';
import {
  Menu,
  ShoppingBag,
  User,
  LogOut,
  Home,
  Sparkles,
} from 'lucide-react';
import { useUiStore } from '@/stores/uiStore';
import { useCartStore, useCartTotalItens } from '@/stores/cartStore';
import { useAuthStore } from '@/stores/authStore';

export default function Header() {
  const abrirModal = useUiStore((s) => s.abrirModal);
  const toggleModal = useUiStore((s) => s.toggleModal);
  const contagem = useCartTotalItens();
  const usuario = useAuthStore((s) => s.usuario);
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header
      data-cy="header"
      className="sticky top-0 z-30 bg-primary/80 backdrop-blur-md border-b border-dark/5"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <button
          type="button"
          data-cy="header-nav-toggle"
          onClick={() => toggleModal('navegacao')}
          className="btn-ghost !p-2.5"
          aria-label="Abrir menu"
        >
          <Menu className="w-5 h-5 text-dark" strokeWidth={2} />
        </button>

        <Link
          data-cy="header-logo"
          to="/"
          className="flex items-center gap-2 select-none"
          onClick={() => useUiStore.getState().fecharModal()}
        >
          <span className="w-9 h-9 rounded-full bg-detail/90 flex items-center justify-center shadow-card">
            <Sparkles className="w-4.5 h-4.5 text-dark" />
          </span>
          <span className="font-display text-xl sm:text-2xl font-bold tracking-wide text-dark">
            Bella <span className="text-detail">Store</span>
          </span>
        </Link>

        <div className="flex items-center gap-1 sm:gap-2">
          <button
            type="button"
            data-cy="header-home-btn"
            onClick={() => {
              useUiStore.getState().fecharModal();
              navigate('/');
            }}
            className="btn-ghost !p-2.5 hidden sm:inline-flex"
            aria-label="Ir para Home"
          >
            <Home className="w-5 h-5 text-dark" strokeWidth={2} />
          </button>

          <button
            type="button"
            data-cy="header-cart-btn"
            onClick={() => abrirModal('carrinho')}
            className="btn-ghost !p-2.5 relative"
            aria-label="Abrir carrinho"
          >
            <ShoppingBag className="w-5 h-5 text-dark" strokeWidth={2} />
            {contagem > 0 && (
              <span
                data-cy="header-cart-badge"
                className="absolute -top-0.5 -right-0.5 min-w-[20px] h-5 rounded-full bg-detail text-dark text-xs font-bold flex items-center justify-center shadow-card"
              >
                {contagem > 99 ? '99+' : contagem}
              </span>
            )}
          </button>

          {usuario ? (
            <div className="flex items-center gap-2">
              <button
                type="button"
                data-cy="header-user-btn"
                onClick={() => abrirModal('login')}
                className="btn-ghost hidden sm:inline-flex !py-2"
              >
                <span className="font-semibold text-dark truncate max-w-[140px]">
                  Olá, {usuario.nome.split(' ')[0]}
                </span>
              </button>
              <button
                type="button"
                data-cy="header-logout-btn"
                onClick={handleLogout}
                className="btn-ghost !p-2.5"
                aria-label="Sair"
                title="Sair"
              >
                <LogOut className="w-5 h-5 text-muted" strokeWidth={2} />
              </button>
            </div>
          ) : (
            <button
              type="button"
              data-cy="header-login-btn"
              onClick={() => abrirModal('login')}
              className="btn-ghost !p-2.5"
              aria-label="Fazer login"
            >
              <User className="w-5 h-5 text-dark" strokeWidth={2} />
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
