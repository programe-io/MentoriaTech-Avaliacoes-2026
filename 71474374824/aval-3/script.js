"use strict";

// =================================
// REFERÊNCIAS DO DOM
// =================================

const formPessoa = document.getElementById("formPessoa");
const inputNome = document.getElementById("nome");
const inputIdade = document.getElementById("idade");
const inputAltura = document.getElementById("altura");
const inputPeso = document.getElementById("peso");

const tabelaPessoas = document.getElementById("tabelaPessoas");
const mensagemDeErro = document.getElementById("erro");

// =================================
// ARMAZENAMENTO
// =================================

const chavePessoas = "pessoas";

let pessoas = carregarPessoas();

let contador = ajustarContador();

// =================================
// GERAR CÓDIGO
// =================================

function gerarCodigo() {
    return ++contador;
}

// =================================
// CRIAR CÉLULA
// =================================

function criarCelula(conteudo) {

    const td = document.createElement("td");

    td.textContent = conteudo;

    return td;
}

// =================================
// CRIAR LINHA
// =================================

function criarLinha(pessoa) {

    const tr = document.createElement("tr");

    tr.dataset.id = pessoa.id;

    // Calcular IMC
    const imc = calcularIMC(
        pessoa.peso,
        pessoa.altura
    );

    // Classificar IMC
    const classificacao = classificarIMC(imc);

    // Nome
    tr.appendChild(
        criarCelula(pessoa.nome)
    );

    // Idade
    tr.appendChild(
        criarCelula(pessoa.idade)
    );

    // Altura
    tr.appendChild(
        criarCelula(formatar(pessoa.altura, 2) + " m")
    );

    // Peso
    tr.appendChild(
        criarCelula(formatar(pessoa.peso, 1) + " KG")
    );

    // IMC
    tr.appendChild(
        criarCelula(formatar(imc, 1))
    );

    // Classificação
    const tdClassificacao = document.createElement("td");

    const selo = document.createElement("span");

    selo.classList.add(
        "selo",
        classificacao.classe
    );

    selo.textContent = classificacao.texto;

    tdClassificacao.appendChild(selo);

    tr.appendChild(tdClassificacao);

    // Botão apagar
    const tdAcoes = document.createElement("td");

    const botaoApagar = document.createElement("button");

    botaoApagar.textContent = "Apagar";

    botaoApagar.classList.add("apagar");

    botaoApagar.addEventListener("click", function() {
        apagarPessoa(pessoa.id);
    });

    tdAcoes.appendChild(botaoApagar);

    tr.appendChild(tdAcoes);

    return tr;
}

// =================================
// RENDERIZAR TABELA
// =================================

function render() {

    tabelaPessoas.innerHTML = "";

    if (pessoas.length === 0) {

        const tr = document.createElement("tr");

        const td = document.createElement("td");

        td.colSpan = 7;

        td.classList.add("vazio");

        td.textContent = "Nenhuma pessoa cadastrada ainda";

        tr.appendChild(td);

        tabelaPessoas.appendChild(tr);

    } else {

        pessoas.forEach(pessoa => {

            tabelaPessoas.appendChild(
                criarLinha(pessoa)
            );

        });

    }

}

// =================================
// FUNÇÕES DE NEGÓCIO
// =================================

// Calcular IMC
function calcularIMC(peso, altura) {

    return peso / (altura ** 2);

}

// Classificar IMC
function classificarIMC(imc) {

    if (imc < 18.5) {

        return {
            texto: "Abaixo do peso",
            classe: "azul"
        };

    }

    if (imc < 25) {

        return {
            texto: "Peso normal",
            classe: "verde"
        };

    }

    if (imc < 30) {

        return {
            texto: "Sobrepeso",
            classe: "amarelo"
        };

    }

    if (imc < 35) {

        return {
            texto: "Obesidade grau I",
            classe: "vermelho"
        };

    }

    if (imc < 40) {

        return {
            texto: "Obesidade grau II",
            classe: "vermelho"
        };

    }

    return {
        texto: "Obesidade grau III",
        classe: "vermelho"
    };

}

