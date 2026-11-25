// ==========================================
// SOUNDWAVE - SISTEMA DE REPRODUÇÃO
// ==========================================

const musicas = [
    {
        id: 1,
        titulo: "Blinding Lights",
        artista: "The Weeknd",
        album: "After Hours",
        capa: "https://picsum.photos/seed/afterhours/300",
        categoria: "pop",
        arquivo: "musicas/blinding-lights.mp3"
    \},
    {
        id: 2,
        titulo: "Starboy",
        artista: "The Weeknd",
        album: "Starboy",
        capa: "https://picsum.photos/seed/starboy/300",
        categoria: "pop",
        arquivo: "musicas/starboy.mp3"
    \},
    {
        id: 3,
        titulo: "Numb",
        artista: "Linkin Park",
        album: "Meteora",
        capa: "https://picsum.photos/seed/meteora/300",
        categoria: "rock",
        arquivo: "musicas/numb.mp3"
    \},
    {
        id: 4,
        titulo: "In The End",
        artista: "Linkin Park",
        album: "Hybrid Theory",
        capa: "https://picsum.photos/seed/hybrid/300",
        categoria: "rock",
        arquivo: "musicas/in-the-end.mp3"
    \},
    {
        id: 5,
        titulo: "Night Changes",
        artista: "One Direction",
        album: "FOUR",
        capa: "https://picsum.photos/seed/four/300",
        categoria: "pop",
        arquivo: "musicas/night-changes.mp3"
    \},
    {
        id: 6,
        titulo: "Weightless",
        artista: "Marconi Union",
        album: "Ambient",
        capa: "https://picsum.photos/seed/relax/300",
        categoria: "relax",
        arquivo: "musicas/weightless.mp3"
    \}
];

// ==========================================
// ELEMENTOS DO PLAYER
// ==========================================

const audio = document.getElementById("audioPlayer");
const playButton = document.getElementById("playButton");
const previousButton = document.getElementById("previousButton");
const nextButton = document.getElementById("nextButton");
const shuffleButton = document.getElementById("shuffleButton");
const repeatButton = document.getElementById("repeatButton");

const playerCover = document.getElementById("playerCover");
const playerTitle = document.getElementById("playerTitle");
const playerArtist = document.getElementById("playerArtist");
const playerLike = document.getElementById("playerLike");

const progressBar = document.getElementById("progressBar");
const currentTime = document.getElementById("currentTime");
const duration = document.getElementById("duration");
const volumeBar = document.getElementById("volumeBar");

const searchInput = document.getElementById("searchInput");
const musicList = document.getElementById("musicList");
const favoriteList = document.getElementById("favoriteList");

// ==========================================
// ESTADO DO APLICATIVO
// ==========================================

let musicaAtual = 0;
let tocando = false;
let aleatorio = false;
let repetir = false;

let favoritos = JSON.parse(
    localStorage.getItem("soundwave_favoritos")
) || [];

// ==========================================
// FORMATAÇÃO DE TEMPO
// ==========================================

function formatarTempo(segundos) {
    if (!Number.isFinite(segundos)) return "0:00";

    const minutos = Math.floor(segundos / 60);
    const segundosRestantes = Math.floor(segundos % 60);

    return `\${minutos\}:\${String(segundosRestantes).padStart(2, "0")\}`;
\}

// ==========================================
// CARREGAR MÚSICA
// ==========================================

function carregarMusica(indice) {
    if (!musicas[indice]) return;

    musicaAtual = indice;

    const musica = musicas[musicaAtual];

    audio.src = musica.arquivo;

    playerCover.src = musica.capa;
    playerTitle.textContent = musica.titulo;
    playerArtist.textContent = musica.artista;

    atualizarBotaoFavorito();
    atualizarListaMusicas();
\}

// ==========================================
// REPRODUZIR E PAUSAR
// ==========================================

async function reproduzirMusica() {
    if (!audio.src) {
        carregarMusica(musicaAtual);
    \}

    try {
        await audio.play();
        tocando = true;
        atualizarBotaoPlay();
    \} catch (erro) {
        tocando = false;
        atualizarBotaoPlay();
        console.error("Não foi possível reproduzir a música:", erro);
    \}
\}

function pausarMusica() {
    audio.pause();
    tocando = false;
    atualizarBotaoPlay();
\}

function alternarPlay() {
    if (audio.paused) {
        reproduzirMusica();
    \} else {
        pausarMusica();
    \}
\}

function atualizarBotaoPlay() {
    if (!playButton) return;

    playButton.innerHTML = tocando ? "⏸" : "▶";
\}

// ==========================================
// PRÓXIMA E ANTERIOR
// ==========================================

function proximaMusica() {
    if (aleatorio && musicas.length > 1) {
        let novoIndice;

        do {
            novoIndice = Math.floor(Math.random() * musicas.length);
        \} while (novoIndice === musicaAtual);

        musicaAtual = novoIndice;
    \} else {
        musicaAtual = (musicaAtual + 1) % musicas.length;
    \}

    carregarMusica(musicaAtual);
    reproduzirMusica();
\}

function musicaAnterior() {
    if (audio.currentTime > 3) {
        audio.currentTime = 0;
        return;
    \}

    musicaAtual =
        (musicaAtual - 1 + musicas.length) % musicas.length;

    carregarMusica(musicaAtual);
    reproduzirMusica();
\}

// ==========================================
// PROGRESSO DA MÚSICA
// ==========================================

