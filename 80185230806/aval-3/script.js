
// Mensagem inicial
console.log("Site iniciado com sucesso!");

// Mudar título
function mudarTitulo() {
    document.querySelector("h1").innerText =
        "Bem-vindo ao meu site!";
}

// Mudar cor de fundo
function mudarCor() {
    document.body.style.backgroundColor = "#35205c";
}

// Contador
let contador = 0;

function aumentar() {
    contador++;
    document.getElementById("numero").innerText = contador;
}

function diminuir() {
    contador--;
    document.getElementById("numero").innerText = contador;
}

function zerar() {
    contador = 0;
    document.getElementById("numero").innerText = contador;
}

// Mostrar data e hora
function mostrarData() {
    let data = new Date();
    alert(data.toLocaleString("pt-BR"));
}

// Saudação personalizada
function saudacao() {
    let nome = prompt("Qual é o seu nome?");

    if (nome) {
        alert("Olá, " + nome + "! Seja bem-vindo!");
    }
}

// Verificar idade
function verificarIdade() {
    let idade = Number(prompt("Digite sua idade:"));

    if (idade >= 18) {
        alert("Você é maior de idade!");
    } else if (idade > 0) {
        alert("Você é menor de idade!");
    } else {
        alert("Idade inválida!");
    }
}
