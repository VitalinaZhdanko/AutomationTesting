class AccessoriesPageSneaker {
    openCatalog() {
        cy.visit(`${Cypress.env('sneakerUrl')}/katalog/obuv-belarus/kupit-krossovki-v-belarusi/`);

    }

    openProduct() {
        cy.visit(`${Cypress.env('sneakerUrl')}/katalog/obuv-belarus/kupit-krossovki-v-belarusi/nike-wmns-m2k-tekno-ao3108-403`);
    }

    addProduct(count) {
        if (count == 1) {
            cy.log("WHEN User selects the size of the sneakers")
            cy.get('select').select('36.5')

            cy.log("AND User adds sneakers to the card")
            cy.get('#button-cart').click().wait(3000)
        }
        else {
            cy.log("WHEN User opens the product")
            cy.get('.qw-button').contains('В корзину').eq(0).click({force: true})

            cy.log("WHEN User selects the size of the sneakers")
            cy.get('select#input-option704767').select("41")

            cy.log("AND User adds sneakers to the card")
            cy.get('#button-cart').click().wait(3000)

            cy.log("AND User is able to select else product")
            cy.get('.button.btn.btn-primary.btn-lg').contains('Выбрать ещё').click()
            cy.go('back')

            cy.log("WHEN User opens the product")
            cy.get('.qw-button').eq(1).click({force: true})

            cy.log("WHEN User selects the size of the sneakers")
            cy.get('select#input-option704766').select("45")

            cy.log("AND User adds sneakers to the card")
            cy.get('#button-cart').click().wait(3000)

            cy.log("WHEN User reloads page")
            cy.reload()
        }
    }

    checkResults(count) {
        if (count == 1)
        {
            cy.log("THEN Data product is presented in the card")
            cy.get('tr').eq(2).should('contain', 'Nike WMNS M2K TEKNO AO3108-403')
            cy.log("AND The size of product is egual to the selected size")
            cy.get('tr').eq(2).should('contain', 'Размер (EUR) 36.5')
        }
        else {
            cy.log("THEN Data product is presented in the card")
            cy.get('tr').eq(2).should('contain', 'Puma x BEAMS CELL Ultra (37280901)')
            cy.log("AND The size of product is egual to the selected size")
            cy.get('tr').eq(2).should('contain', 'Размер (EUR) 41')

            cy.log("THEN Data product is presented in the card")
            cy.get('tr').eq(4).should('contain', 'Air Jordan 1 High Zoom \'Fearless\' (BV0006-900)')
            cy.log("AND The size of product is egual to the selected size")
            cy.get('tr').eq(4).should('contain', 'Размер (EUR) 45')

        }
    }


    performSearch(productToSearch) {
        this.searchIcon.click();
        this.searchInput.type(`${productToSearch}{enter}`);
    }


}

export default new AccessoriesPageSneaker()