// Elementos do HTML
const formulario = document.getElementById("form-pessoa");
const inputNome = document.getElementById("input-nome");
const inputIdade = document.getElementById("input-idade");
const inputAltura = document.getElementById("input-altura");
const inputPeso = document.getElementById("input-peso");

const tabelaPessoas = document.getElementById("tabela-pessoas");
const tituloForm = document.getElementById("titulo-form");
const erro = document.getElementById("erro");

const btnSalvar = document.getElementById("btn-salvar");
const btnCancelar = document.getElementById("btn-cancelar");

// Lista de pessoas cadastradas
let pessoas = [];
let indiceEdicao = null;

// Calcular IMC
function calcularIMC(peso, altura) {
    return peso / (altura * altura);
}

// Classificar IMC
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

// Exibir mensagem de erro
function mostrarErro(mensagem) {
    erro.textContent = mensagem;
    erro.hidden = false;
}

// Limpar mensagem de erro
function limparErro() {
    erro.textContent = "";
    erro.hidden = true;
}

// Limpar formulário
function limparFormulario() {
    formulario.reset();
    limparErro();

    indiceEdicao = null;

    tituloForm.textContent = "Nova pessoa";
    btnSalvar.textContent = "Salvar";
    btnCancelar.hidden = true;
}

// Renderizar tabela
function renderizarTabela() {
    tabelaPessoas.innerHTML = "";

    if (pessoas.length === 0) {
        tabelaPessoas.innerHTML = `
            <tr>
                <td colspan="7">Nenhuma pessoa cadastrada.</td>
            </tr>
        `;
        return;
    }

    pessoas.forEach((pessoa, indice) => {
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
            const celula = document.createElement("td");
            celula.textContent = valor;
            linha.appendChild(celula);
        });

        const celulaAcoes = document.createElement("td");

        const btnEditar = document.createElement("button");
        btnEditar.textContent = "Editar";
        btnEditar.type = "button";
        btnEditar.addEventListener("click", () => editarPessoa(indice));

        const btnExcluir = document.createElement("button");
        btnExcluir.textContent = "Excluir";
        btnExcluir.type = "button";
        btnExcluir.classList.add("secundario");
        btnExcluir.addEventListener("click", () => excluirPessoa(indice));

        celulaAcoes.appendChild(btnEditar);
        celulaAcoes.appendChild(btnExcluir);

        linha.appendChild(celulaAcoes);

        tabelaPessoas.appendChild(linha);
    });
}

// Validar formulário
function validarDados(nome, idade, altura, peso) {
    if (!nome || nome.trim() === "") {
        mostrarErro("Informe o nome da pessoa.");
        return false;
    }

    if (nome.length > 50) {
        mostrarErro("O nome deve ter no máximo 50 caracteres.");
        return false;
    }

    if (!Number.isInteger(idade) || idade < 1 || idade > 120) {
        mostrarErro("Informe uma idade entre 1 e 120 anos.");
        return false;
    }

    if (!Number.isFinite(altura) || altura < 0.5 || altura > 2.5) {
        mostrarErro("Informe uma altura entre 0,50 e 2,50 metros.");
        return false;
    }

    if (!Number.isFinite(peso) || peso < 2 || peso > 500) {
        mostrarErro("Informe um peso entre 2 e 500 kg.");
        return false;
    }

    return true;
}

// Cadastrar ou atualizar pessoa
formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    limparErro();

    const nome = inputNome.value.trim();
    const idade = Number(inputIdade.value);
    const altura = Number(inputAltura.value);
    const peso = Number(inputPeso.value);

    if (
        inputIdade.value === "" ||
        inputAltura.value === "" ||
        inputPeso.value === ""
    ) {
        mostrarErro("Preencha todos os campos.");
        return;
    }

    if (!validarDados(nome, idade, altura, peso)) {
        return;
    }

    const pessoa = {
        nome,
        idade,
        altura,
        peso
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
function editarPessoa(indice) {
    const pessoa = pessoas[indice];

    inputNome.value = pessoa.nome;
    inputIdade.value = pessoa.idade;
    inputAltura.value = pessoa.altura;
    inputPeso.value = pessoa.peso;

    indiceEdicao = indice;

    tituloForm.textContent = "Editar pessoa";
    btnSalvar.textContent = "Atualizar";
    btnCancelar.hidden = false;

    limparErro();

    formulario.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}

// Excluir pessoa
function excluirPessoa(indice) {
    const confirmar = confirm(
        `Deseja realmente excluir ${pessoas[indice].nome}?`
    );

    if (!confirmar) {
        return;
    }

    pessoas.splice(indice, 1);

    if (indiceEdicao !== null) {
        if (indiceEdicao === indice) {
            limparFormulario();
        } else if (indiceEdicao > indice) {
            indiceEdicao--;
        }
    }

    renderizarTabela();
}

// Cancelar edição
btnCancelar.addEventListener("click", function() {
    limparFormulario();
});

// Inicializar tabela
renderizarTabela();
