
// ELEMENTOS DO SITE
const audio = document.getElementById("audio");
const nomeMusica = document.getElementById("nomeMusica");
const botoesMusica = document.querySelectorAll(".musica button");

// LISTA DE MÚSICAS
const musicas = [
    {
        nome: "Som Relaxante",
        artista: "Música Instrumental",
        arquivo: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
    \},
    {
        nome: "Música Instrumental",
        artista: "Melodia Especial",
        arquivo: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
    \},
    {
        nome: "Música Ambiente",
        artista: "Som da Natureza",
        arquivo: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
    \}
];

// MÚSICA ATUAL
let musicaAtual = 0;

// =====================================
// TOCAR MÚSICA
// =====================================

function tocar(indice) {

    if (indice < 0 || indice >= musicas.length) {
        return;
    \}

    musicaAtual = indice;

    audio.src = musicas[musicaAtual].arquivo;

    nomeMusica.textContent =
        "🎵 " + musicas[musicaAtual].nome +
        " - " + musicas[musicaAtual].artista;

    audio.play().catch(() => {
        nomeMusica.textContent =
            "Clique no botão de reprodução para ouvir.";
    \});

    atualizarBotoes();
\}

// =====================================
// PAUSAR MÚSICA
// =====================================

function pausar() {
    audio.pause();
\}

// =====================================
// PRÓXIMA MÚSICA
// =====================================

function proximaMusica() {

    musicaAtual++;

    if (musicaAtual >= musicas.length) {
        musicaAtual = 0;
    \}

    tocar(musicaAtual);
\}

// =====================================
// MÚSICA ANTERIOR
// =====================================

function musicaAnterior() {

    musicaAtual--;

    if (musicaAtual < 0) {
        musicaAtual = musicas.length - 1;
    \}

    tocar(musicaAtual);
\}

// =====================================
// BOTÕES DA PLAYLIST
// =====================================

function atualizarBotoes() {

    botoesMusica.forEach((botao, indice) => {

        if (indice === musicaAtual) {
            botao.textContent = "▶ Tocando";
        \} else {
            botao.textContent = "Tocar";
        \}

    \});
\}

// =====================================
// QUANDO A MÚSICA TERMINAR
// =====================================

audio.addEventListener("ended", () => {
    proximaMusica();
\});

// =====================================
// CONTROLE DE VOLUME
// =====================================

function alterarVolume(valor) {

    audio.volume = Math.max(0, Math.min(1, valor));

\}

// =====================================
// BARRA DE PROGRESSO
// =====================================

function atualizarProgresso() {

    const barra = document.getElementById("progresso");

    if (!barra || !audio.duration) {
        return;
    \}

    barra.value =
        (audio.currentTime / audio.duration) * 100;

\}

audio.addEventListener("timeupdate", atualizarProgresso);

// =====================================
// AVANÇAR NA MÚSICA
// =====================================

function mudarTempo(valor) {

    if (audio.duration) {
        audio.currentTime =
            (valor / 100) * audio.duration;
    \}

\}

// =====================================
// FORMATAÇÃO DO TEMPO
// =====================================

function formatarTempo(segundos) {

    if (!Number.isFinite(segundos)) {
        return "0:00";
    \}

    const minutos = Math.floor(segundos / 60);

    const restante = Math.floor(segundos % 60);

    return minutos + ":" + String(restante).padStart(2, "0");
\}

// =====================================
// ATUALIZAR RELÓGIO DA MÚSICA
// =====================================

audio.addEventListener("timeupdate", () => {

    const tempoAtual = document.getElementById("tempoAtual");

    if (tempoAtual) {
        tempoAtual.textContent =
            formatarTempo(audio.currentTime);
    \}

\});

audio.addEventListener("loadedmetadata", () => {

    const duracao = document.getElementById("duracao");

    if (duracao) {
        duracao.textContent =
            formatarTempo(audio.duration);
    \}

\});

// =====================================
// FORMULÁRIO DE CONTATO
// =====================================

function enviar(event) {

    event.preventDefault();

    const nome = document.getElementById("nome");

    if (!nome || nome.value.trim() === "") {
        alert("Por favor, informe seu nome!");
        return;
    \}

    alert(
        "Olá, " + nome.value +
        "! Obrigado por entrar em contato com o Music World! 🎵"
    );

    event.target.reset();

\}

// =====================================
// PESQUISAR MÚSICAS
// =====================================

function pesquisarMusica() {

    const campo = document.getElementById("pesquisa");

    if (!campo) return;

    const pesquisa = campo.value.toLowerCase();

    const itens = document.querySelectorAll(".musica");

    itens.forEach(item => {

        const texto = item.textContent.toLowerCase();

        item.style.display =
            texto.includes(pesquisa) ? "flex" : "none";

    \});

\}

// =====================================
// MENU RESPONSIVO
// =====================================

function abrirMenu() {

    const menu = document.querySelector("nav");

    if (menu) {
        menu.classList.toggle("ativo");
    \}

\}

// FECHAR MENU AO CLICAR EM UM LINK

document.querySelectorAll("nav a").forEach(link => {

    link.addEventListener("click", () => {

        const menu = document.querySelector("nav");

        if (menu) {
            menu.classList.remove("ativo");
        \}

    \});

\});

// =====================================
// ANIMAÇÃO DOS CARDS
// =====================================

const cards = document.querySelectorAll(".card");

cards.forEach(card => {

    card.addEventListener("mouseenter", () => {
        card.style.transition = "0.3s";
    \});

\});

// =====================================
// MENSAGEM DE BOAS-VINDAS
// =====================================

console.log("🎵 Bem-vindo ao Mundo da Música!");

console.log("Site carregado com sucesso!");

// =====================================
// INICIALIZAÇÃO
// =====================================

document.addEventListener("DOMContentLoaded", () => {

    if (nomeMusica) {
        nomeMusica.textContent =
            "Escolha uma música para começar!";
    \}

    if (audio) {
        audio.volume = 0.7;
    \}

\});$0