/// <reference types="cypress" />

class CheckoutStepOnePage {

    elements = {
        firstname: () => cy.get('[data-test="firstName"]'),
        lastName: () => cy.get('[data-test="lastName"]'),
        postalCode: () => cy.get('[data-test="postalCode"]'),
        continueButton: () => cy.get('[data-test="continue"]'),
        cancelButton: () => cy.get('[data-test="cancel"]')

    }

    startCheckout(firstName, lastName, postalCode) {
        this.elements.firstname().type(firstName);
        this.elements.lastName().type(lastName);
        this.elements.postalCode().type(postalCode);
        this.elements.continueButton().click();
    }

    CliquersurCancelButton() {

        this.elements.cancelButton().click;

    }



}
export default new CheckoutStepOnePage();
