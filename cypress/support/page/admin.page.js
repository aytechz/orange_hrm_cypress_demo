class AdminPage{
    // Locators
    addUserButton(){return cy.get('.oxd-icon.bi-plus.oxd-button-icon')}
    tableHeaders(){ return cy.get('.oxd-table-header-cell.oxd-padding-cell.oxd-table-th')}
    recordsFoundCount() {return cy.get('[class="orangehrm-horizontal-padding orangehrm-vertical-padding"]')}

    //Add User Locators
    userRoleDropdownIcon(){return cy.get('.oxd-select-text--after').eq(0)}
    statusDropdownIcon() {return cy.get('.oxd-select-text--after').eq(1)}
    /** index 1 Admin and Enabled
     * Index 2 ESS and Disabled
     * This locator will be visible after userRole or Status 
     * Dropdown activated
     */
    userRoleAndStatusItems() {return  cy.get('[role="listbox"] div')}
    employeeNameAdd() {return cy.get('.oxd-autocomplete-text-input > input')}
    usernameCreationField() { return cy.get('.oxd-input').eq(1)}
    passwordCreationFields() {return cy.get('.oxd-input')}

    
}
export default new AdminPage();