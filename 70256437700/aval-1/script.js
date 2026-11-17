// MENSAGEM DE BOAS-VINDAS
window.addEventListener("load", function() {
    alert("Bem-vindo ao Manual de Passeios nas Maldivas! 🌴");
\});

// INFORMAÇÕES DOS PASSEIOS
const passeios = [
    {
        nome: "Ilha de Maafushi",
        descricao: "Uma ilha paradisíaca com praias lindas e águas cristalinas.",
        dica: "Aproveite para fazer passeios de barco e mergulho!"
    \},
    {
        nome: "Mar de Vaadhoo",
        descricao: "Famoso pelo fenômeno natural do mar de estrelas brilhantes.",
        dica: "Visite à noite para tentar observar o fenômeno."
    \},
    {
        nome: "Atol de Ari",
        descricao: "Um lugar incrível para mergulhar e observar a vida marinha.",
        dica: "Leve máscara de mergulho para aproveitar melhor!"
    \},
    {
        nome: "Ilha de Hulhumale",
        descricao: "Uma ilha com praias bonitas, restaurantes e belas paisagens.",
        dica: "Aproveite para caminhar pela orla e tirar fotos."
    \}
];

// FUNÇÃO PARA MOSTRAR INFORMAÇÕES
function mostrarPasseio(nome) {
    const passeio = passeios.find(function(item) {
        return item.nome === nome;
    \});

    if (passeio) {
        alert(
            passeio.nome + "\\n\\n" +
            passeio.descricao + "\\n\\n" +
            "Dica: " + passeio.dica
        );
    \}
\}

// BOTÕES DOS PASSEIOS
document.querySelectorAll(".card").forEach(function(card) {
    card.addEventListener("click", function() {
        const titulo = card.querySelector("h3").textContent;
        mostrarPasseio(titulo);
    \});
\});

// FUNÇÃO DE DICAS DE VIAGEM
function mostrarDica() {
    const dicas = [
        "Use protetor solar durante os passeios! ☀️",
        "Leve roupas leves e confortáveis! 👕",
        "Não esqueça sua câmera para registrar as paisagens! 📸",
        "Respeite a vida marinha e não jogue lixo nas praias! 🌊",
        "Experimente conhecer as ilhas locais! 🏝️"
    ];

    const indice = Math.floor(Math.random() * dicas.length);

    alert(dicas[indice]);
\}

// BOTÃO DE DICAS
const botaoDica = document.querySelector("#botaoDica");

if (botaoDica) {
    botaoDica.addEventListener("click", mostrarDica);
\}

// BOTÃO VOLTAR AO TOPO
const botaoTopo = document.querySelector("#botaoTopo");

if (botaoTopo) {
    botaoTopo.addEventListener("click", function() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        \});
    \});
\}$0