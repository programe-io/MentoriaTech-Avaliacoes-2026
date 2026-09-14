const pessoas = [
    {
        nome: "João",
        peso: 72.0,
        altura: 1.65
    },
    {
        nome: "Maria",
        peso: 65.0,
        altura: 1.68
    }
];

const tabela = document.getElementById("tabelaPessoas");

function calcularIMC(peso, altura) {
    return peso / (altura * altura);
}

function verificarSituacao(imc) {
    if (imc < 18.5) {
        return "Abaixo do peso";
    } else if (imc < 25) {
        return "Normal";
    } else if (imc < 30) {
        return "Sobrepeso";
    } else {
        return "Obesidade";
    }
}

function mostrarPessoas() {

    tabela.innerHTML = "";

    pessoas.forEach(function(pessoa) {

        const imc = calcularIMC(pessoa.peso, pessoa.altura);
        const situacao = verificarSituacao(imc);

        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${pessoa.nome}</td>
            <td>${pessoa.peso.toFixed(1)}</td>
            <td>${pessoa.altura.toFixed(2)}</td>
            <td>${imc.toFixed(1)}</td>
            <td>${situacao}</td>
        `;

        const campoSituacao = linha.lastElementChild;

        if (situacao === "Normal") {
            campoSituacao.classList.add("normal");
        } else {
            campoSituacao.classList.add("sobrepeso");
        }

        tabela.appendChild(linha);
    });
}

mostrarPessoas();
