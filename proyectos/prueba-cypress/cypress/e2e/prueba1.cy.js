describe('Mi pantalla de login', () => {
  it('Debo poder hacer login con datos guays', () => {
    cy.visit('https://katalon-demo-cura.herokuapp.com/')
    cy.get('#btn-make-appointment').click()
    cy.get('#txt-username').type('John Doe')
    cy.get('#txt-password').type('ThisIsNotAPassword')
    cy.get('#btn-login').click()
    cy.get('h2').should('contain', 'Make Appointment')
    cy.get('h2').should((cabecera)=>{
      expect(cabecera).to.contain('Make Appointment')
    })
    cy.screenshot("login_ok")
  })
})