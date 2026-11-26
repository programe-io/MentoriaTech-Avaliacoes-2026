
// ==========================================
// CALCULADORA DE IMC
// ==========================================


// 1. CONFIGURAÇÕES INICIAIS

const chavePessoas = "pessoas";

let geradorCodigo = 0;


// ==========================================
// 2. REFERÊNCIAS DO HTML
// ==========================================

const formPessoa = document.getElementById("formPessoa");

const inputNome = document.getElementById("nome");

const inputIdade = document.getElementById("idade");

const inputAltura = document.getElementById("altura");

const inputPeso = document.getElementById("peso");

const tabelaPessoas = document.getElementById("tabelaPessoas");

const mensagemDeErro = document.getElementById("erro");


// ==========================================
// 3. FUNÇÃO PARA GERAR CÓDIGO
// ==========================================

function gerarCodigo() {

    return ++geradorCodigo;

}


// ==========================================
// 4. FUNÇÃO PARA CRIAR CÉLULA
// ==========================================

function criarCelula(conteudo) {

    const td = document.createElement("td");

    td.textContent = conteudo;

    return td;

}


// ==========================================
// 5. FUNÇÃO PARA CALCULAR IMC
// ==========================================

function calcularIMC(peso, altura) {

    return peso / (altura * altura);

}


// ==========================================
// 6. FUNÇÃO PARA CLASSIFICAR IMC
// ==========================================

function classificarIMC(imc) {

    if (imc < 18.5) {

        return {
            texto: "Abaixo do peso",
            classe: "abaixo-peso"
        };

    } else if (imc < 25) {

        return {
            texto: "Peso normal",
            classe: "peso-normal"
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


// ==========================================
// 7. FUNÇÃO PARA FORMATAR NÚMEROS
// ==========================================

function formatar(valor, casasDecimais = 2) {

    return valor.toLocaleString("pt-BR", {

        minimumFractionDigits: casasDecimais,

        maximumFractionDigits: casasDecimais

    });

}


// ==========================================
// 8. FUNÇÃO PARA CRIAR LINHA
// ==========================================

function criarLinha(pessoa) {

    const tr = document.createElement("tr");

    tr.dataset.id = pessoa.id;


    // Calcular IMC

    const imc = calcularIMC(
        pessoa.peso,
        pessoa.altura
    );


    // Classificar IMC

    const classificacao = classificarIMC(imc);


    // Nome

    tr.appendChild(
        criarCelula(pessoa.nome)
    );


    // Idade

    tr.appendChild(
        criarCelula(pessoa.idade + " anos")
    );


    // Altura

    tr.appendChild(
        criarCelula(formatar(pessoa.altura, 2) + " m")
    );


    // Peso

    tr.appendChild(
        criarCelula(formatar(pessoa.peso, 1) + " kg")
    );


    // IMC

    tr.appendChild(
        criarCelula(formatar(imc, 1))
    );


    // Classificação

    const tdClassificacao = document.createElement("td");

    const selo = document.createElement("span");

    selo.classList.add("selo", classificacao.classe);

    selo.textContent = classificacao.texto;

    tdClassificacao.appendChild(selo);

    tr.appendChild(tdClassificacao);


    // Ações

    const tdAcoes = document.createElement("td");

    const btnExcluir = document.createElement("button");

    btnExcluir.textContent = "Excluir";

    btnExcluir.classList.add("btn-excluir");

    btnExcluir.addEventListener("click", function() {

        excluirPessoa(pessoa.id);

    });

    tdAcoes.appendChild(btnExcluir);

    tr.appendChild(tdAcoes);


    return tr;

}


// ==========================================
// 9. FUNÇÃO PARA RENDERIZAR A TABELA
// ==========================================

function render() {

    tabelaPessoas.innerHTML = "";

    if (pessoas.length === 0) {

        const tr = document.createElement("tr");

        const td = document.createElement("td");

        td.colSpan = 7;

        td.classList.add("vazio");

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


// ==========================================
// 10. FUNÇÕES DE NEGÓCIO
// ==========================================


// Adicionar pessoa

function adicionarPessoa(dados) {

    const novaPessoa = {

        id: gerarCodigo(),

        nome: dados.nome,

        idade: dados.idade,

        altura: dados.altura,

        peso: dados.peso

    };

    pessoas.push(novaPessoa);

    return novaPessoa;

}


// Ler formulário

function lerFormulario() {

    return {

        nome: inputNome.value.trim(),

        idade: Number(inputIdade.value),

        altura: Number(inputAltura.value),

        peso: Number(inputPeso.value)

    };

}


// Validar dados

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

        return "A altura deve estar entre 0,5 m e 2,5 m.";

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


// ==========================================
// 11. MENSAGENS DE ERRO
// ==========================================

function mostrarErro(mensagem) {

    mensagemDeErro.textContent = mensagem;

    mensagemDeErro.hidden = false;

}


function limparErro() {

    mensagemDeErro.textContent = "";

    mensagemDeErro.hidden = true;

}


// ==========================================
// 12. SALVAR NO LOCALSTORAGE
// ==========================================

function salvar() {

    localStorage.setItem(

        chavePessoas,

        JSON.stringify(pessoas)

    );

}


// ==========================================
// 13. CARREGAR PESSOAS SALVAS
// ==========================================

function carregarPessoas() {

    const dadosSalvos = localStorage.getItem(chavePessoas);

    if (!dadosSalvos) {

        return [];

    }

    try {

        const dados = JSON.parse(dadosSalvos);

        if (!Array.isArray(dados)) {

            throw new Error("Formato de dados inválido.");

        }

        return dados;

    } catch (erro) {

        console.error("Erro ao carregar pessoas:", erro);

        return [];

    }

}


// ==========================================
// 14. AJUSTAR CONTADOR DE CÓDIGO
// ==========================================

function ajustarContadorCodigo() {

    let maior = 0;

    pessoas.forEach(function(pessoa) {

        if (
            Number.isInteger(pessoa.id) &&
            pessoa.id > maior
        ) {

            maior = pessoa.id;

        }

    });

    geradorCodigo = maior;

}


// ==========================================
// 15. EXCLUIR PESSOA
// ==========================================

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


// ==========================================
// 16. EVENTO DE ENVIO DO FORMULÁRIO
// ==========================================

formPessoa.addEventListener("submit", function(event) {

    event.preventDefault();


    // Ler dados

    const dados = lerFormulario();


    // Validar dados

    const erro = validarDados(dados);


    if (erro !== "") {

        mostrarErro(erro);

        return;

    }


    // Limpar mensagens

    limparErro();


    // Adicionar pessoa

    adicionarPessoa(dados);


    // Salvar dados

    salvar();


    // Limpar formulário

    formPessoa.reset();


    // Atualizar tela

    render();


    // Focar no campo nome

    inputNome.focus();

});


// Limpar erro ao cancelar o formulário

formPessoa.addEventListener("reset", function() {

    limparErro();

});


// ==========================================
// 17. INICIALIZAÇÃO DO SISTEMA
// ==========================================

// Carregar pessoas armazenadas

let pessoas = carregarPessoas();


// Ajustar código automaticamente

ajustarContadorCodigo();


// Exibir dados na tabela

render();
