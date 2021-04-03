//get elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullscreen = player.querySelector('.fullscreen');


//Build functions
function togglePlay() {
    if (video.paused) {video.play()}
    else {video.pause()}
}

function updateButton() {
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
}

function playButton() {
    if (video.paused) {video.play()}
    else {video.pause()}
}

function sliders() {
    video[this.name] = this.value;   
}

function skip() {
    video.currentTime += parseInt(this.dataset.skip);
}

function updateProgressBar() {
    let progress = (this.currentTime / this.duration) * 100;
    progressBar.style.flexBasis = `${progress}%`;

}

function scrub(e) {
    let time = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = time;    
}

function goFull() {
    let isFull = (document.fullscreenElement != null);
    if (!isFull) {player.requestFullscreen()}
    else {document.exitFullscreen()}
}

//add event listeners
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', updateProgressBar);

toggle.addEventListener('click', playButton);
ranges.forEach(range => range.addEventListener('input', sliders));
skipButtons.forEach(btn => btn.addEventListener('click', skip));

let clicked = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => clicked && scrub(e));
progress.addEventListener('mousedown', () => clicked = true);
progress.addEventListener('mouseup', () => clicked = false);

fullscreen.addEventListener('click', goFull);