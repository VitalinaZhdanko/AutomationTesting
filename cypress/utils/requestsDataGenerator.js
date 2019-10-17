    import {Chance} from "chance"
    import {PET_LIMIT} from "./limits";

    let chance = Chance()

    export const DATA_OPTIONS = {MIN: "min", MAX: "max", AVERAGE: "average"}

    export const getPetRequestData = (param = DATA_OPTIONS.AVERAGE, onlyRequiredFields = false) => {
        let petDataSet = (param === DATA_OPTIONS.AVERAGE) ?
            {
                name: Chance().string({length: PET_LIMIT.name.max / 2}),
                id: getRandomPetId(),
                category: {
                    id: getRandomCategoryId(),
                    name: Chance().string({length: PET_LIMIT.category.name.max / 2}),
                },
                status: chance.pickone(PET_LIMIT.status),
                photoUrls: fillUrls(Chance().integer({
                    min: PET_LIMIT.photoUrls.urlCount.min,
                    max: PET_LIMIT.photoUrls.urlCount.max
                })),
                tags: fillTags(Chance().integer({
                    min: PET_LIMIT.tags.urlCount.minValue,
                    max: PET_LIMIT.tags.urlCount.maxValue
                }))
            } : (param === DATA_OPTIONS.MAX) ? {
                    name: Chance().string({length: PET_LIMIT.name.max}),
                    id: getRandomPetId(),
                    category: {
                        id: getRandomCategoryId(),
                        name: Chance().string({length: PET_LIMIT.category.name.max}),
                    },
                    status: chance.pickone(PET_LIMIT.status),
                    photoUrls: fillUrls(PET_LIMIT.photoUrls.urlCount.max),
                    tags: fillTags(PET_LIMIT.tags.urlCount.max)
                } :
                {
                    name: Chance().string({length: 1}),
                    category: {
                        id: getRandomCategoryId(),
                        name: Chance().string({length: PET_LIMIT.category.name.min}),
                    },
                    id: getRandomPetId(),
                    status: chance.pickone(PET_LIMIT.status),
                    photoUrls: fillUrls(PET_LIMIT.photoUrls.urlCount.min),
                    tags: fillTags(PET_LIMIT.tags.urlCount.min)
                }

        if (onlyRequiredFields) {
            let filteredDataSet = {}
            for (let property in petDataSet) {
                if (PET_LIMIT.requiredFields.includes(property)) {
                    filteredDataSet[property] = petDataSet[property]
                }
            }
            return filteredDataSet
        } else {
            return petDataSet
        }
    }


    export const boundaryValue = (param) => {
        if (param === 1)
        { let dataSet = getPetRequestData();
            dataSet.name = Chance().string({length: PET_LIMIT.name.max + 1});}
        if (param === 2)
        { let dataSet = getPetRequestData();
        dataSet.category.name = Chance().string({length: PET_LIMIT.category.name.max + 1});}
    if  (param === 3)
    {let dataSet = getPetRequestData();
           dataSet.photoUrls=fillUrls(PET_LIMIT.photoUrls.urlCount.max+1);}
       if (param=== 4)
       {let dataSet = getPetRequestData();
        dataSet.tags=fillTags(PET_LIMIT.tags.urlCount.maxValue+1)}
    }

    /*
    export const getPetLanguageData = (param) => {
        let petDataSet2 = (param === 1) ?
            {
                name: 'available',
                id: 1,
                category: {
                    id: 1,
                    name: 'available',
                },
                status: 'available',
                photoUrls: []

            }:
            {
                name: "但是",
                id: 2,
                category: {
                    id: 2,
                    name: "但是",
                },
                status: 'available',
                photoUrls: []

            }
    }
    */

    export const fillUrls = (count) => {
        let arr = [];
        for (let i = 0; i < count; i++) {
            arr[i] = Chance().string()
        }
        return arr;
    }

    export const fillTags = (count) => {
        let arr = [];
        for (let i = 0; i < count; i++) {
            arr[i] = {
                id: Chance().integer({min: PET_LIMIT.tags.id.minValue, max: PET_LIMIT.tags.id.maxValue}),
                name: Chance().string({length: 100})
            };
        }
        return arr;
    }

    export const getRandomPetId = () => {
        return Chance().integer({min: PET_LIMIT.id.minValue, max: PET_LIMIT.id.maxValue})
    }

    export const getRandomCategoryId = () => {
        return Chance().integer({min: PET_LIMIT.category.id.minValue, max: PET_LIMIT.category.id.maxValue})
    }

    export const getRandomRussianAlphabet = () => {
        let alphabet = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя";
        let randomString = "";

        while (randomString.length < 10) {
            index = Math.floor(Math.random() * alphabet.length);
            randomString += alphabet[index];
        }
        return randomString;
    }

    export const fillUrlsForRussian = (count) => {
        let arr = [];
        for (let i = 0; i < count; i++) {
            arr[i] = getRandomRussianAlphabet()
        }
        return arr;
    }
/*
    export const fillTagsForRussian = (count) => {
        let arr = [];
        for (let i = 0; i < count; i++) {
            arr[i] = {
                id: Chance().integer({min: PET_LIMIT.tags.id.minValue, max: PET_LIMIT.tags.id.maxValue}),
                name: getRandomRussianAlphabet()
            };
        }
        return arr;
    }

    export const fillUrlsForChinese = (count) => {
        let arr = [];
        for (let i = 0; i < count; i++) {
            arr[i] = "但是"
        }
        return arr;
    }

    export const fillTagsForChinese = (count) => {
        let arr = [];
        for (let i = 0; i < count; i++) {
            arr[i] = {
                id: Chance().integer({min: PET_LIMIT.tags.id.minValue, max: PET_LIMIT.tags.id.maxValue}),
                name: "但是"
            };
        }
        return arr;
    }
*/