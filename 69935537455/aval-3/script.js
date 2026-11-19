
/* =====================================
   VARIÁVEIS DO SISTEMA
===================================== */

let contadorCodigo = 0;

let pessoas = [];

// Referência à tabela
const tabelaPessoas = document.getElementById("tabelaPessoas");

// Referência ao formulário
const formPessoa = document.getElementById("formPessoa");


/* =====================================
   GERAÇÃO AUTOMÁTICA DE IDENTIFICADOR
===================================== */

function gerarCodigo() {
    return ++contadorCodigo;
}


/* =====================================
   CRIAÇÃO DE CÉLULAS
===================================== */

function criarCelula(valor, classe = "") {

    const td = document.createElement("td");

    td.textContent = valor;

    if (classe) {
        td.className = classe;
    }

    return td;
}


/* =====================================
   CRIAÇÃO DE LINHAS
===================================== */

function criarLinha(pessoa) {

    const tr = document.createElement("tr");

    tr.dataset.id = pessoa.id;

    tr.appendChild(criarCelula(pessoa.id));
    tr.appendChild(criarCelula(pessoa.nome));
    tr.appendChild(criarCelula(pessoa.idade));
    tr.appendChild(criarCelula(formatar(pessoa.altura, 2) + " m"));
    tr.appendChild(criarCelula(formatar(pessoa.peso, 1) + " kg"));
    tr.appendChild(criarCelula(formatar(pessoa.imc, 2)));
    tr.appendChild(
        criarCelula(
            pessoa.classificacao.texto,
            pessoa.classificacao.classe
        )
    );

    // Botão de excluir
    const tdAcoes = document.createElement("td");

    const botaoExcluir = document.createElement("button");

    botaoExcluir.textContent = "Excluir";
    botaoExcluir.className = "btn-excluir";

    botaoExcluir.addEventListener("click", function() {
        excluirPessoa(pessoa.id);
    });

    tdAcoes.appendChild(botaoExcluir);

    tr.appendChild(tdAcoes);

    return tr;
}


/* =====================================
   FUNÇÃO DE RENDERIZAÇÃO
===================================== */

function render() {

    tabelaPessoas.innerHTML = "";

    if (pessoas.length === 0) {

        const tr = document.createElement("tr");
        const td = document.createElement("td");

        td.colSpan = 8;
        td.className = "vazio";
        td.textContent = "Nenhuma pessoa cadastrada ainda";

        tr.appendChild(td);
        tabelaPessoas.appendChild(tr);

        return;
    }

    pessoas.forEach(function(pessoa) {

        const linha = criarLinha(pessoa);

        tabelaPessoas.appendChild(linha);

    });
}


/* =====================================
   FUNÇÕES DE REGRA DE NEGÓCIO
===================================== */

// CÁLCULO DO IMC

function calcularIMC(peso, altura) {

    return peso / (altura * altura);

}


// CLASSIFICAÇÃO DO IMC

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


// FORMATAÇÃO DE VALORES NUMÉRICOS

function formatar(valor, casas) {

    return valor.toLocaleString("pt-BR", {
        minimumFractionDigits: casas,
        maximumFractionDigits: casas
    });

}


/* =====================================
   CADASTRO DE PACIENTES
===================================== */

formPessoa.addEventListener("submit", function(event) {

    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();

    const idade = Number(document.getElementById("idade").value);

    const altura = Number(document.getElementById("altura").value);

    const peso = Number(document.getElementById("peso").value);

    const erro = document.getElementById("erro");

    erro.textContent = "";

    // VALIDAÇÃO DOS CAMPOS

    if (!nome || nome.length > 50) {
        erro.textContent = "Informe um nome válido.";
        return;
    }

    if (!Number.isInteger(idade) || idade < 1 || idade > 120) {
        erro.textContent = "Informe uma idade entre 1 e 120 anos.";
        return;
    }

    if (!Number.isFinite(altura) || altura < 0.5 || altura > 2.5) {
        erro.textContent = "Informe uma altura entre 0,50 e 2,50 metros.";
        return;
    }

    if (!Number.isFinite(peso) || peso < 1 || peso > 500) {
        erro.textContent = "Informe um peso entre 1 e 500 kg.";
        return;
    }

    // CÁLCULO DO IMC

    const imc = calcularIMC(peso, altura);

    // CLASSIFICAÇÃO

    const classificacao = classificarIMC(imc);

    // CRIAÇÃO DO OBJETO PACIENTE

    const pessoa = {

        id: gerarCodigo(),

        nome: nome,

        idade: idade,

        altura: altura,

        peso: peso,

        imc: imc,

        classificacao: classificacao

    };

    // ARMAZENAMENTO NO ARRAY

    pessoas.push(pessoa);

    // ATUALIZAÇÃO DA TABELA

    render();

    // LIMPA O FORMULÁRIO

    formPessoa.reset();

});


/* =====================================
   EXCLUSÃO DE PACIENTES
===================================== */

function excluirPessoa(id) {

    const confirmar = confirm(
        "Deseja realmente excluir este paciente?"
    );

    if (!confirmar) {
        return;
    }

    pessoas = pessoas.filter(function(pessoa) {

        return pessoa.id !== id;

    });

    render();

}


/* =====================================
   INICIALIZAÇÃO DO SISTEMA
===================================== */

render();
