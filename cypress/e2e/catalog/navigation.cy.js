import { homePage } from '../../pages/homePage';
import { navigationPage } from '../../pages/navigationPage';

describe('Catalogo - navegacao e categorias', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/categorias').as('getCategorias');
    cy.intercept('GET', '/api/produtos*').as('getProdutos');
  });

  it('carrega a home com os produtos em destaque e filtra por categoria', () => {
    homePage.visit();

    cy.wait('@getCategorias');
    cy.wait('@getProdutos');

    cy.getBySel('home-page').should('be.visible');
    cy.getBySel('product-grid')
      .should('have.attr', 'data-state', 'ready')
      .find('[data-cy^="product-card-"]')
      .should('have.length', 12);
    cy.captureTestStep('Flux');

    homePage.selectCategoryChip('acessorios');

    cy.wait('@getProdutos');
    cy.location('pathname').should('eq', '/categoria/acessorios');
    cy.getBySel('category-page')
      .should('have.attr', 'data-category-slug', 'acessorios');
    cy.getBySel('category-product-list')
      .find('[data-cy^="product-card-"]')
      .should('have.length', 3);
  });

  it('navega pelas categorias pelo menu lateral', () => {
    homePage.visit();

    cy.wait('@getCategorias');
    homePage.openNavMenu();
    cy.captureTestStep('Flux');
    navigationPage.goToCategoryFromMenu('eletronicos');

    cy.wait('@getProdutos');
    cy.location('pathname').should('eq', '/categoria/eletronicos');
    cy.getBySel('category-page')
      .should('have.attr', 'data-category-slug', 'eletronicos');
    cy.getBySel('product-card-8').should('be.visible');
    cy.getBySel('product-card-9').should('be.visible');
  });

  it('retorna para a home a partir da pagina de categoria', () => {
    cy.visit('/categoria/casa');

    cy.wait('@getCategorias');
    cy.wait('@getProdutos');
    cy.captureTestStep('Flux');

    cy.getBySel('category-back-home').click();
    cy.location('pathname').should('eq', '/');
    cy.getBySel('home-page').should('be.visible');
  });
});
