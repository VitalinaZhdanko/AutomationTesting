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

        cy.get('.col-sm-5 > h1').invoke('text').then(nameProduct=>{
            nameProduct=nameProduct.replace('Оригинальные кроссовки ', '')

            cy.log("WHEN User selects the size of the sneakers")
            this.chooseSize()

            cy.log("AND User adds sneakers to the card")
            this.addToCard()

            cy.log("Then Check results")
            cy.reload()
            this.openCard()

            cy.get('tr > td:nth-child(2) > a').should('contain', `${nameProduct}`)
            cy.go('back')
        })
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

}

export default new AccessoriesPageSneaker()