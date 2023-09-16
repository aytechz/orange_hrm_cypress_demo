import adminPage from "../support/page/admin.page";

xdescribe("Admin Module", () => {
  beforeEach(() => {
    cy.login(Cypress.env("user"), Cypress.env("pass"));
  });

  it("Verify URL contains /admin", () => {
    cy.visit("/web/index.php/admin/viewSystemUsers");
    cy.url().should("contain", "admin");
  });

  it("Verify Table Headers", () => {
    const tableHeadersArray = [
      "",
      "Username",
      "User Role",
      "Employee Name",
      "Status",
      "Actions",
    ];
    cy.visit("/web/index.php/admin/viewSystemUsers");
    adminPage.tableHeaders().should("be.visible");
    adminPage.tableHeaders().each((item, index, list) => {
        cy.wrap(item).should("contain", tableHeadersArray[index]);
        });
    })
    

    it('Verify Count of Table Rows Displayed Correct Amount', () => {
        cy.visit("/web/index.php/admin/viewSystemUsers");

        adminPage.recordsFoundCount().invoke('text').then((text) => {
            const regex = /\((\d+)\)/;
            const match = text.match(regex);
            const extractedNumber = parseInt(match[1]);
            cy.get('.oxd-checkbox-wrapper').its('length').then((count)=>{
                // cy.log(`Number of elements: ${count - 1}`);
                const actualCount = count - 1
                expect(actualCount).to.eq(extractedNumber)

            }) 
        });
        
    });
});

describe('Admin Add User', () => {
    beforeEach(()=>{
      cy.login(Cypress.env('user'), Cypress.env('pass'))
      cy.visit("/web/index.php/admin/viewSystemUsers");
      
    })
    
    it('Verify Add User Button Functions', () => {
        cy.visit("/web/index.php/admin/viewSystemUsers");
        adminPage.addUserButton().parent().should('have.text', ' Add ')
        adminPage.addUserButton().click()
        cy.url().should('contain', "web/index.php/admin/saveSystemUser")
    })

    it('Add user', () => {
        cy.visit("/web/index.php/admin/saveSystemUser");
        adminPage.userRoleDropdownIcon().click()
        adminPage.userRoleAndStatusItems().eq(1).click()

        adminPage.statusDropdownIcon().click()
        adminPage.userRoleAndStatusItems().eq(1).click()
        //Once Employee name entered, it takes time to see it as an option
        // So to be able to wait for that wait till getting 200 status code
        cy.intercept('GET', '/web/index.php/api/v2/pim/employees?nameOrId=Paul+Collings')
        .as('getEmployee');
        adminPage.employeeNameAdd().type('Paul Collings',{delay:10})
        cy.wait('@getEmployee')
        .its('response.statusCode')
        .should('eq', 200);
        adminPage.userRoleAndStatusItems().eq(0).click()
        // Add Username
        adminPage.usernameCreationField().type('fmaytekin');
        adminPage.passwordCreationFields().eq(2).type('test123456')
        adminPage.passwordCreationFields().eq(3).type('test123456')
        cy.wait(1000)

    });
  
    
  })

