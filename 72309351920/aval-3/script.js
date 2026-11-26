
// ==========================================
// 1. CONFIGURAÇÕES E ARMAZENAMENTO
// ==========================================

const CHAVE_PESSOAS = "pessoas";

let pessoas = [];

let proximoId = 0;


// ==========================================
// 2. REFERÊNCIAS DO HTML
// ==========================================

const formPessoa = document.getElementById("formPessoa");

const inputNome = document.getElementById("nome");

const inputIdade = document.getElementById("idade");

const inputAltura = document.getElementById("altura");

const inputPeso = document.getElementById("peso");

const mensagemDeErro = document.getElementById("erro");

const corpoTabela = document.getElementById("corpoTabela");

const listaVazia = document.getElementById("listaVazia");

const contador = document.getElementById("contador");

const totalPessoas = document.getElementById("totalPessoas");

const imcMedio = document.getElementById("imcMedio");


// ==========================================
// 3. FUNÇÃO PARA FORMATAR NÚMEROS
// ==========================================

function formatar(valor, casas) {

    return valor.toLocaleString("pt-BR", {
        minimumFractionDigits: casas,
        maximumFractionDigits: casas
    });

}


// ==========================================
// 4. FUNÇÃO PARA CALCULAR O IMC
// ==========================================

function calcularIMC(peso, altura) {

    return peso / (altura * altura);

}


// ==========================================
// 5. FUNÇÃO PARA CLASSIFICAR O IMC
// ==========================================

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

    } else {

        return {
            texto: "Obesidade",
            classe: "obesidade"
        };

    }

}


// ==========================================
// 6. FUNÇÃO PARA LER O FORMULÁRIO
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
// 7. FUNÇÃO PARA VALIDAR OS DADOS
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

        return "A altura deve estar entre 0,50 m e 2,50 m.";

    }

    if (
        !Number.isFinite(dados.peso) ||
        dados.peso < 2 ||
        dados.peso > 500
    ) {

        return "O peso deve estar entre 2 kg e 500 kg.";

    }

    return "";

}


// ==========================================
// 8. FUNÇÃO PARA MOSTRAR ERRO
// ==========================================

function mostrarErro(texto) {

    mensagemDeErro.textContent = texto;

    mensagemDeErro.hidden = false;

}


// ==========================================
// 9. FUNÇÃO PARA LIMPAR ERRO
// ==========================================

function limparErro() {

    mensagemDeErro.textContent = "";

    mensagemDeErro.hidden = true;

}


// ==========================================
// 10. FUNÇÃO PARA ADICIONAR PESSOA
// ==========================================

function adicionarPessoa(dados) {

    proximoId++;

    const novaPessoa = {

        id: proximoId,

        nome: dados.nome,

        idade: dados.idade,

        altura: dados.altura,

        peso: dados.peso

    };

    pessoas.push(novaPessoa);

    return novaPessoa;

}


// ==========================================
// 11. FUNÇÃO PARA CRIAR UMA LINHA DA TABELA
// ==========================================

function criarLinha(pessoa) {

    const linha = document.createElement("tr");

    const imc = calcularIMC(
        pessoa.peso,
        pessoa.altura
    );

    const classificacao = classificarIMC(imc);


    // ID

    const tdId = document.createElement("td");

    tdId.textContent = pessoa.id;


    // Nome

    const tdNome = document.createElement("td");

    tdNome.textContent = pessoa.nome;


    // Idade

    const tdIdade = document.createElement("td");

    tdIdade.textContent = pessoa.idade + " anos";


    // Altura

    const tdAltura = document.createElement("td");

    tdAltura.textContent = formatar(
        pessoa.altura,
        2
    ) + " m";


    // Peso

    const tdPeso = document.createElement("td");

    tdPeso.textContent = formatar(
        pessoa.peso,
        1
    ) + " kg";


    // IMC

    const tdIMC = document.createElement("td");

    tdIMC.textContent = formatar(imc, 1);


    // Classificação

    const tdClassificacao = document.createElement("td");

    const selo = document.createElement("span");

    selo.classList.add(
        "selo",
        classificacao.classe
    );

    selo.textContent = classificacao.texto;

    tdClassificacao.appendChild(selo);


    // Botão excluir

    const tdAcao = document.createElement("td");

    const btnExcluir = document.createElement("button");

    btnExcluir.textContent = "Excluir";

    btnExcluir.classList.add("btn-excluir");

    btnExcluir.addEventListener("click", function() {

        excluirPessoa(pessoa.id);

    });

    tdAcao.appendChild(btnExcluir);


    // Adicionando todas as colunas

    linha.appendChild(tdId);
    linha.appendChild(tdNome);
    linha.appendChild(tdIdade);
    linha.appendChild(tdAltura);
    linha.appendChild(tdPeso);
    linha.appendChild(tdIMC);
    linha.appendChild(tdClassificacao);
    linha.appendChild(tdAcao);

    return linha;

}


