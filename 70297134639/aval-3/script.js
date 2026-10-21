
let pessoas = [];

const formPessoa = document.getElementById("formPessoa");
const listaPessoas = document.getElementById("listaPessoas");

// Cadastrar pessoa
formPessoa.addEventListener("submit", function(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const peso = Number(document.getElementById("peso").value);
    const altura = Number(document.getElementById("altura").value);

    if (nome.length === 0) {
        alert("Digite o nome da pessoa!");
        return;
    }

    if (!Number.isFinite(peso) || peso <= 0) {
        alert("Digite um peso válido!");
        return;
    }

    if (!Number.isFinite(altura) || altura <= 0) {
        alert("Digite uma altura válida!");
        return;
    }

    const pessoa = {
        nome: nome,
        peso: peso,
        altura: altura
    };

    pessoas.push(pessoa);

    formPessoa.reset();
    listarPessoas();
});

// Calcular IMC e classificar
function calcularIMC(peso, altura) {
    return peso / (altura * altura);
}

function classificarIMC(imc) {
    if (imc < 18.5) {
        return {
            status: "Abaixo do peso",
            classe: "abaixo-peso"
        };
    } else if (imc < 25) {
        return {
            status: "Peso normal",
            classe: "peso-normal"
        };
    } else if (imc < 30) {
        return {
            status: "Sobrepeso",
            classe: "sobrepeso"
        };
    } else {
        return {
            status: "Obesidade",
            classe: "obesidade"
        };
    }
}

// Listar pessoas e resultados
function listarPessoas() {
    listaPessoas.innerHTML = "";

    if (pessoas.length === 0) {
        listaPessoas.innerHTML =
            '<tr><td colspan="5">Nenhuma pessoa cadastrada.</td></tr>';
        return;
    }

    pessoas.forEach(function(pessoa) {
        const imc = calcularIMC(pessoa.peso, pessoa.altura);
        const resultado = classificarIMC(imc);

        const linha = document.createElement("tr");

        const celNome = document.createElement("td");
        celNome.textContent = pessoa.nome;

        const celPeso = document.createElement("td");
        celPeso.textContent = pessoa.peso.toFixed(1);

        const celAltura = document.createElement("td");
        celAltura.textContent = pessoa.altura.toFixed(2);

        const celIMC = document.createElement("td");
        celIMC.textContent = imc.toFixed(2);

        const celStatus = document.createElement("td");
        celStatus.textContent = resultado.status;
        celStatus.className = resultado.classe;

        linha.append(
            celNome,
            celPeso,
            celAltura,
            celIMC,
            celStatus
        );

        listaPessoas.appendChild(linha);
    });
}
