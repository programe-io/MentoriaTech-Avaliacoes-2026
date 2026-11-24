
// ======================================
// PROJETO: TURISMO NO BRASIL
// HTML + CSS + JAVASCRIPT EM UM ARQUIVO
// ======================================

// Criando o estilo CSS
const estilo = document.createElement("style");

estilo.textContent = `
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Arial, sans-serif;
    scroll-behavior: smooth;
}

body {
    background: #f1f5ed;
    color: #333;
}

header {
    background: #08783e;
    color: white;
    text-align: center;
    padding: 40px 20px;
}

header h1 {
    font-size: 36px;
    margin-bottom: 12px;
}

nav {
    background: #ffcf33;
    padding: 18px;
    text-align: center;
}

nav a {
    color: #333;
    text-decoration: none;
    margin: 12px;
    font-weight: bold;
}

nav a:hover {
    color: #08783e;
}

.banner {
    background: #d8e9d5;
    text-align: center;
    padding: 55px 20px;
}

.banner h2 {
    color: #08783e;
    font-size: 30px;
    margin-bottom: 15px;
}

.container {
    max-width: 1100px;
    margin: auto;
    padding: 35px 20px;
}

h2 {
    color: #08783e;
    margin-bottom: 20px;
    text-align: center;
}

.destinos {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 22px;
}

.card {
    background: white;
    padding: 22px;
    border-radius: 12px;
    box-shadow: 0 4px 10px #0002;
    transition: 0.3s;
}

.card:hover {
    transform: translateY(-6px);
}

.card h3 {
    color: #08783e;
    margin-bottom: 12px;
}

.card p {
    line-height: 1.6;
    margin-bottom: 8px;
}

.destaque {
    background: #fff0bd;
    padding: 25px;
    border-radius: 10px;
    margin-top: 35px;
    line-height: 1.8;
}

input {
    width: 100%;
    padding: 13px;
    border: 1px solid #ccc;
    border-radius: 7px;
    margin-bottom: 15px;
    font-size: 15px;
}

button {
    background: #08783e;
    color: white;
    border: none;
    padding: 12px 20px;
    border-radius: 7px;
    cursor: pointer;
    margin: 5px;
}

button:hover {
    background: #05572c;
}

footer {
    background: #07552d;
    color: white;
    text-align: center;
    padding: 25px;
    margin-top: 40px;
}

@media(max-width: 600px) {
    header h1 {
        font-size: 27px;
    }

    nav a {
        display: inline-block;
        margin: 8px;
    }
}
`;

document.head.appendChild(estilo);


// ======================================
// CRIANDO O HTML DO SITE
// ======================================

document.body.innerHTML = `

<header>
    <h1>BRASIL: DESTINOS INCRÍVEIS</h1>
    <p>Conheça as belezas e os principais pontos turísticos do nosso país!</p>
</header>

<nav>
    <a href="#inicio">Início</a>
    <a href="#destinos">Destinos</a>
    <a href="#cultura">Cultura</a>
    <a href="#sobre">Sobre</a>
</nav>

<section class="banner" id="inicio">
    <h2>Descubra o Brasil!</h2>

    <p>
        Um país cheio de belezas naturais, praias,
        monumentos históricos e lugares inesquecíveis.
    </p>
</section>

<main class="container">

    <section id="destinos">

        <h2>Principais pontos turísticos do Brasil</h2>

        <input
            type="text"
            id="pesquisa"
            placeholder="Pesquise por cidade ou ponto turístico..."
        >

        <button id="pesquisar">Pesquisar</button>
        <button id="mostrarTodos">Mostrar todos</button>

        <div class="destinos" id="listaDestinos"></div>

    </section>

    <section id="cultura" class="destaque">

        <h2>Turismo e cultura brasileira</h2>

        <p>
            O Brasil é um país de grande diversidade cultural
            e natural. Cada região possui características
            próprias, com tradições, comidas típicas,
            festas populares e paisagens diferentes.
        </p>

        <p>
            O turismo ajuda a valorizar a cultura brasileira,
            movimenta a economia e gera oportunidades de emprego.
        </p>

    </section>

    <section id="sobre" class="destaque">

        <h2>A importância do turismo</h2>

        <p>
            O turismo é fundamental para o desenvolvimento
            do Brasil. Ele atrai visitantes de diferentes
            partes do mundo e contribui para divulgar
            as belezas e riquezas do nosso país.
        </p>

    </section>

</main>

<footer>
    <p>Projeto Turismo no Brasil - 2026</p>
    <p>Conheça, explore e valorize o nosso país!</p>
</footer>

`;


// ======================================
// LISTA DE PONTOS TURÍSTICOS
// ======================================