// Formatar números
function formatar(valor, casas) {

    return valor.toLocaleString("pt-BR", {
        minimumFractionDigits: casas,
        maximumFractionDigits: casas
    });

}

// =================================
// LER FORMULÁRIO
// =================================

function lerFormulario() {

    return {

        nome: inputNome.value.trim(),

        idade: Number(inputIdade.value),

        altura: Number(inputAltura.value),

        peso: Number(inputPeso.value)

    };

}

// =================================
// VALIDAR DADOS
// =================================

function validarDados(dados) {

    if (dados.nome.length < 2) {

        return "Informe o nome com no mínimo duas letras.";

    }

    if (
        !Number.isInteger(dados.idade) ||
        dados.idade < 1 ||
        dados.idade > 120
    ) {

        return "A idade deve ser um número inteiro entre 1 e 120.";

    }

    if (
        !Number.isFinite(dados.altura) ||
        dados.altura < 0.5 ||
        dados.altura > 2.5
    ) {

        return "A altura deve estar entre 0.5 e 2.5 metros.";

    }

    if (
        !Number.isFinite(dados.peso) ||
        dados.peso < 2 ||
        dados.peso > 500
    ) {

        return "O peso deve estar entre 2 e 500 KG.";

    }

    return "";

}

// =================================
// MENSAGENS DE ERRO
// =================================

function mostrarErro(mensagem) {

    mensagemDeErro.textContent = mensagem;

    mensagemDeErro.hidden = false;

}

function limparErro() {

    mensagemDeErro.hidden = true;

    mensagemDeErro.textContent = "";

}

// =================================
// ADICIONAR PESSOA
// =================================

function adicionarPessoa(dados) {

    const pessoa = {

        id: gerarCodigo(),

        nome: dados.nome,

        idade: dados.idade,

        altura: dados.altura,

        peso: dados.peso

    };

    pessoas.push(pessoa);

}

// =================================
// SALVAR NO LOCALSTORAGE
// =================================

function salvar() {

    localStorage.setItem(
        chavePessoas,
        JSON.stringify(pessoas)
    );

}

// =================================
// CARREGAR PESSOAS
// =================================

function carregarPessoas() {

    const dados = localStorage.getItem(chavePessoas);

    if (dados === null) {

        return [];

    }

    try {

        const lista = JSON.parse(dados);

        if (Array.isArray(lista)) {

            return lista;

        }

        return [];

    } catch (erro) {

        console.error("Erro ao carregar pessoas:", erro);

        return [];

    }

}

// =================================
// AJUSTAR CONTADOR
// =================================

function ajustarContador() {

    let maior = 0;

    pessoas.forEach(pessoa => {

        if (
            Number.isInteger(pessoa.id) &&
            pessoa.id > maior
        ) {

            maior = pessoa.id;

        }

    });

    return maior;

}

// =================================
// APAGAR PESSOA
// =================================

function apagarPessoa(id) {

    pessoas = pessoas.filter(pessoa => {

        return pessoa.id !== id;

    });

    salvar();

    render();

}

// =================================
// EVENTO SUBMIT DO FORMULÁRIO
// =================================

formPessoa.addEventListener("submit", function(e) {

    e.preventDefault();

    const dados = lerFormulario();

    const erro = validarDados(dados);

    if (erro !== "") {

        mostrarErro(erro);

        return;

    }

    limparErro();

    adicionarPessoa(dados);

    salvar();

    formPessoa.reset();

    inputNome.focus();

    render();

});

// =================================
// EVENTO CANCELAR
// =================================

formPessoa.addEventListener("reset", function() {

    limparErro();

});

// =================================
// INICIALIZAÇÃO
// =================================

render();