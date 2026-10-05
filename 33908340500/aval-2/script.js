/* =========================
   MENU MOBILE
========================= */

const menuButton = document.getElementById("menuButton");
const navLinks = document.querySelector(".nav-links");

menuButton.addEventListener("click", () => {
    navLinks.classList.toggle("active");
\});


/* =========================
   NAVEGAÇÃO
========================= */

const links = document.querySelectorAll(".nav-links a");

links.forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("active");

    \});

\});


/* =========================
   PLAYER
========================= */

const playButtons =
    document.querySelectorAll(".play-button");

const mainPlay =
    document.getElementById("mainPlay");

const songName =
    document.getElementById("songName");

const songStatus =
    document.getElementById("songStatus");

const progressBar =
    document.getElementById("progressBar");


let playing = false;

let progress = 0;

let timer;


/* Selecionar música */

playButtons.forEach(button => {

    button.addEventListener("click", () => {

        const song =
            button.getAttribute("data-song");

        songName.textContent = song;

        songStatus.textContent =
            "Reproduzindo agora";

        playing = true;

        mainPlay.textContent = "Ⅱ";

        startProgress();

    \});

\});


/* Botão principal */

mainPlay.addEventListener("click", () => {

    if (!songName.textContent ||
        songName.textContent === "Nenhuma música") {

        songName.textContent =
            "Luna — Midnight";

        songStatus.textContent =
            "Reproduzindo agora";
    \}

    playing = !playing;

    if (playing) {

        mainPlay.textContent = "Ⅱ";

        songStatus.textContent =
            "Reproduzindo agora";

        startProgress();

    \} else {

        mainPlay.textContent = "▶";

        songStatus.textContent =
            "Pausado";

        clearInterval(timer);
    \}

\});


/* Barra de progresso */

function startProgress() {

    clearInterval(timer);

    timer = setInterval(() => {

        if (!playing) {
            return;
        \}

        progress += 0.5;

        progressBar.style.width =
            progress + "%";

        if (progress >= 100) {

            progress = 0;

        \}

    \}, 100);

\}


/* =========================
   GÊNEROS
========================= */

const genres =
    document.querySelectorAll(".genre");

genres.forEach(genre => {

    genre.addEventListener("click", () => {

        genres.forEach(item => {
            item.classList.remove("active");
        \});

        genre.classList.add("active");

    \});

\});$0