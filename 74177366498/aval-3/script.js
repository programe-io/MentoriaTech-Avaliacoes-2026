const form = document.getElementById("form-pessoa");

const inputNome = document.getElementById("input-nome");
const inputIdade = document.getElementById("input-idade");
const inputAltura = document.getElementById("input-altura");
const inputPeso = document.getElementById("input-peso");

const tabela = document.getElementById("tabela-pessoas");
const erro = document.getElementById("erro");

const tituloForm = document.getElementById("titulo-form");
const btnSalvar = document.getElementById("btn-salvar");
const btnCancelar = document.getElementById("btn-cancelar");

// Lista de pessoas cadastradas
let pessoas = [];

// Identifica se estamos editando alguém
let indiceEdicao = null;

// Calcula o IMC
function calcularIMC(peso, altura) {
    return peso / (altura * altura);
}

// Classifica o IMC
function classificarIMC(imc) {
    if (imc < 18.5) {
        return "Abaixo do peso";
    } else if (imc < 25) {
        return "Peso normal";
    } else if (imc < 30) {
        return "Sobrepeso";
    } else if (imc < 35) {
        return "Obesidade grau I";
    } else if (imc < 40) {
        return "Obesidade grau II";
    } else {
        return "Obesidade grau III";
    }
}

// Exibe mensagens de erro
function mostrarErro(mensagem) {
    erro.textContent = mensagem;
    erro.hidden = false;
}

// Limpa mensagens de erro
function limparErro() {
    erro.textContent = "";
    erro.hidden = true;
}

// Limpa o formulário
function limparFormulario() {
    form.reset();
    limparErro();
    indiceEdicao = null;

    tituloForm.textContent = "Nova pessoa";
    btnSalvar.textContent = "Salvar";
    btnCancelar.hidden = true;
}

// Renderiza a tabela
function renderizarTabela() {
    tabela.innerHTML = "";

    pessoas.forEach((pessoa, index) => {
        const imc = calcularIMC(pessoa.peso, pessoa.altura);
        const classificacao = classificarIMC(imc);

        const linha = document.createElement("tr");

        const valores = [
            pessoa.nome,
            pessoa.idade,
            pessoa.altura.toFixed(2),
            pessoa.peso.toFixed(1),
            imc.toFixed(2),
            classificacao
        ];

        valores.forEach(valor => {
            const td = document.createElement("td");
            td.textContent = valor;
            linha.appendChild(td);
        });

        // Coluna de ações
        const tdAcoes = document.createElement("td");

        const btnEditar = document.createElement("button");
        btnEditar.textContent = "Editar";
        btnEditar.type = "button";
        btnEditar.addEventListener("click", () => editarPessoa(index));

        const btnExcluir = document.createElement("button");
        btnExcluir.textContent = "Excluir";
        btnExcluir.type = "button";
        btnExcluir.classList.add("secundario");

        btnExcluir.addEventListener("click", () => excluirPessoa(index));

        tdAcoes.appendChild(btnEditar);
        tdAcoes.appendChild(btnExcluir);

        linha.appendChild(tdAcoes);
        tabela.appendChild(linha);
    });
}

// Valida os campos
function validarFormulario() {
    const nome = inputNome.value.trim();
    const idade = Number(inputIdade.value);
    const altura = Number(inputAltura.value);
    const peso = Number(inputPeso.value);

    if (!nome) {
        mostrarErro("Informe o nome da pessoa.");
        return false;
    }

    if (
        inputIdade.value === "" ||
        !Number.isInteger(idade) ||
        idade < 1 ||
        idade > 120
    ) {
        mostrarErro("Informe uma idade entre 1 e 120 anos.");
        return false;
    }

    if (
        inputAltura.value === "" ||
        !Number.isFinite(altura) ||
        altura < 0.5 ||
        altura > 2.5
    ) {
        mostrarErro("Informe uma altura entre 0,5 e 2,5 metros.");
        return false;
    }

    if (
        inputPeso.value === "" ||
        !Number.isFinite(peso) ||
        peso < 2 ||
        peso > 500
    ) {
        mostrarErro("Informe um peso entre 2 e 500 kg.");
        return false;
    }

    return true;
}

// Cadastrar ou atualizar pessoa
form.addEventListener("submit", function(event) {
    event.preventDefault();

    limparErro();

    if (!validarFormulario()) {
        return;
    }

    const pessoa = {
        nome: inputNome.value.trim(),
        idade: Number(inputIdade.value),
        altura: Number(inputAltura.value),
        peso: Number(inputPeso.value)
    };

    if (indiceEdicao === null) {
        pessoas.push(pessoa);
    } else {
        pessoas[indiceEdicao] = pessoa;
    }

    renderizarTabela();
    limparFormulario();
});

// Editar pessoa
function editarPessoa(index) {
    const pessoa = pessoas[index];

    inputNome.value = pessoa.nome;
    inputIdade.value = pessoa.idade;
    inputAltura.value = pessoa.altura;
    inputPeso.value = pessoa.peso;

    indiceEdicao = index;

    tituloForm.textContent = "Editar pessoa";
    btnSalvar.textContent = "Atualizar";
    btnCancelar.hidden = false;

    limparErro();

    inputNome.focus();
}

// Excluir pessoa
function excluirPessoa(index) {
    const confirmar = confirm(
        `Deseja realmente excluir ${pessoas[index].nome}?`
    );

    if (!confirmar) {
        return;
    }

    pessoas.splice(index, 1);

    // Cancela a edição se a pessoa editada for excluída
    if (indiceEdicao === index) {
        limparFormulario();
    } else if (indiceEdicao !== null && indiceEdicao > index) {
        indiceEdicao--;
    }

    renderizarTabela();
}

// Botão cancelar
btnCancelar.addEventListener("click", function() {
    limparFormulario();
});
