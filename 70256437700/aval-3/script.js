

// =====================================
// SISTEMA DE TURISMO - EXPLORE PRAIAS
// =====================================

// LISTA DE DESTINOS
const destinos = [
    {
        nome: "Maceió",
        estado: "Alagoas - Brasil",
        categoria: "Brasil",
        descricao: "Conheça as águas cristalinas, piscinas naturais e belas praias de Maceió.",
        atracoes: "Pajuçara, Ponta Verde e Praia do Francês."
    \},
    {
        nome: "Fortaleza",
        estado: "Ceará - Brasil",
        categoria: "Brasil",
        descricao: "Uma cidade cheia de cultura, praias e gastronomia nordestina.",
        atracoes: "Praia do Futuro, Iracema e Meireles."
    \},
    {
        nome: "Maragogi",
        estado: "Alagoas - Brasil",
        categoria: "Brasil",
        descricao: "Um destino conhecido pelas piscinas naturais e pelo mar azul.",
        atracoes: "Galés de Maragogi e Praia de Antunes."
    \},
    {
        nome: "Porto de Galinhas",
        estado: "Pernambuco - Brasil",
        categoria: "Brasil",
        descricao: "Destino famoso pelas piscinas naturais e passeios de jangada.",
        atracoes: "Praia de Muro Alto e piscinas naturais."
    \},
    {
        nome: "Cancún",
        estado: "México",
        categoria: "Exterior",
        descricao: "Praias paradisíacas de areia branca e águas azul-turquesa.",
        atracoes: "Playa Delfines e Isla Mujeres."
    \},
    {
        nome: "Maldivas",
        estado: "Oceano Índico",
        categoria: "Exterior",
        descricao: "Ilhas tropicais com águas transparentes e paisagens incríveis.",
        atracoes: "Mergulho, passeios de barco e resorts."
    \},
    {
        nome: "Santorini",
        estado: "Grécia",
        categoria: "Exterior",
        descricao: "Destino conhecido pelas paisagens e praias vulcânicas.",
        atracoes: "Red Beach e Perissa."
    \},
    {
        nome: "Bali",
        estado: "Indonésia",
        categoria: "Exterior",
        descricao: "Praias, templos e cultura em um destino tropical.",
        atracoes: "Kuta, Nusa Dua e Uluwatu."
    \}
];

// =====================================
// EXIBIR INFORMAÇÕES DOS DESTINOS
// =====================================

function mostrarInformacoes(nome) {

    const destino = destinos.find(
        item => item.nome.toLowerCase() === nome.toLowerCase()
    );

    if (destino) {
        alert(
            "DESTINO: " + destino.nome +
            "\\nLOCALIZAÇÃO: " + destino.estado +
            "\\n\\nINFORMAÇÕES: " + destino.descricao +
            "\\n\\nPRINCIPAIS ATRAÇÕES: " + destino.atracoes
        );
    \}
\}

// =====================================
// PESQUISAR DESTINOS
// =====================================

function pesquisarDestino() {

    const campo = document.getElementById("pesquisa");

    if (!campo) return;

    const pesquisa = campo.value.toLowerCase().trim();

    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {

        const nome = card.querySelector("h3").textContent.toLowerCase();

        if (nome.includes(pesquisa)) {
            card.style.display = "block";
        \} else {
            card.style.display = "none";
        \}

    \});
\}

// =====================================
// FILTRAR DESTINOS
// =====================================

function filtrarDestinos(categoria) {

    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {

        const texto = card.textContent.toLowerCase();

        if (categoria === "todos") {
            card.style.display = "block";
        \}

        else if (categoria === "brasil") {

            card.style.display =
                texto.includes("brasil") ||
                texto.includes("alagoas") ||
                texto.includes("ceará") ||
                texto.includes("pernambuco")
                ? "block" : "none";
        \}

        else if (categoria === "exterior") {

            card.style.display =
                texto.includes("méxico") ||
                texto.includes("grécia") ||
                texto.includes("maldivas") ||
                texto.includes("indonésia")
                ? "block" : "none";
        \}

    \});
\}

// =====================================
// DICAS DE VIAGEM
// =====================================

function mostrarDica() {

    const dicas = [
        "Leve protetor solar e beba bastante água.",
        "Consulte a previsão do tempo antes de viajar.",
        "Pesquise os hotéis e hospedagens com antecedência.",
        "Consulte a tábua de marés antes de visitar piscinas naturais.",
        "Respeite o meio ambiente e preserve as praias.",
        "Conheça a gastronomia e a cultura local."
    ];

    const indice = Math.floor(Math.random() * dicas.length);

    alert("DICA DE VIAGEM:\\n\\n" + dicas[indice]);
\}

// =====================================
// BOTÃO VOLTAR AO TOPO
// =====================================

function voltarAoTopo() {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    \});

\}

// =====================================
// DATA ATUAL NO RODAPÉ
// =====================================

const ano = document.getElementById("ano");

if (ano) {
    ano.textContent = new Date().getFullYear();
\}

// =====================================
// MENSAGEM DE BOAS-VINDAS
// =====================================

window.addEventListener("load", function() {

    console.log("Sistema Explore Praias carregado!");

\});$0