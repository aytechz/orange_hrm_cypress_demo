class AdminPage{
    // Locators
    tableHeaders(){ return cy.get('.oxd-table-header-cell.oxd-padding-cell.oxd-table-th')}
    recordsFoundCount() {return cy.get('[class="orangehrm-horizontal-padding orangehrm-vertical-padding"]')}
    
    
}
export default new AdminPage();