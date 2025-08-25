import checkoutStepOnePage from "../pages/checkout.step.one.page";
import checkoutStepTwoPage from "../pages/checkout.step.two.page";
import checkoutCompletePage from "../pages/checkout.complete.page";
import dashboardPage from "../pages/dashboard.page";
import loginPage from "../pages/login.page";
import {panierPage}  from "../pages/panier.page";

describe('Checkout test', { tags: ['@tc-006', '@regression'] },() => {
  beforeEach(() => {
     cy.visit("https://www.saucedemo.com/")
               loginPage.saisirUsername("standard_user")
               loginPage.saisirPassword("secret_sauce")
               loginPage.cliqueButton()
  });

  it('verifier  le checkout step one  ',{tags:'@tc-006-01'}, () => {
    dashboardPage.selectRandomProduct().then((product) => {
      dashboardPage.recupererNomProduit(product).then((nomProduit) => {
        const nomFormate = nomProduit.toLowerCase().replace(/\s+/g, '-');
        dashboardPage.ajouterProduitAuPanier(nomFormate);
        dashboardPage.allerAuPanier();
        panierPage.checkout();
    checkoutStepOnePage.startCheckout('Eya', 'Testeuse', '92230');

    cy.url().should("eq","https://www.saucedemo.com/checkout-step-two.html")
    
   });
    });
  });

  it('verifier  le checkout step two  ',{tags:'@tc-006-02'}, () => {
    dashboardPage.selectRandomProduct().then((product) => {
      dashboardPage.recupererNomProduit(product).then((nomProduit) => {
        const nomFormate = nomProduit.toLowerCase().replace(/\s+/g, '-');
        dashboardPage.ajouterProduitAuPanier(nomFormate);
        dashboardPage.allerAuPanier();
        panierPage.checkout();
        checkoutStepOnePage.startCheckout('Eya', 'Testeuse', '92230');
        checkoutStepTwoPage.clickFinish();

    cy.url().should("eq","https://www.saucedemo.com/checkout-complete.html")
      
    
  });
    });
  });

  it('verifier  toutes les etapes de  checkout  ',{tags:'@e2e'}, () => {
    dashboardPage.selectRandomProduct().then((product) => {
      dashboardPage.recupererNomProduit(product).then((nomProduit) => {
        const nomFormate = nomProduit.toLowerCase().replace(/\s+/g, '-');
        dashboardPage.ajouterProduitAuPanier(nomFormate);
        dashboardPage.allerAuPanier();
        panierPage.checkout();
        checkoutStepOnePage.startCheckout('Eya', 'Testeuse', '92230');
        checkoutStepTwoPage.clickFinish();
        checkoutCompletePage.clickBackHome();
    cy.url().should("eq","https://www.saucedemo.com/inventory.html")
      
    
  });


});
});
});