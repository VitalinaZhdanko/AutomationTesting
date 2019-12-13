import accessoriesPageSneaker from "../../page-objects/accessoriesPageSneaker"
import Chance from 'chance'

describe ('UI tests for SneakerBar', () => {

    it('Positive: User is able to add one product to the card', () => {

        cy.log("GIVEN User is at Product Page")
        accessoriesPageSneaker.openProduct()

        cy.log("WHEN User adds the product to the card")
        accessoriesPageSneaker.addProduct(1)

        cy.log("THEN Check results")
        accessoriesPageSneaker.checkResults(1)

        cy.log("THEN Reload page")
        cy.reload()
   })

    it('Positive: User is able to add several products to the card from Catalog Page', () => {

        cy.log("GIVEN User is at Catalog Page")
        accessoriesPageSneaker.openCatalog()

        cy.log("WHEN User adds several products")
        accessoriesPageSneaker.addProduct(2)

        cy.log("THEN Check results")
        accessoriesPageSneaker.checkResults(2)
    })



    it('Positive: User is able to change average number of item in the card', () => {

        cy.log("GIVEN User adds product and opens Card Page with one product")
        accessoriesPageSneaker.openProduct()
        accessoriesPageSneaker.addProduct(1)
        accessoriesPageSneaker.openCard()

        cy.get('input[value="1"]').clear().type(`5{enter}`)
        cy.get('input').should('have.value', '5')

    })

    it('Positive: User is able to change max number of item in the card', () => {

        cy.log("GIVEN User adds product and opens Card Page with one product")
        accessoriesPageSneaker.openProduct()
        accessoriesPageSneaker.addProduct(1)
        accessoriesPageSneaker.openCard()

        cy.get('input[value="1"]').clear().type(`10000000000{enter}`)
        cy.get('input').should('have.value', '10000000000')

    })

    it('Negative: User is able to write string in CountField', () => {

        cy.log("GIVEN User adds product and opens Card Page with one product")
        accessoriesPageSneaker.openProduct()
        accessoriesPageSneaker.addProduct(1)
        accessoriesPageSneaker.openCard()

        cy.log('Except error message')
        cy.get('input[value="1"]').clear().type(`qwerty{enter}`)
        cy.get('input').should('have.value', 'qwerty')

    })

    it('Negative: User is able to write script in CountField', () => {

        cy.log("GIVEN User adds product and opens Card Page with one product")
        accessoriesPageSneaker.openProduct()
        accessoriesPageSneaker.addProduct(1)
        accessoriesPageSneaker.openCard()

        cy.log('Except error message')
        cy.get('input[value="1"]').clear().type(`<script>
        alert( "Я JavaScript!" );
        </script>{enter}`)
        cy.get('input').should('have.value', '1')

    })

    it('Negative: User is able to write negative numper in CountField', () => {

        cy.log("GIVEN User adds product and opens Card Page with one product")
        accessoriesPageSneaker.openProduct()
        accessoriesPageSneaker.addProduct(1)
        accessoriesPageSneaker.openCard()

        cy.get('input[value="1"]').clear().type(`-1{enter}`)
        cy.log('Except error message')
        cy.get('input').should('have.value', '-1')

    })



})