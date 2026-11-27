
/* ==========================================================
   Calculadora de IMC
   ========================================================== */

/* ---------- Variáveis principais ---------- */

let contadorCodigo = 0;

const CHAVE_PESSOAS = "pessoas";

let pessoas = [];

/* ---------- Elementos HTML ---------- */

const tabelaPessoas = document.getElementById("tabela-pessoas");
const formPessoa = document.getElementById("form-pessoa");

const inputNome = document.getElementById("input-nome");
const inputIdade = document.getElementById("input-idade");
const inputAltura = document.getElementById("input-altura");
const inputPeso = document.getElementById("input-peso");

const mensagemErro = document.getElementById("erro");

/* ---------- Gerar código ---------- */

function gerarCodigo() {
    return ++contadorCodigo;
}

/* ---------- Ler formulário ---------- */

function lerFormulario() {
    return {
        nome: inputNome.value.trim(),
        idade: Number(inputIdade.value),
        altura: Number(inputAltura.value),
        peso: Number(inputPeso.value)
    };
}

/* ---------- Adicionar pessoa ---------- */

function adicionarPessoa(dados) {
    pessoas.push({
        id: gerarCodigo(),
        nome: dados.nome,
        idade: dados.idade,
        altura: dados.altura,
        peso: dados.peso
    });
}

/* ---------- Evento do formulário ---------- */

formPessoa.addEventListener("submit", (e) => {
    e.preventDefault();

    const dados = lerFormulario();
    const erro = validarDados(dados);

    if (erro !== "") {
        mostrarErro(erro);
        return;
    }

    limparErro();

    adicionarPessoa(dados);

    salvarPessoas();

    formPessoa.reset();

    inputNome.focus();

    render();
});

/* ---------- Criar célula ---------- */

function criarCelula(texto) {
    const td = document.createElement("td");

    td.textContent = texto;

    return td;
}

/* ---------- Criar linha da tabela ---------- */

function criarLinha(pessoa) {
    const imc = calcularImc(pessoa.peso, pessoa.altura);

    const classificacao = classificarImc(imc);

    const tr = document.createElement("tr");

    tr.dataset.id = pessoa.id;

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
        criarCelula(formatar(imc, 2))
    );

    // Classificação
    const tdClassificacao = document.createElement("td");

    const selo = document.createElement("span");

    selo.classList.add("selo", classificacao.classe);

    selo.textContent = classificacao.texto;

    tdClassificacao.appendChild(selo);

    tr.appendChild(tdClassificacao);

    // ---------- Coluna Ações ----------

    const tdAcoes = document.createElement("td");

    tdAcoes.classList.add("acoes");

    // Botão excluir
    const btnExcluir = document.createElement("button");

    btnExcluir.textContent = "Excluir";

    btnExcluir.classList.add("remover");

    btnExcluir.type = "button";

    btnExcluir.dataset.id = pessoa.id;

    tdAcoes.appendChild(btnExcluir);

    tr.appendChild(tdAcoes);

    return tr;
}

/* ---------- Validar dados ---------- */

function validarDados(dados) {
    if (dados.nome.length < 2) {
        return "Informe o nome (mínimo 2 letras).";
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

/* ---------- Mensagens de erro ---------- */

function mostrarErro(mensagem) {
    mensagemErro.textContent = mensagem;

    mensagemErro.hidden = false;
}

function limparErro() {
    mensagemErro.textContent = "";

    mensagemErro.hidden = true;
}

/* ==========================================================
   Funções de negócio
   ========================================================== */

/* ---------- Calcular IMC ---------- */

function calcularImc(peso, altura) {
    return peso / (altura * altura);
}

/* ---------- Classificar IMC ---------- */

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

/* ---------- Formatar números ---------- */

function formatar(valor, casas) {
    return valor.toLocaleString("pt-BR", {
        minimumFractionDigits: casas,
        maximumFractionDigits: casas
    });
}

/* ==========================================================
   LocalStorage
   ========================================================== */

/* ---------- Salvar pessoas ---------- */

function salvarPessoas() {
    localStorage.setItem(
        CHAVE_PESSOAS,
        JSON.stringify(pessoas)
    );
}

/* ---------- Carregar pessoas ---------- */

function carregarPessoas() {
    const texto = localStorage.getItem(CHAVE_PESSOAS);

    if (texto === null) {
        return [];
    }

    try {
        const dados = JSON.parse(texto);

        if (Array.isArray(dados)) {
            return dados;
        }
    } catch (erro) {
        console.log("Dados salvos inválidos:", erro);
    }

    return [];
}

/* ---------- Ajustar contador ---------- */

function ajustarContadorCodigo() {
    let maior = 0;

    pessoas.forEach((pessoa) => {
        if (pessoa.id > maior) {
            maior = pessoa.id;
        }
    });

    contadorCodigo = maior;
}

/* ==========================================================
   Excluir pessoa
   ========================================================== */

function excluirPessoa(id) {
    const confirmar = confirm(
        "Deseja realmente excluir esta pessoa?"
    );

    if (!confirmar) {
        return;
    }

    // Remove a pessoa pelo código
    pessoas = pessoas.filter((pessoa) => pessoa.id !== id);

    // Atualiza o LocalStorage
    salvarPessoas();

    // Atualiza a tabela
    render();
}

/* ---------- Evento dos botões da tabela ---------- */

tabelaPessoas.addEventListener("click", (e) => {
    const botao = e.target.closest("button.remover");

    if (!botao) {
        return;
    }

    const id = Number(botao.dataset.id);

    excluirPessoa(id);
});

/* ==========================================================
   Renderizar tabela
   ========================================================== */

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

    pessoas.forEach((pessoa) => {
        tabelaPessoas.appendChild(criarLinha(pessoa));
    });
}

/* ==========================================================
   Inicialização
   ========================================================== */

// Recupera os cadastros salvos
pessoas = carregarPessoas();

// Ajusta o contador de códigos
ajustarContadorCodigo();

// Exibe a tabela
render();
