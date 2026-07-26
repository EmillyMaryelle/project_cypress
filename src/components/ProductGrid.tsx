import { useMemo } from 'react';
import ProductCard from './ProductCard';
import type { Produto } from '@shared/types';
import { Loader2, PackageOpen } from 'lucide-react';

interface Props {
  produtos: Produto[];
  loading?: boolean;
  error?: string | null;
}

export default function ProductGrid({ produtos, loading, error }: Props) {
  const skeleton = useMemo(
    () => Array.from({ length: 8 }, (_, i) => i),
    [],
  );

  if (loading) {
    return (
      <div
        data-cy="product-grid"
        data-state="loading"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6"
      >
        {skeleton.map((i) => (
          <div
          data-cy={`product-skeleton-${i}`}
          key={i}
            className="card overflow-hidden animate-pulse"
            aria-hidden
          >
            <div className="aspect-[4/5] bg-secondary/40" />
            <div className="p-4 space-y-3">
              <div className="h-5 w-3/5 rounded-full bg-secondary/60" />
              <div className="h-4 w-4/5 rounded-full bg-secondary/40" />
              <div className="flex items-end justify-between pt-3">
                <div className="h-7 w-24 rounded-full bg-secondary/60" />
                <div className="h-10 w-28 rounded-full bg-secondary/50" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div
        data-cy="product-grid"
        data-state="error"
        className="rounded-2xl bg-white/70 border border-detail/40 p-6 text-center shadow-card"
      >
        <p data-cy="product-grid-error-message" className="text-dark font-semibold">{error}</p>
        <p className="text-muted/80 text-sm mt-1">
          Tente recarregar a pagina.
        </p>
      </div>
    );
  }

  if (produtos.length === 0) {
    return (
      <div
        data-cy="product-grid"
        data-state="empty"
        className="rounded-2xl bg-white/70 border border-dark/5 p-10 text-center shadow-card"
      >
        <div className="w-16 h-16 mx-auto rounded-full bg-secondary/60 flex items-center justify-center mb-3">
          <PackageOpen className="w-8 h-8 text-dark/80" strokeWidth={1.8} />
        </div>
        <h4 data-cy="product-grid-empty-title" className="font-display text-2xl font-bold text-dark mb-1">
          Nenhum produto encontrado
        </h4>
        <p data-cy="product-grid-empty-subtitle" className="text-muted/80">
          Tente selecionar outra categoria.
        </p>
      </div>
    );
  }

  return (
    <div
      data-cy="product-grid"
      data-state="ready"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6"
    >
      {produtos.map((p, idx) => (
        <div
          key={p.id}
          style={{ animationDelay: `${idx * 40}ms` }}
          className="animate-[slideIn_400ms_cubic-bezier(0.16,1,0.3,1)_both]"
        >
          <ProductCard produto={p} />
        </div>
      ))}
    </div>
  );
}