audio.addEventListener("timeupdate", () => {
    if (!audio.duration) return;

    const progresso =
        (audio.currentTime / audio.duration) * 100;

    progressBar.value = progresso;

    currentTime.textContent =
        formatarTempo(audio.currentTime);
\});

audio.addEventListener("loadedmetadata", () => {
    duration.textContent = formatarTempo(audio.duration);
\});

progressBar.addEventListener("input", () => {
    if (!audio.duration) return;

    audio.currentTime =
        (progressBar.value / 100) * audio.duration;
\});

audio.addEventListener("ended", () => {
    if (repetir) {
        audio.currentTime = 0;
        reproduzirMusica();
    \} else {
        proximaMusica();
    \}
\});

// ==========================================
// VOLUME
// ==========================================

volumeBar.addEventListener("input", () => {
    audio.volume = volumeBar.value / 100;
\});

audio.volume = 0.7;

if (volumeBar) {
    volumeBar.value = 70;
\}

// ==========================================
// MODO ALEATÓRIO
// ==========================================

shuffleButton.addEventListener("click", () => {
    aleatorio = !aleatorio;

    shuffleButton.classList.toggle("active", aleatorio);
\});

// ==========================================
// REPETIR MÚSICA
// ==========================================

repeatButton.addEventListener("click", () => {
    repetir = !repetir;

    repeatButton.classList.toggle("active", repetir);
\});

// ==========================================
// FAVORITAR
// ==========================================

function alternarFavorito(id) {
    if (favoritos.includes(id)) {
        favoritos = favoritos.filter(item => item !== id);
    \} else {
        favoritos.push(id);
    \}

    localStorage.setItem(
        "soundwave_favoritos",
        JSON.stringify(favoritos)
    );

    atualizarBotaoFavorito();
    atualizarListaMusicas();
    renderizarFavoritos();
\}

function atualizarBotaoFavorito() {
    const musica = musicas[musicaAtual];

    if (!playerLike || !musica) return;

    playerLike.innerHTML =
        favoritos.includes(musica.id) ? "♥" : "♡";
\}

if (playerLike) {
    playerLike.addEventListener("click", () => {
        alternarFavorito(musicas[musicaAtual].id);
    \});
\}

// ==========================================
// LISTA DE MÚSICAS
// ==========================================

function atualizarListaMusicas(lista = musicas) {
    if (!musicList) return;

    musicList.innerHTML = "";

    lista.forEach(musica => {
        const linha = document.createElement("div");
        linha.className = "music-row";

        linha.innerHTML = `
            <img src="\${musica.capa\}" alt="">
            <div class="music-info">
                <strong>\${musica.titulo\}</strong>
                <span>\${musica.artista\}</span>
            </div>
            <button class="track-play" aria-label="Reproduzir">▶</button>
            <button class="like-button" aria-label="Favoritar">
                \${favoritos.includes(musica.id) ? "♥" : "♡"\}
            </button>
        `;

        linha.querySelector(".track-play").addEventListener("click", () => {
            carregarMusica(musicas.findIndex(item => item.id === musica.id));
            reproduzirMusica();
        \});

        linha.querySelector(".like-button").addEventListener("click", () => {
            alternarFavorito(musica.id);
        \});

        musicList.appendChild(linha);
    \});
\}

// ==========================================
// EXIBIR FAVORITOS
// ==========================================

function renderizarFavoritos() {
    if (!favoriteList) return;

    favoriteList.innerHTML = "";

    const listaFavoritos = musicas.filter(
        musica => favoritos.includes(musica.id)
    );

    if (listaFavoritos.length === 0) {
        favoriteList.innerHTML =
            "<p>Você ainda não adicionou músicas aos favoritos.</p>";
        return;
    \}

    listaFavoritos.forEach(musica => {
        const item = document.createElement("div");

        item.className = "music-row";

        item.innerHTML = `
            <img src="\${musica.capa\}" alt="">
            <div class="music-info">
                <strong>\${musica.titulo\}</strong>
                <span>\${musica.artista\}</span>
            </div>
            <button class="track-play">▶</button>
        `;

        item.querySelector(".track-play").addEventListener("click", () => {
            carregarMusica(musicas.findIndex(m => m.id === musica.id));
            reproduzirMusica();
        \});

        favoriteList.appendChild(item);
    \});
\}

// ==========================================
// PESQUISAR MÚSICAS
// ==========================================

if (searchInput) {
    searchInput.addEventListener("input", () => {
        const termo = searchInput.value.toLowerCase().trim();

        const resultado = musicas.filter(musica =>
            musica.titulo.toLowerCase().includes(termo) ||
            musica.artista.toLowerCase().includes(termo) ||
            musica.album.toLowerCase().includes(termo)
        );

        atualizarListaMusicas(resultado);
    \});
\}

// ==========================================
// PLAYLISTS
// ==========================================

function playPlaylist(categoria) {
    const lista = musicas
        .map((musica, indice) => ({ musica, indice \}))
        .filter(item => item.musica.categoria === categoria);

    if (lista.length === 0) return;

    carregarMusica(lista[0].indice);
    reproduzirMusica();

    filaAtual = lista.map(item => item.indice);
\}

let filaAtual = musicas.map((_, indice) => indice);

// ==========================================
// EVENTOS DOS BOTÕES
// ==========================================

playButton.addEventListener("click", alternarPlay);
nextButton.addEventListener("click", proximaMusica);
previousButton.addEventListener("click", musicaAnterior);

// ==========================================
// INICIALIZAÇÃO
// ==========================================

carregarMusica(0);
atualizarListaMusicas();
renderizarFavoritos();
atualizarBotaoPlay()$0