const fs = require("fs");

function loadTeamsAndMatches() {
  const groupsData = JSON.parse(fs.readFileSync("groups.json", "utf8"));
  const exhibitionsData = JSON.parse(
    fs.readFileSync("exibitions.json", "utf8")
  );
  return { groupsData, exhibitionsData };
}

function simulateGames(groupsData) {
  let prvoKolo = {
    A: [],
  };
  //console.log(groupsData);
  for (const group in groupsData) {
    const element = groupsData[group];
    console.log("------------kolo----------");
    console.log(element[0].Team + " - " + element[2].Team); // 1-3
    simulateMatches(element[0], element[2]);
    console.log(element[1].Team + " - " + element[3].Team); // 2-4
    console.log(element[0].Team + " - " + element[3].Team); // 1-4
    console.log(element[1].Team + " - " + element[2].Team); // 2-3
    console.log(element[0].Team + " - " + element[1].Team); // 1-2
    console.log(element[2].Team + " - " + element[3].Team); // 3-4
  }
}

function simulateMatches(team1, team2) {
  let result = [];
  result.push(team1, team2);
  console.log(result);
}

function main() {
  const { groupsData, exhibitionsData } = loadTeamsAndMatches();
  simulateGames(groupsData);
}

main();
