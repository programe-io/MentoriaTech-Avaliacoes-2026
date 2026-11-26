
// ======================================
// 1. CONFIGURAÇÕES INICIAIS
// ======================================

const CHAVE_PESSOAS = "pessoas";

let pessoas = [];
let proximoCodigo = 0;

// Referências dos elementos HTML
const formPessoa = document.getElementById("formPessoa");
const inputNome = document.getElementById("nome");
const inputIdade = document.getElementById("idade");
const inputAltura = document.getElementById("altura");
const inputPeso = document.getElementById("peso");
const mensagemDeErro = document.getElementById("erro");
const tabelaPessoas = document.getElementById("tabelaPessoas");
const totalPessoas = document.getElementById("totalPessoas");


// ======================================
// 2. CALCULAR O IMC
// ======================================

function calcularIMC(peso, altura) {
    return peso / (altura * altura);
}


// ======================================
// 3. CLASSIFICAR O IMC
// ======================================

function classificarIMC(imc) {

    if (imc < 18.5) {
        return {
            texto: "Baixo peso",
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

    return {
        texto: "Obesidade",
        classe: "obesidade"
    };
}


// ======================================
// 4. FORMATAR VALORES
// ======================================

function formatar(valor, casas) {
    return Number(valor).toFixed(casas);
}


// ======================================
// 5. CAPTURAR DADOS DO FORMULÁRIO
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
// 6. VALIDAR DADOS
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
        return "A altura deve estar entre 0,5 e 2,5 metros.";
    }

    if (
        !Number.isFinite(dados.peso) ||
        dados.peso < 2 ||
        dados.peso > 500
    ) {
        return "O peso deve estar entre 2 e 500 kg.";
    }

    return "";
}


// ======================================
// 7. MOSTRAR E LIMPAR ERROS
// ======================================

function mostrarErro(mensagem) {

    mensagemDeErro.textContent = mensagem;
    mensagemDeErro.hidden = false;
}

function limparErro() {

    mensagemDeErro.textContent = "";
    mensagemDeErro.hidden = true;
}


// ======================================
// 8. ADICIONAR UMA PESSOA
// ======================================

function adicionarPessoa(dados) {

    const pessoa = {
        id: ++proximoCodigo,
        nome: dados.nome,
        idade: dados.idade,
        altura: dados.altura,
        peso: dados.peso
    };

    pessoas.push(pessoa);

    return pessoa;
}


// ======================================
// 9. CRIAR UMA CÉLULA DA TABELA
// ======================================

function criarCelula(texto) {

    const td = document.createElement("td");

    td.textContent = texto;

    return td;
}


// ======================================
// 10. CRIAR LINHA DA TABELA
// ======================================

function criarLinha(pessoa) {

    const tr = document.createElement("tr");

    const imc = calcularIMC(
        pessoa.peso,
        pessoa.altura
    );

    const classificacao = classificarIMC(imc);

    tr.appendChild(criarCelula(pessoa.id));

    tr.appendChild(criarCelula(pessoa.nome));

    tr.appendChild(criarCelula(pessoa.idade));

    tr.appendChild(
        criarCelula(formatar(pessoa.altura, 2) + " m")
    );

    tr.appendChild(
        criarCelula(formatar(pessoa.peso, 1) + " kg")
    );

    tr.appendChild(
        criarCelula(formatar(imc, 1))
    );

    // Criar coluna de classificação
    const tdClassificacao = document.createElement("td");

    const selo = document.createElement("span");

    selo.classList.add("selo", classificacao.classe);

    selo.textContent = classificacao.texto;

    tdClassificacao.appendChild(selo);

    tr.appendChild(tdClassificacao);

    // Criar botão de exclusão
    const tdAcoes = document.createElement("td");

    const botaoExcluir = document.createElement("button");

    botaoExcluir.textContent = "Excluir";

    botaoExcluir.classList.add("botao-excluir");

    botaoExcluir.addEventListener("click", function() {
        excluirPessoa(pessoa.id);
    });

    tdAcoes.appendChild(botaoExcluir);

    tr.appendChild(tdAcoes);

    return tr;
}


// ======================================
// 11. RENDERIZAR A TABELA
// ======================================

function render() {

    tabelaPessoas.innerHTML = "";

    pessoas.forEach(function(pessoa) {

        const linha = criarLinha(pessoa);

        tabelaPessoas.appendChild(linha);
    });

    totalPessoas.textContent = pessoas.length;
}


// ======================================
// 12. SALVAR NO LOCALSTORAGE
// ======================================

function salvar() {

    localStorage.setItem(
        CHAVE_PESSOAS,
        JSON.stringify(pessoas)
    );
}


// ======================================
// 13. CARREGAR PESSOAS SALVAS
// ======================================

function carregarPessoas() {

    const dadosSalvos = localStorage.getItem(CHAVE_PESSOAS);

    if (dadosSalvos === null) {
        return [];
    }

    try {

        const dados = JSON.parse(dadosSalvos);

        if (Array.isArray(dados)) {
            return dados;
        }

        throw new Error("Os dados armazenados não são uma lista.");

    } catch (erro) {

        console.error("Erro ao carregar os pacientes:", erro);

        return [];
    }
}


// ======================================
// 14. AJUSTAR CONTADOR DE CÓDIGO
// ======================================

function ajustarContadorCodigo() {

    let maior = 0;

    pessoas.forEach(function(pessoa) {

        if (Number.isInteger(pessoa.id) && pessoa.id > maior) {
            maior = pessoa.id;
        }
    });

    proximoCodigo = maior;
}


// ======================================
// 15. EXCLUIR UMA PESSOA
// ======================================

function excluirPessoa(id) {

    const confirmar = confirm(
        "Deseja realmente excluir este paciente?"
    );

    if (!confirmar) {
        return;
    }

    pessoas = pessoas.filter(function(pessoa) {
        return pessoa.id !== id;
    });

    salvar();

    render();
}


// ======================================
// 16. EVENTO DE ENVIO DO FORMULÁRIO
// ======================================

formPessoa.addEventListener("submit", function(evento) {

    evento.preventDefault();

    // Ler os dados
    const dados = lerFormulario();

    // Validar os dados
    const erro = validarDados(dados);

    if (erro !== "") {

        mostrarErro(erro);

        return;
    }

    // Limpar mensagens
    limparErro();

    // Adicionar paciente
    adicionarPessoa(dados);

    // Salvar no navegador
    salvar();

    // Atualizar tabela
    render();

    // Limpar formulário
    formPessoa.reset();

    // Voltar o cursor para o nome
    inputNome.focus();
});


// ======================================
// 17. INICIALIZAÇÃO DA APLICAÇÃO
// ======================================

// Recuperar os pacientes salvos
pessoas = carregarPessoas();

// Ajustar o próximo código
ajustarContadorCodigo();

// Mostrar os dados na tabela
render();
