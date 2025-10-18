console.log("Antifalls Landing Page");

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
    document.getElementById('construction-banner').classList.add('show');
    const bannerMsgElement = document.querySelector('.banner-text');
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
            bannerMsgElement.appendChild(span);
            bannerLetters.push(span);
        } else {
            bannerMsgElement.appendChild(document.createTextNode(' '));
        }
    }
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
        letter.style.opacity = 0.01;
        letter.style.filter = "blur(17px)";
        letter.style.transform = "translateY(200px)";
    });
    // Wait AFTER banner slides down
    setTimeout(() => {
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
    }, 200);
}, antiAnimationDuration);
