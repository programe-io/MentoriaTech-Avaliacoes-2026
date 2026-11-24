const dicas = [
    "🍎 Consuma frutas variadas todos os dias!",
    "💧 Beba água regularmente ao longo do dia!",
    "🥦 Inclua verduras e legumes nas refeições!",
    "🥗 Experimente preparar uma salada colorida!",
    "🌾 Prefira alimentos ricos em fibras!",
    "🍌 Inclua frutas no café da manhã!",
    "🫘 Consuma feijão e outros alimentos naturais!",
    "🥕 Varie as cores dos alimentos no seu prato!",
    "🚶 Pratique atividades físicas regularmente!",
    "😴 Tenha uma boa rotina de sono!"
];

function gerarDica() {
    const indice = Math.floor(Math.random() * dicas.length);

    const elemento = document.getElementById("dica");

    if (elemento) {
        elemento.textContent = dicas[indice];
    \}
\}


/* 2. RECEITAS SAUDÁVEIS */

const receitas = [
    {
        nome: "Salada Colorida 🥗",
        ingredientes: [
            "Alface",
            "Tomate",
            "Cenoura ralada",
            "Azeite",
            "Limão"
        ],
        preparo: "Lave os ingredientes, corte os vegetais e misture tudo. Tempere a gosto."
    \},

    {
        nome: "Vitamina de Banana 🍌",
        ingredientes: [
            "1 banana",
            "1 copo de leite",
            "Aveia a gosto"
        ],
        preparo: "Coloque todos os ingredientes no liquidificador e bata até ficar homogêneo."
    \},

    {
        nome: "Mingau de Aveia 🥣",
        ingredientes: [
            "1 copo de leite",
            "3 colheres de aveia",
            "1 banana"
        ],
        preparo: "Misture o leite e a aveia em uma panela, mexa até engrossar e acrescente a banana."
    \},

    {
        nome: "Sanduíche Natural 🥪",
        ingredientes: [
            "Pão integral",
            "Frango desfiado",
            "Alface",
            "Tomate",
            "Cenoura"
        ],
        preparo: "Monte o sanduíche com os ingredientes e sirva."
    \}
];

function mostrarReceita() {
    const indice = Math.floor(Math.random() * receitas.length);
    const receita = receitas[indice];

    const resultado = document.getElementById("resultado-receita");

    if (!resultado) return;

    resultado.innerHTML = `
        <h3>\${receita.nome\}</h3>

        <h4>Ingredientes:</h4>

        <ul>
            \${receita.ingredientes.map(item =>
                `<li>\${item\}</li>`
            ).join("")\}
        </ul>

        <h4>Modo de preparo:</h4>

        <p>\${receita.preparo\}</p>
    `;
\}


/* 3. PESQUISA DE ALIMENTOS */

const alimentos = [
    {
        nome: "Maçã",
        categoria: "Fruta",
        descricao: "Fonte de fibras e outros nutrientes."
    \},
    {
        nome: "Banana",
        categoria: "Fruta",
        descricao: "Contém potássio e carboidratos."
    \},
    {
        nome: "Brócolis",
        categoria: "Legume",
        descricao: "Fornece fibras, vitaminas e minerais."
    \},
    {
        nome: "Cenoura",
        categoria: "Legume",
        descricao: "Contém betacaroteno e fibras."
    \},
    {
        nome: "Aveia",
        categoria: "Cereal",
        descricao: "Fonte de fibras alimentares."
    \},
    {
        nome: "Feijão",
        categoria: "Leguminosa",
        descricao: "Fornece proteínas vegetais e fibras."
    \},
    {
        nome: "Ovo",
        categoria: "Proteína",
        descricao: "Contém proteínas e diversos nutrientes."
    \},
    {
        nome: "Laranja",
        categoria: "Fruta",
        descricao: "Fonte de vitamina C e fibras."
    \}
];

function pesquisarAlimento() {
    const campo = document.getElementById("pesquisa-alimento");
    const resultado = document.getElementById("resultado-pesquisa");

    if (!campo || !resultado) return;

    const pesquisa = campo.value.trim().toLowerCase();

    if (pesquisa === "") {
        resultado.textContent = "Digite o nome de um alimento.";
        return;
    \}

    const encontrados = alimentos.filter(alimento =>
        alimento.nome.toLowerCase().includes(pesquisa)
    );

    if (encontrados.length === 0) {
        resultado.textContent = "Nenhum alimento encontrado.";
        return;
    \}

    resultado.innerHTML = encontrados.map(alimento => `
        <div class="card">
            <h3>\${alimento.nome\}</h3>
            <p><strong>Categoria:</strong> \${alimento.categoria\}</p>
            <p>\${alimento.descricao\}</p>
        </div>
    `).join("");
\}


