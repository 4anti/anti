console.log("Antifalls Landing Page");

// Loading Screen Blur & Fade
const element = document.getElementById("site-loading-header");

let blurPower = 15;
let delay = 1;
let opacity = 0;
element.style.opacity = opacity;
let translateY = 50;
element.style.filter = "blur(" + blurPower + "px)";

function removeBlurFade() {
    if (blurPower > 0) {
        element.style.filter = "blur(" + blurPower + "px)";
        element.style.opacity = opacity;
        blurPower = blurPower - 0.12;
        opacity = opacity + 0.01;
        setTimeout(removeBlurFade, delay);
    }
}
removeBlurFade();





//const fonts = ["BBH Sans Hegarty", "Gravitas One", "Poller One", "Michroma", "Bodoni Moda"];
//const scalingFactors = {"BBH Sans Hegarty": 1.0, "Gravitas One": 0.95, "Poller One": 1, "Michroma": 0.85, "Bodoni Moda": 1};
//let delay = 50;
//let currentindex = 0;
//function cycleFonts() {
// const fontName = fonts[currentindex];
// element.style.fontFamily = fontName;
// currentindex = (currentindex + 1) % fonts.length;
// delay = delay * 1.3;
// if (delay <= 500) {setTimeout(cycleFonts, delay)
// ;}}