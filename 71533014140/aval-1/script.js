// =====================================
// PRIMEIRO CÓDIGO
// =====================================

function primeiroCodigo() {

    console.log("Olá, mundo!");

    const resultado =
        document.getElementById("resultado");

    resultado.innerHTML =
        "<strong>Olá, mundo!</strong>" +
        "<br>" +
        "JavaScript executado com sucesso!";
}


// =====================================
// VARIÁVEIS
// =====================================

function mostrarVariaveis() {

    let nome = "Aluno";

    let idade = 20;

    let curso = "JavaScript";


    console.log(nome);

    console.log(idade);

    console.log(curso);


    const resultado =
        document.getElementById("variaveis");


    resultado.innerHTML =
        "Nome: <strong>" + nome + "</strong>" +
        "<br>" +
        "Idade: <strong>" + idade + "</strong>" +
        "<br>" +
        "Curso: <strong>" + curso + "</strong>";
}


// =====================================
// OPERADORES
// =====================================

function calcular() {

    let numero1 = 10;

    let numero2 = 5;


    let soma =
        numero1 + numero2;

    let subtracao =
        numero1 - numero2;

    let multiplicacao =
        numero1 * numero2;

    let divisao =
        numero1 / numero2;


    const resultado =
        document.getElementById("calculo");


    resultado.innerHTML =
        numero1 + " + " + numero2 +
        " = <strong>" + soma + "</strong>" +

        "<br>" +

        numero1 + " - " + numero2 +
        " = <strong>" + subtracao + "</strong>" +

        "<br>" +

        numero1 + " × " + numero2 +
        " = <strong>" + multiplicacao + "</strong>" +

        "<br>" +

        numero1 + " ÷ " + numero2 +
        " = <strong>" + divisao + "</strong>";
}


// =====================================
// ESTRUTURA CONDICIONAL
// =====================================

function verificarIdade() {

    const idade =
        Number(
            document.getElementById("idade").value
        );


    const resultado =
        document.getElementById(
            "idadeResultado"
        );


    if (idade <= 0) {

        resultado.innerHTML =
            "Digite uma idade válida.";

        resultado.style.color =
            "#dc2626";

        return;
    }


    if (idade >= 18) {

        resultado.innerHTML =
            "Você é maior de idade.";

        resultado.style.color =
            "#16a34a";

    } else {

        resultado.innerHTML =
            "Você é menor de idade.";

        resultado.style.color =
            "#dc2626";
    }
}


// =====================================
// FUNÇÃO
// =====================================

function saudacao(nome) {

    return "Olá, " + nome +
        "! Seja bem-vindo ao curso de JavaScript.";
}


function executarFuncao() {

    const mensagem =
        saudacao("Aluno");


    const resultado =
        document.getElementById("funcao");


    resultado.innerHTML =
        mensagem +
        "<br><br>" +
        "Esta mensagem foi criada usando uma função.";
}


// =====================================
// CONSOLE
// =====================================

console.log("Curso de JavaScript iniciado!");

console.log("Olá, mundo!");
