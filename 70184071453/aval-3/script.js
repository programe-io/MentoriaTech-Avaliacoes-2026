javascript

// ==========================================
// 🍔 MUNDO DAS COMIDAS
// Sistema completo de interatividade
// ==========================================

// MENSAGEM DE BOAS-VINDAS
window.addEventListener("load", function() {
    console.log("Mundo das Comidas carregado!");

    console.log("Bem-vindo ao nosso site!");

    const titulo = document.querySelector("header h1");

    if (titulo) {
        titulo.title = "Bem-vindo ao Mundo das Comidas!";
    \}
\});


// ==========================================
// 🍕 LISTA DE COMIDAS
// ==========================================

const comidas = [
    {
        nome: "Pizza",
        preco: 35,
        categoria: "Salgado",
        emoji: "🍕"
    \},
    {
        nome: "Hambúrguer",
        preco: 20,
        categoria: "Salgado",
        emoji: "🍔"
    \},
    {
        nome: "Macarrão",
        preco: 18,
        categoria: "Salgado",
        emoji: "🍝"
    \},
    {
        nome: "Frango Assado",
        preco: 30,
        categoria: "Salgado",
        emoji: "🍗"
    \},
    {
        nome: "Salada",
        preco: 15,
        categoria: "Saudável",
        emoji: "🥗"
    \},
    {
        nome: "Hot Dog",
        preco: 12,
        categoria: "Salgado",
        emoji: "🌭"
    \},
    {
        nome: "Batata Frita",
        preco: 14,
        categoria: "Acompanhamento",
        emoji: "🍟"
    \}
];


// ==========================================
// 🍰 LISTA DE SOBREMESAS
// ==========================================

const sobremesas = [
    "🍰 Bolo de chocolate",
    "🍦 Sorvete de morango",
    "🍮 Pudim de leite",
    "🍫 Brigadeiro",
    "🍓 Salada de frutas",
    "🧁 Cupcake",
    "🍩 Donuts",
    "🍪 Biscoitos"
];


// ==========================================
// 📋 MOSTRAR TODAS AS COMIDAS
// ==========================================

function mostrarComidas() {
    let mensagem = "🍽️ NOSSO CARDÁPIO 🍽️\\n\\n";

    comidas.forEach(function(comida) {
        mensagem += comida.emoji + " " +
        comida.nome + " - R\$ " +
        comida.preco.toFixed(2) + "\\n";
    \});

    alert(mensagem);
\}


// ==========================================
// 🍰 MOSTRAR SOBREMESAS
// ==========================================

function mostrarSobremesas() {
    let mensagem = "🍰 NOSSAS SOBREMESAS 🍰\\n\\n";

    sobremesas.forEach(function(item) {
        mensagem += item + "\\n";
    \});

    alert(mensagem);
\}


// ==========================================
// 🔎 PESQUISAR COMIDA
// ==========================================

function pesquisarComida() {
    const pesquisa = prompt(
        "Digite o nome de uma comida:"
    );

    if (!pesquisa) {
        alert("Você não digitou nenhuma comida!");
        return;
    \}

    const resultado = comidas.find(function(comida) {
        return comida.nome.toLowerCase() ===
        pesquisa.trim().toLowerCase();
    \});

    if (resultado) {
        alert(
            "Comida encontrada! 😋\\n\\n" +
            resultado.emoji + " " + resultado.nome +
            "\\nPreço: R\$ " + resultado.preco.toFixed(2)
        );
    \} else {
        alert("Desculpe! Essa comida não está no cardápio.");
    \}
\}


// ==========================================
// 💰 CALCULAR PREÇO
// ==========================================

function calcularPreco() {
    const nome = prompt(
        "Qual comida você deseja consultar?"
    );

    if (!nome) return;

    const comida = comidas.find(function(item) {
        return item.nome.toLowerCase() === nome.trim().toLowerCase();
    \});

    if (comida) {
        alert(
            "O preço de " + comida.nome +
            " é R\$ " + comida.preco.toFixed(2)
        );
    \} else {
        alert("Comida não encontrada!");
    \}
\}


// ==========================================
// ❤️ MENSAGEM DE AGRADECIMENTO
// ==========================================

function mensagem() {
    alert(
        "❤️ Muito obrigado por visitar o Mundo das Comidas!\\n\\n" +
        "Esperamos que tenha gostado do nosso site!"
    );
\}


