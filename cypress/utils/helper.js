export const isSuperset=(setA,setB)=>{
    for (let elem of setB){
        if(!setA.has(elem)){
            return false;
        }
    }
    return true;
}


export const union=(setA, setB)=>{
    let _union=new Set(setA);
    for(let elem of setB){
        _union.add(elem)
    }
    return _union;
}

export const intersection=(setA,setB)=>{
    let _intersection=new Set();
    for (let elem of setB) {
        if(setA.has(elem)){
            _intersection.add(elem);
        }
    }
    return _intersection;
}

export const difference=(setA,setB)=>{
    let _difference=new Set(setA);
    for (let elem of setB){
        _difference.delete(elem);
    }
    return _difference;
}

export const printPlanets=(planets, solar=false)=>{
    if(!solar){
    planets.forEach(function (item,index,planets) {
        cy.log(`${index}: planet: ${item.planet}, radius: ${item.radius}, density: ${item.density}, distance: ${item.distance}`)
     //   cy.log(JSON.stringify(item));
    })}
    else{
        planets.forEach(function (planet,index,planets) {
            cy.log(JSON.stringify(planet));
           })
        //
        // planets.forEach(planet => {
        //     cy.log(Object.keys(planet).map(key => key + ':' + planet[key]).join(', '));
        // })

    }
}

export const getPlanetsWithDistance=(planets, number)=>{
    return planets.filter(planet=>planet.distance>5)
}

