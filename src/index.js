// index.js
import { getAuctionPage, getElectionData } from "./fetch";
import { getPetLists, queryPetList, queryPetProfit } from "./petObject";

(async () => {
  await getAuctionPage(0);
  console.log(getPetLists());
  console.log(queryPetProfit('epic', 'ocelot'));
})()