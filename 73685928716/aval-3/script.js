
"use strict";

// ==========================================
// 1. REFERÊNCIAS DO HTML
// ==========================================

const formPessoa = document.getElementById("form-pessoa");

const inputNome = document.getElementById("nome");
const inputIdade = document.getElementById("idade");
const inputAltura = document.getElementById("altura");
const inputPeso = document.getElementById("peso");

const tabelaPessoas = document.getElementById("tabela-pessoas");

const mensagemDeErro = document.getElementById("erro");

const botaoCancelar = document.getElementById("cancelar");

const chavePessoas = "pessoas";


// ==========================================
// 2. VERIFICAR ELEMENTOS
// ==========================================

if (
    !formPessoa ||
    !inputNome ||
    !inputIdade ||
    !inputAltura ||
    !inputPeso ||
    !tabelaPessoas ||
    !mensagemDeErro ||
    !botaoCancelar
) {
    console.error(
        "Erro: confira os IDs dos elementos no arquivo HTML."
    );

    throw new Error("Não foi possível encontrar todos os elementos HTML.");
}


// ==========================================
// 3. CARREGAR PACIENTES
// ==========================================

function carregarPessoas() {

    try {

        const dados = localStorage.getItem(chavePessoas);

        if (!dados) {
            return [];
        }

        const resultado = JSON.parse(dados);

        if (!Array.isArray(resultado)) {
            return [];
        }

        return resultado;

    } catch (erro) {

        console.error("Erro ao carregar pacientes:", erro);

        return [];

    }

}

let pessoas = carregarPessoas();


// ==========================================
// 4. GERAR IDENTIFICADOR
// ==========================================

let codigo = 0;

function gerarCodigo() {

    codigo++;

    return codigo;

}

function ajustarContador() {

    let maior = 0;

    pessoas.forEach(function (pessoa) {

        if (Number(pessoa.id) > maior) {
            maior = Number(pessoa.id);
        }

    });

    codigo = maior;

}


// ==========================================
// 5. CÁLCULO DO IMC
// ==========================================

function calcularIMC(peso, altura) {

    return peso / (altura * altura);

}


// ==========================================
// 6. CLASSIFICAÇÃO DO IMC
// ==========================================

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

    if (imc < 35) {

        return {
            texto: "Obesidade grau I",
            classe: "obesidade"
        };

    }

    if (imc < 40) {

        return {
            texto: "Obesidade grau II",
            classe: "obesidade"
        };

    }

    return {
        texto: "Obesidade grau III",
        classe: "obesidade"
    };

}


// ==========================================
// 7. FORMATAR NÚMEROS
// ==========================================

function formatar(valor, casas) {

    return Number(valor).toLocaleString("pt-BR", {

        minimumFractionDigits: casas,

        maximumFractionDigits: casas

    });

}


// ==========================================
// 8. LER FORMULÁRIO
// ==========================================

function lerFormulario() {

    return {

        nome: inputNome.value.trim(),

        idade: Number(inputIdade.value),

        altura: Number(inputAltura.value),

        peso: Number(inputPeso.value)

    };

}


// ==========================================
// 9. VALIDAR DADOS
// ==========================================

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

        return "A altura deve estar entre 0,5 e 2,5 metros.";

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


// ==========================================
// 10. MENSAGENS DE ERRO
// ==========================================

function mostrarErro(mensagem) {

    mensagemDeErro.textContent = mensagem;

    mensagemDeErro.hidden = false;

}

function limparErro() {

    mensagemDeErro.textContent = "";

    mensagemDeErro.hidden = true;

}


// ==========================================
// 11. SALVAR NO LOCALSTORAGE
// ==========================================

function salvar() {

    try {

        localStorage.setItem(
            chavePessoas,
            JSON.stringify(pessoas)
        );

        return true;

    } catch (erro) {

        console.error("Erro ao salvar pacientes:", erro);

        mostrarErro("Não foi possível salvar os dados no navegador.");

        return false;

    }

}


// ==========================================
// 12. ADICIONAR PESSOA
// ==========================================

function adicionarPessoa(dados) {

    const pessoa = {

        id: gerarCodigo(),

        nome: dados.nome,

        idade: dados.idade,

        altura: dados.altura,

        peso: dados.peso

    };

    pessoas.push(pessoa);

    if (!salvar()) {

        pessoas.pop();

        codigo--;

        return false;

    }

    return true;

}


// ==========================================
// 13. CRIAR CÉLULA
// ==========================================

function criarCelula(conteudo) {

    const td = document.createElement("td");

    td.textContent = conteudo;

    return td;

}


// ==========================================
// 14. CRIAR LINHA
// ==========================================

function criarLinha(pessoa) {

    const tr = document.createElement("tr");

    tr.dataset.id = pessoa.id;

    const imc = calcularIMC(pessoa.peso, pessoa.altura);

    const classificacao = classificarIMC(imc);

    tr.appendChild(criarCelula(pessoa.nome));

    tr.appendChild(criarCelula(pessoa.idade));

    tr.appendChild(
        criarCelula(formatar(pessoa.altura, 2) + " m")
    );

    tr.appendChild(
        criarCelula(formatar(pessoa.peso, 1) + " KG")
    );

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

    const botaoExcluir = document.createElement("button");

    botaoExcluir.textContent = "Excluir";

    botaoExcluir.classList.add("btn-excluir");

    botaoExcluir.type = "button";

    botaoExcluir.addEventListener("click", function () {

        excluirPessoa(pessoa.id);

    });

    tdAcoes.appendChild(botaoExcluir);

    tr.appendChild(tdAcoes);

    return tr;

}


// ==========================================
// 15. RENDERIZAR TABELA
// ==========================================

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

        return;

    }

    pessoas.forEach(function (pessoa) {

        const linha = criarLinha(pessoa);

        tabelaPessoas.appendChild(linha);

    });

}


// ==========================================
// 16. EXCLUIR PESSOA
// ==========================================

function excluirPessoa(id) {

    const pessoasAnteriores = pessoas;

    pessoas = pessoas.filter(function (pessoa) {

        return pessoa.id !== id;

    });

    if (!salvar()) {

        pessoas = pessoasAnteriores;

        render();

        return;

    }

    render();

}


// ==========================================
// 17. EVENTO DE CADASTRO
// ==========================================

formPessoa.addEventListener("submit", function (evento) {

    evento.preventDefault();

    limparErro();

    const dados = lerFormulario();

    const erro = validarDados(dados);

    if (erro !== "") {

        mostrarErro(erro);

        return;

    }

    const cadastrado = adicionarPessoa(dados);

    if (!cadastrado) {
        return;
    }

    formPessoa.reset();

    inputNome.focus();

    render();

    console.log("Paciente cadastrado com sucesso!");

});


// ==========================================
// 18. BOTÃO CANCELAR
// ==========================================

botaoCancelar.addEventListener("click", function () {

    formPessoa.reset();

    limparErro();

    inputNome.focus();

});


// ==========================================
// 19. INICIALIZAÇÃO
// ==========================================

ajustarContador();

render();

console.log("Sistema de Ficha de Anamnese iniciado!");
