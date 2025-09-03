// index.js
import { getAuctionPage, getElectionData } from "./fetch";
import { getPetLists, queryPetList } from "./petObject";

(async () => {
  await getAuctionPage(0);
  console.log(queryPetList('legendary', 'sheep'));
})();