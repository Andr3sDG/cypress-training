/// <reference types="cypress" />

describe('Test suite', () => {

    it('First test', () => {

        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        //by Tag name
        cy.get('input')

        //by ID
        cy.get('#inputEmail1')

        //by Class name
        cy.get('.input-full-width')

        //by Attribute name
        cy.get('[placeholder]')

        //by Attribute name and value
        cy.get('[placeholder="Email"]')

        //by Class value
        cy.get('[class="input-full-width size-medium shape-rectangle"]')

        //by Tag name and attribute with value
        cy.get('input[placeholder="Email"]')

        //by two different attributes
        cy.get('[placeholder="Email"][nbinput]')

        //by Tag name, Attribute with value, ID and Class name
        cy.get('input[placeholder="Email"]#inputEmail1.input-full-width')

        //The most recommended way by cypress
        cy.get('[data-cy="imputEmail1"]')

    })

    it('Second test', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()
        cy.get('[cy-data="using-grid-buttonid"]')
        
        cy.get('#inputEmail3')
            .parents('form')
            .find('button')
            .should('contain', 'Sign in')
            .parents('form')
            .find('nb-checkbox')
            .click()

        cy.contains('nb-card', 'Block form').find('[placeholder="First Name"]')
    })

    it('Then and wrap methods', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        //cy.contains('nb-card', 'Using the Grid').find('[for="inputEmail1"]').should('contain', 'Email')
        //cy.contains('nb-card', 'Using the Grid').find('[for="inputPassword2"]').should('contain', 'Password')
        
        cy.contains('ngx-form-elements', 'Using the Grid').then( gridForm => {
            const emailGridlLabel = gridForm.find('[for="inputEmail1"]').text()
            const passGridLabel = gridForm.find('[for="inputPassword2"]').text()
            expect(emailGridlLabel).to.equal('Email')
            expect(passGridLabel).to.equal('Password')

            cy.contains('nb-card', 'Basic form').then( basicForm => {
                const passBasicLabel = basicForm.find('[for="exampleInputPassword1"]').text()
                expect(passBasicLabel).to.equal(passGridLabel)

                cy.wrap(basicForm).find('[for="exampleInputEmail1"]').should('contain', 'Email address')
            })
        })
    })

    it('Inovoke command', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        //1
        cy.get('[for="exampleInputEmail1"]').should('contain', 'Email address')

        //2
        cy.get('[for="exampleInputEmail1"]').then( exampleLabel => {
            expect(exampleLabel.text()).to.equal('Email address')
        })

        //3
        cy.get('[for="exampleInputEmail1"]').invoke('text').then( text => {
            expect(text).to.equal('Email address')
        })

        //Is checked with invoke command
        cy.contains('nb-card', 'Basic form')
          .find('nb-checkbox')
          .click()
          .find('.custom-checkbox')
          .invoke('attr', 'class')
          //.should('contain', 'checked')
          .then(attrValue => {
            expect(attrValue).to.contain('checked')
          })

        //Antoher way to locate element
        /*
        cy.get('[for="exampleInputEmail1"]')
          .parents('form')
          .find('.custom-checkbox')
          .click()
        */
    })

    it('Assert property', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Datepicker').click()

        cy.contains('nb-card', 'Common Datepicker').find('input').then( input => {
            cy.wrap(input).click().get('nb-calendar-day-picker').contains('18').click()
            cy.wrap(input).invoke('prop', 'value').should('contain', 'Jun 18, 2022')
          })
    })

    it('Handle radio button', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        cy.contains('nb-card', 'Using the Grid').find('[type="radio"]').then( radioButtons => {
            cy.wrap(radioButtons)
                .first()
                .check({force: true})
                .should('be.checked')

            cy.wrap(radioButtons)
                .eq(1)
                .check({force: true})
            
            cy.wrap(radioButtons)
                .first()
                .should('not.be.checked')

            cy.wrap(radioButtons)
                .eq(2)
                .should('be.disabled')
        })
    })

    it('Handle check boxes', () => {
        cy.visit('/')
        cy.contains('Modal & Overlays').click()
        cy.contains('Toastr').click()

        cy.get('[type="checkbox"]').check({force: true}).then(checkBoxes => {
            cy.wrap(checkBoxes)
                .first()
                .should('be.checked')

            cy.wrap(checkBoxes)
                .eq(1)
                .should('be.checked')
            
            cy.wrap(checkBoxes)
                .last()
                .should('be.checked')
        })

        /*
        cy.get('[type="checkbox"]').then(checkBoxes => {
            cy.wrap(checkBoxes)
                .first()
                .should('be.checked')

            cy.wrap(checkBoxes)
                .eq(1)
                .check({force: true})
                .should('be.checked')

            cy.wrap(checkBoxes)
                .eq(2)
                .should('be.checked')
        })
        */
    })

    it.only('Handle lists and dropdowns', () => {
        cy.visit('/')

        //1
        /*
        cy.get('nav nb-select').click()
        cy.get('.options-list').contains('Dark').click()
        cy.get('nb-layout-header nav').should('have.css', 'background-color', 'rgb(34, 43, 69)')
        */

        //2
        cy.get('nav nb-select').click()
        cy.get('ul nb-option').then( optionList => {
            cy.wrap(optionList).each((option, index) => {
                const optionText = option.text().trim()
                const colors = {
                    "Light": "rgb(255, 255, 255)",
                    "Dark": "rgb(34, 43, 69)",
                    "Cosmic": "rgb(50, 50, 89)",
                    "Corporate": "rgb(255, 255, 255)"
                }
                cy.wrap(option).click()
                cy.get('nav nb-select').should('contain', optionText)
                cy.get('nb-layout-header nav').should('have.css', 'background-color', colors[optionText])
                if(index < 3) {
                    cy.get('nav nb-select').click()
                }
            })
        })

        /*
        cy.contains('nav', 'ngx-').find('[type="button"]').click()
        cy.get('#cdk-overlay-0').find('nb-option').then(options => {
            cy.wrap(options)
                .eq(1)
                .click()
        })
        */
    })

})