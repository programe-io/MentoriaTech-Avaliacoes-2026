// CONTROLE DE IDENTIFICADORES

let ultimoCodigo = 0;

// ARMAZENAMENTO DOS PACIENTES

let pessoas = JSON.parse(localStorage.getItem("pessoas")) || [];

// REFERÊNCIAS DO HTML

const formPessoa = document.getElementById("form-pessoa");
const inputNome = document.getElementById("nome");
const inputIdade = document.getElementById("idade");
const inputAltura = document.getElementById("altura");
const inputPeso = document.getElementById("peso");

const tabelaPessoas = document.getElementById("tabela-pessoas");
const mensagemDeErro = document.getElementById("erro");

// GERAÇÃO DE CÓDIGO

function gerarCodigo() {
    ultimoCodigo++;
    return ultimoCodigo;
}

// CRIAR CÉLULA

function criarCelula(conteudo) {
    const td = document.createElement("td");
    td.textContent = conteudo;
    return td;
}

// CRIAR LINHA

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

    const tdClassificacao = document.createElement("td");

    const selo = document.createElement("span");

    selo.classList.add("selo", classificacao.classe);
    selo.textContent = classificacao.texto;

    tdClassificacao.appendChild(selo);
    tr.appendChild(tdClassificacao);

    const tdAcoes = document.createElement("td");

    const botaoExcluir = document.createElement("button");

    botaoExcluir.textContent = "Excluir";
    botaoExcluir.classList.add("excluir");
    botaoExcluir.dataset.acao = "excluir";

    tdAcoes.appendChild(botaoExcluir);
    tr.appendChild(tdAcoes);

    return tr;
}

// FUNÇÃO DE RENDERIZAÇÃO

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

    pessoas.forEach(function(pessoa) {
        tabelaPessoas.appendChild(criarLinha(pessoa));
    });
}

// CÁLCULO DO IMC

function calcularIMC(peso, altura) {
    return peso / (altura * altura);
}

// CLASSIFICAÇÃO DO IMC

function classificarIMC(imc) {

    if (imc < 18.5) {
        return {
            texto: "Abaixo do peso",
            classe: "atencao"
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
            classe: "atencao"
        };
    }

    if (imc < 35) {
        return {
            texto: "Obesidade grau I",
            classe: "alerta"
        };
    }

    if (imc < 40) {
        return {
            texto: "Obesidade grau II",
            classe: "alerta"
        };
    }

    return {
        texto: "Obesidade grau III",
        classe: "alerta"
    };
}

// FORMATAÇÃO DOS NÚMEROS

function formatar(valor, casasDecimais) {
    return valor.toLocaleString("pt-BR", {
        minimumFractionDigits: casasDecimais,
        maximumFractionDigits: casasDecimais
    });
}

// LEITURA DO FORMULÁRIO

function lerFormulario() {

    return {
        nome: inputNome.value.trim(),
        idade: Number(inputIdade.value),
        altura: Number(inputAltura.value),
        peso: Number(inputPeso.value)
    };
}

// VALIDAÇÃO DOS DADOS

function validarDados(dados) {

    if (dados.nome.length < 2) {
        return "Informe o nome com no mínimo duas letras.";
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
        return "O peso deve estar entre 2 e 500 kg.";
    }

    return "";
}

// ADICIONAR PESSOA

function adicionarPessoa(dados) {

    const pessoa = {
        id: gerarCodigo(),
        nome: dados.nome,
        idade: dados.idade,
        altura: dados.altura,
        peso: dados.peso
    };

    pessoas.push(pessoa);

    salvarPessoas();
}

// ARMAZENAMENTO NO LOCALSTORAGE

function salvarPessoas() {
    localStorage.setItem("pessoas", JSON.stringify(pessoas));
}

// MOSTRAR ERRO

function mostrarErro(mensagem) {
    mensagemDeErro.textContent = mensagem;
    mensagemDeErro.hidden = false;
}

// LIMPAR ERRO

function limparErro() {
    mensagemDeErro.textContent = "";
    mensagemDeErro.hidden = true;
}

// EVENTO DE ENVIO DO FORMULÁRIO

formPessoa.addEventListener("submit", function(e) {

    e.preventDefault();

    const dados = lerFormulario();

    const erro = validarDados(dados);

    if (erro) {
        mostrarErro(erro);
        return;
    }

    limparErro();

    adicionarPessoa(dados);

    formPessoa.reset();

    inputNome.focus();

    render();
});

// EXCLUIR PACIENTE

tabelaPessoas.addEventListener("click", function(e) {

    if (e.target.dataset.acao === "excluir") {

        const linha = e.target.closest("tr");

        const id = Number(linha.dataset.id);

        pessoas = pessoas.filter(function(pessoa) {
            return pessoa.id !== id;
        });

        salvarPessoas();

        render();
    }
});

// CARREGAR PACIENTES SALVOS

if (pessoas.length > 0) {
    ultimoCodigo = Math.max(...pessoas.map(pessoa => pessoa.id));
}

// CHAMADA INICIAL

render();