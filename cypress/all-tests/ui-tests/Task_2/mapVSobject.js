    it('Tests for MAP', function () {

        let planetsMap = new Map()
        planetsMap.set("Mercury", {radius: 2440, density: 5.43, distance: 0.395});
        planetsMap.set("Venus", {radius: 6052, density: 5.24, distance: 0.723});
        planetsMap.set("Earth", {radius: 6378, density: 5.52, distance: 1});
        planetsMap.set("Mars", {radius: 3396, density: 3.93, distance: 1.53});
        planetsMap.set("Jupiter", {radius: 71492, density: 1.33, distance: 5.21});
        planetsMap.set("Saturn", {radius: 60268, density: 0.69, distance: 9.551});
        planetsMap.set("Uranus", {radius: 25559, density: 1.27, distance: 19.213});
        planetsMap.set("Neptune", {radius: 24764, density: 1.64, distance: 30.07});

        planetsMap.forEach((value, key) => {
            cy.log(key + ': ' + Object.keys(value).map(objKey => objKey + ':' + value[objKey]).join(', '))
        });

       cy.log(planetsMap.get('Saturn'))

       cy.log(`Size of map: ${planetsMap.size} elements`)

        let planetsSet=new Set()
        planetsSet.add("Mercury")
        planetsSet.add("Not Mercury")

        planetsSet.forEach((planet)=> {
            if(planetsMap.has(planet)==true)
                cy.log(`Планета "${planet}" существует в Map`)
            else
                cy.log(`Планета "${planet}" не существует в Map`)
        })

        planetsMap.delete('Uranus');
        planetsMap.forEach((value, key) => {
            cy.log(key + ': ' + Object.keys(value).map(objKey => objKey + ':' + value[objKey]).join(', '))
        });

        let planetsMapSecond=new Map([
            ['Mercury',{solarSystem:true}],
            ['Venus',{solarSystem:false}],
            ['Earth',{solarSystem:false}]
        ]);

        let mergedMap=new Map([...planetsMap,...planetsMapSecond]);
        mergedMap.forEach((value, key) => {
            cy.log(key + ': ' + Object.keys(value).map(objKey => objKey + ':' + value[objKey]).join(', '))
        });

        cy.log("Mercury properies: ")
        let planet=planetsMap.get("Mercury")
        for(let key in planet){
            cy.log(`${key} : ${planet[key]}`)
        }

    })
