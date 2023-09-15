class LoginPage{
    // Locators
    usernameField() {return cy.get('[name="username"]')}
    passwordField() {return cy.get('[name="password"]')}
    loginButton() {return cy.get('.oxd-button')}
    

    //Methods
    /**Login method use 
     * the usernames from cypress.config.js file 
     * 'standard_u'*/
    login(username, password){
        this.usernameField().should('be.visible');
        this.usernameField().clear().type(username)
        this.passwordField().clear().type(password)
        this.loginButton().click();
    }

    


}
export default new LoginPage();