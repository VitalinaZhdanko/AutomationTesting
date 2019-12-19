class AccessoriesPageSneaker {

    open() {
        cy.visit(`${Cypress.env('sneakerUrl')}/katalog/obuv-belarus/kupit-krossovki-v-belarusi/`);
    }

    openCard() {
        cy.visit(`${Cypress.env('sneakerUrl')}/cart/`);
    }

    addProductsToCard(productsData) {
        productsData.forEach(product => {
            this.addProductToCard(product.productIndex)
            cy.go('back')
        })
    }

    addProductToCard(productIndex) {
        cy.log("WHEN User opens the product")
        cy.get('button.qw-button').eq(productIndex).click({force: true}).wait(3000)

        cy.log("WHEN User selects the size of the sneakers")
        this.chooseSize()

        cy.log("AND User adds sneakers to the card")
        this.addToCard()
    }

    chooseSize() {
        cy.get('select').eq(0).find('option').its('length').then(numOptions => {
            var size = chance.integer({min: 0, max: numOptions - 1})
            cy.get('select').eq(0).find('option').eq(1).invoke('text').then(text => {
                cy.get('select').eq(0).select(text.trim())
            })
        })
    }

    addToCard() {
        cy.get('#button-cart').click().wait(3000).focus()
    }


    changeSize(line) {
        line.forEach(product => {
            let count = chance.integer({min: 2, max: 100})
            cy.get('input.form-control').eq(product.lineIndex).clear().type(`${count}{enter}`)

            cy.get('input.form-control').eq(product.lineIndex).should('have.value', `${count}`)
        })
    }


    checkResults(count) {
        if (count == 1) {
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


}

export default new AccessoriesPageSneaker()