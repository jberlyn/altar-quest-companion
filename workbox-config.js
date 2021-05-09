module.exports = {
  "globDirectory": "./",
  "globPatterns": [
    "**/*.{css,ico,png,html,js,mjs,json,wav}"
  ],
  "globIgnores": [
    "workbox-config.js"
  ],
  "swDest": "sw.js",
  "swSrc": "sw.template.js"
};