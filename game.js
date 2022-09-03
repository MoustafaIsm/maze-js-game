gameStarted = false;
gameEnded = false;
gameStatus = "";
score = 0;

document.addEventListener("DOMContentLoaded", function() {

    // Variables intializing
    game = document.getElementById("game");
    start = document.getElementById("start");
    end = document.getElementById("end");
    boundries = document.getElementsByClassName("boundary");
    statusElement = document.getElementById("status");

    // Event listener
    start.addEventListener("mouseover", startGame);
    start.addEventListener("click", resetGame);
    game.addEventListener("mouseleave", mouseLeftTheGame);
    end.addEventListener("mouseover", endGame);
    for (let i = 0; i < boundries.length; i++) {
        boundries[i].addEventListener("mouseover", mouseOverBoundries);
    }
}, false);

function chechIfGameStarted () {
    return gameStarted;
}

function checkIfGameEnded () {
    return gameEnded;
}

function startGame () {
    if (!checkIfGameEnded()) {
        gameStarted = true;
        score = 0;
        statusElement.innerHTML = "Game started ... Score: " + score;

    }
}

function endGame() {
    if (chechIfGameStarted()) {
        score += 5
        statusElement.innerHTML = "You Won ... Score: " + score;
        statusElement.style.color = "green";
        gameStarted = false;
        gameEnded = true;
    }
}

function resetGame () {
    statusElement.innerHTML = "Begin by moving your mouse over the \"S\".";
    statusElement.style.color = "black";
    resetBoundaries();
    gameEnded = false;
}

function mouseOverBoundries () {
    if (chechIfGameStarted()) {
        gameLost();
    }
}

function mouseLeftTheGame () {
    if (chechIfGameStarted()) {
        gameLost();
    }
}

function gameLost() {
    score -= 10;
    statusElement.innerHTML = "You Lost ... Score: " + score;
    statusElement.style.color = "red";
    gameStarted = false;
    gameEnded = true;
    makeBoundariesRed();
}

function makeBoundariesRed() {
    for (let i = 0; i < boundries.length; i++) {
        if (i != getIndexOfExampleBoundary(boundries)) {
            boundries[i].style.backgroundColor  = "red";
        }
    }
}

function resetBoundaries() {
    sample = getIndexOfExampleBoundary(boundries);
    for (let i = 0; i < boundries.length; i++) {
        boundries[i].style.backgroundColor = boundries[sample].style.backgroundColor;
    }
}

function getIndexOfExampleBoundary(b) {
    for (let i = 0; i < b.length; i++) {
        if (b[i].classList.contains("example")) {
            return i;
        } else {
            continue;
        }
    }
    return -1;
}