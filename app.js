// Initialize game variables
let gameSeq = [];
let userSeq = [];
let btns = ["yellow", "red", "purple", "green"];
let started = false;
let level = 0;
let highScore = 0;

// DOM elements
let h2 = document.querySelector("h2");
let allBtns =  document.querySelectorAll(".btn");
const virtualSpacebar = document.getElementById("virtual-spacebar");

// Event listener to start the game on spacebar press
virtualSpacebar.addEventListener("click", startGame);
document.addEventListener("keydown", function (event) {
    if (!started && (event.key === " " || event.key === "Spacebar")) {
        startGame();
    }
});

function startGame() {
    if (started == false) {
        console.log("Game is started");
        started = true;
        levelUp();
    }
}


// Event listener for button click
for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

// Flash effect for game buttons
function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash");
    }, 250);
}

// Flash effect for user-selected buttons
function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function() {
        btn.classList.remove("userflash");
    }, 250);
}

// Level up and generate new sequence
function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    // Random btn choose
    let randIdx = Math.floor(Math.random() * 3);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`)
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randBtn);
}

function checkSeq(idx) {
    if(userSeq[idx] === gameSeq[idx]) {
        if(userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 500)
        }
    }
    else {
        highScore = checkHighScore(level);
        h2.innerHTML = `Game Over! Your score is <b>${level}</b><br><b>Highest Score: ${highScore}</b><br>Press Space To Restart`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function() {
            document.querySelector("body").style.backgroundColor = "white";
        }, 200);
        reset();
    }
}

// Check and update high score
function checkHighScore(score) {
    if (score > highScore) {
      highScore = score;
    }
    return highScore;
}

function btnPress() {
    let btn = this;
    userFlash(btn);

    userColor = btn.getAttribute('id');
    userSeq.push(userColor);

    checkSeq(userSeq.length - 1);
}

for(let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}