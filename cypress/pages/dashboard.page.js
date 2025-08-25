class DashboardPage {
  elements = {
    //recupere index d'un element sur le dashboard
    indexProduct: () => cy.get(".inventory_item"),
    //recupère une liste contenant les noms des produits
    productTitle: () => cy.get(".inventory_item_name"),
    //recupère une liste contenant les prix des produits
    productPrice: () => cy.get(".inventory_item_price"),
    cartNumber: () => cy.get(".shopping_cart_badge"),
    cartIcon: () => cy.get(".shopping_cart_link"),
    sortDropdown: () => cy.get(".product_sort_container"),
    //ajouterAuPanierBouton: (nomProduit) => cy.get(`[data-test="add-to-cart-${nomProduit}"]`),//sélecteur dynam pour trouver le bouton d’un produit spécif
    ajouterAuPanierBouton : (index) =>  cy.get('.inventory_item').eq(index).find('button'),
    //retirerDuPanierBouton: (nomProduit) => cy.get(`[data-test="remove-${nomProduit}"]`),
    retirerDuPanierBouton: (index) => cy.get('.inventory_item').eq(index).find('button'),

    productItems: () => cy.get(".inventory_item"),
    menuBouton: () => cy.get("#react-burger-menu-btn"),
  };

  cliquerSurProduit(nomProduit) {
    this.elements.productTitle().contains(nomProduit).click();
  }

  ajouterProduitAuPanier(index) {
    this.elements.ajouterAuPanierBouton(index).click();
  }

  retirerProduitDuPanier(index) {
    this.elements.retirerDuPanierBouton(index).click();
  }

  getCartNumber() {
    return this.elements.cartNumber().should("be.visible");
  }

  allerAuPanier() {
    this.elements.cartIcon().click();
  }

  selectionnerTriPar(valeur) {
    this.elements.sortDropdown().select(valeur);
  }

  clickBoutonMenu() {
    this.elements.menuBouton().click();
  }

  recuperationNombreDeProduitsDansLePanier() {
    return this.elements.cartNumber().invoke("text").then((text) => {
      return parseInt(text, 10);
    });
  }

  recuperationListTitreProduit() {
    return this.elements.productTitle();
  }

  recuperationListPrixProduit() {
    return this.elements.productPrice();
  }

  selectRandomProduct() {
    return this.elements.productItems().then((products) => {
      const randomIndex = Math.floor(Math.random() * products.length);
      return cy.wrap(products[randomIndex]);
    });
  }

  recupererNomProduit(product) {
    return cy.wrap(product).find(".inventory_item_name").invoke('text').then(text => text.trim());
  }

  clickBoutonMenu() {
    this.elements.menuBouton().click();
  }

  verifierTriProduitParNom(ordreTri) {
    return this.elements.productTitle().then(($titres) => {
      const nomsProduits = Array.from($titres).map(el => el.textContent.trim());
      const nomsTries = [...nomsProduits].sort();
      
      if (ordreTri === 'az') {
        expect(nomsProduits).to.deep.equal(nomsTries);
      } else if (ordreTri === 'za') {
        expect(nomsProduits).to.deep.equal(nomsTries.reverse());
      }
    });
  }

  verifierTriProduitParPrix(ordreTri) {
    return this.elements.productPrice().then(($prix) => {
      const prixProduits = Array.from($prix).map(el => 
        parseFloat(el.textContent.replace('$', ''))
      );
      const prixTries = [...prixProduits].sort((a, b) => a - b);
      
      if (ordreTri === 'lohi') {
        expect(prixProduits).to.deep.equal(prixTries);
      } else if (ordreTri === 'hilo') {
        expect(prixProduits).to.deep.equal(prixTries.reverse());
      }
    });
  }

  obtenirOptionTriSelectionnee() {
    return this.elements.sortDropdown().find('option:selected').invoke('text');
  }

  obtenirValeursTriDisponibles() {
    return this.elements.sortDropdown().find('option').then(($options) => {
      return Array.from($options).map(option => ({
        value: option.value,
        text: option.textContent
      }));
    });
  }
}

export default new DashboardPage();
