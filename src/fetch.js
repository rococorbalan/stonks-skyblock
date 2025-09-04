// fetch.js
import { PetList, addPet, getPetLists, setPetList, setPetLists } from "./petObject";
import { checkFetchTime, getAuctionCache, updateAuctionCache } from "./cacheHandler";

let totalPages;


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
    const now = Date.now();

    if(checkFetchTime(now)){
        console.log('fetching')
        try {
            const res = await fetch(`https://api.hypixel.net/v2/skyblock/auctions?page=${page}`);
            if(!res.ok) throw new Error('HTTP error ' + res.status);
            const data = await res.json();

            totalPages = data.totalPages;

            for(let a of data.auctions){
                if (a.bin && (a.tier == 'EPIC' || a.tier == 'LEGENDARY') && ((a.item_name).startsWith('[Lvl 1]') || (a.item_name).startsWith('[Lvl 100]'))) {
                    addPet(a);
                }
            }
            updateAuctionCache(now, data);
        } catch (err) {
            console.error('Failed to fetch auction data: ', err);
        }
        
    }else {
        console.log('cache');
        const cacheList = localStorage.getItem("petLists");
        if (!cacheList) return null;
        try {
            setPetLists(JSON.parse(cacheList))
        } catch (err) {
            console.error("Failed to parse auction cache:", err);
        }
    }
}

//async function getAllAuction(totalPages){
//    for(let i = 0; i < totalPages; )
//}

export { getAuctionPage }