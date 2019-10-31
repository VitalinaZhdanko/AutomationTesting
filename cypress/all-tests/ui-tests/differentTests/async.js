import Chance from 'chance'

before(() => {
    cy.request(`${Cypress.env('googleUrl')}`).its('body').as("accessories")
})

it('The first way. Get number of products and get the first product ', function () {
    expect(this.accessories.products[0]).to.exist

    cy.log(`Number of products: ${this.accessories.products.length}`)

    let aRRay
    let array = this.accessories.products[0]
    for (let item in array) {
        aRRay += `${array[item]}\n`
    }
    cy.log(aRRay)

})

it('The second way. Get number of products and get the first product', function () {

    cy.request(`${Cypress.env('googleUrl')}`).then((response) => {
        cy.wrap(response.body).as("accessories");
    })

    cy.get("@accessories").then(products => {
        expect(products.products[0]).to.exist

        cy.log(`${products.products.length}`)

        let aRRay
        let array = products.products[0]
        for (let item in array) {
            // cy.log(array[item])
            aRRay += `${array[item]}\n`
        }
        cy.log(aRRay)


    })


})
