* ==========================================================
   Calculadora de IMC
   ========================================================== */

// ---------- Elementos do HTML ----------

const form = document.getElementById("form-pessoa");
const tituloForm = document.getElementById("titulo-form");

const inputNome = document.getElementById("input-nome");
const inputIdade = document.getElementById("input-idade");
const inputAltura = document.getElementById("input-altura");
const inputPeso = document.getElementById("input-peso");

const btnSalvar = document.getElementById("btn-salvar");
const btnCancelar = document.getElementById("btn-cancelar");

const mensagemErro = document.getElementById("erro");
const tabelaPessoas = document.getElementById("tabela-pessoas");

// ---------- Dados da aplicação ----------

let pessoas = [];
let pessoaEditando = null;
let proximoId = 1;

// ---------- Cálculo do IMC ----------

function calcularIMC(peso, altura) {
    return peso / (altura * altura);
}

// ---------- Classificação do IMC ----------

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

// ---------- Exibição de erros ----------

function mostrarErro(mensagem) {
    mensagemErro.textContent = mensagem;
    mensagemErro.hidden = false;
}

function limparErro() {
    mensagemErro.textContent = "";
    mensagemErro.hidden = true;

    document.querySelectorAll("input").forEach(input => {
        input.classList.remove("invalido");
    });
}

// ---------- Validação dos campos ----------

function validarFormulario() {
    limparErro();

    const nome = inputNome.value.trim();
    const idade = Number(inputIdade.value);
    const altura = Number(inputAltura.value);
    const peso = Number(inputPeso.value);

    if (!nome) {
        mostrarErro("Informe o nome da pessoa.");
        inputNome.classList.add("invalido");
        inputNome.focus();
        return null;
    }

    if (
        !Number.isInteger(idade) ||
        idade < 1 ||
        idade > 120
    ) {
        mostrarErro("Informe uma idade válida entre 1 e 120 anos.");
        inputIdade.classList.add("invalido");
        inputIdade.focus();
        return null;
    }

    if (
        !Number.isFinite(altura) ||
        altura < 0.5 ||
        altura > 2.5
    ) {
        mostrarErro("Informe uma altura válida entre 0,50 m e 2,50 m.");
        inputAltura.classList.add("invalido");
        inputAltura.focus();
        return null;
    }

    if (
        !Number.isFinite(peso) ||
        peso < 2 ||
        peso > 500
    ) {
        mostrarErro("Informe um peso válido entre 2 e 500 kg.");
        inputPeso.classList.add("invalido");
        inputPeso.focus();
        return null;
    }

    return {
        nome,
        idade,
        altura,
        peso
    };
}

// ---------- Cadastro de pessoas ----------

function cadastrarPessoa(dados) {
    const pessoa = {
        id: proximoId++,
        ...dados
    };

    pessoas.push(pessoa);
    renderizarTabela();
}

// ---------- Editar pessoa ----------

function editarPessoa(id) {
    const pessoa = pessoas.find(p => p.id === id);

    if (!pessoa) return;

    pessoaEditando = id;

    inputNome.value = pessoa.nome;
    inputIdade.value = pessoa.idade;
    inputAltura.value = pessoa.altura;
    inputPeso.value = pessoa.peso;

    tituloForm.textContent = "Editar pessoa";
    btnSalvar.textContent = "Atualizar";
    btnCancelar.hidden = false;

    limparErro();

    inputNome.focus();

    renderizarTabela();
}

// ---------- Atualizar pessoa ----------

function atualizarPessoa(dados) {
    const indice = pessoas.findIndex(
        pessoa => pessoa.id === pessoaEditando
    );

    if (indice === -1) return;

    pessoas[indice] = {
        id: pessoaEditando,
        ...dados
    };

    cancelarEdicao();
    renderizarTabela();
}

// ---------- Excluir pessoa ----------

function excluirPessoa(id) {
    const pessoa = pessoas.find(p => p.id === id);

    if (!pessoa) return;

    const confirmar = confirm(
        `Deseja realmente excluir ${pessoa.nome}?`
    );

    if (!confirmar) return;

    pessoas = pessoas.filter(p => p.id !== id);

    if (pessoaEditando === id) {
        cancelarEdicao();
    }

    renderizarTabela();
}

// ---------- Cancelar edição ----------

function cancelarEdicao() {
    pessoaEditando = null;

    form.reset();

    tituloForm.textContent = "Nova pessoa";
    btnSalvar.textContent = "Salvar";
    btnCancelar.hidden = true;

    limparErro();
    renderizarTabela();
}

// ---------- Renderizar tabela ----------

function renderizarTabela() {
    tabelaPessoas.innerHTML = "";

    if (pessoas.length === 0) {
        const linha = document.createElement("tr");
        const celula = document.createElement("td");

        celula.colSpan = 7;
        celula.className = "vazio";
        celula.textContent = "Nenhuma pessoa cadastrada.";

        linha.appendChild(celula);
        tabelaPessoas.appendChild(linha);

        return;
    }

    pessoas.forEach(pessoa => {
        const imc = calcularIMC(
            pessoa.peso,
            pessoa.altura
        );

        const classificacao = classificarIMC(imc);

        const linha = document.createElement("tr");

        if (pessoa.id === pessoaEditando) {
            linha.classList.add("em-edicao");
        }

        // Nome
        adicionarCelula(linha, pessoa.nome);

        // Idade
        adicionarCelula(linha, pessoa.idade);

        // Altura
        adicionarCelula(
            linha,
            pessoa.altura.toFixed(2).replace(".", ",") + " m"
        );

        // Peso
        adicionarCelula(
            linha,
            pessoa.peso.toFixed(1).replace(".", ",") + " kg"
        );

        // IMC
        adicionarCelula(
            linha,
            imc.toFixed(2).replace(".", ",")
        );

        // Classificação
        const celulaClassificacao = document.createElement("td");
        const selo = document.createElement("span");

        selo.className = `selo ${classificacao.classe}`;
        selo.textContent = classificacao.texto;

        celulaClassificacao.appendChild(selo);
        linha.appendChild(celulaClassificacao);

        // Ações
        const celulaAcoes = document.createElement("td");
        celulaAcoes.className = "acoes";

        const botaoEditar = document.createElement("button");
        botaoEditar.type = "button";
        botaoEditar.textContent = "Editar";
        botaoEditar.addEventListener("click", () => {
            editarPessoa(pessoa.id);
        });

        const botaoExcluir = document.createElement("button");
        botaoExcluir.type = "button";
        botaoExcluir.textContent = "Excluir";
        botaoExcluir.className = "remover";

        botaoExcluir.addEventListener("click", () => {
            excluirPessoa(pessoa.id);
        });

        celulaAcoes.appendChild(botaoEditar);
        celulaAcoes.appendChild(botaoExcluir);

        linha.appendChild(celulaAcoes);

        tabelaPessoas.appendChild(linha);
    });
}

// ---------- Criar células com segurança ----------

function adicionarCelula(linha, valor) {
    const celula = document.createElement("td");

    celula.textContent = valor;

    linha.appendChild(celula);
}

// ---------- Evento de envio do formulário ----------

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const dados = validarFormulario();

    if (!dados) return;

    if (pessoaEditando !== null) {
        atualizarPessoa(dados);
    } else {
        cadastrarPessoa(dados);
    }

    form.reset();
    limparErro();
});

// ---------- Evento do botão cancelar ----------

btnCancelar.addEventListener("click", cancelarEdicao);

// ---------- Inicialização ----------

renderizarTabela();
