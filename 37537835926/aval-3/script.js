const nomeInput = document.getElementById("nome");
const pesoInput = document.getElementById("peso");
const alturaInput = document.getElementById("altura");
const btnAdicionar = document.getElementById("btnAdicionar");
const tabelaPessoas = document.getElementById("tabelaPessoas");


// Função responsável por calcular o IMC
function calcularIMC(peso, altura) {
    return peso / (altura * altura);
}


// Função que identifica a situação da pessoa
function verificarSituacao(imc) {

    if (imc < 18.5) {
        return {
            texto: "Abaixo do peso",
            classe: "abaixo"
        };
    }

    if (imc < 25) {
        return {
            texto: "Normal",
            classe: "normal"
        };
    }

    if (imc < 30) {
        return {
            texto: "Sobrepeso",
            classe: "sobrepeso"
        };
    }

    return {
        texto: "Obesidade",
        classe: "obesidade"
    };
}


// Adiciona uma pessoa na tabela
function adicionarPessoa() {

    const nome = nomeInput.value.trim();
    const peso = Number(pesoInput.value);
    const altura = Number(alturaInput.value);

    // Validação dos campos
    if (nome === "") {
        alert("Digite o nome da pessoa.");
        nomeInput.focus();
        return;
    }

    if (peso <= 0 || isNaN(peso)) {
        alert("Digite um peso válido.");
        pesoInput.focus();
        return;
    }

    if (altura <= 0 || isNaN(altura)) {
        alert("Digite uma altura válida.");
        alturaInput.focus();
        return;
    }


    // Calcula o IMC
    const imc = calcularIMC(peso, altura);

    // Descobre a situação
    const situacao = verificarSituacao(imc);


    // Cria uma nova linha
    const linha = document.createElement("tr");

    linha.innerHTML = `
        <td>${nome}</td>
        <td>${peso.toFixed(1)}</td>
        <td>${altura.toFixed(2)}</td>
        <td>${imc.toFixed(1)}</td>
        <td class="${situacao.classe}">
            ${situacao.texto}
        </td>
    `;


    // Adiciona a linha na tabela
    tabelaPessoas.appendChild(linha);


    // Limpa os campos
    nomeInput.value = "";
    pesoInput.value = "";
    alturaInput.value = "";

    nomeInput.focus();
}


// Evento do botão
btnAdicionar.addEventListener("click", adicionarPessoa);


// Permite cadastrar pressionando Enter
document.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        adicionarPessoa();
    }

});
