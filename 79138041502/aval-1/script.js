let pontuacao = 0;

function atualizarPontuacao(valor) {
    pontuacao += valor;

    if (pontuacao < 0) {
        pontuacao = 0;
    }

    document.getElementById("pontuacao").textContent = pontuacao;
}

function zerarPontuacao() {
    pontuacao = 0;
    document.getElementById("pontuacao").textContent = pontuacao;
}

function abrirModal(conteudo) {
    document.getElementById("conteudoJogo").innerHTML = conteudo;
    document.getElementById("modal").style.display = "flex";
}

function fecharModal() {
    document.getElementById("modal").style.display = "none";
}

/* =========================
   QUIZ
========================= */

function abrirQuiz() {

    const quiz = `
        <h2>🧠 Quiz Pink</h2>

        <p>Qual linguagem é utilizada para estruturar páginas web?</p>

        <button class="quiz-option" onclick="responderQuiz(false)">
            Python
        </button>

        <button class="quiz-option" onclick="responderQuiz(true)">
            HTML
        </button>

        <button class="quiz-option" onclick="responderQuiz(false)">
            Java
        </button>

        <button class="quiz-option" onclick="responderQuiz(false)">
            SQL
        </button>

        <p id="resultadoQuiz"></p>
    `;

    abrirModal(quiz);
}

function responderQuiz(correto) {

    const resultado = document.getElementById("resultadoQuiz");

    if (correto) {
        resultado.innerHTML = "🎉 Parabéns! Você acertou! +10 pontos";
        atualizarPontuacao(10);
    } else {
        resultado.innerHTML = "💗 Ops! Tente novamente!";
    }
}


/* =========================
   CAÇA AOS DIAMANTES
========================= */

function abrirDiamantes() {

    const jogo = `
        <h2>💎 Caça aos Diamantes</h2>

        <p>Clique no diamante para ganhar pontos!</p>

        <div class="diamond-game" onclick="pegarDiamante()">
            💎
        </div>

        <p id="diamanteResultado">
            Pontuação: 0
        </p>
    `;

    abrirModal(jogo);
}

let pontosDiamante = 0;

function pegarDiamante() {

    pontosDiamante += 5;

    document.getElementById("diamanteResultado").textContent =
        "💎 Pontuação: " + pontosDiamante;

    atualizarPontuacao(5);
}


/* =========================
   ADIVINHE O NÚMERO
========================= */

let numeroSecreto;

function abrirNumero() {

    numeroSecreto = Math.floor(Math.random() * 10) + 1;

    const jogo = `
        <h2>🎯 Acerte o Número</h2>

        <p>Escolha um número entre 1 e 10.</p>

        <input
            type="number"
            id="numeroUsuario"
            class="number-input"
            min="1"
            max="10"
        >

        <br>

        <button class="btn" onclick="verificarNumero()">
            Tentar
        </button>

        <p id="resultadoNumero"></p>
    `;

    abrirModal(jogo);
}

function verificarNumero() {

    const tentativa =
        Number(document.getElementById("numeroUsuario").value);

    const resultado =
        document.getElementById("resultadoNumero");

    if (tentativa === numeroSecreto) {

        resultado.innerHTML =
            "🎉 Você acertou! +20 pontos!";

        atualizarPontuacao(20);

    } else if (tentativa > numeroSecreto) {

        resultado.innerHTML =
            "💗 Tente um número menor.";

    } else {

        resultado.innerHTML =
            "💗 Tente um número maior.";
    }
}


/* =========================
   JOGO DA MEMÓRIA
========================= */

let cartas = [
    "🌸", "🌸",
    "🎀", "🎀",
    "💎", "💎",
    "🦋", "🦋"
];

let primeiraCarta = null;
let segundaCarta = null;
let bloqueado = false;

function abrirMemoria() {

    cartas.sort(() => Math.random() - 0.5);

    let html = `
        <h2>🧩 Jogo da Memória</h2>
        <p>Encontre todos os pares!</p>

        <div class="memory-grid">
    `;

    cartas.forEach((carta, index) => {

        html += `
            <button
                class="memory-card"
                id="carta-${index}"
                onclick="virarCarta(${index})"
            >
                ?
            </button>
        `;
    });

    html += `
        </div>

        <p id="memoriaResultado"></p>
    `;

    primeiraCarta = null;
    segundaCarta = null;
    bloqueado = false;

    abrirModal(html);
}

function virarCarta(index) {

    if (bloqueado) {
        return;
    }

    const carta = document.getElementById(`carta-${index}`);

    if (carta.classList.contains("open")) {
        return;
    }

    carta.textContent = cartas[index];
    carta.classList.add("open");

    if (primeiraCarta === null) {

        primeiraCarta = {
            index: index,
            valor: cartas[index]
        };

    } else {

        segundaCarta = {
            index: index,
            valor: cartas[index]
        };

        verificarPar();
    }
}

function verificarPar() {

    bloqueado = true;

    const carta1 =
        document.getElementById(`carta-${primeiraCarta.index}`);

    const carta2 =
        document.getElementById(`carta-${segundaCarta.index}`);

    if (primeiraCarta.valor === segundaCarta.valor) {

        atualizarPontuacao(10);

        primeiraCarta = null;
        segundaCarta = null;
        bloqueado = false;

        document.getElementById("memoriaResultado").textContent =
            "🎉 Par encontrado! +10 pontos";

    } else {

        setTimeout(() => {

            carta1.textContent = "?";
            carta2.textContent = "?";

            carta1.classList.remove("open");
            carta2.classList.remove("open");

            primeiraCarta = null;
            segundaCarta = null;
            bloqueado = false;

        }, 800);
    }
}


/* =========================
   FECHAR MODAL CLICANDO FORA
========================= */

window.onclick = function(event) {

    const modal = document.getElementById("modal");

    if (event.target === modal) {
        fecharModal();
    }
};