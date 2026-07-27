import { homePage } from '../../pages/homePage';
import { cartPage } from '../../pages/cartPage';

const STORAGE_CARRINHO = 'loja-simples:carrinho';

describe('Carrinho - fluxo de compra', () => {
  let products;

  beforeEach(() => {
    cy.fixture('products').then((data) => {
      products = data;
    });
    cy.intercept('GET', '/api/produtos*').as('getProdutos');
    cy.intercept('POST', '/api/login').as('postLogin');
  });

  it('adiciona produto, ajusta quantidade e limpa o carrinho', () => {
    homePage.visit();
    cy.wait('@getProdutos');

    homePage.addProductToCart(products.blusaLinho.id);
    cy.getBySel('cart-modal-panel').should('be.visible');
    cy.getBySel(`cart-item-${products.blusaLinho.id}`).should('be.visible');
    cy.getBySel('cart-modal-close').click();
    cy.captureTestStep('Flux');

    cartPage.visit();
    cy.getBySel('cart-page').should('have.attr', 'data-state', 'ready');
    cy.getBySel(`cart-page-item-qty-${products.blusaLinho.id}`).should('contain', '1');
    cartPage.increaseQuantity(products.blusaLinho.id);
    cy.getBySel(`cart-page-item-qty-${products.blusaLinho.id}`).should('contain', '2');
    cy.getBySel('header-cart-badge').should('contain', '2');

    cartPage.clearCart();
    cy.getBySel('cart-page').should('have.attr', 'data-state', 'empty');
    cy.getBySel('cart-empty-title').should('contain', 'Seu carrinho esta vazio');
  });

  it('exige login para finalizar a compra', () => {
    homePage.visit();
    cy.wait('@getProdutos');

    homePage.addProductToCart(products.relogio.id);
    cartPage.visit();
    cy.captureTestStep('Flux');
    cartPage.checkout();

    cy.location('pathname').should('eq', '/login');
    cy.getBySel('login-page').should('be.visible');
    cy.getBySel('login-modal-panel').should('be.visible');
  });

  it('finaliza a compra com usuario logado e esvazia o carrinho', () => {
    homePage.visit();
    cy.wait('@getProdutos');

    homePage.addProductToCart(products.foneBluetooth.id);
    cy.loginAsDemo();
    cartPage.visit();
    cy.captureTestStep('Flux');

    cy.on('window:alert', (texto) => {
      expect(texto).to.eq('Compra simulada com sucesso.');
    });

    cartPage.checkout();
    cy.location('pathname').should('eq', '/');
    cy.getBySel('home-page').should('be.visible');

    cy.window().then((win) => {
      const carrinho = JSON.parse(win.localStorage.getItem(STORAGE_CARRINHO) ?? '[]');
      expect(carrinho).to.have.length(0);
    });

    cy.getBySel('header-cart-badge').should('not.exist');
  });
});
