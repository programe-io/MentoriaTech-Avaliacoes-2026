
// ===== 1. MENSAGENS SOBRE OS ANIMAIS =====

function mensagemTecnologia() {

    const frases = [
        "Proteja os animais, proteja a vida! 🐾",
        "Todos os animais merecem amor e respeito! ❤️",
        "A natureza precisa de nós! 🌳",
        "Cuide dos animais e preserve o planeta! 🌎",
        "Os animais são presentes da natureza! 🦁"
    ];

    const sorteio = Math.floor(Math.random() * frases.length);

    document.getElementById("mensagem").innerHTML =
        frases[sorteio];
\}


// ===== 2. CURIOSIDADES DOS ANIMAIS =====

function mostrarCuriosidade() {

    const curiosidades = [
        "🐙 O polvo possui três corações!",
        "🦒 A girafa possui uma língua muito comprida!",
        "🐘 Os elefantes possuem uma ótima memória!",
        "🐬 Os golfinhos utilizam sons para se comunicar!",
        "🦋 As borboletas sentem sabores com os pés!",
        "🐢 Algumas tartarugas podem viver por muitas décadas!"
    ];

    const sorteio = Math.floor(Math.random() * curiosidades.length);

    document.getElementById("curiosidade").innerHTML =
        curiosidades[sorteio];
\}


// ===== 3. QUIZ DOS ANIMAIS =====

function verificarQuiz() {

    const resposta = document.getElementById("resposta")
        .value.trim().toLowerCase();

    const resultado = document.getElementById("resultado");

    if (
        resposta === "elefante" ||
        resposta === "elefantes"
    ) {
        resultado.innerHTML = "🎉 Parabéns! Você acertou!";
        resultado.style.color = "green";
    \} else {
        resultado.innerHTML = "❌ Não foi dessa vez! Tente novamente.";
        resultado.style.color = "red";
    \}
\}


// ===== 4. CONTADOR DE ANIMAIS FAVORITOS =====

let favoritos = 0;

function adicionarFavorito() {

    favoritos++;

    document.getElementById("contador").innerHTML =
        "❤️ Animais favoritos: " + favoritos;
\}

function zerarFavoritos() {

    favoritos = 0;

    document.getElementById("contador").innerHTML =
        "❤️ Animais favoritos: 0";
\}


// ===== 5. PESQUISA DE ANIMAIS =====

function pesquisarAnimal() {

    const pesquisa = document.getElementById("pesquisa")
        .value.trim().toLowerCase();

    const animais = {
        cachorro: "🐶 O cachorro é um animal doméstico muito companheiro.",
        gato: "🐱 O gato é conhecido por sua agilidade e independência.",
        leao: "🦁 O leão é um grande felino selvagem.",
        elefante: "🐘 O elefante é um dos maiores animais terrestres.",
        golfinho: "🐬 O golfinho é um mamífero marinho inteligente.",
        tartaruga: "🐢 A tartaruga é um réptil protegido por um casco."
    \};

    const resultado = document.getElementById("pesquisaResultado");

    if (animais[pesquisa]) {
        resultado.innerHTML = animais[pesquisa];
    \} else {
        resultado.innerHTML =
            "Animal não encontrado. Tente outro nome!";
    \}
\}


// ===== 6. RELÓGIO DIGITAL =====

function atualizarRelogio() {

    const agora = new Date();

    const horario = agora.toLocaleTimeString("pt-BR");

    document.getElementById("relogio").innerHTML = horario;
\}

atualizarRelogio();

setInterval(atualizarRelogio, 1000);$0