const pontosTuristicos = [

    {
        nome: "Cristo Redentor",
        cidade: "Rio de Janeiro - RJ",
        descricao: "Monumento famoso mundialmente, com uma vista incrível da cidade.",
        melhorEpoca: "O ano inteiro",
        categoria: "Monumento histórico"
    },

    {
        nome: "Pão de Açúcar",
        cidade: "Rio de Janeiro - RJ",
        descricao: "Conhecido pelo passeio de bondinho e suas belas paisagens.",
        melhorEpoca: "O ano inteiro",
        categoria: "Paisagem natural"
    },

    {
        nome: "Cataratas do Iguaçu",
        cidade: "Foz do Iguaçu - PR",
        descricao: "Um conjunto impressionante de enormes quedas d'água.",
        melhorEpoca: "O ano inteiro",
        categoria: "Natureza"
    },

    {
        nome: "Fernando de Noronha",
        cidade: "Pernambuco - PE",
        descricao: "Arquipélago conhecido por suas praias paradisíacas e águas cristalinas.",
        melhorEpoca: "Setembro a março",
        categoria: "Praias"
    },

    {
        nome: "Pelourinho",
        cidade: "Salvador - BA",
        descricao: "Centro histórico famoso pela arquitetura colonial e cultura baiana.",
        melhorEpoca: "O ano inteiro",
        categoria: "História e cultura"
    },

    {
        nome: "Lençóis Maranhenses",
        cidade: "Maranhão - MA",
        descricao: "Parque nacional com dunas de areia branca e lagoas naturais.",
        melhorEpoca: "Maio a setembro",
        categoria: "Natureza"
    },

    {
        nome: "Gramado",
        cidade: "Rio Grande do Sul - RS",
        descricao: "Cidade turística conhecida pelo clima frio, chocolates e Natal Luz.",
        melhorEpoca: "O ano inteiro",
        categoria: "Turismo urbano"
    },

    {
        nome: "Jardim Botânico",
        cidade: "Curitiba - PR",
        descricao: "Cartão-postal famoso por sua estufa de vidro e jardins.",
        melhorEpoca: "Primavera e verão",
        categoria: "Natureza"
    },

    {
        nome: "Praia de Copacabana",
        cidade: "Rio de Janeiro - RJ",
        descricao: "Uma das praias mais famosas e movimentadas do Brasil.",
        melhorEpoca: "O ano inteiro",
        categoria: "Praia"
    },

    {
        nome: "Encontro das Águas",
        cidade: "Manaus - AM",
        descricao: "Fenômeno natural onde os rios Negro e Solimões correm lado a lado.",
        melhorEpoca: "O ano inteiro",
        categoria: "Natureza"
    }

];


// ======================================
// FUNÇÃO PARA MOSTRAR OS DESTINOS
// ======================================

function mostrarPontos(lista) {

    const elemento = document.getElementById("listaDestinos");

    elemento.innerHTML = "";

    if (lista.length === 0) {
        elemento.innerHTML = "<p>Nenhum destino encontrado.</p>";
        return;
    }

    lista.forEach(ponto => {

        const card = document.createElement("div");

        card.className = "card";

        const titulo = document.createElement("h3");
        titulo.textContent = ponto.nome;

        const cidade = document.createElement("p");
        cidade.textContent = "Localização: " + ponto.cidade;

        const descricao = document.createElement("p");
        descricao.textContent = "Descrição: " + ponto.descricao;

        const epoca = document.createElement("p");
        epoca.textContent = "Melhor época: " + ponto.melhorEpoca;

        const categoria = document.createElement("p");
        categoria.textContent = "Categoria: " + ponto.categoria;

        card.append(
            titulo,
            cidade,
            descricao,
            epoca,
            categoria
        );

        elemento.appendChild(card);

    });

}


// ======================================
// FUNÇÃO DE PESQUISA
// ======================================

function pesquisarPonto() {

    const pesquisa = document
        .getElementById("pesquisa")
        .value
        .toLowerCase()
        .trim();

    const resultado = pontosTuristicos.filter(ponto =>

        ponto.nome.toLowerCase().includes(pesquisa) ||
        ponto.cidade.toLowerCase().includes(pesquisa) ||
        ponto.categoria.toLowerCase().includes(pesquisa)

    );

    mostrarPontos(resultado);

}


// ======================================
// BOTÕES DO SITE
// ======================================

document.getElementById("pesquisar")
    .addEventListener("click", pesquisarPonto);

document.getElementById("mostrarTodos")
    .addEventListener("click", () => {

        document.getElementById("pesquisa").value = "";

        mostrarPontos(pontosTuristicos);

    });

document.getElementById("pesquisa")
    .addEventListener("keydown", evento => {

        if (evento.key === "Enter") {
            pesquisarPonto();
        }

    });


// ======================================
// INICIAR O SITE
// ======================================

mostrarPontos(pontosTuristicos);
