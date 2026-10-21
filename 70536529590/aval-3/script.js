
const pessoas = [
    { nome: "Ana", peso: 52, altura: 1.65 },
    { nome: "Carlos", peso: 75, altura: 1.70 },
    { nome: "Mariana", peso: 90, altura: 1.68 },
    { nome: "Pedro", peso: 110, altura: 1.75 },
    { nome: "Julia", peso: 45, altura: 1.60 }
];

const tabela = document.getElementById("tabelaPessoas");

function calcularIMC(peso, altura) {
    return peso / (altura * altura);
}

function verificarStatus(imc) {
    if (imc < 18.5) {
        return {
            texto: "Abaixo do peso",
            classe: "abaixo"
        };
    } else if (imc < 25) {
        return {
            texto: "Peso normal",
            classe: "normal"
        };
    } else if (imc < 30) {
        return {
            texto: "Sobrepeso",
            classe: "sobrepeso"
        };
    } else {
        return {
            texto: "Obesidade",
            classe: "obesidade"
        };
    }
}

pessoas.forEach(function(pessoa) {
    const imc = calcularIMC(pessoa.peso, pessoa.altura);
    const status = verificarStatus(imc);

    const linha = document.createElement("tr");

    linha.innerHTML = `
        <td>${pessoa.nome}</td>
        <td>${pessoa.peso.toFixed(1)}</td>
        <td>${pessoa.altura.toFixed(2)}</td>
        <td>${imc.toFixed(2)}</td>
        <td class="${status.classe}">${status.texto}</td>
    `;

    tabela.appendChild(linha);
});
