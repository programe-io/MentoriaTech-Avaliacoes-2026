
"use strict";

// =====================================
// 1. VARIÁVEIS
// =====================================

let codigo = 0;

let pessoas = [];

const chavePessoas = "pessoas";

const formPessoa = document.getElementById("form-pessoa");

const inputNome = document.getElementById("nome");

const inputIdade = document.getElementById("idade");

const inputAltura = document.getElementById("altura");

const inputPeso = document.getElementById("peso");

const tabelaPessoas = document.getElementById("tabela-pessoas");

const mensagemDeErro = document.getElementById("erro");

const btnCancelar = document.getElementById("btn-cancelar");


// =====================================
// 2. GERAR CÓDIGO
// =====================================

function gerarCodigo() {
    codigo++;
    return codigo;
}


// =====================================
// 3. CALCULAR IMC
// =====================================

function calcularImc(peso, altura) {
    return peso / (altura * altura);
}


// =====================================
// 4. CLASSIFICAR IMC
// =====================================

function classificarImc(imc) {

    if (imc < 18.5) {
        return {
            texto: "Abaixo do peso",
            classe: "abaixo-peso"
        };
    }

    if (imc < 25) {
        return {
            texto: "Peso normal",
            classe: "peso-normal"
        };
    }

    if (imc < 30) {
        return {
            texto: "Sobrepeso",
            classe: "sobrepeso"
        };
    }

    if (imc < 35) {
        return {
            texto: "Obesidade grau I",
            classe: "obesidade-1"
        };
    }

    if (imc < 40) {
        return {
            texto: "Obesidade grau II",
            classe: "obesidade-2"
        };
    }

    return {
        texto: "Obesidade grau III",
        classe: "obesidade-3"
    };
}


// =====================================
// 5. FORMATAR NÚMEROS
// =====================================

function formatar(valor, casas) {

    return Number(valor).toLocaleString("pt-BR", {
        minimumFractionDigits: casas,
        maximumFractionDigits: casas
    });

}


// =====================================
// 6. CRIAR CÉLULA
// =====================================

function criarCelula(conteudo) {

    const td = document.createElement("td");

    td.textContent = conteudo;

    return td;
}


// =====================================
// 7. CRIAR LINHA
// =====================================

function criarLinha(pessoa) {

    const tr = document.createElement("tr");

    tr.dataset.id = pessoa.id;

    const imc = calcularImc(pessoa.peso, pessoa.altura);

    const classificacao = classificarImc(imc);

    // Nome
    tr.appendChild(criarCelula(pessoa.nome));

    // Idade
    tr.appendChild(criarCelula(pessoa.idade + " anos"));

    // Altura
    tr.appendChild(
        criarCelula(formatar(pessoa.altura, 2) + " m")
    );

    // Peso
    tr.appendChild(
        criarCelula(formatar(pessoa.peso, 1) + " kg")
    );

    // IMC
    tr.appendChild(
        criarCelula(formatar(imc, 1))
    );

    // Classificação
    const tdClassificacao = document.createElement("td");

    const selo = document.createElement("span");

    selo.classList.add("selo", classificacao.classe);

    selo.textContent = classificacao.texto;

    tdClassificacao.appendChild(selo);

    tr.appendChild(tdClassificacao);

    // Botão excluir
    const tdAcoes = document.createElement("td");

    const btnExcluir = document.createElement("button");

    btnExcluir.type = "button";

    btnExcluir.classList.add("btn-excluir");

    btnExcluir.textContent = "Excluir";

    btnExcluir.dataset.id = pessoa.id;

    tdAcoes.appendChild(btnExcluir);

    tr.appendChild(tdAcoes);

    return tr;
}


// =====================================
// 8. RENDERIZAR TABELA
// =====================================

function render() {

    tabelaPessoas.innerHTML = "";

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

    pessoas.forEach(function(pessoa) {

        const linha = criarLinha(pessoa);

        tabelaPessoas.appendChild(linha);

    });

}


// =====================================
// 9. LER FORMULÁRIO
// =====================================

function lerFormulario() {

    return {

        nome: inputNome.value.trim(),

        idade: Number(inputIdade.value),

        altura: Number(inputAltura.value),

        peso: Number(inputPeso.value)

    };

}


// =====================================
// 10. VALIDAR DADOS
// =====================================

function validarDados(dados) {

    if (dados.nome.length < 2) {
        return "Informe o nome com no mínimo duas letras.";
    }

    if (dados.nome.length > 50) {
        return "O nome deve possuir no máximo 50 caracteres.";
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
        return "A altura deve estar entre 0,50 e 2,50 metros.";
    }

    if (
        !Number.isFinite(dados.peso) ||
        dados.peso < 2 ||
        dados.peso > 500
    ) {
        return "O peso deve estar entre 2 e 500 kg.";
    }

    return "";
}


