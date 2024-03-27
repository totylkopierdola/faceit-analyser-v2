const classNames = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

const formatDate = (timestamp) => {
  try {
    const dateObj = new Date(timestamp);
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDateString = dateObj.toLocaleDateString("en-US", options);

    const dayPart = formattedDateString.split(" ")[1];
    let day = parseInt(dayPart);

    let suffix;
    if (day === 1 || day === 21 || day === 31) {
      suffix = "st";
    } else if (day === 2 || day === 22) {
      suffix = "nd";
    } else if (day === 3 || day === 23) {
      suffix = "rd";
    } else {
      suffix = "th";
    }

    // Append the suffix to the day part
    const formattedDateWithSuffix = formattedDateString.replace(
      day,
      day + suffix
    );

    return "Member since " + formattedDateWithSuffix;
  } catch (error) {
    return "Invalid timestamp format";
  }
};

const countTimePostMatch = (matchDate) => {
  const matchDateObj = new Date(matchDate);
  const currentDate = new Date();

  const differenceMs = currentDate - matchDateObj;
  const differenceHours = Math.round(differenceMs / (1000 * 60 * 60));

  if (differenceHours < 24) {
    return `${differenceHours} hours ago`;
  } else if (differenceHours >= 24 && differenceHours < 48) {
    return `1 day ago`;
  } else {
    const days = Math.floor(differenceHours / 24);
    return `${days} days ago`;
  }
};

// {
//   "items": [
//     {
//       "stats": {
//         "Assists": "3",
//         "K/D Ratio": "0.57",
//         "Updated At": "2024-03-22T00:17:44.819Z",
//         "Quadro Kills": "0",
//         "Team": "team_shorstky",
//         "Best Of": "2",
//         "Winner": "35d4587d-3b18-445b-b3b6-859ba0e28565",
//         "First Half Score": "3",
//         "Competition Id": "f4148ddd-bce8-41b8-9131-ee83afcdd6dd",
//         "Second Half Score": "0",
//         "Game Mode": "5v5",
//         "Triple Kills": "1",
//         "Game": "cs2",
//         "Result": "0",
//         "MVPs": "1",
//         "Headshots": "1",
//         "Final Score": "3",
//         "Nickname": "shorstky",
//         "Match Id": "1-aaa88154-1f63-4c08-8a3c-b51a288060a7",
//         "Penta Kills": "0",
//         "Overtime score": "0",
//         "Rounds": "16",
//         "Map": "de_mirage",
//         "Match Round": "1",
//         "Region": "EU",
//         "Headshots %": "12",
//         "K/R Ratio": "0.5",
//         "Created At": "2024-03-22T00:16:14.729Z",
//         "Kills": "8",
//         "Score": "13 / 3",
//         "Player Id": "38024357-cdd4-460e-bb03-b3fcfa6575ed",
//         "Deaths": "14"
//       }
//     },
//     {
//       "stats": {
//         "Match Id": "1-60b38d95-278b-432a-9f41-b2a56bdc2091",
//         "Created At": "2024-03-21T23:41:11.537Z",
//         "Nickname": "shorstky",
//         "MVPs": "3",
//         "Assists": "8",
//         "Winner": "38024357-cdd4-460e-bb03-b3fcfa6575ed",
//         "Headshots %": "31",
//         "Team": "team_shorstky",
//         "Updated At": "2024-03-21T23:42:43.872Z",
//         "Region": "EU",
//         "Headshots": "5",
//         "First Half Score": "6",
//         "Rounds": "22",
//         "Second Half Score": "7",
//         "Player Id": "38024357-cdd4-460e-bb03-b3fcfa6575ed",
//         "Final Score": "13",
//         "Result": "1",
//         "Map": "de_vertigo",
//         "K/R Ratio": "0.73",
//         "Match Round": "1",
//         "Deaths": "12",
//         "Kills": "16",
//         "Competition Id": "f4148ddd-bce8-41b8-9131-ee83afcdd6dd",
//         "Penta Kills": "0",
//         "Game Mode": "5v5",
//         "Quadro Kills": "0",
//         "Overtime score": "0",
//         "K/D Ratio": "1.33",
//         "Game": "cs2",
//         "Triple Kills": "1",
//         "Score": "9 / 13",
//         "Best Of": "2"
//       }
//     }
//   ],
//   "start": 0,
//   "end": 20
// }

