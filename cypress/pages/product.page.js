


class ProductPage {
  
  backpackTitle = '.inventory_item_name';
  productName = '.inventory_details_name';
  addToCartButton = '[data-test="add-to-cart"]';
  backToProductsButton = '[data-test="back-to-products"]';



  clickOnBackpack() {
    cy.contains(this.backpackTitle, 'Sauce Labs Backpack').click();
  }

  getProductTitle() {
    return cy.get(this.productName);
  }

  getAddToCartButton() {
    return cy.get(this.addToCartButton);
  }

  clickBackToProducts() {
    cy.get(this.backToProductsButton).click();
  }
}

export const productPage = new ProductPage();



