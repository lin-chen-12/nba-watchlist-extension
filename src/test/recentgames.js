// balldontlie - recent games

import { BalldontlieAPI } from "@balldontlie/sdk";

const api = new BalldontlieAPI({
  apiKey: "06f13a32-e40b-491f-a187-8e2f1c724784",
});

const teamId = 11; //atl hawks
const perPage = 5; // Number of recent games to fetch
const endDate = new Date().toISOString().slice(0, 10); // Today's date (YYYY-MM-DD)
const startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) // 30 days ago
  .toISOString()
  .slice(0, 10);


const url = `https://api.balldontlie.io/v1/games?team_ids[]=1`;

fetch(url, {
  headers: {
    'Authorization': 'Bearer 06f13a32-e40b-491f-a187-8e2f1c724784'
  }
})
  .then((response) => response.json())
  .then((data) => {
    console.log(data.data);
    console.log("number of games: "+ data.data.length);
        
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });