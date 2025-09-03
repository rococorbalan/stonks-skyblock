const XP_TO_MAX_EPIC = 18608500;
const XP_TO_MAX_LEGEN = 25353230;

class Pet {
    constructor(name, rarity) {
        this.name = name;
        this.rarity = rarity;
        // this.coinPerXp = calcCoinPerXp(rarity, priceLvlOne, priceLvlMax);
    }
}

function calcCoinPerXp(rarity, priceLvlOne, priceLvlMax) {
    if(rarity == 'EPIC') {
        return (priceLvlMax - priceLvlOne) / XP_TO_MAX_EPIC;
    }else {
        return (priceLvlMax - priceLvlOne) / XP_TO_MAX_LEGEN;
    }
}

module.exports = { Pet };