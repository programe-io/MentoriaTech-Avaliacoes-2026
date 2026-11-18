let pontos = 0;
let tempo = 30;
let intervalo;
let ativo = false;

function iniciarJogo() {
    pontos = 0;
    tempo = 30;
    ativo = true;

    document.getElementById("pontos").textContent = pontos;
    document.getElementById("tempo").textContent = tempo;

    moverEstrela();

    clearInterval(intervalo);

    intervalo = setInterval(() => {
        tempo--;

        document.getElementById("tempo").textContent = tempo;

        if (tempo <= 0) {
            clearInterval(intervalo);
            ativo = false;

            document.getElementById("estrela").style.display = "none";

            alert("Fim de jogo! Você conseguiu " + pontos + " pontos!");
        \}
    \}, 1000);
\}

function pegarEstrela() {
    if (!ativo) return;

    pontos++;

    document.getElementById("pontos").textContent = pontos;

    moverEstrela();
\}

function moverEstrela() {
    const jogo = document.getElementById("jogo");
    const estrela = document.getElementById("estrela");

    const largura = jogo.clientWidth - 45;
    const altura = jogo.clientHeight - 45;

    estrela.style.left = Math.random() * largura + "px";
    estrela.style.top = Math.random() * altura + "px";

    estrela.style.display = "block";
\}$0