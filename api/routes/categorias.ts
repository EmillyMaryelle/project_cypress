import { Router } from 'express';
import { categorias } from '../data/mockData';

const router = Router();

router.get('/', (_req, res) => {
  res.json(categorias);
});

export default router;
