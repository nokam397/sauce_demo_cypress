/// <reference types="cypress" />

class PanierPage{
    //locators
    constructor (){
    this.elements = {
        removeBackpackElement: ()=>  cy.get("#remove-sauce-labs-backpack"),
        removeBikeLightElement: ()=>  cy.get("#remove-sauce-labs-bike-light"),
        removeBoltTshirtElement: ()=>  cy.get("#remove-sauce-labs-bolt-t-shirt"),
        removeFleeceJacketElement: ()=>  cy.get("#remove-sauce-labs-fleece-jacket"),
        removeOnsieElement: ()=>  cy.get("#remove-sauce-labs-onesie"),
        removeTestAllTheThingsElement: ()=>  cy.get("#remove-test.allthethings()-t-shirt-(red)"),

        checkoutElement: ()=> cy.get("#checkout"),
        continueShoppingElement: ()=>  cy.get("#continue-shopping"),

    }
    }
    //actions 

    removeBackpack(){
        this.elements.removeBackpackElement().click();
    }

    removeBikeLight(){
        this.elements.removeBikeLightElement().click();
    }

    removeBoltTshirt(){
        this.elements.removeBoltTshirtElement().click();
    }

    removeFleeceJacket(){
        this.elements.removeFleeceJacketElement().click();
    }

    removeOnsie(){
        this.elements.removeOnsieElement().click();
    }

    removeTestAllTheThings(){
        this.elements.removeTestAllTheThingsElement().click();
    }

    continueShopping(){
        this.elements.continueShoppingElement().click();
    }

    checkout(){
        this.elements.checkoutElement().click();
    }

}

export const panierPage = new PanierPage();