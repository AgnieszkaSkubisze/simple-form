const ticketApi = 'https://api.livechatinc.com/v2/tickets/new'

function mockResponse(statusCode: number, body: object = {}) {
    cy.intercept('POST', ticketApi, {
        statusCode,
        body,
    })
}

describe('Creating a ticket', () => {
    beforeEach(() => {
        cy.visit('/')
        cy.get('#name').type('John')
        cy.get('#email').type('john@doe.com')
        cy.get('#subject').type('Test ticket')
        cy.get('#message').type('Test message')
    })
    it('Successful submission scenario', () => {
        mockResponse(200, { id: 'ABCD' })
        cy.get('button').click()
        cy.get('.success')
            .should('be.visible')
            .contains('Thank you!')
            .should('not.contain', 'Error')
    })
    it('Fail submission scenario', () => {
        mockResponse(500, { error: 'Internal server error' })
        cy.get('button').click()
        cy.get('.fail')
            .should('be.visible')
            .contains('Error!')
            .should('not.contain', 'Thank you!')
    })
})
