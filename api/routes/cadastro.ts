import express from 'express';
import type {
  CadastroPayload,
  CadastroResponse,
  Usuario,
} from '@shared/types';
import { usuariosCadastrados } from '../data/mockData';

const router = express.Router();

function usuarioSemSenha(u: (typeof usuariosCadastrados)[number]): Usuario {
  const { senha: _s, ...resto } = u;
  return resto;
}

router.post('/', (req, res) => {
  const body = req.body as CadastroPayload | undefined;

  if (!body || !body.tipo || !body.email || !body.senha || !body.confirmacaoSenha) {
    return res.status(400).json({
      sucesso: false,
      erro: 'Preencha os campos obrigatórios.',
    } satisfies CadastroResponse);
  }

  if (body.senha !== body.confirmacaoSenha) {
    return res.status(400).json({
      sucesso: false,
      erro: 'A confirmação de senha não coincide com a senha.',
    } satisfies CadastroResponse);
  }

  if (body.senha.length < 4) {
    return res.status(400).json({
      sucesso: false,
      erro: 'A senha deve ter pelo menos 4 caracteres.',
    } satisfies CadastroResponse);
  }

  const email = body.email.trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({
      sucesso: false,
      erro: 'Informe um e-mail válido.',
    } satisfies CadastroResponse);
  }

  if (usuariosCadastrados.some((u) => u.email.toLowerCase() === email)) {
    return res.status(400).json({
      sucesso: false,
      erro: 'Já existe uma conta com esse e-mail.',
    } satisfies CadastroResponse);
  }

  if (body.tipo === 'cliente') {
    if (!body.nome || !body.telefone || !body.endereco) {
      return res.status(400).json({
        sucesso: false,
        erro: 'Preencha nome, telefone e endereço.',
      } satisfies CadastroResponse);
    }
    const novo = {
      email,
      senha: body.senha,
      nome: body.nome.trim(),
      tipo: 'cliente' as const,
      telefone: body.telefone.trim(),
      endereco: body.endereco.trim(),
    };
    usuariosCadastrados.push(novo);
    return res.status(201).json({
      sucesso: true,
      usuario: usuarioSemSenha(novo),
    } satisfies CadastroResponse);
  }

  if (body.tipo === 'fornecedor') {
    if (!body.nomeLoja || !body.telefone || !body.endereco) {
      return res.status(400).json({
        sucesso: false,
        erro: 'Preencha nome da loja, telefone e endereço.',
      } satisfies CadastroResponse);
    }
    const novo = {
      email,
      senha: body.senha,
      nome: body.nomeLoja.trim(),
      tipo: 'fornecedor' as const,
      telefone: body.telefone.trim(),
      endereco: body.endereco.trim(),
      nomeLoja: body.nomeLoja.trim(),
    };
    usuariosCadastrados.push(novo);
    return res.status(201).json({
      sucesso: true,
      usuario: usuarioSemSenha(novo),
    } satisfies CadastroResponse);
  }

  return res.status(400).json({
    sucesso: false,
    erro: 'Tipo de usuário inválido.',
  } satisfies CadastroResponse);
});

export default router;
