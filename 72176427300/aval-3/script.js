/* ==========================================================
   Calculadora de IMC
   ========================================================== */

// ---------- Elementos do DOM ----------

const form = document.getElementById("form-pessoa");

const inputNome = document.getElementById("input-nome");
const inputIdade = document.getElementById("input-idade");
const inputAltura = document.getElementById("input-altura");
const inputPeso = document.getElementById("input-peso");

const tituloForm = document.getElementById("titulo-form");
const btnSalvar = document.getElementById("btn-salvar");
const btnCancelar = document.getElementById("btn-cancelar");

const mensagemErro = document.getElementById("erro");
const tabelaPessoas = document.getElementById("tabela-pessoas");

// ---------- Estado da aplicação ----------

let pessoas = [];
let proximoId = 1;
let idEmEdicao = null;

// ---------- Formatação ----------

const formatador = new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
});

const formatarNumero = (valor) => formatador.format(valor);

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

// ---------- Mensagens de erro ----------

function mostrarErro(mensagem) {
    mensagemErro.textContent = mensagem;
    mensagemErro.hidden = false;
}

function limparErro() {
    mensagemErro.textContent = "";
    mensagemErro.hidden = true;

    [
        inputNome,
        inputIdade,
        inputAltura,
        inputPeso
    ].forEach(campo => {
        campo.classList.remove("invalido");
        campo.removeAttribute("aria-invalid");
    });
}

// ---------- Validação dos campos ----------

function validarFormulario() {
    limparErro();

    const nome = inputNome.value.trim();
    const idade = Number(inputIdade.value);
    const altura = Number(inputAltura.value);
    const peso = Number(inputPeso.value);

    let campoInvalido = null;

    if (!nome) {
        campoInvalido = inputNome;
        mostrarErro("Informe o nome da pessoa.");
    } else if (nome.length > 50) {
        campoInvalido = inputNome;
        mostrarErro("O nome deve ter no máximo 50 caracteres.");
    } else if (
        inputIdade.value.trim() === "" ||
        !Number.isInteger(idade) ||
        idade < 1 ||
        idade > 120
    ) {
        campoInvalido = inputIdade;
        mostrarErro("Informe uma idade entre 1 e 120 anos.");
    } else if (
        inputAltura.value.trim() === "" ||
        !Number.isFinite(altura) ||
        altura < 0.5 ||
        altura > 2.5
    ) {
        campoInvalido = inputAltura;
        mostrarErro("Informe uma altura entre 0,50 m e 2,50 m.");
    } else if (
        inputPeso.value.trim() === "" ||
        !Number.isFinite(peso) ||
        peso < 2 ||
        peso > 500
    ) {
        campoInvalido = inputPeso;
        mostrarErro("Informe um peso entre 2 e 500 kg.");
    }

    if (campoInvalido) {
        campoInvalido.classList.add("invalido");
        campoInvalido.setAttribute("aria-invalid", "true");
        campoInvalido.focus();
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
    limparFormulario();
}

// ---------- Edição de pessoas ----------

function editarPessoa(id) {
    const pessoa = pessoas.find(p => p.id === id);

    if (!pessoa) return;

    idEmEdicao = id;

    inputNome.value = pessoa.nome;
    inputIdade.value = pessoa.idade;
    inputAltura.value = pessoa.altura;
    inputPeso.value = pessoa.peso;

    tituloForm.textContent = "Editar pessoa";
    btnSalvar.textContent = "Atualizar";
    btnCancelar.hidden = false;

    limparErro();

    renderizarTabela();

    inputNome.focus();
}

// ---------- Atualização de pessoas ----------

function atualizarPessoa(dados) {
    const indice = pessoas.findIndex(
        pessoa => pessoa.id === idEmEdicao
    );

    if (indice === -1) return;

    pessoas[indice] = {
        ...pessoas[indice],
        ...dados
    };

    renderizarTabela();
    limparFormulario();
}

// ---------- Exclusão de pessoas ----------

function removerPessoa(id) {
    const pessoa = pessoas.find(p => p.id === id);

    if (!pessoa) return;

    const confirmar = confirm(
        `Deseja realmente excluir ${pessoa.nome}?`
    );

    if (!confirmar) return;

    pessoas = pessoas.filter(p => p.id !== id);

    if (idEmEdicao === id) {
        limparFormulario();
    }

    renderizarTabela();
}

// ---------- Limpeza do formulário ----------

function limparFormulario() {
    form.reset();

    idEmEdicao = null;

    tituloForm.textContent = "Nova pessoa";
    btnSalvar.textContent = "Salvar";
    btnCancelar.hidden = true;

    limparErro();
}

// ---------- Renderização da tabela ----------

function renderizarTabela() {
    tabelaPessoas.replaceChildren();

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
        const linha = document.createElement("tr");

        // Destaca a pessoa que está sendo editada.
        if (pessoa.id === idEmEdicao) {
            linha.classList.add("em-edicao");
        }

        const imc = calcularIMC(
            pessoa.peso,
            pessoa.altura
        );

        const classificacao = classificarIMC(imc);

        // Dados da pessoa.
        const valores = [
            pessoa.nome,
            pessoa.idade,
            `${formatarNumero(pessoa.altura)} m`,
            `${formatarNumero(pessoa.peso)} kg`,
            formatarNumero(imc)
        ];

        valores.forEach(valor => {
            const celula = document.createElement("td");
            celula.textContent = valor;
            linha.appendChild(celula);
        });

        // Classificação do IMC.
        const celulaClassificacao = document.createElement("td");

        const selo = document.createElement("span");

        selo.className = `selo ${classificacao.classe}`;
        selo.textContent = classificacao.texto;

        celulaClassificacao.appendChild(selo);
        linha.appendChild(celulaClassificacao);

        // Botões de ação.
        const celulaAcoes = document.createElement("td");

        celulaAcoes.className = "acoes";

        const btnEditar = document.createElement("button");

        btnEditar.type = "button";
        btnEditar.textContent = "Editar";
        btnEditar.setAttribute(
            "aria-label",
            `Editar ${pessoa.nome}`
        );

        btnEditar.addEventListener("click", () => {
            editarPessoa(pessoa.id);
        });

        const btnRemover = document.createElement("button");

        btnRemover.type = "button";
        btnRemover.textContent = "Excluir";
        btnRemover.className = "remover";

        btnRemover.setAttribute(
            "aria-label",
            `Excluir ${pessoa.nome}`
        );

        btnRemover.addEventListener("click", () => {
            removerPessoa(pessoa.id);
        });

        celulaAcoes.appendChild(btnEditar);
        celulaAcoes.appendChild(btnRemover);

        linha.appendChild(celulaAcoes);

        tabelaPessoas.appendChild(linha);
    });
}

// ---------- Evento de envio do formulário ----------

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const dados = validarFormulario();

    if (!dados) return;

    if (idEmEdicao !== null) {
        atualizarPessoa(dados);
    } else {
        cadastrarPessoa(dados);
    }
});

// ---------- Evento de cancelamento ----------

btnCancelar.addEventListener("click", function() {
    limparFormulario();
    renderizarTabela();
});

// ---------- Limpeza automática dos erros ----------

[
    inputNome,
    inputIdade,
    inputAltura,
    inputPeso
].forEach(campo => {
    campo.addEventListener("input", function() {
        campo.classList.remove("invalido");
        campo.removeAttribute("aria-invalid");

        limparErro();
    });
});

// ---------- Inicialização ----------

renderizarTabela();
