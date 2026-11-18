
// ==========================================
// DADOS DO SISTEMA
// ==========================================

let contadorCodigo = 0;

let pessoas = [];

// Referência ao corpo da tabela
const tabelaPessoas = document.getElementById("tabela-pessoas");

// Referência ao formulário
const formPessoa = document.getElementById("form-pessoa");

// Mensagem de erro
const erro = document.getElementById("erro");


// ==========================================
// GERAÇÃO DE IDENTIFICADOR
// ==========================================

function gerarCodigo() {
    return ++contadorCodigo;
}


// ==========================================
// CRIAÇÃO DE CÉLULAS E LINHAS
// ==========================================

function criarCelula(valor) {
    const td = document.createElement("td");

    td.textContent = valor;

    return td;
}


function criarLinha(pessoa) {

    const tr = document.createElement("tr");

    // Identificador da pessoa
    tr.dataset.id = pessoa.id;

    // Nome
    tr.appendChild(criarCelula(pessoa.nome));

    // Idade
    tr.appendChild(criarCelula(pessoa.idade));

    // Altura
    tr.appendChild(criarCelula(formatar(pessoa.altura, 2)));

    // Peso
    tr.appendChild(criarCelula(formatar(pessoa.peso, 1)));

    // IMC
    tr.appendChild(criarCelula(formatar(pessoa.imc, 2)));

    // Classificação
    const tdClassificacao = criarCelula(
        pessoa.classificacao.texto
    );

    tdClassificacao.classList.add(
        pessoa.classificacao.classe
    );

    tr.appendChild(tdClassificacao);

    // Ações
    const tdAcoes = document.createElement("td");

    const btnExcluir = document.createElement("button");

    btnExcluir.textContent = "Excluir";
    btnExcluir.classList.add("btn-excluir");

    btnExcluir.addEventListener("click", function () {
        excluirPessoa(pessoa.id);
    });

    tdAcoes.appendChild(btnExcluir);

    tr.appendChild(tdAcoes);

    return tr;
}


// ==========================================
// FUNÇÃO DE RENDERIZAÇÃO
// ==========================================

function render() {

    // Limpa a tabela
    tabelaPessoas.innerHTML = "";

    // Verifica se existem pessoas cadastradas
    if (pessoas.length === 0) {

        const tr = document.createElement("tr");

        const td = document.createElement("td");

        td.colSpan = 7;

        td.classList.add("vazio");

        td.textContent = "Nenhuma pessoa cadastrada ainda.";

        tr.appendChild(td);

        tabelaPessoas.appendChild(tr);

        return;
    }

    // Percorre o array de pessoas
    pessoas.forEach(function (pessoa) {

        const linha = criarLinha(pessoa);

        tabelaPessoas.appendChild(linha);

    });
}


// ==========================================
// FUNÇÕES DE REGRA DE NEGÓCIO
// ==========================================

// Calcula o IMC
function calcularIMC(peso, altura) {

    return peso / (altura * altura);

}


// Classifica o IMC
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


// Formata valores numéricos
function formatar(valor, casasDecimais) {

    return valor.toLocaleString("pt-BR", {
        minimumFractionDigits: casasDecimais,
        maximumFractionDigits: casasDecimais
    });

}


// ==========================================
// CADASTRO DE PACIENTES
// ==========================================

formPessoa.addEventListener("submit", function (event) {

    // Impede o recarregamento da página
    event.preventDefault();

    // Captura os valores do formulário
    const nome = document.getElementById("nome").value.trim();

    const idade = Number(document.getElementById("idade").value);

    const altura = Number(document.getElementById("altura").value);

    const peso = Number(document.getElementById("peso").value);

    // Validação dos dados
    if (
        !nome ||
        !Number.isInteger(idade) ||
        idade < 1 ||
        idade > 120 ||
        !Number.isFinite(altura) ||
        altura < 0.5 ||
        altura > 2.5 ||
        !Number.isFinite(peso) ||
        peso <= 0 ||
        peso > 500
    ) {

        erro.textContent = "Preencha todos os campos corretamente.";

        return;
    }

    erro.textContent = "";

    // Calcula o IMC
    const imc = calcularIMC(peso, altura);

    // Classifica o IMC
    const classificacao = classificarIMC(imc);

    // Cria o objeto da pessoa
    const pessoa = {

        id: gerarCodigo(),

        nome: nome,

        idade: idade,

        altura: altura,

        peso: peso,

        imc: imc,

        classificacao: classificacao

    };

    // Adiciona a pessoa ao array
    pessoas.push(pessoa);

    // Atualiza a tabela
    render();

    // Limpa o formulário
    formPessoa.reset();

});


// ==========================================
// CANCELAR CADASTRO
// ==========================================

formPessoa.addEventListener("reset", function () {

    erro.textContent = "";

});


// ==========================================
// EXCLUIR PACIENTE
// ==========================================

function excluirPessoa(id) {

    pessoas = pessoas.filter(function (pessoa) {

        return pessoa.id !== id;

    });

    render();

}


// ==========================================
// INICIALIZAÇÃO DO SISTEMA
// ==========================================

render();
