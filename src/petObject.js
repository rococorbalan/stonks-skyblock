// petObject.js

const XP_TO_MAX_EPIC = 18608500;
const XP_TO_MAX_LEGEN = 25353230;


class Pet {
    constructor(name, rarity, priceMinLvl, priceMaxLvl) {
        this.name = name;
        this.rarity = rarity;
        this.priceMinLvl = priceMinLvl;
        this.priceMaxLvl = priceMaxLvl;
        this.coinPerXp = calcCoinPerXp(priceMinLvl, priceMaxLvl, this.rarity);
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


let petLists = {};

function addPet(item) {
    const match = (item.item_name).match(/\[Lvl (\d+)\]\s+(.+)/);
    const petName = match[2];
    const key = `${item.tier} ${[petName]}`;
    if (!petLists[key]) {
        petLists[key] = new PetList(petName, item.tier);
    }
    petLists[key].tryAddPet(item);
    updatePetLists(petLists);
}


function updatePetLists(list){
    sessionStorage.setItem("petLists", JSON.stringify(list));
}


function setPetLists(list){
    petLists = list;
}


function getPetLists() {
    return petLists;
}


function queryPetList(rarity, name, level){
    const formatedRarity = rarity.toUpperCase();
    const formatedName = capitalizeWords(name)
    const key = `${formatedRarity} ${formatedName}`;
    if(level === undefined || (level != 100 && level != 1)) {
        if(petLists[key] === undefined){
            console.warn('No pet found with matching criteria')
            return false;
        }else {
            return petLists[key];
        }
    }else{
        const result = petLists[key];
        if(level === 1){
            result.matchingPets = petLists[key].matchingPets.filter((word) => word.item_name.startsWith(`[Lvl 1]`));
        }else {
            result.matchingPets = petLists[key].matchingPets.filter((word) => word.item_name.startsWith(`[Lvl 100]`));
        }
        return result;
    }
}


function queryPetProfit(rarity, name){
    const formatedRarity = rarity.toUpperCase();
    const formatedName = capitalizeWords(name)

    if(queryPetList(rarity, name) !== false){
        const matchingLvlOne = queryPetList(rarity, name, 1).matchingPets;
        const matchingLvlMax = queryPetList(rarity, name, 100).matchingPets;
        
        const minPriceOne = matchingLvlOne.length > 0 
            ? Math.min(...matchingLvlOne.map(v => v.starting_bid)) 
            : Infinity;

        const minPriceMax = matchingLvlMax.length > 0 
            ? Math.min(...matchingLvlMax.map(v => v.starting_bid)) 
            : Infinity;

        const pet = new Pet(formatedName, formatedRarity, minPriceOne, minPriceMax);
        return pet;
    }else {
        return Infinity;
    }
}


function calcCoinPerXp(priceMinLvl, priceMaxLvl, rarity){
    if(rarity === 'LEGENDARY'){
        return((priceMaxLvl - priceMinLvl) / XP_TO_MAX_LEGEN)
    }else if(rarity === 'EPIC'){
        return((priceMaxLvl - priceMinLvl) / XP_TO_MAX_EPIC)
    }
}


function slimAuction(auction) {
    return {
        bin: auction.bin,
        item_lore: auction.item_lore,
        item_name: auction.item_name,
        starting_bid: auction.starting_bid,
        tier: auction.tier
    };
}



function capitalizeWords(str) {
    return str
        .split(" ")                
        .map(word => word.charAt(0).toUpperCase() + word.slice(1)) 
        .join(" ");                
}


export { PetList, getPetLists, addPet, queryPetList, queryPetProfit, setPetLists, slimAuction };
