import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Shirt, Watch, Smartphone, Sofa, Tag } from 'lucide-react';
import CategoryChips from '@/components/CategoryChips';
import ProductGrid from '@/components/ProductGrid';
import { useProdutos, useCategorias } from '@/hooks/useApi';

const iconeMap: Record<string, typeof Shirt> = {
  Shirt,
  Watch,
  Smartphone,
  Sofa,
};

export default function CategoryPage() {
  const { slug } = useParams();
  const { produtos, loading, error } = useProdutos(slug ?? null);
  const { categorias } = useCategorias();
  const atual = categorias.find((c) => c.slug === slug);
  const Icone = atual ? iconeMap[atual.icone] ?? Tag : Tag;

  return (
    <div data-cy="category-page" data-category-slug={slug} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      <div className="flex items-center gap-2 text-sm">
        <Link to="/" data-cy="category-back-home" className="btn-ghost !px-3 !py-1.5 gap-1.5">
          <ArrowLeft className="w-4 h-4" strokeWidth={2} />
          Voltar para home
        </Link>
      </div>

      <header data-cy="category-header" className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-secondary/60 via-primary to-detail/20 border border-dark/5 shadow-soft px-6 sm:px-10 py-10 sm:py-14">
        <div
          aria-hidden
          className="absolute -top-10 -right-10 w-56 h-56 rounded-full bg-detail/40 blur-3xl"
        />
        <div className="relative flex items-start gap-4 sm:gap-5">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/80 shadow-card flex items-center justify-center shrink-0">
            <Icone className="w-7 h-7 sm:w-8 sm:h-8 text-dark" strokeWidth={2} />
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-muted/70 font-semibold">
              Categoria
            </p>
            <h1 data-cy="category-name" className="font-display text-3xl sm:text-5xl font-bold text-dark mt-1">
              {atual?.nome ?? slug ?? 'Produtos'}
            </h1>
            <p className="text-muted/80 sm:text-lg mt-2 max-w-2xl">
              Confira todas as nossas pecas selecionadas dessa categoria.
            </p>
          </div>
        </div>
      </header>

      <CategoryChips
        categorias={categorias}
        ativa={slug ?? null}
        aoSelecionar={() => {}}
      />

      <section data-cy="category-product-list">
        <ProductGrid produtos={produtos} loading={loading} error={error} />
      </section>
    </div>
  );
}
