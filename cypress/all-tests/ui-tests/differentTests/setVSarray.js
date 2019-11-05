import Chance from 'chance'
import {isSuperset, difference, intersection, union, printPlanets, getPlanetsWithDistance} from "../../../utils/helper"

it('The third exercise', function () {
    let currencySet = new Set();
    currencySet.add('USD');
    currencySet.add('RUR');
    currencySet.add('BYN');

    currencySet.forEach(currency => {
        cy.log(currency)
    })

    cy.log('Add new values')
    currencySet.add('PLN');
    currencySet.add('RUR');
    currencySet.add('SAR', 'SRC');

    currencySet.forEach(currency => {
        cy.log(currency)
    })

    cy.log('Set has USD value: ' + currencySet.has('USD'));
    currencySet.delete('USD');
    cy.log('Set has USD value before delete: ' + currencySet.has('USD'));

    cy.log('Select 1 element');
    let currencyArray = Array.from(currencySet);
    cy.log(chance.pickone(currencyArray));

    cy.log('Select 3 elements');
    cy.log(chance.pickset(currencyArray, 3));

    let number = chance.integer({min: 1, max: currencySet.size});
    cy.log(`Select a random number of elements (${number} elements)`);

    cy.log(chance.pickset(currencyArray, number));

})


it('Several Sets', function () {
    let setA = new Set(['USD', 'RUR', 'BYN', 'PLN']);
    let setB = new Set(['RUR', 'BYN']);
    let setC = new Set(['BYN', 'PLN', 'SAR', 'SRC']);

    cy.log(`isSuperset:  ${isSuperset(setA, setB)}`);

    cy.log('union: ')
    let setsub = union(setA, setC);
    setsub.forEach(setsubs => {
        cy.log(setsubs)
    })

    cy.log('intersection: ')
    let setsub2 = intersection(setA, setC);
    setsub2.forEach(setsubs => {
        cy.log(setsubs)
    })

    cy.log('difference: ')
    let setsub3 = difference(setA, setC);
    setsub3.forEach(setsubs => {
        cy.log(setsubs)
    })

})

it('the 4 exercise', function () {

    let planets = [
        {planet: "Mercury", radius: 2440, density: 5.43, distance: 0.395},
        {planet: "Venus", radius: 6052, density: 5.24, distance: 0.723},
        {planet: "Earth", radius: 6378, density: 5.52, distance: 1},
        {planet: "Mars", radius: 3396, density: 3.93, distance: 1.53},
        {planet: "Jupiter", radius: 71492, density: 1.33, distance: 5.21},
        {planet: "Saturn", radius: 60268, density: 0.69, distance: 9.551},
        {planet: "Uranus", radius: 25559, density: 1.27, distance: 19.213},
        {planet: "Neptune", radius: 24764, density: 1.64, distance: 30.07}
    ]
    printPlanets(planets);

    let planetsSolarSystem = planets.map((item) => {
        item.solarSystem = "true";
        return item;
    })
    printPlanets(planetsSolarSystem)

    planetsSolarSystem.push({
        planet: "SomeNewPlanet",
        radius: 24764,
        density: 1.64,
        distance: 30.07,
        solarSystem: false
    })
    printPlanets(planetsSolarSystem)

    cy.log(`The sum of radius of all the planets: ${planetsSolarSystem.reduce((item, currentValue) =>
        item + currentValue.radius, 0)}`)

    cy.log("====Planets with distance > 5 ====")
    printPlanets(getPlanetsWithDistance(planetsSolarSystem, 5))

    planetsSolarSystem.splice(planetsSolarSystem.indexOf("SomeNewPlanet"));
    cy.log('Delete')
    printPlanets(planetsSolarSystem);

    cy.log('Sort by radius')
    printPlanets(planetsSolarSystem.sort((a, b) => a.radius - b.radius))

    cy.log("Sorting by name");
    planetsSolarSystem.sort(function (a, b) {
        let planetA = a.planet.toLowerCase(), planetB = b.planet.toLowerCase()
        if (planetA < planetB) return -1
        if (planetA > planetB) return 1
        return 0
    });
    printPlanets(planetsSolarSystem);

    cy.log(`Length of planetsSolarSystem: ${planetsSolarSystem.length}`)
})


describe('currencyConverter', () => {
    it('Check value', () => {
        cy.fixture('currencyConverter').then(item => {
            let currency=Chance().pickone(item.rates);
            cy.visit('https://www.xe.com/currencyconverter/');
            cy.get('#to').click().type(`${currency.shortName}{enter}{enter}`);
            cy.get('span[class="converterresult-toAmount"]').should(($this) => {
                expect($this).to.contain(`${currency.rate}`)
            })
        })
    })
});
