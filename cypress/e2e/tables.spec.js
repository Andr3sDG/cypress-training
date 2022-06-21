/// <reference types="cypress"/> 

describe('Test table', () => {


  it('Tables & Data: Edit user Jimenez data', () => {
    cy.visit('/')
    cy.contains('Tables & Data').click()
    cy.contains('Smart Table').click()
    cy.get('thead tr:eq(1)')
      .find('[placeholder="ID"]')
      .type('18')
      .wait(500)
    cy.get('tbody tr').find('td').then(data => {
      cy.wrap(data).find('[class="nb-edit"]').click()
      cy.wrap(data).get('[placeholder="First Name"]:eq(1)').clear().type('Pedro')
      cy.wrap(data).get('[placeholder="Last Name"]:eq(1)').clear().type('Hernandez')
      cy.wrap(data).get('[placeholder="Username"]:eq(1)').clear().type('GuardianNordico')
      cy.wrap(data).get('[placeholder="E-mail"]:eq(1)').clear().type('guardian@gmail.com')
      cy.wrap(data).get('[placeholder="Age"]:eq(1)').clear().type('25')
      cy.wrap(data).get('[class="nb-checkmark"]').click()
    })
    cy.get('tbody tr').find('td').each( (value, index) => {
      const values = ['Pedro', 'Hernandez', 'GuardianNordico', 'guardian@gmail.com', '25']
      if(index > 1){
        cy.wrap(value.text()).should('contain', values[index-2])
      } else {
        
      }
    })
  })

  it.only('Salud digna', () => {
    cy.visit('https://www.salud-digna.org/')
    cy.on('uncaught:exception', () => false)
    cy.get('#main-nav').contains('Servicios').trigger('mouseover')
    cy.get('#main-nav').contains('Laboratorios').click()

  })

})