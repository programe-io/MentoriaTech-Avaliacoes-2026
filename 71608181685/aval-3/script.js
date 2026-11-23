// ===============================
// VARIÁVEIS E REFERÊNCIAS
// ===============================

let codigo = 1;

const chavePessoas = "pessoas";

const tabelaPessoas = document.getElementById("tabela-pessoas");
const formPessoa = document.getElementById("form-pessoa");

const inputNome = document.getElementById("nome");
const inputIdade = document.getElementById("idade");
const inputAltura = document.getElementById("altura");
const inputPeso = document.getElementById("peso");

const mensagemDeErro = document.getElementById("erro");

// ===============================
// FUNÇÕES DE IDENTIFICAÇÃO
// ===============================

function gerarCodigo() {
    return codigo++;
}

// ===============================
// FUNÇÕES DE CRIAÇÃO DA TABELA
// ===============================

function criarCelula(valor) {
    const td = document.createElement("td");
    td.textContent = valor;
    return td;
}

function criarLinha(pessoa) {

    const tr = document.createElement("tr");

    tr.dataset.id = pessoa.id;

    const imc = calcularIMC(pessoa.peso, pessoa.altura);

    const classificacao = classificarIMC(imc);

    tr.appendChild(criarCelula(pessoa.nome));
    tr.appendChild(criarCelula(pessoa.idade));
    tr.appendChild(criarCelula(formatar(pessoa.altura, 2) + " m"));
    tr.appendChild(criarCelula(formatar(pessoa.peso, 1) + " KG"));
    tr.appendChild(criarCelula(formatar(imc, 1)));

    const tdClassificacao = document.createElement("td");

    const selo = document.createElement("span");

    selo.classList.add("selo", classificacao.classe);

    selo.textContent = classificacao.texto;

    tdClassificacao.appendChild(selo);

    tr.appendChild(tdClassificacao);

    const tdAcoes = document.createElement("td");

    const botaoApagar = document.createElement("button");

    botaoApagar.textContent = "Apagar";

    botaoApagar.addEventListener("click", function () {
        apagarPessoa(pessoa.id);
    });

    tdAcoes.appendChild(botaoApagar);

    tr.appendChild(tdAcoes);

    return tr;
}

// ===============================
// FUNÇÃO DE RENDERIZAÇÃO
// ===============================

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

        tabelaPessoas.appendChild(criarLinha(pessoa));

    });
}

// ===============================
// FUNÇÕES DE NEGÓCIO
// ===============================

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
            texto: "Obesidade grau 1",
            classe: "obesidade1"
        };
    }

    if (imc < 40) {
        return {
            texto: "Obesidade grau 2",
            classe: "obesidade2"
        };
    }

    return {
        texto: "Obesidade grau 3",
        classe: "obesidade3"
    };
}

// Formatação de números

function formatar(valor, casas) {

    return valor.toLocaleString("pt-BR", {
        minimumFractionDigits: casas,
        maximumFractionDigits: casas
    });
}

// ===============================
// LEITURA DO FORMULÁRIO
// ===============================

function lerFormulario() {

    return {
        nome: inputNome.value.trim(),
        idade: Number(inputIdade.value),
        altura: Number(inputAltura.value),
        peso: Number(inputPeso.value)
    };
}

// ===============================
// VALIDAÇÃO DOS DADOS
// ===============================

function validarDados(dados) {

    if (dados.nome.length < 2) {
        return "Informe um nome com no mínimo duas letras.";
    }

    if (!Number.isInteger(dados.idade) ||
        dados.idade < 1 || dados.idade > 120) {
        return "A idade deve ser um número inteiro entre 1 e 120.";
    }

    if (!Number.isFinite(dados.altura) ||
        dados.altura < 0.5 || dados.altura > 2.5) {
        return "A altura deve estar entre 0,5 e 2,5 metros.";
    }

    if (!Number.isFinite(dados.peso) ||
        dados.peso < 2 || dados.peso > 500) {
        return "O peso deve estar entre 2 e 500 KG.";
    }

    return "";
}

// ===============================
// MENSAGENS DE ERRO
// ===============================

function mostrarErro(mensagem) {

    mensagemDeErro.textContent = mensagem;

    mensagemDeErro.hidden = false;
}

function limparErro() {

    mensagemDeErro.hidden = true;
}

// ===============================
// ADICIONAR PESSOA
// ===============================

function adicionarPessoa(dados) {

    pessoas.push({

        id: gerarCodigo(),

        nome: dados.nome,

        idade: dados.idade,

        altura: dados.altura,

        peso: dados.peso

    });
}

// ===============================
// LOCAL STORAGE
// ===============================

function salvar() {

    localStorage.setItem(
        chavePessoas,
        JSON.stringify(pessoas)
    );
}

function carregarPessoas() {

    const dados = localStorage.getItem(chavePessoas);

    if (!dados) {
        return [];
    }

    try {

        const resultado = JSON.parse(dados);

        return Array.isArray(resultado) ? resultado : [];

    } catch (erro) {

        console.error("Erro ao carregar pessoas:", erro);

        return [];
    }
}

// ===============================
// AJUSTAR CONTADOR
// ===============================

function ajustarContadorCodigo() {

    let maior = 0;

    pessoas.forEach(function (pessoa) {

        if (pessoa.id > maior) {
            maior = pessoa.id;
        }

    });

    codigo = maior + 1;
}

// ===============================
// APAGAR PESSOA
// ===============================

function apagarPessoa(id) {

    pessoas = pessoas.filter(function (pessoa) {
        return pessoa.id !== id;
    });

    salvar();

    render();
}

// ===============================
// EVENTO DO FORMULÁRIO
// ===============================

formPessoa.addEventListener("submit", function (e) {

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

// ===============================
// INICIALIZAÇÃO
// ===============================

let pessoas = carregarPessoas();

ajustarContadorCodigo();

render();