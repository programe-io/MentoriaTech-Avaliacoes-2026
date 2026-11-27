
/* ==========================================================
   Calculadora de IMC
   ========================================================== */

// Elementos do HTML
const formulario = document.getElementById("form-pessoa");

const inputNome = document.getElementById("input-nome");
const inputIdade = document.getElementById("input-idade");
const inputAltura = document.getElementById("input-altura");
const inputPeso = document.getElementById("input-peso");

const tabelaPessoas = document.getElementById("tabela-pessoas");

const mensagemErro = document.getElementById("erro");

const tituloFormulario = document.getElementById("titulo-form");

const botaoSalvar = document.getElementById("btn-salvar");
const botaoCancelar = document.getElementById("btn-cancelar");

// Lista de pessoas cadastradas
let pessoas = [];

// Identifica a pessoa que está sendo editada
let indiceEdicao = null;


// ==========================================================
// CLASSIFICAÇÃO DO IMC
// ==========================================================

function classificarIMC(imc) {

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


// ==========================================================
// CÁLCULO DO IMC
// ==========================================================

function calcularIMC(peso, altura) {

    return peso / (altura * altura);

}


// ==========================================================
// MENSAGENS DE ERRO
// ==========================================================

function mostrarErro(mensagem) {

    mensagemErro.textContent = mensagem;

    mensagemErro.hidden = false;

}

function limparErro() {

    mensagemErro.textContent = "";

    mensagemErro.hidden = true;

    document.querySelectorAll("input").forEach(input => {
        input.classList.remove("invalido");
    });

}


// ==========================================================
// VALIDAÇÃO DO FORMULÁRIO
// ==========================================================

function validarFormulario() {

    limparErro();

    const nome = inputNome.value.trim();
    const idade = Number(inputIdade.value);
    const altura = Number(inputAltura.value);
    const peso = Number(inputPeso.value);

    if (nome === "") {
        inputNome.classList.add("invalido");
        mostrarErro("Informe o nome da pessoa.");
        inputNome.focus();
        return false;
    }

    if (nome.length > 50) {
        inputNome.classList.add("invalido");
        mostrarErro("O nome deve ter no máximo 50 caracteres.");
        inputNome.focus();
        return false;
    }

    if (
        inputIdade.value.trim() === "" ||
        !Number.isInteger(idade) ||
        idade < 1 ||
        idade > 120
    ) {
        inputIdade.classList.add("invalido");
        mostrarErro("Informe uma idade entre 1 e 120 anos.");
        inputIdade.focus();
        return false;
    }

    if (
        inputAltura.value.trim() === "" ||
        !Number.isFinite(altura) ||
        altura < 0.5 ||
        altura > 2.5
    ) {
        inputAltura.classList.add("invalido");
        mostrarErro("Informe uma altura entre 0,5 e 2,5 metros.");
        inputAltura.focus();
        return false;
    }

    if (
        inputPeso.value.trim() === "" ||
        !Number.isFinite(peso) ||
        peso < 2 ||
        peso > 500
    ) {
        inputPeso.classList.add("invalido");
        mostrarErro("Informe um peso entre 2 e 500 kg.");
        inputPeso.focus();
        return false;
    }

    return true;

}


// ==========================================================
// LIMPAR FORMULÁRIO
// ==========================================================

function limparFormulario() {

    formulario.reset();

    limparErro();

    indiceEdicao = null;

    tituloFormulario.textContent = "Nova pessoa";

    botaoSalvar.textContent = "Salvar";

    botaoCancelar.hidden = true;

    renderizarTabela();

}


// ==========================================================
// CADASTRAR OU ATUALIZAR PESSOA
// ==========================================================

formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    if (!validarFormulario()) {
        return;
    }

    const pessoa = {

        nome: inputNome.value.trim(),

        idade: Number(inputIdade.value),

        altura: Number(inputAltura.value),

        peso: Number(inputPeso.value)

    };

    if (indiceEdicao === null) {

        // Novo cadastro
        pessoas.push(pessoa);

    } else {

        // Atualização de cadastro existente
        pessoas[indiceEdicao] = pessoa;

    }

    limparFormulario();

});


// ==========================================================
// EXIBIR PESSOAS NA TABELA
// ==========================================================

