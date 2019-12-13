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


})