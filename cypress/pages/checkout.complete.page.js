class CheckoutComplet {
    elements = {
    title: () => cy.get('.title'),
    headerMessage: () => cy.get('.complete-header'),
    completeText: () => cy.get('.complete-text'),
    backHomeButton: () => cy.get('[data-test="back-to-products"]'),
    image: () => cy.get('.pony_express'),
    }
    verifyPageContent() {
    this.elements.title().should('have.text', 'Checkout: Complete!');
    this.elements.headerMessage().should('have.text', 'Thank you for your order!');
    this.elements.completeText().should('contain', 'Your order has been dispatched');
    this.elements.image().should('be.visible');
    this.elements.backHomeButton().should('be.visible');
  }
  clickBackHome() {
    this.elements.backHomeButton().click();
  }
}
export default new CheckoutComplet();