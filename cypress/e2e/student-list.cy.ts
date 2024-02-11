describe('student-list app', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/student-list')
  });

  /* it('finds the content "list"', () => {
    cy.contains('list')
  })
 */
  /* it('clicking "cypress e2e" navigates cypress docs', () => {
    cy.contains('cypress e2e').click()

    // Should be on a new URL which
    // includes '/end-to-end-testing/'
    /// It does work for urls with a domain different from the visited url
    // cy.url().should('include', '/end-to-end-testing/')

  }) */
  
  it('trying another commands"', () => {
    // Get an input, type into it
    cy.get('.filter-name-input').type('mureil', { delay: 100 })
    // Verify that the value has been updated
    cy.get('.filter-name-input').should('include', 'mureil')

  })
})
