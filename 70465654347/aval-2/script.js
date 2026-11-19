// Referências do DOM
const formPessoa = document.getElementById("formPessoa");
const inputNome = document.getElementById("nome");
const inputIdade = document.getElementById("idade");
const inputAltura = document.getElementById("altura");
const inputPeso = document.getElementById("peso");
const mensagemDeErro = document.getElementById("erro");
const tabelaPessoas = document.getElementById("tabelaPessoas");

// Armazenamento
const chavePessoas = "pessoas";
let pessoas = carregarPessoas();
let contador = ajustarContador();

// Calcula o IMC
function calcularIMC(peso, altura) {
    return peso / (altura * altura);
}

// Classifica o IMC
function classificarIMC(imc) {
    if (imc < 18.5) {
        return {
            texto: "Abaixo",
            classe: "abaixo"
        };
    }

    if (imc < 25) {
        return {
            texto: "Normal",
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

// Formata números
function formatar(valor, casas) {
    return valor.toFixed(casas);
}

// Cria uma linha da tabela
function criarLinha(pessoa) {
    const linha = document.createElement("tr");

    const imc = calcularIMC(pessoa.peso, pessoa.altura);
    const classificacao = classificarIMC(imc);

    const dados = [
        pessoa.id,
        pessoa.nome,
        pessoa.idade,
        formatar(pessoa.altura, 2) + " m",
        formatar(pessoa.peso, 1) + " KG",
        formatar(imc, 1)
    ];

    dados.forEach(valor => {
        const td = document.createElement("td");
        td.textContent = valor;
        linha.appendChild(td);
    });

    // Coluna de classificação
    const tdClassificacao = document.createElement("td");

    const selo = document.createElement("span");
    selo.classList.add("selo", classificacao.classe);
    selo.textContent = classificacao.texto;

    tdClassificacao.appendChild(selo);
    linha.appendChild(tdClassificacao);

    // Coluna de apagar
    const tdAcao = document.createElement("td");
    const botao = document.createElement("button");

    botao.textContent = "Apagar";
    botao.classList.add("botao-apagar");

    botao.addEventListener("click", function () {
        apagarPessoa(pessoa.id);
    });

    tdAcao.appendChild(botao);
    linha.appendChild(tdAcao);

    return linha;
}

// Renderiza a tabela
function render() {
    tabelaPessoas.innerHTML = "";

    pessoas.forEach(pessoa => {
        tabelaPessoas.appendChild(criarLinha(pessoa));
    });
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

// Mostra erro
function mostrarErro(mensagem) {
    mensagemDeErro.textContent = mensagem;
    mensagemDeErro.hidden = false;
}

// Limpa erro
function limparErro() {
    mensagemDeErro.textContent = "";
    mensagemDeErro.hidden = true;
}

// Adiciona pessoa
function adicionarPessoa(dados) {
    contador++;

    const pessoa = {
        id: contador,
        nome: dados.nome,
        idade: dados.idade,
        altura: dados.altura,
        peso: dados.peso
    };

    pessoas.push(pessoa);
}

// Salva os dados
function salvar() {
    localStorage.setItem(
        chavePessoas,
        JSON.stringify(pessoas)
    );
}

// Carrega os dados
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
        console.error("Erro ao carregar dados:", erro);
        return [];
    }
}

// Ajusta o contador de IDs
function ajustarContador() {
    let maior = 0;

    pessoas.forEach(pessoa => {
        if (pessoa.id > maior) {
            maior = pessoa.id;
        }
    });

    return maior;
}

// Apaga pessoa
function apagarPessoa(id) {
    pessoas = pessoas.filter(pessoa => pessoa.id !== id);

    salvar();
    render();
}

// Evento de envio do formulário
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
    render();

    formPessoa.reset();
    inputNome.focus();
});

// Inicialização
render();