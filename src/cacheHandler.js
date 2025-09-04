// cacheHandler.js
const auctionCache = {
    lastFetch: 0
};

function checkFetchTime(time) {
    const latestCache = getAuctionCache(); 
    const lastFetch = latestCache?.lastFetch || 0;

    return (!latestCache || time - lastFetch > 300000);
}

function getAuctionCache() {
    const cacheStr = localStorage.getItem("auctionCache");
    if (!cacheStr) return null;

    try {
        return JSON.parse(cacheStr);
    } catch (err) {
        console.error("Failed to parse auction cache:", err);
        return null;
    }
}


function updateAuctionCache(time){
    const cache = { lastFetch: time};
    localStorage.setItem("auctionCache", JSON.stringify(cache));
}

export { checkFetchTime, getAuctionCache, updateAuctionCache };