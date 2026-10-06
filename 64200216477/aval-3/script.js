const filmes = [
    {
        nome: "O Último Herói",
        genero: "Ação",
        nota: "⭐ 9.2",
        icone: "🦸",
        descricao: "Um herói precisa enfrentar seu maior desafio para salvar a cidade."
    },
    {
        nome: "Rindo à Toa",
        genero: "Comédia",
        nota: "⭐ 8.5",
        icone: "😂",
        descricao: "Uma aventura divertida que transforma um dia comum em uma grande confusão."
    },
    {
        nome: "Além das Estrelas",
        genero: "Ficção",
        nota: "⭐ 9.0",
        icone: "🚀",
        descricao: "Uma equipe embarca em uma missão para descobrir novos mundos."
    },
    {
        nome: "Depois do Amanhã",
        genero: "Drama",
        nota: "⭐ 8.8",
        icone: "🎭",
        descricao: "Uma história emocionante sobre escolhas, família e recomeços."
    },
    {
        nome: "Operação Final",
        genero: "Ação",
        nota: "⭐ 8.7",
        icone: "💥",
        descricao: "Um agente recebe uma missão que pode mudar o destino do país."
    },
    {
        nome: "Viagem Inesperada",
        genero: "Comédia",
        nota: "⭐ 8.3",
        icone: "✈️",
        descricao: "Dois amigos embarcam em uma viagem cheia de situações inesperadas."
    },
    {
        nome: "O Novo Mundo",
        genero: "Ficção",
        nota: "⭐ 9.1",
        icone: "🌎",
        descricao: "A humanidade encontra um planeta que pode ser seu novo lar."
    },
    {
        nome: "Uma Nova Chance",
        genero: "Drama",
        nota: "⭐ 8.6",
        icone: "❤️",
        descricao: "Uma pessoa decide mudar sua vida depois de uma grande perda."
    }
];

const areaFilmes = document.getElementById("filmes");
const campoBusca = document.getElementById("campoBusca");
const botaoBuscar = document.getElementById("buscar");
const mensagem = document.getElementById("mensagem");
const botoesFiltro = document.querySelectorAll(".filtro");

let generoAtual = "Todos";

function mostrarFilmes(lista) {
    areaFilmes.innerHTML = "";

    if (lista.length === 0) {
        mensagem.style.display = "block";
        return;
    }

    mensagem.style.display = "none";

    lista.forEach(function(filme) {
        const card = document.createElement("div");

        card.className = "filme";

        card.innerHTML = `
            <div class="poster">${filme.icone}</div>

            <div class="info">
                <h2>${filme.nome}</h2>
                <div class="genero">${filme.genero}</div>
                <p>${filme.descricao}</p>
                <div class="nota">${filme.nota}</div>
            </div>
        `;

        areaFilmes.appendChild(card);
    });
}

function filtrarFilmes() {
    const texto = campoBusca.value.toLowerCase();

    const resultado = filmes.filter(function(filme) {
        const correspondeNome =
            filme.nome.toLowerCase().includes(texto);

        const correspondeGenero =
            generoAtual === "Todos" ||
            filme.genero === generoAtual;

        return correspondeNome && correspondeGenero;
    });

    mostrarFilmes(resultado);
}

botaoBuscar.addEventListener("click", filtrarFilmes);

campoBusca.addEventListener("keyup", function(evento) {
    if (evento.key === "Enter") {
        filtrarFilmes();
    }
});

botoesFiltro.forEach(function(botao) {
    botao.addEventListener("click", function() {

        botoesFiltro.forEach(function(item) {
            item.classList.remove("ativo");
        });

        botao.classList.add("ativo");

        generoAtual = botao.dataset.genero;

        filtrarFilmes();
    });
});

mostrarFilmes(filmes);
