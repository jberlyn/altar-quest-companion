class TokenTrackerService {

    constructor() {
        this.actions = [];
        this.tokens = {};
        this.tokenTypes = ["action", "damage", "armor", "focus", "threat", "supply", "inspiration", "snare", "melody"];
        this.loadState();
    }

    // Resets all token values back to zero.
    // Resets all actions back to active.
    // Saves the state in localStorage.
    // Hides the reset confirmation modal.
    reset() {
        this.resetTokens();
        this.resetActions();
        this.saveState();
        $("#resetTokensModal").modal("hide");
    }

    // Resets all tokens back down to zero.
    // Updates the DOM with the new values.
    resetTokens() {
        this.tokens = {
            damage: 0,
            armor: 0,
            focus: 0,
            threat: 0,
            supply: 0,
            inspiration: 0,
            snare: 0,
            melody: 0
        };
        this.updateTokensOnDOM();
    }

    // Resets all actions back to active.
    // Updates the DOM with the new values.
    resetActions() {
        this.actions = [];
        for (let i = 0; i < 3; i++) {
            this.actions[i] = true;
        }
        this.updateActionsOnDOM();
    }

    // Increases the value of a token based on the type provided.
    // If the type is "focus", it will not exceed a value of 5.
    increaseTokenValue(tokenType) {
        if (tokenType == "focus" && this.tokens[tokenType] == 5) {
            return;
        }
        this.tokens[tokenType]++;
        this.updateTokensOnDOM();
        this.saveState();
    }

    // Creases the value of a token based on the type provided.
    decreaseTokenValue(tokenType) {
        if (this.tokens[tokenType] == 0) {
            return;
        }
        this.tokens[tokenType]--;
        this.updateTokensOnDOM();
        this.saveState();
    }

    // Toggles an action to either active or inactive.
    // Saves the state in localStorage.
    toggleAction(action) {
        this.actions[action] = !this.actions[action];
        this.updateActionsOnDOM();
        this.saveState();
    }

    // Show or hide token panels based on the user's settings.
    updateTokenPanelsOnDOM() {
        let tokenSettings = settingsService.getSettings().tokens;
        let allTokensDisabled = true;
        for (let i = 0; i < this.tokenTypes.length; i++) {
            let token = this.tokenTypes[i];
            $("#" + token + "TokenPanel").addClass("d-none");
            if (tokenSettings[token]) {
                allTokensDisabled = false;
                $("#" + token + "TokenPanel").removeClass("d-none");
            }
        }
        allTokensDisabled ? $("#allTokensDisabledPanel").removeClass("d-none") : $("#allTokensDisabledPanel").addClass("d-none");
    }

    // Updates all of the token values on the DOM.
    updateTokensOnDOM() {
        $("#damage").attr("value", this.tokens.damage);
        $("#armor").attr("value", this.tokens.armor);
        $("#focus").attr("value", this.tokens.focus);
        $("#threat").attr("value", this.tokens.threat);
        $("#supply").attr("value", this.tokens.supply);
        $("#inspiration").attr("value", this.tokens.inspiration);
        $("#snare").attr("value", this.tokens.snare);
        $("#melody").attr("value", this.tokens.melody);
    }

    // Updates all of the action images on the DOM.
    updateActionsOnDOM() {
        let actionsRemaining = 3;
        for (let i = 0; i < 3; i++) {
            let actionImage = "./img/action-active.png";
            if (!this.actions[i]) {
                actionsRemaining--;
                actionImage = "./img/action-inactive.png";
            }
            $("#action" + (i + 1)).attr("src", actionImage);
            $("#endTurnButton").text(actionsRemaining + " actions remaining");
            if (actionsRemaining == 1) {
                $("#endTurnButton").text(actionsRemaining + " action remaining");
            }
            $("#endTurnButton").attr("disabled", true);
        }
        if (actionsRemaining == 0) {
            $("#endTurnButton").text("End Turn");
            $("#endTurnButton").attr("disabled", false);
        }
    }

    // Load the previous state from localStorage.
    loadState() {
        let state = window.localStorage.getItem("token_tracker");
        if (state) {
            state = JSON.parse(state);
            this.tokens.damage = state.tokens.damage ? state.tokens.damage : 0;
            this.tokens.armor = state.tokens.armor ? state.tokens.armor : 0;
            this.tokens.focus = state.tokens.focus ? state.tokens.focus : 0;
            this.tokens.threat = state.tokens.threat ? state.tokens.threat : 0;
            this.tokens.supply = state.tokens.supply ? state.tokens.supply : 0;
            this.tokens.inspiration = state.tokens.inspiration ? state.tokens.inspiration : 0;
            this.tokens.snare = state.tokens.snare ? state.tokens.snare : 0;
            this.tokens.melody = state.tokens.melody ? state.tokens.melody : 0;
            this.actions = state.actions;
            this.saveState();
            this.updateTokensOnDOM();
            this.updateActionsOnDOM();
        } else {
            this.reset();
        }
    }

    // Save the current state to localStorage.
    saveState() {
        let state = {
            tokens: this.tokens,
            actions: this.actions,
        };
        window.localStorage.setItem("token_tracker", JSON.stringify(state));
    }

}