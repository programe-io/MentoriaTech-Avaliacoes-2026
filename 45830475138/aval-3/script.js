
"use strict";

// =====================================
// DADOS DO SISTEMA
// =====================================

let contadorCodigo = 0;

let pessoas = [];

const tabelaPessoas = document.getElementById("tabela-pessoas");

const formulario = document.getElementById("form-pessoa");

const mensagemErro = document.getElementById("erro");

// =====================================
// GERAÇÃO DO IDENTIFICADOR
// =====================================

function gerarCodigo() {
    return ++contadorCodigo;
}

// =====================================
// CRIAÇÃO DE CÉLULAS
// =====================================

function criarCelula(valor, classe = "") {
    const td = document.createElement("td");

    td.textContent = valor;

    if (classe) {
        td.className = classe;
    }

    return td;
}

// =====================================
// CRIAÇÃO DE LINHAS
// =====================================

function criarLinha(pessoa) {

    const tr = document.createElement("tr");

    tr.dataset.id = pessoa.id;

    tr.appendChild(criarCelula(pessoa.nome));

    tr.appendChild(criarCelula(pessoa.idade));

    tr.appendChild(criarCelula(formatar(pessoa.altura, 2)));

    tr.appendChild(criarCelula(formatar(pessoa.peso, 1)));

    const imc = calcularIMC(pessoa.peso, pessoa.altura);

    tr.appendChild(criarCelula(formatar(imc, 2)));

    const classificacao = classificarIMC(imc);

    tr.appendChild(
        criarCelula(
            classificacao.texto,
            classificacao.classe
        )
    );

    const tdAcoes = document.createElement("td");

    const btnExcluir = document.createElement("button");

    btnExcluir.textContent = "Excluir";

    btnExcluir.className = "btn-excluir";

    btnExcluir.addEventListener("click", function() {
        excluirPessoa(pessoa.id);
    });

    tdAcoes.appendChild(btnExcluir);

    tr.appendChild(tdAcoes);

    return tr;
}

// =====================================
// FUNÇÃO DE RENDERIZAÇÃO
// =====================================

function render() {

    tabelaPessoas.innerHTML = "";

    if (pessoas.length === 0) {

        const tr = document.createElement("tr");

        const td = document.createElement("td");

        td.colSpan = 7;

        td.className = "vazio";

        td.textContent = "Nenhuma pessoa cadastrada ainda";

        tr.appendChild(td);

        tabelaPessoas.appendChild(tr);

    } else {

        pessoas.forEach(function(pessoa) {

            const linha = criarLinha(pessoa);

            tabelaPessoas.appendChild(linha);

        });

    }
}

// =====================================
// FUNÇÕES DE NEGÓCIO
// =====================================

// Cálculo do IMC

function calcularIMC(peso, altura) {

    return peso / (altura * altura);

}

// Classificação do IMC

function classificarIMC(imc) {

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

    } else if (imc < 35) {

        return {
            texto: "Obesidade grau I",
            classe: "obesidade"
        };

    } else if (imc < 40) {

        return {
            texto: "Obesidade grau II",
            classe: "obesidade"
        };

    } else {

        return {
            texto: "Obesidade grau III",
            classe: "obesidade"
        };

    }

}

// Formatação numérica

function formatar(valor, casas) {

    return valor.toLocaleString("pt-BR", {
        minimumFractionDigits: casas,
        maximumFractionDigits: casas
    });

}

// =====================================
// CADASTRO DE PESSOAS
// =====================================

formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    mensagemErro.textContent = "";

    const nome = document.getElementById("nome").value.trim();

    const idade = Number(document.getElementById("idade").value);

    const altura = Number(document.getElementById("altura").value);

    const peso = Number(document.getElementById("peso").value);

    if (!nome || !Number.isFinite(idade) ||
        !Number.isFinite(altura) || !Number.isFinite(peso)) {

        mensagemErro.textContent = "Preencha todos os campos corretamente.";

        return;
    }

    if (
        idade < 1 || idade > 120 ||
        altura < 0.5 || altura > 2.5 ||
        peso < 1 || peso > 500
    ) {

        mensagemErro.textContent = "Verifique os valores informados.";

        return;
    }

    const pessoa = {

        id: gerarCodigo(),

        nome: nome,

        idade: idade,

        altura: altura,

        peso: peso

    };

    pessoas.push(pessoa);

    render();

    formulario.reset();

});

// =====================================
// CANCELAR CADASTRO
// =====================================

formulario.addEventListener("reset", function() {

    mensagemErro.textContent = "";

});

// =====================================
// EXCLUIR PESSOA
// =====================================

function excluirPessoa(id) {

    pessoas = pessoas.filter(function(pessoa) {

        return pessoa.id !== id;

    });

    render();

}

// =====================================
// INICIALIZAÇÃO
// =====================================

render();
