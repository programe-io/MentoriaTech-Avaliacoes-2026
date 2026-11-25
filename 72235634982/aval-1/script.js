
const form = document.getElementById("form-pessoa");
const lista = document.getElementById("lista-pessoas");
const erro = document.getElementById("erro");

let pessoas = JSON.parse(
    localStorage.getItem("pessoas")
) || [];

// Calcular IMC
function calcularIMC(peso, altura) {
    return peso / (altura * altura);
}

// Classificar IMC
function classificarIMC(imc) {

    if (imc < 18.5) {
        return {
            texto: "Abaixo do peso",
            classe: "baixo"
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

// Salvar dados
function salvar() {
    localStorage.setItem(
        "pessoas",
        JSON.stringify(pessoas)
    );
}

// Atualizar resumo
function atualizarResumo() {

    document.getElementById("total").textContent =
        pessoas.length;

    const media = pessoas.length
        ? pessoas.reduce((soma, p) => soma + p.imc, 0)
          / pessoas.length
        : 0;

    document.getElementById("media").textContent =
        media.toFixed(2);
}

// Renderizar tabela
function render() {

    lista.innerHTML = "";

    pessoas.forEach((pessoa, indice) => {

        const classificacao = classificarIMC(pessoa.imc);

        const tr = document.createElement("tr");

        const tdNome = document.createElement("td");
        tdNome.textContent = pessoa.nome;

        const tdPeso = document.createElement("td");
        tdPeso.textContent = pessoa.peso.toFixed(1) + " kg";

        const tdAltura = document.createElement("td");
        tdAltura.textContent = pessoa.altura.toFixed(2) + " m";

        const tdIMC = document.createElement("td");
        tdIMC.textContent = pessoa.imc.toFixed(2);

        const tdClassificacao = document.createElement("td");
        const selo = document.createElement("span");

        selo.className = "selo " + classificacao.classe;
        selo.textContent = classificacao.texto;

        tdClassificacao.appendChild(selo);

        const tdAcao = document.createElement("td");
        const botao = document.createElement("button");

        botao.textContent = "Excluir";
        botao.className = "excluir";
        botao.dataset.indice = indice;

        tdAcao.appendChild(botao);

        tr.append(
            tdNome,
            tdPeso,
            tdAltura,
            tdIMC,
            tdClassificacao,
            tdAcao
        );

        lista.appendChild(tr);
    });

    atualizarResumo();
}

// Cadastrar pessoa
form.addEventListener("submit", function(event) {

    event.preventDefault();

    const nome = document.getElementById("nome")
        .value.trim();

    const peso = Number(
        document.getElementById("peso").value
    );

    const altura = Number(
        document.getElementById("altura").value
    );

    erro.hidden = true;

    if (
        !nome ||
        !Number.isFinite(peso) ||
        !Number.isFinite(altura) ||
        peso <= 0 ||
        altura <= 0
    ) {
        erro.textContent = "Preencha todos os campos corretamente.";
        erro.hidden = false;
        return;
    }

    const imc = calcularIMC(peso, altura);

    pessoas.push({
        nome,
        peso,
        altura,
        imc
    });

    salvar();
    render();

    form.reset();
});

// Excluir pessoa
lista.addEventListener("click", function(event) {

    if (event.target.classList.contains("excluir")) {

        const indice = Number(
            event.target.dataset.indice
        );

        pessoas.splice(indice, 1);

        salvar();
        render();
    }
});

// Carregar dados
render();