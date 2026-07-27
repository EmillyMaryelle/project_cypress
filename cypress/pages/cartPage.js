class CartPage {
  visit() {
    cy.visit('/carrinho');
  }

  increaseQuantity(productId) {
    cy.getBySel(`cart-page-item-qty-plus-${productId}`).click();
  }

  clearCart() {
    cy.getBySel('cart-page-clear-btn').click();
  }

  checkout() {
    cy.getBySel('cart-page-checkout-btn').click();
  }
}

export const cartPage = new CartPage();
