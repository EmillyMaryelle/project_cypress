import { Shirt, Watch, Smartphone, Sofa, Tag } from 'lucide-react';
import type { Categoria } from '@shared/types';

const iconeMap: Record<string, typeof Shirt> = {
  Shirt,
  Watch,
  Smartphone,
  Sofa,
};

interface Props {
  categorias: Categoria[];
  ativa: string | null;
  aoSelecionar: (slug: string | null) => void;
}

export default function CategoryChips({ categorias, ativa, aoSelecionar }: Props) {
  return (
    <div id="categorias" data-cy="category-chips" className="scroll-mt-24">
      <div className="flex items-end justify-between mb-5">
        <div>
          <h2 data-cy="category-title" className="font-display text-2xl sm:text-3xl font-bold text-dark">
            Navegue por categoria
          </h2>
          <p data-cy="category-subtitle" className="text-muted/80 text-sm sm:text-base mt-1">
            Filtre os produtos com o seu estilo preferido.
          </p>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
        <button
          type="button"
          data-cy="chip-todos"
          onClick={() => aoSelecionar(null)}
          className={`chip ${ativa === null ? 'chip-active' : 'chip-default'}`}
        >
          <Tag className="w-4 h-4" strokeWidth={2} />
          Todos
        </button>
        {categorias.map((cat) => {
          const Icon = iconeMap[cat.icone] ?? Tag;
          const isActive = ativa === cat.slug;
          return (
            <button
              key={cat.slug}
              type="button"
              data-cy={`chip-${cat.slug}`}
              onClick={() => aoSelecionar(cat.slug)}
              className={`chip ${isActive ? 'chip-active' : 'chip-default'}`}
            >
              <Icon className="w-4 h-4" strokeWidth={2} />
              {cat.nome}
            </button>
          );
        })}
      </div>
    </div>
  );
}
