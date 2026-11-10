
const formulario = document.getElementById("formulario");
const lista = document.getElementById("listaPessoas");
const pesquisa = document.getElementById("pesquisa");
const vazio = document.getElementById("vazio");

let pessoas = [
    { nome: "Pessoa 1", peso: 65, altura: 1.70 },
    { nome: "Pessoa 2", peso: 80, altura: 1.75 },
    { nome: "Pessoa 3", peso: 90, altura: 1.70 },
    { nome: "Pessoa 4", peso: 50, altura: 1.70 }
];

// Calcula o IMC
function calcularIMC(peso, altura) {
    return peso / (altura * altura);
}

// Classificação de referência para adultos
function classificarIMC(imc) {

    if (imc < 18.5) {
        return {
            texto: "Abaixo da faixa",
            classe: "blue"
        };
    }

    if (imc < 25) {
        return {
            texto: "Faixa de referência",
            classe: "green"
        };
    }

    if (imc < 30) {
        return {
            texto: "Acima da faixa",
            classe: "orange"
        };
    }

    return {
        texto: "Obesidade adulta",
        classe: "red"
    };
}

// Criar célula da tabela
function criarCelula(texto) {
    const td = document.createElement("td");
    td.textContent = texto;
    return td;
}

// Atualizar tabela
function listarPessoas() {

    lista.replaceChildren();

    const termo = pesquisa.value.trim().toLowerCase();

    const filtradas = pessoas.filter(p =>
        p.nome.toLowerCase().includes(termo)
    );

    vazio.style.display =
        filtradas.length === 0 ? "block" : "none";

    document.querySelector(".table-scroll").style.display =
        filtradas.length === 0 ? "none" : "block";

    filtradas.forEach(pessoa => {

        const imc = calcularIMC(pessoa.peso, pessoa.altura);
        const resultado = classificarIMC(imc);

        const linha = document.createElement("tr");

        linha.appendChild(criarCelula(pessoa.nome));

        linha.appendChild(
            criarCelula(pessoa.peso.toFixed(1) + " kg")
        );

        linha.appendChild(
            criarCelula(pessoa.altura.toFixed(2) + " m")
        );

        linha.appendChild(
            criarCelula(imc.toFixed(1))
        );

        const tdStatus = document.createElement("td");

        const badge = document.createElement("span");
        badge.className = "status " + resultado.classe;
        badge.textContent = resultado.texto;

        tdStatus.appendChild(badge);
        linha.appendChild(tdStatus);

        lista.appendChild(linha);
    });

    atualizarEstatisticas();
}

// Atualizar números do painel
function atualizarEstatisticas() {

    document.getElementById("totalPessoas").textContent =
        pessoas.length;

    if (pessoas.length === 0) {
        document.getElementById("mediaImc").textContent = "0";
        return;
    }

    const soma = pessoas.reduce((total, pessoa) => {
        return total + calcularIMC(pessoa.peso, pessoa.altura);
    }, 0);

    const media = soma / pessoas.length;

    document.getElementById("mediaImc").textContent =
        media.toFixed(1);
}

// Cadastrar pessoa
formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();

    const pesoTexto = document.getElementById("peso").value;
    const alturaTexto = document.getElementById("altura").value;

    const peso = Number(pesoTexto);
    const altura = Number(alturaTexto);

    if (!nome || pesoTexto === "" || alturaTexto === "" ||
        !Number.isFinite(peso) || !Number.isFinite(altura) ||
        peso <= 0 || altura <= 0) {

        alert("Preencha todos os campos com dados válidos!");
        return;
    }

    pessoas.push({
        nome: nome,
        peso: peso,
        altura: altura
    });

    formulario.reset();
    listarPessoas();

    alert("Pessoa cadastrada com sucesso!");
});

// Pesquisa
pesquisa.addEventListener("input", listarPessoas);

// Iniciar sistema
listarPessoas();
