gameStarted = false;
gameEnded = false;
gameStatus = "";
score = 0;
level = 1;
timer = 0;

document.addEventListener("DOMContentLoaded", function () {

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

function chechIfGameStarted() {
    return gameStarted;
}

function checkIfGameEnded() {
    return gameEnded;
}

function startGame() {
    if (level <= 4) {
        timer = 60 / level;
        gameStarted = true;
        gameEnded = true;
        statusElement.innerHTML = "Level " + level + " started ... Score: " + score;
        statusElement.style.color = "black";
        startTimer(timer);
        resetBoundaries();
    }
}

function endGame() {
    if (chechIfGameStarted()) {
        score += 5
        if (level < 4) {
            statusElement.innerHTML = "You Won Level " + level + " ... Score: " + score;
        } else {
            statusElement.innerHTML = "You completed the game, click on S to reset ... Score: " + score;
        }
        statusElement.style.color = "green";
        gameStarted = false;
        gameEnded = true;
        level++;
    }
}

function resetGame() {
    score = 0;
    level = 1;
    statusElement.innerHTML = "Level " + level + " started ... Score: " + score;
    statusElement.style.color = "black";
    resetBoundaries();
    gameEnded = false;

}

function mouseOverBoundries() {
    if (chechIfGameStarted()) {
        gameLost();
    }
}

function mouseLeftTheGame() {
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
            boundries[i].style.backgroundColor = "red";
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

function startTimer(timeLeft) {
    statusText = statusElement.innerHTML;
    var downloadTimer = setInterval(function () {
        if (timeLeft <= 0) {
            gameLost();
            clearInterval(downloadTimer);
        } else if (!checkIfGameEnded() || !chechIfGameStarted()) {
            clearInterval(downloadTimer);
        } else {
            statusElement.innerHTML = statusText + " ... " + timeLeft + " seconds remaining";
        }
        timeLeft -= 1;
    }, 1000);
}