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
  outs: 0
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

assignTeams(count);
console.log(homeTeam);
console.log(awayTeam);
homeTeam[0].atBat();
