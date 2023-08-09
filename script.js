let audioElement = new Audio('songs/Jashn-E-Bahaara.mp3');
let songIndex = 0;
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressbar");
let nextSong = document.getElementById("nextSong");
let previousSong = document.getElementById("previousSong");
let songItems = Array.from(document.getElementsByClassName('songItem'));
let songItemPlayButton = Array.from(document.getElementsByClassName("songItemPlayButton"));
let songs = [
    { songName: "Jashn-E-Bahaara", filePath: "songs/Jashn-E-Bahaara.mp3", coverPath: "images/jashn.jpeg" },
    { songName: "Bairiya", filePath: "songs/Bairiya.mp3", coverPath: "images/bairiya.jpeg" },
    { songName: "Leja Re", filePath: "songs/Leja Re.mp3", coverPath: "images/leja re.jpeg" },
    { songName: "Let me love u", filePath: "songs/let me love u.mp3", coverPath: "images/let me love u.jpeg" },
]

songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i]["coverPath"];
    element.getElementsByClassName("songName")[0].innerHTML = songs[i]["songName"];

})
//------play/pause audio

masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove("fa-play");
        masterPlay.classList.add("fa-pause");
        songItemPlayButton[songIndex].classList.add("fa-pause");
        songItemPlayButton[songIndex].classList.remove("fa-play");
    }
    else {
        audioElement.pause();
        masterPlay.classList.add("fa-play");
        masterPlay.classList.remove("fa-pause");
        songItemPlayButton[songIndex].classList.remove("fa-pause");
        songItemPlayButton[songIndex].classList.add("fa-play");
    }
});
//------update progress bar
audioElement.addEventListener('timeupdate', (event) => {
    progressPercent = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progressPercent;
});

//update time with progress
myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
});
const makeallplays = () => {
    songItemPlayButton.forEach((element) => {
        element.classList.remove('fa-pause');
        element.classList.add('fa-play');
    });
}

songItemPlayButton.forEach((element, i) => {
    element.addEventListener("click", (e) => {
        let audioTime = audioElement.currentTime;
        makeallplays();
        if (audioElement.paused || audioElement.currentTime <= 0) {
            songIndex = i;
            audioElement.src = songs[songIndex]["filePath"];
            audioElement.currentTime = audioTime;
            audioElement.play();
            e.target.classList.remove('fa-play');
            e.target.classList.add('fa-pause');
            masterPlay.classList.remove("fa-play");
            masterPlay.classList.add("fa-pause");
        }
        else if (songIndex != i && audioElement.played) {
            songIndex = i;
            audioElement.src = songs[songIndex]["filePath"];
            audioElement.currentTime = 0;
            audioElement.play();
            e.target.classList.remove('fa-play');
            e.target.classList.add('fa-pause');
            masterPlay.classList.remove("fa-play");
            masterPlay.classList.add("fa-pause");
        }
        else {
            audioElement.pause();
            e.target.classList.add('fa-play');
            e.target.classList.remove('fa-pause');
            masterPlay.classList.add("fa-play");
            masterPlay.classList.remove("fa-pause");
        }
        // e.target.classList.remove('fa-play');
        // e.target.classList.add('fa-pause');
        // songIndex = i;
        // audioElement.src = songs[songIndex]["filePath"];
        // audioElement.play();
        // masterPlay.classList.remove("fa-play");
        // masterPlay.classList.add("fa-pause");
    })
});

nextSong.addEventListener('click', () => {
    songItemPlayButton[songIndex].classList.remove("fa-pause");
    songItemPlayButton[songIndex].classList.add("fa-play");
    if (songIndex >= 3) {
        songIndex = 0;
    } else {
        songIndex += 1;
    }
    songItemPlayButton[songIndex].classList.add("fa-pause");
    songItemPlayButton[songIndex].classList.remove("fa-play");
    audioElement.src = songs[songIndex]["filePath"];
    audioElement.play();
    masterPlay.classList.remove("fa-play");
    masterPlay.classList.add("fa-pause");

});

previousSong.addEventListener('click', () => {
    songItemPlayButton[songIndex].classList.add("fa-play");
    songItemPlayButton[songIndex].classList.remove("fa-pause");

    if (songIndex <= 0) {
        songIndex = 3;
    }
    else {
        songIndex -= 1;
    }
    songItemPlayButton[songIndex].classList.add("fa-pause");
    songItemPlayButton[songIndex].classList.remove("fa-play");


    audioElement.src = songs[songIndex]["filePath"];
    audioElement.play();
    masterPlay.classList.remove("fa-play");
    masterPlay.classList.add("fa-pause");
})
