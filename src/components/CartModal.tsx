import { Minus, Plus, Trash2, ShoppingBag, CreditCard } from 'lucide-react';
import ModalPanel from './ModalPanel';
import { useUiStore } from '@/stores/uiStore';
import { useCartStore, useCartValorTotal } from '@/stores/cartStore';
import { formatarMoeda } from '@/utils/format';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';

export default function CartModal() {
  const aberto = useUiStore((s) => s.modalAberto) === 'carrinho';
  const fechar = useUiStore((s) => s.fecharModal);
  const abrir = useUiStore((s) => s.abrirModal);
  const itens = useCartStore((s) => s.itens);
  const alterar = useCartStore((s) => s.alterarQuantidade);
  const remover = useCartStore((s) => s.remover);
  const limpar = useCartStore((s) => s.limpar);
  const total = useCartValorTotal();
  const usuario = useAuthStore((s) => s.usuario);
  const navigate = useNavigate();

  if (!aberto) return null;

  return (
    <ModalPanel
      aoFechar={fechar}
      posicao="right"
      title="Seu carrinho"
      dataCy="cart-modal"
    >
      <div className="flex flex-col h-full">
        {itens.length === 0 ? (
          <div
            data-cy="cart-modal-empty"
            className="flex-1 px-5 sm:px-6 py-10 flex flex-col items-center justify-center text-center"
          >
            <div className="w-20 h-20 rounded-full bg-secondary/60 flex items-center justify-center mb-4 shadow-card">
              <ShoppingBag className="w-9 h-9 text-dark/80" strokeWidth={1.8} />
            </div>
            <h4 className="font-display text-2xl font-bold text-dark mb-2">
              Carrinho vazio
            </h4>
            <p className="text-muted/80 mb-6 max-w-xs">
              Que tal comecar escolhendo alguns produtos?
            </p>
            <button
              type="button"
              data-cy="cart-modal-empty-ver-produtos"
              className="btn-primary"
              onClick={() => {
                fechar();
                navigate('/');
              }}
            >
              Ver produtos
            </button>
          </div>
        ) : (
          <>
            <ul
              data-cy="cart-modal-list"
              className="flex-1 px-5 sm:px-6 py-4 space-y-4 overflow-y-auto scrollbar-slim"
            >
              {itens.map((item) => {
                const subtotal = item.produto.preco * item.quantidade;
                return (
                  <li
                    key={item.produto.id}
                    data-cy={`cart-item-${item.produto.id}`}
                    data-product-id={item.produto.id}
                    className="flex gap-3 rounded-2xl bg-white/70 border border-dark/5 p-3 shadow-card"
                  >
                    <div className="shrink-0 w-20 h-24 sm:w-24 sm:h-28 rounded-xl overflow-hidden bg-secondary/30">
                      <Link
                        to="/"
                        onClick={fechar}
                        className="block w-full h-full"
                      >
                        <img
                          src={item.produto.imagem}
                          alt={item.produto.nome}
                          className="w-full h-full object-cover"
                        />
                      </Link>
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="text-xs uppercase tracking-wider text-muted/60 font-medium">
                            {item.produto.categoria}
                          </p>
                          <h4
                            data-cy={`cart-item-name-${item.produto.id}`}
                            className="font-semibold text-dark truncate"
                          >
                            {item.produto.nome}
                          </h4>
                        </div>
                        <button
                          type="button"
                          data-cy={`cart-item-remove-${item.produto.id}`}
                          onClick={() => remover(item.produto.id)}
                          className="btn-ghost !p-2 text-muted hover:text-detail"
                          aria-label={`Remover ${item.produto.nome}`}
                          title="Remover item"
                        >
                          <Trash2 className="w-4 h-4" strokeWidth={2} />
                        </button>
                      </div>
                      <div className="mt-auto flex items-end justify-between pt-2">
                        <div className="inline-flex items-center rounded-full border border-dark/10 bg-white/80 p-0.5">
                          <button
                            type="button"
                            data-cy={`cart-item-qty-minus-${item.produto.id}`}
                            onClick={() =>
                              alterar(item.produto.id, item.quantidade - 1)
                            }
                            className="w-8 h-8 rounded-full flex items-center justify-center text-dark hover:bg-secondary/40 transition-colors"
                            aria-label="Diminuir quantidade"
                          >
                            <Minus className="w-4 h-4" strokeWidth={2.4} />
                          </button>
                          <span
                            data-cy={`cart-item-qty-${item.produto.id}`}
                            className="w-8 text-center font-semibold text-dark text-sm"
                          >
                            {item.quantidade}
                          </span>
                          <button
                            type="button"
                            data-cy={`cart-item-qty-plus-${item.produto.id}`}
                            onClick={() =>
                              alterar(item.produto.id, item.quantidade + 1)
                            }
                            className="w-8 h-8 rounded-full flex items-center justify-center text-dark hover:bg-secondary/40 transition-colors"
                            aria-label="Aumentar quantidade"
                          >
                            <Plus className="w-4 h-4" strokeWidth={2.4} />
                          </button>
                        </div>
                        <p
                          data-cy={`cart-item-subtotal-${item.produto.id}`}
                          className="font-display text-lg font-bold text-dark"
                        >
                          {formatarMoeda(subtotal)}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div
              data-cy="cart-modal-summary"
              className="border-t border-dark/5 px-5 sm:px-6 py-5 space-y-4 bg-gradient-to-b from-white/30 to-primary"
            >
              <div className="flex items-center justify-between">
                <span className="text-muted font-medium">Subtotal</span>
                <span data-cy="cart-modal-subtotal" className="font-semibold text-dark">
                  {formatarMoeda(total)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted font-medium">Frete</span>
                <span className="font-semibold text-dark">Gratis</span>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-dashed border-dark/10">
                <span className="font-display text-xl font-bold text-dark">
                  Total
                </span>
                <span
                  data-cy="cart-modal-total"
                  className="font-display text-2xl font-bold text-dark"
                >
                  {formatarMoeda(total)}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-1">
                <button
                  type="button"
                  data-cy="cart-modal-limpar"
                  onClick={() => limpar()}
                  className="btn-outline"
                >
                  Limpar
                </button>
                <button
                  type="button"
                  data-cy="cart-modal-finalizar"
                  className="btn-primary"
                  onClick={() => {
                    if (!usuario) {
                      fechar();
                      abrir('login');
                      return;
                    }
                    alert('Compra simulada com sucesso.');
                    limpar();
                    fechar();
                  }}
                >
                  <CreditCard className="w-4 h-4" strokeWidth={2} />
                  Finalizar
                </button>
              </div>
              {!usuario && (
                <p data-cy="cart-modal-login-required" className="text-xs text-muted/70 text-center pt-1">
                  Voce precisa estar logado para finalizar a compra.
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </ModalPanel>
  );
}
