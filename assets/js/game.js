var selectableWords =  
    [
        "minneapolis",
        "austin",
        "chicago",
        "washington",
        "albuquerque",
        "baltimore",
        "montgomery",
    ];


// max number of lives player has
const lives = 10;
// letters the player guessed
var guessedLetters = [];
// index of the current word in the array
var currentWordIndex;
// the letters being built to match the current word
var guessingWord = [];
// lives players has left
var guessesStillThere = 0;
// flag to tell if the game has started
var gameStarted = false;        
// flag for 'press any key to try again'
var hasFinished = false;   
// number of wins has player has
var wins = 0;

// reset game variables
function resetGame() {
    guessesStillThere = lives;
    gameStarted = false;

    currentWordIndex = Math.floor(Math.random() * (selectableWords.length));

    // clear out arrays
    guessedLetters = [];
    guessingWord = [];

    // build the guessing word and clear it out
    for (var i = 0; i < selectableWords[currentWordIndex].length; i++) {
        guessingWord.push("_");
    }

    document.getElementById("pressKeyTryAgain").style.cssText = "display: none";
    document.getElementById("gameover-image").style.cssText = "display: none";
    document.getElementById("youwin-image").style.cssText = "display: none";


    updateDisplay();
};

function updateDisplay() {

    document.getElementById("totalWins").innerText = wins;
    document.getElementById("currentWord").innerText = "";
    for (var i = 0; i < guessingWord.length; i++) {
        document.getElementById("currentWord").innerText += guessingWord[i];
    }
    document.getElementById("guessesStillThere").innerText = guessesStillThere;
    document.getElementById("guessedLetters").innerText = guessedLetters;
    if (guessesStillThere <= 0) {
        document.getElementById("gameover-image").style.cssText = "display: block";
        document.getElementById("pressKeyTryAgain").style.cssText = "display:block";
        hasFinished = true;
    }
};

document.onkeydown = function (event) {
    // if we finished a game this will reset
    if (hasFinished) {
        resetGame();
        hasFinished = false;
    }
    else {
        // check that A-Z was pressed to reset
        if (event.keyCode >= 65 && event.keyCode <= 90) {
            makeGuess(event.key.toLowerCase());
        }
    }
};

function makeGuess(letter) {
    if (guessesStillThere > 0) {
        if (!gameStarted) {
            gameStarted = true;
        }

        // ensures no letter gets repeated
        if (guessedLetters.indexOf(letter) === -1) {
            guessedLetters.push(letter);
            evaluateGuess(letter);
        }
    }

    updateDisplay();
    checkWin();
};

// takes letter from CurrentWordIndex and finds it in the string and replaces them in Selected Word
function evaluateGuess(letter) {
    // array to store positions of letters in string
    var positions = [];

    for (var i = 0; i < selectableWords[currentWordIndex].length; i++) {
        if (selectableWords[currentWordIndex][i] === letter) {
            positions.push(i);
        }
    }

    // if there are no indicies, remove a guess and update the hangman image
    if (positions.length <= 0) {
        guessesStillThere--;
    } else {
        // replace the '_' with a letter.
        for (var i = 0; i < positions.length; i++) {
            guessingWord[positions[i]] = letter;
        }
    }
};


function checkWin() {
    if (guessingWord.indexOf("_") === -1) {
        document.getElementById("youwin-image").style.cssText = "display: block";
        document.getElementById("pressKeyTryAgain").style.cssText = "display: block";
        wins++;
        hasFinished = true;
    }
};