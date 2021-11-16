describe('Notes App', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
    cy.request('POST', 'http://localhost:3001/api/testing/reset')

    const user = {
      username: 'midudev',
      name: 'Miguel',
      password: 'midupassword'
    }
    cy.request('POST', 'http://localhost:3001/api/users', user)
  })

  it('frontend can be opened', () => {
    cy.contains('Notes')
  })

  it('Login form can opened', () => {
    cy.contains('Show Login').click()
  })

  it('login fails with wrong password', () => {
    cy.contains('Show Login').click()
    cy.get('[name="username"]').type('midudev')
    cy.get('[name="password"]').type('wrongpassword')
    cy.get('[data-test-id="login-form"] button').click()

    cy.get('.error')
      .should('contain', 'Wrong credentials')
      .should('have.css', 'color', 'rgb(255, 0, 0)')
      .should('have.css', 'border-style', 'solid')
  })

  it('User can login', () => {
    cy.contains('Show Login').click()
    cy.get('[name="username"]').type('midudev')
    cy.get('[name="password"]').type('midupassword')
    cy.get('[data-test-id="login-form"] button').click()
    cy.contains('Create a new note')
  })

  describe('when logged in', () => {
    beforeEach(() => {
      cy.login({ username: 'midudev', password: 'midupassword' })
    })

    it('a new note can be created', () => {
      const noteContent = 'a note created by cypress'
      cy.contains('Show create note').click()
      cy.get('input').type(noteContent)
      cy.contains('save').click()
      cy.contains(noteContent)
    })

    describe('and a note exists', () => {
      beforeEach(() => {
        cy.createNote({ content: 'This is the first note', important: false })

        cy.createNote({ content: 'This is the second note', important: false })

        cy.createNote({ content: 'This is the third note', important: false })
      })

      it('it can be made important', () => {
        cy.contains('This is the second note').as('theNote')

        cy.get('@theNote').contains('make important').click()

        // cy.debug()

        cy.get('@theNote').contains('make not important')
      })
    })
  })
})