// every item is a match. i want to get an avarage of every stat from all these matches (20 of them)

const getAvarageStats = (data) => {
  if (data.length === 0) {
    return {};
  }

  let assistsTotal = 0;
  let kDRatioTotal = 0;
  let quadroKillsTotal = 0;
  let bestOfTotal = 0;
  let firstHalfScoreTotal = 0;
  let secondHalfScoreTotal = 0;
  let tripleKillsTotal = 0;
  let mvpTotal = 0;
  let headshotsTotal = 0;
  let finalScoreTotal = 0;
  let pentaKillsTotal = 0;
  let overtimeScoreTotal = 0;
  let roundsTotal = 0;
  let headshotsPercentTotal = 0;
  let killsTotal = 0;
  let deathsTotal = 0;
  let winCount = 0;

  const matches = data.items;

  // Iterate through each match
  matches.forEach((match) => {
    const stats = match.stats;
    // Accumulate values for each stat
    assistsTotal += parseInt(stats.Assists);
    kDRatioTotal += parseFloat(stats["K/D Ratio"]);
    quadroKillsTotal += parseInt(stats["Quadro Kills"]);
    bestOfTotal += parseInt(stats["Best Of"]);
    firstHalfScoreTotal += parseInt(stats["First Half Score"]);
    secondHalfScoreTotal += parseInt(stats["Second Half Score"]);
    tripleKillsTotal += parseInt(stats["Triple Kills"]);
    mvpTotal += parseInt(stats.MVPs);
    headshotsTotal += parseInt(stats.Headshots);
    finalScoreTotal += parseInt(stats["Final Score"]);
    pentaKillsTotal += parseInt(stats["Penta Kills"]);
    overtimeScoreTotal += parseInt(stats["Overtime score"]);
    roundsTotal += parseInt(stats.Rounds);
    headshotsPercentTotal += parseInt(stats["Headshots %"]);
    killsTotal += parseInt(stats.Kills);
    deathsTotal += parseInt(stats.Deaths);
    // Increment win count if the result is '1'
    if (stats.Result === "1") {
      winCount++;
    }
  });

  const totalCount = matches.length;

  // Calculate Kills Per Round (KPR)
  const kpr = killsTotal / roundsTotal;

  // Calculate averages
  const averages = {
    Assists: assistsTotal / totalCount,
    "K/D Ratio": kDRatioTotal / totalCount,
    "Quadro Kills": quadroKillsTotal / totalCount,
    "Best Of": bestOfTotal / totalCount,
    "First Half Score": firstHalfScoreTotal / totalCount,
    "Second Half Score": secondHalfScoreTotal / totalCount,
    "Triple Kills": tripleKillsTotal / totalCount,
    MVPs: mvpTotal / totalCount,
    Headshots: headshotsTotal / totalCount,
    "Final Score": finalScoreTotal / totalCount,
    "Penta Kills": pentaKillsTotal / totalCount,
    "Overtime score": overtimeScoreTotal / totalCount,
    Rounds: roundsTotal / totalCount,
    "Headshots %": headshotsPercentTotal / totalCount,
    Kills: (killsTotal / totalCount).toFixed(2),
    Deaths: deathsTotal / totalCount,
    "Win Rate": winCount / totalCount.toFixed(2), // Calculate win rate
    KPR: kpr, // Kills Per Round
  };

  console.log(averages);
  return averages;
};

export { formatDate, countTimePostMatch, classNames, getAvarageStats };
