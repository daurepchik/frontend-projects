import playlist from "./play_list.js";

const playPrevBtn = document.querySelector('.play-prev'),
    playNextBtn = document.querySelector('.play-next'),
    play = document.querySelector('.play'),
    playList = document.querySelector('.play-list'),
    currentAudio = document.querySelector('.current-audio'),
    playerProgressBar = document.querySelector('.player-progress-bar'),
    playerProgress = document.querySelector('.player-progress'),
    playerVolumeBtn = document.querySelector('.player-volume-btn'),
    playerVolumeBar = document.querySelector('.player-volume');


let playNum = 0;
const audio = new Audio();
audio.src = playlist[playNum].src;


const createPlayList = () => {
    playlist.forEach(el => {
        const playItem = document.createElement('li');
        playItem.classList.add('play-item');
        playItem.textContent = el.title;
        playList.append(playItem);
    })
}

const playAudio = () => {
    playItems[playNum].classList.toggle('item-active');
    if (audio.paused) {
        audio.play();
        play.classList.add('pause');
    } else {
        audio.pause();
        play.classList.remove('pause')
    }
}

const playPrev = () => {
    playItems[playNum].classList.remove('item-active');
    playNum > 0 ? playNum -= 1 : playNum = playlist.length - 1;
    audio.src = playlist[playNum].src;
    playAudio();
}

const playNext = () => {
    playItems[playNum].classList.remove('item-active');
    playNum < playlist.length - 1 ? playNum += 1 : playNum = 0;
    audio.src = playlist[playNum].src;
    playAudio();
}

const adjustProgress = () => {
    audio.currentTime = playerProgressBar.value / 10;
}

const adjustVolume = () => {
    audio.volume = playerVolumeBar.value;
}

const muteAudio = () => {
    if (!audio.muted) {
        audio.muted = true;
        playerVolumeBtn.classList.add('muted');
    } else {
        audio.muted = false;
        playerVolumeBtn.classList.remove('muted');
    }
}

const updateProgress = () => {
    currentAudio.textContent = playlist[playNum].title;
    playerProgressBar.value = Math.round(audio.currentTime / audio.duration * 100);
    let currentTime = Math.round(audio.currentTime / 60) + ':' + Math.round(audio.currentTime % 60).toString().padStart(2, '0');
    let duration = Math.round(audio.duration / 60) + ':' + Math.round(audio.duration % 60).toString().padStart(2, '0');
    playerProgress.textContent = currentTime + '/' + duration;
}

const playAudioByList = (e) => {
    const tempArr = Array.from(playItems);
    if (tempArr.indexOf(e.target) !== playNum) {
        playNum = tempArr.indexOf(e.target);
        audio.src = playlist[playNum].src;
    }
    playAudio();
}

createPlayList()

const playItems = document.querySelectorAll('.play-item');

playItems.forEach(el => {
    el.addEventListener('click', playAudioByList);
})

playPrevBtn.addEventListener('click', playPrev);
playNextBtn.addEventListener('click', playNext);
play.addEventListener('click', playAudio);

audio.addEventListener("ended", () => playNext());
audio.addEventListener("loadedmetadata", updateProgress);
audio.addEventListener("timeupdate", updateProgress);

playerVolumeBtn.addEventListener('click', muteAudio);
playerVolumeBar.addEventListener('change', adjustVolume);

playerProgressBar.addEventListener('change', adjustProgress);

updateProgress();

console.log('For your convenience the audio cut to 10 seconds')
console.log('Задание: "Можно запустить и остановить проигрывания трека кликом по кнопке Play/Pause рядом с ним в плейлисте +3"\n' +
    'сделано таким образом, что можно кликать по самим названиям композиций в списке, и музыка будет проигрываться.\n' +
    'Не сделал только доп функционал. В остальнём всё на 100%')
