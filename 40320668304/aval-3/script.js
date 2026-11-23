let pessoas = [];

let indiceEdicao = null;

const formulario = document.getElementById("form-pessoa");
const tabela = document.getElementById("tabela-pessoas");
const mensagemErro = document.getElementById("erro");

const tituloForm = document.getElementById("titulo-form");
const botaoSalvar = document.getElementById("btn-salvar");
const botaoCancelar = document.getElementById("btn-cancelar");

function calcularIMC(peso, altura) {
    return peso / (altura * altura);
}

function classificarIMC(imc, idade) {

    if (idade < 20) {
        return "Avaliação específica por idade";
    }

    if (imc < 18.5) {
        return "Abaixo do peso";
    } else if (imc < 25) {
        return "Faixa considerada adequada";
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

function mostrarErro(mensagem) {
    mensagemErro.textContent = mensagem;
    mensagemErro.hidden = false;
}

function limparErro() {
    mensagemErro.textContent = "";
    mensagemErro.hidden = true;
}

formulario.addEventListener("submit", function(event) {

    event.preventDefault();
    limparErro();

    const nome = document.getElementById("input-nome").value.trim();
    const idade = Number(document.getElementById("input-idade").value);
    const altura = Number(document.getElementById("input-altura").value);
    const peso = Number(document.getElementById("input-peso").value);

    if (!nome) {
        mostrarErro("Digite o nome da pessoa.");
        return;
    }

    if (!Number.isInteger(idade) || idade < 1 || idade > 120) {
        mostrarErro("Digite uma idade válida entre 1 e 120 anos.");
        return;
    }

    if (!Number.isFinite(altura) || altura < 0.5 || altura > 2.5) {
        mostrarErro("Digite uma altura válida entre 0,5 e 2,5 metros.");
        return;
    }

    if (!Number.isFinite(peso) || peso < 2 || peso > 500) {
        mostrarErro("Digite um peso válido.");
        return;
    }

    const imc = calcularIMC(peso, altura);
    const classificacao = classificarIMC(imc, idade);

    const pessoa = {
        nome: nome,
        idade: idade,
        altura: altura,
        peso: peso,
        imc: imc,
        classificacao: classificacao
    };

    if (indiceEdicao === null) {
        pessoas.push(pessoa);
    } else {
        pessoas[indiceEdicao] = pessoa;
    }

    atualizarTabela();
    limparFormulario();
});

function atualizarTabela() {

    tabela.innerHTML = "";

    pessoas.forEach(function(pessoa, indice) {

        const linha = document.createElement("tr");

        const dados = [
            pessoa.nome,
            pessoa.idade,
            pessoa.altura.toFixed(2) + " m",
            pessoa.peso.toFixed(1) + " kg",
            pessoa.imc.toFixed(2),
            pessoa.classificacao
        ];

        dados.forEach(function(dado) {
            const coluna = document.createElement("td");
            coluna.textContent = dado;
            linha.appendChild(coluna);
        });

        const colunaAcoes = document.createElement("td");

        const botaoEditar = document.createElement("button");
        botaoEditar.textContent = "Editar";
        botaoEditar.className = "btn-editar";
        botaoEditar.type = "button";
        botaoEditar.addEventListener("click", function() {
            editarPessoa(indice);
        });

        const botaoExcluir = document.createElement("button");
        botaoExcluir.textContent = "Excluir";
        botaoExcluir.className = "btn-excluir";
        botaoExcluir.type = "button";
        botaoExcluir.addEventListener("click", function() {
            excluirPessoa(indice);
        });

        colunaAcoes.appendChild(botaoEditar);
        colunaAcoes.appendChild(botaoExcluir);

        linha.appendChild(colunaAcoes);
        tabela.appendChild(linha);
    });
}

function editarPessoa(indice) {

    const pessoa = pessoas[indice];

    document.getElementById("input-nome").value = pessoa.nome;
    document.getElementById("input-idade").value = pessoa.idade;
    document.getElementById("input-altura").value = pessoa.altura;
    document.getElementById("input-peso").value = pessoa.peso;

    indiceEdicao = indice;

    tituloForm.textContent = "Editar pessoa";
    botaoSalvar.textContent = "Atualizar";
    botaoCancelar.hidden = false;

    limparErro();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

function excluirPessoa(indice) {

    const confirmar = confirm("Deseja realmente excluir esta pessoa?");

    if (confirmar) {

        pessoas.splice(indice, 1);

        if (indiceEdicao !== null) {
            if (indiceEdicao === indice) {
                limparFormulario();
            } else if (indiceEdicao > indice) {
                indiceEdicao--;
            }
        }

        atualizarTabela();
    }
}

function limparFormulario() {

    formulario.reset();

    indiceEdicao = null;

    tituloForm.textContent = "Nova pessoa";
    botaoSalvar.textContent = "Salvar";
    botaoCancelar.hidden = true;

    limparErro();
}

botaoCancelar.addEventListener("click", function() {
    limparFormulario();
});
```






