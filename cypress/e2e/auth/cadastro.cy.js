import { authPage } from '../../pages/authPage';

const STORAGE_USUARIO = 'loja-simples:usuario';
const STORAGE_USUARIOS = 'loja-simples:usuarios-cadastrados';

describe('Autenticacao - cadastro', () => {
  let users;

  beforeEach(() => {
    cy.fixture('users').then((data) => {
      users = data;
    });
  });

  it('troca os campos dinamicos entre cliente e fornecedor', () => {
    authPage.openSignupFromMenu();

    cy.getBySel('cadastro-modal-panel').should('be.visible');
    cy.getBySel('cadastro-input-nome').should('exist');
    cy.getBySel('cadastro-input-nome-loja').should('not.exist');

    authPage.switchToFornecedor();
    cy.getBySel('cadastro-input-nome-loja').should('exist');
    cy.getBySel('cadastro-input-nome').should('not.exist');
    cy.captureTestStep('Flux');

    authPage.switchToCliente();
    cy.getBySel('cadastro-input-nome').should('exist');
  });

  it('cadastra um cliente e salva no localStorage', () => {
    const email = `cliente.${Date.now()}@teste.com`;

    authPage.openSignupFromMenu();
    authPage.fillClienteForm({
      email,
      senha: users.cliente.senha,
      nome: users.cliente.nome,
      telefone: users.cliente.telefone,
      endereco: users.cliente.endereco,
    });
    cy.captureTestStep('Flux');
    authPage.submitSignup();

    cy.getBySel('cadastro-modal-user-email').should('contain', email);
    cy.getBySel('cadastro-modal-user-name').should('contain', 'Cliente');

    cy.window().then((win) => {
      const usuarios = JSON.parse(win.localStorage.getItem(STORAGE_USUARIOS) ?? '[]');
      const usuarioAtual = JSON.parse(win.localStorage.getItem(STORAGE_USUARIO) ?? 'null');

      expect(usuarios.some((item) => item.email === email)).to.eq(true);
      expect(usuarioAtual?.email).to.eq(email);
      expect(usuarioAtual?.tipo).to.eq('cliente');
    });
  });

  it('cadastra um fornecedor com sucesso', () => {
    const email = `fornecedor.${Date.now()}@teste.com`;

    authPage.openSignupFromMenu();
    authPage.switchToFornecedor();
    authPage.fillFornecedorForm({
      email,
      senha: users.fornecedor.senha,
      nomeLoja: users.fornecedor.nomeLoja,
      telefone: users.fornecedor.telefone,
      endereco: users.fornecedor.endereco,
    });
    cy.captureTestStep('Flux');
    authPage.submitSignup();

    cy.getBySel('cadastro-modal-user-name').should('contain', 'Loja');
    cy.window().then((win) => {
      const usuarioAtual = JSON.parse(win.localStorage.getItem(STORAGE_USUARIO) ?? 'null');

      expect(usuarioAtual?.email).to.eq(email);
      expect(usuarioAtual?.tipo).to.eq('fornecedor');
      expect(usuarioAtual?.nomeLoja).to.eq(users.fornecedor.nomeLoja);
    });
  });
});
