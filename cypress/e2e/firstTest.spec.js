/// <reference types="cypress" />

const { verify } = require("crypto")

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

    it('Handle lists and dropdowns', () => {
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

    it('Handle tables', () => {
        cy.visit('/')
        cy.contains('Tables & Data').click()
        cy.contains('Smart Table').click()

        //1
        /*
        cy.get('tbody').contains('tr', 'Larry').then( tableRow => {
            cy.wrap(tableRow).find('.nb-edit').click()
            cy.wrap(tableRow).find('[placeholder="Age"]').clear().type('25')
            cy.wrap(tableRow).find('.ng2-smart-action-edit-save').click()
            cy.wrap(tableRow).find('td').eq(6).should('contain', '25')
        })
        */

        //2
        /*
        cy.get('thead').find('.nb-plus').click()
        cy.get('thead tr:eq(2)').then( tableRow => {
            cy.wrap(tableRow).find('[placeholder="ID"]').type('0')
            cy.wrap(tableRow).find('[placeholder="First Name"]').type('Andres')
            cy.wrap(tableRow).find('[placeholder="Last Name"]').type('Daniel')
            cy.wrap(tableRow).find('[placeholder="Username"]').type('anon123')
            cy.wrap(tableRow).find('[placeholder="E-mail"]').type('anon@gmail.com')
            cy.wrap(tableRow).find('[placeholder="Age"]').type('26')
            cy.wrap(tableRow).find('.nb-checkmark').click()
        })
        cy.get('tbody').find('tr').first().then( rowAdded => {
            cy.wrap(rowAdded).find('td').each( (item, index) => {
                const data = ["0", "Andres", "Daniel", "anon123", "anon@gmail.com", "26"]
                if(index != 0){
                    cy.wrap(item.text()).should('contain', data[index-1])
                } else {

                }
            })
        })
        */

        //3
        const ages = [20, 30, 40, 200]
        cy.wrap(ages).each( age => {
            cy.get('thead tr:eq(1)').find('[placeholder="Age"]').clear().type(age)
            cy.wait(500)
            cy.get('tbody tr').each( dataFound => {
                if(age != 200) {
                    cy.wrap(dataFound).should('contain', age)
                } else {
                    cy.wrap(dataFound).should('contain', 'No data found')
                }
            })
        })

    })
    
    it('Handle web datepickers', () => {
        function selectFutureDate(day) {
            let date = new Date()
            date.setDate(date.getDate() + day)
            let futureDay = date.getDate()
            let futureMonth = date.toLocaleString('default', {month: 'short'})
            let futureYear = date.getFullYear()
            let assertDate = futureMonth+' '+futureDay+', '+futureYear
            cy.get('nb-calendar-navigation').invoke('attr', 'ng-reflect-date').then( monthAttribute => {
                if(!monthAttribute.includes(futureMonth) || !monthAttribute.includes(futureYear)) {
                    //click until reach expected month
                    cy.get('nb-calendar-pageable-navigation').find('[data-name="chevron-right"]').click()
                    selectFutureDate(day)
                } else {
                    //select day
                    cy.get('nb-calendar-picker [class="day-cell ng-star-inserted"]').contains(futureDay).click()
                }
            })
            return assertDate
        }

        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Datepicker').click()
        cy.contains('nb-card', 'Common Datepicker').find('input').click()
        let expectedDate = selectFutureDate(500)
        cy.contains('nb-card', 'Common Datepicker').find('input').invoke('prop', 'value').should('contain', expectedDate)



        
    })

    it('Handle tooltips', () => {
        cy.visit('/')
        cy.contains('Modal & Overlays').click()
        cy.contains('Tooltip').click()

        cy.contains('nb-card', 'Colored Tooltips').contains('Default').click()
        cy.get('nb-tooltip').should('contain', 'This is a tooltip')
    })

    it.only('Handle Alerts', () => {
        
        cy.visit('/')
        cy.contains('Tables & Data').click()
        cy.contains('Smart Table').click()

        //1 This will work even if there is not a message
        // cy.get('tbody tr:eq(0)').find('[class="nb-trash"]').click()
        // cy.on('window:confirm', alert => {
        //     expect(alert).to.equal('Are you sure you want to delete?')
        // })

        //2
        // const stub = cy.stub()
        // cy.on('window:confirm', stub)
        // cy.get('tbody tr:eq(0)').find('[class="nb-trash"]').click().then( () => {
        //     expect(stub.getCall(1)).to.be.calledWith('Are you sure you want to delete?')
        // })

        //3
        cy.get('tbody tr:eq(0)').find('[class="nb-trash"]').click()
        cy.on('window:confirm', () => false)

    })

})