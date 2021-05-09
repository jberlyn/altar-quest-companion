const applicationVersion = "1.0.0";

let utilityService = new UtilityService();
let pageService = new PageService();
let settingsService = new SettingsService();
let tokenTrackerService = new TokenTrackerService();

let updatePanelCallback;

$(document).ready(function () {
    // Update the version number.
    $("#applicationVersion").text("Version " + applicationVersion);

    // Load the user settings.
    settingsService.loadSettings();

    // Enable tooltips via Bootstrap and Popper.
    $(function () {
        $('[data-toggle="tooltip"]').tooltip();
    });

    // Load the home page.
    pageService.changePage("home");

    // Initialise each page.
    initDiceRoller();
});

function showUpdatePanel(callbackObject) {
    updatePanelCallback = callbackObject;
    $("#updatePanel").removeClass("d-none");
    $("#updatePanel").addClass("d-block");
}

function updateApp() {
    updatePanelCallback.onAccept();
}