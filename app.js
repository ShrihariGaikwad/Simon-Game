let game = document.querySelector("#game");
let colors = document.querySelectorAll(".color");
let body = document.querySelector('body');
let h2 = document.querySelector("h2");
let h3 = document.querySelector('h3');
let gameSeq = [];
let userSeq = [];
let highestScore = 0;

let started = false;
let level = 0;
document.addEventListener("keypress", function() {
    if(started == false && level == 0){
        started = true;
        levelUp();
    }
})

function gameFlash(btn) {
    btn.classList.add("gameFlash");
    setTimeout(function() {
        btn.classList.remove("gameFlash");
    }, 250);
}

function userFlash(btn) {
    btn.classList.add("userFlash");
    setTimeout(function() {
        btn.classList.remove("userFlash");
    }, 250);
}

function checkAns(idx) {
    
    if(userSeq[idx] === gameSeq[idx]) {
        if(userSeq.length == gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    }else {
        h2.innerHTML = `Game Over! Your Score was <b>${level}</b> <br>press any key to start`;
        body.style.backgroundColor = 'red'
        if(level > highestScore) {
        highestScore = level;
        }
        h3.innerText = `Your high score is ${highestScore}`;
        gameReset();
    }
}

function btnpress() {
    let btn = this;
    userFlash(btn);

    let userAns = Number(btn.innerText);
    userSeq.push(userAns);
    
    checkAns(userSeq.length - 1);
}

function levelUp(){
    userSeq = [];
    level++;
    h2.innerText = `level ${level}`;   
    let randomNumber = Math.floor(Math.random() * 4 + 1);
    gameSeq.push(randomNumber);
    let btn = document.querySelector(`.color${randomNumber}`);
    gameFlash(btn);
}

for(color of colors) {
    color.addEventListener('click', btnpress);
}

function gameReset(){
    gameSeq = [];
    level = 0;
    started = false;
    userSeq = [];
    setTimeout(() => {
        body.style.backgroundColor = '';
    }, 150);
}