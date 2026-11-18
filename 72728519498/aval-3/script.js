
const chavePessoas = "pessoas";

let pessoas = [];
let codigoAtual = 0;

// 1. Calcular IMC
function calcularIMC(peso, altura) {
    return peso / (altura * altura);
}

// 2. Classificar IMC
function classificarIMC(imc) {

    if (imc < 18.5) {
        return {
            texto: "Abaixo do peso",
            classe: "sobrepeso"
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

// 3. Formatar números
function formatar(valor, casas) {
    return valor.toFixed(casas);
}

// 4. Criar linha da tabela
function criarLinha(pessoa) {

    const tr = document.createElement("tr");

    const imc = calcularIMC(pessoa.peso, pessoa.altura);

    const classificacao = classificarIMC(imc);

    tr.innerHTML = `
        <td>${pessoa.id}</td>
        <td>${pessoa.nome}</td>
        <td>${pessoa.idade}</td>
        <td>${formatar(pessoa.altura, 2)} m</td>
        <td>${formatar(pessoa.peso, 1)} KG</td>
        <td>${formatar(imc, 1)}</td>
    `;

    const tdClassificacao = document.createElement("td");

    const selo = document.createElement("span");

    selo.classList.add("selo", classificacao.classe);

    selo.textContent = classificacao.texto;

    tdClassificacao.appendChild(selo);

    tr.appendChild(tdClassificacao);

    const tdAcao = document.createElement("td");

    const botao = document.createElement("button");

    botao.textContent = "Apagar";

    botao.classList.add("apagar");

    botao.onclick = function() {
        apagarPessoa(pessoa.id);
    };

    tdAcao.appendChild(botao);

    tr.appendChild(tdAcao);

    return tr;
}

// 5. Renderizar tabela
function render() {

    const tabela = document.getElementById("listaPessoas");

    tabela.innerHTML = "";

    pessoas.forEach(function(pessoa) {

        tabela.appendChild(criarLinha(pessoa));

    });
}

// 6. Ler formulário
function lerFormulario() {

    return {
        nome: document.getElementById("nome").value.trim(),
        idade: Number(document.getElementById("idade").value),
        altura: Number(document.getElementById("altura").value),
        peso: Number(document.getElementById("peso").value)
    };
}

// 7. Validar dados
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
        return "A altura deve estar entre 0.5 e 2.5 metros.";
    }

    if (!Number.isFinite(dados.peso) ||
        dados.peso < 2 || dados.peso > 500) {
        return "O peso deve estar entre 2 e 500 KG.";
    }

    return "";
}

// 8. Mostrar erro
function mostrarErro(mensagem) {

    const mensagemDeErro = document.getElementById("erro");

    mensagemDeErro.textContent = mensagem;

    mensagemDeErro.hidden = false;

    mensagemDeErro.classList.add("erro");
}

// 9. Limpar erro
function limparErro() {

    const mensagemDeErro = document.getElementById("erro");

    mensagemDeErro.hidden = true;

    mensagemDeErro.textContent = "";
}

// 10. Adicionar pessoa
function adicionarPessoa(dados) {

    codigoAtual++;

    const novaPessoa = {
        id: codigoAtual,
        nome: dados.nome,
        idade: dados.idade,
        altura: dados.altura,
        peso: dados.peso
    };

    pessoas.push(novaPessoa);
}

// 11. Salvar no localStorage
function salvar() {

    localStorage.setItem(
        chavePessoas,
        JSON.stringify(pessoas)
    );
}

// 12. Carregar pessoas
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

        console.log("Erro ao carregar os dados:", erro);

        return [];
    }
}

// 13. Ajustar contador
function ajustarContador() {

    let maior = 0;

    pessoas.forEach(function(pessoa) {

        if (Number.isInteger(pessoa.id) && pessoa.id > maior) {
            maior = pessoa.id;
        }

    });

    codigoAtual = maior;
}

// 14. Apagar pessoa
function apagarPessoa(id) {

    pessoas = pessoas.filter(function(pessoa) {
        return pessoa.id !== id;
    });

    salvar();

    render();
}

// 15. Enviar formulário
const formPessoa = document.getElementById("formPessoa");

const inputNome = document.getElementById("nome");

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

    render();

    formPessoa.reset();

    inputNome.focus();

});

// 16. Carregamento inicial
pessoas = carregarPessoas();

ajustarContador();

render();
