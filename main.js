console.log("Antifalls Landing Page");

document.addEventListener('contextmenu', event => event.preventDefault());

// --- ANTI Animation ---
const element = document.getElementById("site-loading-header");
const text = element.textContent;
element.innerHTML = '';
const letters = [];
for (let i = 0; i < text.length; i++) {
    if (text[i] !== ' ') {
        const span = document.createElement('span');
        span.className = 'letter';
        span.textContent = text[i];
        span.style.display = 'inline-block';
        span.style.position = 'relative';
        element.appendChild(span);
        letters.push(span);
    }
}
let letterAnimations = [];
letters.forEach((letter, index) => {
    letterAnimations[index] = {
        blurPower: 17,
        delay: 1,
        opacity: 0.01,
        translateY: 200,
        element: letter,
        startDelay: index * 150
    };
    letter.style.opacity = 0.01;
    letter.style.filter = "blur(17px)";
    letter.style.transform = "translateY(200px)";
});
function removeBlurFadeForLetter(letterIndex) {
    const anim = letterAnimations[letterIndex];
    if (anim.blurPower > -1) {
        anim.element.style.filter = "blur(" + anim.blurPower + "px)";
        anim.element.style.opacity = anim.opacity;
        anim.element.style.transform = "translateY(" + anim.translateY + "px)";
        anim.blurPower = anim.blurPower - (0.12 * 1.01);
        anim.opacity = anim.opacity * 1.04;
        anim.translateY = anim.translateY * 0.98;
        setTimeout(() => removeBlurFadeForLetter(letterIndex), anim.delay);
    }
}
letters.forEach((letter, index) => {
    setTimeout(() => {
        removeBlurFadeForLetter(index);
    }, letterAnimations[index].startDelay);
});

// --- Construction Banner Wait Logic ---
const antiAnimationDuration = letterAnimations[letterAnimations.length - 1].startDelay + 200;

setTimeout(() => {
    const banner = document.getElementById('construction-banner');
    const dot = document.querySelector('.banner-dot');
    const bannerMsgElement = document.querySelector('.banner-text');

    // Pre-build the text structure but keep it invisible to prevent layout shift
    const bannerMsg = bannerMsgElement.textContent;
    bannerMsgElement.innerHTML = '';
    const bannerLetters = [];

    for (let i = 0; i < bannerMsg.length; i++) {
        if (bannerMsg[i] !== ' ') {
            const span = document.createElement('span');
            span.className = 'banner-letter';
            span.textContent = bannerMsg[i];
            span.style.display = 'inline-block';
            span.style.position = 'relative';
            span.style.opacity = '0';
            span.style.filter = "blur(17px)";
            span.style.transform = "translateY(200px)";
            bannerMsgElement.appendChild(span);
            bannerLetters.push(span);
        } else {
            bannerMsgElement.appendChild(document.createTextNode(' '));
        }
    }

    // Prepare animation data
    let bannerLetterAnimations = [];
    bannerLetters.forEach((letter, index) => {
        bannerLetterAnimations[index] = {
            blurPower: 17,
            delay: 1,
            opacity: 0.01,
            translateY: 200,
            element: letter,
            startDelay: index * 30
        };
    });

    // Show the banner
    banner.classList.add('show');

    // Wait for banner animation
    setTimeout(() => {
        dot.style.background = '#00fff8';
        dot.style.boxShadow = '0 0 22px #00fff8';

        // Wait for dot transitions
        setTimeout(() => {
            // Now animate the text
            function removeBannerBlurFadeForLetter(letterIndex) {
                const anim = bannerLetterAnimations[letterIndex];
                if (anim.blurPower > -1) {
                    anim.element.style.filter = "blur(" + anim.blurPower + "px)";
                    anim.element.style.opacity = anim.opacity;
                    anim.element.style.transform = "translateY(" + anim.translateY + "px)";
                    anim.blurPower = anim.blurPower - (0.12 * 1.01);
                    anim.opacity = anim.opacity * 1.04;
                    anim.translateY = anim.translateY * 0.98;
                    setTimeout(() => removeBannerBlurFadeForLetter(letterIndex), anim.delay);
                }
            }

            bannerLetters.forEach((letter, index) => {
                setTimeout(() => {
                    removeBannerBlurFadeForLetter(index);
                }, bannerLetterAnimations[index].startDelay);
            });
        }, 700); // for dot transition

    }, 800); // for banner slide-down

}, antiAnimationDuration);
