
const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const playBtn = document.getElementById("playBtn");
const progress = document.getElementById("progress");

let current = 0;

const songs = [
    {
        title: "Noite Estrelada",
        artist: "Galaxy Music",
        src: "musica1.mp3"
    \},
    {
        title: "Universo Neon",
        artist: "Future Sound",
        src: "musica2.mp3"
    \},
    {
        title: "Sonhos Digitais",
        artist: "Dream Music",
        src: "musica3.mp3"
    \}
];

// CARREGAR MÚSICA
function loadSong(index) {
    current = index;

    audio.src = songs[current].src;

    title.textContent = songs[current].title;
    artist.textContent = songs[current].artist;

    progress.value = 0;
\}

// REPRODUZIR E PAUSAR
function togglePlay() {

    if (!audio.src) {
        loadSong(current);
    \}

    if (audio.paused) {
        audio.play();
    \} else {
        audio.pause();
    \}
\}

// ATUALIZAR BOTÃO
audio.addEventListener("play", () => {
    playBtn.textContent = "⏸";
\});

audio.addEventListener("pause", () => {
    playBtn.textContent = "▶";
\});

// PRÓXIMA MÚSICA
function next() {
    current = (current + 1) % songs.length;
    loadSong(current);
    audio.play();
\}

// MÚSICA ANTERIOR
function previous() {
    current = (current - 1 + songs.length) % songs.length;
    loadSong(current);
    audio.play();
\}

// ESCOLHER MÚSICA
function selectSong(index) {
    loadSong(index);
    audio.play();
\}

// BARRA DE PROGRESSO
audio.addEventListener("timeupdate", () => {

    if (audio.duration) {
        progress.value =
            (audio.currentTime / audio.duration) * 100;
    \}

\});

// MOVER BARRA
progress.addEventListener("input", () => {

    if (audio.duration) {
        audio.currentTime =
            (progress.value / 100) * audio.duration;
    \}

\});

// TOCAR PRÓXIMA AUTOMATICAMENTE
audio.addEventListener("ended", next);

// EFEITO DE PARTÍCULAS
function createParticle() {

    const particle = document.createElement("div");

    particle.textContent = "✦";

    particle.style.position = "fixed";
    particle.style.left = Math.random() * 100 + "vw";
    particle.style.top = "100vh";
    particle.style.color = "#ed52ff";
    particle.style.fontSize = "20px";
    particle.style.pointerEvents = "none";
    particle.style.zIndex = "999";

    document.body.appendChild(particle);

    const animation = particle.animate([
        {
            transform: "translateY(0) rotate(0deg)",
            opacity: 1
        \},
        {
            transform: "translateY(-110vh) rotate(360deg)",
            opacity: 0
        \}
    ], {
        duration: 5000,
        easing: "linear"
    \});

    animation.onfinish = () => particle.remove();
\}

// CRIAR ESTRELAS
setInterval(createParticle, 500);

// MENSAGEM NO CONSOLE
console.log(
    "%c🎧 MUSIC GALAXY",
    "color:#ff40df;font-size:30px;font-weight:bold;"
);

console.log(
    "%cBem-vindo ao universo musical!",
    "color:#00eaff;font-size:16px;"
);$0