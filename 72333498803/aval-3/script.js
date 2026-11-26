
// ======================================
// VARIÁVEIS E REFERÊNCIAS DO HTML
// ======================================

let contadorCodigo = 0;

const chavePessoas = "pessoas";

const tabelaPessoas = document.getElementById("tabela-pessoas");

const formPessoa = document.getElementById("form-pessoa");
const inputNome = document.getElementById("nome");
const inputIdade = document.getElementById("idade");
const inputAltura = document.getElementById("altura");
const inputPeso = document.getElementById("peso");

const mensagemDeErro = document.getElementById("erro");

// ======================================
// GERAÇÃO DE IDENTIFICADOR
// ======================================

function gerarCodigo() {
    return ++contadorCodigo;
}

// ======================================
// CRIAÇÃO DE CÉLULAS E LINHAS
// ======================================

function criarCelula(conteudo) {
    const td = document.createElement("td");
    td.textContent = conteudo;

    return td;
}

function criarLinha(pessoa) {
    const tr = document.createElement("tr");

    tr.dataset.id = pessoa.id;

    // Calcula o IMC e sua classificação
    const imc = calcularIMC(pessoa.peso, pessoa.altura);
    const classificacao = classificarIMC(imc);

    // Dados do paciente
    tr.appendChild(criarCelula(pessoa.nome));
    tr.appendChild(criarCelula(pessoa.idade));
    tr.appendChild(criarCelula(formatar(pessoa.altura, 2) + " m"));
    tr.appendChild(criarCelula(formatar(pessoa.peso, 1) + " kg"));
    tr.appendChild(criarCelula(formatar(imc, 1)));

    // Coluna de classificação
    const tdClassificacao = document.createElement("td");

    const selo = document.createElement("span");

    selo.classList.add("selo", classificacao.classe);
    selo.textContent = classificacao.texto;

    tdClassificacao.appendChild(selo);
    tr.appendChild(tdClassificacao);

    // Coluna de ações
    const tdAcoes = document.createElement("td");

    const botaoApagar = document.createElement("button");

    botaoApagar.textContent = "Apagar";
    botaoApagar.classList.add("btn-apagar");

    botaoApagar.addEventListener("click", function () {
        apagarPessoa(pessoa.id);
    });

    tdAcoes.appendChild(botaoApagar);
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
        const linha = criarLinha(pessoa);

        tabelaPessoas.appendChild(linha);
    });
}

// ======================================
// FUNÇÕES DE NEGÓCIO
// ======================================

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

// Formata valores numéricos
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
        return "A altura deve estar entre 0,5 m e 2,5 m.";
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
// LOCALSTORAGE
// ======================================

// Salva os pacientes no navegador
function salvar() {
    localStorage.setItem(
        chavePessoas,
        JSON.stringify(pessoas)
    );
}

// Carrega os pacientes salvos
function carregarPessoas() {

    const dadosSalvos = localStorage.getItem(chavePessoas);

    if (dadosSalvos === null) {
        return [];
    }

    try {
        const dados = JSON.parse(dadosSalvos);

        if (Array.isArray(dados)) {
            return dados;
        }

        return [];

    } catch (erro) {
        console.error("Erro ao carregar pacientes:", erro);
        return [];
    }
}

// Ajusta o contador de códigos
function ajustarContadorCodigo() {

    let maior = 0;

    pessoas.forEach(function (pessoa) {

        if (pessoa.id > maior) {
            maior = pessoa.id;
        }

    });

    contadorCodigo = maior;
}

// ======================================
// APAGAR PACIENTE
// ======================================

function apagarPessoa(id) {

    const confirmar = confirm("Deseja realmente apagar este paciente?");

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

    formPessoa.reset();

    inputNome.focus();

    render();

});

// Limpa mensagens de erro ao cancelar
formPessoa.addEventListener("reset", function () {
    limparErro();
});

// ======================================
// INICIALIZAÇÃO DO SISTEMA
// ======================================

let pessoas = carregarPessoas();

ajustarContadorCodigo();

render();
