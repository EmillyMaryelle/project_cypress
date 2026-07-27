class AuthPage {
  visitLogin() {
    cy.visit('/login');
  }

  openSignupFromMenu() {
    cy.visit('/');
    cy.getBySel('header-nav-toggle').click();
    cy.getBySel('nav-modal-cadastro').click();
  }

  openSignupFromLoginModal() {
    cy.visit('/');
    cy.getBySel('header-login-btn').click();
    cy.getBySel('login-modal-panel').should('be.visible');
    cy.getBySel('login-go-create-account').click();
  }

  fillLogin(email, senha) {
    cy.getBySel('login-page-input-email').clear().type(email);
    cy.getBySel('login-page-input-senha').clear().type(senha);
  }

  submitLogin() {
    cy.getBySel('login-page-submit-btn').click();
  }

  switchToFornecedor() {
    cy.getBySel('cadastro-toggle-fornecedor').click();
  }

  switchToCliente() {
    cy.getBySel('cadastro-toggle-cliente').click();
  }

  fillClienteForm({ email, senha, nome, telefone, endereco }) {
    cy.getBySel('cadastro-input-email').type(email);
    cy.getBySel('cadastro-input-senha').type(senha);
    cy.getBySel('cadastro-input-confirmacao-senha').type(senha);
    cy.getBySel('cadastro-input-nome').type(nome);
    cy.getBySel('cadastro-input-telefone').type(telefone);
    cy.getBySel('cadastro-input-endereco').type(endereco);
  }

  fillFornecedorForm({ email, senha, nomeLoja, telefone, endereco }) {
    cy.getBySel('cadastro-input-email').type(email);
    cy.getBySel('cadastro-input-senha').type(senha);
    cy.getBySel('cadastro-input-confirmacao-senha').type(senha);
    cy.getBySel('cadastro-input-nome-loja').type(nomeLoja);
    cy.getBySel('cadastro-input-telefone').type(telefone);
    cy.getBySel('cadastro-input-endereco').type(endereco);
  }

  submitSignup() {
    cy.getBySel('cadastro-submit-btn').click();
  }
}

export const authPage = new AuthPage();
