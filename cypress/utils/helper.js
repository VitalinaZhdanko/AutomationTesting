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

export const printPlanets=(planets)=>{
           planets.forEach(planet=> {
            cy.log(JSON.stringify(planet));
           })
}

export const getPlanetsWithDistance=(planets, number)=>{
    return planets.filter(planet=>planet.distance>number)
}

export const printAgeStatus=(age,ageStatus)=>{
    cy.log(`Age ${age} : ${ageStatus}`)
}
