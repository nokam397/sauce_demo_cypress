/// <reference types="cypress" />

import DashboardPage from "../pages/dashboard.page"
import loginPage from "../pages/login.page"

describe('Ajouter et supprimer un produit depuis le Dashboard', {tags: ['@tc-003', '@smoke', '@regression']}, () => {
    //const nomProduit = 'sauce-labs-backpack';
    beforeEach(() => {
    cy.visit("https://saucedemo.com");
    loginPage.doLogin('standard_user', 'secret_sauce');
    });

    it('ajouter un produit au panier', {tags:['@tc-003-01', '@ajoutpanier']}, () => {
        //Ajouter le produit qui a l'index 1
        DashboardPage.ajouterProduitAuPanier(1);
        DashboardPage.elements.cartNumber().should('contain', '1');
    })

     it('devrait supprimer un produit du panier', {tags:['@tc-003-02', '@suppressionpanier']} , () => {
      // on va prépéarer l'état avec le produit déjà ajouté 
      DashboardPage.ajouterProduitAuPanier(1);
      //On a ajouté le produit qui a pour index 1
      DashboardPage.elements.cartNumber().should('contain', '1');
      // le supprimer
      DashboardPage.retirerProduitDuPanier(1);
      
     });

     it('devrait verifier le nombre darticles ajoutés', {tags:['@tc-003-03', '@iconnumber']} , () => {
      const productsToAdd = [1,2,3]; // produits d'exemple
      //Ajouter chaque produit au panier 
      productsToAdd.forEach((productIndex) => {
        cy.get('.inventory_item').eq(productIndex).find('button').click();
        });

      //Vérifier que l'icone du panier affiche le bon nombre
      cy.get(DashboardPage.elements.cartNumber).should('contain', productsToAdd.length);
    
     });

})