// fetch.js
import { PetList, addPet, getPetLists, setPetList, setPetLists, slimAuction } from "./petObject";
import { checkFetchTime, getAuctionCache, updateAuctionCache } from "./cacheHandler";


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
            if (a.bin && (a.tier == 'EPIC' || a.tier == 'LEGENDARY') && 
                ((a.item_name).startsWith('[Lvl 1]') || (a.item_name).startsWith('[Lvl 100]')) && 
                (a.item_name).indexOf('✦') === -1 ) {
                    const slim = slimAuction(a);
                    addPet(slim);
            }
        }
           
        } catch (err) {
            console.error('Failed to fetch auction data: ', err);
        }
}


async function getAllAuction(){
    let totalPages = 1;
    const res = await fetch(`https://api.hypixel.net/v2/skyblock/auctions?page=0`);
    if(!res.ok) throw new Error('HTTP error ' + res.status);
    const data = await res.json();
    
    totalPages = data.totalPages;
    const now = Date.now();
    const cacheList = sessionStorage.getItem("petLists");
    if (cacheList) {
        try {
            setPetLists(JSON.parse(cacheList));
            console.log("Cache:", getPetLists());
        } catch (err) {
            console.error("Failed to parse auction cache:", err);
        }
    }
    if(checkFetchTime(now)){
        console.log(getPetLists());

        console.log('fetching');
        for(let i = 0; i < totalPages; i++){
            await getAuctionPage(i);
        }
        updateAuctionCache(now);
    }
}

export { getAuctionPage, getAllAuction }