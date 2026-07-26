import express from 'express';
import cors from 'cors';
import produtosRouter from './routes/produtos';
import categoriasRouter from './routes/categorias';
import loginRouter from './routes/login';
import cadastroRouter from './routes/cadastro';

const app = express();
const PORTA = 4000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/produtos', produtosRouter);
app.use('/api/categorias', categoriasRouter);
app.use('/api/login', loginRouter);
app.use('/api/cadastro', cadastroRouter);

app.listen(PORTA, () => {
  console.log(`[api] Servidor rodando em http://localhost:${PORTA}`);
});
