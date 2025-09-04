const XP_TO_MAX_EPIC = 18608500;
const XP_TO_MAX_LEGEN = 25353230;


class Pet {
    constructor(name, rarity, priceMinLvl, priceMaxLvl) {
        this.name = name;
        this.rarity = rarity;
        this.priceMinLvl = priceMinLvl;
        this.priceMaxLvl = priceMaxLvl;
        this.coinPerXp = calcCoinPerXp(priceMinLvl, priceMaxLvl);
        this.item = {};
    }
}


class PetList {
    constructor(name, rarity) {
        this.name = name;
        this.rarity = rarity;
        this.matchingPets = [];
    }

    tryAddPet(item) {
    const match = (item.item_name).match(/\[Lvl (\d+)\]\s+(.+)/);
    const petName = match[2];
        if (petName === this.name && item.tier === this.rarity) {
            this.matchingPets.push(item);
        }
    }
}


const petLists = {};

function addPet(item) {
    const match = (item.item_name).match(/\[Lvl (\d+)\]\s+(.+)/);
    const petName = match[2];
    const key = `${item.tier} ${[petName]}`;
    if (!petLists[key]) {
        petLists[key] = new PetList(petName, item.tier);
    }
    petLists[key].tryAddPet(item);
}



function getPetLists() {
    return petLists;
}


function queryPetList(rarity, name, level){
    const formatedRarity = rarity.toUpperCase();
    const formatedName = name.charAt(0).toUpperCase() + name.slice(1)
    const key = `${formatedRarity} ${formatedName}`;
    if(level === undefined || (level != 100 && level != 1)) {
        return petLists[key];
    }else{
        const result = petLists[key];
        result.matchingPets = petLists[key].matchingPets.filter((word) => word.item_name.startsWith(`[Lvl ${level}]`));
        return result;
    }
}



export { PetList, getPetLists, addPet, queryPetList };
