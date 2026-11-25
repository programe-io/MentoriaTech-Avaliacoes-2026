
const form = document.getElementById("form-pessoa");
const inputNome = document.getElementById("input-nome");
const inputIdade = document.getElementById("input-idade");
const inputAltura = document.getElementById("input-altura");
const inputPeso = document.getElementById("input-peso");

const tabela = document.getElementById("tabela-pessoas");
const erro = document.getElementById("erro");
const btnCancelar = document.getElementById("btn-cancelar");
const btnSalvar = document.getElementById("btn-salvar");
const tituloForm = document.getElementById("titulo-form");

let pessoas = [];
let indiceEdicao = null;

// Calcula o IMC
function calcularIMC(peso, altura) {
    return peso / (altura * altura);
}

// Classifica o IMC de adultos
function classificarIMC(imc, idade) {
    if (idade < 18) {
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
            texto: "Peso adequado",
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

// Exibe mensagens de erro
function mostrarErro(mensagem) {
    erro.textContent = mensagem;
    erro.hidden = false;
}

// Limpa mensagens de erro
function limparErro() {
    erro.textContent = "";
    erro.hidden = true;

    document.querySelectorAll("input").forEach(input => {
        input.classList.remove("invalido");
    });
}

// Verifica os dados
function validarDados(pessoa) {
    if (!pessoa.nome) {
        return "Digite o nome da pessoa.";
    }

    if (!Number.isInteger(pessoa.idade) ||
        pessoa.idade < 1 || pessoa.idade > 120) {
        return "Digite uma idade válida entre 1 e 120 anos.";
    }

    if (!Number.isFinite(pessoa.altura) ||
        pessoa.altura < 0.5 || pessoa.altura > 2.5) {
        return "Digite uma altura válida entre 0,5 e 2,5 metros.";
    }

    if (!Number.isFinite(pessoa.peso) ||
        pessoa.peso < 2 || pessoa.peso > 500) {
        return "Digite um peso válido entre 2 e 500 kg.";
    }

    return null;
}

// Cria uma célula
function criarCelula(linha, conteudo) {
    const celula = document.createElement("td");
    celula.textContent = conteudo;
    linha.appendChild(celula);
    return celula;
}

// Atualiza a tabela
function atualizarTabela() {
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

    pessoas.forEach((pessoa, indice) => {
        const linha = document.createElement("tr");

        if (indice === indiceEdicao) {
            linha.classList.add("em-edicao");
        }

        criarCelula(linha, pessoa.nome);
        criarCelula(linha, pessoa.idade + " anos");
        criarCelula(linha, pessoa.altura.toFixed(2) + " m");
        criarCelula(linha, pessoa.peso.toFixed(1) + " kg");

        const imc = calcularIMC(pessoa.peso, pessoa.altura);

        criarCelula(linha, imc.toFixed(1));

        const classificacao = classificarIMC(imc, pessoa.idade);
        const celulaClassificacao = document.createElement("td");
        const selo = document.createElement("span");

        selo.className = "selo";

        if (classificacao.classe) {
            selo.classList.add(classificacao.classe);
        }

        selo.textContent = classificacao.texto;
        celulaClassificacao.appendChild(selo);
        linha.appendChild(celulaClassificacao);

        // Botões de ação
        const celulaAcoes = document.createElement("td");
        celulaAcoes.className = "acoes";

        const btnEditar = document.createElement("button");
        btnEditar.type = "button";
        btnEditar.textContent = "Editar";
        btnEditar.addEventListener("click", () => editarPessoa(indice));

        const btnExcluir = document.createElement("button");
        btnExcluir.type = "button";
        btnExcluir.textContent = "Excluir";
        btnExcluir.className = "remover";
        btnExcluir.addEventListener("click", () => excluirPessoa(indice));

        celulaAcoes.append(btnEditar, btnExcluir);
        linha.appendChild(celulaAcoes);

        tabela.appendChild(linha);
    });
}

// Cadastra ou atualiza uma pessoa
form.addEventListener("submit", function(event) {
    event.preventDefault();
    limparErro();

    const pessoa = {
        nome: inputNome.value.trim(),
        idade: Number(inputIdade.value),
        altura: Number(inputAltura.value.replace(",", ".")),
        peso: Number(inputPeso.value.replace(",", "."))
    };

    const mensagemErro = validarDados(pessoa);

    if (mensagemErro) {
        mostrarErro(mensagemErro);
        return;
    }

    if (indiceEdicao === null) {
        pessoas.push(pessoa);
    } else {
        pessoas[indiceEdicao] = pessoa;
    }

    cancelarEdicao();
    atualizarTabela();
});

// Edita uma pessoa
function editarPessoa(indice) {
    const pessoa = pessoas[indice];

    indiceEdicao = indice;

    inputNome.value = pessoa.nome;
    inputIdade.value = pessoa.idade;
    inputAltura.value = pessoa.altura;
    inputPeso.value = pessoa.peso;

    tituloForm.textContent = "Editar pessoa";
    btnSalvar.textContent = "Atualizar";
    btnCancelar.hidden = false;

    limparErro();
    atualizarTabela();

    inputNome.focus();
}

// Exclui uma pessoa
function excluirPessoa(indice) {
    pessoas.splice(indice, 1);

    if (indiceEdicao === indice) {
        cancelarEdicao();
    } else if (indiceEdicao !== null && indice > indiceEdicao) {
        indiceEdicao--;
    }

    atualizarTabela();
}

// Cancela a edição
function cancelarEdicao() {
    form.reset();

    indiceEdicao = null;

    tituloForm.textContent = "Nova pessoa";
    btnSalvar.textContent = "Salvar";
    btnCancelar.hidden = true;

    limparErro();
    atualizarTabela();
}

// Botão cancelar
btnCancelar.addEventListener("click", cancelarEdicao);

// Inicializa a tabela
atualizarTabela();
