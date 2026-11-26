
// =====================================
// DADOS DO SISTEMA
// =====================================

let pessoas = JSON.parse(localStorage.getItem("pessoas")) || [];

let contadorCodigo = pessoas.reduce(
    (maior, pessoa) => Math.max(maior, pessoa.id),
    0
);

const formPessoa = document.getElementById("formPessoa");
const tabelaPessoas = document.getElementById("tabelaPessoas");
const erro = document.getElementById("erro");
const botaoCancelar = document.getElementById("cancelar");

let pessoaEditando = null;

// =====================================
// REFERÊNCIAS DOS CAMPOS
// =====================================

const nomeInput = document.getElementById("nome");
const idadeInput = document.getElementById("idade");
const alturaInput = document.getElementById("altura");
const pesoInput = document.getElementById("peso");

// =====================================
// GERAR IDENTIFICADOR
// =====================================

function gerarCodigo() {
    contadorCodigo++;
    return contadorCodigo;
}

// =====================================
// CALCULAR IMC
// =====================================

function calcularIMC(peso, altura) {
    return peso / (altura * altura);
}

// =====================================
// CLASSIFICAR IMC
// =====================================

function classificarIMC(imc, idade) {

    // Para menores de 20 anos, a avaliação
    // deve utilizar curvas de crescimento
    // específicas para idade e sexo.

    if (idade < 20) {
        return "Necessita de avaliação por curva de crescimento";
    }

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

// =====================================
// FORMATAR VALORES
// =====================================

function formatar(valor, casas = 2) {
    return Number(valor).toLocaleString("pt-BR", {
        minimumFractionDigits: casas,
        maximumFractionDigits: casas
    });
}

// =====================================
// SALVAR NO NAVEGADOR
// =====================================

function salvarLocalmente() {
    localStorage.setItem("pessoas", JSON.stringify(pessoas));
}

// =====================================
// LIMPAR FORMULÁRIO
// =====================================

function limparFormulario() {
    formPessoa.reset();
    pessoaEditando = null;
    erro.textContent = "";

    document.querySelector(".salvar").textContent =
        "Salvar paciente";
}

// =====================================
// CRIAR CÉLULA DA TABELA
// =====================================

function criarCelula(valor) {

    const td = document.createElement("td");

    td.textContent = valor;

    return td;
}

// =====================================
// CRIAR LINHA DA TABELA
// =====================================

function criarLinha(pessoa) {

    const tr = document.createElement("tr");

    tr.appendChild(criarCelula(pessoa.id));
    tr.appendChild(criarCelula(pessoa.nome));
    tr.appendChild(criarCelula(pessoa.idade));
    tr.appendChild(criarCelula(formatar(pessoa.altura)));
    tr.appendChild(criarCelula(formatar(pessoa.peso)));
    tr.appendChild(criarCelula(formatar(pessoa.imc)));

    tr.appendChild(
        criarCelula(classificarIMC(pessoa.imc, pessoa.idade))
    );

    // Coluna de ações

    const tdAcoes = document.createElement("td");

    const botaoEditar = document.createElement("button");

    botaoEditar.textContent = "Editar";
    botaoEditar.className = "editar";

    botaoEditar.addEventListener("click", function() {
        editarPessoa(pessoa.id);
    });

    const botaoExcluir = document.createElement("button");

    botaoExcluir.textContent = "Excluir";
    botaoExcluir.className = "excluir";

    botaoExcluir.addEventListener("click", function() {
        excluirPessoa(pessoa.id);
    });

    tdAcoes.appendChild(botaoEditar);
    tdAcoes.appendChild(botaoExcluir);

    tr.appendChild(tdAcoes);

    return tr;
}

// =====================================
// RENDERIZAR TABELA
// =====================================

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

    pessoas.forEach(function(pessoa) {

        const linha = criarLinha(pessoa);

        tabelaPessoas.appendChild(linha);

    });
}

// =====================================
// CADASTRAR OU ATUALIZAR PACIENTE
// =====================================

formPessoa.addEventListener("submit", function(event) {

    event.preventDefault();

    erro.textContent = "";

    const nome = nomeInput.value.trim();
    const idade = Number(idadeInput.value);
    const altura = Number(alturaInput.value);
    const peso = Number(pesoInput.value);

    // Validar informações

    if (!nome || !idadeInput.value ||
        !alturaInput.value || !pesoInput.value) {

        erro.textContent = "Preencha todos os campos.";
        return;
    }

    if (
        idade < 1 || idade > 120 ||
        altura < 0.5 || altura > 2.5 ||
        peso < 2 || peso > 500 ||
        !Number.isFinite(altura) ||
        !Number.isFinite(peso)
    ) {

        erro.textContent = "Verifique os valores informados.";
        return;
    }

    const imc = calcularIMC(peso, altura);

    const pessoa = {
        id: pessoaEditando || gerarCodigo(),
        nome: nome,
        idade: idade,
        altura: altura,
        peso: peso,
        imc: imc
    };

    if (pessoaEditando !== null) {

        const indice = pessoas.findIndex(
            p => p.id === pessoaEditando
        );

        if (indice !== -1) {
            pessoas[indice] = pessoa;
        }

    } else {

        pessoas.push(pessoa);

    }

    salvarLocalmente();

    render();

    limparFormulario();

});

// =====================================
// EDITAR PACIENTE
// =====================================

function editarPessoa(id) {

    const pessoa = pessoas.find(p => p.id === id);

    if (!pessoa) return;

    nomeInput.value = pessoa.nome;
    idadeInput.value = pessoa.idade;
    alturaInput.value = pessoa.altura;
    pesoInput.value = pessoa.peso;

    pessoaEditando = id;

    document.querySelector(".salvar").textContent =
        "Atualizar paciente";

    erro.textContent = "";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

// =====================================
// EXCLUIR PACIENTE
// =====================================

function excluirPessoa(id) {

    const confirmar = confirm(
        "Deseja realmente excluir este paciente?"
    );

    if (!confirmar) return;

    pessoas = pessoas.filter(
        pessoa => pessoa.id !== id
    );

    salvarLocalmente();

    render();

    if (pessoaEditando === id) {
        limparFormulario();
    }
}

// =====================================
// CANCELAR CADASTRO
// =====================================

botaoCancelar.addEventListener("click", function() {

    limparFormulario();

});

// =====================================
// INICIAR SISTEMA
// =====================================

render();
