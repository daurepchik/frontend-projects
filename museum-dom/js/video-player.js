// Custom Video Player
const player = document.querySelector('.video-player');
const videoItem = document.querySelectorAll('.video-item');
const play = document.querySelector('.video-player-control-play');
const playImage = document.querySelector('.video-player-control-play img');
const largePlay = document.querySelector('.video-player-big-play');
const videoContent = document.querySelector('.video-player-slider-wrapper');
const videoControl = document.querySelector('.video-player-controls');
const videoProgress = document.querySelector('.progress');
const soundProgress = document.querySelector('.volume');
const speaker = document.querySelector('.video-player-control-volume');
const fullscreenBtn = document.querySelector('.video-player-control-screensize');
const playRate = document.querySelector('.play-back-rate');
const prevBtn = document.querySelector('.video-slider-controls-arrow-left');
const nextBtn = document.querySelector('.video-slider-controls-arrow-right');
const paginationContainer = document.querySelector('.video-slider-controls-bullets');

let currentItem = 0;
let mouseActive = false;
let ended = false;
video.volume = 0.4;
document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('keydown', handleKeys);
    play.addEventListener('click', playVideo);
    videoItem[currentItem].addEventListener('timeupdate', handleProgress);
    videoItem[currentItem].addEventListener('ended', handleEnd);
    player.addEventListener('fullscreenchange', toogleControl);
    speaker.addEventListener('click', muteVideo);
    fullscreenBtn.addEventListener('click', toggleFullscreen);
    videoContent.addEventListener('click', playVideo);
    videoProgress.addEventListener('input', handleProgressChange);
    videoProgress.addEventListener('click', handleProgressClick);
    videoProgress.addEventListener('mousemove', (e) => mouseActive && handleProgressClick(e));
    videoProgress.addEventListener('mousedown', () => mouseActive = true);
    videoProgress.addEventListener('mouseup', () => mouseActive = false);
    soundProgress.addEventListener('input', handleVolumeChange);
    prevBtn.addEventListener('click', handlePrevBtn);
    nextBtn.addEventListener('click', handleNextBtn);
    paginationContainer.addEventListener('click', handleBulletClick)
});

function playVideo() {
    largePlay.classList.toggle('hide-large-button');
    if (largePlay.classList.contains('hide-large-button')) {
        playImage.setAttribute('src', 'assets/icons/video-player/pause.svg')
        videoItem[currentItem].play();
        setInterval(() => {
            handleProgress();
        }, 10);
    } else {
        playImage.setAttribute('src', 'assets/icons/video-player/play.svg')
        videoItem[currentItem].pause();
    }
}

function rangePosition(range, value) {
    return range.style.background = `linear-gradient(to right, #660606 0%, #660606 ${value}%, #fff ${value}%, #fff 100%)`;
}

function handleProgressChange() {
    rangePosition(videoProgress, videoProgress.value);
}

function handleProgressClick(e) {
    videoItem[currentItem].currentTime = (e.offsetX / videoProgress.offsetWidth) * videoItem[currentItem].duration;
}

function handleProgress() {
    let percentDuration = (videoItem[currentItem].currentTime / videoItem[currentItem].duration) * 100;
    videoProgress.value = percentDuration;
    rangePosition(videoProgress, percentDuration);
    if (videoItem[currentItem].currentTime === videoItem[currentItem].duration && !ended) {
        handleEnd();
        ended = !ended;
    }
}

function handleProgressKeyNum(percent) {
    videoItem[currentItem].currentTime = (percent / 100) * videoItem[currentItem].duration;
}

function handleEnd() {
    largePlay.classList.remove('hide-large-button');
    playImage.setAttribute('src', 'assets/icons/video-player/play.svg');
    rangePosition(videoProgress, 0);
    videoProgress.value = 0;
}

function handleVolumeChange() {
    videoItem[currentItem].volume = soundProgress.value;
    if (videoItem[currentItem].volume === 0) {
        speaker.classList.add('mute');
        videoItem[currentItem].muted = true;
    } else {
        speaker.classList.remove('mute');
        videoItem[currentItem].muted = false;
    }
    rangePosition(soundProgress, soundProgress.value * 100);
}

