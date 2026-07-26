import type { Produto, Categoria, UsuarioComSenha } from '@shared/types';

export const categorias: Categoria[] = [
  { slug: 'roupas', nome: 'Roupas', icone: 'Shirt' },
  { slug: 'acessorios', nome: 'Acessórios', icone: 'Watch' },
  { slug: 'eletronicos', nome: 'Eletrônicos', icone: 'Smartphone' },
  { slug: 'casa', nome: 'Casa', icone: 'Sofa' },
];

export const usuariosCadastrados: UsuarioComSenha[] = [
  {
    email: 'usuario@exemplo.com',
    senha: '123456',
    nome: 'Maria Silva',
    tipo: 'cliente',
    telefone: '(11) 98765-4321',
    endereco: 'Rua das Flores, 123 - São Paulo/SP',
  },
  {
    email: 'admin@exemplo.com',
    senha: 'admin',
    nome: 'João Administrador',
    tipo: 'fornecedor',
    telefone: '(11) 91234-5678',
    endereco: 'Av. Paulista, 1000 - São Paulo/SP',
    nomeLoja: 'Bella Store Fornecedores',
  },
];

export const produtos: Produto[] = [
  {
    id: 1,
    nome: 'Blusa Linho Bege',
    preco: 149.9,
    categoria: 'Roupas',
    categoriaSlug: 'roupas',
    imagem:
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=700&q=80',
    descricao: 'Blusa confeccionada em linho, leve e elegante.',
  },
  {
    id: 2,
    nome: 'Calça Alfaiataria Neutra',
    preco: 259.0,
    categoria: 'Roupas',
    categoriaSlug: 'roupas',
    imagem:
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=700&q=80',
    descricao: 'Calça de alfaiataria com corte moderno.',
  },
  {
    id: 3,
    nome: 'Vestido Midi Floral',
    preco: 289.9,
    categoria: 'Roupas',
    categoriaSlug: 'roupas',
    imagem:
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=700&q=80',
    descricao: 'Vestido midi com estampa floral delicada.',
  },
  {
    id: 4,
    nome: 'Jaqueta Jeans Clara',
    preco: 199.9,
    categoria: 'Roupas',
    categoriaSlug: 'roupas',
    imagem:
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=700&q=80',
    descricao: 'Jaqueta jeans clássica lavagem clara.',
  },
  {
    id: 5,
    nome: 'Relógio Minimalista',
    preco: 389.0,
    categoria: 'Acessórios',
    categoriaSlug: 'acessorios',
    imagem:
      'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=700&q=80',
    descricao: 'Relógio de pulso com design atemporal.',
  },
  {
    id: 6,
    nome: 'Óculos de Sol Tartaruga',
    preco: 179.9,
    categoria: 'Acessórios',
    categoriaSlug: 'acessorios',
    imagem:
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=700&q=80',
    descricao: 'Óculos de sol armação tartaruga clássica.',
  },
  {
    id: 7,
    nome: 'Bolsa Transversal Couro',
    preco: 429.9,
    categoria: 'Acessórios',
    categoriaSlug: 'acessorios',
    imagem:
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=700&q=80',
    descricao: 'Bolsa transversal em couro legítimo.',
  },
  {
    id: 8,
    nome: 'Fone Bluetooth Premium',
    preco: 549.0,
    categoria: 'Eletrônicos',
    categoriaSlug: 'eletronicos',
    imagem:
      'https://images.unsplash.com/photo-1518444065439-e933c06ce9cd?auto=format&fit=crop&w=700&q=80',
    descricao: 'Fone over-ear com cancelamento ativo de ruído.',
  },
  {
    id: 9,
    nome: 'Smartwatch Esportivo',
    preco: 899.9,
    categoria: 'Eletrônicos',
    categoriaSlug: 'eletronicos',
    imagem:
      'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=700&q=80',
    descricao: 'Monitoramento de atividades, GPS e resistente à água.',
  },
  {
    id: 10,
    nome: 'Vaso Cerâmico Orgânico',
    preco: 89.9,
    categoria: 'Casa',
    categoriaSlug: 'casa',
    imagem:
      'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?auto=format&fit=crop&w=700&q=80',
    descricao: 'Vaso em cerâmica formato orgânico, tons neutros.',
  },
  {
    id: 11,
    nome: 'Kit Algodão Puro (Toalhas)',
    preco: 139.9,
    categoria: 'Casa',
    categoriaSlug: 'casa',
    imagem:
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=700&q=80',
    descricao: 'Kit com 2 toalhas banho em algodão egípcio.',
  },
  {
    id: 12,
    nome: 'Luminária de Mesa Arco',
    preco: 329.0,
    categoria: 'Casa',
    categoriaSlug: 'casa',
    imagem:
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=700&q=80',
    descricao: 'Luminária minimalista design de arco articulado.',
  },
];
