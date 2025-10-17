console.log("Antifalls Landing Page");

// Auto-create letter spans
const element = document.getElementById("site-loading-header");
const text = element.textContent;
element.innerHTML = '';

// Create spans for each letter
const letters = [];
for (let i = 0; i < text.length; i++) {
    if (text[i] !== ' ') { // Skip spaces
        const span = document.createElement('span');
        span.className = 'letter';
        span.textContent = text[i];
        span.style.display = 'inline-block';
        span.style.position = 'relative'; // Use relative positioning
        element.appendChild(span);
        letters.push(span);
    }
}

// Animation parameters for each letter
let letterAnimations = [];

// Initialize each letter's animation state
letters.forEach((letter, index) => {
    letterAnimations[index] = {
        blurPower: 17,
        delay: 1,
        opacity: 0.01,
        translateY: 200,
        element: letter,
        startDelay: index * 150
    };

    // Set initial styles - use transform with just translateY
    letter.style.opacity = 0.01;
    letter.style.filter = "blur(17px)";
    letter.style.transform = "translateY(" + 200 + "px)"; // Only move vertically
});

// Animation function (your exact style)
function removeBlurFadeForLetter(letterIndex) {
    const anim = letterAnimations[letterIndex];

    if (anim.blurPower > -1) {
        anim.element.style.filter = "blur(" + anim.blurPower + "px)";
        anim.element.style.opacity = anim.opacity;
        anim.element.style.transform = "translateY(" + anim.translateY + "px)"; // Only vertical movement

        anim.blurPower = anim.blurPower - (0.12 * 1.01);
        anim.opacity = anim.opacity * 1.04;
        anim.translateY = anim.translateY * 0.98;

        setTimeout(() => removeBlurFadeForLetter(letterIndex), anim.delay);
    }
}

// Start animations with staggered delays
letters.forEach((letter, index) => {
    setTimeout(() => {
        removeBlurFadeForLetter(index);
    }, letterAnimations[index].startDelay);
});
