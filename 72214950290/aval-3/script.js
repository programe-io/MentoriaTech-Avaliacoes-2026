
/* =====================================
   1. VARIÁVEIS E REFERÊNCIAS DO HTML
===================================== */

const formPessoa = document.getElementById("form-pessoa");

const inputNome = document.getElementById("nome");
const inputIdade = document.getElementById("idade");
const inputAltura = document.getElementById("altura");
const inputPeso = document.getElementById("peso");

const tabelaPessoas = document.getElementById("tabela-pessoas");

const mensagemDeErro = document.getElementById("erro");

const CHAVE_PESSOAS = "pessoas";

let codigo = 0;


/* =====================================
   2. GERAÇÃO AUTOMÁTICA DE ID
===================================== */

function gerarCodigo() {
    codigo++;
    return codigo;
}


/* =====================================
   3. FUNÇÕES DE NEGÓCIO
===================================== */

// Calcula o IMC

function calcularIMC(peso, altura) {
    return peso / (altura * altura);
}


// Classifica o IMC

function classificarIMC(imc) {

    if (imc < 18.5) {
        return {
            texto: "Abaixo do peso",
            classe: "abaixo-peso"
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


// Formata números no padrão brasileiro

function formatar(valor, casasDecimais = 2) {

    return valor.toLocaleString("pt-BR", {
        minimumFractionDigits: casasDecimais,
        maximumFractionDigits: casasDecimais
    });
}


/* =====================================
   4. LEITURA DO FORMULÁRIO
===================================== */

function lerFormulario() {

    return {
        nome: inputNome.value.trim(),
        idade: Number(inputIdade.value),
        altura: Number(inputAltura.value),
        peso: Number(inputPeso.value)
    };
}


/* =====================================
   5. VALIDAÇÃO DOS DADOS
===================================== */

function validarDados(dados) {

    if (dados.nome.length < 2) {
        return "Informe um nome com no mínimo duas letras.";
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


/* =====================================
   6. MENSAGENS DE ERRO
===================================== */

function mostrarErro(mensagem) {

    mensagemDeErro.textContent = mensagem;

    mensagemDeErro.hidden = false;
}


function limparErro() {

    mensagemDeErro.textContent = "";

    mensagemDeErro.hidden = true;
}


/* =====================================
   7. ADICIONAR PACIENTE
===================================== */

let pessoas = [];

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


/* =====================================
   8. CRIAR CÉLULA
===================================== */

function criarCelula(conteudo) {

    const td = document.createElement("td");

    td.textContent = conteudo;

    return td;
}


/* =====================================
   9. CRIAR LINHA DA TABELA
===================================== */

function criarLinha(pessoa) {

    const tr = document.createElement("tr");

    tr.dataset.id = pessoa.id;

    // Calcula IMC

    const imc = calcularIMC(
        pessoa.peso,
        pessoa.altura
    );

    // Classifica IMC

    const classificacao = classificarIMC(imc);

    // Nome

    tr.appendChild(
        criarCelula(pessoa.nome)
    );

    // Idade

    tr.appendChild(
        criarCelula(`${pessoa.idade} anos`)
    );

    // Altura

    tr.appendChild(
        criarCelula(`${formatar(pessoa.altura, 2)} m`)
    );

    // Peso

    tr.appendChild(
        criarCelula(`${formatar(pessoa.peso, 1)} kg`)
    );

    // IMC

    tr.appendChild(
        criarCelula(formatar(imc, 1))
    );

    // Classificação

    const tdClassificacao = document.createElement("td");

    const selo = document.createElement("span");

    selo.classList.add(
        "selo",
        classificacao.classe
    );

    selo.textContent = classificacao.texto;

    tdClassificacao.appendChild(selo);

    tr.appendChild(tdClassificacao);

    // Ações

    const tdAcoes = document.createElement("td");

    const btnExcluir = document.createElement("button");

    btnExcluir.textContent = "Excluir";

    btnExcluir.classList.add("btn-excluir");

    btnExcluir.dataset.acao = "excluir";

    tdAcoes.appendChild(btnExcluir);

    tr.appendChild(tdAcoes);

    return tr;
}


/* =====================================
   10. RENDERIZAR TABELA
===================================== */

function render() {

    tabelaPessoas.innerHTML = "";

    // Verifica se existem pacientes

    if (pessoas.length === 0) {

        const tr = document.createElement("tr");

        const td = document.createElement("td");

        td.colSpan = 7;

        td.classList.add("vazio");

        td.textContent = "Nenhum paciente cadastrado ainda.";

        tr.appendChild(td);

        tabelaPessoas.appendChild(tr);

        return;
    }

    // Percorre os pacientes

    pessoas.forEach(function(pessoa) {

        const linha = criarLinha(pessoa);

        tabelaPessoas.appendChild(linha);

    });

}


/* =====================================
   11. SALVAR NO LOCALSTORAGE
===================================== */

function salvar() {

    try {

        localStorage.setItem(
            CHAVE_PESSOAS,
            JSON.stringify(pessoas)
        );

    } catch (erro) {

        console.error("Erro ao salvar os dados:", erro);

        mostrarErro("Não foi possível salvar os dados no navegador.");
    }
}


/* =====================================
   12. CARREGAR PACIENTES SALVOS
===================================== */

function carregarPessoas() {

    const dadosSalvos = localStorage.getItem(CHAVE_PESSOAS);

    if (!dadosSalvos) {
        return [];
    }

    try {

        const dados = JSON.parse(dadosSalvos);

        if (!Array.isArray(dados)) {
            return [];
        }

        // Verifica os registros recuperados

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

        console.error("Erro ao carregar os pacientes:", erro);

        return [];
    }
}


/* =====================================
   13. AJUSTAR CONTADOR DE CÓDIGO
===================================== */

function ajustarCodigo() {

    let maior = 0;

    pessoas.forEach(function(pessoa) {

        if (pessoa.id > maior) {
            maior = pessoa.id;
        }

    });

    codigo = maior;
}


/* =====================================
   14. EXCLUIR PACIENTE
===================================== */

tabelaPessoas.addEventListener("click", function(evento) {

    const botao = evento.target.closest("button[data-acao='excluir']");

    if (!botao) {
        return;
    }

    const linha = botao.closest("tr");

    const id = Number(linha.dataset.id);

    const confirmar = confirm(
        "Deseja realmente excluir este paciente?"
    );

    if (!confirmar) {
        return;
    }

    pessoas = pessoas.filter(function(pessoa) {

        return pessoa.id !== id;

    });

    salvar();

    render();

});


/* =====================================
   15. EVENTO DE ENVIO DO FORMULÁRIO
===================================== */

formPessoa.addEventListener("submit", function(evento) {

    evento.preventDefault();

    // Lê os dados

    const dados = lerFormulario();

    // Valida os dados

    const erro = validarDados(dados);

    if (erro !== "") {

        mostrarErro(erro);

        return;
    }

    // Limpa mensagem

    limparErro();

    // Adiciona paciente

    adicionarPessoa(dados);

    // Salva no navegador

    salvar();

    // Atualiza tabela

    render();

    // Limpa formulário

    formPessoa.reset();

    // Volta o foco para o nome

    inputNome.focus();

});


/* =====================================
   16. EVENTO DO BOTÃO CANCELAR
===================================== */

formPessoa.addEventListener("reset", function() {

    limparErro();

});


/* =====================================
   17. INICIALIZAÇÃO DA APLICAÇÃO
===================================== */

// Recupera pacientes salvos

pessoas = carregarPessoas();

// Ajusta o próximo ID

ajustarCodigo();

// Exibe os pacientes

render();