/* 4. CALCULADORA DE ÁGUA */

function calcularAgua() {
    const campo = document.getElementById("peso");
    const resultado = document.getElementById("resultado-agua");

    if (!campo || !resultado) return;

    const peso = Number(campo.value);

    if (!Number.isFinite(peso) || peso <= 0 || peso > 500) {
        resultado.textContent = "Digite um peso válido.";
        return;
    \}

    // Estimativa ilustrativa de 35 ml por kg.
    const quantidade = peso * 35;
    const litros = (quantidade / 1000).toFixed(2);

    resultado.textContent =
        `Estimativa ilustrativa: \${litros\} litros de água por dia. 
        A necessidade individual pode variar.`;
\}


/* 5. QUIZ DE ALIMENTAÇÃO SAUDÁVEL */

const perguntas = [
    {
        pergunta: "Qual alimento é fonte de fibras?",
        opcoes: ["Refrigerante", "Aveia", "Bala"],
        correta: 1
    \},

    {
        pergunta: "Qual hábito contribui para uma boa alimentação?",
        opcoes: [
            "Comer alimentos variados",
            "Pular todas as refeições",
            "Consumir apenas doces"
        ],
        correta: 0
    \},

    {
        pergunta: "Qual bebida é essencial para a hidratação?",
        opcoes: ["Refrigerante", "Água", "Energético"],
        correta: 1
    \},

    {
        pergunta: "Qual destes alimentos é uma fruta?",
        opcoes: ["Cenoura", "Feijão", "Mamão"],
        correta: 2
    \},

    {
        pergunta: "Qual alimento é fonte de proteína?",
        opcoes: ["Ovo", "Açúcar", "Refrigerante"],
        correta: 0
    \}
];

let perguntaAtual = 0;
let pontuacao = 0;

function iniciarQuiz() {
    perguntaAtual = 0;
    pontuacao = 0;
    mostrarPergunta();
\}

function mostrarPergunta() {
    const perguntaElemento = document.getElementById("pergunta");
    const opcoesElemento = document.getElementById("opcoes");
    const resultado = document.getElementById("resultado-quiz");

    if (!perguntaElemento || !opcoesElemento) return;

    if (perguntaAtual >= perguntas.length) {
        perguntaElemento.textContent = "Quiz finalizado! 🎉";

        opcoesElemento.innerHTML = "";

        resultado.textContent =
            `Você acertou \${pontuacao\} de \${perguntas.length\} perguntas!`;

        return;
    \}

    const pergunta = perguntas[perguntaAtual];

    perguntaElemento.textContent = pergunta.pergunta;

    resultado.textContent = "";

    opcoesElemento.innerHTML = "";

    pergunta.opcoes.forEach((opcao, indice) => {
        const botao = document.createElement("button");

        botao.textContent = opcao;

        botao.addEventListener("click", () => {
            responderPergunta(indice);
        \});

        opcoesElemento.appendChild(botao);
    \});
\}

function responderPergunta(resposta) {
    const correta = perguntas[perguntaAtual].correta;
    const resultado = document.getElementById("resultado-quiz");

    if (resposta === correta) {
        pontuacao++;
        resultado.textContent = "Muito bem! Resposta correta! 🎉";
    \} else {
        resultado.textContent = "Não foi dessa vez! Continue aprendendo! 🌱";
    \}

    perguntaAtual++;

    setTimeout(mostrarPergunta, 1200);
\}


/* 6. MENSAGEM DE BOAS-VINDAS */

function mensagemBoasVindas() {
    console.log("Bem-vindo ao Vida Saudável! 🥗");
    console.log("Cuide da sua alimentação e da sua saúde!");
\}


/* 7. ANO AUTOMÁTICO NO RODAPÉ */

function atualizarAno() {
    const elemento = document.getElementById("ano");

    if (elemento) {
        elemento.textContent = new Date().getFullYear();
    \}
\}


/* 8. BOTÃO VOLTAR AO TOPO */

function voltarAoTopo() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    \});
\}


/* 9. ANIMAÇÃO DOS CARTÕES */

function animarCartoes() {
    const cartoes = document.querySelectorAll(".card");

    cartoes.forEach(cartao => {
        cartao.addEventListener("mouseenter", () => {
            cartao.style.transform = "translateY(-7px)";
        \});

        cartao.addEventListener("mouseleave", () => {
            cartao.style.transform = "translateY(0)";
        \});
    \});
\}


/* 10. INICIALIZAÇÃO */

document.addEventListener("DOMContentLoaded", () => {
    mensagemBoasVindas();
    atualizarAno();
    animarCartoes();

    console.log("Sistema Vida Saudável carregado com sucesso!");
\});$0