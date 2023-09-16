import adminPage from "../support/page/admin.page";

describe("template spec", () => {
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

