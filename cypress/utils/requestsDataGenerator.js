import {Chance} from "chance"
import {PET_LIMIT} from "./limits";

let chance = Chance()


export const DATA_OPTIONS = {MIN: "min", MAX: "max", AVERAGE: "average"}
export const POOLS = {
    RUSSIAN: 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя',
    ENGLISH: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()[]',
    CHINESE: '广西壮族自治区少数民族古籍整理出版规划领导小组'
}

export const getPetRequestData = (param = DATA_OPTIONS.AVERAGE, onlyRequiredFields = false, pool = POOLS.ENGLISH) => {
    let petDataSet = (param === DATA_OPTIONS.AVERAGE) ?
        {
            name: Chance().string({length: PET_LIMIT.name.max / 2, pool: pool}),
            id: getRandomPetId(),
            category: {
                id: getRandomCategoryId(),
                name: Chance().string({length: PET_LIMIT.category.name.max / 2, pool: pool}),
            },
            status: chance.pickone(PET_LIMIT.status),
            photoUrls: fillUrls(Chance().integer({
                min: PET_LIMIT.photoUrls.urlCount.min,
                max: PET_LIMIT.photoUrls.urlCount.max, pool
            })),
            tags: fillTags(Chance().integer({
                min: PET_LIMIT.tags.urlCount.minValue,
                max: PET_LIMIT.tags.urlCount.maxValue, pool
            }))
        } : (param === DATA_OPTIONS.MAX) ? {
                name: Chance().string({length: PET_LIMIT.name.max, pool: pool}),
                id: getRandomPetId(),
                category: {
                    id: getRandomCategoryId(),
                    name: Chance().string({length: PET_LIMIT.category.name.max, pool: pool}),
                },
                status: chance.pickone(PET_LIMIT.status),
                photoUrls: fillUrls(PET_LIMIT.photoUrls.urlCount.max, pool),
                tags: fillTags(PET_LIMIT.tags.urlCount.max, pool)
            } :
            {
                name: Chance().string({length: PET_LIMIT.name.min, pool: pool}),
                category: {
                    id: getRandomCategoryId(),
                    name: Chance().string({length: PET_LIMIT.category.name.min, pool: pool}),
                },
                id: getRandomPetId(),
                status: chance.pickone(PET_LIMIT.status),
                photoUrls: fillUrls(PET_LIMIT.photoUrls.urlCount.min, pool),
                tags: fillTags(PET_LIMIT.tags.urlCount.min, pool)
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


export const fillUrls = (count, pool) => {
    let arr = [];
    for (let i = 0; i < count; i++) {
        arr[i] = Chance().string({pool: pool})
    }
    return arr;
}

export const fillTags = (count, pool) => {
    let arr = [];
    for (let i = 0; i < count; i++) {
        arr[i] = {
            id: Chance().integer({min: PET_LIMIT.tags.id.minValue, max: PET_LIMIT.tags.id.maxValue}),
            name: Chance().string({length: 100, pool: pool})
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
