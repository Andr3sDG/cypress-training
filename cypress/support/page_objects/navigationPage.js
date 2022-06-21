
export class NavigationPage {

    //Layout secction
    stepperPage() {
        cy.contains('Stepper').click()
    }

    accordionPage() {
        cy.contains('Accordion').click()
    }

    //Forms secction
    formLayoutsPage() {
        cy.contains('Form Layouts').click()
    }

    datepickerPage() {
        cy.contains('Datepicker').click()
    }

    //Modal & Overlays
    dialogPage() {
        cy.contains('Dialog').click()
    }

    windowPage() {
        cy.contains('Window').click()
    }

    popoverPage() {
        cy.contains('Popover').click()
    }

    toastrPage() {
        cy.contains('Toastr').click()
    }

    tooltip() {
        cy.contains('Tooltip').click()
    }

    //Extra components
    calendarPage() {
        cy.contains('Calendar').click()
    }

    //Tables & Data
    smartTablePage() {
        cy.contains('Smart Table').click()
    }

    treeGridPage() {
        cy.contains('Tree Grid').click()
    }

    //Auth
    loginPage() {
        cy.contains('Login').click()
    }

    registerPage() {
        cy.contains('Register').click()
    }

    requestPasswordPage() {
        cy.contains('Request Password').click()
    }

    resetPasswordPage() {
        cy.contains('Reset Password').click()
    }

}

export const navigateTo = new NavigationPage()