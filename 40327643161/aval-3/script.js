
// CHAVE DO LOCALSTORAGE
const chavePessoas = "pessoas";

// REFERÊNCIAS DO HTML
const formPessoa = document.getElementById("formPessoa");
const inputNome = document.getElementById("nome");
const inputIdade = document.getElementById("idade");
const inputAltura = document.getElementById("altura");
const inputPeso = document.getElementById("peso");
const corpoTabela = document.getElementById("corpoTabela");
const mensagemDeErro = document.getElementById("erro");
const contador = document.getElementById("contador");

// CONTADOR DE CÓDIGOS
let proximoId = 1;

// CARREGAR PESSOAS SALVAS
function carregarPessoas() {
    const dados = localStorage.getItem(chavePessoas);

    if (dados === null) {
        return [];
    }

    try {
        const lista = JSON.parse(dados);

        if (Array.isArray(lista)) {
            return lista;
        }

        return [];
    } catch (erro) {
        console.error("Erro ao carregar pessoas:", erro);
        return [];
    }
}

// LISTA DE PESSOAS
let pessoas = carregarPessoas();

// AJUSTAR CONTADOR
function ajustarContador() {
    let maior = 0;

    pessoas.forEach(pessoa => {
        if (Number(pessoa.id) > maior) {
            maior = Number(pessoa.id);
        }
    });

    proximoId = maior + 1;
}

// SALVAR NO LOCALSTORAGE
function salvar() {
    localStorage.setItem(
        chavePessoas,
        JSON.stringify(pessoas)
    );
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
    return valor.toFixed(casas);
}

// ADICIONAR PESSOA
function adicionarPessoa(dados) {

    const pessoa = {
        id: proximoId,
        nome: dados.nome,
        idade: dados.idade,
        altura: dados.altura,
        peso: dados.peso
    };

    pessoas.push(pessoa);

    proximoId++;
}

// CRIAR LINHA DA TABELA
function criarLinha(pessoa) {

    const linha = document.createElement("tr");

    const imc = calcularIMC(
        pessoa.peso,
        pessoa.altura
    );

    const classificacao = classificarIMC(imc);

    const valores = [
        pessoa.id,
        pessoa.nome,
        pessoa.idade,
        formatar(pessoa.altura, 2) + " m",
        formatar(pessoa.peso, 1) + " kg",
        formatar(imc, 1)
    ];

    valores.forEach(valor => {
        const td = document.createElement("td");
        td.textContent = valor;
        linha.appendChild(td);
    });

    // COLUNA DE CLASSIFICAÇÃO
    const tdClassificacao = document.createElement("td");

    const selo = document.createElement("span");

    selo.classList.add(
        "selo",
        classificacao.classe
    );

    selo.textContent = classificacao.texto;

    tdClassificacao.appendChild(selo);
    linha.appendChild(tdClassificacao);

    // COLUNA DE EXCLUSÃO
    const tdAcao = document.createElement("td");

    const botaoExcluir = document.createElement("button");

    botaoExcluir.textContent = "Excluir";
    botaoExcluir.classList.add("excluir");

    botaoExcluir.addEventListener("click", function() {
        excluirPessoa(pessoa.id);
    });

    tdAcao.appendChild(botaoExcluir);
    linha.appendChild(tdAcao);

    return linha;
}

// RENDERIZAR TABELA
function render() {

    corpoTabela.innerHTML = "";

    pessoas.forEach(pessoa => {
        const linha = criarLinha(pessoa);
        corpoTabela.appendChild(linha);
    });

    contador.textContent =
        "Total de pessoas: " + pessoas.length;
}

// EXCLUIR PESSOA
function excluirPessoa(id) {

    pessoas = pessoas.filter(pessoa => pessoa.id !== id);

    salvar();
    render();
}

// EVENTO DE ENVIO DO FORMULÁRIO
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

// INICIALIZAÇÃO DO SISTEMA
ajustarContador();
render();