// =====================================
// 11. MOSTRAR ERRO
// =====================================

function mostrarErro(mensagem) {

    mensagemDeErro.textContent = mensagem;

    mensagemDeErro.hidden = false;

}


// =====================================
// 12. LIMPAR ERRO
// =====================================

function limparErro() {

    mensagemDeErro.textContent = "";

    mensagemDeErro.hidden = true;

}


// =====================================
// 13. ADICIONAR PESSOA
// =====================================

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


// =====================================
// 14. SALVAR NO LOCALSTORAGE
// =====================================

function salvar() {

    try {

        localStorage.setItem(
            chavePessoas,
            JSON.stringify(pessoas)
        );

        return true;

    } catch (erro) {

        console.error("Erro ao salvar:", erro);

        return false;

    }

}


// =====================================
// 15. CARREGAR PESSOAS
// =====================================

function carregarPessoas() {

    try {

        const dadosSalvos = localStorage.getItem(chavePessoas);

        if (dadosSalvos === null) {
            return [];
        }

        const dados = JSON.parse(dadosSalvos);

        if (!Array.isArray(dados)) {
            return [];
        }

        return dados.filter(function(pessoa) {

            return (
                pessoa !== null &&
                typeof pessoa === "object" &&
                Number.isSafeInteger(pessoa.id) &&
                pessoa.id > 0 &&
                typeof pessoa.nome === "string" &&
                pessoa.nome.trim().length >= 2 &&
                Number.isInteger(pessoa.idade) &&
                pessoa.idade >= 1 &&
                pessoa.idade <= 120 &&
                Number.isFinite(pessoa.altura) &&
                pessoa.altura >= 0.5 &&
                pessoa.altura <= 2.5 &&
                Number.isFinite(pessoa.peso) &&
                pessoa.peso >= 2 &&
                pessoa.peso <= 500
            );

        });

    } catch (erro) {

        console.error("Erro ao carregar:", erro);

        return [];

    }

}


// =====================================
// 16. AJUSTAR CONTADOR
// =====================================

function ajustarContadorCodigo() {

    let maior = 0;

    pessoas.forEach(function(pessoa) {

        if (pessoa.id > maior) {
            maior = pessoa.id;
        }

    });

    codigo = maior;

}


// =====================================
// 17. EXCLUIR PESSOA
// =====================================

function excluirPessoa(id) {

    const listaAnterior = pessoas;

    pessoas = pessoas.filter(function(pessoa) {

        return pessoa.id !== id;

    });

    if (pessoas.length === listaAnterior.length) {
        return;
    }

    if (!salvar()) {

        pessoas = listaAnterior;

        mostrarErro("Não foi possível excluir o paciente. Tente novamente.");

        return;
    }

    limparErro();

    render();

}


// =====================================
// 18. EVENTO SALVAR
// =====================================

formPessoa.addEventListener("submit", function(event) {

    event.preventDefault();

    const dados = lerFormulario();

    const erro = validarDados(dados);

    if (erro !== "") {

        mostrarErro(erro);

        return;
    }

    limparErro();

    // Guarda a lista anterior para desfazer
    // o cadastro caso o armazenamento falhe.
    const listaAnterior = pessoas.slice();

    adicionarPessoa(dados);

    if (!salvar()) {

        pessoas = listaAnterior;

        ajustarContadorCodigo();

        render();

        mostrarErro("Não foi possível salvar os dados. Tente novamente.");

        return;
    }

    render();

    formPessoa.reset();

    inputNome.focus();

});


// =====================================
// 19. EVENTO CANCELAR
// =====================================

btnCancelar.addEventListener("click", function() {

    formPessoa.reset();

    limparErro();

    inputNome.focus();

});


// =====================================
// 20. EVENTO EXCLUIR
// =====================================

tabelaPessoas.addEventListener("click", function(event) {

    const botao = event.target.closest(".btn-excluir");

    if (!botao || !tabelaPessoas.contains(botao)) {
        return;
    }

    const id = Number(botao.dataset.id);

    if (!Number.isSafeInteger(id)) {
        return;
    }

    excluirPessoa(id);

});


// =====================================
// 21. INICIALIZAR SISTEMA
// =====================================

pessoas = carregarPessoas();

ajustarContadorCodigo();

render();

console.log("Sistema de Ficha de Anamnese iniciado!");

