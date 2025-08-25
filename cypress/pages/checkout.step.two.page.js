class CheckoutStepTwo {
  elements = {
    finishButton: () => cy.get('[data-test="finish"]'),
    cancelButton: () => cy.get('[data-test="cancel"]'),
  };

  clickFinish() {
    this.elements.finishButton().click();
  }

  clickCancel() {
    this.elements.cancelButton().click();
  }

  verifyButtonsVisible() {
    this.elements.finishButton().should('be.visible');
    this.elements.cancelButton().should('be.visible');
  }
}

export default new CheckoutStepTwo();
