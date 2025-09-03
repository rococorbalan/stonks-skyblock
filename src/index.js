// index.js
import { getAuctionPage, getElectionData } from "./fetch";
import { Pet } from "./petObject";

(async () => {
  const pets = await getAuctionPage(0);
  console.log(pets);
})();