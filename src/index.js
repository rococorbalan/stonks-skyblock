// index.js
import { getAuctionPage, getAllAuction } from "./fetch";
import { getPetLists, queryPetList, queryPetProfit } from "./petObject";

(async () => {
  await getAllAuction();
  console.log(queryPetList('epic', 'baby yeti'));
  console.log(queryPetProfit('epic', 'baby yeti'));
})()