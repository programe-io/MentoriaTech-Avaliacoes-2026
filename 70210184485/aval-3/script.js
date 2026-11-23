
// ARMAZENAMENTO

const CHAVE_PESSOAS = "pessoas";

function carregarPessoas() {
    try {
        const dados = localStorage.getItem(CHAVE_PESSOAS);

        if (dados === null) {
            return [];
        }

        const lista = JSON.parse(dados);

        return Array.isArray(lista) ? lista : [];

    } catch (erro) {
        console.error("Erro ao carregar:", erro);
        return [];
    }
}

let pessoas = carregarPessoas();
let contadorCodigo = 0;

function ajustarContador() {
    pessoas.forEach(function(pessoa) {
        if (pessoa.id > contadorCodigo) {
            contadorCodigo = pessoa.id;
        }
    });
}

ajustarContador();

function gerarCodigo() {
    return ++contadorCodigo;
}

function salvar() {
    localStorage.setItem(
        CHAVE_PESSOAS,
        JSON.stringify(pessoas)
    );
}

// ELEMENTOS DO DOM

const formPessoa = document.getElementById("form-pessoa");
const inputNome = document.getElementById("nome");
const inputIdade = document.getElementById("idade");
const inputAltura = document.getElementById("altura");
const inputPeso = document.getElementById("peso");
const tabelaPessoas = document.getElementById("tabela-pessoas");
const mensagemDeErro = document.getElementById("erro");

// CÁLCULO DO IMC

function calcularIMC(peso, altura) {
    return peso / (altura * altura);
}

// CLASSIFICAÇÃO DO IMC

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

// FORMATAÇÃO NUMÉRICA

function formatar(valor, casas) {
    return valor.toLocaleString("pt-BR", {
        minimumFractionDigits: casas,
        maximumFractionDigits: casas
    });
}

// CRIAR CÉLULA

function criarCelula(texto) {
    const td = document.createElement("td");
    td.textContent = texto;
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

    tr.appendChild(
        criarCelula(formatar(pessoa.altura, 2) + " m")
    );

    tr.appendChild(
        criarCelula(formatar(pessoa.peso, 1) + " kg")
    );

    tr.appendChild(criarCelula(formatar(imc, 1)));

    const tdClassificacao = document.createElement("td");
    const selo = document.createElement("span");

    selo.classList.add("selo", classificacao.classe);
    selo.textContent = classificacao.texto;

    tdClassificacao.appendChild(selo);
    tr.appendChild(tdClassificacao);

    const tdAcoes = document.createElement("td");
    const botaoExcluir = document.createElement("button");

    botaoExcluir.type = "button";
    botaoExcluir.classList.add("excluir");
    botaoExcluir.dataset.acao = "excluir";
    botaoExcluir.textContent = "Excluir";

    tdAcoes.appendChild(botaoExcluir);
    tr.appendChild(tdAcoes);

    return tr;
}

// RENDERIZAR TABELA

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

// LER FORMULÁRIO

function lerFormulario() {
    return {
        nome: inputNome.value.trim(),
        idade: Number(inputIdade.value),
        altura: Number(inputAltura.value),
        peso: Number(inputPeso.value)
    };
}

// VALIDAR DADOS

function validarDados(dados) {
    if (dados.nome.length < 2) {
        return "Informe um nome com no mínimo duas letras.";
    }

    if (
        !Number.isInteger(dados.idade) ||
        dados.idade < 1 ||
        dados.idade > 120
    ) {
        return "A idade deve estar entre 1 e 120 anos.";
    }

    if (
        !Number.isFinite(dados.altura) ||
        dados.altura < 0.5 ||
        dados.altura > 2.5
    ) {
        return "A altura deve estar entre 0,50 e 2,50 metros.";
    }

    if (
        !Number.isFinite(dados.peso) ||
        dados.peso < 2 ||
        dados.peso > 500
    ) {
        return "O peso deve estar entre 2 e 500 kg.";
    }

    return "";
}

// MENSAGENS DE ERRO

function mostrarErro(texto) {
    mensagemDeErro.textContent = texto;
    mensagemDeErro.hidden = false;
}

function limparErro() {
    mensagemDeErro.textContent = "";
    mensagemDeErro.hidden = true;
}

// ADICIONAR PACIENTE

function adicionarPessoa(dados) {
    const novaPessoa = {
        id: gerarCodigo(),
        nome: dados.nome,
        idade: dados.idade,
        altura: dados.altura,
        peso: dados.peso
    };

    pessoas.push(novaPessoa);
}

// EVENTO SALVAR PACIENTE

formPessoa.addEventListener("submit", function(evento) {
    evento.preventDefault();

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

    alert("Paciente cadastrado com sucesso!");
});

// EVENTO CANCELAR

formPessoa.addEventListener("reset", function() {
    limparErro();
});

// EXCLUIR PACIENTE

tabelaPessoas.addEventListener("click", function(evento) {
    const botao = evento.target.closest(
        "button[data-acao='excluir']"
    );

    if (!botao) {
        return;
    }

    const linha = botao.closest("tr");

    if (!linha) {
        return;
    }

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

// INICIAR APLICAÇÃO

render();
