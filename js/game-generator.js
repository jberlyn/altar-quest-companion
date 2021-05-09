const availableProducts = ["coreGame", "stretchGoals", "ruinsOfArkenspire", "theFirstFour"];

const gameComponents = {
    coreGame: {
        heroes: ["Myreen Duvall", "Quella", "Rowen Lofflin", "Sedrin Highmoor"],
        villains: ["Bolx the Belchlord", "Gert", "Wynora Morn"],
        threats: ["Frox", "Raglanders", "The Thralls"],
        altars: ["Unstable Altar", "Burning Altar", "Drowned Altar", "Storm Altar", "Quaking Altar", "Solar Altar"],
        quests: ["The Cleansing", "The Escape", "The Hunt", "The Rescue", "The Search", "The Showdown"],
        features: ["Bookshelf", "Locked Chest", "Alchemy Desk", "Weapon Rack", "Mystical Mirror", "Blessed Fountain", "Fungal Patch"]
    },
    stretchGoals: {
        heroes: ["Blake Gallows", "Gronan Bosk", "Gwyndel", "Leyson Pines", "Van Geyzer"],
        villains: ["Billy the Kindler", "Broderick Heston", "Morgan", "Rancidian", "Vivian"],
        threats: ["Bray", "Crowl", "Lunarin", "Outlaws", "Poxoid"],
        altars: ["Altar of Greed", "Altar of Disease", "Scorched Altar"],
        quests: ["In Too Deep", "Pillaging the Vault", "The Quarantine"],
        features: ["Crates", "Garbage Heap", "Cauldron", "Cage"],
    },
    ruinsOfArkenspire: {
        villains: ["The Thane of Nethander"],
        threats: ["Profaned"],
        quests: ["Into the Arkenspire"],
        features: ["Coffin", "Szera's Chosen"],
        encounters: ["Camp Ambush", "Grave Disturbances", "Inn Trouble", "The Arkenhold"]
    },
    theFirstFour: {
        heroes: ["Aeveth Namoura", "Gavin Ulrich", "Karon Harrick", "Willow Banks"]
    }
};

const spoilerComponents = {
    coreGame: {},
    stretchGoals: {},
    ruinsOfArkenspire: {
        heroes: ["Akahra"],
        altars: ["The First Altar"]
    },
    theFirstFour: {}
};

let generatedGame = {};
let playerCount = 1;
let gameType = "standard";

// Resets the game generator and displays player count prompt.
function resetGameGenerator() {

    resetPlayerCount();
    resetGameType();

    $("#createGameContainer").attr("class", "d-block");
    $("#gameTypeContainer").attr("class", "d-block");
    $("#viewGeneratedGameContainer").attr("class", "d-none");
    $("#invalidGameGeneratorContainer").attr("class", "d-none");

    if (!settingsService.getSettings().ownedProducts.coreGame) {
        $("#createGameContainer").attr("class", "d-none");
        $("#invalidGameGeneratorContainer").attr("class", "d-block");
    }

    if (!settingsService.getSettings().ownedProducts.ruinsOfArkenspire) {
        $("#gameTypeContainer").attr("class", "d-none");
    }

}

// Increases the player count by one.
// Play count cannot go above four as per the game rules.
function increasePlayerCount() {
    if (playerCount == 4) {
        return;
    }
    playerCount++;
    updatePlayerCount();
}

// Decreases the player count by one.
function decreasePlayerCount() {
    if (playerCount == 1) {
        return;
    }
    playerCount--;
    updatePlayerCount();
}

// Updates the player count in the DOM.
function updatePlayerCount() {
    $("#playerCount").attr("value", playerCount);
}

// Resets the player count to one.
function resetPlayerCount() {
    playerCount = 1;
    updatePlayerCount();
}

// Selects the game type.
function selectGameType(type) {
    gameType = type;
    updateGameTypeDisplay();
}

// Updates the game type selection in the DOM.
function updateGameTypeDisplay() {
    $("#standardGameButton").attr("class", "btn btn-secondary btn-lg btn-block");
    $("#encounterGameButton").attr("class", "btn btn-secondary btn-lg btn-block");
    $("#standardGameButtonIcon").attr("class", "fa fa-fw fa-times");
    $("#encounterGameButtonIcon").attr("class", "fa fa-fw fa-times");
    if (gameType == "standard") {
        $("#standardGameButton").attr("class", "btn btn-success btn-lg btn-block");
        $("#standardGameButtonIcon").attr("class", "fa fa-fw fa-check");
    } else {
        $("#encounterGameButton").attr("class", "btn btn-success btn-lg btn-block");
        $("#encounterGameButtonIcon").attr("class", "fa fa-fw fa-check");
    }
}

// Resets the game type selection to Standard.
function resetGameType() {
    gameType = "standard";
    updateGameTypeDisplay();
}

// Retrieves the list of available components based upon the specified type.
// The results depend on the products owned by the user.
// If spoilers are enabled, that content will also be included.
function getAvailableComponentsByType(type) {
    let availableComponents = [];

    if (!type) {
        return availableComponents;
    }

    for (let i = 0; i < availableProducts.length; i++) {
        const product = availableProducts[i];
        if (settingsService.getSettings().ownedProducts[product]) {
            let components = gameComponents[product][type];
            if (components) {
                availableComponents = availableComponents.concat(gameComponents[product][type]);
            }
            if (settingsService.getSettings().includeSpoilers) {
                components = spoilerComponents[product][type];
                if (components) {
                    availableComponents = availableComponents.concat(spoilerComponents[product][type]);
                }
            }
        }
    }

    return availableComponents;
}

