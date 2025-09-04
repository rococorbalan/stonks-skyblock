// index.js
import { getAuctionPage, getAllAuction } from "./fetch";
import { getPetLists, queryPetList, queryPetProfit } from "./petObject";

(async () => {
  await getAllAuction();
  console.log(queryPetList('legendary', 'sheep'));
  console.log(queryPetProfit('legendary', 'sheep'));
})()