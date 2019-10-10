import Chance from 'chance'

describe('Test for swagger', () => {
    before(() => {
        //  cy.visit('https://example.cypress.io/commands/actions')
    })

    // https://on.cypress.io/interacting-with-elements

    it('Positive: Create user', () => {
        cy.fixture('user').then(user => {
            cy.request('POST', '/api/users', user).then(response => {
                expect(response.status).to.eq(201)
                expect(response.body).to.have.property("name", user.name)
                expect(response.body).to.have.property("job", user.job)

            })
        })
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


        // {
        //      description: "Max value for all fields",
        //      requestData: {
        //          // name: Chance().string({length:1}),
        //          //id: Chance().integer({length:1})
        //          id: 0,
        //          category: {
        //              id: 0,
        //              name: Chance().string({length: 100})
        //          },
        //          name: Chance().string({length: 100}),
        //          photoUrls: [
        //          ],
        //          tags: [
        //              {
        //                  id: 0,
        //                  name: "string"
        //              }
        //          ],
        //          status: "available"
        //      }
        //  }
    ]


})

testingData.forEach(({description,requestData})=>{
    it(`Positive: Create user ${description}`, () => {
        cy.request('POST','/api/users',requestData).then(response => {
            expect(response.status).to.eq(405).to.be.a('everything ok')

            expect(response.body).to.have.property('name', requestData.name)
            expect(response.body).to.have.property('id', requestData.id)

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