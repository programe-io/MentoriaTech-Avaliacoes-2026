
"use strict";

// ========================================
// 1. CONFIGURAÇÕES E VARIÁVEIS
// ========================================

const CHAVE_PESSOAS = "pessoas";

let contadorCodigo = 0;
let pessoas = [];

// Elementos HTML
const elementos = {
    tabela: document.getElementById("tabela-pessoas"),
    formulario: document.getElementById("form-pessoa"),
    nome: document.getElementById("input-nome"),
    idade: document.getElementById("input-idade"),
    altura: document.getElementById("input-altura"),
    peso: document.getElementById("input-peso"),
    erro: document.getElementById("erro")
};

// ========================================
// 2. FUNÇÕES AUXILIARES
// ========================================

// Formatar números no padrão brasileiro
function formatarNumero(valor, casas = 1) {
    return Number(valor).toLocaleString("pt-BR", {
        minimumFractionDigits: casas,
        maximumFractionDigits: casas
    });
}

// Gerar código único
function gerarCodigo() {
    contadorCodigo++;
    return contadorCodigo;
}

// ========================================
// 3. LEITURA DO FORMULÁRIO
// ========================================

function lerFormulario() {
    return {
        nome: elementos.nome.value.trim(),
        idade: Number(elementos.idade.value),
        altura: Number(elementos.altura.value),
        peso: Number(elementos.peso.value)
    };
}

// ========================================
// 4. VALIDAÇÃO DOS DADOS
// ========================================

function validarDados(dados) {

    if (dados.nome.length < 2) {
        return "Informe um nome com pelo menos 2 caracteres.";
    }

    if (!Number.isInteger(dados.idade) ||
        dados.idade < 1 ||
        dados.idade > 120) {

        return "A idade deve estar entre 1 e 120 anos.";
    }

    if (!Number.isFinite(dados.altura) ||
        dados.altura < 0.5 ||
        dados.altura > 2.5) {

        return "A altura deve estar entre 0,5 e 2,5 metros.";
    }

    if (!Number.isFinite(dados.peso) ||
        dados.peso < 2 ||
        dados.peso > 500) {

        return "O peso deve estar entre 2 e 500 kg.";
    }

    return null;
}

// ========================================
// 5. CONTROLE DE MENSAGENS
// ========================================

function mostrarErro(mensagem) {
    elementos.erro.textContent = mensagem;
    elementos.erro.hidden = false;
}

function limparErro() {
    elementos.erro.textContent = "";
    elementos.erro.hidden = true;
}

// ========================================
// 6. CADASTRO DE PESSOAS
// ========================================

function adicionarPessoa(dados) {

    const pessoa = {
        id: gerarCodigo(),
        nome: dados.nome,
        idade: dados.idade,
        altura: dados.altura,
        peso: dados.peso
    };

    pessoas.push(pessoa);

    return pessoa;
}

// ========================================
// 7. CÁLCULO E CLASSIFICAÇÃO DO IMC
// ========================================

function calcularImc(peso, altura) {
    return peso / (altura ** 2);
}

function classificarImc(imc) {

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

// ========================================
// 8. CRIAÇÃO DOS ELEMENTOS DA TABELA
// ========================================

function criarCelula(texto) {

    const td = document.createElement("td");

    td.textContent = texto;

    return td;
}

function criarLinha(pessoa) {

    const tr = document.createElement("tr");

    tr.dataset.id = pessoa.id;

    const imc = calcularImc(pessoa.peso, pessoa.altura);

    const classificacao = classificarImc(imc);

    // Dados da pessoa
    tr.appendChild(criarCelula(pessoa.nome));
    tr.appendChild(criarCelula(pessoa.idade));
    tr.appendChild(criarCelula(
        formatarNumero(pessoa.altura, 2) + " m"
    ));
    tr.appendChild(criarCelula(
        formatarNumero(pessoa.peso, 1) + " kg"
    ));
    tr.appendChild(criarCelula(
        formatarNumero(imc, 1)
    ));

    // Classificação do IMC
    const tdClassificacao = criarCelula("");

    const selo = document.createElement("span");

    selo.classList.add(
        "selo",
        classificacao.classe
    );

    selo.textContent = classificacao.texto;

    tdClassificacao.appendChild(selo);

    tr.appendChild(tdClassificacao);

    return tr;
}

// ========================================
// 9. RENDERIZAÇÃO DA TABELA
// ========================================

function renderizarTabela() {

    elementos.tabela.innerHTML = "";

    if (pessoas.length === 0) {

        const tr = document.createElement("tr");
        const td = criarCelula(
            "Nenhuma pessoa cadastrada ainda."
        );

        td.colSpan = 6;
        td.classList.add("vazio");

        tr.appendChild(td);

        elementos.tabela.appendChild(tr);

        return;
    }

    const fragmento = document.createDocumentFragment();

    pessoas.forEach(pessoa => {
        fragmento.appendChild(criarLinha(pessoa));
    });

    elementos.tabela.appendChild(fragmento);
}

// ========================================
// 10. ARMAZENAMENTO LOCAL
// ========================================

function salvarPessoas() {

    try {

        localStorage.setItem(
            CHAVE_PESSOAS,
            JSON.stringify(pessoas)
        );

        return true;

    } catch (erro) {

        console.error("Erro ao salvar pessoas:", erro);

        mostrarErro(
            "Não foi possível salvar os dados no navegador."
        );

        return false;
    }
}

function carregarPessoas() {

    try {

        const dados = localStorage.getItem(CHAVE_PESSOAS);

        if (!dados) {
            return [];
        }

        const pessoasSalvas = JSON.parse(dados);

        if (!Array.isArray(pessoasSalvas)) {
            return [];
        }

        // Aceitar somente registros válidos
        return pessoasSalvas.filter(pessoa => {

            return pessoa &&
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
                pessoa.peso <= 500;
        });

    } catch (erro) {

        console.error("Erro ao carregar pessoas:", erro);

        return [];
    }
}

// ========================================
// 11. AJUSTAR CONTADOR DE CÓDIGOS
// ========================================

function ajustarContadorCodigo() {

    contadorCodigo = pessoas.reduce(
        (maior, pessoa) => Math.max(maior, pessoa.id),
        0
    );
}

// ========================================
// 12. LIMPAR FORMULÁRIO
// ========================================

function limparFormulario() {

    elementos.formulario.reset();

    elementos.nome.focus();

    limparErro();
}

// ========================================
// 13. EVENTO DE CADASTRO
// ========================================

function cadastrarPessoa(evento) {

    evento.preventDefault();

    limparErro();

    const dados = lerFormulario();

    const erro = validarDados(dados);

    if (erro) {
        mostrarErro(erro);
        return;
    }

    adicionarPessoa(dados);

    // Se não conseguir salvar, desfaz o cadastro em memória
    if (!salvarPessoas()) {
        pessoas.pop();
        ajustarContadorCodigo();
        return;
    }

    limparFormulario();

    renderizarTabela();
}

// ========================================
// 14. INICIALIZAÇÃO DO SISTEMA
// ========================================

function iniciarSistema() {

    pessoas = carregarPessoas();

    ajustarContadorCodigo();

    renderizarTabela();

    elementos.formulario.addEventListener(
        "submit",
        cadastrarPessoa
    );

}

// Iniciar aplicação
iniciarSistema();
