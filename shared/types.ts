export interface Produto {
  id: number;
  nome: string;
  preco: number;
  categoria: string;
  categoriaSlug: string;
  imagem: string;
  descricao?: string;
}

export interface Categoria {
  slug: string;
  nome: string;
  icone: string;
}

export type TipoUsuario = 'cliente' | 'fornecedor';

export interface Usuario {
  email: string;
  nome: string;
  tipo: TipoUsuario;
  telefone?: string;
  endereco?: string;
  nomeLoja?: string;
}

export interface UsuarioComSenha {
  email: string;
  senha: string;
  nome: string;
  tipo: TipoUsuario;
  telefone?: string;
  endereco?: string;
  nomeLoja?: string;
}

export interface LoginPayload {
  email: string;
  senha: string;
}

export interface CadastroClientePayload {
  tipo: 'cliente';
  email: string;
  senha: string;
  confirmacaoSenha: string;
  nome: string;
  telefone: string;
  endereco: string;
}

export interface CadastroFornecedorPayload {
  tipo: 'fornecedor';
  email: string;
  senha: string;
  confirmacaoSenha: string;
  telefone: string;
  nomeLoja: string;
  endereco: string;
}

export type CadastroPayload = CadastroClientePayload | CadastroFornecedorPayload;

export interface LoginResponse {
  sucesso: boolean;
  usuario?: Usuario;
  erro?: string;
}

export interface CadastroResponse {
  sucesso: boolean;
  usuario?: Usuario;
  erro?: string;
}

export interface CartItem {
  produto: Produto;
  quantidade: number;
}

export type ModalAberto = null | 'navegacao' | 'carrinho' | 'login' | 'cadastro';