// Returns a list of random heroes from the available components.
function getRandomHeroes(playerCount) {
    let randomHeroes = [];
    let availableHeroes = getAvailableComponentsByType("heroes");
    for (let i = 0; i < playerCount; i++) {
        let randomNumber = utilityService.getRandomNumberFromRange(1, availableHeroes.length) - 1;
        randomHeroes.push(availableHeroes[randomNumber]);
        availableHeroes.splice(randomNumber, 1);
    }
    return randomHeroes;
}

// Returns a random villain from the available components.
function getRandomVillain() {
    let availableVillains = getAvailableComponentsByType("villains");
    let randomNumber = utilityService.getRandomNumberFromRange(1, availableVillains.length) - 1;
    return availableVillains[randomNumber];
}

// Returns a random threat from the available components.
function getRandomThreat() {
    let availableThreats = getAvailableComponentsByType("threats");
    let randomNumber = utilityService.getRandomNumberFromRange(1, availableThreats.length) - 1;
    return availableThreats[randomNumber];
}

// Returns a random quest from the available components.
function getRandomQuest() {
    let availableQuests = getAvailableComponentsByType("quests");
    let randomNumber = utilityService.getRandomNumberFromRange(1, availableQuests.length) - 1;
    return availableQuests[randomNumber];
}

// Returns a random encounter from the available components.
function getRandomEncounter() {
    let availableEncounters = getAvailableComponentsByType("encounters");
    let randomNumber = utilityService.getRandomNumberFromRange(1, availableEncounters.length) - 1;
    return availableEncounters[randomNumber];
}

// Returns a random altar from the available components.
function getRandomAltar() {
    let availableAltars = getAvailableComponentsByType("altars");
    let randomNumber = utilityService.getRandomNumberFromRange(1, availableAltars.length) - 1;
    return availableAltars[randomNumber];
}

// Returns a list of random features from the available components.
// This will always return 8 features, included the Altar Found card.
function getRandomFeatures() {
    let randomFeatures = [];
    let availableFeatures = getAvailableComponentsByType("features");
    for (let i = 0; i < 7; i++) {
        let randomNumber = utilityService.getRandomNumberFromRange(1, availableFeatures.length) - 1;
        randomFeatures.push(availableFeatures[randomNumber]);
        availableFeatures.splice(randomNumber, 1);
    }
    randomFeatures.push("Altar Found");
    return randomFeatures;
}

// Generates a random game based on the products the user owns.
function generateGame() {
    generatedGame = {};

    generatedGame.type = gameType;

    generatedGame.heroes = getRandomHeroes(playerCount);
    generatedGame.villain = getRandomVillain();
    generatedGame.threat = getRandomThreat();

    if (gameType == "standard") {
        generatedGame.quest = getRandomQuest();
        generatedGame.altar = getRandomAltar();
        generatedGame.features = getRandomFeatures();
    } else {
        generatedGame.encounter = getRandomEncounter();
    }

    $("#createGameContainer").attr("class", "d-none");
    $("#viewGeneratedGameContainer").attr("class", "d-block");

    updateGameValues();

    utilityService.scrollToTopOfPage();
}


// Updates all of the generated games values in the DOM.
function updateGameValues() {

    // Reset all panels to be visible.
    $("#generatedGameQuestPanel").removeClass("d-none");
    $("#generatedGameAltarPanel").removeClass("d-none");
    $("#generatedGameEncounterPanel").removeClass("d-none");
    $("#generatedGameFeaturesPanel").removeClass("d-none");

    // Update the heroes, villain and threat values.
    $("#generatedGameHeroes").empty();
    for (let i = 0; i < generatedGame.heroes.length; i++) {
        $("#generatedGameHeroes").append("<li>" + generatedGame.heroes[i] + "</li>");
    }
    $("#generatedGameVillain").text(generatedGame.villain);
    $("#generatedGameThreat").text(generatedGame.threat);

    // If the game type is Standard, update the quest, altar and features values.
    // Otherwise hide those elements and show the encounters panel with values.
    if (generatedGame.type == "standard") {
        $("#generatedGameQuest").text(generatedGame.quest);
        $("#generatedGameAltar").text(generatedGame.altar);

        if (settingsService.getSettings().includeFeaturesDeck) {
            $("#generatedGameFeatures").empty();
            for (let i = 0; i < generatedGame.features.length; i++) {
                $("#generatedGameFeatures").append("<li>" + generatedGame.features[i] + "</li>");
            }
        } else {
            $("#generatedGameFeaturesPanel").addClass("d-none");
        }

        $("#generatedGameEncounterPanel").addClass("d-none");
    } else {
        $("#generatedGameEncounter").text(generatedGame.encounter);
        $("#generatedGameQuestPanel").addClass("d-none");
        $("#generatedGameAltarPanel").addClass("d-none");
        $("#generatedGameFeaturesPanel").addClass("d-none");
    }

}
