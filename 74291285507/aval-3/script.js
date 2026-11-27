
/* ==========================================================
   CALCULADORA DE IMC - app.js
   ========================================================== */

// ---------- Elementos do HTML ----------

const formulario = document.getElementById("form-pessoa");
const inputNome = document.getElementById("input-nome");
const inputIdade = document.getElementById("input-idade");
const inputAltura = document.getElementById("input-altura");
const inputPeso = document.getElementById("input-peso");

const tabela = document.getElementById("tabela-pessoas");
const tituloForm = document.getElementById("titulo-form");
const btnSalvar = document.getElementById("btn-salvar");
const btnCancelar = document.getElementById("btn-cancelar");
const mensagemErro = document.getElementById("erro");

// ---------- Variáveis ----------

// Lista de pessoas cadastradas
let pessoas = [];

// Identifica a pessoa que está sendo editada
let idEmEdicao = null;

// ---------- Armazenamento ----------

// Recupera os dados salvos no navegador
try {
    pessoas = JSON.parse(
        localStorage.getItem("pessoasIMC")
    ) || [];
} catch {
    pessoas = [];
}

// Salva os dados no navegador
function salvarArmazenamento() {
    localStorage.setItem(
        "pessoasIMC",
        JSON.stringify(pessoas)
    );
}

// ---------- Cálculo do IMC ----------

function calcularIMC(peso, altura) {
    return peso / (altura * altura);
}

// ---------- Classificação do IMC ----------

function classificarIMC(imc, idade) {

    // Os limites adultos não devem ser aplicados
    // automaticamente a crianças e adolescentes.
    if (idade < 20) {
        return {
            texto: "Avaliação por idade",
            classe: ""
        };
    }

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

// ---------- Validação ----------

function validarDados(nome, idade, altura, peso) {

    if (!nome.trim()) {
        return "Informe o nome da pessoa.";
    }

    if (!Number.isInteger(idade) || idade < 1 || idade > 120) {
        return "Informe uma idade entre 1 e 120 anos.";
    }

    if (!Number.isFinite(altura) || altura < 0.5 || altura > 2.5) {
        return "Informe uma altura entre 0,50 m e 2,50 m.";
    }

    if (!Number.isFinite(peso) || peso < 2 || peso > 500) {
        return "Informe um peso entre 2 kg e 500 kg.";
    }

    return "";
}

// ---------- Mensagens ----------

function mostrarErro(mensagem) {
    mensagemErro.textContent = mensagem;
    mensagemErro.hidden = false;
}

function limparErro() {
    mensagemErro.textContent = "";
    mensagemErro.hidden = true;
}

// ---------- Limpar formulário ----------

function limparFormulario() {

    formulario.reset();

    idEmEdicao = null;

    tituloForm.textContent = "Nova pessoa";
    btnSalvar.textContent = "Salvar";

    btnCancelar.hidden = true;

    limparErro();

    document.querySelectorAll("input").forEach(input => {
        input.classList.remove("invalido");
    });
}

// ---------- Cadastro e edição ----------

formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    limparErro();

    const nome = inputNome.value.trim();
    const idade = Number(inputIdade.value);
    const altura = Number(inputAltura.value);
    const peso = Number(inputPeso.value);

    // Validação dos dados
    const erro = validarDados(nome, idade, altura, peso);

    if (erro) {
        mostrarErro(erro);
        return;
    }

    // Calcula o IMC
    const imc = calcularIMC(peso, altura);

    // Classifica o IMC
    const classificacao = classificarIMC(imc, idade);

    // Cria o objeto da pessoa
    const pessoa = {
        id: idEmEdicao ?? crypto.randomUUID(),
        nome: nome,
        idade: idade,
        altura: altura,
        peso: peso,
        imc: imc,
        classificacao: classificacao
    };

    if (idEmEdicao !== null) {

        // Atualiza a pessoa existente
        const indice = pessoas.findIndex(
            item => item.id === idEmEdicao
        );

        if (indice !== -1) {
            pessoas[indice] = pessoa;
        }

    } else {

        // Adiciona uma nova pessoa
        pessoas.push(pessoa);
    }

    // Atualiza o armazenamento
    salvarArmazenamento();

    // Atualiza a tabela
    renderizarTabela();

    // Limpa o formulário
    limparFormulario();

});

