import { Link, useNavigate } from 'react-router-dom';
import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  CreditCard,
  ArrowLeft,
  ShieldCheck,
} from 'lucide-react';
import { useCartStore, useCartValorTotal } from '@/stores/cartStore';
import { useAuthStore } from '@/stores/authStore';
import { useUiStore } from '@/stores/uiStore';
import { formatarMoeda } from '@/utils/format';

export default function CartPage() {
  const itens = useCartStore((s) => s.itens);
  const alterar = useCartStore((s) => s.alterarQuantidade);
  const remover = useCartStore((s) => s.remover);
  const limpar = useCartStore((s) => s.limpar);
  const total = useCartValorTotal();
  const usuario = useAuthStore((s) => s.usuario);
  const abrirModal = useUiStore((s) => s.abrirModal);
  const navigate = useNavigate();

  if (itens.length === 0) {
    return (
      <div data-cy="cart-page" data-state="empty" className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <div className="rounded-3xl bg-white/70 border border-dark/5 shadow-soft px-6 sm:px-10 py-12 sm:py-16 text-center">
          <div className="w-24 h-24 mx-auto rounded-full bg-secondary/60 flex items-center justify-center mb-5 shadow-card">
            <ShoppingBag
              className="w-11 h-11 text-dark/80"
              strokeWidth={1.8}
            />
          </div>
          <h1 data-cy="cart-empty-title" className="font-display text-3xl sm:text-4xl font-bold text-dark mb-2">
            Seu carrinho esta vazio
          </h1>
          <p className="text-muted/80 mb-8 max-w-md mx-auto">
            Explore nossas categorias e escolha produtos que combinam com o seu
            estilo.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link to="/" data-cy="cart-empty-go-shop" className="btn-primary">
              Ir para as compras
            </Link>
            <button
              type="button"
              data-cy="cart-empty-open-nav"
              className="btn-outline"
              onClick={() => abrirModal('navegacao')}
            >
              Abrir menu
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div data-cy="cart-page" data-state="ready" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="flex items-center justify-between mb-8">
        <Link to="/" data-cy="cart-continue-shopping" className="btn-ghost !px-3 !py-1.5 gap-1.5">
          <ArrowLeft className="w-4 h-4" strokeWidth={2} />
          Continuar comprando
        </Link>
        <h1 data-cy="cart-title" className="font-display text-2xl sm:text-3xl font-bold text-dark">
          Resumo do carrinho
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        <div data-cy="cart-items-list" className="lg:col-span-2 space-y-4">
          {itens.map((item) => {
            const subtotal = item.produto.preco * item.quantidade;
            return (
              <div
                key={item.produto.id}
                data-cy={`cart-page-item-${item.produto.id}`}
                data-product-id={item.produto.id}
                className="rounded-2xl bg-white/70 border border-dark/5 shadow-card p-4 sm:p-5 flex gap-4"
              >
                <Link
                  to="/"
                  className="shrink-0 w-24 h-28 sm:w-28 sm:h-32 rounded-xl overflow-hidden bg-secondary/30"
                >
                  <img
                    src={item.produto.imagem}
                    alt={item.produto.nome}
                    className="w-full h-full object-cover"
                  />
                </Link>
                <div className="flex-1 min-w-0 flex flex-col">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-xs uppercase tracking-wider text-muted/60 font-medium">
                        {item.produto.categoria}
                      </p>
                      <h3 data-cy={`cart-page-item-name-${item.produto.id}`} className="font-semibold text-dark sm:text-lg truncate">
                        {item.produto.nome}
                      </h3>
                      {item.produto.descricao && (
                        <p className="text-muted/80 text-sm mt-1 line-clamp-2 hidden sm:block">
                          {item.produto.descricao}
                        </p>
                      )}
                    </div>
                    <button
                      type="button"
                      data-cy={`cart-page-item-remove-${item.produto.id}`}
                      onClick={() => remover(item.produto.id)}
                      className="btn-ghost !p-2 text-muted hover:text-detail"
                      aria-label="Remover item"
                      title="Remover item"
                    >
                      <Trash2 className="w-5 h-5" strokeWidth={2} />
                    </button>
                  </div>
                  <div className="mt-auto flex items-end justify-between pt-3">
                    <div className="inline-flex items-center rounded-full border border-dark/10 bg-white/80 p-0.5">
                      <button
                        type="button"
                        data-cy={`cart-page-item-qty-minus-${item.produto.id}`}
                        onClick={() =>
                          alterar(item.produto.id, item.quantidade - 1)
                        }
                        className="w-9 h-9 rounded-full flex items-center justify-center text-dark hover:bg-secondary/40 transition-colors"
                        aria-label="Diminuir quantidade"
                      >
                        <Minus className="w-4 h-4" strokeWidth={2.4} />
                      </button>
                      <span
                        data-cy={`cart-page-item-qty-${item.produto.id}`}
                        className="w-9 text-center font-semibold text-dark"
                      >
                        {item.quantidade}
                      </span>
                      <button
                        type="button"
                        data-cy={`cart-page-item-qty-plus-${item.produto.id}`}
                        onClick={() =>
                          alterar(item.produto.id, item.quantidade + 1)
                        }
                        className="w-9 h-9 rounded-full flex items-center justify-center text-dark hover:bg-secondary/40 transition-colors"
                        aria-label="Aumentar quantidade"
                      >
                        <Plus className="w-4 h-4" strokeWidth={2.4} />
                      </button>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted/70">Subtotal</p>
                      <p
                        data-cy={`cart-page-item-subtotal-${item.produto.id}`}
                        className="font-display text-xl font-bold text-dark"
                      >
                        {formatarMoeda(subtotal)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          <button
            type="button"
            data-cy="cart-page-clear-btn"
            onClick={() => limpar()}
            className="btn-outline !w-full sm:!w-auto text-sm"
          >
            Limpar carrinho
          </button>
        </div>

        <aside data-cy="cart-page-summary" className="lg:col-span-1">
          <div className="rounded-3xl bg-white/75 border border-dark/5 shadow-soft p-6 sm:p-7 space-y-5 sticky top-24">
            <h2 className="font-display text-2xl font-bold text-dark">
              Pedido
            </h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted font-medium">Subtotal</span>
                <span data-cy="cart-page-subtotal" className="font-semibold text-dark">
                  {formatarMoeda(total)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted font-medium">Frete</span>
                <span className="font-semibold text-dark">Gratis</span>
              </div>
              <div className="flex items-center justify-between text-[11px] uppercase tracking-wider text-muted/70 font-semibold pt-2 border-t border-dashed border-dark/10">
                <span>Total estimado</span>
                <span>{formatarMoeda(total)}</span>
              </div>
              <div className="flex items-center justify-between pt-1">
                <span className="font-display text-xl font-bold text-dark">
                  Total
                </span>
                <span
                  data-cy="cart-page-total"
                  className="font-display text-2xl font-bold text-dark"
                >
                  {formatarMoeda(total)}
                </span>
              </div>
            </div>
            <button
              type="button"
              data-cy="cart-page-checkout-btn"
              onClick={() => {
                if (!usuario) {
                  abrirModal('login');
                  navigate('/login');
                  return;
                }
                alert('Compra simulada com sucesso.');
                limpar();
                navigate('/');
              }}
              className="btn-primary w-full !py-3.5"
            >
              <CreditCard className="w-4 h-4" strokeWidth={2} />
              Finalizar compra
            </button>
            {!usuario && (
              <p data-cy="cart-page-login-required" className="text-xs text-muted/70 text-center">
                Voce precisa estar logado para finalizar a compra.
              </p>
            )}
            <div className="rounded-2xl bg-secondary/40 border border-dark/5 p-3.5 flex items-start gap-2 text-xs text-muted/80">
              <ShieldCheck
                className="w-5 h-5 text-detail shrink-0"
                strokeWidth={2}
              />
              <p>
                Compra simulada. Nenhum valor sera cobrado. Projeto criado para
                demonstracao.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