function muteVideo() {
    videoItem[currentItem].muted = !videoItem[currentItem].muted;
    videoItem[currentItem].muted ? speaker.classList.add('mute') : speaker.classList.remove('mute');
    if (videoItem[currentItem].muted) {
        videoItem[currentItem].volume = 0;
        soundProgress.value = 0;
        rangePosition(soundProgress, videoItem[currentItem].volume * 100);
    } else {
        videoItem[currentItem].volume = 0.4;
        soundProgress.value = 0.4;
        rangePosition(soundProgress, videoItem[currentItem].volume * 100);
    }
}

function launchFS(element) {
    element.requestFullscreen ? element.requestFullscreen() : null;
}

function exitFS() {
    document.exitFullscreen ? document.exitFullscreen() : null;
}

function toggleFullscreen() {
    document.fullscreenElement ? exitFS() : launchFS(player);
    videoContent.classList.toggle('max-video-height');
}

function toogleControl() {
    videoControl.classList.toggle('show-control');
}

function showPlayBackRate() {
    playRate.innerHTML = `X ${videoItem[currentItem].playbackRate}`;
    setTimeout(() => { playRate.innerHTML = '' }, 1000)
}

function faster() {
    if (videoItem[currentItem].playbackRate >= 2) return;
    videoItem[currentItem].playbackRate += 0.25;
    showPlayBackRate();
}

function slower() {
    if (videoItem[currentItem].playbackRate <= 0.5) return;
    videoItem[currentItem].playbackRate -= 0.25
    showPlayBackRate();
}

function resetParams() {
    videoItem[currentItem].pause();
    rangePosition(videoProgress, 0);
    videoProgress.value = 0;
    videoItem[currentItem].volume = 0.4;
    soundProgress.value = 0.4;
    rangePosition(soundProgress, videoItem[currentItem].volume * 100);
    speaker.classList.remove('mute');
    largePlay.classList.remove('hide-large-button');
    playImage.setAttribute('src', 'assets/icons/video-player/play.svg')
    videoItem[currentItem].classList.remove('video-active', 'video');
    ended = false;
}

let isSlideActive = false;

function handleNextBtn() {
    resetParams();
    if (!isSlideActive) {
        isSlideActive = true;
        if (currentItem === videoItem.length - 1) currentItem = -1;
        currentItem++;
        videoItem[currentItem].classList.add('video-active', 'video');
        videoItem[currentItem] = document.querySelector('.video');
        setTimeout(() => {
            isSlideActive = false;
        }, 350);
    }

}

function handlePrevBtn() {
    resetParams();
    if (!isSlideActive) {
        isSlideActive = true;
        if (currentItem === 0) {
            currentItem = videoItem.length - 1;
        } else {
            currentItem--;
        }
        videoItem[currentItem].classList.add('video-active', 'video');
        videoItem[currentItem] = document.querySelector('.video');
        setTimeout(() => {
            isSlideActive = false;
        }, 350);
    }
}

function handleBulletClick(e) {
    setTimeout(() => {
        if (e.target.classList.contains('video-slider-controls-bullet')) {
            resetParams();
            let currentBullet = Number(e.target.ariaLabel.slice(-1)) - 1;
            currentItem = currentBullet;
            videoItem[currentItem].classList.add('video-active', 'video');
            videoItem[currentItem] = document.querySelector('.video');
        }
    }, 50);
}

function handleKeys(e) {
    let scrollPosition = document.documentElement.scrollTop;
    if (scrollPosition > 1500 && scrollPosition < 4500) {
        e.preventDefault();
        e.code === 'Space' ? playVideo() : null;
        e.key === 'm' || e.key === 'ь' ? muteVideo() : null;
        e.key === 'f' || e.key === 'а' ? toggleFullscreen() : null;
        e.key === '<' || e.key === 'Б' ? slower() : null;
        e.key === '>' || e.key === 'Ю' ? faster() : null;
    }
}