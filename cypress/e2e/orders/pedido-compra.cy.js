import { homePage } from '../../pages/homePage';
import { cartPage } from '../../pages/cartPage';
import { pedidoPage } from '../../pages/pedidoPage';

const STORAGE_CARRINHO = 'loja-simples:carrinho';

describe('Pedidos - efetuar pedido de compra', () => {
  let products;

  beforeEach(() => {
    cy.fixture('products').then((data) => {
      products = data;
    });
    cy.intercept('GET', '/api/produtos*').as('getProdutos');
    cy.intercept('POST', '/api/login').as('postLogin');
  });

  it('efetua um pedido de compra completo com dois produtos', () => {
    const quantidadeBlusa = 2;
    const quantidadeRelogio = 1;

    const totalEsperado =
      products.blusaLinho.preco * quantidadeBlusa +
      products.relogio.preco * quantidadeRelogio;

    homePage.visit();
    cy.wait('@getProdutos');

    homePage.addProductToCart(products.blusaLinho.id);
    cy.getBySel('cart-modal-close').click();

    homePage.addProductToCart(products.relogio.id);
    cy.getBySel('cart-item-1').should('be.visible');
    cy.getBySel('cart-item-5').should('be.visible');
    cy.getBySel('header-cart-badge').should('contain', '2');
    cy.getBySel('cart-modal-close').click();
    cy.captureTestStep('Flux');

    cy.loginAsDemo();
    pedidoPage.visitCart();

    cy.getBySel(`cart-page-item-name-${products.blusaLinho.id}`).should(
      'contain',
      products.blusaLinho.nome,
    );
    cy.getBySel(`cart-page-item-name-${products.relogio.id}`).should(
      'contain',
      products.relogio.nome,
    );

    cartPage.increaseQuantity(products.blusaLinho.id);
    cy.getBySel(`cart-page-item-qty-${products.blusaLinho.id}`).should('contain', quantidadeBlusa);
    cy.getBySel(`cart-page-item-qty-${products.relogio.id}`).should('contain', quantidadeRelogio);

    pedidoPage.validateResumoPedido(totalEsperado);
    pedidoPage.finalizarPedidoComSucesso();

    cy.location('pathname').should('eq', '/');
    cy.getBySel('home-page').should('be.visible');
    cy.getBySel('header-user-btn').should('contain', 'Maria');
    cy.getBySel('header-cart-badge').should('not.exist');

    cy.window().then((win) => {
      const carrinho = JSON.parse(win.localStorage.getItem(STORAGE_CARRINHO) ?? '[]');
      expect(carrinho).to.have.length(0);
    });
  });
});
