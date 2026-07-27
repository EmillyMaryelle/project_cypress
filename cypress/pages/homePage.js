class HomePage {
  visit() {
    cy.visit('/');
  }

  openNavMenu() {
    cy.getBySel('header-nav-toggle').click();
    cy.getBySel('nav-modal-panel').should('be.visible');
  }

  addProductToCart(productId) {
    cy.getBySel(`product-add-btn-${productId}`).scrollIntoView().click();
  }

  selectCategoryChip(slug) {
    cy.getBySel(`chip-${slug}`).click();
  }
}

export const homePage = new HomePage();
