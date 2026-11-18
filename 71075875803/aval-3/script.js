// ==========================================
// VARIÁVEIS E REFERÊNCIAS DO HTML
// ==========================================

let contadorCodigo = 0;

const tabelaPessoas = document.getElementById("tabela-pessoas");
const formPessoa = document.getElementById("form-pessoa");

const inputNome = document.getElementById("nome");
const inputIdade = document.getElementById("idade");
const inputAltura = document.getElementById("altura");
const inputPeso = document.getElementById("peso");

const mensagemDeErro = document.getElementById("erro");

const chavePessoas = "pessoas";


// ==========================================
// GERAÇÃO DE IDENTIFICADOR
// ==========================================

function gerarCodigo() {
    contadorCodigo++;
    return contadorCodigo;
}


// ==========================================
// CRIAÇÃO DE CÉLULAS E LINHAS DA TABELA
// ==========================================

function criarCelula(conteudo) {
    const td = document.createElement("td");

    td.textContent = conteudo;

    return td;
}


function criarLinha(pessoa) {

    const tr = document.createElement("tr");

    tr.dataset.id = pessoa.id;

    // Calcula o IMC
    const imc = calcularIMC(pessoa.peso, pessoa.altura);

    // Classifica o IMC
    const classificacao = classificarIMC(imc);

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

    const botaoExcluir = document.createElement("button");

    botaoExcluir.textContent = "Excluir";

    botaoExcluir.classList.add("btn-excluir");

    botaoExcluir.addEventListener("click", function() {
        excluirPessoa(pessoa.id);
    });

    tdAcoes.appendChild(botaoExcluir);

    tr.appendChild(tdAcoes);

    return tr;
}


// ==========================================
// FUNÇÃO DE RENDERIZAÇÃO
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

    pessoas.forEach(function(pessoa) {

        const linha = criarLinha(pessoa);

        tabelaPessoas.appendChild(linha);

    });
}


// ==========================================
// FUNÇÕES DE NEGÓCIO
// ==========================================

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


// Formatação dos números
function formatar(valor, casas) {

    return valor.toLocaleString("pt-BR", {
        minimumFractionDigits: casas,
        maximumFractionDigits: casas
    });

}


// ==========================================
// LEITURA DO FORMULÁRIO
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
// VALIDAÇÃO DOS DADOS
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
// MENSAGENS DE ERRO
// ==========================================

function mostrarErro(mensagem) {

    mensagemDeErro.textContent = mensagem;

    mensagemDeErro.hidden = false;

}


function limparErro() {

    mensagemDeErro.hidden = true;

    mensagemDeErro.textContent = "";

}


// ==========================================
// ADICIONAR PESSOA
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

}


// ==========================================
// LOCALSTORAGE
// ==========================================

// Salvar pessoas no navegador
function salvar() {

    localStorage.setItem(
        chavePessoas,
        JSON.stringify(pessoas)
    );

}


// Carregar pessoas salvas
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

        console.error("Erro ao carregar os pacientes:", erro);

        return [];

    }

}


// Ajustar contador de códigos
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

    contadorCodigo = maior;

}


// ==========================================
// EXCLUIR PACIENTE
// ==========================================

function excluirPessoa(id) {

    pessoas = pessoas.filter(function(pessoa) {

        return pessoa.id !== id;

    });

    salvar();

    render();

}


// ==========================================
// EVENTO DE ENVIO DO FORMULÁRIO
// ==========================================

formPessoa.addEventListener("submit", function(e) {

    e.preventDefault();

    // Ler os dados
    const dados = lerFormulario();

    // Validar os dados
    const erro = validarDados(dados);

    if (erro !== "") {

        mostrarErro(erro);

        return;

    }

    limparErro();

    // Adicionar paciente
    adicionarPessoa(dados);

    // Salvar no localStorage
    salvar();

    // Limpar formulário
    formPessoa.reset();

    // Focar no campo nome
    inputNome.focus();

    // Atualizar tabela
    render();

});


// Limpar mensagem de erro ao cancelar
formPessoa.addEventListener("reset", function() {

    limparErro();

});


// ==========================================
// INICIALIZAÇÃO DO SISTEMA
// ==========================================

let pessoas = carregarPessoas();

ajustarContadorCodigo();

render();