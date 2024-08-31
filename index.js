/*
Nisi hendlao predane utakmice


*/

console.log("hello world");
const fs = require("fs");

function loadTeamsAndMatches() {
  const groupsData = JSON.parse(fs.readFileSync("groups.json", "utf8"));
  const exhibitionsData = JSON.parse(
    fs.readFileSync("exibitions.json", "utf8")
  );
  return { groupsData, exhibitionsData };
}

function simulateMatches({ groupsData, exhibitionsData }) {
  let zreb = [];
  let gamesByGroup;
  for (const group in groupsData) {
    gamesByGroup = simulateGroup(group, groupsData[group]);
    makeTable(gamesByGroup);
  }

  return zreb;
}

function simulateGame(team1, team2) {
  let results = {};
  const rankDiff = team1.FIBARanking - team2.FIBARanking;
  const prob1 = 1 / (1 + Math.exp(rankDiff / 10));
  const randomOutcome = Math.random();
  const team1Wins = randomOutcome <= prob1;
  let score1 = Math.floor(Math.random() * 30) + 80;
  let score2 = Math.floor(Math.random() * 30) + 80;

  // check if these conditions are well written
  if (team1Wins) {
    if (Math.abs(rankDiff) < 4) {
      score1 = score2 + Math.floor(Math.random() * 3) + 1; // If the teams are closely ranked make sure to simulate a close game
    }
    if (score1 <= score2) {
      score1 = score2 + Math.floor(Math.random() * 10) + 1; // Ensure team A's score is higher
    }

    results = {
      Winner: team1.ISOCode,
      Loser: team2.ISOCode,
      Teams: [team1, team2],
    };
  } else {
    if (Math.abs(rankDiff) < 4) {
      score2 = score1 + Math.floor(Math.random() * 3) + 1; // If the teams are closely ranked make sure to simulate a close game
    }
    if (score1 >= score2) {
      score2 = score1 + Math.floor(Math.random() * 10) + 1; // Ensure team A's score is higher
    }

    results = {
      Winner: team2.ISOCode,
      Loser: team1.ISOCode,
      Teams: [team1, team2],
    };
  }

  team1.Score = score1;
  team2.Score = score2;
  return results;
}

function simulateGroup(group, teams) {
  let gamesByGroups = {
    Group: group,
    games: [],
  };
  for (let i = 0; i < teams.length - 1; i++) {
    for (let j = i + 1; j < teams.length; j++) {
      const team1 = teams[i];
      const team2 = teams[j];

      gamesByGroups.games.push(simulateGame(team1, team2));
    }
  }
  //console.log(gamesByGroups.games[0].Teams[0]);
  //printGames(games);
  return gamesByGroups;
}

function makeTable(gamesByGroup) {
  console.log(gamesByGroup);
}
function printGames(games) {
  for (let index = 0; index < games.length; index++) {
    const element = games[index];
    console.log(element);
  }
}
function main() {
  const { groupsData, exhibitionsData } = loadTeamsAndMatches();
  const zreb = simulateMatches({ groupsData, exhibitionsData });
  //console.log(groupsData.A);
}

main();
