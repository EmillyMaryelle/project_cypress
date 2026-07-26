import { ShoppingCart, Tag } from 'lucide-react';
import type { Produto } from '@shared/types';
import { formatarMoeda } from '@/utils/format';
import { useCartStore } from '@/stores/cartStore';
import { useUiStore } from '@/stores/uiStore';

interface Props {
  produto: Produto;
}

export default function ProductCard({ produto }: Props) {
  const adicionar = useCartStore((s) => s.adicionar);
  const abrirModal = useUiStore((s) => s.abrirModal);

  const handleAdicionar = () => {
    adicionar(produto, 1);
    abrirModal('carrinho');
  };

  return (
    <article
      data-cy={`product-card-${produto.id}`}
      data-product-id={produto.id}
      data-product-slug={produto.categoriaSlug}
      className="card group overflow-hidden flex flex-col"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-secondary/30">
        <img
          src={produto.imagem}
          alt={produto.nome}
          loading="lazy"
          data-cy={`product-image-${produto.id}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div data-cy={`product-category-tag-${produto.id}`} className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full bg-primary/85 backdrop-blur px-3 py-1 text-xs font-medium text-dark shadow-card">
          <Tag className="w-3.5 h-3.5" strokeWidth={2} />
          {produto.categoria}
        </div>
      </div>

      <div className="flex flex-col gap-2 p-4 flex-1">
        <h3 data-cy={`product-name-${produto.id}`} className="font-display text-lg font-semibold text-dark leading-snug line-clamp-2">
          {produto.nome}
        </h3>
        {produto.descricao && (
          <p data-cy={`product-description-${produto.id}`} className="text-sm text-muted/80 leading-relaxed line-clamp-2">
            {produto.descricao}
          </p>
        )}
        <div className="mt-auto flex items-end justify-between pt-2">
          <div>
            <p className="text-xs uppercase tracking-wider text-muted/60 font-medium">
              Por
            </p>
            <p data-cy={`product-price-${produto.id}`} className="font-display text-2xl font-bold text-dark">
              {formatarMoeda(produto.preco)}
            </p>
          </div>
          <button
            type="button"
            data-cy={`product-add-btn-${produto.id}`}
            onClick={handleAdicionar}
            className="btn-primary !px-3 !py-2.5 sm:!px-4"
            aria-label={`Adicionar ${produto.nome} ao carrinho`}
          >
            <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2} />
            <span className="hidden sm:inline text-sm">Adicionar</span>
          </button>
        </div>
      </div>
    </article>
  );
}