// ---------- Renderização da tabela ----------

function renderizarTabela() {

    tabela.innerHTML = "";

    // Verifica se existem pessoas cadastradas
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

    // Percorre todas as pessoas
    pessoas.forEach(pessoa => {

        const linha = document.createElement("tr");

        // Destaca a pessoa que está sendo editada
        if (pessoa.id === idEmEdicao) {
            linha.classList.add("em-edicao");
        }

        // Nome
        adicionarCelula(linha, pessoa.nome);

        // Idade
        adicionarCelula(linha, pessoa.idade);

        // Altura
        adicionarCelula(
            linha,
            pessoa.altura.toFixed(2) + " m"
        );

        // Peso
        adicionarCelula(
            linha,
            pessoa.peso.toFixed(1) + " kg"
        );

        // IMC
        adicionarCelula(
            linha,
            pessoa.imc.toFixed(2)
        );

        // Classificação
        const celulaClassificacao = document.createElement("td");
        const selo = document.createElement("span");

        selo.className = "selo";

        selo.textContent = pessoa.classificacao.texto;

        if (pessoa.classificacao.classe) {
            selo.classList.add(pessoa.classificacao.classe);
        }

        celulaClassificacao.appendChild(selo);
        linha.appendChild(celulaClassificacao);

        // Ações
        const celulaAcoes = document.createElement("td");

        celulaAcoes.className = "acoes";

        // Botão editar
        const btnEditar = document.createElement("button");

        btnEditar.type = "button";
        btnEditar.textContent = "Editar";
        btnEditar.addEventListener("click", () => {
            editarPessoa(pessoa.id);
        });

        // Botão remover
        const btnRemover = document.createElement("button");

        btnRemover.type = "button";
        btnRemover.textContent = "Excluir";
        btnRemover.classList.add("remover");

        btnRemover.addEventListener("click", () => {
            removerPessoa(pessoa.id);
        });

        celulaAcoes.appendChild(btnEditar);
        celulaAcoes.appendChild(btnRemover);

        linha.appendChild(celulaAcoes);

        tabela.appendChild(linha);
    });
}

// ---------- Criar células da tabela ----------

function adicionarCelula(linha, valor) {

    const celula = document.createElement("td");

    celula.textContent = valor;

    linha.appendChild(celula);
}

// ---------- Editar pessoa ----------

function editarPessoa(id) {

    const pessoa = pessoas.find(
        item => item.id === id
    );

    if (!pessoa) {
        return;
    }

    // Preenche os campos
    inputNome.value = pessoa.nome;
    inputIdade.value = pessoa.idade;
    inputAltura.value = pessoa.altura;
    inputPeso.value = pessoa.peso;

    // Guarda o ID da pessoa
    idEmEdicao = id;

    // Atualiza o título e o botão
    tituloForm.textContent = "Editar pessoa";
    btnSalvar.textContent = "Atualizar";

    // Exibe o botão cancelar
    btnCancelar.hidden = false;

    limparErro();

    // Atualiza o destaque da tabela
    renderizarTabela();

    // Leva o usuário ao formulário
    formulario.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
}

// ---------- Remover pessoa ----------

function removerPessoa(id) {

    const pessoa = pessoas.find(
        item => item.id === id
    );

    if (!pessoa) {
        return;
    }

    const confirmar = confirm(
        `Deseja realmente excluir ${pessoa.nome}?`
    );

    if (!confirmar) {
        return;
    }

    // Remove a pessoa
    pessoas = pessoas.filter(
        item => item.id !== id
    );

    // Se estiver editando a pessoa removida, limpa o formulário
    if (idEmEdicao === id) {
        limparFormulario();
    }

    // Atualiza os dados
    salvarArmazenamento();

    renderizarTabela();
}

// ---------- Cancelar edição ----------

btnCancelar.addEventListener("click", function() {
    limparFormulario();
    renderizarTabela();
});

// ---------- Inicialização ----------

// Exibe os registros salvos ao abrir a página
renderizarTabela();
