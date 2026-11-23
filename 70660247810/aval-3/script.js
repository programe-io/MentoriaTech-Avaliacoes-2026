
const formPessoa = document.getElementById("form-pessoa");
const inputNome = document.getElementById("nome");
const inputIdade = document.getElementById("idade");
const inputAltura = document.getElementById("altura");
const inputPeso = document.getElementById("peso");
const mensagemDeErro = document.getElementById("erro");
const listaPessoas = document.getElementById("lista-pessoas");

const CHAVE_PESSOAS = "pessoas";

let pessoas = carregarPessoas();
let proximoId = ajustarContador();

// CALCULAR IMC
function calcularIMC(peso, altura) {
    return peso / (altura * altura);
}

// CLASSIFICAR IMC
function classificarIMC(imc) {

    if (imc < 18.5) {
        return {
            texto: "Baixo peso",
            classe: "baixo-peso"
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

    return {
        texto: "Obesidade",
        classe: "obesidade"
    };
}

// FORMATAR NÚMEROS
function formatar(valor, casas) {
    return Number(valor).toFixed(casas);
}

// CRIAR LINHA DA TABELA
function criarLinha(pessoa) {

    const tr = document.createElement("tr");

    const imc = calcularIMC(pessoa.peso, pessoa.altura);
    const classificacao = classificarIMC(imc);

    const dados = [
        pessoa.id,
        pessoa.nome,
        pessoa.idade,
        formatar(pessoa.altura, 2) + " m",
        formatar(pessoa.peso, 1) + " kg",
        formatar(imc, 1)
    ];

    dados.forEach(valor => {
        const td = document.createElement("td");
        td.textContent = valor;
        tr.appendChild(td);
    });

    // COLUNA CLASSIFICAÇÃO
    const tdClassificacao = document.createElement("td");

    const selo = document.createElement("span");

    selo.classList.add("selo", classificacao.classe);
    selo.textContent = classificacao.texto;

    tdClassificacao.appendChild(selo);
    tr.appendChild(tdClassificacao);

    // BOTÃO EXCLUIR
    const tdAcao = document.createElement("td");
    const botao = document.createElement("button");

    botao.textContent = "Apagar";
    botao.classList.add("excluir");

    botao.addEventListener("click", () => {
        excluirPessoa(pessoa.id);
    });

    tdAcao.appendChild(botao);
    tr.appendChild(tdAcao);

    return tr;
}

// RENDERIZAR TABELA
function render() {

    listaPessoas.innerHTML = "";

    pessoas.forEach(pessoa => {
        listaPessoas.appendChild(criarLinha(pessoa));
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
        return "Informe o nome com no mínimo duas letras.";
    }

    if (!Number.isInteger(dados.idade) ||
        dados.idade < 1 || dados.idade > 120) {
        return "A idade deve ser um número inteiro entre 1 e 120.";
    }

    if (!Number.isFinite(dados.altura) ||
        dados.altura < 0.5 || dados.altura > 2.5) {
        return "A altura deve estar entre 0,50 m e 2,50 m.";
    }

    if (!Number.isFinite(dados.peso) ||
        dados.peso < 2 || dados.peso > 500) {
        return "O peso deve estar entre 2 e 500 kg.";
    }

    return "";
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

// ADICIONAR PESSOA
function adicionarPessoa(dados) {

    const pessoa = {
        id: proximoId++,
        nome: dados.nome,
        idade: dados.idade,
        altura: dados.altura,
        peso: dados.peso
    };

    pessoas.push(pessoa);
}

// SALVAR NO LOCALSTORAGE
function salvar() {

    localStorage.setItem(
        CHAVE_PESSOAS,
        JSON.stringify(pessoas)
    );
}

// CARREGAR PESSOAS
function carregarPessoas() {

    const dadosSalvos = localStorage.getItem(CHAVE_PESSOAS);

    if (!dadosSalvos) {
        return [];
    }

    try {

        const dados = JSON.parse(dadosSalvos);

        if (Array.isArray(dados)) {
            return dados;
        }

        return [];

    } catch (erro) {

        console.error("Erro ao carregar pessoas:", erro);
        return [];
    }
}

// AJUSTAR CONTADOR
function ajustarContador() {

    let maior = 0;

    pessoas.forEach(pessoa => {
        if (Number.isInteger(pessoa.id) && pessoa.id > maior) {
            maior = pessoa.id;
        }
    });

    return maior + 1;
}

// EXCLUIR PESSOA
function excluirPessoa(id) {

    pessoas = pessoas.filter(pessoa => pessoa.id !== id);

    salvar();
    render();
}

// EVENTO SUBMIT
formPessoa.addEventListener("submit", function(e) {

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

// LIMPAR MENSAGEM AO DIGITAR
formPessoa.addEventListener("input", limparErro);

// INICIAR A APLICAÇÃO
render();
