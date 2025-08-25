/// <reference types="cypress" />
export class AboutPage {
    isPageReachableAndVisible = (aboutPageURL) => {
        cy.origin(aboutPageURL, () => {
            cy.visit('/', { failOnStatusCode: false });
            cy.get('body').should('be.visible');
        })
    }
}

export default new AboutPage();