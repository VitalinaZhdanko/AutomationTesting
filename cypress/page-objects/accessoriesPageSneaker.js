class AccessoriesPageSneaker {

    open() {
        cy.visit(`${Cypress.env('sneakerUrl')}/katalog/obuv-belarus/kupit-krossovki-v-belarusi/`);
    }

    openCard() {
        cy.visit(`${Cypress.env('sneakerUrl')}/cart/`);
    }

    addProductsToCard(productsData) {
        let productArray = []
        productsData.forEach(product => {
            this.addProductToCard(product.productIndex)
            cy.fixture(`product${product.productIndex}.json`).then(product => {
                productArray.push(product)
            })
            cy.go('back')
        })
        console.log(productArray)
        cy.writeFile('./cypress/fixtures/addedProduct.json', productArray)
    }

    addProductToCard(productIndex) {
        let product = {productIndex: productIndex}
        cy.log("WHEN User opens the product")
        cy.get('button.qw-button').eq(productIndex).click({force: true}).wait(3000)

        cy.get('.col-sm-5 > h1').invoke('text').then(nameProduct => {
            nameProduct = nameProduct.replace('Оригинальные кроссовки ', '')

            product.name = nameProduct
            cy.log("WHEN User selects the size of the sneakers")

            cy.get('select').eq(0).find('option').its('length').then(numOptions => {
                var size = chance.integer({min: 0, max: numOptions - 1})
                cy.get('select').eq(0).find('option').eq(1).invoke('text').then(text => {
                    cy.get('select').eq(0).select(text.trim())
                    product.size = text.trim()
                    cy.writeFile(`./cypress/fixtures/product${productIndex}.json`, product)
                })
            })
            this.chooseSize()

            cy.log("AND User adds sneakers to the card")
            this.addToCard()
        })
    }

    checkResults(){
        cy.reload()
        this.openCard()

        cy.fixture('addedProduct').then(product=>{
                cy.get('#content > form > div > table > tbody > tr > td:nth-child(2) > a').should('contain', `${product[0].name}`)
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