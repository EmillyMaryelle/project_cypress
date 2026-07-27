class NavigationPage {
  goToCategoryFromMenu(slug) {
    cy.getBySel(`nav-modal-categoria-${slug}`).click();
  }

  goToCartFromMenu() {
    cy.getBySel('nav-modal-cart').click();
  }
}

export const navigationPage = new NavigationPage();
