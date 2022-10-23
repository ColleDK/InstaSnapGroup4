describe('My First Test', () => {
  it('Visits the Kitchen Sink', () => {
    cy.visit('https://instasnap.instasnap.diplomportal.dk')

    cy.contains('button', 'Sign up').click()

    cy.url().should('include', '/signup')

    cy.contains('label', 'Name')
        .parent()
        .type('fake@email.com')
        .get('input')
        .should('have.value', 'fake@email.com')
  })
})
