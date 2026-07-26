import { Router } from 'express';
import { usuariosCadastrados } from '../data/mockData';
import type { LoginPayload, LoginResponse, Usuario } from '@shared/types';

const router = Router();

router.post('/', (req, res) => {
  const { email, senha } = (req.body ?? {}) as LoginPayload;

  if (!email || !senha) {
    const response: LoginResponse = { sucesso: false, erro: 'Informe email e senha.' };
    return res.status(400).json(response);
  }

  const encontrado = usuariosCadastrados.find(
    (u) => u.email.toLowerCase() === email.trim().toLowerCase() && u.senha === senha,
  );

  if (!encontrado) {
    const response: LoginResponse = { sucesso: false, erro: 'Credenciais inválidas.' };
    return res.status(401).json(response);
  }

  const usuario: Usuario = {
    email: encontrado.email,
    nome: encontrado.nome,
    tipo: encontrado.tipo,
    telefone: encontrado.telefone,
    endereco: encontrado.endereco,
    nomeLoja: encontrado.nomeLoja,
  };

  const response: LoginResponse = { sucesso: true, usuario };
  res.json(response);
});

export default router;
