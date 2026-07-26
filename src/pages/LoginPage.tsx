import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
  LogIn,
  LogOut,
  Mail,
  Lock,
  Sparkles,
  User as UserIcon,
  ArrowLeft,
  ShoppingBag,
} from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import { useCartStore, useCartValorTotal } from '@/stores/cartStore';
import { formatarMoeda } from '@/utils/format';

export default function LoginPage() {
  const { usuario, login, logout, loading, erro, limparErro } = useAuthStore();
  const itens = useCartStore((s) => s.itens);
  const totalCarrinho = useCartValorTotal();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState<string | null>(null);

  useEffect(() => {
    if (!usuario) {
      setEmail('usuario@exemplo.com');
      setSenha('123456');
    }
    limparErro();
  }, [usuario, limparErro]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const ok = await login({ email: email.trim(), senha });
    if (ok) {
      setMensagem('Login efetuado com sucesso.');
      setTimeout(() => navigate('/'), 800);
    }
  };

  return (
    <div data-cy="login-page" className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <div className="flex items-center justify-between mb-8">
        <Link to="/" data-cy="login-page-back-home" className="btn-ghost !px-3 !py-1.5 gap-1.5">
          <ArrowLeft className="w-4 h-4" strokeWidth={2} />
          Voltar para home
        </Link>
        <h1 data-cy="login-page-title" className="font-display text-2xl sm:text-3xl font-bold text-dark">
          {usuario ? 'Minha conta' : 'Entrar'}
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
        <div data-cy="login-page-form-card" className="lg:col-span-3 rounded-3xl bg-white/70 border border-dark/5 shadow-soft overflow-hidden">
          <div className="relative px-6 sm:px-10 py-8 sm:py-10 bg-gradient-to-br from-secondary/50 via-primary to-detail/20 border-b border-dark/5">
            <div
              aria-hidden
              className="absolute -top-16 -right-10 w-56 h-56 rounded-full bg-detail/40 blur-3xl"
            />
            <div className="relative flex items-center gap-3 sm:gap-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/80 shadow-card flex items-center justify-center shrink-0">
                {usuario ? (
                  <span data-cy="login-page-user-initial" className="font-display text-2xl font-bold">
                    {usuario.nome.charAt(0).toUpperCase()}
                  </span>
                ) : (
                  <UserIcon
                    className="w-6 h-6 sm:w-7 sm:h-7 text-dark"
                    strokeWidth={2}
                  />
                )}
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-muted/70 font-semibold">
                  {usuario ? 'Bem-vindo de volta' : 'Acesse sua conta'}
                </p>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-dark">
                  {usuario
                    ? `Ola, ${usuario.nome.split(' ')[0]}`
                    : 'Login simulado'}
                </h2>
              </div>
            </div>
          </div>

          {usuario ? (
            <div className="px-6 sm:px-10 py-8 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div data-cy="login-page-user-name" className="rounded-2xl bg-secondary/40 border border-dark/5 p-4">
                  <p className="text-xs uppercase tracking-wider text-muted/70 font-semibold">
                    Nome
                  </p>
                  <p className="font-semibold text-dark mt-1">{usuario.nome}</p>
                </div>
                <div data-cy="login-page-user-email" className="rounded-2xl bg-secondary/40 border border-dark/5 p-4">
                  <p className="text-xs uppercase tracking-wider text-muted/70 font-semibold">
                    E-mail
                  </p>
                  <p className="font-semibold text-dark mt-1">{usuario.email}</p>
                </div>
              </div>

              <div className="rounded-2xl bg-detail/10 border border-detail/30 p-4 flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-detail shrink-0" strokeWidth={2} />
                <div className="text-sm text-muted/80">
                  <p className="font-semibold text-dark mb-0.5">
                    Conta de demonstracao
                  </p>
                  <p>
                    Esta e uma simulacao. Nenhum dado real foi enviado para um
                    servidor de autenticacao.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                <Link to="/" data-cy="login-page-buy-more" className="btn-outline">
                  Comprar mais
                </Link>
                <Link to="/carrinho" data-cy="login-page-go-cart" className="btn-outline">
                  Meu carrinho
                </Link>
                <button
                  type="button"
                  data-cy="login-page-logout-btn"
                  onClick={() => {
                    logout();
                    setMensagem('Voce saiu da sua conta.');
                  }}
                  className="btn-primary"
                >
                  <LogOut className="w-4 h-4" strokeWidth={2} />
                  Sair
                </button>
              </div>

              {mensagem && (
                <p data-cy="login-page-message" className="rounded-xl bg-secondary/50 text-dark text-sm px-4 py-3 border border-dark/10">
                  {mensagem}
                </p>
              )}
            </div>
          ) : (
            <form onSubmit={onSubmit} className="px-6 sm:px-10 py-8 space-y-5">
              <div data-cy="login-page-demo-card" className="rounded-2xl bg-secondary/40 border border-dark/5 p-4 text-sm text-muted space-y-1">
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
                      data-cy="login-page-input-email"
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
                      data-cy="login-page-input-senha"
                      placeholder="Senha"
                      value={senha}
                      onChange={(e) => setSenha(e.target.value)}
                      className="input-base pl-11"
                      autoComplete="current-password"
                    />
                  </span>
                </label>
              </div>

              {(erro || mensagem) && (
                <div
                  data-cy="login-page-alert"
                  className={`rounded-xl px-4 py-3 text-sm ${
                    erro
                      ? 'bg-[#fde6dd] text-dark border border-detail/40'
                      : 'bg-secondary/50 text-dark border border-dark/10'
                  }`}
                >
                  {erro ?? mensagem}
                </div>
              )}

              <button
                type="submit"
                data-cy="login-page-submit-btn"
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

              <p className="text-xs text-muted/70 text-center">
                Ao entrar, voce concorda com os termos simulados da loja.
              </p>
            </form>
          )}
        </div>

        <aside className="lg:col-span-2 space-y-5">
          <div data-cy="login-page-cart-summary" className="rounded-3xl bg-gradient-to-br from-detail/25 via-primary to-secondary/60 border border-dark/5 shadow-soft p-6 sm:p-7">
            <div className="flex items-center gap-2 mb-3">
              <ShoppingBag
                className="w-5 h-5 text-detail"
                strokeWidth={2}
              />
              <h3 className="font-display text-xl font-bold text-dark">
                Seu carrinho
              </h3>
            </div>
            {itens.length === 0 ? (
              <p className="text-muted/80 text-sm">
                Vazio. Adicione produtos para continuar.
              </p>
            ) : (
              <>
                <ul data-cy="login-page-cart-items" className="space-y-3 my-4">
                  {itens.slice(0, 3).map((item) => (
                    <li
                      key={item.produto.id}
                      data-cy={`login-page-cart-item-${item.produto.id}`}
                      className="flex items-center gap-3 rounded-2xl bg-white/60 border border-dark/5 p-2.5 shadow-card"
                    >
                      <div className="w-12 h-14 rounded-lg overflow-hidden bg-secondary/30 shrink-0">
                        <img
                          src={item.produto.imagem}
                          alt={item.produto.nome}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-dark text-sm truncate">
                          {item.produto.nome}
                        </p>
                        <p className="text-xs text-muted/70">
                          Qtd {item.quantidade} ·{' '}
                          {formatarMoeda(item.produto.preco * item.quantidade)}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-between border-t border-dashed border-dark/10 pt-3">
                  <span className="text-muted font-medium">Total</span>
                  <span
                    data-cy="login-page-cart-total"
                    className="font-display text-2xl font-bold text-dark"
                  >
                    {formatarMoeda(totalCarrinho)}
                  </span>
                </div>
                <Link to="/carrinho" data-cy="login-page-view-cart" className="btn-outline w-full mt-4">
                  Ver carrinho completo
                </Link>
              </>
            )}
          </div>

          <div className="rounded-3xl bg-white/70 border border-dark/5 shadow-soft p-6 sm:p-7 space-y-3 text-sm text-muted/80">
            <h3 className="font-display text-xl font-bold text-dark">
              Por que criar uma conta?
            </h3>
            <ul className="space-y-2">
              <li>Finalize suas compras com mais rapidez</li>
              <li>Acompanhe seus pedidos em tempo real</li>
              <li>Receba ofertas exclusivas por e-mail</li>
              <li>Lista de desejos sincronizada</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
