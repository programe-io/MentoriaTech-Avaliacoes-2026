
// Mensagem no console
console.log("Meu primeiro código JavaScript!");

// Mostrar mensagem
alert("Bem-vindo ao meu site!");

// Função para mudar o título
function mudarTitulo() {
    document.querySelector("h1").textContent =
        "Título alterado com JavaScript!";
}

// Função para mudar a cor de fundo
function mudarCor() {
    document.body.style.backgroundColor = "#35205c";
}

// Contador
let contador = 0;

function contar() {
    contador++;
    document.getElementById("numero").textContent = contador;
}

// Somar dois números
function somar() {
    let n1 = Number(prompt("Digite o primeiro número:"));
    let n2 = Number(prompt("Digite o segundo número:"));

    alert("Resultado: " + (n1 + n2));
}
