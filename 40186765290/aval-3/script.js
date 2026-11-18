// Referências do DOM
const formPessoa = document.getElementById("form-pessoa");
const inputNome = document.getElementById("nome");
const inputIdade = document.getElementById("idade");
const inputAltura = document.getElementById("altura");
const inputPeso = document.getElementById("peso");
const mensagemDeErro = document.getElementById("erro");
const tabelaPessoas = document.getElementById("tabela-pessoas");

const CHAVE_PESSOAS = "pessoas";
let pessoas = carregarPessoas();
let contadorId = 0;

 ajustarContadorCodigo();
 render();

// Função de cálculo do IMC
function calcularIMC(peso, altura) {
    return peso / (altura * altura);
}

// Função de classificação do IMC
function classificarIMC(imc) {
    if (imc < 18.5) {
        return { texto: "Abaixo do peso", classe: "baixo-peso" };
    } else if (imc < 25) {
        return { texto: "Peso normal", classe: "peso-normal" };
    } else if (imc < 30) {
        return { texto: "Sobrepeso", classe: "sobrepeso" };
    } else {
        return { texto: "Obesidade", classe: "obesidade" };
    }
}

// Função de formatação (padrão de casas decimais)
function formatar(valor, decimais) {
    return Number(valor).toFixed(decimais);
}

// Criar Linha da Tabela
function criarLinha(pessoa) {
    const tr = document.createElement("tr");

    // Cálculo e classificação
    const imc = calcularIMC(pessoa.peso, pessoa.altura);
    const classificacao = classificarIMC(imc);

    // Células de dados
    const tdId = document.createElement("td");
    tdId.textContent = pessoa.id;

    const tdNome = document.createElement("td");
    tdNome.textContent = pessoa.nome;

    const tdIdade = document.createElement("td");
    tdIdade.textContent = pessoa.idade;

    const tdAltura = document.createElement("td");
    tdAltura.textContent = `${formatar(pessoa.altura, 2)}m`;

    const tdPeso = document.createElement("td");
    tdPeso.textContent = `${formatar(pessoa.peso, 1)}KG`;

    const tdImc = document.createElement("td");
    tdImc.textContent = formatar(imc, 1);

    // Coluna de Classificação com Selo
    const tdClassificacao = document.createElement("td");
    const selo = document.createElement("span");
    selo.className = `selo ${classificacao.classe}`;
    selo.textContent = classificacao.texto;
    
    tdClassificacao.appendChild(selo);

    // Adicionando elementos à linha
    tr.appendChild(tdId);
    tr.appendChild(tdNome);
    tr.appendChild(tdIdade);
    tr.appendChild(tdAltura);
    tr.appendChild(tdPeso);
    tr.appendChild(tdImc);
    tr.appendChild(tdClassificacao);

    return tr;
}

// Renderização geral na tabela
function render() {
    tabelaPessoas.innerHTML = "";
    pessoas.forEach(pessoa => {
        const linha = criarLinha(pessoa);
        tabelaPessoas.appendChild(linha);
    });
}

// Captura dos dados do formulário
function lerFormulario() {
    return {
        nome: inputNome.value.trim(),
        idade: Number(inputIdade.value),
        altura: Number(inputAltura.value),
        peso: Number(inputPeso.value)
    };
}

// Adicionar pessoa ao array
function adicionarPessoa(dados) {
    contadorId++;
    const novaPessoa = {
        id: contadorId,
        nome: dados.nome,
        idade: dados.idade,
        altura: dados.altura,
        peso: dados.peso
    };
    pessoas.push(novaPessoa);
}

// Validação dos dados
function validarDados(dados) {
    if (dados.nome.length < 2) {
        return "Informe o nome com no mínimo de duas letras.";
    }
    if (!Number.isInteger(dados.idade) || dados.idade < 1 || dados.idade > 120) {
        return "A idade deve ser um número inteiro entre 1 e 120.";
    }
    if (dados.altura < 0.5 || dados.altura > 2.5) {
        return "A altura deve estar entre 0.5m e 2.5m.";
    }
    if (dados.peso < 2 || dados.peso > 500) {
        return "O peso deve estar entre 2kg e 500kg.";
    }
    return "";
}

// Funções de Erro
function mostrarErro(mensagem) {
    mensagemDeErro.textContent = mensagem;
    mensagemDeErro.hidden = false;
}

function limparErro() {
    mensagemDeErro.textContent = "";
    mensagemDeErro.hidden = true;
}

// Persistência com localStorage
function salvar() {
    localStorage.setItem(CHAVE_PESSOAS, JSON.stringify(pessoas));
}

function carregarPessoas() {
    const dadosSalvos = localStorage.getItem(CHAVE_PESSOAS);
    if (!dadosSalvos) return [];

    try {
        const lista = JSON.parse(dadosSalvos);
        if (Array.isArray(lista)) {
            return lista;
        }
        return [];
    } catch (e) {
        console.error("Erro ao carregar dados do localStorage", e);
        return [];
    }
}

// Ajuste do contador de código baseado nos IDs existentes
function ajustarContadorCodigo() {
    let maior = 0;
    pessoas.forEach(pessoa => {
        if (pessoa.id > maior) {
            maior = pessoa.id;
        }
    });
    contadorId = maior;
}

// Evento de envio do formulário (Submit)
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