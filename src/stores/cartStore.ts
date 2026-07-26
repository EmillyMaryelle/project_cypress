import { create } from 'zustand';
import type { Produto, CartItem } from '@shared/types';

interface CartState {
  itens: CartItem[];
  adicionar: (produto: Produto, quantidade?: number) => void;
  remover: (produtoId: number) => void;
  alterarQuantidade: (produtoId: number, quantidade: number) => void;
  limpar: () => void;
}

const STORAGE_KEY = 'loja-simples:carrinho';

function itensFromStorage(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as CartItem[];
  } catch {
    return [];
  }
}

function persistir(itens: CartItem[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(itens));
  } catch {
    // noop
  }
}

export const useCartStore = create<CartState>((set, get) => ({
  itens: typeof window !== 'undefined' ? itensFromStorage() : [],
  adicionar: (produto, quantidade = 1) => {
    const { itens } = get();
    const existente = itens.find((i) => i.produto.id === produto.id);
    let novos: CartItem[];
    if (existente) {
      novos = itens.map((i) =>
        i.produto.id === produto.id
          ? { ...i, quantidade: i.quantidade + quantidade }
          : i,
      );
    } else {
      novos = [...itens, { produto, quantidade }];
    }
    persistir(novos);
    set({ itens: novos });
  },
  remover: (produtoId) => {
    const novos = get().itens.filter((i) => i.produto.id !== produtoId);
    persistir(novos);
    set({ itens: novos });
  },
  alterarQuantidade: (produtoId, quantidade) => {
    if (quantidade <= 0) {
      get().remover(produtoId);
      return;
    }
    const novos = get().itens.map((i) =>
      i.produto.id === produtoId ? { ...i, quantidade } : i,
    );
    persistir(novos);
    set({ itens: novos });
  },
  limpar: () => {
    persistir([]);
    set({ itens: [] });
  },
}));

export function useCartTotalItens(): number {
  return useCartStore((state) =>
    state.itens.reduce((acc, item) => acc + item.quantidade, 0),
  );
}

export function useCartValorTotal(): number {
  return useCartStore((state) =>
    state.itens.reduce(
      (acc, item) => acc + item.produto.preco * item.quantidade,
      0,
    ),
  );
}

export function cartTotalItens(itens: CartItem[]): number {
  return itens.reduce((acc, item) => acc + item.quantidade, 0);
}

export function cartValorTotal(itens: CartItem[]): number {
  return itens.reduce(
    (acc, item) => acc + item.produto.preco * item.quantidade,
    0,
  );
}
