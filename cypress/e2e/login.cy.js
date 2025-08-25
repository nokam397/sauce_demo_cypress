/// <reference types="cypress" />
import Login from '../pages/login.page.js'

describe('Login avec identifiants valides et invalides', { tags: ['@tc-001', '@login','@smoke','@regression'] }, function () {

  before(function () {
    cy.fixture('cridential.json').as('loginData');
  });

  it('Login avec identifiants valides', { tags: ['@tc001-01'] }, function () {
    cy.get('@loginData').then((data) => {
      const user = data.valid[0];
      cy.visit('https://www.saucedemo.com/');
      Login.saisirUsername(user.username);
      Login.saisirPassword(user.password);
      Login.cliqueButton();
      cy.url().should('eq', 'https://www.saucedemo.com/inventory.html');
    });
  });

  it('Affichage d’erreur pour identifiants invalides', { tags: ['@tc001-02'] }, function () {
    cy.fixture('cridential.json').then((data) => {
      expect(data.invalid).to.exist;
      data.invalid.forEach((user) => {
        cy.visit('https://www.saucedemo.com/');
        Login.saisirUsername(user.username);
        Login.saisirPassword(user.password);
        Login.cliqueButton();
        Login.isDisplayedError();
        
      });
    });
  });

});
