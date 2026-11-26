
// =====================================
// 1. ARMAZENAMENTO DOS PACIENTES
// =====================================

let pessoas = [];

let contadorCodigo = 0;

// Referência ao corpo da tabela
const tabelaPessoas = document.getElementById("tabelaPessoas");

// Referência ao formulário
const formPessoa = document.getElementById("formPessoa");

// =====================================
// 2. GERAR CÓDIGO AUTOMATICAMENTE
// =====================================

function gerarCodigo() {
    return ++contadorCodigo;
}

// =====================================
// 3. CRIAR UMA CÉLULA DA TABELA
// =====================================

function criarCelula(valor) {

    const td = document.createElement("td");

    td.textContent = valor;

    return td;
}

// =====================================
// 4. CRIAR UMA LINHA DA TABELA
// =====================================

function criarLinha(pessoa) {

    const tr = document.createElement("tr");

    tr.dataset.id = pessoa.id;

    // Nome
    tr.appendChild(criarCelula(pessoa.nome));

    // Idade
    tr.appendChild(criarCelula(pessoa.idade + " anos"));

    // Altura
    tr.appendChild(criarCelula(formatar(pessoa.altura, 2) + " m"));

    // Peso
    tr.appendChild(criarCelula(formatar(pessoa.peso, 1) + " kg"));

    // IMC
    tr.appendChild(criarCelula(formatar(pessoa.imc, 2)));

    // Classificação
    const tdClassificacao = document.createElement("td");

    const span = document.createElement("span");

    span.className = "classificacao " + pessoa.classificacao.classe;

    span.textContent = pessoa.classificacao.texto;

    tdClassificacao.appendChild(span);

    tr.appendChild(tdClassificacao);

    // Ações
    const tdAcoes = document.createElement("td");

    const botaoExcluir = document.createElement("button");

    botaoExcluir.textContent = "Excluir";

    botaoExcluir.className = "btn-cancelar";

    botaoExcluir.type = "button";

    botaoExcluir.dataset.acao = "excluir";

    botaoExcluir.dataset.id = pessoa.id;

    tdAcoes.appendChild(botaoExcluir);

    tr.appendChild(tdAcoes);

    return tr;
}

// =====================================
// 5. FUNÇÃO DE RENDERIZAÇÃO
// =====================================

function render() {

    tabelaPessoas.replaceChildren();

    if (pessoas.length === 0) {

        const tr = document.createElement("tr");

        const td = document.createElement("td");

        td.colSpan = 7;

        td.className = "vazio";

        td.textContent = "Nenhuma pessoa cadastrada ainda.";

        tr.appendChild(td);

        tabelaPessoas.appendChild(tr);

        return;
    }

    pessoas.forEach(pessoa => {

        const linha = criarLinha(pessoa);

        tabelaPessoas.appendChild(linha);

    });
}

// =====================================
// 6. CALCULAR IMC
// =====================================

function calcularIMC(peso, altura) {

    return peso / (altura * altura);

}

// =====================================
// 7. CLASSIFICAR IMC
// =====================================

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

// =====================================
// 8. FORMATAR VALORES NUMÉRICOS
// =====================================

function formatar(valor, casasDecimais) {

    return valor.toLocaleString("pt-BR", {
        minimumFractionDigits: casasDecimais,
        maximumFractionDigits: casasDecimais
    });

}

// =====================================
// 9. VALIDAR DADOS
// =====================================

function validarPessoa(nome, idade, altura, peso) {

    if (nome.trim().length < 3) {
        throw new Error("Informe um nome com pelo menos 3 caracteres.");
    }

    if (!Number.isInteger(idade) || idade < 1 || idade > 120) {
        throw new Error("Informe uma idade entre 1 e 120 anos.");
    }

    if (!Number.isFinite(altura) || altura < 0.5 || altura > 2.5) {
        throw new Error("Informe uma altura válida.");
    }

    if (!Number.isFinite(peso) || peso <= 0 || peso > 500) {
        throw new Error("Informe um peso válido.");
    }

}

// =====================================
// 10. CADASTRAR PACIENTE
// =====================================

function cadastrarPessoa(nome, idade, altura, peso) {

    validarPessoa(nome, idade, altura, peso);

    const imc = calcularIMC(peso, altura);

    const novaPessoa = {

        id: gerarCodigo(),

        nome: nome.trim(),

        idade: idade,

        altura: altura,

        peso: peso,

        imc: imc,

        classificacao: classificarIMC(imc)

    };

    pessoas.push(novaPessoa);

    return novaPessoa;

}

// =====================================
// 11. EXCLUIR PACIENTE
// =====================================

function excluirPessoa(id) {

    const indice = pessoas.findIndex(
        pessoa => pessoa.id === id
    );

    if (indice === -1) {
        throw new Error("Paciente não encontrado.");
    }

    pessoas.splice(indice, 1);

}

// =====================================
// 12. SALVAR FORMULÁRIO
// =====================================

formPessoa.addEventListener("submit", function(event) {

    event.preventDefault();

    const erro = document.getElementById("erro");

    erro.textContent = "";

    try {

        const nome = document.getElementById("nome").value;

        const idade = Number(document.getElementById("idade").value);

        const altura = Number(document.getElementById("altura").value);

        const peso = Number(document.getElementById("peso").value);

        cadastrarPessoa(nome, idade, altura, peso);

        render();

        formPessoa.reset();

        alert("Paciente cadastrado com sucesso!");

    } catch (error) {

        erro.textContent = error.message;

    }

});

// =====================================
// 13. AÇÕES DA TABELA
// =====================================

tabelaPessoas.addEventListener("click", function(event) {

    const botao = event.target.closest("button[data-acao]");

    if (!botao) return;

    if (botao.dataset.acao === "excluir") {

        const id = Number(botao.dataset.id);

        const confirmar = confirm(
            "Deseja realmente excluir este paciente?"
        );

        if (!confirmar) return;

        try {

            excluirPessoa(id);

            render();

        } catch (error) {

            alert(error.message);

        }

    }

});

// =====================================
// 14. INICIALIZAR SISTEMA
// =====================================

render();
