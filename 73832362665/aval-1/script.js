let pessoas = [];
let contadorId = 0;
let idEditando = null;

const CHAVE_PESSOAS = "pessoas";

/* Elementos do HTML */
const formPessoa = document.getElementById("form-pessoa");
const inputNome = document.getElementById("input-nome");
const inputIdade = document.getElementById("input-idade");
const inputAltura = document.getElementById("input-altura");
const inputPeso = document.getElementById("input-peso");

const btnSalvar = document.getElementById("btn-salvar");
const btnCancelar = document.getElementById("btn-cancelar");

const tabelaPessoas = document.getElementById("tabela-pessoas");
const erro = document.getElementById("erro");
const tituloForm = document.getElementById("titulo-form");

/* Gerar ID */
function gerarId() {
    return ++contadorId;
}

/* Carregar dados */
function carregarPessoas() {
    const dados = localStorage.getItem(CHAVE_PESSOAS);

    if (dados) {
        pessoas = JSON.parse(dados);

        contadorId = Math.max(
            0,
            ...pessoas.map(pessoa => pessoa.id)
        );
    }
}

/* Salvar dados */
function salvarPessoas() {
    localStorage.setItem(
        CHAVE_PESSOAS,
        JSON.stringify(pessoas)
    );
}

/* Calcular IMC */
function calcularIMC(peso, altura) {
    return peso / (altura * altura);
}

/* Classificar IMC */
function classificarIMC(imc) {
    if (imc < 18.5) {
        return "Abaixo do peso";
    }

    if (imc < 25) {
        return "Peso normal";
    }

    if (imc < 30) {
        return "Sobrepeso";
    }

    if (imc < 35) {
        return "Obesidade grau I";
    }

    if (imc < 40) {
        return "Obesidade grau II";
    }

    return "Obesidade grau III";
}

/* Mostrar erro */
function mostrarErro(mensagem) {
    erro.textContent = mensagem;
    erro.hidden = false;
}

/* Limpar erro */
function limparErro() {
    erro.textContent = "";
    erro.hidden = true;
}

/* Limpar formulário */
function limparFormulario() {
    formPessoa.reset();

    idEditando = null;

    tituloForm.textContent = "Nova pessoa";
    btnSalvar.textContent = "Salvar";
    btnCancelar.hidden = true;

    limparErro();
}

/* Validar formulário */
function validarFormulario() {
    const nome = inputNome.value.trim();
    const idade = Number(inputIdade.value);
    const altura = Number(inputAltura.value);
    const peso = Number(inputPeso.value);

    if (!nome) {
        mostrarErro("Digite o nome da pessoa.");
        return false;
    }

    if (!Number.isInteger(idade) || idade < 1 || idade > 120) {
        mostrarErro("Digite uma idade válida.");
        return false;
    }

    if (!Number.isFinite(altura) || altura < 0.5 || altura > 2.5) {
        mostrarErro("Digite uma altura válida.");
        return false;
    }

    if (!Number.isFinite(peso) || peso < 2 || peso > 500) {
        mostrarErro("Digite um peso válido.");
        return false;
    }

    limparErro();
    return true;
}

/* Renderizar tabela */
function renderizarTabela() {
    tabelaPessoas.innerHTML = "";

    pessoas.forEach(pessoa => {
        const tr = document.createElement("tr");

        const imc = calcularIMC(
            pessoa.peso,
            pessoa.altura
        );

        const classificacao = classificarIMC(imc);

        const valores = [
            pessoa.nome,
            pessoa.idade,
            pessoa.altura.toFixed(2) + " m",
            pessoa.peso.toFixed(1) + " kg",
            imc.toFixed(2),
            classificacao
        ];

        valores.forEach(valor => {
            const td = document.createElement("td");
            td.textContent = valor;
            tr.appendChild(td);
        });

        /* Coluna de ações */
        const tdAcoes = document.createElement("td");

        const btnEditar = document.createElement("button");
        btnEditar.textContent = "Editar";
        btnEditar.type = "button";

        btnEditar.addEventListener("click", () => {
            editarPessoa(pessoa.id);
        });

        const btnExcluir = document.createElement("button");
        btnExcluir.textContent = "Excluir";
        btnExcluir.type = "button";
        btnExcluir.classList.add("secundario");

        btnExcluir.addEventListener("click", () => {
            excluirPessoa(pessoa.id);
        });

        tdAcoes.appendChild(btnEditar);
        tdAcoes.appendChild(btnExcluir);

        tr.appendChild(tdAcoes);

        tabelaPessoas.appendChild(tr);
    });
}

/* Cadastrar ou atualizar pessoa */
formPessoa.addEventListener("submit", function(event) {
    event.preventDefault();

    if (!validarFormulario()) {
        return;
    }

    const pessoa = {
        nome: inputNome.value.trim(),
        idade: Number(inputIdade.value),
        altura: Number(inputAltura.value),
        peso: Number(inputPeso.value)
    };

    if (idEditando !== null) {
        const indice = pessoas.findIndex(
            pessoa => pessoa.id === idEditando
        );

        if (indice !== -1) {
            pessoas[indice] = {
                id: idEditando,
                ...pessoa
            };
        }
    } else {
        pessoas.push({
            id: gerarId(),
            ...pessoa
        });
    }

    salvarPessoas();
    renderizarTabela();
    limparFormulario();
});

/* Editar pessoa */
function editarPessoa(id) {
    const pessoa = pessoas.find(
        pessoa => pessoa.id === id
    );

    if (!pessoa) return;

    idEditando = id;

    inputNome.value = pessoa.nome;
    inputIdade.value = pessoa.idade;
    inputAltura.value = pessoa.altura;
    inputPeso.value = pessoa.peso;

    tituloForm.textContent = "Editar pessoa";
    btnSalvar.textContent = "Atualizar";
    btnCancelar.hidden = false;

    limparErro();
}

/* Excluir pessoa */
function excluirPessoa(id) {
    pessoas = pessoas.filter(
        pessoa => pessoa.id !== id
    );

    if (idEditando === id) {
        limparFormulario();
    }

    salvarPessoas();
    renderizarTabela();
}

/* Cancelar edição */
btnCancelar.addEventListener("click", () => {
    limparFormulario();
});

/* Inicialização */
carregarPessoas();
renderizarTabela();