function renderizarTabela() {

    tabelaPessoas.innerHTML = "";

    // Verifica se existem pessoas cadastradas
    if (pessoas.length === 0) {

        const linha = document.createElement("tr");

        const coluna = document.createElement("td");

        coluna.colSpan = 7;

        coluna.className = "vazio";

        coluna.textContent = "Nenhuma pessoa cadastrada.";

        linha.appendChild(coluna);

        tabelaPessoas.appendChild(linha);

        return;

    }

    pessoas.forEach((pessoa, indice) => {

        const imc = calcularIMC(
            pessoa.peso,
            pessoa.altura
        );

        const classificacao = classificarIMC(imc);

        const linha = document.createElement("tr");

        // Destaca a pessoa em edição
        if (indice === indiceEdicao) {

            linha.classList.add("em-edicao");

        }

        // Nome
        adicionarCelula(linha, pessoa.nome);

        // Idade
        adicionarCelula(linha, pessoa.idade);

        // Altura
        adicionarCelula(
            linha,
            pessoa.altura.toFixed(2).replace(".", ",") + " m"
        );

        // Peso
        adicionarCelula(
            linha,
            pessoa.peso.toFixed(1).replace(".", ",") + " kg"
        );

        // IMC
        adicionarCelula(
            linha,
            imc.toFixed(2).replace(".", ",")
        );

        // Classificação
        const colunaClassificacao = document.createElement("td");

        const selo = document.createElement("span");

        selo.className = "selo " + classificacao.classe;

        selo.textContent = classificacao.texto;

        colunaClassificacao.appendChild(selo);

        linha.appendChild(colunaClassificacao);

        // Botões de ação
        const colunaAcoes = document.createElement("td");

        colunaAcoes.className = "acoes";

        // Botão editar
        const botaoEditar = document.createElement("button");

        botaoEditar.type = "button";

        botaoEditar.textContent = "Editar";

        botaoEditar.addEventListener("click", function() {

            editarPessoa(indice);

        });

        // Botão excluir
        const botaoExcluir = document.createElement("button");

        botaoExcluir.type = "button";

        botaoExcluir.textContent = "Excluir";

        botaoExcluir.className = "remover";

        botaoExcluir.addEventListener("click", function() {

            excluirPessoa(indice);

        });

        colunaAcoes.appendChild(botaoEditar);

        colunaAcoes.appendChild(botaoExcluir);

        linha.appendChild(colunaAcoes);

        tabelaPessoas.appendChild(linha);

    });

}


// ==========================================================
// ADICIONAR CÉLULA NA TABELA
// ==========================================================

function adicionarCelula(linha, valor) {

    const coluna = document.createElement("td");

    coluna.textContent = valor;

    linha.appendChild(coluna);

}


// ==========================================================
// EDITAR PESSOA
// ==========================================================

function editarPessoa(indice) {

    const pessoa = pessoas[indice];

    indiceEdicao = indice;

    inputNome.value = pessoa.nome;

    inputIdade.value = pessoa.idade;

    inputAltura.value = pessoa.altura;

    inputPeso.value = pessoa.peso;

    tituloFormulario.textContent = "Editar pessoa";

    botaoSalvar.textContent = "Atualizar";

    botaoCancelar.hidden = false;

    limparErro();

    renderizarTabela();

    // Leva o usuário até o formulário
    formulario.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

    inputNome.focus();

}


// ==========================================================
// EXCLUIR PESSOA
// ==========================================================

function excluirPessoa(indice) {

    const confirmar = confirm(
        "Tem certeza que deseja excluir esta pessoa?"
    );

    if (!confirmar) {
        return;
    }

    pessoas.splice(indice, 1);

    // Se a pessoa excluída estava sendo editada
    if (indiceEdicao === indice) {

        limparFormulario();

    } else if (
        indiceEdicao !== null &&
        indice < indiceEdicao
    ) {

        indiceEdicao--;

    }

    renderizarTabela();

}


// ==========================================================
// CANCELAR EDIÇÃO
// ==========================================================

botaoCancelar.addEventListener("click", function() {

    limparFormulario();

});


// ==========================================================
// INICIALIZAÇÃO
// ==========================================================

// Exibe a mensagem de tabela vazia ao abrir a página
renderizarTabela();
