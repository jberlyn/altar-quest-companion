class UtilityService {

    // Returns a random number between the min and max provided.
    getRandomNumberFromRange(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    scrollToTopOfPage() {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

}
