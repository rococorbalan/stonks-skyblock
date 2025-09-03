const XP_TO_MAX_EPIC = 18608500;
const XP_TO_MAX_LEGEN = 25353230;

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

function queryPetList(rarity, name){
    const formatedRarity = rarity.toUpperCase();
    const formatedName = name.charAt(0).toUpperCase() + name.slice(1)
    const key = `${formatedRarity} ${formatedName}`;
    return petLists[key];
}

export { PetList, getPetLists, addPet, queryPetList };
