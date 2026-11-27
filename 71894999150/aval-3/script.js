
/* ==========================================================
   Calculadora de IMC
   Funcionalidades:
   - Cadastro de pessoas
   - Cálculo automático do IMC
   - Classificação do IMC
   - Edição de cadastros
   - Exclusão de cadastros
   - Validação dos campos
   ========================================================== */

// ---------- Elementos do HTML ----------

const formulario = document.getElementById("form-pessoa");
const tituloForm = document.getElementById("titulo-form");

const inputNome = document.getElementById("input-nome");
const inputIdade = document.getElementById("input-idade");
const inputAltura = document.getElementById("input-altura");
const inputPeso = document.getElementById("input-peso");

const btnSalvar = document.getElementById("btn-salvar");
const btnCancelar = document.getElementById("btn-cancelar");

const tabelaPessoas = document.getElementById("tabela-pessoas");
const mensagemErro = document.getElementById("erro");

// ---------- Variáveis ----------

let pessoas = [];
let indiceEdicao = null;

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

// ---------- Validação dos dados ----------

function validarDados(nome, idade, altura, peso) {
    limparErros();

    if (!nome.trim()) {
        mostrarErro("Informe o nome da pessoa.");
        inputNome.focus();
        return false;
    }

    if (nome.trim().length > 50) {
        mostrarErro("O nome deve ter no máximo 50 caracteres.");
        inputNome.focus();
        return false;
    }

    if (!Number.isInteger(idade) || idade < 1 || idade > 120) {
        mostrarErro("Informe uma idade entre 1 e 120 anos.");
        inputIdade.focus();
        return false;
    }

    if (!Number.isFinite(altura) || altura < 0.5 || altura > 2.5) {
        mostrarErro("Informe uma altura entre 0,50 m e 2,50 m.");
        inputAltura.focus();
        return false;
    }

    if (!Number.isFinite(peso) || peso < 2 || peso > 500) {
        mostrarErro("Informe um peso entre 2 kg e 500 kg.");
        inputPeso.focus();
        return false;
    }

    return true;
}

// ---------- Mensagens de erro ----------

function mostrarErro(mensagem) {
    mensagemErro.textContent = mensagem;
    mensagemErro.hidden = false;
}

function limparErros() {
    mensagemErro.textContent = "";
    mensagemErro.hidden = true;

    document.querySelectorAll("input").forEach(input => {
        input.classList.remove("invalido");
    });
}

// ---------- Limpar formulário ----------

function limparFormulario() {
    formulario.reset();
    limparErros();

    indiceEdicao = null;

    tituloForm.textContent = "Nova pessoa";
    btnSalvar.textContent = "Salvar";
    btnCancelar.hidden = true;

    renderizarTabela();
}

// ---------- Renderização da tabela ----------

function renderizarTabela() {
    tabelaPessoas.innerHTML = "";

    if (pessoas.length === 0) {
        const linha = document.createElement("tr");
        const coluna = document.createElement("td");

        coluna.colSpan = 7;
        coluna.className = "vazio";
        coluna.textContent = "Nenhuma pessoa cadastrada.";

        linha.appendChild(coluna);
        tabelaPessoas.appendChild(linha);

        return;
    }

    pessoas.forEach((pessoa, indice) => {
        const linha = document.createElement("tr");

        if (indice === indiceEdicao) {
            linha.classList.add("em-edicao");
        }

        const imc = calcularIMC(pessoa.peso, pessoa.altura);
        const classificacao = classificarIMC(imc);

        // Nome
        adicionarCelula(linha, pessoa.nome);

        // Idade
        adicionarCelula(linha, pessoa.idade);

        // Altura
        adicionarCelula(linha, pessoa.altura.toFixed(2) + " m");

        // Peso
        adicionarCelula(linha, pessoa.peso.toFixed(1) + " kg");

        // IMC
        adicionarCelula(linha, imc.toFixed(2));

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

        const btnEditar = document.createElement("button");
        btnEditar.type = "button";
        btnEditar.textContent = "Editar";
        btnEditar.addEventListener("click", () => editarPessoa(indice));

        const btnRemover = document.createElement("button");
        btnRemover.type = "button";
        btnRemover.textContent = "Excluir";
        btnRemover.classList.add("remover");
        btnRemover.addEventListener("click", () => removerPessoa(indice));

        celulaAcoes.append(btnEditar, btnRemover);
        linha.appendChild(celulaAcoes);

        tabelaPessoas.appendChild(linha);
    });
}

// ---------- Criar células com segurança ----------

function adicionarCelula(linha, conteudo) {
    const celula = document.createElement("td");
    celula.textContent = conteudo;
    linha.appendChild(celula);
}

// ---------- Salvar pessoa ----------

formulario.addEventListener("submit", function(evento) {
    evento.preventDefault();

    const nome = inputNome.value.trim();
    const idade = Number(inputIdade.value);
    const altura = Number(inputAltura.value);
    const peso = Number(inputPeso.value);

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
        // Novo cadastro
        pessoas.push(pessoa);
    } else {
        // Atualização do cadastro
        pessoas[indiceEdicao] = pessoa;
    }

    limparFormulario();
});

// ---------- Editar pessoa ----------

function editarPessoa(indice) {
    const pessoa = pessoas[indice];

    if (!pessoa) return;

    indiceEdicao = indice;

    inputNome.value = pessoa.nome;
    inputIdade.value = pessoa.idade;
    inputAltura.value = pessoa.altura;
    inputPeso.value = pessoa.peso;

    tituloForm.textContent = "Editar pessoa";
    btnSalvar.textContent = "Atualizar";
    btnCancelar.hidden = false;

    limparErros();
    renderizarTabela();

    inputNome.focus();
}

// ---------- Excluir pessoa ----------

function removerPessoa(indice) {
    const pessoa = pessoas[indice];

    if (!pessoa) return;

    const confirmar = window.confirm(
        `Deseja realmente excluir o cadastro de ${pessoa.nome}?`
    );

    if (!confirmar) return;

    pessoas.splice(indice, 1);

    // Se a pessoa excluída estava sendo editada,
    // cancela a edição.
    if (indiceEdicao === indice) {
        limparFormulario();
        return;
    }

    // Ajusta o índice caso uma pessoa anterior
    // à que está sendo editada seja removida.
    if (indiceEdicao !== null && indice < indiceEdicao) {
        indiceEdicao--;
    }

    renderizarTabela();
}

// ---------- Cancelar edição ----------

btnCancelar.addEventListener("click", limparFormulario);

// ---------- Inicialização ----------

renderizarTabela();
