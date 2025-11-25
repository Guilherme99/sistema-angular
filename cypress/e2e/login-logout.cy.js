describe('Fluxo de Login e Logout', () => {
  const username = 'admin'
  const password = 'admin123'

  beforeEach(() => {
    cy.visit('/')
  })

  it('deve logar com sucesso e ir para a tela de welcome', () => {

    // Intercepta requisição ao backend (opcional, mas recomendado)
    cy.intercept('POST', '**/login').as('loginRequest')

    cy.get('[data-cy=input-username]').type(username)
    cy.get('[data-cy=input-password]').type(password)
    cy.get('[data-cy=btn-login]').click()

    // // Aguarda resposta do backend
    // cy.wait('@loginRequest')
    //   .its('response.statusCode')
    //   .should('eq', 200)

    // Verifica se navegou para a rota correta
    cy.url().should('not.include', '/login')

    // Verifica mensagem de bem-vindo (caso seu toast apareça)
    // cy.contains('Bem-vindo').should('exist')

    // Verifica se o username aparece (caso exista)
    cy.contains(username).should('exist')
  })

  it('deve fazer logout e voltar para a tela de login', () => {
    // Primeiro: faz login
    cy.get('[data-cy=input-username]').type(username)
    cy.get('[data-cy=input-password]').type(password)
    cy.get('[data-cy=btn-login]').click()

    cy.contains('Logout').click()

    // Verifica se voltou ao login
    cy.url().should('include', '/login')
    cy.get('[data-cy=btn-login]').should('exist')

    // Opcional: garantir que campos estão limpos
    cy.get('[data-cy=input-username]').should('have.value', '')
    cy.get('[data-cy=input-password]').should('have.value', '')
  })
})
