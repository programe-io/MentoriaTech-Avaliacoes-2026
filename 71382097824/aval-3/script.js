
const formPessoa = document.getElementById("formPessoa");
const inputNome = document.getElementById("nome");
const inputIdade = document.getElementById("idade");
const inputAltura = document.getElementById("altura");
const inputPeso = document.getElementById("peso");
const tabela = document.getElementById("tabela");
const mensagemDeErro = document.getElementById("erro");

const chavePessoas = "pessoas";

let pessoas = carregarPessoas();
let proximoId = ajustarContador();

// Calcular IMC
function calcularIMC(peso, altura) {
    return peso / (altura * altura);
}

// Classificar IMC
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

// Formatar números
function formatar(valor, casas) {
    return Number(valor).toFixed(casas);
}

// Ler formulário
function lerFormulario() {
    return {
        nome: inputNome.value.trim(),
        idade: Number(inputIdade.value),
        altura: Number(inputAltura.value),
        peso: Number(inputPeso.value)
    };
}

// Validar dados
function validarDados(dados) {
    if (dados.nome.length < 2) {
        return "Informe um nome com no mínimo duas letras.";
    }

    if (!Number.isInteger(dados.idade) ||
        dados.idade < 1 || dados.idade > 120) {
        return "A idade deve estar entre 1 e 120.";
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

// Mostrar erro
function mostrarErro(mensagem) {
    mensagemDeErro.textContent = mensagem;
    mensagemDeErro.hidden = false;
}

// Limpar erro
function limparErro() {
    mensagemDeErro.hidden = true;
    mensagemDeErro.textContent = "";
}

// Adicionar pessoa
function adicionarPessoa(dados) {
    proximoId++;

    pessoas.push({
        id: proximoId,
        nome: dados.nome,
        idade: dados.idade,
        altura: dados.altura,
        peso: dados.peso
    });
}

// Criar linha da tabela
function criarLinha(pessoa) {
    const tr = document.createElement("tr");

    const imc = calcularIMC(pessoa.peso, pessoa.altura);
    const classificacao = classificarIMC(imc);

    const valores = [
        pessoa.nome,
        pessoa.idade,
        formatar(pessoa.altura, 2) + " m",
        formatar(pessoa.peso, 1) + " kg",
        formatar(imc, 1)
    ];

    valores.forEach(valor => {
        const td = document.createElement("td");
        td.textContent = valor;
        tr.appendChild(td);
    });

    const tdClassificacao = document.createElement("td");

    const selo = document.createElement("span");
    selo.classList.add("selo", classificacao.classe);
    selo.textContent = classificacao.texto;

    tdClassificacao.appendChild(selo);
    tr.appendChild(tdClassificacao);

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

// Renderizar tabela
function render() {
    tabela.innerHTML = "";

    pessoas.forEach(pessoa => {
        tabela.appendChild(criarLinha(pessoa));
    });
}

// Salvar no localStorage
function salvar() {
    localStorage.setItem(
        chavePessoas,
        JSON.stringify(pessoas)
    );
}

// Carregar pessoas salvas
function carregarPessoas() {
    const dados = localStorage.getItem(chavePessoas);

    if (!dados) {
        return [];
    }

    try {
        const pessoasSalvas = JSON.parse(dados);

        return Array.isArray(pessoasSalvas)
            ? pessoasSalvas
            : [];

    } catch (erro) {
        console.error("Erro ao carregar pacientes:", erro);
        return [];
    }
}

// Ajustar contador
function ajustarContador() {
    let maior = 0;

    pessoas.forEach(pessoa => {
        if (pessoa.id > maior) {
            maior = pessoa.id;
        }
    });

    return maior;
}

// Excluir pessoa
function excluirPessoa(id) {
    pessoas = pessoas.filter(pessoa => pessoa.id !== id);

    salvar();
    render();
}

// Enviar formulário
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

// Exibição inicial
render();
