import loginPage from '../pages/login.page';
import { productPage } from '../pages/product.page';

describe('Tests de la page produit', { tags: ['@tc-013', '@product', '@smoke', '@regression'] }, () => {

  beforeEach(() => {
    cy.visit("https://saucedemo.com");
    loginPage.doLogin('standard_user', 'secret_sauce');
  });

  it('devrait ouvrir la fiche produit après clic sur un produit', { tags: ['@tc013-01', '@details'] }, () => {
    productPage.clickOnBackpack();
    cy.url().should('include', '/inventory-item.html');
    productPage.getProductTitle().should('contain', 'Sauce Labs Backpack');
    productPage.getAddToCartButton().should('be.visible');
  });

  it('devrait retourner à la liste de produits avec le bouton "Back to products"', { tags: ['@tc013-02', '@navigation'] }, () => {
    productPage.clickOnBackpack();
    productPage.clickBackToProducts();
    cy.url().should('include', '/inventory.html');
  });

});
