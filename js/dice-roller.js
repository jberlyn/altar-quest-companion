const diceFaces = ["success", "focus", "focus-success", "critical"];
const possibleResults = ["success", "success", "success", "focus", "focus-success", "critical"];

let diceRollerManager;
let diceCount;
let diceResults;

// Initialises the dice roller.
function initDiceRoller() {
    resetDiceRoller();
}

// Resets the dice roller to its initial state.
function resetDiceRoller() {

    diceCount = 1;

    diceRollerManager = [
        { interval: null, animationCount: 0, animationStep: 0, result: "", rolling: false },
        { interval: null, animationCount: 0, animationStep: 0, result: "", rolling: false },
        { interval: null, animationCount: 0, animationStep: 0, result: "", rolling: false },
        { interval: null, animationCount: 0, animationStep: 0, result: "", rolling: false },
        { interval: null, animationCount: 0, animationStep: 0, result: "", rolling: false }
    ]

    $("#rollDiceButton").text("Roll Dice");
    $("#rollDiceButton").attr("disabled", false);
    $("#decreaseDiceButton").attr("disabled", false);
    $("#increaseDiceButton").attr("disabled", false);
    for (let i = 1; i < 6; i++) {
        $("#dice" + i).attr("src", "./img/dice-success.png");
        $("#dice" + i).removeClass("dice-critical");
    }

    updateDiceCountDisplay();

    resetDiceResults();

}

// Updates the dice count value in the DOM.
// Updates the amount of dice images displayed in the DOM.
function updateDiceCountDisplay() {
    $("#diceCount").attr("value", diceCount);
    for (let i = 1; i < 6; i++) {
        $("#dice" + i).addClass("d-none");
    }
    for (let i = 1; i < 6; i++) {
        if (i <= diceCount) {
            $("#dice" + i).removeClass("d-none");
        }
    }
}

// Increase the dice count value by one.
// There is a maximum of five dice.
function increaseDiceCount() {
    if (diceCount == 5) {
        return;
    }
    diceCount++;
    updateDiceCountDisplay();
}

// Decrease the dice count value by one.
// There is a minimum of one dice.
function decreaseDiceCount() {
    if (diceCount == 1) {
        return;
    }
    diceCount--;
    updateDiceCountDisplay();
}

// Resets the dice results and hides the dice results panel.
function resetDiceResults() {
    diceResults = { success: 0, focus: 0 };
    $("#diceResultsPanel").addClass("d-none");
}

// Rolls a specific dice based on the number provided.
function rollSingleDice(diceNumber) {

    if (diceRollerManager[diceNumber - 1].interval) {
        return;
    }

    let randomNumber = utilityService.getRandomNumberFromRange(1, diceFaces.length) - 1;
    diceRollerManager[diceNumber - 1].animationStep = randomNumber;

    diceRollerManager[diceNumber - 1].rolling = true;
    diceRollerManager[diceNumber - 1].interval = window.setInterval(function () { animateDice(diceNumber) }, 50);

}

// Rolls all the dice based on the dice count.
function rollDice() {

    if (checkDiceRollingStatus()) {
        return;
    }

    resetDiceResults();

    $("#rollDiceButton").text("Rolling...");
    $("#rollDiceButton").attr("disabled", true);
    $("#decreaseDiceButton").attr("disabled", true);
    $("#increaseDiceButton").attr("disabled", true);

    playDiceSound(diceCount);
    for (let i = 1; i < (diceCount + 1); i++) {
        rollSingleDice(i);
    }

}

// Animates a dice based on the dice number provided.
// While animated, the dice will change to a random dice face every
// 25 milliseconds for 1 second.
function animateDice(diceNumber) {

    let index = diceNumber - 1;

    if (diceRollerManager[index].animationCount == 20) {
        diceRollerManager[index].animationCount = 0;
        window.clearInterval(diceRollerManager[index].interval);
        diceRollerManager[index].interval = null;
        diceRollerManager[index].rolling = false;
        $("#dice" + diceNumber).attr("src", "./img/dice-" + diceRollerManager[index].result + ".png");
        checkDiceResult(diceNumber);
        return;
    }

    diceRollerManager[index].animationStep++;
    if (diceRollerManager[index].animationStep >= diceFaces.length) {
        diceRollerManager[index].animationStep = 0;
    }
    $("#dice" + diceNumber).attr("src", "./img/dice-" + diceFaces[diceRollerManager[index].animationStep] + ".png");

    let randomNumber = utilityService.getRandomNumberFromRange(1, 6) - 1;
    let randomResult = possibleResults[randomNumber];
    diceRollerManager[index].result = randomResult;

    diceRollerManager[index].animationCount++;

}

// Check the result of a dice roll.
// The result will be appended to the total dice results.
// If the roll was a critical, the user will be prompted
// to re-roll the critical dice.
function checkDiceResult(diceNumber) {

    let index = diceNumber - 1;

    if (diceRollerManager[index].result == "critical") {
        $("#dice" + diceNumber).addClass("dice-critical");
        diceResults.success++;
    }

    if (diceRollerManager[index].result == "success") {
        diceResults.success++;
    }

    if (diceRollerManager[index].result == "focus-success") {
        diceResults.success++;
        diceResults.focus++;
    }

    if (diceRollerManager[index].result == "focus") {
        diceResults.focus++;
    }

    updateResultsDisplay();

}

// Rolls a dice that has been marked as critical.
function rerollCritical(diceNumber) {

    let index = diceNumber - 1;

    if (diceRollerManager[index].result == "critical") {
        $("#dice" + diceNumber).removeClass("dice-critical");
        playDiceSound(1)
        rollSingleDice(diceNumber);
    }

}

// Updates the dice results in the DOM.
// Makes the dice results panel visible in the DOM.
// These changes will only happen if all dice have finished rolling.
function updateResultsDisplay() {

    let diceStillRolling = checkDiceRollingStatus();

    if (!diceStillRolling) {
        $("#diceResultsPanel").removeClass("d-none");
        $("#totalSuccess").text("Success: " + diceResults.success);
        $("#totalFocus").text("Focus: " + diceResults.focus);
        $("#rollDiceButton").text("Roll Dice");
        $("#rollDiceButton").attr("disabled", false);
        $("#decreaseDiceButton").attr("disabled", false);
        $("#increaseDiceButton").attr("disabled", false);
    }

}

// Checks to see if any dice are still currently rolling.
function checkDiceRollingStatus() {

    let rollingStatus = false;

    for (let i = 0; i < 5; i++) {
        if (diceRollerManager[i].rolling || diceRollerManager[i].result == "critical") {
            rollingStatus = true;
        }
    }

    return rollingStatus;

}

// Plays the sound of dice rolling.
// The sound played depends on the amount of dice specified.
function playDiceSound(amountOfDice) {

    if (settingsService.getSettings().soundEffects == false) {
        return;
    }

    let diceSound = document.getElementById("diceRollSingleAudio");
    if (amountOfDice > 1) {
        diceSound = document.getElementById("diceRollMultipleAudio");
    }
    diceSound.loop = false;
    diceSound.currentTime = 0;
    diceSound.play();

}