'use strict';

function match(teamA, teamB, chances) {
    let r = Math.random();
    if (r < chances.win) {
        teamA.scores += 3;
        teamA.log.push(3);
        teamB.log.push(0);
        return;
    }
    if (r < chances.draw) {
        teamA.scores++;
        teamB.scores++;
        teamA.log.push(1);
        teamB.log.push(1);
        return;
    }
    teamB.scores += 3;
    teamA.log.push(0);
    teamB.log.push(3);
    return;
}

function reset(teams) {
    for (let i = 0; i < teams.length; i++) {
        teams[i].scores = 0;
        teams[i].log = [];
    }
}

function scores(N) {
    let teams = [];
    for (let i = 0; i < 4; i++) {
        teams.push({
            id: i,
            scores: 0,
            log: []
        });
    }
    let res = new Map();
    let chances = {
        win: 0.4,
        draw: 0.6
    };
    for (let i = 0; i < N; i++) {
        match(teams[0], teams[1], chances);
        match(teams[2], teams[3], chances);
        match(teams[0], teams[2], chances);
        match(teams[1], teams[3], chances);
        match(teams[0], teams[3], chances);
        match(teams[1], teams[2], chances);
        let s = teams.map(t => t.scores);
        s.sort((a, b) => {
            return b - a;
        });
        let key = s.join('-');
        // console.log(key, teams);
        if (res.has(key)) {
            res.set(key, res.get(key)+1);
        } else {
            res.set(key, 1);
        }
        reset(teams);
    }
    console.log(res.size);
    console.log(res.keys());
}

// scores(1);
// scores(10);
// scores(100);
// scores(1000);
scores(10000);
scores(50000);
scores(80000);