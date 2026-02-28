const wordList = [
"focus","dream","create","success","future","learn","build","design",
"code","explore","improve","practice","achieve","develop","logic",
"energy","growth","vision","passion","innovation","progress","skill",
"challenge","believe","inspire","adapt","power","speed",
"keyboard","engineer","student","technology","frontend","backend",
"javascript","coding","developer","project","commit","github",
"interface","experience","designing","creative","solution","debug",
"optimize","system","network","cloud","database","algorithm",
"performance","interactive","modern","digital","automation",
"software","hardware","analysis","security","upgrade"
];

let currentWord = "";
let score = 0;
let time = 5;
let timerInterval;
let gameRunning = false;

const wordDisplay = document.getElementById("quote");
const input = document.getElementById("input");

function randomWord(){
    return wordList[Math.floor(Math.random()*wordList.length)];
}

function startGame(){

    score = 0;
    time = 5;
    gameRunning = true;

    input.disabled = false;
    input.value = "";
    input.focus();

    document.getElementById("speed").innerText = score;
    document.getElementById("accuracy").innerText = 0;

    nextWord();

    clearInterval(timerInterval);

    timerInterval = setInterval(()=>{
        time--;
        document.getElementById("time").innerText = time;

        if(time <= 0){
            gameOver();
        }
    },1000);
}

function nextWord(){
    currentWord = randomWord();
    wordDisplay.innerText = currentWord;
    input.value="";
}

input.addEventListener("input", () => {

    if(!gameRunning) return;

    let typed = input.value;
    let correctChars = 0;

    for(let i = 0; i < typed.length; i++){
        if(typed[i] === currentWord[i]){
            correctChars++;
        }
    }

    let accuracy =
        typed.length === 0
        ? 0
        : Math.floor((correctChars / typed.length) * 100);

    document.getElementById("accuracy").innerText = accuracy;

    // Visual feedback
    if(accuracy > 80){
        input.style.border = "2px solid lime";
    } else {
        input.style.border = "2px solid red";
    }

    // Correct word typed
    if(typed.trim() === currentWord){

        score++;
        document.getElementById("speed").innerText = score;

        time = 5; // reset timer
        nextWord();
    }
});

function gameOver(){

    gameRunning = false;
    clearInterval(timerInterval);

    wordDisplay.innerText = "💀 Game Over!";
    input.disabled = true;

    alert("Final Score: " + score);
}

function restartGame(){

    clearInterval(timerInterval);

    gameRunning = false;

    wordDisplay.innerText = "Click Start to Play 🚀";
    input.value="";
    input.disabled=true;

    document.getElementById("time").innerText=0;
    document.getElementById("speed").innerText=0;
    document.getElementById("accuracy").innerText=0;
}
