import Chance from 'chance'
import AccessoriesSneakerPage from "../../page-objects/accessoriesPageSneaker"

describe('UI tests for SneakerBar', () => {

    it('Positive: User is able to add one product to the card', () => {

        cy.log("GIVEN User is at Catalog Page")
        AccessoriesSneakerPage.open()

        cy.log("WHEN User adds the product to the card")
        let productsData = [{productIndex: 0}]
        AccessoriesSneakerPage.addProductsToCard(productsData)

        cy.log("THEN Check results")
        AccessoriesSneakerPage.checkResults()
    })

    it('Positive: User is able to add several products to the card', () => {

        cy.log("GIVEN User is at Catalog Page")
        AccessoriesSneakerPage.open()

        cy.log("WHEN User adds several products")
        let productsData = [{productIndex: 0}, {productIndex: 1}, {productIndex: 2}]
        AccessoriesSneakerPage.addProductsToCard(productsData)
        cy.reload()
        
        cy.log("THEN Check results")
        AccessoriesSneakerPage.checkResults()
    })


    it('Positive: User is able to change average number of item in the card', () => {

        cy.log("GIVEN User adds product and opens Card Page with one product")
        AccessoriesSneakerPage.open()
        let productsData = [{productIndex: 0, name:""}]
        AccessoriesSneakerPage.addProductsToCard(productsData)
        cy.reload()
        AccessoriesSneakerPage.openCard()

        cy.log("WHEN User resizes item")
        let tableLine = [{lineIndex: 1}]
        AccessoriesSneakerPage.changeSize(tableLine)

    })


    it('Positive: User is able to change number of different items in the card', () => {

        cy.log("GIVEN User User adds several products and opens Card Page ")
        AccessoriesSneakerPage.open()
        let productsData = [{productIndex: 0}, {productIndex: 1}, {productIndex: 2}]
        AccessoriesSneakerPage.addProductsToCard(productsData)
        cy.reload()
        AccessoriesSneakerPage.openCard()

        cy.log("WHEN User resizes items")
        let tableLine = [{lineIndex: 1}, {lineIndex: 2}, {lineIndex: 3}]
        AccessoriesSneakerPage.changeSize(tableLine)

    })

})