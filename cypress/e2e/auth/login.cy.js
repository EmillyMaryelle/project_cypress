import { authPage } from '../../pages/authPage';

describe('Autenticacao - login', () => {
  let users;

  beforeEach(() => {
    cy.fixture('users').then((data) => {
      users = data;
    });
    cy.intercept('POST', '/api/login').as('postLogin');
  });

  it('realiza login com a conta demo pela pagina de login', () => {
    authPage.visitLogin();

    cy.getBySel('login-page-input-email').should('have.value', users.demo.email);
    cy.getBySel('login-page-input-senha').should('have.value', users.demo.senha);
    cy.captureTestStep('Flux');
    authPage.submitLogin();

    cy.wait('@postLogin').its('response.statusCode').should('eq', 200);
    cy.location('pathname', { timeout: 4000 }).should('eq', '/');
    cy.getBySel('header-user-btn').should('contain', 'Maria');
  });

  it('exibe erro para credenciais invalidas', () => {
    authPage.visitLogin();
    authPage.fillLogin(users.invalid.email, users.invalid.senha);
    cy.captureTestStep('Flux');
    authPage.submitLogin();

    cy.wait('@postLogin');
    cy.getBySel('login-page-alert')
      .should('be.visible')
      .and('contain', 'Credenciais inválidas.');
    cy.location('pathname').should('eq', '/login');
  });

  it('abre o login pelo header e navega para criar conta pelo modal', () => {
    authPage.openSignupFromLoginModal();
    cy.captureTestStep('Flux');

    cy.location('pathname').should('eq', '/login');
    cy.getBySel('cadastro-modal-panel').should('be.visible');
    cy.getBySel('cadastro-modal-title').should('contain', 'Criar minha conta');
  });
});
