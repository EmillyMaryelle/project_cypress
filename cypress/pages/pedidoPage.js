function formatCurrency(value) {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}

class PedidoPage {
  visitCart() {
    cy.visit('/carrinho');
  }

  validateResumoPedido(totalEsperado) {
    const totalFormatado = formatCurrency(totalEsperado);

    cy.getBySel('cart-page-summary').should('be.visible');
    cy.getBySel('cart-page-subtotal').should('contain', totalFormatado);
    cy.getBySel('cart-page-total').should('contain', totalFormatado);
  }

  finalizarPedidoComSucesso() {
    cy.on('window:alert', (texto) => {
      expect(texto).to.eq('Compra simulada com sucesso.');
    });

    cy.getBySel('cart-page-checkout-btn').click();
  }
}

export const pedidoPage = new PedidoPage();
