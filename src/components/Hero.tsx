import { ArrowDown, Sparkles } from 'lucide-react';

export default function Hero({ onVerProdutos }: { onVerProdutos?: () => void }) {
  const rolar = () => {
    if (onVerProdutos) return onVerProdutos();
    const el = document.getElementById('produtos');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section data-cy="hero" className="relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 opacity-60 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 20%, rgba(228, 166, 145, 0.28), transparent 55%), radial-gradient(circle at 80% 10%, rgba(200, 200, 169, 0.35), transparent 50%)',
        }}
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 sm:py-20 lg:py-24 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7 space-y-7">
          <span data-cy="hero-badge" className="inline-flex items-center gap-2 rounded-full bg-secondary/60 border border-dark/10 px-4 py-1.5 text-sm font-medium text-dark shadow-card">
            <Sparkles className="w-4 h-4 text-detail" strokeWidth={2.2} />
            Nova colecao outono/inverno
          </span>
          <h1 data-cy="hero-title" className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.05] text-dark">
            Encontre o seu estilo{' '}
            <span className="text-detail italic">preferido</span> com precos
            que cabem no bolso.
          </h1>
          <p data-cy="hero-description" className="text-base sm:text-lg text-muted max-w-2xl leading-relaxed">
            Pecas selecionadas de roupas, acessorios, eletronicos e decoracao
            para deixar seu dia a dia ainda mais bonito, do conforto da sua
            casa.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <button type="button" data-cy="hero-ver-produtos" onClick={rolar} className="btn-primary">
              Ver produtos
              <ArrowDown className="w-4 h-4" strokeWidth={2.2} />
            </button>
            <a
              href="#categorias"
              data-cy="hero-explorar-categorias"
              className="btn-outline"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('categorias')?.scrollIntoView({
                  behavior: 'smooth',
                });
              }}
            >
              Explorar categorias
            </a>
          </div>

          <div data-cy="hero-stats" className="grid grid-cols-3 gap-3 sm:gap-6 pt-4 sm:pt-6 max-w-lg">
            {[
              { n: '+12', t: 'pecas selecionadas' },
              { n: '4', t: 'categorias' },
              { n: '100%', t: 'estilo garantido' },
            ].map((item, idx) => (
              <div
                key={item.t}
                data-cy={`hero-stat-${idx}`}
                className="rounded-2xl bg-white/60 border border-dark/5 p-3 sm:p-4 shadow-card"
              >
                <p className="font-display text-2xl sm:text-3xl font-bold text-dark">
                  {item.n}
                </p>
                <p className="text-xs sm:text-sm text-muted/80 mt-1">
                  {item.t}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 relative">
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div className="space-y-3 sm:space-y-4 pt-8 sm:pt-14">
              <div className="card overflow-hidden aspect-[3/4]">
                <img
                  src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=600&q=80"
                  alt="Mulher com bolsa"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="card overflow-hidden aspect-square">
                <img
                  src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80"
                  alt="Relogio dourado"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="space-y-3 sm:space-y-4">
              <div className="card overflow-hidden aspect-square">
                <img
                  src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80"
                  alt="Fones premium"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="card overflow-hidden aspect-[3/4]">
                <img
                  src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&q=80"
                  alt="Interior de casa"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
          <div
            aria-hidden
            className="absolute -top-4 -left-4 w-24 h-24 rounded-full bg-detail/50 blur-3xl"
          />
          <div
            aria-hidden
            className="absolute -bottom-6 -right-4 w-28 h-28 rounded-full bg-secondary/70 blur-3xl"
          />
        </div>
      </div>
    </section>
  );
}
