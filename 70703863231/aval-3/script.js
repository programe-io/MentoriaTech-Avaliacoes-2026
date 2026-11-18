"use strict";

// ========================================
// VARIÁVEIS DO SISTEMA
// ========================================

let contador = 0;

let pessoas = [];

// Referências HTML

const formPessoa = document.getElementById("form-pessoa");

const tabelaPessoas = document.getElementById("tabela-pessoas");

const mensagemErro = document.getElementById("erro");

const btnCancelar = document.getElementById("btn-cancelar");


// ========================================
// GERAÇÃO DE IDENTIFICADOR
// ========================================

function gerarCodigo() {
    contador++;
    return contador;
}


// ========================================
// FUNÇÕES DE CRIAÇÃO DA TABELA
// ========================================

function criarCelula(conteudo, classe = "") {

    const td = document.createElement("td");

    td.textContent = conteudo;

    if (classe) {
        td.className = classe;
    }

    return td;
}


function criarLinha(pessoa) {

    const tr = document.createElement("tr");

    tr.dataset.id = pessoa.id;

    tr.appendChild(criarCelula(pessoa.nome));

    tr.appendChild(criarCelula(pessoa.idade));

    tr.appendChild(criarCelula(
        formatar(pessoa.altura, 2) + " m"
    ));

    tr.appendChild(criarCelula(
        formatar(pessoa.peso, 1) + " kg"
    ));

    tr.appendChild(criarCelula(
        formatar(pessoa.imc, 2)
    ));

    tr.appendChild(criarCelula(
        pessoa.classificacao.texto,
        pessoa.classificacao.classe
    ));

    // Botão de excluir

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


// ========================================
// FUNÇÃO DE RENDERIZAÇÃO
// ========================================

function render() {

    tabelaPessoas.innerHTML = "";

    if (pessoas.length === 0) {

        const tr = document.createElement("tr");

        const td = document.createElement("td");

        td.colSpan = 7;

        td.className = "vazio";

        td.textContent = "Nenhuma pessoa cadastrada ainda.";

        tr.appendChild(td);

        tabelaPessoas.appendChild(tr);

        return;
    }

    pessoas.forEach(function(pessoa) {

        const linha = criarLinha(pessoa);

        tabelaPessoas.appendChild(linha);

    });
}


// ========================================
// FUNÇÕES DE NEGÓCIO
// ========================================

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


// Formatação numérica brasileira

function formatar(valor, casas = 2) {

    return valor.toLocaleString("pt-BR", {
        minimumFractionDigits: casas,
        maximumFractionDigits: casas
    });

}


// ========================================
// CADASTRO DE PACIENTES
// ========================================

formPessoa.addEventListener("submit", function(event) {

    event.preventDefault();

    mensagemErro.textContent = "";

    const nome = document.getElementById("nome").value.trim();

    const idade = Number(document.getElementById("idade").value);

    const altura = Number(document.getElementById("altura").value);

    const peso = Number(document.getElementById("peso").value);


    // Validação dos campos

    if (!nome || nome.length > 50) {

        mensagemErro.textContent = "Informe um nome válido.";

        return;
    }

    if (!Number.isInteger(idade) || idade < 1 || idade > 120) {

        mensagemErro.textContent = "Informe uma idade entre 1 e 120 anos.";

        return;
    }

    if (!Number.isFinite(altura) || altura < 0.5 || altura > 2.5) {

        mensagemErro.textContent = "Informe uma altura válida.";

        return;
    }

    if (!Number.isFinite(peso) || peso < 1 || peso > 500) {

        mensagemErro.textContent = "Informe um peso válido.";

        return;
    }


    // Cálculo do IMC

    const imc = calcularIMC(peso, altura);

    const classificacao = classificarIMC(imc);


    // Criação do objeto pessoa

    const pessoa = {

        id: gerarCodigo(),

        nome: nome,

        idade: idade,

        altura: altura,

        peso: peso,

        imc: imc,

        classificacao: classificacao

    };


    // Armazenamento no array

    pessoas.push(pessoa);


    // Atualização da tabela

    render();


    // Limpeza do formulário

    formPessoa.reset();

});


// ========================================
// CANCELAR CADASTRO
// ========================================

btnCancelar.addEventListener("click", function() {

    formPessoa.reset();

    mensagemErro.textContent = "";

});


// ========================================
// EXCLUIR PACIENTE
// ========================================

function excluirPessoa(id) {

    pessoas = pessoas.filter(function(pessoa) {

        return pessoa.id !== id;

    });

    render();

}


// ========================================
// INICIALIZAÇÃO DO SISTEMA
// ========================================

render();