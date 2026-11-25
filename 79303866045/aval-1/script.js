
// =================================
// GAME ZONE - SISTEMA GAMER
// =================================

// LISTA DE JOGOS

const jogos = [
    {
        nome: "Battle Arena",
        categoria: "acao",
        descricao: "Batalhas e aventuras emocionantes."
    },
    {
        nome: "Speed Racing",
        categoria: "corrida",
        descricao: "Dispute corridas em alta velocidade."
    },
    {
        nome: "Adventure World",
        categoria: "aventura",
        descricao: "Explore mundos incríveis."
    },
    {
        nome: "Football Stars",
        categoria: "esporte",
        descricao: "Entre em campo e marque gols."
    },
    {
        nome: "Zombie Attack",
        categoria: "acao",
        descricao: "Sobreviva a uma aventura de zumbis."
    }
];

// VARIÁVEIS

let pontuacao = 0;
let partidas = 0;

// MENU

function toggleMenu() {
    document.getElementById("menu")
        .classList.toggle("active");
}

// SELECIONAR JOGO

function abrirJogo(nome) {

    alert("Você escolheu: " + nome);

    partidas++;

    atualizarEstatisticas();
}

// PESQUISAR JOGOS

function pesquisarJogo() {

    const pesquisa = document
        .getElementById("pesquisa")
        .value.toLowerCase();

    const resultados = jogos.filter(jogo =>
        jogo.nome.toLowerCase().includes(pesquisa)
    );

    console.clear();

    if (resultados.length > 0) {

        resultados.forEach(jogo => {
            console.log(jogo.nome);
            console.log(jogo.descricao);
        });

    } else {

        console.log("Nenhum jogo encontrado.");

    }
}

// FILTRAR CATEGORIAS

function filtrarJogos(categoria) {

    const resultados = categoria === "todos"
        ? jogos
        : jogos.filter(jogo =>
            jogo.categoria === categoria
        );

    console.log("Jogos encontrados:");

    resultados.forEach(jogo => {
        console.log(jogo.nome);
    });
}

// SISTEMA DE PONTUAÇÃO

function ganharPontos(valor) {

    pontuacao += valor;

    atualizarEstatisticas();

    alert("Você ganhou " + valor + " pontos!");
}

// ESTATÍSTICAS

function atualizarEstatisticas() {

    const pontos = document.getElementById("pontos");
    const total = document.getElementById("partidas");

    if (pontos) {
        pontos.textContent = pontuacao;
    }

    if (total) {
        total.textContent = partidas;
    }
}

// =================================
// MINI JOGO: ADIVINHE O NÚMERO
// =================================

let numeroSecreto = Math.floor(Math.random() * 10) + 1;

function adivinhar() {

    const entrada = document.getElementById("numero");

    const resultado = document.getElementById("resultado");

    const numero = Number(entrada.value);

    if (!Number.isInteger(numero) || numero < 1 || numero > 10) {

        resultado.textContent =
            "Digite um número inteiro de 1 a 10.";

        return;
    }

    partidas++;

    if (numero === numeroSecreto) {

        resultado.textContent =
            "🎉 Parabéns! Você acertou!";

        ganharPontos(10);

        numeroSecreto =
            Math.floor(Math.random() * 10) + 1;

    } else if (numero < numeroSecreto) {

        resultado.textContent =
            "Tente um número maior!";

    } else {

        resultado.textContent =
            "Tente um número menor!";

    }

    atualizarEstatisticas();
}

// REINICIAR JOGO

function reiniciarJogo() {

    numeroSecreto =
        Math.floor(Math.random() * 10) + 1;

    document.getElementById("numero").value = "";

    document.getElementById("resultado").textContent =
        "Novo jogo iniciado!";

}

// INICIALIZAÇÃO

console.log("🎮 GAME ZONE iniciado!");
console.log("Bem-vindo ao mundo gamer!");
