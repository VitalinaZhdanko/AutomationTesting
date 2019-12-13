class AccessoriesPageSneaker{
    openCatalog() {
        cy.visit(`${Cypress.env('sneakerUrl')}/katalog/obuv-belarus/kupit-krossovki-v-belarusi/`);

    }

    addProduct(count){
        if(count==1)
        {}
        else
        {
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

    get selectRAM(){
        return cy.get('.offers-description-filter-control offers-description-filter-control_switcher');
    }

    get searchInput(){
        return cy.get('input[aria-label="Search Google Store"]');
    }


    performSearch (productToSearch){
        this.searchIcon.click();
        this.searchInput.type(`${productToSearch}{enter}`);
    }




}

export default new AccessoriesPageSneaker()