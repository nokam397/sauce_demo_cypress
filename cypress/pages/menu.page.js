class MenuPage {

    elements = {
        allItemsMenuButton: () => cy.get("#inventory_sidebar_link"),
        aboutButton: () => cy.get("#about_sidebar_link"),
        logoutButton: () => cy.get("#logout_sidebar_link"),
        resetAppStateButton: () => cy.get("#reset_sidebar_link"),
        menuCloseButton: () => cy.get("#react-burger-cross-btn"),
    }

    clickallItemsMenuButton() {
        this.elements.allItemsMenuButton().click();
    }
    clickaboutButton() {
        this.elements.aboutButton().click();
    }
    clicklogoutButton() {
        this.elements.logoutButton().click();
    }
    clickresetAppStateButton() {
        this.elements.resetAppStateButton().click();
    }

    clickmenuCloseButton() {
        this.elements.menuCloseButton().click();
    }


}

export default new MenuPage;