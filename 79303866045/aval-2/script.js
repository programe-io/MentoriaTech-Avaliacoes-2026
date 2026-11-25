
// LISTA DOS MELHORES JOGOS
const jogos = [
    {
        nome: "Minecraft",
        nota: 10,
        categoria: "Aventura",
        descricao: "Explore mundos, construa casas e sobreviva!"
    },
    {
        nome: "Fortnite",
        nota: 9.5,
        categoria: "Battle Royale",
        descricao: "Participe de batalhas e seja o último sobrevivente!"
    },
    {
        nome: "GTA V",
        nota: 9.8,
        categoria: "Ação",
        descricao: "Explore uma cidade cheia de missões e aventuras!"
    },
    {
        nome: "Free Fire",
        nota: 9,
        categoria: "Battle Royale",
        descricao: "Entre em partidas emocionantes de sobrevivência!"
    },
    {
        nome: "God of War",
        nota: 10,
        categoria: "Aventura",
        descricao: "Acompanhe Kratos em uma jornada épica!"
    },
    {
        nome: "Roblox",
        nota: 9.5,
        categoria: "Diversão",
        descricao: "Explore milhares de jogos criados pela comunidade!"
    }
];

// MOSTRAR JOGOS NO CONSOLE
console.log("🎮 OS MELHORES JOGOS DO MUNDO");

jogos.forEach((jogo, indice) => {
    console.log(
        `${indice + 1}. ${jogo.nome} - Nota: ${jogo.nota}`
    );
});

// FUNÇÃO DE PESQUISA
function pesquisarJogo() {
    const pesquisa = document
        .getElementById("pesquisa")
        .value.toLowerCase();

    const resultados = jogos.filter(jogo =>
        jogo.nome.toLowerCase().includes(pesquisa)
    );

    mostrarJogos(resultados);
}

// MOSTRAR JOGOS NA TELA
function mostrarJogos(lista) {
    const area = document.getElementById("resultado");

    area.innerHTML = "";

    if (lista.length === 0) {
        area.innerHTML = "<p>Jogo não encontrado!</p>";
        return;
    }

    lista.forEach(jogo => {
        area.innerHTML += `
            <div class="card">
                <h2>${jogo.nome}</h2>
                <p>Categoria: ${jogo.categoria}</p>
                <p>Nota: ⭐ ${jogo.nota}/10</p>
                <p>${jogo.descricao}</p>
            </div>
        `;
    });
}

// ORDENAR POR NOTA
function ordenarJogos() {
    const ranking = [...jogos].sort(
        (a, b) => b.nota - a.nota
    );

    mostrarJogos(ranking);
}

// MENSAGEM DE BOAS-VINDAS
function boasVindas() {
    alert("🎮 Bem-vindo ao Mundo dos Games!");
}

// CARREGAR OS JOGOS AO ABRIR O SITE
window.addEventListener("DOMContentLoaded", () => {
    mostrarJogos(jogos);
    console.log("Site carregado com sucesso!");
});
