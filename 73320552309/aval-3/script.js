
// ======================================
// 1. CONFIGURAÇÕES INICIAIS
// ======================================

const chavePessoas = "pessoas";

let pessoas = carregarPessoas();

let proximoCodigo = ajustarContadorCodigo();


// ======================================
// 2. REFERÊNCIAS DO HTML
// ======================================

const formPessoa = document.getElementById("formPessoa");

const inputNome = document.getElementById("nome");

const inputIdade = document.getElementById("idade");

const inputAltura = document.getElementById("altura");

const inputPeso = document.getElementById("peso");

const tabelaPessoas = document.getElementById("tabelaPessoas");

const mensagemDeErro = document.getElementById("erro");


// ======================================
// 3. CALCULAR IMC
// ======================================

function calcularIMC(peso, altura) {

    return peso / (altura * altura);

}


// ======================================
// 4. CLASSIFICAR IMC
// ======================================

function classificarIMC(imc) {

    if (imc < 18.5) {

        return {
            texto: "Abaixo do peso",
            classe: "baixo-peso"
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

    if (imc < 35) {

        return {
            texto: "Obesidade grau I",
            classe: "obesidade"
        };

    }

    if (imc < 40) {

        return {
            texto: "Obesidade grau II",
            classe: "obesidade"
        };

    }

    return {
        texto: "Obesidade grau III",
        classe: "obesidade-grave"
    };

}


// ======================================
// 5. FORMATAR NÚMEROS
// ======================================

function formatar(valor, casas) {

    return Number(valor).toFixed(casas);

}


// ======================================
// 6. LER FORMULÁRIO
// ======================================

function lerFormulario() {

    return {

        nome: inputNome.value.trim(),

        idade: Number(inputIdade.value),

        altura: Number(inputAltura.value),

        peso: Number(inputPeso.value)

    };

}


// ======================================
// 7. VALIDAR DADOS
// ======================================

function validarDados(dados) {

    if (dados.nome.length < 2) {

        return "Informe o nome com no mínimo duas letras.";

    }

    if (
        !Number.isInteger(dados.idade) ||
        dados.idade < 1 ||
        dados.idade > 120
    ) {

        return "A idade deve ser um número inteiro entre 1 e 120.";

    }

    if (
        !Number.isFinite(dados.altura) ||
        dados.altura < 0.5 ||
        dados.altura > 2.5
    ) {

        return "A altura deve estar entre 0,50 m e 2,50 m.";

    }

    if (
        !Number.isFinite(dados.peso) ||
        dados.peso < 2 ||
        dados.peso > 500
    ) {

        return "O peso deve estar entre 2 kg e 500 kg.";

    }

    return "";

}


// ======================================
// 8. MOSTRAR ERRO
// ======================================

function mostrarErro(mensagem) {

    mensagemDeErro.textContent = mensagem;

    mensagemDeErro.hidden = false;

}


// ======================================
// 9. LIMPAR ERRO
// ======================================

function limparErro() {

    mensagemDeErro.textContent = "";

    mensagemDeErro.hidden = true;

}


// ======================================
// 10. ADICIONAR PESSOA
// ======================================

function adicionarPessoa(dados) {

    const novaPessoa = {

        id: proximoCodigo++,

        nome: dados.nome,

        idade: dados.idade,

        altura: dados.altura,

        peso: dados.peso

    };

    pessoas.push(novaPessoa);

    salvar();

}


// ======================================
// 11. SALVAR NO LOCALSTORAGE
// ======================================

function salvar() {

    localStorage.setItem(
        chavePessoas,
        JSON.stringify(pessoas)
    );

    localStorage.setItem(
        "proximoCodigo",
        proximoCodigo
    );

}


// ======================================
// 12. CARREGAR PESSOAS
// ======================================

function carregarPessoas() {

    const dados = localStorage.getItem(chavePessoas);

    if (!dados) {

        return [];

    }

    try {

        const pessoasSalvas = JSON.parse(dados);

        if (!Array.isArray(pessoasSalvas)) {

            throw new Error("Dados inválidos.");

        }

        return pessoasSalvas;

    } catch (erro) {

        console.error("Erro ao carregar pacientes:", erro);

        return [];

    }

}


// ======================================
// 13. AJUSTAR CONTADOR DE CÓDIGO
// ======================================

function ajustarContadorCodigo() {

    let maior = 0;

    pessoas.forEach(pessoa => {

        if (
            Number.isSafeInteger(pessoa.id) &&
            pessoa.id > maior
        ) {

            maior = pessoa.id;

        }

    });

    const codigoSalvo = Number(
        localStorage.getItem("proximoCodigo")
    );

    if (
        Number.isSafeInteger(codigoSalvo) &&
        codigoSalvo > maior
    ) {

        return codigoSalvo;

    }

    return maior + 1;

}


// ======================================
// 14. CRIAR LINHA DA TABELA
// ======================================

function criarLinha(pessoa) {

    const linha = document.createElement("tr");

    // Calcular IMC
    const imc = calcularIMC(
        pessoa.peso,
        pessoa.altura
    );

    // Classificar IMC
    const classificacao = classificarIMC(imc);


    // Código
    const codigo = document.createElement("td");

    codigo.textContent = pessoa.id;


    // Nome
    const nome = document.createElement("td");

    nome.textContent = pessoa.nome;


    // Idade
    const idade = document.createElement("td");

    idade.textContent = pessoa.idade + " anos";


    // Altura
    const altura = document.createElement("td");

    altura.textContent = formatar(
        pessoa.altura,
        2
    ) + " m";


    // Peso
    const peso = document.createElement("td");

    peso.textContent = formatar(
        pessoa.peso,
        1
    ) + " kg";


    // IMC
    const resultadoIMC = document.createElement("td");

    resultadoIMC.textContent = formatar(
        imc,
        1
    );


    // Classificação
    const colunaClassificacao = document.createElement("td");

    const selo = document.createElement("span");

    selo.classList.add(
        "selo",
        classificacao.classe
    );

    selo.textContent = classificacao.texto;

    colunaClassificacao.appendChild(selo);


    // Ações
    const acoes = document.createElement("td");

    const btnExcluir = document.createElement("button");

    btnExcluir.textContent = "Excluir";

    btnExcluir.className = "btn-excluir";

    btnExcluir.addEventListener("click", () => {

        excluirPessoa(pessoa.id);

    });

    acoes.appendChild(btnExcluir);


    // Adicionar colunas à linha
    linha.append(
        codigo,
        nome,
        idade,
        altura,
        peso,
        resultadoIMC,
        colunaClassificacao,
        acoes
    );

    return linha;

}


// ======================================
// 15. RENDERIZAR TABELA
// ======================================

function render() {

    tabelaPessoas.innerHTML = "";

    pessoas.forEach(pessoa => {

        const linha = criarLinha(pessoa);

        tabelaPessoas.appendChild(linha);

    });

    document.getElementById("mensagemVazia").style.display =
        pessoas.length === 0 ? "block" : "none";

    atualizarResumo();

}


// ======================================
// 16. ATUALIZAR RESUMO
// ======================================

function atualizarResumo() {

    let normais = 0;

    let alterados = 0;

    pessoas.forEach(pessoa => {

        const imc = calcularIMC(
            pessoa.peso,
            pessoa.altura
        );

        const classificacao = classificarIMC(imc);

        if (classificacao.classe === "normal") {

            normais++;

        } else {

            alterados++;

        }

    });

    document.getElementById("totalPacientes").textContent =
        pessoas.length;

    document.getElementById("imcNormal").textContent =
        normais;

    document.getElementById("imcAlterado").textContent =
        alterados;

}


// ======================================
// 17. EXCLUIR PESSOA
// ======================================

function excluirPessoa(id) {

    const pessoa = pessoas.find(
        pessoa => pessoa.id === id
    );

    if (!pessoa) {

        alert("Paciente não encontrado!");

        return;

    }

    const confirmar = confirm(
        "Deseja realmente excluir o paciente " +
        pessoa.nome + "?"
    );

    if (!confirmar) {

        return;

    }

    pessoas = pessoas.filter(
        pessoa => pessoa.id !== id
    );

    salvar();

    render();

    alert("Paciente excluído com sucesso!");

}


// ======================================
// 18. EVENTO DE ENVIO DO FORMULÁRIO
// ======================================

formPessoa.addEventListener("submit", function(event) {

    event.preventDefault();

    // Ler os dados
    const dados = lerFormulario();

    // Validar os dados
    const erro = validarDados(dados);

    // Verificar se existe erro
    if (erro !== "") {

        mostrarErro(erro);

        return;

    }

    // Limpar mensagens
    limparErro();

    // Adicionar pessoa
    adicionarPessoa(dados);

    // Atualizar tabela
    render();

    // Limpar formulário
    formPessoa.reset();

    // Voltar o foco para o nome
    inputNome.focus();

    alert("Paciente cadastrado com sucesso!");

});


// ======================================
// 19. INICIALIZAÇÃO DA APLICAÇÃO
// ======================================

render();
