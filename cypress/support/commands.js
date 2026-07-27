Cypress.Commands.add('captureTestStep', (step) => {
  const runnable = cy.state('runnable');
  const titlePath =
    runnable && typeof runnable.titlePath === 'function'
      ? runnable.titlePath()
      : ['teste'];

  const normalize = (value) =>
    String(value)
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^\w\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .toLowerCase();

  const fileName = ['fluxos', ...titlePath.map(normalize), normalize(step)].join('/');
  cy.screenshot(fileName, { capture: 'viewport' });
});

Cypress.Commands.add('getBySel', (selector) => {
  return cy.get(`[data-cy="${selector}"]`);
});

Cypress.Commands.add('clearAppState', () => {
  cy.clearCookies();
  cy.clearLocalStorage();
});

Cypress.Commands.add('loginAsDemo', () => {
  cy.visit('/login');
  cy.getBySel('login-page-input-email').clear().type('usuario@exemplo.com');
  cy.getBySel('login-page-input-senha').clear().type('123456');
  cy.getBySel('login-page-submit-btn').click();
  cy.location('pathname', { timeout: 4000 }).should('eq', '/');
  cy.getBySel('header-user-btn').should('contain', 'Maria');
});

Cypress.Commands.add('addProductToCart', (productId) => {
  cy.visit('/');
  cy.getBySel(`product-add-btn-${productId}`).scrollIntoView().click();
  cy.getBySel('cart-modal-panel').should('be.visible');
});
