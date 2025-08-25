/// <reference types="cypress" />
import dashboardPage from '../pages/dashboard.page';
import loginPage from '../pages/login.page';
import { panierPage } from '../pages/panier.page';

describe ('Verifier l ajout ou la suppression d un produit dans le panier',{tags:['@TC-005','@Panier','@Regression']}, ()=> {
    beforeEach (()=>{
        cy.visit('https://www.saucedemo.com/');
        loginPage.doLogin('standard_user','secret_sauce');

        

    });
    it('Ajout du produit et verifie qu il est bien ajoutee ', {tags : ['@Ajout','@TC-005']}, () =>{
        dashboardPage.ajouterProduitAuPanier('sauce-labs-backpack');
        dashboardPage.elements.cartNumber().should('have.text','1');

        dashboardPage.allerAuPanier();
        panierPage.elements.removeBackpackElement().should('be.visible');

    })
    it('Supprime le produit du panier et verifie qu il est retiree', {tags : ['@Supression','@TC-005'] },() => {
        dashboardPage.ajouterProduitAuPanier('sauce-labs-backpack')
        dashboardPage.allerAuPanier();
        panierPage.elements.removeBackpackElement().should('be.visible');

        panierPage.removeBackpack();

        panierPage.elements.removeBackpackElement().should('not.exist');

        dashboardPage.elements.cartNumber().should('not.exist')
    })


    
})