
// ======================================
// VARIÁVEIS DO SISTEMA
// ======================================

let pessoas = [];
let contador = 0;

// Referências HTML
const formulario = document.getElementById("form-pessoa");
const tabelaPessoas = document.getElementById("tabela-pessoas");
const mensagemErro = document.getElementById("erro");

// ======================================
// GERAÇÃO AUTOMÁTICA DE CÓDIGO
// ======================================

function gerarCodigo() {
    return ++contador;
}

// ======================================
// FUNÇÕES PARA CRIAR CÉLULAS E LINHAS
// ======================================

function criarCelula(conteudo) {
    const td = document.createElement("td");
    td.textContent = conteudo;
    return td;
}

function criarLinha(pessoa) {
    const tr = document.createElement("tr");

    tr.dataset.id = pessoa.id;

    tr.appendChild(criarCelula(pessoa.id));
    tr.appendChild(criarCelula(pessoa.nome));
    tr.appendChild(criarCelula(pessoa.idade));
    tr.appendChild(criarCelula(formatar(pessoa.altura, 2)));
    tr.appendChild(criarCelula(formatar(pessoa.peso, 1)));
    tr.appendChild(criarCelula(formatar(pessoa.imc, 2)));

    const classificacao = document.createElement("td");
    classificacao.textContent = pessoa.classificacao.texto;
    classificacao.className = pessoa.classificacao.classe;

    tr.appendChild(classificacao);

    // Botão excluir
    const tdAcoes = document.createElement("td");
    const botaoExcluir = document.createElement("button");

    botaoExcluir.textContent = "Excluir";
    botaoExcluir.className = "btn-excluir";

    botaoExcluir.addEventListener("click", function () {
        excluirPessoa(pessoa.id);
    });

    tdAcoes.appendChild(botaoExcluir);
    tr.appendChild(tdAcoes);

    return tr;
}

// ======================================
// FUNÇÃO DE RENDERIZAÇÃO
// ======================================

function render() {

    tabelaPessoas.innerHTML = "";

    if (pessoas.length === 0) {

        const tr = document.createElement("tr");
        const td = document.createElement("td");

        td.colSpan = 8;
        td.className = "vazio";
        td.textContent = "Nenhuma pessoa cadastrada ainda.";

        tr.appendChild(td);
        tabelaPessoas.appendChild(tr);

        return;
    }

    pessoas.forEach(function (pessoa) {

        const linha = criarLinha(pessoa);

        tabelaPessoas.appendChild(linha);

    });
}

// ======================================
// FUNÇÕES DE NEGÓCIO
// ======================================

// Calcular IMC
function calcularIMC(peso, altura) {
    return peso / (altura * altura);
}

// Classificar IMC
function classificarIMC(imc) {

    if (imc < 18.5) {

        return {
            texto: "Abaixo do peso",
            classe: "abaixo"
        };

    } else if (imc < 25) {

        return {
            texto: "Peso normal",
            classe: "normal"
        };

    } else if (imc < 30) {

        return {
            texto: "Sobrepeso",
            classe: "sobrepeso"
        };

    } else if (imc < 35) {

        return {
            texto: "Obesidade grau I",
            classe: "obesidade"
        };

    } else if (imc < 40) {

        return {
            texto: "Obesidade grau II",
            classe: "obesidade"
        };

    } else {

        return {
            texto: "Obesidade grau III",
            classe: "obesidade"
        };

    }
}

// Formatar valores numéricos
function formatar(valor, casas) {

    return valor.toLocaleString("pt-BR", {
        minimumFractionDigits: casas,
        maximumFractionDigits: casas
    });

}

// ======================================
// CADASTRAR PACIENTE
// ======================================

function cadastrarPessoa(nome, idade, altura, peso) {

    if (nome.length < 3) {
        mensagemErro.textContent =
            "O nome deve possuir pelo menos 3 caracteres.";
        return;
    }

    if (idade < 1 || idade > 120) {
        mensagemErro.textContent =
            "Informe uma idade entre 1 e 120 anos.";
        return;
    }

    if (altura < 0.5 || altura > 2.5) {
        mensagemErro.textContent =
            "Informe uma altura válida.";
        return;
    }

    if (peso < 1 || peso > 500) {
        mensagemErro.textContent =
            "Informe um peso válido.";
        return;
    }

    const imc = calcularIMC(peso, altura);

    const classificacao = classificarIMC(imc);

    const pessoa = {

        id: gerarCodigo(),
        nome: nome,
        idade: idade,
        altura: altura,
        peso: peso,
        imc: imc,
        classificacao: classificacao

    };

    pessoas.push(pessoa);

    mensagemErro.textContent = "";

    render();

}

// ======================================
// EXCLUIR PACIENTE
// ======================================

function excluirPessoa(id) {

    const confirmar = confirm(
        "Deseja realmente excluir este paciente?"
    );

    if (!confirmar) {
        return;
    }

    pessoas = pessoas.filter(function (pessoa) {
        return pessoa.id !== id;
    });

    render();

}

// ======================================
// EVENTO DO FORMULÁRIO
// ======================================

formulario.addEventListener("submit", function (evento) {

    evento.preventDefault();

    const nome = document.getElementById("nome").value.trim();

    const idade = Number(
        document.getElementById("idade").value
    );

    const altura = Number(
        document.getElementById("altura").value
    );

    const peso = Number(
        document.getElementById("peso").value
    );

    cadastrarPessoa(nome, idade, altura, peso);

    // Limpar formulário somente se o cadastro foi realizado
    if (mensagemErro.textContent === "") {
        formulario.reset();
    }

});

// ======================================
// EVENTO DO BOTÃO CANCELAR
// ======================================

formulario.addEventListener("reset", function () {

    mensagemErro.textContent = "";

});

// ======================================
// INICIALIZAÇÃO DO SISTEMA
// ======================================

render();
