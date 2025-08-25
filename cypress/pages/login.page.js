/// <reference types="cypress" />

class Login {
    elements = {
        userName: ()=>  cy.get("#user-name"),
        password: ()=> cy.get("#password"),
        loginButton: ()=> cy.get("#login-button"),
        erreurMessage: ()=> cy.get('[data-test="error"]')
    }

    //actions
saisirUsername(username){
   this.elements.userName().clear().type(username);
}

saisirPassword(password){
    this.elements.password().clear().type(password);
}

cliqueButton(){
    this.elements.loginButton().click();
}


isDisplayedError(){
    this.elements.erreurMessage().should(
            'have.text',
            'Epic sadface: Username and password do not match any user in this service'
        );
}

doLogin(username,password){
    this.saisirUsername(username);
    this.saisirPassword(password);
    this.cliqueButton();
}

}

export default new Login();