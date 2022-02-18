const b     = Math.floor(Math.random() * 1000);
const x     = Math.floor(Math.random() * 3500);
const xle   = Math.floor(Math.random() * 5500);
const addValue = 'resBearbeitDmy'

export class responses_bearbeiten {

    responseBearbeiten() {
        
        /* Response Anlegen Testing */
        cy.Trainingsdaten('[data-cy="navDrawerResponses"]')

        // Assert URL after clicking Rules
        cy.url().should("eq", "http://localhost/trainingsdaten/response/");

        // 1. Edit Name should not be empty, error message should contain "Name"
        // 1.1 Response Name
        //     1.1.1 Warning message below input field
        //     1.1.2 Error message after unsuccessful saving
        
        // Entering to first of
        cy.log('Line 312')
        cy.wait(500)
        cy.get('tbody')
            .find('tr')
            .first()
            .click()

        // clear response name
        cy.get('[data-cy="response-name"]').clear()

        //Assert warning notification
        cy.warningNotification('[role="alert"]')

        // add a space or '/' to input field
        const space   = [' ', '/']
        cy.wrap(space).each((index) => {

            cy.get('[data-cy="response-name"]')
                .type(index)

            //Assert warning notification
            cy.spaceWarningNotification('[role="alert"]')

            // Remove space or '/'
            cy.get('[data-cy="response-name"]')
                .clear()
        })

        // Click speichen
        cy.get('[data-cy="save-button"]').click()
        
        // assert unsuccessful saved notification
        cy.errorMessageTitle('[data-cy="errorMessageTitle"]', 'Die', 'Response')

        // Close Error Notification
        cy.errorRemove()
        
        // 3. Check for successfully saved values
        // 3.1 Assert Notification
        // Add a response name with valid name and assert notification & Assert in Response table
        cy.get('[data-cy="response-name"]')
            .type(addValue+String(b))

        // Click Speichern
        cy.get('[data-cy="save-button"]').click()
        
        // Assert Successful Notification
        cy.successMessageTitle('[data-cy="successMessageTitle"]', 'Die', 'Response', addValue+String(b))
                
        // Closing Successfully Saved Notification
        cy.successRemove()
        cy.log('Line 73')

        // return to Response
        cy.get('[data-cy="navDrawerResponses"]').click()

        // 3. Check for successfully saved values
        // 3.2 Assert in table

        // Assert saved data in response table
        cy.get('[data-cy="response-table-search"]')
            .type(addValue+String(b))

        // Selecting Entire Table
        cy.selectEntireTbl()
            
        // Assert Value in Response Table
        cy.log('Line 398')
        cy.get('tbody')
            .find('tr')
            .find('td:nth-child(1)')
            .contains(addValue+String(b))
            .then(function($synName1) {
                cy.wrap($synName1).should('have.text', addValue+String(b))
            })

        // clear search field
        cy.get('[data-cy="response-table-search"]')
            .clear()

        // 2. Check for duplicate name
        // 2.1 Response Name
        // 2.1.1 Error message after unsuccessful saving
        // 2.1.2 Valaue should be double in the Response table, assert response Table

        // At first add a New value to Response Name
        cy.log('Line 108')
        cy.get('[data-cy="response-create"]').click()

        cy.get('[data-cy="response-name"]')
            .type(addValue+String(x))

        cy.get('[data-cy="create-button"]').click()

        // return to Response
        cy.get('[data-cy="navDrawerResponses"]').click()

        // Remove success notification
        cy.get('[data-cy="success-remove"]').click()

        // 2. Check for duplicate name
        // 2.1 Response Name
        // 2.1.1 Error message after unsuccessful saving
        
        cy.get('[data-cy="response-table-search"]')
            .type(addValue+String(b))
        
        cy.get('tbody')
            .find('tr')
            .contains(addValue+String(b))
            .click()

        cy.get('[data-cy="response-name"]')
            .clear()
            .type(addValue+String(x))

        cy.get('[data-cy="save-button"]').click()
        
        // assert unsuccessful saved notification
        cy.errorMessageTitle('[data-cy="errorMessageTitle"]', 'Die', 'Response')

        // Close Error Notification
        cy.get('[data-cy="error-remove"]').click()

        // 2. Check for duplicate name
        // 2.1 Response
        //     2.1.2 Valaue should be in the Response table, assert response Table

        // return to Response
        cy.get('[data-cy="abort-button"]').click()

        // response-table-search
        cy.get('[data-cy="response-table-search"]')
            .type(addValue+String(x))

        // Selecting Entire Table
        cy.selectEntireTbl()

        // Assert table length in Response Table
        cy.log('Line 161')
        cy.get('tbody')
            .find('tr')
            .contains(addValue+String(x))
            .then(function($synName3) {
                const resTbLen3 = $synName3.length
                cy.wrap($synName3).should('have.length', resTbLen3)
            })
        
        // Clear response-table-search
        cy.get('[data-cy="response-table-search"]').clear()

        // 4. Leave site via menu or breadcrump, data must be saved
        cy.log('Line 503')
        cy.get('tbody')
            .find('tr')
            .first()
            .click()

        // clear response-name
        cy.get('[data-cy="response-name"]')
            .clear()
            .type(addValue+String(xle))

        cy.get('[class="v-breadcrumbs__item"]')
            .contains('Responses')
            .click()
            .wait(500)

        // Assert Successful Notification
        cy.successMessageTitle('[data-cy="successMessageTitle"]', 'Die', 'Response', addValue+String(xle))
        
        // Assert saved data in response table
        // response-table-search
        cy.get('[data-cy="response-table-search"]')
            .type(addValue+String(xle))

        // Selecting Entire Table
        cy.selectEntireTbl()
            
        // Assert Value in Response Table
        cy.log('Line 202')
        cy.get('tbody')
            .find('tr')
            .find('td:nth-child(1)')
            .then(function($synName1) {
                cy.wrap($synName1).should('have.text', addValue+String(xle))
            })

        // Clear response-table-search
        cy.get('[data-cy="response-table-search"]').clear()

        // 5. leave site via button "Abbrechen" navigates to table of synonyms and 
        //    does not save edited data
        cy.log('Line 215')
        
        // entering to first row of response table
        cy.get('tbody')
            .find('tr')
            .first()
            .click()

        // Clear response-name
        cy.get('[data-cy="response-name"]')
            .clear()
            .type('randomResponseName')

        cy.get('[data-cy="abort-button"]').click()

        // Assert Response Table
        cy.get('[data-cy="response-table-search"]')
            .type('randomResponseName')
        
        cy.log('Line 234')
        cy.get('tbody')
            .find('tr')
            .should('not.have.text', 'randomResponseName')

        // clear response-table-search
        cy.get('[data-cy="response-table-search"]').clear()
    }
}
// Exportint class frontEnd to End2End to test
export const onResponseBearbeiten = new responses_bearbeiten()