// ================================
// CONECTAMENTE
// Psicóloga Fabrícia
// ================================


// PERGUNTAS DO QUIZ

const perguntas = [

    {
        categoria: "AUTOCONHECIMENTO",
        pergunta: "O que significa autoconhecimento?",
        respostas: [
            "Conhecer melhor seus pensamentos, sentimentos e comportamentos.",
            "Nunca cometer erros.",
            "Saber tudo sobre outras pessoas.",
            "Esconder aquilo que sentimos."
        ],
        correta: 0
    },

    {
        categoria: "COMUNICAÇÃO",
        pergunta: "Qual atitude demonstra uma boa comunicação?",
        respostas: [
            "Interromper a outra pessoa.",
            "Falar sem ouvir.",
            "Ouvir com atenção e respeito.",
            "Ignorar opiniões diferentes."
        ],
        correta: 2
    },

    {
        categoria: "BEM-ESTAR",
        pergunta: "Qual atitude pode ajudar a ter uma rotina mais equilibrada?",
        respostas: [
            "Nunca descansar.",
            "Organizar momentos de estudo, descanso e lazer.",
            "Fazer tudo ao mesmo tempo.",
            "Ignorar quando estiver cansado."
        ],
        correta: 1
    },

    {
        categoria: "REFLEXÃO",
        pergunta: "Quando algo dá errado, qual pode ser uma atitude construtiva?",
        respostas: [
            "Desistir imediatamente.",
            "Culpar outra pessoa.",
            "Refletir sobre o que aconteceu e pensar nos próximos passos.",
            "Fingir que nada aconteceu."
        ],
        correta: 2
    },

    {
        categoria: "APRENDIZADO",
        pergunta: "O que podemos aprender com nossos erros?",
        respostas: [
            "Que nunca devemos tentar novamente.",
            "Que não somos capazes de aprender.",
            "Que erros podem trazer novos aprendizados.",
            "Que devemos sempre culpar alguém."
        ],
        correta: 2
    }

];


// VARIÁVEIS

let numero = 0;
let pontos = 0;
let respondeu = false;


// PEGAR ELEMENTOS DA PÁGINA

const pergunta = document.getElementById("pergunta");
const categoria = document.getElementById("categoria");
const respostas = document.getElementById("respostas");
const mensagem = document.getElementById("mensagem");
const pontosTela = document.getElementById("pontos");
const contador = document.getElementById("contador");
const progresso = document.getElementById("progresso");
const proxima = document.getElementById("proxima");


// MOSTRAR PERGUNTA

function mostrarPergunta() {

    respondeu = false;

    proxima.disabled = true;

    mensagem.textContent = "";

    const atual = perguntas[numero];

    pergunta.textContent = atual.pergunta;

    categoria.textContent = atual.categoria;

    contador.textContent =
        "Pergunta " + (numero + 1) +
        " de " + perguntas.length;

    progresso.style.width =
        ((numero + 1) / perguntas.length * 100) + "%";


    // APAGAR RESPOSTAS ANTERIORES

    respostas.innerHTML = "";


    // CRIAR OS BOTÕES

    atual.respostas.forEach(function(texto, indice) {

        const botao = document.createElement("button");

        botao.className = "resposta";

        botao.textContent = texto;


        botao.onclick = function() {

            escolherResposta(indice, botao);

        };


        respostas.appendChild(botao);

    });

}


// ESCOLHER RESPOSTA

function escolherResposta(indice, botao) {

    if (respondeu === true) {
        return;
    }

    respondeu = true;

    const atual = perguntas[numero];

    const todos =
        document.querySelectorAll(".resposta");


    // DESABILITAR TODOS

    todos.forEach(function(item) {
        item.disabled = true;
    });


    // MOSTRAR RESPOSTA CORRETA

    todos[atual.correta].classList.add("certa");


    // VERIFICAR

    if (indice === atual.correta) {

        pontos += 100;

        pontosTela.textContent = pontos;

        mensagem.textContent =
            "🎉 Muito bem! Você acertou!";

        mensagem.style.color = "#71913c";

    } else {

        botao.classList.add("errada");

        mensagem.textContent =
            "💭 Quase! A resposta correta está destacada.";

        mensagem.style.color = "#b35e55";
    }


    proxima.disabled = false;

}


// BOTÃO PRÓXIMA

proxima.onclick = function() {

    numero++;

    if (numero < perguntas.length) {

        mostrarPergunta();

    } else {

        mostrarResultado();

    }

};


// MOSTRAR RESULTADO

function mostrarResultado() {

    document.querySelector(".quiz").style.display =
        "none";

    document.getElementById("resultado").style.display =
        "block";


    document.getElementById("pontuacaoFinal").textContent =
        pontos;


    const titulo =
        document.getElementById("tituloResultado");

    const texto =
        document.getElementById("textoResultado");


    if (pontos === 500) {

        titulo.textContent =
            "🌟 Excelente!";

        texto.textContent =
            "Você respondeu todas as perguntas corretamente!";

    } else if (pontos >= 300) {

        titulo.textContent =
            "💛 Muito bem!";

        texto.textContent =
            "Você teve um ótimo resultado. Continue aprendendo!";

    } else {

        titulo.textContent =
            "🌱 Continue praticando!";

        texto.textContent =
            "Cada pergunta é uma oportunidade de aprender algo novo.";

    }


    document
        .getElementById("resultado")
        .scrollIntoView({
            behavior: "smooth"
        });

}


// COMEÇAR

document.getElementById("começar").onclick = function() {

    document
        .getElementById("quiz")
        .scrollIntoView({
            behavior: "smooth"
        });

};


// REINICIAR

document.getElementById("reiniciar").onclick = function() {

    numero = 0;

    pontos = 0;

    pontosTela.textContent = "0";


    document.getElementById("resultado").style.display =
        "none";

    document.querySelector(".quiz").style.display =
        "block";


    mostrarPergunta();


    document
        .getElementById("quiz")
        .scrollIntoView({
            behavior: "smooth"
        });

};


// FRASES

const frases = [

    "Cada pequeno passo também é progresso.",

    "Conhecer a si mesmo é uma jornada.",

    "Cuidar de si também é importante.",

    "Você pode aprender com cada experiência.",

    "Nem todo dia precisa ser perfeito.",

    "Pequenas mudanças podem fazer diferença."

];


document.getElementById("novaFrase").onclick = function() {

    const numeroFrase =
        Math.floor(Math.random() * frases.length);

    document.getElementById("frase").textContent =
        '"' + frases[numeroFrase] + '"';

};


// MODO ESCURO

document.getElementById("tema").onclick = function() {

    document.body.classList.toggle("escuro");

    if (document.body.classList.contains("escuro")) {

        document.getElementById("tema").textContent = "☀️";

    } else {

        document.getElementById("tema").textContent = "🌙";

    }

};


// IMPORTANTE:
// CARREGAR A PRIMEIRA PERGUNTA ASSIM QUE A PÁGINA ABRIR

mostrarPergunta();