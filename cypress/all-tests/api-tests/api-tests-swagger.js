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
        }
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
                console.log(response)
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


    it('Positive: Add pet with Id=1', () => {
        cy.fixture('pet').then(pet => {
            cy.request({
                method: 'POST',
                url: 'https://petstore.swagger.io/v2/pet',
                body: pet
            }).then(response => {
                expect(response.status).to.eq(200);
                expect(response.body).to.have.property('name', pet.name);
                console.log(response);
            })
        })
    });

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

    it('Update pet from fixture', () => {
        cy.fixture('pet').then(pet => {
            cy.request({
                method: 'PUT',
                url: 'https://petstore.swagger.io/v2/pet',
                body: pet
            }).then(response => {
                expect(response.status).to.eq(200);
            })
        })
    });


                        //GET-запросы
    it('Positive: Get pet with Id=1', () => {
        cy.fixture('pet').then(pet => {
            cy.request({
                method: 'GET',
                url: `https://petstore.swagger.io/v2/pet/${pet.id}`,
                body: pet
            }).then(response => {
                expect(response.status).to.eq(200);
                expect(response.body).to.have.property('name', pet.name);
                console.log(response);
            })
        })
    });

                    //DELETE-запросы
 it('Positive: Delete pet with Id=1', () => {
        cy.fixture('pet').then(pet => {
            cy.request({
                method: 'Delete',
                url: `https://petstore.swagger.io/v2/pet/${pet.id}`,
                body: pet
            }).then(response => {
                expect(response.status).to.eq(200);
                console.log(response);
            })
        })
    });

    it('Negative Delete pet which not founded', () => {
        cy.fixture('pet').then(pet => {
            cy.request({
                method: 'Delete',
                url: `https://petstore.swagger.io/v2/pet/${pet.id}`,
                failOnStatusCode: false,
                body: pet
            }).then(response => {
                expect(response.status).to.eq(404);
                console.log(response);
            })
        })
    });

                    //POST-запросы. Negative

    let testingDataNegative = [
        {
            description: "All fields is empty",
            requestData: {
                id: 0,
                category: {
                    id: 0,
                    name: ''
                },
                name: '',
                photoUrls: [],
                status:[]
            }
        }

    ]
    let testingDataNegative2 = [
    {
        description: "The most long name in the world + photoUrl is empty",
            requestData: {
                name: 'ФФФБарнаби Мармадюк Алоизий Бенджи Кобвеб Дартаньян Эгберт Феликс Гаспар Гумберт Игнатий Джейден Каспер Лерой Максимилиан Недди Объяхулу Пепин Кьюллиам Розенкранц Секстон Тедди Апвуд Виватма Уэйленд Ксилон Ярдли Закари Усански',
                photoUrls: []
            }
    },
        {
            description:"name and phroUrl consist of xml-code for button",
            requestData:{
                name:'<Button inherits="UIPanelButtonTemplate" text="Big Text">\n' +
                '     <Size x="150" y="60"/>\n' +
                '     <Anchors><Anchor point="BOTTOM"/></Anchors>\n' +
                '     <NormalFont style="GameFontNormalHuge"/>\n' +
                '   </Button>',
                photoUrls:['<Button inherits="UIPanelButtonTemplate" text="Big Text">\n' +
                '     <Size x="150" y="60"/>\n' +
                '     <Anchors><Anchor point="BOTTOM"/></Anchors>\n' +
                '     <NormalFont style="GameFontNormalHuge"/>\n' +
                '   </Button>']

            }
        }
    ]


    testingDataNegative.forEach(({description, requestData}) => {
        it(`Negative: Add a new pet to the store ${description}`, () => {
            cy.request({
                method:'POST',
                url:'https://petstore.swagger.io/v2/pet',
                failOnStatusCode: false,
                body:requestData
            }).then(response => {
                expect(response.status).to.eq(500)

            })
        })
    })



    testingDataNegative2.forEach(({description, requestData}) => {
        it(`Negative: Add a new pet to the store ${description}`, () => {
            cy.request({
                method:'POST',
                url:'https://petstore.swagger.io/v2/pet',
                failOnStatusCode: false,
                body:requestData
            }).then(response => {
                expect(response.status).to.eq(500)

            })
        })
    })

})
