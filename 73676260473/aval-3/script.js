
/* ==========================================================
   Calculadora de IMC
   ========================================================== */

// ---------- Elementos do HTML ----------

const formulario = document.getElementById("form-pessoa");

const inputNome = document.getElementById("input-nome");
const inputIdade = document.getElementById("input-idade");
const inputAltura = document.getElementById("input-altura");
const inputPeso = document.getElementById("input-peso");

const tabelaPessoas = document.getElementById("tabela-pessoas");

const tituloForm = document.getElementById("titulo-form");
const botaoSalvar = document.getElementById("btn-salvar");
const botaoCancelar = document.getElementById("btn-cancelar");

const mensagemErro = document.getElementById("erro");

// ---------- Variáveis ----------

let pessoas = [];
let indiceEdicao = null;

// ---------- Cálculo e classificação do IMC ----------

function calcularIMC(peso, altura) {
    return peso / (altura * altura);
}

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
}

// ---------- Validação dos campos ----------

function validarDados(nome, idade, altura, peso) {

    if (!nome.trim()) {
        return "Informe o nome da pessoa.";
    }

    if (nome.trim().length > 50) {
        return "O nome deve ter no máximo 50 caracteres.";
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

    return null;
}

// ---------- Limpar formulário ----------

function limparFormulario() {
    formulario.reset();

    indiceEdicao = null;

    tituloForm.textContent = "Nova pessoa";
    botaoSalvar.textContent = "Salvar";

    botaoCancelar.hidden = true;

    limparErro();

    document.querySelectorAll("input").forEach(input => {
        input.classList.remove("invalido");
    });
}

// ---------- Marcar campos inválidos ----------

function marcarCampo(input, invalido) {
    input.classList.toggle("invalido", invalido);
}

// ---------- Cadastrar ou atualizar pessoa ----------

formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    limparErro();

    const nome = inputNome.value.trim();
    const idade = Number(inputIdade.value);
    const altura = Number(inputAltura.value);
    const peso = Number(inputPeso.value);

    const erro = validarDados(nome, idade, altura, peso);

    // Verificar campos inválidos

    marcarCampo(inputNome, !nome);
    marcarCampo(inputIdade, !Number.isInteger(idade) || idade < 1 || idade > 120);
    marcarCampo(inputAltura, !Number.isFinite(altura) || altura < 0.5 || altura > 2.5);
    marcarCampo(inputPeso, !Number.isFinite(peso) || peso < 2 || peso > 500);

    if (erro) {
        mostrarErro(erro);
        return;
    }

    const novaPessoa = {
        nome,
        idade,
        altura,
        peso
    };

    if (indiceEdicao === null) {

        // Novo cadastro
        pessoas.push(novaPessoa);

    } else {

        // Atualização de cadastro
        pessoas[indiceEdicao] = novaPessoa;

    }

    limparFormulario();

    renderizarTabela();
});

// ---------- Exibir pessoas na tabela ----------

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

    pessoas.forEach((pessoa, indice) => {

        const imc = calcularIMC(pessoa.peso, pessoa.altura);

        const classificacao = classificarIMC(imc);

        const linha = document.createElement("tr");

        if (indice === indiceEdicao) {
            linha.classList.add("em-edicao");
        }

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

        selo.className = "selo " + classificacao.classe;
        selo.textContent = classificacao.texto;

        celulaClassificacao.appendChild(selo);

        linha.appendChild(celulaClassificacao);

        // Ações
        const celulaAcoes = document.createElement("td");

        celulaAcoes.className = "acoes";

        const botaoEditar = document.createElement("button");

        botaoEditar.type = "button";
        botaoEditar.textContent = "Editar";
        botaoEditar.addEventListener("click", () => editarPessoa(indice));

        const botaoRemover = document.createElement("button");

        botaoRemover.type = "button";
        botaoRemover.textContent = "Excluir";
        botaoRemover.classList.add("remover");

        botaoRemover.addEventListener("click", () => excluirPessoa(indice));

        celulaAcoes.appendChild(botaoEditar);
        celulaAcoes.appendChild(botaoRemover);

        linha.appendChild(celulaAcoes);

        tabelaPessoas.appendChild(linha);

    });

}

// ---------- Criar células da tabela ----------

function adicionarCelula(linha, conteudo) {

    const celula = document.createElement("td");

    celula.textContent = conteudo;

    linha.appendChild(celula);

}

// ---------- Editar pessoa ----------

function editarPessoa(indice) {

    const pessoa = pessoas[indice];

    indiceEdicao = indice;

    inputNome.value = pessoa.nome;
    inputIdade.value = pessoa.idade;
    inputAltura.value = pessoa.altura;
    inputPeso.value = pessoa.peso;

    tituloForm.textContent = "Editar pessoa";

    botaoSalvar.textContent = "Atualizar";

    botaoCancelar.hidden = false;

    limparErro();

    renderizarTabela();

    inputNome.focus();

    formulario.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

}

// ---------- Excluir pessoa ----------

function excluirPessoa(indice) {

    const pessoa = pessoas[indice];

    const confirmar = confirm(
        `Deseja realmente excluir ${pessoa.nome}?`
    );

    if (!confirmar) {
        return;
    }

    pessoas.splice(indice, 1);

    // Se a pessoa editada foi excluída, cancelar edição.
    if (indiceEdicao === indice) {

        limparFormulario();

    } else if (indiceEdicao !== null && indice < indiceEdicao) {

        indiceEdicao--;

    }

    renderizarTabela();

}

// ---------- Cancelar edição ----------

botaoCancelar.addEventListener("click", function() {

    limparFormulario();

    renderizarTabela();

});

// ---------- Inicialização ----------

renderizarTabela();