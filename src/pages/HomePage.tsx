import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from '@/components/Hero';
import CategoryChips from '@/components/CategoryChips';
import ProductGrid from '@/components/ProductGrid';
import { useProdutos, useCategorias } from '@/hooks/useApi';

export default function HomePage() {
  const [filtro, setFiltro] = useState<string | null>(null);
  const { produtos, loading, error } = useProdutos(filtro);
  const { categorias } = useCategorias();
  const navigate = useNavigate();

  return (
    <div data-cy="home-page">
      <Hero
        onVerProdutos={() => {
          const el = document.getElementById('produtos');
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }}
      />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16 space-y-12">
        <CategoryChips
          categorias={categorias}
          ativa={filtro}
          aoSelecionar={(slug) => {
            setFiltro(slug);
            if (slug) navigate(`/categoria/${slug}`, { replace: false });
            else navigate('/', { replace: true });
            setTimeout(() => {
              document
                .getElementById('produtos')
                ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 30);
          }}
        />
        <section id="produtos" className="scroll-mt-24">
          <div className="flex items-end justify-between mb-5">
            <div>
              <h2 data-cy="home-products-title" className="font-display text-2xl sm:text-3xl font-bold text-dark">
                {filtro
                  ? categorias.find((c) => c.slug === filtro)?.nome ??
                    'Produtos'
                  : 'Produtos em destaque'}
              </h2>
              <p data-cy="home-products-count" className="text-muted/80 text-sm sm:text-base mt-1">
                {produtos.length}{' '}
                {produtos.length === 1 ? 'produto encontrado' : 'produtos encontrados'}
              </p>
            </div>
          </div>
          <ProductGrid produtos={produtos} loading={loading} error={error} />
        </section>
      </main>
    </div>
  );
}
