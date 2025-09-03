// fetch.js
import { PetList, addPet, getPetLists } from "./petObject";
async function getElectionData() {
    try {
        const res = await fetch('https://api.hypixel.net/v2/resources/skyblock/election');
        if (!res.ok) throw new Error('HTTP error ' + res.status);
        const data = await res.json();

        console.log('API success:', data.success);
        console.log('Last updated:', data.lastUpdated);
        console.log('Mayor info:', data.mayor);
        console.log('Current election:', data.current);
    } catch (err) {
        console.error('Failed to fetch election data:', err);
    }
}


async function getAuctionPage(page) {
    try {
        const res = await fetch(`https://api.hypixel.net/v2/skyblock/auctions?page=${page}`);
        if(!res.ok) throw new Error('HTTP error ' + res.status);
        const data = await res.json();

        for(let a of data.auctions){
            if (a.bin && (a.tier == 'EPIC' || a.tier == 'LEGENDARY') && ((a.item_name).startsWith('[Lvl 1]') || (a.item_name).startsWith('[Lvl 100]'))) {
                addPet(a);
            }
        }
    } catch (err) {
        console.error('Failed to fetch auction data: ', err);
    }
}

export { getAuctionPage }