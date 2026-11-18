
// ======================================
// VARIÁVEIS E REFERÊNCIAS
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
const totalPessoas = document.getElementById("total-pessoas");

// ======================================
// CARREGAMENTO DOS DADOS
// ======================================

function carregarPessoas() {
    try {
        const dados = localStorage.getItem(chavePessoas);

        if (!dados) {
            return [];
        }

        const pessoasSalvas = JSON.parse(dados);

        if (!Array.isArray(pessoasSalvas)) {
            return [];
        }

        return pessoasSalvas.filter(pessoa =>
            pessoa &&
            Number.isInteger(pessoa.id) &&
            typeof pessoa.nome === "string" &&
            Number.isInteger(pessoa.idade) &&
            Number.isFinite(pessoa.altura) &&
            Number.isFinite(pessoa.peso)
        );

    } catch (erro) {
        console.error("Erro ao carregar dados:", erro);
        return [];
    }
}

let pessoas = carregarPessoas();

// ======================================
// GERAR IDENTIFICADOR
// ======================================

function ajustarCodigo() {
    let maior = 0;

    pessoas.forEach(pessoa => {
        if (pessoa.id > maior) {
            maior = pessoa.id;
        }
    });

    codigo = maior;
}

function gerarCodigo() {
    codigo++;
    return codigo;
}

// ======================================
// SALVAR NO LOCALSTORAGE
// ======================================

function salvar() {
    localStorage.setItem(
        chavePessoas,
        JSON.stringify(pessoas)
    );
}

// ======================================
// FUNÇÕES DE NEGÓCIO
// ======================================

// CALCULAR IMC

function calcularIMC(peso, altura) {
    return peso / (altura * altura);
}

// CLASSIFICAR IMC

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

// FORMATAR NÚMEROS

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
// VALIDAR DADOS
// ======================================

function validarDados(dados) {

    if (dados.nome.length < 2) {
        return "Informe um nome com no mínimo duas letras.";
    }

    if (!Number.isInteger(dados.idade) ||
        dados.idade < 1 ||
        dados.idade > 120) {
        return "A idade deve ser um número inteiro entre 1 e 120.";
    }

    if (!Number.isFinite(dados.altura) ||
        dados.altura < 0.5 ||
        dados.altura > 2.5) {
        return "A altura deve estar entre 0,50 m e 2,50 m.";
    }

    if (!Number.isFinite(dados.peso) ||
        dados.peso < 2 ||
        dados.peso > 500) {
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

    salvar();
}

// ======================================
// CRIAR CÉLULA
// ======================================

function criarCelula(conteudo) {
    const td = document.createElement("td");

    td.textContent = conteudo;

    return td;
}

// ======================================
// CRIAR LINHA DA TABELA
// ======================================

function criarLinha(pessoa) {

    const tr = document.createElement("tr");

    tr.dataset.id = pessoa.id;

    const imc = calcularIMC(
        pessoa.peso,
        pessoa.altura
    );

    const classificacao = classificarIMC(imc);

    // ID
    tr.appendChild(criarCelula(pessoa.id));

    // Nome
    tr.appendChild(criarCelula(pessoa.nome));

    // Idade
    tr.appendChild(criarCelula(pessoa.idade));

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

    botaoExcluir.addEventListener("click", () => {
        excluirPessoa(pessoa.id);
    });

    tdAcoes.appendChild(botaoExcluir);

    tr.appendChild(tdAcoes);

    return tr;
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

    pessoas = pessoas.filter(pessoa => pessoa.id !== id);

    salvar();

    render();
}

// ======================================
// RENDERIZAR TABELA
// ======================================

function render() {

    tabelaPessoas.innerHTML = "";

    if (pessoas.length === 0) {

        const tr = document.createElement("tr");

        const td = document.createElement("td");

        td.colSpan = 8;
        td.classList.add("vazio");

        td.textContent = "Nenhuma pessoa cadastrada ainda.";

        tr.appendChild(td);

        tabelaPessoas.appendChild(tr);

    } else {

        pessoas.forEach(pessoa => {
            tabelaPessoas.appendChild(
                criarLinha(pessoa)
            );
        });
    }

    totalPessoas.textContent =
        `Total de pacientes: ${pessoas.length}`;
}

// ======================================
// EVENTO DE ENVIO DO FORMULÁRIO
// ======================================

formPessoa.addEventListener("submit", function(event) {

    event.preventDefault();

    const dados = lerFormulario();

    const erro = validarDados(dados);

    if (erro !== "") {
        mostrarErro(erro);
        return;
    }

    limparErro();

    adicionarPessoa(dados);

    formPessoa.reset();

    inputNome.focus();

    render();
});

// ======================================
// EVENTO DE CANCELAMENTO
// ======================================

formPessoa.addEventListener("reset", function() {
    limparErro();
});

// ======================================
// INICIALIZAÇÃO DO SISTEMA
// ======================================

ajustarCodigo();

render();
