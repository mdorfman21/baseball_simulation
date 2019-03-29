var names = require("people-names");

//each team needs these 9 players
var positions = [
  "pitcher",
  "catcher",
  "1b",
  "2b",
  "shortstop",
  "3b",
  "lf",
  "cf",
  "rf"
];

var state = {
  currentBatter: 0,
  outs: 0,
  inning: 1,
  homeTeamBatting: false,
  awayTeamBatting: true,
  onFirst: false,
  onSecond: false,
  onThird: false,
  home: {
    score: 0
  },
  away: {
    score: 0
  }
};

//make the teams' empty array to push the player objects to
var homeTeam = [];
var awayTeam = [];

function Player(position) {
  this.position = position;
  this.battingAverage = Math.random() / 2;
  this.sluggingAverage = Math.random() / 2;
  this.name = names.maleRandomDe();
}

Player.prototype.printStats = function() {
  for (var key in this) {
    if (this.hasOwnProperty(key)) {
      console.log(key, ":", this[key]);
    }
  }
};

Player.prototype.atBat = function() {
  var strike = 0;
  var hit = 0;
  while (strike < 3 && hit < 1 && state.outs < 3) {
    var pitch = Math.random() / 4;
    switch (true) {
      case pitch <= this.battingAverage:
        console.log("hit!");
        hit++;
        nextBatter(homeTeam, state).atBat();
        break;
      case pitch > this.battingAverage:
        console.log("strike!");
        strike++;
        if (strike === 3) {
          console.log("You have ", strike, "strikes, You're Out!");
          state.outs++;
          nextBatter(homeTeam, state).atBat();
        } else {
          console.log("You have ", strike, "strikes");
          break;
        }
    }
  }
};

function nextBatter(team, state) {
  if (state.currentBatter + 1.1 > team.length) {
    state.currentBatter = 0;
    console.log("YOU GOT HERE");
    console.log(state.currentBatter);
    console.log(team.length);
    return team[state.currentBatter];
  } else {
    state.currentBatter++;
    console.log(state.currentBatter);
    console.log(team.length);
    return team[state.currentBatter];
  }
}

var count = 0;
function assignTeams(count) {
  for (var i = 0; i < 2; i++) {
    positions.forEach(position => {
      var player = new Player(position);
      player.printStats();
      if (count === 0) {
        homeTeam.push(player);
      } else {
        awayTeam.push(player);
      }
    });
    count++;
  }
}

function single(team, state) {
  switch (true) {
    case state.onThird === true &&
      state.onSecond === true &&
      state.onFirst === true:
      state[team].score++;
      basesLoaded();
      break;
    case state.onThird === true && state.onSecond === true:
      state[team].score++;
      firstAndThird();
      break;
    case state.onSecond === true && state.onFirst === true:
      basesLoaded();
      break;
    case state.onThird === true && state.onFirst === true:
      state[team].score++;
      firstAndSecond();
      break;
    case state.onThird === true:
      state[team].score++;
      first();
      break;
    case state.onSecond === true:
      firstAndThird();
      break;
    case state.onFirst === true:
      firstAndSecond();
      break;
    default:
      first();
      break;
  }
}

function double(team, state) {
  switch (true) {
    case state.onThird === true &&
      state.onSecond === true &&
      state.onFirst === true:
      state[team].score += 2;
      secondAndThird();
      break;
    case state.onThird === true && state.onSecond === true:
      state[team].score += 2;
      second();
      break;
    case state.onSecond === true && state.onFirst === true:
      secondAndThird();
      break;
    case state.onThird === true && state.onFirst === true:
      state[team].score++;
      secondAndThird();
      break;
    case state.onThird === true:
      state[team].score++;
      second();
      break;
    case state.onSecond === true:
      state[team].score++;
      second();
      break;
    case state.onFirst === true:
      secondAndThird();
      break;
    default:
      second();
      break;
  }
}

function triple(team, state) {
  switch (true) {
    case state.onThird === true &&
      state.onSecond === true &&
      state.onFirst === true:
      state[team].score += 3;
      third();
      break;
    case state.onThird === true && state.onSecond === true:
      state[team].score += 2;
      third();
      break;
    case state.onSecond === true && state.onFirst === true:
      state[team].score += 2;
      third();
      break;
    case state.onThird === true && state.onFirst === true:
      state[team].score += 2;
      third();
      break;
    case state.onThird === true:
      state[team].score++;
      third();
      break;
    case state.onSecond === true:
      state[team].score++;
      third();
      break;
    case state.onFirst === true:
      state[team].score++;
      third();
      break;
    default:
      third();
      break;
  }
}

function triple(team, state) {
  switch (true) {
    case state.onThird === true &&
      state.onSecond === true &&
      state.onFirst === true:
      state[team].score += 4;
      empty();
      break;
    case state.onThird === true && state.onSecond === true:
      state[team].score += 3;
      empty();
      break;
    case state.onSecond === true && state.onFirst === true:
      state[team].score += 3;
      empty();
      break;
    case state.onThird === true && state.onFirst === true:
      state[team].score += 3;
      empty();
      break;
    case state.onThird === true:
      state[team].score += 2;
      empty();
      break;
    case state.onSecond === true:
      state[team].score += 2;
      empty();
      break;
    case state.onFirst === true:
      state[team].score += 2;
      empty();
      break;
    default:
      state[team].score++;
      empty();
      break;
  }
}

function first() {
  state.onFirst = true;
  state.onSecond = false;
  state.onThird = false;
}

function second() {
  state.onFirst = false;
  state.onSecond = true;
  state.onThird = false;
}

function third() {
  state.onFirst = false;
  state.onSecond = false;
  state.onThird = true;
}

function firstAndSecond() {
  state.onFirst = true;
  state.onSecond = true;
  state.onThird = false;
}

function firstAndThird() {
  state.onFirst = true;
  state.onSecond = false;
  state.onThird = true;
}

function secondAndThird() {
  state.onFirst = false;
  state.onSecond = true;
  state.onThird = true;
}

function basesLoaded() {
  state.onFirst = true;
  state.onSecond = true;
  state.onThird = true;
}

function empty() {
  state.onFirst = false;
  state.onSecond = false;
  state.onThird = false;
}

assignTeams(count);
console.log(homeTeam);
console.log(awayTeam);
single("away", state);
console.log(state);
