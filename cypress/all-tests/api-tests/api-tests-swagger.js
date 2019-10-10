import Chance from 'chance'

describe('Test for reqres', () => {
    before(() => {
        //  cy.visit('https://example.cypress.io/commands/actions')
    })


                //POST-запросы


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
                photoUrls: generatePhotoUrl(Chance().integer({min: 1, max : 100})),
                // tags: [
                //     {
                //         id: Chance().integer({length: 100}),
                //         name: Chance().string({length: 100})
                //     }
                // ],
              //  tags: generateTags(Chance().integer({min: 1, max : 100})),
                status: Chance().pickone(['available', 'pending', 'sold'])
            }
        },
        {
            description: "All fields have min values",
            requestData: {
                id: Chance().integer({length: 1}),
                category: {
                    id: Chance().integer({length: 1}),
                    name: Chance().string({length: 1})
                },
                name: Chance().string({length: 1}),
                photoUrls: generatePhotoUrl(Chance().integer(1)),
                // tags: [
                //     {
                //         id: Chance().integer({length: 100}),
                //         name: Chance().string({length: 100})
                //     }
                // ],
                //  tags: generateTags(Chance().integer({min: 1, max : 100})),
                status: Chance().pickone(['available', 'pending', 'sold'])
            }
        },
        {
            description: "Add pet with id=1",
            requestData: {
                id: 1,
                category: {
                    id: Chance().integer({length: 1}),
                    name: Chance().string({length: 1})
                },
                name: Chance().string({length: 1}),
                photoUrls: generatePhotoUrl(Chance().integer(1)),
                // tags: [
                //     {
                //         id: Chance().integer({length: 100}),
                //         name: Chance().string({length: 100})
                //     }
                // ],
                //  tags: generateTags(Chance().integer({min: 1, max : 100})),
                status: Chance().pickone(['available', 'pending', 'sold'])
            }
        }
        // {
        //     description: "The required fields have random values ",
        //     requestData: {
        //         name: Chance().string(),
        //         photoUrls: generatePhotoUrl(Chance().string({min: 1, max: 100}))
        //     }
        // }


    ]


    testingData.forEach(({description, requestData}) => {
        it(`Positive: Add a new pet to the store ${description}`, () => {
            cy.request('POST', 'https://petstore.swagger.io/v2/pet', requestData).then(response => {
                expect(response.status).to.eq(200)
                expect(response.body).to.have.property('id', requestData.id)
                expect(response.body.category).to.have.property('id', requestData.category.id)
                expect(response.body.category).to.have.property('name', requestData.category.name)
                expect(response.body).to.have.property('name', requestData.name)
                expect(response.body.photoUrls).to.deep.equal(requestData.photoUrls)
                //   expect(response.body.tags).to.deep.equal(requestData.tags)
              //  expect(response.body.tags).to.have.property('id', requestData.tags.id)
                //expect(response.body.tags).to.have.property('name', requestData.tags.name)
                expect(response.body).to.have.property('status', requestData.status)
            })
        })
    })


    let testingData_2 = [
        {
            description: "The required fields have random values ",
            requestData: {
                name: Chance().string(),
                photoUrls: generatePhotoUrl(Chance().string({min: 1, max: 100}))
            }
        }
    ]

    testingData_2.forEach(({description, requestData}) => {
        it(`Positive: Add a new pet to the store ${description}`, () => {
            cy.request('POST', 'https://petstore.swagger.io/v2/pet', requestData).then(response => {
                expect(response.status).to.eq(200)
                expect(response.body).to.have.property('name', requestData.name)
                expect(response.body.photoUrls).to.deep.equal(requestData.photoUrls)


            })
        })
    })


    let testingData_3 = [
        {
            description: "Different languages in fields",
            requestData: {
                 category: {
                   name: 'ЩcHЎ但是'
                },
                name: 'ЩcHЎ但是',
                photoUrls: generatePhotoUrlDiffLang(Chance().integer({min: 1, max : 100})),

            }
        }
    ]
    testingData_3.forEach(({description, requestData}) => {
        it(`Positive: Add a new pet to the store ${description}`, () => {
            cy.request('POST', 'https://petstore.swagger.io/v2/pet', requestData).then(response => {
                expect(response.status).to.eq(200)
                expect(response.body).to.have.property('name', requestData.name)
                expect(response.body.category).to.have.property('name', requestData.category.name)
                expect(response.body.photoUrls).to.deep.equal(requestData.photoUrls)


            })
        })
    })




    function generateTags(count) {
        let name = [];
        let id = [];
        let all=[];
        for (let i = 0; i < count; i++) {
            // uri[i]=Chance.url();
            id[i] = Chance().integer({length: 100}),
                name[i]= Chance().string({length: 100}),
                all[i]=id[i]+name[i]
        }
        return all;
    }
    function generatePhotoUrl(count) {
        let url = [];
        for (let i = 0; i < count; i++) {
            url[i] = Chance().string()
        }
        return url;
    }
    function generatePhotoUrlDiffLang(count) {
        let url = [];
        for (let i = 0; i < count; i++) {
            url[i] = 'ЩcHЎ但是э'
        }
        return url;
    }


                        //PUT-запросы

    testingData_2.forEach(({description, requestData}) => {
        it(`Update an existing pet ${description}`, () => {
            cy.request('PUT', 'https://petstore.swagger.io/v2/pet', requestData).then(response => {
                expect(response.status).to.eq(200)
                expect(response.body).to.have.property('name', requestData.name)
                expect(response.body.photoUrls).to.deep.equal(requestData.photoUrls)


            })
        })
    })


                        //GET-запросы


    let testingData_Get = [
        {
            description: "Get pet by ID",
            requestData: {
               petId:1
            }
        }
    ]
    testingData_Get.forEach(({description, requestData}) => {
        it(`Find Pet by Id ${description}`, () => {
            cy.request('GET', 'https://petstore.swagger.io/v2/pet/{petId}', requestData).then(response => {
                expect(response.status).to.eq(200)
               // expect(response.path).to.have.property('name', requestData.name)
               // expect(response.body.photoUrls).to.deep.equal(requestData.photoUrls)


            })
        })
    })


                    //DELETE-запросы

