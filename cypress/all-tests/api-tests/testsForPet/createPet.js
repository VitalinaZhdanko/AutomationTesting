import Chance from 'chance'
import {createPet} from "../../../service/petService"
import {API_URL} from "../../../service/apiSettings"
import {
    DATA_OPTIONS,
    getPetRequestData,
    POOLS
} from "../../../utils/requestsDataGenerator"
import {PET_LIMIT} from "../../../utils/limits";
import {fillTags,fillUrls} from "../../../utils/requestsDataGenerator"

describe('Tests for create Pet', () => {

    let testingData = [
        {description: 'All fields: Max values C2', requestData: getPetRequestData(DATA_OPTIONS.MAX)},
        {description: 'All fields: Min values C1', requestData: getPetRequestData(DATA_OPTIONS.MIN)},
        {description: 'All fields: Average values C3', requestData: getPetRequestData(DATA_OPTIONS.AVERAGE)},
        {description: 'Positive: Create new Pet: Russian language in request C6', requestData: getPetRequestData(DATA_OPTIONS.AVERAGE, false, POOLS.RUSSIAN)},
        {description: 'Positive: Create new Pet: Chinese language in request C5', requestData: getPetRequestData(DATA_OPTIONS.AVERAGE, false, POOLS.CHINESE)}

    ];

    testingData.forEach(({description, requestData}) => {
        it(description, () => {
            createPet(requestData).then(response => {
                expect(response.status).to.eq(200);
                expect(response.body).to.have.property('id', requestData.id);
                expect(response.body.id).to.be.greaterThan(0);
                expect(response.body).to.have.property('name', requestData.name);
                expect(response.body.photoUrls).to.deep.equal(requestData.photoUrls);
                expect(response.body.tags).to.deep.equal(requestData.tags);
            })
        })
    });

    it('Positive: Only required fields (name and photoUrl) C4', () => {
        let requestData = getPetRequestData(DATA_OPTIONS.AVERAGE, true)
        createPet(requestData).then(response => {
            expect(response.status).to.eq(200);

            expect(response.body.id).to.be.greaterThan(0)
            expect(response.body).to.have.property('name', requestData.name);
            expect(response.body.photoUrls).to.deep.equal(requestData.photoUrls);
            cy.writeFile('emptyBg.txt',response);
        })
    });



  /*  it('Positive: Create new Pet: Russian language in request C6', () => {
        cy.fixture('petRussian').then(pet => {
            createPet(pet).then(response => {
                expect(response.status).to.eq(200);
                expect(response.body).to.have.property('id', pet.id);
                expect(response.body.id).to.be.greaterThan(0);
                expect(response.body).to.have.property('name', pet.name);
                expect(response.body.photoUrls).to.deep.equal(pet.photoUrls);
                expect(response.body.tags).to.deep.equal(pet.tags);
            })
        })
    });

    it('Positive: Create new Pet: Chinese language in request C5', () => {
        cy.fixture('petChinese').then(pet => {
            createPet(pet).then(response => {
                expect(response.status).to.eq(200);
                expect(response.body).to.have.property('id', pet.id);
                expect(response.body.id).to.be.greaterThan(0);
                expect(response.body).to.have.property('name', pet.name);
                expect(response.body.photoUrls).to.deep.equal(pet.photoUrls);
                expect(response.body.tags).to.deep.equal(pet.tags);
            })
        })
    });*/


    it('Negative: No values (empty body) C15', () => {
        let requestData = {}
        createPet(requestData).then(response => {
            expect(response.status).to.eq(400);
            expect(response.statusText).to.eq('Bad Request');
        })
    })


    it('Negative: No body in request С16', () => {
        cy.request({method: 'POST', url: `${API_URL}/pet`, failOnStatusCode: false}).then(response => {
            console.log(response)
            expect(response.status).to.eq(415);
        })
    })

    it('Negative: Required fields are null С17', () => {
        createPet({name: null, photoUrls: null}, false).then(response => {
            expect(response.status).to.eq(400);
            expect(response.statusText).to.eq('Bad Request');
        })
    })

    it('Negative: Invalid pet status (numeric instead of valid string value) C8', () => {
        let requestData = getPetRequestData()
        requestData.status = 1
        createPet(requestData, false).then(response => {
            expect(response.status).to.eq(400);
            expect(response.message).to.eq('Invalid pet status value');
        })
    })
    it('Negative: Invalid tag name C18', () => {
        let requestData = getPetRequestData()
        requestData.tags[0].name = 2
        createPet(requestData, false).then(response => {
            expect(response.status).to.eq(400);
            expect(response.message).to.eq('Invalid tag name value');
        })
    })
    it('Negative: Invalid pet id (string valid instead of numeric value) C19', () => {
        let requestData = getPetRequestData()
        requestData.id = Chance().string()
        createPet(requestData, false).then(response => {
            expect(response.status).to.eq(400);
            expect(response.message).to.eq('Invalid pet id status value');
        })
    })
    it('Negative: Invalid tag id (string valid instead of numeric value) C20', () => {
        let requestData = getPetRequestData()
        requestData.tags[0].id = Chance().string()
        createPet(requestData, false).then(response => {
            expect(response.status).to.eq(400)
            expect(response.statusText).to.eq('Bad Request');
        })
    })
    it('Negative: Invalid category id (string valid instead of numeric value) C21', () => {
        let requestData = getPetRequestData()
        requestData.category.id = Chance().string()
        createPet(requestData, false).then(response => {
            expect(response.status).to.eq(400);
            expect(response.statusText).to.eq('Bad Request');
        })
    })

    it('Negative: Invalid category name (numeric valid instead of string value) C22', () => {
        let requestData = getPetRequestData()
        requestData.category.name = 2
        createPet(requestData, false).then(response => {
            expect(response.status).to.eq(400);
            expect(response.statusText).to.eq('Invalid category name value');
        })
    })

    it('Negative: Invalid name value (numeric valid instead of string value) C27', () => {
        let requestData = getPetRequestData()
        requestData.name = 2
        createPet(requestData, false).then(response => {
            expect(response.status).to.eq(400);
            expect(response.statusText).to.eq('Invalid name value');
        })
    })

    it('Negative: Length of name field exceeds the max value C23', () => {
       let dataSet=getPetRequestData(PET_LIMIT, true);
        dataSet.name= Chance().string({length: PET_LIMIT.name.max + 1});
        createPet(dataSet, false).then(response => {
            expect(response.status).to.eq(400);
            expect(response.messages[0].fieldName).to.eq(`${PET_LIMIT.name}`);
            expect(response.messages[0].fieldError).to.eq(`Length must be between ${PET_LIMIT.name.min} and ${PET_LIMIT.name.max}`);
        })
    });

    it('Negative: Length of category field exceeds the max value C24', () => {
        let dataSet=getPetRequestData(PET_LIMIT, true);
        dataSet.category.name = Chance().string({length: PET_LIMIT.category.name.max + 1});

        createPet(dataSet, false).then(response => {
            expect(response.status).to.eq(400);
            expect(response.messages[0].fieldName).to.eq(`${PET_LIMIT.category.name}`);
            expect(response.messages[0].fieldError).to.eq(`Length must be between ${PET_LIMIT.category.name.min} and ${PET_LIMIT.category.name.max}`);
        })
    });
    it('Negative: Length of photoUrls field exceeds the max value C25', () => {
        let dataSet=getPetRequestData(PET_LIMIT, true);
        dataSet.photoUrls=fillUrls(PET_LIMIT.photoUrls.urlCount.max+1);
        createPet(dataSet, false).then(response => {
            expect(response.status).to.eq(400);
            expect(response.messages[0].fieldName).to.eq(`${PET_LIMIT.photoUrls.urlCount}`);
            expect(response.messages[0].fieldError).to.eq(`Length must be between ${PET_LIMIT.photoUrls.urlCount.min} and ${PET_LIMIT.photoUrls.urlCount.max}`);
        })
    })
    it('Negative: Length of tags field exceeds the max value C26', () => {
        let dataSet=getPetRequestData(PET_LIMIT, true);
        dataSet.tags=fillTags(PET_LIMIT.tags.name.max+1)
        createPet(dataSet, false).then(response => {
            expect(response.status).to.eq(400);
            expect(response.messages[0].fieldName).to.eq(`${PET_LIMIT.tags.name}`);
            expect(response.messages[0].fieldError).to.eq(`Length must be between ${PET_LIMIT.tags.name.min} and ${PET_LIMIT.tags.name.max}`);
        })
    })



});
