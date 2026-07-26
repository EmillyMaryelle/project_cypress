import { useEffect, useState } from 'react';
import {
  UserPlus,
  Mail,
  Lock,
  Unlock,
  Phone,
  MapPin,
  Store,
  User,
  ArrowRight,
  LogIn,
  Sparkles,
} from 'lucide-react';
import ModalPanel from './ModalPanel';
import { useUiStore } from '@/stores/uiStore';
import { useAuthStore } from '@/stores/authStore';
import { useNavigate } from 'react-router-dom';
import type {
  CadastroClientePayload,
  CadastroFornecedorPayload,
  TipoUsuario,
} from '@shared/types';

export default function CadastroModal() {
  const aberto = useUiStore((s) => s.modalAberto) === 'cadastro';
  const fechar = useUiStore((s) => s.fecharModal);
  const abrir = useUiStore((s) => s.abrirModal);
  const { cadastrar, loading, erro, limparErro, usuario, sucessoCadastro, limparSucessoCadastro } =
    useAuthStore();
  const navigate = useNavigate();

  const [tipo, setTipo] = useState<TipoUsuario>('cliente');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmacaoSenha, setConfirmacaoSenha] = useState('');
  const [nome, setNome] = useState('');
  const [nomeLoja, setNomeLoja] = useState('');
  const [telefone, setTelefone] = useState('');
  const [endereco, setEndereco] = useState('');
  const [erroLocal, setErroLocal] = useState<string | null>(null);
  const [mostrarSenha, setMostrarSenha] = useState(false);

  useEffect(() => {
    if (aberto) {
      setTipo('cliente');
      setEmail('');
      setSenha('');
      setConfirmacaoSenha('');
      setNome('');
      setNomeLoja('');
      setTelefone('');
      setEndereco('');
      setErroLocal(null);
      limparErro();
      limparSucessoCadastro();
    }
  }, [aberto, limparErro, limparSucessoCadastro]);

  if (!aberto) return null;

  if (usuario) {
    return (
      <ModalPanel
        aoFechar={fechar}
        posicao="center"
        title="Conta criada"
        largura="w-[94%] sm:max-w-md"
        dataCy="cadastro-modal"
      >
        <div className="px-6 py-8 space-y-5 text-center">
          <div
            data-cy="cadastro-modal-user-avatar"
            className="mx-auto w-20 h-20 rounded-full bg-detail/80 flex items-center justify-center text-white shadow-soft"
          >
            <span className="font-display text-3xl font-bold">
              {usuario.nome.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <h4
              data-cy="cadastro-modal-user-name"
              className="font-display text-2xl font-bold text-dark"
            >
              Ola, {usuario.nome.split(' ')[0]}
            </h4>
            <p data-cy="cadastro-modal-user-email" className="text-muted/80 mt-1 text-sm">{usuario.email}</p>
            <p className="mt-2 inline-block text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-secondary/60 text-dark">
              {usuario.tipo === 'cliente' ? 'Cliente' : 'Fornecedor'}
            </p>
          </div>
          <div className="rounded-2xl bg-secondary/40 border border-dark/5 p-4 text-sm text-muted">
            <p className="flex items-center justify-center gap-1.5 mb-1">
              <Sparkles className="w-4 h-4 text-detail" strokeWidth={2} />
              <span className="font-semibold text-dark">
                {sucessoCadastro ?? 'Conta simulada'}
              </span>
            </p>
            <p>
              Dados sao mantidos no cache do navegador para demonstracao.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-3 pt-2">
            <button
              type="button"
              data-cy="cadastro-modal-go-home"
              onClick={() => {
                fechar();
                navigate('/');
              }}
              className="btn-primary"
            >
              Ir para Home
              <ArrowRight className="w-4 h-4" strokeWidth={2} />
            </button>
          </div>
        </div>
      </ModalPanel>
    );
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErroLocal(null);

    if (!email.trim()) {
      setErroLocal('Informe seu e-mail.');
      return;
    }
    if (senha.length < 4) {
      setErroLocal('A senha deve ter pelo menos 4 caracteres.');
      return;
    }
    if (senha !== confirmacaoSenha) {
      setErroLocal('A confirmacao de senha nao coincide com a senha.');
      return;
    }

    let payload: CadastroClientePayload | CadastroFornecedorPayload;

    if (tipo === 'cliente') {
      if (!nome.trim() || !telefone.trim() || !endereco.trim()) {
        setErroLocal('Preencha nome, telefone e endereco.');
        return;
      }
      payload = {
        tipo: 'cliente',
        email: email.trim(),
        senha,
        confirmacaoSenha,
        nome: nome.trim(),
        telefone: telefone.trim(),
        endereco: endereco.trim(),
      };
    } else {
      if (!nomeLoja.trim() || !telefone.trim() || !endereco.trim()) {
        setErroLocal('Preencha nome da loja, telefone e endereco.');
        return;
      }
      payload = {
        tipo: 'fornecedor',
        email: email.trim(),
        senha,
        confirmacaoSenha,
        telefone: telefone.trim(),
        nomeLoja: nomeLoja.trim(),
        endereco: endereco.trim(),
      };
    }

    await cadastrar(payload);
  };

  return (
    <ModalPanel
      aoFechar={fechar}
      posicao="center"
      title="Criar minha conta"
      largura="w-[96%] sm:max-w-xl"
      dataCy="cadastro-modal"
    >
      <form onSubmit={onSubmit} className="px-5 sm:px-6 py-6 space-y-5">
        <div className="grid grid-cols-2 gap-3 p-1 bg-secondary/30 rounded-2xl">
          <button
            type="button"
            data-cy="cadastro-toggle-cliente"
            onClick={() => setTipo('cliente')}
            className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              tipo === 'cliente'
                ? 'bg-white text-dark shadow-card border border-dark/5'
                : 'text-muted hover:text-dark'
            }`}
          >
            <User className="w-4 h-4" strokeWidth={2} />
            Sou Cliente
          </button>
          <button
            type="button"
            data-cy="cadastro-toggle-fornecedor"
            onClick={() => setTipo('fornecedor')}
            className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              tipo === 'fornecedor'
                ? 'bg-white text-dark shadow-card border border-dark/5'
                : 'text-muted hover:text-dark'
            }`}
          >
            <Store className="w-4 h-4" strokeWidth={2} />
            Sou Fornecedor
          </button>
        </div>

        <div
          data-cy="cadastro-tipo-info"
          className="rounded-2xl bg-detail/10 border border-detail/30 p-3.5 text-sm text-dark flex items-start gap-3"
        >
          {tipo === 'cliente' ? (
            <>
              <User className="w-5 h-5 text-detail shrink-0 mt-0.5" strokeWidth={2} />
              <p>
                Criando sua conta de <strong>cliente</strong>, voce precisara
                informar <strong>nome completo</strong>, telefone e endereco.
              </p>
            </>
          ) : (
            <>
              <Store className="w-5 h-5 text-detail shrink-0 mt-0.5" strokeWidth={2} />
              <p>
                Criando sua conta de <strong>fornecedor</strong>, informe o{' '}
                <strong>nome da sua loja</strong>, telefone e endereco.
              </p>
            </>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <label className="block sm:col-span-2">
            <span className="block text-sm font-medium text-dark mb-1.5">
              E-mail
            </span>
            <span className="relative block">
              <Mail
                className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted/60"
                strokeWidth={2}
              />
              <input
                type="email"
                required
                data-cy="cadastro-input-email"
                placeholder="voce@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-base pl-11"
                autoComplete="email"
              />
            </span>
          </label>

          <label className="block">
            <span className="block text-sm font-medium text-dark mb-1.5">
              Senha
            </span>
            <span className="relative block">
              <Lock
                className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted/60"
                strokeWidth={2}
              />
              <button
                type="button"
                tabIndex={-1}
                data-cy="cadastro-toggle-senha-visibility"
                onClick={() => setMostrarSenha((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted/60 hover:text-dark"
                aria-label="Mostrar senha"
              >
                <Unlock className="w-4 h-4" strokeWidth={2} />
              </button>
              <input
                type={mostrarSenha ? 'text' : 'password'}
                required
                minLength={4}
                data-cy="cadastro-input-senha"
                placeholder="Minimo 4 caracteres"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="input-base pl-11 pr-10"
                autoComplete="new-password"
              />
            </span>
          </label>

          <label className="block">
            <span className="block text-sm font-medium text-dark mb-1.5">
              Confirmar senha
            </span>
            <span className="relative block">
              <Lock
                className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted/60"
                strokeWidth={2}
              />
              <input
                type={mostrarSenha ? 'text' : 'password'}
                required
                minLength={4}
                data-cy="cadastro-input-confirmacao-senha"
                placeholder="Repita a senha"
                value={confirmacaoSenha}
                onChange={(e) => setConfirmacaoSenha(e.target.value)}
                className="input-base pl-11"
                autoComplete="new-password"
              />
            </span>
          </label>

          {tipo === 'cliente' ? (
            <label className="block sm:col-span-2">
              <span className="block text-sm font-medium text-dark mb-1.5">
                Nome completo
              </span>
              <span className="relative block">
                <User
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted/60"
                  strokeWidth={2}
                />
                <input
                  type="text"
                  required
                  data-cy="cadastro-input-nome"
                  placeholder="Seu nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className="input-base pl-11"
                  autoComplete="name"
                />
              </span>
            </label>
          ) : (
            <label className="block sm:col-span-2">
              <span className="block text-sm font-medium text-dark mb-1.5">
                Nome da loja
              </span>
              <span className="relative block">
                <Store
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted/60"
                  strokeWidth={2}
                />
                <input
                  type="text"
                  required
                  data-cy="cadastro-input-nome-loja"
                  placeholder="Nome da sua loja"
                  value={nomeLoja}
                  onChange={(e) => setNomeLoja(e.target.value)}
                  className="input-base pl-11"
                />
              </span>
            </label>
          )}

          <label className="block sm:col-span-2">
            <span className="block text-sm font-medium text-dark mb-1.5">
              Telefone
            </span>
            <span className="relative block">
              <Phone
                className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted/60"
                strokeWidth={2}
              />
              <input
                type="tel"
                required
                data-cy="cadastro-input-telefone"
                placeholder="(00) 00000-0000"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                className="input-base pl-11"
                autoComplete="tel"
              />
            </span>
          </label>

          <label className="block sm:col-span-2">
            <span className="block text-sm font-medium text-dark mb-1.5">
              Endereco completo
            </span>
            <span className="relative block">
              <MapPin
                className="absolute left-3.5 top-3 w-5 h-5 text-muted/60"
                strokeWidth={2}
              />
              <textarea
                required
                rows={2}
                data-cy="cadastro-input-endereco"
                placeholder="Rua, numero, bairro, cidade/UF"
                value={endereco}
                onChange={(e) => setEndereco(e.target.value)}
                className="input-base pl-11 py-3 resize-none"
              />
            </span>
          </label>
        </div>

        {(erro || erroLocal) && (
          <div
            data-cy="cadastro-alert-error"
            className="rounded-xl px-4 py-3 text-sm bg-[#fde6dd] text-dark border border-detail/40"
          >
            {erroLocal ?? erro}
          </div>
        )}

        <button
          type="submit"
          data-cy="cadastro-submit-btn"
          disabled={loading}
          className="btn-primary w-full !py-3.5 gap-2"
        >
          {loading ? (
            <span className="inline-flex items-center gap-2">
              <span className="w-4 h-4 rounded-full border-2 border-dark/40 border-t-dark animate-spin" />
              Criando conta
            </span>
          ) : (
            <>
              <UserPlus className="w-4 h-4" strokeWidth={2} />
              Criar conta de {tipo === 'cliente' ? 'cliente' : 'fornecedor'}
            </>
          )}
        </button>

        <div className="text-center text-sm text-muted/80 space-y-1">
          <p data-cy="cadastro-go-login-btn">
            Ja tem conta?{' '}
            <button
              type="button"
              onClick={() => {
                fechar();
                abrir('login');
                navigate('/login');
              }}
              className="font-semibold text-dark hover:text-detail underline-offset-2 hover:underline"
            >
              Entrar agora
              <LogIn className="w-3.5 h-3.5 inline ml-1" strokeWidth={2} />
            </button>
          </p>
          <p className="text-xs text-muted/60">
            Ao criar a conta, voce concorda com os termos simulados da loja.
          </p>
        </div>
      </form>
    </ModalPanel>
  );
}
