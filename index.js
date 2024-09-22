const score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    loses: 0,
    ties: 0
};

updateScore();

document.body.addEventListener('keydown', () => {
    if (event.key === 'r') {
        playgame('Rock');
    }
    else if (event.key === 'p') {
        playgame('Paper');
    }
    else if (event.key === 's') {
        playgame('Scissors');
    }
});

document.querySelector('.resetScore').addEventListener('click', () => {
    score.wins = 0;
    score.loses = 0;
    score.ties = 0;
    localStorage.removeItem('score');
    updateScore();
});

document.querySelector('.autoPlay').addEventListener('click', () => {
    autoPlay();
});

let isAutoPlaying = false;
let intervalId;

function autoPlay() {
    if (!isAutoPlaying) {
        intervalId = setInterval(() => {
            const playerMove = pickComputerMove();
            playgame(playerMove);
        }, 2000);
        isAutoPlaying = true;
        document.querySelector('.autoPlay').classList.add('go');
    }
    else {
        clearInterval(intervalId);
        isAutoPlaying = false;
        document.querySelector('.autoPlay').classList.remove('go');
    }
}

document.querySelector('.gameRock').addEventListener('click', () => {
    playgame('Rock');
});

document.querySelector('.gamePaper').addEventListener('click', () => {
    playgame('Paper');
});

document.querySelector('.gameScissors').addEventListener('click', () => {
    playgame('Scissors');
});

function playgame(playerMove) {
    let result = '';
    const computerMove = pickComputerMove();
    let pMove = '';
    let cMove = '';

    if (playerMove === 'Rock') {
        pMove = 'hand-fist';
    }
    else if (playerMove === 'Paper') {
        pMove = 'hand';
    }
    else {
        pMove = 'hand-scissors';
    }

    if (computerMove === 'Rock') {
        cMove = 'hand-fist';
    }
    else if (computerMove === 'Paper') {
        cMove = 'hand';
    }
    else {
        cMove = 'hand-scissors';
    }



    if (computerMove === playerMove) {
        result = 'Tie';
        score.ties++;
    }
    else if ((computerMove === 'Rock') && (playerMove === "Paper")) {
        result = "You Win";
        score.wins++;
    }
    else if ((computerMove === 'Rock') && (playerMove === "Scissors")) {
        result = "You Lose";
        score.loses++;
    }
    else if ((computerMove === 'Scissors') && (playerMove === "Paper")) {
        result = "You Lose";
        score.loses++;
    }
    else if ((computerMove === 'Scissors') && (playerMove === "Rock")) {
        result = "You Win";
        score.wins++;
    }
    else if ((computerMove === 'Paper') && (playerMove === "Rock")) {
        result = "You Lose";
        score.loses++;
    }
    else if ((computerMove === 'Paper') && (playerMove === "Scissors")) {
        result = "You Win";
        score.wins++;
    }
    localStorage.setItem(score, JSON.stringify(score));
    updateScore();
    document.querySelector('.your-scoreboard').innerHTML = `You:` + ` <i class="fa-solid fa-${pMove}">`;
    document.querySelector('.computer-scoreboard').innerHTML = `Computer:` + ` <i class="fa-solid fa-${cMove}">`;
    document.querySelector('.result').innerHTML = `${result}`;
    return;
}

function updateScore() {
    document.querySelector('.res').innerHTML = `Wins:${score.wins}, Losses:${score.loses}, Ties:${score.ties}`;

}

function pickComputerMove() {
    let computerMove = '';
    const randomNumber = Math.random();
    if (randomNumber >= 0 && randomNumber < (1 / 3)) {
        computerMove = 'Paper';
    }
    else if (randomNumber >= (1 / 3) && randomNumber < (2 / 3)) {
        computerMove = 'Rock';
    }
    else if (randomNumber >= (2 / 3) && randomNumber < 1) {
        computerMove = 'Scissors';
    }

    return computerMove;
}
