import AccessoriesPageSneaker from "../../page-objects/accessoriesPageSneaker"
import Chance from 'chance'

describe ('UI tests for Onliner', () => {
    // before(() => {
    //     cy.fixture('product').then(data=>{
    //         cy.wrap(data).as('productData')
    //     })
    // })
    // it('Positive: User is able to add one product to the card', () => {
    //
    //     cy.log("GIVEN User is at Product Page")
    //     cy.visit("https://sneakers.by/katalog/obuv-belarus/kupit-krossovki-v-belarusi/nike-wmns-m2k-tekno-ao3108-403")
    //
    //     cy.log("WHEN User selects the size of the sneakers")
    //     cy.get('select').select('36.5')
    //
    //     cy.log("AND User adds sneakers to the card")
    //     cy.get('#button-cart').click().wait(3000)
    //
    //     cy.log("THEN Data product is presented in the card")
    //     cy.get('tr').eq(2).should('contain', 'Nike WMNS M2K TEKNO AO3108-403')
    //     cy.log("AND The size of product is egual to the selected size")
    //     cy.get('tr').eq(2).should('contain', 'Размер (EUR) 36.5')
    //
    //    cy.get('.button.btn.btn-primary.btn-lg').contains('Выбрать ещё').click()
    //     cy.reload()

   // })

    it('Positive: User is able to add several product to the card', () => {

        cy.log("GIVEN User is at Catalog Page")
      //  cy.visit("https://sneakers.by/katalog/obuv-belarus/kupit-krossovki-v-belarusi/")
        accessoriesPageSneaker.openCatalog()

        accessoriesPageSneaker.addProduct(2)
        // cy.get('.qw-button').contains('В корзину').eq(0).click({force: true})
        //
        //     cy.log("WHEN User selects the size of the sneakers")
        //     cy.get('select#input-option704767').select("41")
        //
        //     cy.log("AND User adds sneakers to the card")
        //     cy.get('#button-cart').click().wait(3000)
        //
        // cy.get('.button.btn.btn-primary.btn-lg').contains('Выбрать ещё').click()
        // cy.go('back')
        //
        // cy.get('.qw-button').eq(1).click({force: true})
        // cy.log("WHEN User selects the size of the sneakers")
        // cy.get('select#input-option704766').select("45")
        // cy.log("AND User adds sneakers to the card")
        // cy.get('#button-cart').click().wait(3000)
        // cy.get('.button.btn.btn-primary.btn-lg').contains('Выбрать ещё').click()
        // cy.go('back')
     // cy.log("WHEN User selects the size of the sneakers")
     //    cy.get('select').select('36.5')
     //
     //    cy.log("AND User adds sneakers to the card")
     //    cy.get('#button-cart').click().wait(3000)
     //
     //    cy.log("THEN Data product is presented in the card")
     //    cy.get('tr').eq(2).should('contain', 'Nike WMNS M2K TEKNO AO3108-403')
     //    cy.log("AND The size of product is egual to the selected size")
     //    cy.get('tr').eq(2).should('contain', 'Размер (EUR) 36.5')
     //
     //    cy.get('.button.btn.btn-primary.btn-lg').contains('Выбрать ещё').click()
     //    cy.reload()

    })


})