class PageService {

    constructor() {
        this.pages = ["home", "tokenTracker", "gameGenerator", "diceRoller", "settings"];
    }

    // Adjusts the view to show the relevant page panel based
    // on the page name provided.
    changePage(pageName) {

        this.hideAllPages();

        utilityService.scrollToTopOfPage();

        $("#" + pageName + "Container").attr("class", "d-block");

        if (pageName == "home") {
            $("#pageTitle").text("Companion");
        }

        if (pageName == "tokenTracker") {
            $("#pageTitle").text("Token Tracker");
            tokenTrackerService.updateTokenPanelsOnDOM();
        }

        if (pageName == "gameGenerator") {
            $("#pageTitle").text("Game Generator");
            resetGameGenerator();
        }

        if (pageName == "diceRoller") {
            $("#pageTitle").text("Dice Roller");
            resetDiceRoller();
        }

        if (pageName == "settings") {
            $("#pageTitle").text("Settings");
            settingsService.updateSettingsOnDOM();
        }

    }

    // Hides all page panels.
    hideAllPages() {
        for (let i = 0; i < this.pages.length; i++) {
            $("#" + this.pages[i] + "Container").attr("class", "d-none");
        }
    }

}