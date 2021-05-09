class SettingsService {

    constructor() {
        this.settings = {};
    }

    getDefaultSettings() {

        let defaultSettings = {
            tokens: {
                action: true,
                damage: true,
                armor: true,
                focus: true,
                threat: false,
                supply: false,
                inspiration: false,
                snare: false,
                melody: false
            },
            ownedProducts: {
                coreGame: true,
                stretchGoals: false,
                ruinsOfArkenspire: false,
                theFirstFour: false,
            },
            includeFeaturesDeck: false,
            includeSpoilers: false,
            soundEffects: true
        }

        return defaultSettings;

    }

    getSettings() {
        return this.settings;
    }

    toggleToken(tokenType) {
        this.settings.tokens[tokenType] = !this.settings.tokens[tokenType];
        this.updateSettingsOnDOM();
        this.saveSettings();
    }

    toggleProduct(product) {
        this.settings.ownedProducts[product] = !this.settings.ownedProducts[product];
        this.updateSettingsOnDOM();
        this.saveSettings();
    }

    toggleSetting(settingName) {
        this.settings[settingName] = !this.settings[settingName];
        this.updateSettingsOnDOM();
        this.saveSettings();
    }

    // Updates the settings display in the DOM.
    updateSettingsOnDOM() {

        let tokenTypes = tokenTrackerService.tokenTypes;
        for (let i = 0; i < tokenTypes.length; i++) {
            let token = tokenTypes[i];
            $("#" + token + "TokenButton").attr("class", this.settings.tokens[token] ? "btn btn-success btn-block btn-lg" : "btn btn-danger btn-block btn-lg");
            $("#" + token + "TokenButtonIcon").attr("class", this.settings.tokens[token] ? "fa fa-fw fa-check" : "fa fa-fw fa-times");
        }

        for (let i = 0; i < availableProducts.length; i++) {
            let product = availableProducts[i];
            $("#" + product + "Button").attr("class", this.settings.ownedProducts[product] ? "btn btn-success btn-block btn-lg" : "btn btn-danger btn-block btn-lg");
            $("#" + product + "ButtonIcon").attr("class", this.settings.ownedProducts[product] ? "fa fa-fw fa-check" : "fa fa-fw fa-times");
        }

        $("#includeFeaturesDeckButton").attr("class", this.settings.includeFeaturesDeck ? "btn btn-success btn-block btn-lg" : "btn btn-danger btn-block btn-lg");
        $("#includeFeaturesDeckButtonIcon").attr("class", this.settings.includeFeaturesDeck ? "fa fa-fw fa-check" : "fa fa-fw fa-times");

        $("#includeSpoilersButton").attr("class", this.settings.includeSpoilers ? "btn btn-success btn-block btn-lg" : "btn btn-danger btn-block btn-lg");
        $("#includeSpoilersButtonIcon").attr("class", this.settings.includeSpoilers ? "fa fa-fw fa-check" : "fa fa-fw fa-times");

        $("#soundEffectsButton").attr("class", this.settings.soundEffects ? "btn btn-success btn-block btn-lg" : "btn btn-danger btn-block btn-lg");
        $("#soundEffectsButtonIcon").attr("class", this.settings.soundEffects ? "fa fa-fw fa-check" : "fa fa-fw fa-times");

    }

    resetSettings() {
        this.settings = this.getDefaultSettings();
        this.updateSettingsOnDOM();
        this.saveSettings();
    }

    // Saves the settings to localStorage.
    saveSettings() {
        window.localStorage.setItem("settings", JSON.stringify(this.settings));
    }

    // Loads the settings from localStorage.
    loadSettings() {
        let savedSettings = window.localStorage.getItem("settings");
        if (savedSettings) {
            savedSettings = JSON.parse(savedSettings);
            this.settings.tokens = savedSettings.tokens ? savedSettings.tokens : this.getDefaultSettings().tokens;
            this.settings.ownedProducts = savedSettings.ownedProducts ? savedSettings.ownedProducts : this.getDefaultSettings().ownedProducts;
            this.settings.includeFeaturesDeck = savedSettings.includeFeaturesDeck ? savedSettings.includeFeaturesDeck : this.getDefaultSettings().includeFeaturesDeck;
            this.settings.includeSpoilers = savedSettings.includeSpoilers ? savedSettings.includeSpoilers : this.getDefaultSettings().includeSpoilers;
            this.settings.soundEffects = savedSettings.soundEffects ? savedSettings.soundEffects : this.getDefaultSettings().soundEffects;
            this.saveSettings();
        } else {
            this.resetSettings();
        }
    }

}
