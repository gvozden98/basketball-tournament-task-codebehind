console.log("hello world");
const fs = require("fs");
const { resourceLimits } = require("worker_threads");

function loadTeamsAndMatches() {
  const groupsData = JSON.parse(fs.readFileSync("groups.json", "utf8"));
  const exhibitionsData = JSON.parse(
    fs.readFileSync("exibitions.json", "utf8")
  );
  return { groupsData, exhibitionsData };
}

function simulateMatches({ groupsData, exhibitionsData }) {
  let zreb = [];
  let games = [];
  for (const group in groupsData) {
    console.log(`Group ${group}:`);

    for (let i = 0; i < groupsData[group].length - 1; i++) {
      for (let j = i + 1; j < groupsData[group].length; j++) {
        const team1 = groupsData[group][i];
        const team2 = groupsData[group][j];
        games.push(simulateGame(team1, team2));
      }
    }
  }
  //console.log(games);
  return zreb;
}

function simulateGame(team1, team2) {
  let results = {};
  //console.log(team1, team2);
  //console.log(team1.Team + " vs " + team2.Team);
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

    results = { Winner: team1.Team, Teams: [team1, team2] };
  } else {
    if (Math.abs(rankDiff) < 4) {
      score2 = score1 + Math.floor(Math.random() * 3) + 1; // If the teams are closely ranked make sure to simulate a close game
    }
    if (score1 >= score2) {
      score2 = score1 + Math.floor(Math.random() * 10) + 1; // Ensure team A's score is higher
    }

    results = { Winner: team2.Team, Teams: [team1, team2] };
  }
  team1.Score = score1;
  team2.Score = score2;
  console.log(rankDiff);
  //   console.log(
  //     team1Wins +
  //       " " +
  //       probA +
  //       "skor " +
  //       team1.Team +
  //       " vs " +
  //       team2.Team +
  //       " -> " +
  //       score1 +
  //       " " +
  //       score2
  //   );

  console.log(results);
  return results;
}
function main() {
  const { groupsData, exhibitionsData } = loadTeamsAndMatches();
  const zreb = simulateMatches({ groupsData, exhibitionsData });
  //console.log(groupsData.A);
}

main();
