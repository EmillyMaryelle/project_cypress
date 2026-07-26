import { useEffect, useState } from 'react';
import type { Produto, Categoria } from '@shared/types';

async function safeFetch<T>(url: string, fallback: T): Promise<T> {
  try {
    const resp = await fetch(url);
    if (!resp.ok) throw new Error('erro');
    return (await resp.json()) as T;
  } catch {
    return fallback;
  }
}

export function useProdutos(categoriaSlug?: string | null) {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelado = false;
    setLoading(true);
    const url = categoriaSlug
      ? `/api/produtos?categoria=${encodeURIComponent(categoriaSlug)}`
      : '/api/produtos';
    safeFetch<Produto[]>(url, [])
      .then((dados) => {
        if (cancelado) return;
        setProdutos(dados);
      })
      .catch(() => !cancelado && setError('Falha ao carregar produtos.'))
      .finally(() => !cancelado && setLoading(false));
    return () => {
      cancelado = true;
    };
  }, [categoriaSlug]);

  return { produtos, loading, error };
}

export function useCategorias() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelado = false;
    safeFetch<Categoria[]>('/api/categorias', [])
      .then((dados) => {
        if (cancelado) return;
        setCategorias(dados);
      })
      .finally(() => !cancelado && setLoading(false));
    return () => {
      cancelado = true;
    };
  }, []);

  return { categorias, loading };
}
