
const pessoas = [];

const formulario = document.getElementById("formPessoa");
const corpoTabela = document.getElementById("corpoTabela");

// Calcular o IMC
function calcularIMC(peso, altura) {
    return peso / (altura * altura);
}

// Classificar o IMC
function obterStatus(imc) {
    if (imc < 18.5) {
        return {
            texto: "Abaixo do peso",
            classe: "abaixo"
        };
    }

    if (imc < 25) {
        return {
            texto: "Peso normal",
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

// Cadastrar pessoa
formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const peso = Number(document.getElementById("peso").value);
    const altura = Number(document.getElementById("altura").value);

    if (nome === "") {
        alert("Informe o nome da pessoa.");
        return;
    }

    if (!Number.isFinite(peso) || peso <= 0) {
        alert("Informe um peso válido.");
        return;
    }

    if (!Number.isFinite(altura) || altura <= 0) {
        alert("Informe uma altura válida.");
        return;
    }

    pessoas.push({
        nome: nome,
        peso: peso,
        altura: altura
    });

    formulario.reset();
    atualizarTabela();
});

// Exibir a tabela
function atualizarTabela() {
    corpoTabela.replaceChildren();

    if (pessoas.length === 0) {
        const linha = document.createElement("tr");
        const celula = document.createElement("td");

        celula.colSpan = 5;
        celula.textContent = "Nenhuma pessoa cadastrada.";

        linha.appendChild(celula);
        corpoTabela.appendChild(linha);
    }

    let somaIMC = 0;

    pessoas.forEach(function(pessoa) {
        const imc = calcularIMC(pessoa.peso, pessoa.altura);
        const status = obterStatus(imc);

        somaIMC += imc;

        const linha = document.createElement("tr");

        const celNome = document.createElement("td");
        celNome.textContent = pessoa.nome;

        const celPeso = document.createElement("td");
        celPeso.textContent = pessoa.peso.toFixed(1) + " kg";

        const celAltura = document.createElement("td");
        celAltura.textContent = pessoa.altura.toFixed(2) + " m";

        const celIMC = document.createElement("td");
        celIMC.textContent = imc.toFixed(2);

        const celStatus = document.createElement("td");
        const etiqueta = document.createElement("span");

        etiqueta.className = "status " + status.classe;
        etiqueta.textContent = status.texto;

        celStatus.appendChild(etiqueta);

        linha.append(
            celNome,
            celPeso,
            celAltura,
            celIMC,
            celStatus
        );

        corpoTabela.appendChild(linha);
    });

    // Atualizar os indicadores
    document.getElementById("totalPessoas").textContent =
        pessoas.length;

    document.getElementById("imcMedio").textContent =
        pessoas.length > 0
            ? (somaIMC / pessoas.length).toFixed(2)
            : "--";
}
