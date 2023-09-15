describe('template spec', () => {
  beforeEach(()=>{
    cy.login(Cypress.env('user'), Cypress.env('pass'))
  })
  
  it('Verify URL contains /dashboard', () => {
    cy.visit('/')
    cy.url().should('contain', '/dashboard')
  })

  it('Verify Dashboard Side Bar Active After Login', () => {
    cy.visit('/')
    cy.get('.oxd-main-menu-item.active').should('have.text', 'Dashboard')
  });
})