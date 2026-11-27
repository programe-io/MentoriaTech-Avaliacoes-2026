
/* ==========================================================
   Calculadora de IMC
   ========================================================== */

// ---------- Elementos do HTML ----------

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

// ---------- Estado da aplicação ----------

let pessoas = carregarPessoas();
let idEmEdicao = null;

// ---------- Armazenamento ----------

function carregarPessoas() {
    try {
        const dados = localStorage.getItem("calculadora-imc");

        if (!dados) return [];

        const lista = JSON.parse(dados);

        return Array.isArray(lista) ? lista : [];
    } catch {
        return [];
    }
}

function salvarPessoas() {
    try {
        localStorage.setItem(
            "calculadora-imc",
            JSON.stringify(pessoas)
        );
    } catch {
        mostrarErro("Não foi possível salvar os dados no navegador.");
    }
}

// ---------- Cálculo do IMC ----------

function calcularIMC(peso, altura) {
    return peso / (altura * altura);
}

// ---------- Classificação ----------

function classificarIMC(imc, idade) {
    // Crianças e adolescentes precisam de avaliação
    // por idade e sexo, utilizando curvas de crescimento.

    if (idade < 18) {
        return {
            nome: "Avaliação por idade",
            classe: ""
        };
    }

    if (imc < 18.5) {
        return {
            nome: "Abaixo do peso",
            classe: "abaixo"
        };
    }

    if (imc < 25) {
        return {
            nome: "Peso normal",
            classe: "normal"
        };
    }

    if (imc < 30) {
        return {
            nome: "Sobrepeso",
            classe: "sobrepeso"
        };
    }

    return {
        nome: "Obesidade",
        classe: "obesidade"
    };
}

// ---------- Mensagens de erro ----------

function mostrarErro(mensagem) {
    erro.textContent = mensagem;
    erro.hidden = false;
}

function limparErro() {
    erro.textContent = "";
    erro.hidden = true;

    document.querySelectorAll("input").forEach(input => {
        input.classList.remove("invalido");
    });
}

function marcarInvalido(campo) {
    campo.classList.add("invalido");
}

// ---------- Validação ----------

function validarDados(nome, idade, altura, peso) {
    limparErro();

    if (!nome) {
        mostrarErro("Informe o nome da pessoa.");
        marcarInvalido(inputNome);
        inputNome.focus();
        return false;
    }

    if (nome.length > 50) {
        mostrarErro("O nome deve ter no máximo 50 caracteres.");
        marcarInvalido(inputNome);
        inputNome.focus();
        return false;
    }

    if (!Number.isInteger(idade) || idade < 1 || idade > 120) {
        mostrarErro("Informe uma idade entre 1 e 120 anos.");
        marcarInvalido(inputIdade);
        inputIdade.focus();
        return false;
    }

    if (!Number.isFinite(altura) || altura < 0.5 || altura > 2.5) {
        mostrarErro("Informe uma altura entre 0,50 m e 2,50 m.");
        marcarInvalido(inputAltura);
        inputAltura.focus();
        return false;
    }

    if (!Number.isFinite(peso) || peso < 2 || peso > 500) {
        mostrarErro("Informe um peso entre 2 kg e 500 kg.");
        marcarInvalido(inputPeso);
        inputPeso.focus();
        return false;
    }

    return true;
}

// ---------- Cadastro e edição ----------

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const nome = inputNome.value.trim();
    const idade = Number(inputIdade.value);
    const altura = Number(inputAltura.value);
    const peso = Number(inputPeso.value);

    if (!validarDados(nome, idade, altura, peso)) {
        return;
    }

    const imc = calcularIMC(peso, altura);

    const pessoa = {
        id: idEmEdicao ?? Date.now(),
        nome,
        idade,
        altura,
        peso,
        imc
    };

    if (idEmEdicao !== null) {
        const indice = pessoas.findIndex(
            pessoa => pessoa.id === idEmEdicao
        );

        if (indice !== -1) {
            pessoas[indice] = pessoa;
        }
    } else {
        pessoas.push(pessoa);
    }

    salvarPessoas();
    renderizarTabela();
    cancelarEdicao();
});

// ---------- Renderização da tabela ----------

function renderizarTabela() {
    tabela.replaceChildren();

    if (pessoas.length === 0) {
        const linha = document.createElement("tr");
        const celula = document.createElement("td");

        celula.colSpan = 7;
        celula.className = "vazio";
        celula.textContent = "Nenhuma pessoa cadastrada.";

        linha.appendChild(celula);
        tabela.appendChild(linha);

        return;
    }

    pessoas.forEach(pessoa => {
        const linha = document.createElement("tr");

        if (pessoa.id === idEmEdicao) {
            linha.classList.add("em-edicao");
        }

        const classificacao = classificarIMC(
            pessoa.imc,
            pessoa.idade
        );

        adicionarCelula(linha, pessoa.nome);
        adicionarCelula(linha, `${pessoa.idade} anos`);
        adicionarCelula(linha, `${pessoa.altura.toFixed(2)} m`);
        adicionarCelula(linha, `${pessoa.peso.toFixed(1)} kg`);
        adicionarCelula(linha, pessoa.imc.toFixed(2));

        // Selo da classificação

        const celulaClassificacao = document.createElement("td");
        const selo = document.createElement("span");

        selo.className = "selo";

        if (classificacao.classe) {
            selo.classList.add(classificacao.classe);
        }

        selo.textContent = classificacao.nome;

        celulaClassificacao.appendChild(selo);
        linha.appendChild(celulaClassificacao);

        // Botões de ação

        const celulaAcoes = document.createElement("td");
        celulaAcoes.className = "acoes";

        const btnEditar = document.createElement("button");
        btnEditar.type = "button";
        btnEditar.textContent = "Editar";
        btnEditar.addEventListener("click", () => {
            editarPessoa(pessoa.id);
        });

        const btnRemover = document.createElement("button");
        btnRemover.type = "button";
        btnRemover.textContent = "Excluir";
        btnRemover.classList.add("remover");

        btnRemover.addEventListener("click", () => {
            removerPessoa(pessoa.id);
        });

        celulaAcoes.append(btnEditar, btnRemover);
        linha.appendChild(celulaAcoes);

        tabela.appendChild(linha);
    });
}

// ---------- Criar células ----------

function adicionarCelula(linha, valor) {
    const celula = document.createElement("td");
    celula.textContent = valor;
    linha.appendChild(celula);
}

// ---------- Editar pessoa ----------

function editarPessoa(id) {
    const pessoa = pessoas.find(pessoa => pessoa.id === id);

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

// ---------- Excluir pessoa ----------

function removerPessoa(id) {
    const pessoa = pessoas.find(pessoa => pessoa.id === id);

    if (!pessoa) return;

    const confirmar = confirm(
        `Deseja realmente excluir ${pessoa.nome}?`
    );

    if (!confirmar) return;

    pessoas = pessoas.filter(pessoa => pessoa.id !== id);

    if (idEmEdicao === id) {
        cancelarEdicao();
    }

    salvarPessoas();
    renderizarTabela();
}

// ---------- Cancelar edição ----------

function cancelarEdicao() {
    idEmEdicao = null;

    form.reset();
    limparErro();

    tituloForm.textContent = "Nova pessoa";
    btnSalvar.textContent = "Salvar";
    btnCancelar.hidden = true;

    renderizarTabela();
}

btnCancelar.addEventListener("click", cancelarEdicao);

// ---------- Inicialização ----------

renderizarTabela();
