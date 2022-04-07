const addVal = Math.floor(Math.random() * 650000);
const newVal = Math.floor(Math.random() * 250000);

const addValue = 'DummyValue'
export class synonyms_anlegen {

    synonymAnlegen() {

        /* Synonyms Anlegen Testing */
        cy.Trainingsdaten('Trainingsdaten', '[data-cy="navDrawerSynonyms"]')

        // Assert URL after clicking Synonym
        cy.url().should("eq", `${Cypress.config().baseUrl}/trainingsdaten/synonym/`);

        // 1. Name should not be empty, error message should contain "Name"

        // 1.1.1 Warning message
        cy.get('[data-cy="synonym-create"]').click()

        // Assert url after clicking Intent Hinzufuegen
        cy.url().should("eq", `${Cypress.config().baseUrl}/trainingsdaten/synonym/neu/`);

        cy.get('[data-cy="synonym-name"]').click({force:true})
            
        cy.get('[role="alert"]')
            .should('have.text','Der Name muss gesetzt sein.      ')

        // Save Synonym without name
        cy.get('[data-cy="create-button"]').click()

        // 1.1.2 Error Notification after unsuccessful save
        // Assert error message
        cy.get('[data-cy="errorMessageTitle"]')
            .should('have.text',' Das Synonym konnte nicht gespeichert werden. ')

        // remove error message
        cy.errorRemove()

        // 3. Saving saves data
        // add a valid synonyms name
        cy.get('[data-cy="synonym-name"]')
            .type(addValue+String(addVal))
        
        // create-button
        cy.get('[data-cy="create-button"]').click()

        // 3.1 Assert Success Notification
        cy.get('[data-cy="successMessageTitle"]')
            .should('have.text', ' Das Synonym'+' "'+addValue+String(addVal)+'" '+ 'wurde erfolgreich gespeichert ')
        
        // Closing Successfully Saved Notification
        cy.successRemove()
            
        // Assert VAlue in Synonyms TAble
        cy.get('[data-cy="navDrawerSynonyms"]').click()

        // Selecting Entire Table
        cy.selectEntireTbl()

        cy.log('Line 60')
        cy.wait(300)
        cy.get('tbody')
            .find('tr')
            .last()
            .find('td:nth-child(1)')
            .then(function($synName1) {
                cy.wrap($synName1).should('contain', addValue+String(addVal))
            })

        // 2. Check for duplicate name

        // 2.1 Synonym Name
        cy.get('[data-cy="navDrawerSynonyms"]').click()
        cy.get('[data-cy="synonym-create"]').click()
        cy.get('[data-cy="synonym-name"]')
            .type(addValue+String(addVal))

        cy.get('[data-cy="create-button"]').click()

        cy.get('[data-cy="errorMessageTitle"]')
            .should('have.text', ' Das Synonym konnte nicht gespeichert werden. ')

        cy.errorRemove()

        cy.get('[data-cy="navDrawerSynonyms"]').click()

        // Assert Value in Synonyms Table
        cy.get('[data-cy="synonym-table-search"]')
            .type(addValue+String(addVal))
    
        cy.get('tbody').find('tr').then(function($NrRow) {
                if($NrRow.find('td:nth-child(1)').length <= 1) {
                    cy.wrap($NrRow.find('td:nth-child(1)'))
                        .should('contain', addValue+String(addVal))
                }
            })

        // Clear the search field
        cy.get('[data-cy="synonym-table-search"]').clear()

        // 3. Check for successfully saved values
        //     3.2 Assert in table
        //         3.2.1 Assert Synonym name in Synonym talbe
        
        cy.log('Line 105')

        cy.get('[data-cy="synonym-create"]')
            .click({force:true})
        
        cy.get('[data-cy="synonym-name"]')
            .type(addValue+String(newVal))

        cy.get('[data-cy="create-button"]').click()
        
        cy.get('[data-cy="navDrawerSynonyms"]').click()

        // Select Entire Synonym Table
        cy.selectEntireTbl()
        
        cy.wait(300)
            .get('tbody')
            .find('tr')
            .last()
            .find('td:nth-child(1)')
            .then(function($synName2) {
                cy.wrap($synName2).should('contain', addValue+String(newVal))
            })
        cy.log('Line 130')
        // 4. Leave site via menu or breadcrump, data must not be saved
        
        // 4.1 Synonym Name
        cy.get('[data-cy="navDrawerSynonyms"]').click()

        cy.get('[data-cy="synonym-create"]')
            .click({force:true})

        cy.get('[data-cy="synonym-name"]')
            .click({force:true})
            .type('someName')

        cy.get('[data-cy="navDrawerSynonyms"]').click()

        // Select Entire Synonym Table
        cy.selectEntireTbl()

        cy.wait(300)
        cy.get('tbody')
            .find('tr')
            .last()
            .find('td:nth-child(1)')
            .should('not.have.text', 'someName')
    }
}

// Export class
export const onSynonymAnlegen = new synonyms_anlegen()