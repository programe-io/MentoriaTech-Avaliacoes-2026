
let contadorCodigo = 0;

const CHAVE_PESSOAS = "pessoas";

let pessoas = [];

const tabelaPessoas = document.getElementById("tabela-pessoas");
const formPessoa = document.getElementById("form-pessoa");

const inputNome = document.getElementById("input-nome");
const inputIdade = document.getElementById("input-idade");
const inputAltura = document.getElementById("input-altura");
const inputPeso = document.getElementById("input-peso");

const mensagemErro = document.getElementById("erro");

// Gerar código
function gerarCodigo() {
    return ++contadorCodigo;
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

// Adicionar pessoa
function adicionarPessoa(dados) {

    pessoas.push({
        id: gerarCodigo(),
        nome: dados.nome,
        idade: dados.idade,
        altura: dados.altura,
        peso: dados.peso
    });

    salvarPessoas();
}

// Remover pessoa
function removerPessoa(id) {

    pessoas = pessoas.filter(pessoa => pessoa.id !== id);

    salvarPessoas();

    render();
}

// Evento do formulário
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

    formPessoa.reset();

    inputNome.focus();

    render();

});

// Criar célula
function criarCelula(texto) {

    const td = document.createElement("td");

    td.textContent = texto;

    return td;
}

// Criar linha da tabela
function criarLinha(pessoa) {

    const imc = calcularImc(pessoa.peso, pessoa.altura);

    const classificacao = classificarImc(imc);

    const tr = document.createElement("tr");

    tr.dataset.id = pessoa.id;

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

    const btnApagar = document.createElement("button");

    btnApagar.type = "button";

    btnApagar.textContent = "Excluir";

    btnApagar.addEventListener("click", function() {

        removerPessoa(pessoa.id);

    });

    tdAcoes.appendChild(btnApagar);

    tr.appendChild(tdAcoes);

    return tr;
}

// Validar dados
function validarDados(dados) {

    if (dados.nome.length < 2) {
        return "Informe o nome com pelo menos 2 letras.";
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

// Mostrar erro
function mostrarErro(mensagem) {

    mensagemErro.textContent = mensagem;

    mensagemErro.hidden = false;
}

// Limpar erro
function limparErro() {

    mensagemErro.textContent = "";

    mensagemErro.hidden = true;
}

/* FUNÇÕES DE NEGÓCIO */

// Calcular IMC
function calcularImc(peso, altura) {

    return peso / (altura * altura);

}

// Classificar IMC
function classificarImc(imc) {

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

// Formatar números
function formatar(valor, casas) {

    return valor.toLocaleString("pt-BR", {

        minimumFractionDigits: casas,

        maximumFractionDigits: casas

    });

}

/* LOCAL STORAGE */

// Salvar pessoas
function salvarPessoas() {

    localStorage.setItem(
        CHAVE_PESSOAS,
        JSON.stringify(pessoas)
    );

}

// Carregar pessoas
function carregarPessoas() {

    const texto = localStorage.getItem(CHAVE_PESSOAS);

    if (texto === null) {
        return [];
    }

    try {

        const dados = JSON.parse(texto);

        if (!Array.isArray(dados)) {
            return [];
        }

        return dados.filter(pessoa =>
            pessoa &&
            Number.isSafeInteger(pessoa.id) &&
            typeof pessoa.nome === "string" &&
            Number.isInteger(pessoa.idade) &&
            Number.isFinite(pessoa.altura) &&
            Number.isFinite(pessoa.peso) &&
            pessoa.idade >= 1 &&
            pessoa.idade <= 120 &&
            pessoa.altura >= 0.5 &&
            pessoa.altura <= 2.5 &&
            pessoa.peso >= 2 &&
            pessoa.peso <= 500
        );

    } catch (erro) {

        console.log("Erro ao carregar pessoas:", erro);

        return [];

    }

}

// Ajustar contador
function ajustarContadorCodigo() {

    let maior = 0;

    pessoas.forEach(pessoa => {

        if (pessoa.id > maior) {
            maior = pessoa.id;
        }

    });

    contadorCodigo = maior;

}

/* RENDERIZAÇÃO */

// Atualizar tabela
function render() {

    tabelaPessoas.innerHTML = "";

    if (pessoas.length === 0) {

        const tr = document.createElement("tr");

        const td = document.createElement("td");

        td.colSpan = 7;

        td.textContent = "Nenhuma pessoa cadastrada ainda.";

        tr.appendChild(td);

        tabelaPessoas.appendChild(tr);

        return;
    }

    pessoas.forEach(pessoa => {

        tabelaPessoas.appendChild(criarLinha(pessoa));

    });

}

/* INICIALIZAÇÃO */

pessoas = carregarPessoas();

ajustarContadorCodigo();

render();
