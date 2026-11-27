
// ======================================
// VARIÁVEIS E REFERÊNCIAS DO DOM
// ======================================

let codigo = 0;

const chavePessoas = "pessoas";

const formPessoa = document.getElementById("form-pessoa");
const inputNome = document.getElementById("nome");
const inputIdade = document.getElementById("idade");
const inputAltura = document.getElementById("altura");
const inputPeso = document.getElementById("peso");

const tabelaPessoas = document.getElementById("tabela-pessoas");
const mensagemDeErro = document.getElementById("erro");

let pessoas = carregarPessoas();

ajustarCodigo();


// ======================================
// GERAÇÃO DE IDENTIFICADOR
// ======================================

function gerarCodigo() {
    codigo++;
    return codigo;
}


// ======================================
// FUNÇÕES DE CRIAÇÃO DA TABELA
// ======================================

function criarCelula(conteudo) {
    const td = document.createElement("td");
    td.textContent = conteudo;
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
    tr.appendChild(criarCelula(formatar(pessoa.peso, 1) + " kg"));
    tr.appendChild(criarCelula(formatar(imc, 1)));

    // Coluna classificação
    const tdClassificacao = document.createElement("td");

    const selo = document.createElement("span");

    selo.classList.add("selo", classificacao.classe);
    selo.textContent = classificacao.texto;

    tdClassificacao.appendChild(selo);

    tr.appendChild(tdClassificacao);

    // Coluna ações
    const tdAcoes = document.createElement("td");

    const botaoExcluir = document.createElement("button");

    botaoExcluir.textContent = "Excluir";
    botaoExcluir.classList.add("btn-excluir");

    botaoExcluir.addEventListener("click", function () {
        excluirPessoa(pessoa.id);
    });

    tdAcoes.appendChild(botaoExcluir);

    tr.appendChild(tdAcoes);

    return tr;
}


// ======================================
// FUNÇÃO DE RENDERIZAÇÃO
// ======================================

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

    pessoas.forEach(function (pessoa) {
        tabelaPessoas.appendChild(criarLinha(pessoa));
    });
}


// ======================================
// FUNÇÕES DE NEGÓCIO
// ======================================

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


// Formatação dos números
function formatar(valor, casas) {

    return valor.toLocaleString("pt-BR", {
        minimumFractionDigits: casas,
        maximumFractionDigits: casas
    });
}


// ======================================
// LEITURA DO FORMULÁRIO
// ======================================

function lerFormulario() {

    return {
        nome: inputNome.value.trim(),
        idade: Number(inputIdade.value),
        altura: Number(inputAltura.value),
        peso: Number(inputPeso.value)
    };
}


// ======================================
// VALIDAÇÃO DOS DADOS
// ======================================

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


// ======================================
// MENSAGENS DE ERRO
// ======================================

function mostrarErro(mensagem) {

    mensagemDeErro.textContent = mensagem;
    mensagemDeErro.hidden = false;
}


function limparErro() {

    mensagemDeErro.textContent = "";
    mensagemDeErro.hidden = true;
}


// ======================================
// ADICIONAR PESSOA
// ======================================

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


// ======================================
// EXCLUIR PESSOA
// ======================================

function excluirPessoa(id) {

    const confirmar = confirm(
        "Deseja realmente excluir este paciente?"
    );

    if (!confirmar) {
        return;
    }

    pessoas = pessoas.filter(function (pessoa) {
        return pessoa.id !== id;
    });

    salvar();
    render();
}


// ======================================
// LOCAL STORAGE
// ======================================

// Salvar pessoas
function salvar() {

    localStorage.setItem(
        chavePessoas,
        JSON.stringify(pessoas)
    );
}


// Carregar pessoas
function carregarPessoas() {

    const dados = localStorage.getItem(chavePessoas);

    if (!dados) {
        return [];
    }

    try {

        const lista = JSON.parse(dados);

        if (Array.isArray(lista)) {
            return lista;
        }

        return [];

    } catch (erro) {

        console.error("Erro ao carregar pacientes:", erro);

        return [];
    }
}


// Ajustar contador de códigos
function ajustarCodigo() {

    let maior = 0;

    pessoas.forEach(function (pessoa) {

        if (Number.isInteger(pessoa.id) && pessoa.id > maior) {
            maior = pessoa.id;
        }
    });

    codigo = maior;
}


// ======================================
// EVENTO DE ENVIO DO FORMULÁRIO
// ======================================

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

    render();

    formPessoa.reset();

    inputNome.focus();

});


// Limpar mensagem de erro ao editar
formPessoa.addEventListener("input", function () {
    limparErro();
});


// ======================================
// INICIALIZAÇÃO DA APLICAÇÃO
// ======================================

render();
