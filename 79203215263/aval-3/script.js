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
const tituloForm = document.getElementById("titulo-form");
const btnSalvar = document.getElementById("btn-salvar");
const btnCancelar = document.getElementById("btn-cancelar");
const mensagemErro = document.getElementById("erro");

// Lista de pessoas cadastradas
let pessoas = [];

// Identifica a pessoa que está sendo editada
let indiceEdicao = null;


// ==========================================================
// CÁLCULO DO IMC
// ==========================================================

function calcularIMC(peso, altura) {
    return peso / (altura * altura);
}


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
// VALIDAÇÃO DOS CAMPOS
// ==========================================================

function validarFormulario() {

    limparErros();

    const nome = inputNome.value.trim();
    const idade = Number(inputIdade.value);
    const altura = Number(inputAltura.value);
    const peso = Number(inputPeso.value);

    if (!nome) {
        mostrarErro("Informe o nome da pessoa.", inputNome);
        return false;
    }

    if (nome.length > 50) {
        mostrarErro("O nome deve ter no máximo 50 caracteres.", inputNome);
        return false;
    }

    if (!Number.isInteger(idade) || idade < 1 || idade > 120) {
        mostrarErro("Informe uma idade entre 1 e 120 anos.", inputIdade);
        return false;
    }

    if (!Number.isFinite(altura) || altura < 0.5 || altura > 2.5) {
        mostrarErro("Informe uma altura entre 0,50 m e 2,50 m.", inputAltura);
        return false;
    }

    if (!Number.isFinite(peso) || peso < 2 || peso > 500) {
        mostrarErro("Informe um peso entre 2 kg e 500 kg.", inputPeso);
        return false;
    }

    return true;
}


// ==========================================================
// MENSAGENS DE ERRO
// ==========================================================

function mostrarErro(mensagem, campo) {

    mensagemErro.textContent = mensagem;
    mensagemErro.hidden = false;

    if (campo) {
        campo.classList.add("invalido");
        campo.focus();
    }
}


function limparErros() {

    mensagemErro.textContent = "";
    mensagemErro.hidden = true;

    const campos = [
        inputNome,
        inputIdade,
        inputAltura,
        inputPeso
    ];

    campos.forEach(campo => {
        campo.classList.remove("invalido");
    });
}


// ==========================================================
// CADASTRAR OU ATUALIZAR PESSOA
// ==========================================================

formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    if (!validarFormulario()) {
        return;
    }

    const nome = inputNome.value.trim();
    const idade = Number(inputIdade.value);
    const altura = Number(inputAltura.value);
    const peso = Number(inputPeso.value);

    const imc = calcularIMC(peso, altura);
    const classificacao = classificarIMC(imc);

    const pessoa = {
        nome,
        idade,
        altura,
        peso,
        imc,
        classificacao
    };

    if (indiceEdicao === null) {

        // Novo cadastro
        pessoas.push(pessoa);

    } else {

        // Atualização de cadastro
        pessoas[indiceEdicao] = pessoa;

    }

    renderizarTabela();
    limparFormulario();

});


// ==========================================================
// EXIBIR PESSOAS NA TABELA
// ==========================================================

function renderizarTabela() {

    tabelaPessoas.innerHTML = "";

    if (pessoas.length === 0) {

        const linha = document.createElement("tr");
        const celula = document.createElement("td");

        celula.colSpan = 7;
        celula.className = "vazio";
        celula.textContent = "Nenhuma pessoa cadastrada.";

        linha.appendChild(celula);
        tabelaPessoas.appendChild(linha);

        return;
    }

    pessoas.forEach((pessoa, indice) => {

        const linha = document.createElement("tr");

        // Destaca a linha em edição
        if (indice === indiceEdicao) {
            linha.classList.add("em-edicao");
        }

        // Nome
        adicionarCelula(linha, pessoa.nome);

        // Idade
        adicionarCelula(linha, pessoa.idade);

        // Altura
        adicionarCelula(linha, pessoa.altura.toFixed(2) + " m");

        // Peso
        adicionarCelula(linha, pessoa.peso.toFixed(1) + " kg");

        // IMC
        adicionarCelula(linha, pessoa.imc.toFixed(2));

        // Classificação
        const celulaClassificacao = document.createElement("td");
        const selo = document.createElement("span");

        selo.className = "selo " + pessoa.classificacao.classe;
        selo.textContent = pessoa.classificacao.texto;

        celulaClassificacao.appendChild(selo);
        linha.appendChild(celulaClassificacao);

        // Ações
        const celulaAcoes = document.createElement("td");
        celulaAcoes.className = "acoes";

        const btnEditar = document.createElement("button");
        btnEditar.type = "button";
        btnEditar.textContent = "Editar";

        btnEditar.addEventListener("click", function() {
            editarPessoa(indice);
        });

        const btnExcluir = document.createElement("button");
        btnExcluir.type = "button";
        btnExcluir.textContent = "Excluir";
        btnExcluir.classList.add("remover");

        btnExcluir.addEventListener("click", function() {
            excluirPessoa(indice);
        });

        celulaAcoes.appendChild(btnEditar);
        celulaAcoes.appendChild(btnExcluir);

        linha.appendChild(celulaAcoes);

        tabelaPessoas.appendChild(linha);

    });

}


// ==========================================================
// CRIAR CÉLULAS DA TABELA
// ==========================================================

function adicionarCelula(linha, conteudo) {

    const celula = document.createElement("td");

    celula.textContent = conteudo;

    linha.appendChild(celula);

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

    tituloForm.textContent = "Editar pessoa";

    btnSalvar.textContent = "Atualizar";

    btnCancelar.hidden = false;

    limparErros();

    renderizarTabela();

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

    // Se a pessoa editada for excluída, cancela a edição
    if (indiceEdicao === indice) {

        limparFormulario();

    } else if (indiceEdicao !== null && indice < indiceEdicao) {

        // Ajusta o índice caso uma linha anterior seja removida
        indiceEdicao--;

    }

    renderizarTabela();

}


// ==========================================================
// LIMPAR FORMULÁRIO
// ==========================================================

function limparFormulario() {

    formulario.reset();

    limparErros();

    indiceEdicao = null;

    tituloForm.textContent = "Nova pessoa";

    btnSalvar.textContent = "Salvar";

    btnCancelar.hidden = true;

    renderizarTabela();

}


// ==========================================================
// BOTÃO CANCELAR
// ==========================================================

btnCancelar.addEventListener("click", function() {

    limparFormulario();

});


// ==========================================================
// INICIALIZAÇÃO
// ==========================================================

renderizarTabela();
