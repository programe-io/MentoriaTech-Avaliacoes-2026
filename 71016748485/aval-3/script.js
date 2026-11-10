
const pessoas = [
    { nome: "Ana", peso: 55, altura: 1.65 },
    { nome: "Carlos", peso: 85, altura: 1.75 },
    { nome: "Maria", peso: 70, altura: 1.60 },
    { nome: "João", peso: 110, altura: 1.80 },
    { nome: "Pedro", peso: 45, altura: 1.70 }
];

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

function listarPessoas() {
    const tabela = document.getElementById("tabelaPessoas");

    pessoas.forEach(pessoa => {
        const imc = calcularIMC(
            pessoa.peso,
            pessoa.altura
        );

        const status = verificarStatus(imc);

        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${pessoa.nome}</td>
            <td>${pessoa.peso}</td>
            <td>${pessoa.altura.toFixed(2)}</td>
            <td>${imc.toFixed(2)}</td>
            <td class="${status.classe}">
                ${status.texto}
            </td>
        `;

        tabela.appendChild(linha);
    });
}

listarPessoas();
