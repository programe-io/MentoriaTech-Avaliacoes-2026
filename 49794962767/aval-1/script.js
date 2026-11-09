
const songs = [
    {
        title: "Summer",
        artist: "DJ Music",
        cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400",
        audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
    },
    {
        title: "Dreams",
        artist: "Acoustic Band",
        cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400",
        audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
    },
    {
        title: "Night",
        artist: "Rock Stars",
        cover: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=400",
        audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
    },
    {
        title: "Freedom",
        artist: "Electronic Beats",
        cover: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400",
        audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
    }
];

let currentIndex = 0;

const audio = document.getElementById("audio");
const playButton = document.getElementById("playButton");
const currentTitle = document.getElementById("currentTitle");
const currentArtist = document.getElementById("currentArtist");
const currentCover = document.getElementById("currentCover");
const progressBar = document.getElementById("progressBar");
const currentTime = document.getElementById("currentTime");
const duration = document.getElementById("duration");
const volume = document.getElementById("volume");

function loadSong(index) {
    currentIndex = index;

    const song = songs[currentIndex];

    currentTitle.textContent = song.title;
    currentArtist.textContent = song.artist;
    currentCover.src = song.cover;

    audio.src = song.audio;
    progressBar.value = 0;
    currentTime.textContent = "0:00";
    duration.textContent = "0:00";
}

function playSong(index) {
    loadSong(index);

    audio.play()
        .then(() => {
            playButton.textContent = "❚❚";
        })
        .catch(() => {
            playButton.textContent = "▶";
            alert("Não foi possível reproduzir a música. Verifique sua conexão.");
        });
}

function togglePlay() {
    if (!audio.src) {
        loadSong(currentIndex);
    }

    if (audio.paused) {
        audio.play()
            .then(() => {
                playButton.textContent = "❚❚";
            })
            .catch(() => {
                alert("Não foi possível reproduzir o áudio.");
            });
    } else {
        audio.pause();
        playButton.textContent = "▶";
    }
}

function nextSong() {
    currentIndex++;

    if (currentIndex >= songs.length) {
        currentIndex = 0;
    }

    playSong(currentIndex);
}

function previousSong() {
    currentIndex--;

    if (currentIndex < 0) {
        currentIndex = songs.length - 1;
    }

    playSong(currentIndex);
}

function formatTime(time) {
    if (!Number.isFinite(time)) return "0:00";

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return minutes + ":" + String(seconds).padStart(2, "0");
}

audio.addEventListener("loadedmetadata", () => {
    duration.textContent = formatTime(audio.duration);
});

audio.addEventListener("timeupdate", () => {
    if (audio.duration) {
        progressBar.value =
            (audio.currentTime / audio.duration) * 100;

        currentTime.textContent = formatTime(audio.currentTime);
    }
});

progressBar.addEventListener("input", () => {
    if (audio.duration) {
        audio.currentTime =
            (progressBar.value / 100) * audio.duration;
    }
});

volume.addEventListener("input", () => {
    audio.volume = volume.value;
});

audio.addEventListener("ended", nextSong);

audio.volume = 0.7;

function searchMusic() {
    const search = document
        .getElementById("searchInput")
        .value.toLowerCase();

    const songElements = document.querySelectorAll(".song");

    songElements.forEach((song) => {
        const name = song.dataset.name.toLowerCase();
        const text = song.textContent.toLowerCase();

        song.style.display =
            name.includes(search) || text.includes(search)
                ? "flex"
                : "none";
    });
}

// Carrega a primeira música ao abrir o site
loadSong(0);
