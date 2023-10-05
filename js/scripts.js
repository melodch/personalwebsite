const $element = $('.neutuis-animation');
const totalFrames = 70;
const animationDuration = 3500;
const timePerFrame = animationDuration / totalFrames;
let timeWhenLastUpdate;
let timeFromLastUpdate;
let frameNumber = 1;
let direction = 1;

// 'step' function will be called each time browser rerender the content
// we achieve that by passing 'step' as a parameter to the 'requestAnimationFrame' function
function step(startTime) {
    // 'startTime' is provided by requestAnimationName function, and we can consider it as current time
    // first of all we calculate how much time has passed from the last time when frame was update
    if (!timeWhenLastUpdate) timeWhenLastUpdate = startTime;
    timeFromLastUpdate = startTime - timeWhenLastUpdate;

    // then we check if it is time to update the frame
    if (timeFromLastUpdate > timePerFrame) {
        // and update it accordingly
        $element.attr('src', `images/Logo/Neutuis-${frameNumber}.png`);
        // reset the last update time
        timeWhenLastUpdate = startTime;

        // update frame number based on direction state
        if (direction == 1) {
            frameNumber = frameNumber + 1;
        }
        else {
            frameNumber = frameNumber - 1;
        }

        // reset frame if it is the last frame
        if (frameNumber >= totalFrames) {
            frameNumber = 1;
        }
        if (frameNumber <= 0) {
            frameNumber = totalFrames;
        }
    }

    requestAnimationFrame(step);
}

function reverseNeutuis() {
    direction = (direction + 1) % 2;
}

// create a set of hidden divs and set their background-image attribute
// to required images that will force browser to download the images
$(document).ready(() => {
    for (var i = 1; i < totalFrames + 1; i++) {
        $('body').append(`<div id="preload-image-${i}" <img class="neutuis-animation" src=\`images/Logo/Neutuis-${frameNumber}.png\`></div>`);
    }
});

// wait for images to be downloaded and start the animation
$(window).on('load', () => {
    requestAnimationFrame(step);
});