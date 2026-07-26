import { Link, useNavigate } from 'react-router-dom';
import {
  Home,
  Shirt,
  Watch,
  Smartphone,
  Sofa,
  ChevronRight,
  Tag,
  ShoppingBag,
  LogIn,
  User,
  LogOut,
  UserPlus,
} from 'lucide-react';
import ModalPanel from './ModalPanel';
import { useUiStore } from '@/stores/uiStore';
import type { Categoria } from '@shared/types';
import { useAuthStore } from '@/stores/authStore';
import { useCartTotalItens } from '@/stores/cartStore';

interface Props {
  categorias: Categoria[];
}

const iconeMap: Record<string, typeof Shirt> = {
  Shirt,
  Watch,
  Smartphone,
  Sofa,
};

export default function NavModal({ categorias }: Props) {
  const aberto = useUiStore((s) => s.modalAberto) === 'navegacao';
  const fechar = useUiStore((s) => s.fecharModal);
  const abrir = useUiStore((s) => s.abrirModal);
  const usuario = useAuthStore((s) => s.usuario);
  const logout = useAuthStore((s) => s.logout);
  const qtd = useCartTotalItens();
  const navigate = useNavigate();

  if (!aberto) return null;

  const itemBase =
    'w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl transition-colors hover:bg-secondary/40';
  const iconWrap =
    'w-9 h-9 shrink-0 rounded-xl bg-secondary/40 flex items-center justify-center';

  return (
    <ModalPanel
      aoFechar={fechar}
      posicao="right"
      title="Navegacao"
      dataCy="nav-modal"
    >
      <div className="px-4 sm:px-5 py-4 space-y-5">
        {usuario && (
          <div
            data-cy="nav-modal-user-card"
            className="rounded-2xl bg-secondary/40 border border-dark/5 p-4"
          >
            <p className="text-xs uppercase tracking-wider text-muted/70 font-semibold">
              Logado como
            </p>
            <p className="font-display text-lg font-bold text-dark mt-1 truncate">
              {usuario.nome}
            </p>
            <p className="text-sm text-muted/80 truncate">{usuario.email}</p>
            <span className="mt-2 inline-block text-[11px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-white/70 text-dark border border-dark/10">
              {usuario.tipo === 'cliente' ? 'Cliente' : 'Fornecedor'}
            </span>
          </div>
        )}

        <div className="space-y-1">
          <button
            type="button"
            data-cy="nav-modal-home"
            className={itemBase}
            onClick={() => {
              fechar();
              navigate('/');
            }}
          >
            <span className="flex items-center gap-3">
              <span className={iconWrap}>
                <Home className="w-5 h-5" strokeWidth={2} />
              </span>
              <span className="font-medium text-dark">Home</span>
            </span>
            <ChevronRight className="w-4 h-4 text-muted/60" strokeWidth={2} />
          </button>

          <button
            type="button"
            data-cy="nav-modal-cart"
            className={itemBase}
            onClick={() => {
              fechar();
              abrir('carrinho');
              navigate('/carrinho');
            }}
          >
            <span className="flex items-center gap-3">
              <span className={`${iconWrap} relative`}>
                <ShoppingBag className="w-5 h-5" strokeWidth={2} />
              </span>
              <span className="font-medium text-dark">
                Carrinho
                {qtd > 0 && (
                  <span
                    data-cy="nav-modal-cart-badge"
                    className="ml-2 inline-flex items-center justify-center min-w-[22px] h-5 px-1.5 rounded-full bg-detail text-dark text-xs font-bold"
                  >
                    {qtd}
                  </span>
                )}
              </span>
            </span>
            <ChevronRight className="w-4 h-4 text-muted/60" strokeWidth={2} />
          </button>

          {usuario ? (
            <button
              type="button"
              data-cy="nav-modal-logout"
              className={itemBase}
              onClick={() => {
                fechar();
                logout();
                navigate('/');
              }}
            >
              <span className="flex items-center gap-3">
                <span className={iconWrap}>
                  <LogOut className="w-5 h-5" strokeWidth={2} />
                </span>
                <span className="font-medium text-dark">Sair da conta</span>
              </span>
              <ChevronRight className="w-4 h-4 text-muted/60" strokeWidth={2} />
            </button>
          ) : (
            <>
              <button
                type="button"
                data-cy="nav-modal-login"
                className={itemBase}
                onClick={() => {
                  fechar();
                  abrir('login');
                  navigate('/login');
                }}
              >
                <span className="flex items-center gap-3">
                  <span className={iconWrap}>
                    <LogIn className="w-5 h-5" strokeWidth={2} />
                  </span>
                  <span className="font-medium text-dark">Fazer login</span>
                </span>
                <ChevronRight className="w-4 h-4 text-muted/60" strokeWidth={2} />
              </button>
              <button
                type="button"
                data-cy="nav-modal-cadastro"
                className={itemBase}
                onClick={() => {
                  fechar();
                  abrir('cadastro');
                }}
              >
                <span className="flex items-center gap-3">
                  <span className={iconWrap}>
                    <UserPlus className="w-5 h-5" strokeWidth={2} />
                  </span>
                  <span className="font-medium text-dark">Criar conta</span>
                </span>
                <ChevronRight className="w-4 h-4 text-muted/60" strokeWidth={2} />
              </button>
            </>
          )}
        </div>

        <div>
          <p className="text-xs uppercase tracking-wider text-muted/70 font-semibold mb-2 ml-1">
            Categorias
          </p>
          <ul className="space-y-1">
            <li>
              <button
                type="button"
                data-cy="nav-modal-categoria-todos"
                className={itemBase}
                onClick={() => {
                  fechar();
                  navigate('/');
                  setTimeout(() => {
                    document
                      .getElementById('produtos')
                      ?.scrollIntoView({ behavior: 'smooth' });
                  }, 30);
                }}
              >
                <span className="flex items-center gap-3">
                  <span className={iconWrap}>
                    <Tag className="w-5 h-5" strokeWidth={2} />
                  </span>
                  <span className="font-medium text-dark">
                    Todos os produtos
                  </span>
                </span>
                <ChevronRight
                  className="w-4 h-4 text-muted/60"
                  strokeWidth={2}
                />
              </button>
            </li>
            {categorias.map((cat) => {
              const Icon = iconeMap[cat.icone] ?? Tag;
              return (
                <li key={cat.slug}>
                  <button
                    type="button"
                    data-cy={`nav-modal-categoria-${cat.slug}`}
                    className={itemBase}
                    onClick={() => {
                      fechar();
                      navigate(`/categoria/${cat.slug}`);
                    }}
                  >
                    <span className="flex items-center gap-3">
                      <span className={iconWrap}>
                        <Icon className="w-5 h-5" strokeWidth={2} />
                      </span>
                      <span className="font-medium text-dark">
                        {cat.nome}
                      </span>
                    </span>
                    <ChevronRight
                      className="w-4 h-4 text-muted/60"
                      strokeWidth={2}
                    />
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </ModalPanel>
  );
}