// ==========================================
// 12. FUNÇÃO PARA RENDERIZAR A TABELA
// ==========================================

function render() {

    corpoTabela.innerHTML = "";

    pessoas.forEach(function(pessoa) {

        const linha = criarLinha(pessoa);

        corpoTabela.appendChild(linha);

    });

    // Atualizar contador

    contador.textContent =
        pessoas.length +
        (pessoas.length === 1
            ? " registro"
            : " registros");

    totalPessoas.textContent = pessoas.length;

    // Mostrar ou esconder mensagem de lista vazia

    listaVazia.hidden = pessoas.length > 0;

    // Calcular IMC médio

    if (pessoas.length === 0) {

        imcMedio.textContent = "0,0";

    } else {

        let somaIMC = 0;

        pessoas.forEach(function(pessoa) {

            somaIMC += calcularIMC(
                pessoa.peso,
                pessoa.altura
            );

        });

        const media = somaIMC / pessoas.length;

        imcMedio.textContent = formatar(media, 1);

    }

}


// ==========================================
// 13. FUNÇÃO PARA SALVAR NO LOCALSTORAGE
// ==========================================

function salvar() {

    try {

        localStorage.setItem(
            CHAVE_PESSOAS,
            JSON.stringify(pessoas)
        );

        return true;

    } catch (erro) {

        console.error("Erro ao salvar os dados:", erro);

        return false;

    }

}


// ==========================================
// 14. FUNÇÃO PARA CARREGAR PESSOAS
// ==========================================

function carregarPessoas() {

    const dadosSalvos = localStorage.getItem(
        CHAVE_PESSOAS
    );

    if (dadosSalvos === null) {

        return [];

    }

    try {

        const dados = JSON.parse(dadosSalvos);

        if (!Array.isArray(dados)) {

            throw new Error("Os dados armazenados não são uma lista.");

        }

        return dados;

    } catch (erro) {

        console.error("Erro ao carregar os pacientes:", erro);

        return [];

    }

}


// ==========================================
// 15. FUNÇÃO PARA AJUSTAR O CONTADOR DE ID
// ==========================================

function ajustarContadorCodigo() {

    let maior = 0;

    pessoas.forEach(function(pessoa) {

        if (
            Number.isInteger(pessoa.id) &&
            pessoa.id > maior
        ) {

            maior = pessoa.id;

        }

    });

    proximoId = maior;

}


// ==========================================
// 16. FUNÇÃO PARA EXCLUIR PESSOA
// ==========================================

function excluirPessoa(id) {

    const pessoa = pessoas.find(function(item) {

        return item.id === id;

    });

    if (!pessoa) {

        mostrarErro("Paciente não encontrado.");

        return;

    }

    const confirmar = confirm(
        "Deseja realmente excluir o paciente " +
        pessoa.nome +
        "?"
    );

    if (!confirmar) {

        return;

    }

    pessoas = pessoas.filter(function(item) {

        return item.id !== id;

    });

    const salvou = salvar();

    render();

    limparErro();

    if (!salvou) {

        mostrarErro(
            "Paciente excluído da tela, mas não foi possível atualizar o armazenamento."
        );

    }

}


// ==========================================
// 17. EVENTO DE ENVIO DO FORMULÁRIO
// ==========================================

formPessoa.addEventListener("submit", function(event) {

    event.preventDefault();

    // Ler os dados

    const dados = lerFormulario();

    // Validar os dados

    const erro = validarDados(dados);

    if (erro !== "") {

        mostrarErro(erro);

        return;

    }

    // Limpar mensagens

    limparErro();

    // Adicionar pessoa

    adicionarPessoa(dados);

    // Salvar dados

    const salvou = salvar();

    // Atualizar tabela

    render();

    // Limpar formulário

    formPessoa.reset();

    // Focar novamente no campo nome

    inputNome.focus();

    if (salvou) {

        alert("Paciente cadastrado com sucesso!");

    } else {

        mostrarErro(
            "Paciente cadastrado nesta sessão, mas não foi possível salvar no navegador."
        );

    }

});


// ==========================================
// 18. INICIALIZAÇÃO DO SISTEMA
// ==========================================

// Carregar pessoas salvas

pessoas = carregarPessoas();

// Ajustar o próximo código

ajustarContadorCodigo();

// Exibir os dados na tabela

render();

