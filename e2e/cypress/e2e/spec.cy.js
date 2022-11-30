describe('Sign up test', () => {
  it('Checks the signup flow', () => {
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

describe('Not authenticated test', () => {
  it('Checks that the user cannot access homepage without token', () => {
    cy.visit('https://instasnap.instasnap.diplomportal.dk/#/start')

    cy.url().should('include', '/login')
  })
})
