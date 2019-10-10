import Chance from 'chance'

describe('Test for reqres', () => {
    before(() => {
        //  cy.visit('https://example.cypress.io/commands/actions')
    })
        let testingData = [
            {
                description: "All fields have max values",
                requestData: {
                    id: Chance().integer({length: 100}),
                    category: {
                        id: Chance().integer({length: 100}),
                        name: Chance().string({length: 100})
                    },
                    name: Chance().string({length: 100}),
                    photoUrls: generatePhotoUrl(10),
                    tags: [
                        {
                            id: Chance().integer({length: 100}),
                            name: Chance().string({length: 100})
                        }
                    ],
                    status: Chance().pickone(['available', 'pending', 'sold'])
                }
            }

        ]



    testingData.forEach(({description, requestData}) => {
        it(`Positive: Create user ${description}`, () => {
            cy.request('POST', 'https://petstore.swagger.io/v2/pet', requestData).then(response => {
                expect(response.status).to.eq(200)
                expect(response.body).to.have.property('id', requestData.id)
                expect(response.body.category).to.have.property('id', requestData.category.id)
                expect(response.body.category).to.have.property('name', requestData.category.name)
                expect(response.body).to.have.property('name', requestData.name)
              //  expect(response.body).to.have.property('photoUrls', requestData.photoUrls)
               // expect(response.body.tags).to.have.property('id', requestData.tags.id)
               // expect(response.body.tags).to.have.property('name', requestData.tags.name)
            //    expect(response.body).to.have.property('status', requestData.status)

            })
        })
    })

    function generatePhotoUrl(count) {
        let url = [];
        for (let i = 0; i < count; i++) {
            // array[i]=Chance.url();
            url[i] = Chance().string({length: 100})
        }
        return url;
    }

})