//!!!!!!!!!!!!!
                    //POST-запросы. Negative
 //   !!!!!!!!!!!!!!
    let testingData = [
        {
            description: "All fields is empty",
            requestData: {
                id: 0,
                category: {
                    id: 0,
                    name: ''
                },
                name: Chance().string({length: 100}),
                photoUrls: generatePhotoUrl(Chance().integer({min: 1, max : 100})),
                status: Chance().pickone(['available', 'pending', 'sold'])
            }
        },
        {
            description: "All fields have min values",
            requestData: {
                id: Chance().integer({length: 1}),
                category: {
                    id: Chance().integer({length: 1}),
                    name: Chance().string({length: 1})
                },
                name: Chance().string({length: 1}),
                photoUrls: generatePhotoUrl(Chance().integer(1)),
                // tags: [
                //     {
                //         id: Chance().integer({length: 100}),
                //         name: Chance().string({length: 100})
                //     }
                // ],
                //  tags: generateTags(Chance().integer({min: 1, max : 100})),
                status: Chance().pickone(['available', 'pending', 'sold'])
            }
        },
        {
            description: "Add pet with id=1",
            requestData: {
                id: 1,
                category: {
                    id: Chance().integer({length: 1}),
                    name: Chance().string({length: 1})
                },
                name: Chance().string({length: 1}),
                photoUrls: generatePhotoUrl(Chance().integer(1)),
                // tags: [
                //     {
                //         id: Chance().integer({length: 100}),
                //         name: Chance().string({length: 100})
                //     }
                // ],
                //  tags: generateTags(Chance().integer({min: 1, max : 100})),
                status: Chance().pickone(['available', 'pending', 'sold'])
            }
        }
        // {
        //     description: "The required fields have random values ",
        //     requestData: {
        //         name: Chance().string(),
        //         photoUrls: generatePhotoUrl(Chance().string({min: 1, max: 100}))
        //     }
        // }


    ]


    testingData.forEach(({description, requestData}) => {
        it(`Positive: Add a new pet to the store ${description}`, () => {
            cy.request('POST', 'https://petstore.swagger.io/v2/pet', requestData).then(response => {
                expect(response.status).to.eq(200)
                expect(response.body).to.have.property('id', requestData.id)
                expect(response.body.category).to.have.property('id', requestData.category.id)
                expect(response.body.category).to.have.property('name', requestData.category.name)
                expect(response.body).to.have.property('name', requestData.name)
                expect(response.body.photoUrls).to.deep.equal(requestData.photoUrls)
                //   expect(response.body.tags).to.deep.equal(requestData.tags)
                //  expect(response.body.tags).to.have.property('id', requestData.tags.id)
                //expect(response.body.tags).to.have.property('name', requestData.tags.name)
                expect(response.body).to.have.property('status', requestData.status)
            })
        })
    })

})
