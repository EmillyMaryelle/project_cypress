import { Router } from 'express';
import { produtos } from '../data/mockData';

const router = Router();

router.get('/', (req, res) => {
  const { categoria } = req.query;
  if (categoria && typeof categoria === 'string') {
    const filtrados = produtos.filter((p) => p.categoriaSlug === categoria);
    return res.json(filtrados);
  }
  res.json(produtos);
});

router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  const produto = produtos.find((p) => p.id === id);
  if (!produto) return res.status(404).json({ erro: 'Produto não encontrado' });
  res.json(produto);
});

export default router;
