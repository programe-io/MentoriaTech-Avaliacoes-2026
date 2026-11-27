
const chavePessoas = "pessoas";

let pessoas = [];
let proximoId = 1;

// Referências do HTML
const formPessoa = document.getElementById("formPessoa");
const inputNome = document.getElementById("nome");
const inputIdade = document.getElementById("idade");
const inputAltura = document.getElementById("altura");
const inputPeso = document.getElementById("peso");
const mensagemDeErro = document.getElementById("erro");
const corpoTabela = document.getElementById("corpoTabela");

// Formata números
function formatar(valor, casas) {
    return Number(valor).toFixed(casas);
}

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

    return {
        texto: "Obesidade",
        classe: "obesidade"
    };
}

// Lê os dados do formulário
function lerFormulario() {
    return {
        nome: inputNome.value.trim(),
        idade: Number(inputIdade.value),
        altura: Number(inputAltura.value),
        peso: Number(inputPeso.value)
    };
}

// Valida os dados
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
        return "A altura deve estar entre 0,5 e 2,5 metros.";
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

// Mostra mensagem de erro
function mostrarErro(mensagem) {
    mensagemDeErro.textContent = mensagem;
    mensagemDeErro.hidden = false;
}

// Limpa mensagem de erro
function limparErro() {
    mensagemDeErro.textContent = "";
    mensagemDeErro.hidden = true;
}

// Adiciona uma pessoa
function adicionarPessoa(dados) {
    const pessoa = {
        id: proximoId,
        nome: dados.nome,
        idade: dados.idade,
        altura: dados.altura,
        peso: dados.peso
    };

    proximoId++;

    pessoas.push(pessoa);
}

// Salva os dados no localStorage
function salvar() {
    localStorage.setItem(
        chavePessoas,
        JSON.stringify(pessoas)
    );
}

// Carrega as pessoas salvas
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

        console.error("Os dados salvos não são uma lista.");
        return [];

    } catch (erro) {
        console.error("Erro ao carregar os dados:", erro);
        return [];
    }
}

// Ajusta o próximo código
function ajustarContadorCodigo() {
    let maior = 0;

    pessoas.forEach(pessoa => {
        if (
            Number.isInteger(pessoa.id) &&
            pessoa.id > maior
        ) {
            maior = pessoa.id;
        }
    });

    proximoId = maior + 1;
}

// Cria uma célula da tabela
function criarCelula(valor) {
    const td = document.createElement("td");
    td.textContent = valor;

    return td;
}

// Cria uma linha da tabela
function criarLinha(pessoa) {
    const tr = document.createElement("tr");

    const imc = calcularIMC(
        pessoa.peso,
        pessoa.altura
    );

    const classificacao = classificarIMC(imc);

    tr.appendChild(criarCelula(pessoa.id));
    tr.appendChild(criarCelula(pessoa.nome));
    tr.appendChild(criarCelula(pessoa.idade));
    tr.appendChild(criarCelula(formatar(pessoa.altura, 2) + " m"));
    tr.appendChild(criarCelula(formatar(pessoa.peso, 1) + " KG"));
    tr.appendChild(criarCelula(formatar(imc, 1)));

    // Coluna da classificação
    const tdClassificacao = document.createElement("td");

    const selo = document.createElement("span");
    selo.classList.add("selo", classificacao.classe);
    selo.textContent = classificacao.texto;

    tdClassificacao.appendChild(selo);
    tr.appendChild(tdClassificacao);

    // Botão de apagar
    const tdAcao = document.createElement("td");
    const botaoApagar = document.createElement("button");

    botaoApagar.textContent = "Apagar";
    botaoApagar.classList.add("btn-apagar");

    botaoApagar.addEventListener("click", function() {
        apagarPessoa(pessoa.id);
    });

    tdAcao.appendChild(botaoApagar);
    tr.appendChild(tdAcao);

    return tr;
}

// Renderiza a tabela
function render() {
    corpoTabela.innerHTML = "";

    pessoas.forEach(pessoa => {
        const linha = criarLinha(pessoa);
        corpoTabela.appendChild(linha);
    });
}

// Apaga uma pessoa
function apagarPessoa(id) {
    const confirmar = confirm(
        "Deseja realmente apagar este paciente?"
    );

    if (!confirmar) {
        return;
    }

    pessoas = pessoas.filter(
        pessoa => pessoa.id !== id
    );

    salvar();
    render();
}

// Evento de envio do formulário
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

    render();

    formPessoa.reset();

    inputNome.focus();
});

// Inicialização da aplicação
pessoas = carregarPessoas();

ajustarContadorCodigo();

render();