// ==========================================
// ⭐ SISTEMA DE AVALIAÇÃO
// ==========================================

function avaliarSite() {
    const nota = prompt(
        "De 1 a 5, qual nota você dá ao nosso site?"
    );

    const numero = Number(nota);

    if (nota === null || nota.trim() === "") {
        return;
    \}

    if (Number.isInteger(numero) && numero >= 1 && numero <= 5) {
        alert(
            "⭐ Você deu nota " + numero +
            " ao nosso site!\\n\\nObrigado pela avaliação!"
        );
    \} else {
        alert("Digite uma nota válida entre 1 e 5.");
    \}
\}


// ==========================================
// 🍔 SUGESTÃO DE COMIDA
// ==========================================

function sugerirComida() {
    const indice = Math.floor(
        Math.random() * comidas.length
    );

    const comida = comidas[indice];

    alert(
        "😋 NOSSA SUGESTÃO PARA VOCÊ!\\n\\n" +
        comida.emoji + " " + comida.nome +
        "\\nPreço: R\$ " + comida.preco.toFixed(2) +
        "\\n\\nQue tal experimentar?"
    );
\}


// ==========================================
// 🍬 SUGESTÃO DE SOBREMESA
// ==========================================

function sugerirSobremesa() {
    const indice = Math.floor(
        Math.random() * sobremesas.length
    );

    alert(
        "🍰 Que tal experimentar?\\n\\n" +
        sobremesas[indice]
    );
\}


// ==========================================
// 📞 CONTATO
// ==========================================

function contato() {
    alert(
        "📞 ENTRE EM CONTATO!\\n\\n" +
        "Email: contato@mundodascomidas.com\\n\\n" +
        "Obrigado pela visita!"
    );
\}


// ==========================================
// 🕒 MOSTRAR DATA E HORÁRIO
// ==========================================

function mostrarData() {
    const agora = new Date();

    const data = agora.toLocaleDateString("pt-BR");
    const horario = agora.toLocaleTimeString("pt-BR");

    alert(
        "📅 Data: " + data +
        "\\n🕒 Horário: " + horario
    );
\}


// ==========================================
// 🛒 CALCULADORA DE PEDIDOS
// ==========================================

function fazerPedido() {
    let nome = prompt(
        "Qual comida você deseja pedir?"
    );

    if (!nome) return;

    const comida = comidas.find(function(item) {
        return item.nome.toLowerCase() === nome.trim().toLowerCase();
    \});

    if (!comida) {
        alert("Desculpe, não encontramos essa comida!");
        return;
    \}

    let quantidade = Number(
        prompt("Quantas unidades você deseja?")
    );

    if (!Number.isInteger(quantidade) || quantidade <= 0) {
        alert("Digite uma quantidade válida!");
        return;
    \}

    let total = comida.preco * quantidade;

    alert(
        "🛒 RESUMO DO PEDIDO\\n\\n" +
        "Comida: " + comida.nome +
        "\\nQuantidade: " + quantidade +
        "\\nPreço unitário: R\$ " + comida.preco.toFixed(2) +
        "\\nTotal: R\$ " + total.toFixed(2) +
        "\\n\\nObrigado pela preferência! ❤️"
    );
\}


// ==========================================
// 🎉 MENSAGEM ALEATÓRIA
// ==========================================

function mensagemAleatoria() {
    const mensagens = [
        "🍕 A vida fica melhor com pizza!",
        "🍔 Um hambúrguer deixa o dia mais feliz!",
        "🍰 Sempre existe espaço para sobremesa!",
        "🍟 Compartilhar comida é compartilhar amor!",
        "🥗 Comer bem também é cuidar de você!",
        "🍫 Um doce pode alegrar o dia!"
    ];

    const indice = Math.floor(
        Math.random() * mensagens.length
    );

    alert(mensagens[indice]);
\}


// ==========================================
// 🔝 VOLTAR AO INÍCIO
// ==========================================

function voltarInicio() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    \});
\}


// ==========================================
// 🖱️ INTERAÇÃO COM OS BOTÕES
// ==========================================

console.log("🍔 Mundo das Comidas está funcionando!");
console.log("🍕 Explore nosso cardápio!");
console.log("🍰 Experimente nossas sobremesas!");$0