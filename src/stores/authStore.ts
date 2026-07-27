import { create } from 'zustand';
import type {
  Usuario,
  LoginPayload,
  LoginResponse,
  CadastroPayload,
  UsuarioComSenha,
} from '@shared/types';

interface AuthState {
  usuario: Usuario | null;
  loading: boolean;
  erro: string | null;
  sucessoCadastro: string | null;
  login: (payload: LoginPayload) => Promise<boolean>;
  cadastrar: (payload: CadastroPayload) => Promise<boolean>;
  logout: () => void;
  limparErro: () => void;
  limparSucessoCadastro: () => void;
}

const STORAGE_KEY_USUARIO_ATUAL = 'loja-simples:usuario';
const STORAGE_KEY_USUARIOS_CADASTRADOS = 'loja-simples:usuarios-cadastrados';

function usuarioFromStorage(): Usuario | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_USUARIO_ATUAL);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed.tipo) {
      parsed.tipo = 'cliente';
    }
    return parsed as Usuario;
  } catch {
    return null;
  }
}

function lerUsuariosCadastrados(): UsuarioComSenha[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_USUARIOS_CADASTRADOS);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as UsuarioComSenha[]) : [];
  } catch {
    return [];
  }
}

function salvarUsuariosCadastrados(lista: UsuarioComSenha[]): void {
  try {
    localStorage.setItem(STORAGE_KEY_USUARIOS_CADASTRADOS, JSON.stringify(lista));
  } catch {
    }
}

function usuarioSemSenha(u: UsuarioComSenha): Usuario {
  const { senha: _s, ...resto } = u;
  return resto;
}

function validarEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function montarUsuarioDoCadastro(payload: CadastroPayload): { ok: boolean; usuario?: UsuarioComSenha; erro?: string } {
  const email = payload.email.trim();
  if (!validarEmail(email)) {
    return { ok: false, erro: 'Informe um e-mail válido.' };
  }
  if (payload.senha.length < 4) {
    return { ok: false, erro: 'A senha deve ter pelo menos 4 caracteres.' };
  }
  if (payload.senha !== payload.confirmacaoSenha) {
    return { ok: false, erro: 'A confirmação de senha não coincide com a senha.' };
  }
  const existentes = lerUsuariosCadastrados();
  if (existentes.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
    return { ok: false, erro: 'Já existe uma conta com esse e-mail (cache do navegador).' };
  }
  if (payload.tipo === 'cliente') {
    if (!payload.nome.trim() || !payload.telefone.trim() || !payload.endereco.trim()) {
      return { ok: false, erro: 'Preencha nome, telefone e endereço.' };
    }
    return {
      ok: true,
      usuario: {
        email,
        senha: payload.senha,
        nome: payload.nome.trim(),
        tipo: 'cliente',
        telefone: payload.telefone.trim(),
        endereco: payload.endereco.trim(),
      },
    };
  }
  if (payload.tipo === 'fornecedor') {
    if (!payload.nomeLoja.trim() || !payload.telefone.trim() || !payload.endereco.trim()) {
      return { ok: false, erro: 'Preencha nome da loja, telefone e endereço.' };
    }
    const nomeLoja = payload.nomeLoja.trim();
    return {
      ok: true,
      usuario: {
        email,
        senha: payload.senha,
        nome: nomeLoja,
        tipo: 'fornecedor',
        telefone: payload.telefone.trim(),
        endereco: payload.endereco.trim(),
        nomeLoja,
      },
    };
  }
  return { ok: false, erro: 'Tipo de conta inválido.' };
}

export const useAuthStore = create<AuthState>((set) => ({
  usuario: typeof window !== 'undefined' ? usuarioFromStorage() : null,
  loading: false,
  erro: null,
  sucessoCadastro: null,
  login: async (payload) => {
    set({ loading: true, erro: null, sucessoCadastro: null });
    try {
      let usuarioEncontrado: Usuario | null = null;
      try {
        const resp = await fetch('/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (resp.ok) {
          const data = (await resp.json()) as LoginResponse;
          if (data.sucesso && data.usuario) {
            usuarioEncontrado = data.usuario;
          }
        }
      } catch {
      }

      if (!usuarioEncontrado) {
        const email = payload.email.trim().toLowerCase();
        const cadastrados = lerUsuariosCadastrados();
        const local = cadastrados.find(
          (u) => u.email.toLowerCase() === email && u.senha === payload.senha,
        );
        if (local) {
          usuarioEncontrado = usuarioSemSenha(local);
        }
      }

      if (!usuarioEncontrado) {
        set({ loading: false, erro: 'Credenciais inválidas.' });
        return false;
      }

      localStorage.setItem(STORAGE_KEY_USUARIO_ATUAL, JSON.stringify(usuarioEncontrado));
      set({ usuario: usuarioEncontrado, loading: false, erro: null });
      return true;
    } catch {
        set({ loading: false, erro: 'Falha ao realizar login.' });
        return false;
      }
    },
  cadastrar: async (payload) => {
    // --- Se o cache/locale for limpo, os cadastros somem.
    set({ loading: true, erro: null, sucessoCadastro: null });
    try {
      const montagem = montarUsuarioDoCadastro(payload);
      if (!montagem.ok || !montagem.usuario) {
        set({ loading: false, erro: montagem.erro ?? 'Erro ao criar conta.' });
        return false;
      }
      const lista = lerUsuariosCadastrados();
      lista.push(montagem.usuario);
      salvarUsuariosCadastrados(lista);
      const u = usuarioSemSenha(montagem.usuario);
      localStorage.setItem(STORAGE_KEY_USUARIO_ATUAL, JSON.stringify(u));
      set({
        usuario: u,
        loading: false,
        erro: null,
        sucessoCadastro:
          payload.tipo === 'cliente'
            ? 'Conta criada! Seja bem-vindo(a)!'
            : 'Conta de fornecedor criada! Seja bem-vindo(a)!',
      });
      return true;
    } catch {
      set({ loading: false, erro: 'Falha ao criar conta.' });
      return false;
    }
  },
  logout: () => {
    localStorage.removeItem(STORAGE_KEY_USUARIO_ATUAL);
    set({ usuario: null });
  },
  limparErro: () => set({ erro: null }),
  limparSucessoCadastro: () => set({ sucessoCadastro: null }),
}));
