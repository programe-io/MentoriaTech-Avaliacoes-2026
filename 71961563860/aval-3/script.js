// =========================================================
// 1. REFERÊNCIAS DO DOM E CONSTANTES
// =========================================================
const CHAVE_PESSOAS = "pessoas";

const formPessoa = document.getElementById("form-pessoa");
const inputNome = document.getElementById("nome");
const inputIdade = document.getElementById("idade");
const inputAltura = document.getElementById("altura");
const inputPeso = document.getElementById("peso");
const btnCancelar = document.getElementById("btn-cancelar");
const mensagemDeErro = document.getElementById("erro");
const tabelaPessoas = document.getElementById("tabela-pessoas");

let contadorCodigo = 0;

function gerarCodigo() {
    return ++contadorCodigo;
}

function ajustarContadorCodigo() {
    let maior = 0;
    pessoas.forEach((pessoa) => {
        if (pessoa.id > maior) {
            maior = pessoa.id;
        }
    });
    contadorCodigo = maior;
}

// =========================================================
// 2. INÍCIO DAS FUNÇÕES DE REGRA DE NEGÓCIO
// =========================================================
function calcularIMC(peso, altura) {
    return peso / (altura * altura);
}

/* =========================================================================
   [AJUDA PARA ENCONTRAR - PASSO 9: TEXTOS DA CLASSIFICAÇÃO DO IMC]
   ALTERE AQUI DESSA FORMA: Você pode personalizar os textos exibidos no selo
   dentro de texto: "..." (Ex: "Peso Ideal" no lugar de "Peso normal").
   ATENÇÃO: Não mude os nomes dentro de classe: "..." (abaixo, normal, etc.),
   pois eles ligam com as cores do arquivo style.css.
   ========================================================================= */
function classificarIMC(imc) {
    if (imc < 18.5) {
        return { texto: "Abaixo do peso", classe: "abaixo" };
    }
    if (imc < 25) {
        return { texto: "Peso normal", classe: "normal" };
    }
    if (imc < 30) {
        return { texto: "Sobrepeso", classe: "sobrepeso" };
    }
    if (imc < 35) {
        return { texto: "Obesidade grau I", classe: "obesidade" };
    }
    if (imc < 40) {
        return { texto: "Obesidade grau II", classe: "obesidade" };
    }
    return { texto: "Obesidade grau III", classe: "obesidade" };
}

function formatar(valor, casasDecimais) {
    return valor.toLocaleString("pt-BR", {
        minimumFractionDigits: casasDecimais,
        maximumFractionDigits: casasDecimais
    });
}
// =========================================================
// FIM DAS FUNÇÕES DE REGRA DE NEGÓCIO
// =========================================================

// =========================================================
// 3. MANIPULAÇÃO E RENDERIZAÇÃO DA TABELA
// =========================================================
function criarCelula(texto) {
    const td = document.createElement("td");
    td.textContent = texto;
    return td;
}

function criarLinha(pessoa) {
    const tr = document.createElement("tr");
    tr.dataset.id = pessoa.id;

    const imc = calcularIMC(pessoa.peso, pessoa.altura);
    const classificacao = classificarIMC(imc);

    tr.appendChild(criarCelula(pessoa.nome));
    tr.appendChild(criarCelula(`${pessoa.idade} anos`));
    tr.appendChild(criarCelula(`${formatar(pessoa.altura, 2)} m`));
    tr.appendChild(criarCelula(`${formatar(pessoa.peso, 1)} kg`));
    tr.appendChild(criarCelula(formatar(imc, 1)));

    // Coluna de classificação com selo colorido
    const tdClassificacao = document.createElement("td");
    const selo = document.createElement("span");
    selo.classList.add("selo", classificacao.classe);
    selo.textContent = classificacao.texto;
    tdClassificacao.appendChild(selo);
    tr.appendChild(tdClassificacao);

    // Coluna de ações (Botão Apagar - Desafio da Aula 3.14)
    const tdAcoes = document.createElement("td");
    const btnApagar = document.createElement("button");
    btnApagar.type = "button";
    btnApagar.classList.add("btn", "btn-apagar");
    btnApagar.textContent = "Apagar";
    btnApagar.addEventListener("click", () => {
        removerPessoa(pessoa.id);
    });
    tdAcoes.appendChild(btnApagar);
    tr.appendChild(tdAcoes);

    return tr;
}

function render() {
    tabelaPessoas.innerHTML = "";

    if (pessoas.length === 0) {
        const tr = document.createElement("tr");
        const td = document.createElement("td");
        td.colSpan = 7;
        td.classList.add("vazio");

        /* =====================================================================
           [AJUDA PARA ENCONTRAR - PASSO 10: MENSAGEM DE TABELA VAZIA]
           ALTERE AQUI DESSA FORMA: Mude o texto entre aspas para personalizar
           o aviso quando ainda não houver ninguém cadastrado na lista.
           ===================================================================== */
        td.textContent = "Nenhuma pessoa cadastrada ainda";

        tr.appendChild(td);
        tabelaPessoas.appendChild(tr);
        return;
    }

    pessoas.forEach((pessoa) => {
        const linha = criarLinha(pessoa);
        tabelaPessoas.appendChild(linha);
    });
}

// =========================================================
// 4. LEITURA, VALIDAÇÃO E ERROS DO FORMULÁRIO
// =========================================================
function lerFormulario() {
    return {
        nome: inputNome.value.trim(),
        idade: Number(inputIdade.value),
        altura: Number(inputAltura.value),
        peso: Number(inputPeso.value)
    };
}

/* =========================================================================
   [AJUDA PARA ENCONTRAR - PASSO 11: MENSAGENS DE ERRO DA VALIDAÇÃO]
   ALTERE AQUI DESSA FORMA: Personalize os textos dentro de return "..."
   para deixar os alertas com a linguagem do seu sistema.
   ========================================================================= */
function validarDados(dados) {
    if (dados.nome.length < 2) {
        return "Informe o nome com no mínimo duas letras.";
    }
    if (!Number.isInteger(dados.idade) || dados.idade < 1 || dados.idade > 120) {
        return "A idade deve ser um número inteiro entre 1 e 120.";
    }
    if (Number.isNaN(dados.altura) || dados.altura < 0.5 || dados.altura > 2.5) {
        return "A altura deve estar entre 0,50 m e 2,50 m.";
    }
    if (Number.isNaN(dados.peso) || dados.peso < 2 || dados.peso > 500) {
        return "O peso deve estar entre 2 kg e 500 kg.";
    }
    return "";
}

function mostrarErro(mensagem) {
    mensagemDeErro.textContent = mensagem;
    mensagemDeErro.hidden = false;
}

function limparErro() {
    mensagemDeErro.textContent = "";
    mensagemDeErro.hidden = true;
}

// =========================================================
// 5. PERSISTÊNCIA (LOCALSTORAGE) E CRUD
// =========================================================
function salvar() {
    localStorage.setItem(CHAVE_PESSOAS, JSON.stringify(pessoas));
}

function carregarPessoas() {
    const dadosSalvos = localStorage.getItem(CHAVE_PESSOAS);
    if (!dadosSalvos) {
        return [];
    }

    try {
        const lista = JSON.parse(dadosSalvos);
        if (Array.isArray(lista)) {
            return lista;
        }
        return [];
    } catch (erro) {
        console.error("Erro ao carregar pessoas do localStorage:", erro);
        return [];
    }
}

function adicionarPessoa(dados) {
    pessoas.push({
        id: gerarCodigo(),
        nome: dados.nome,
        idade: dados.idade,
        altura: dados.altura,
        peso: dados.peso
    });
}

/* =========================================================================
   [AJUDA PARA ENCONTRAR - PASSO 12: CONFIRMAÇÃO ANTES DE APAGAR (OPCIONAL)]
   ALTERE AQUI DESSA FORMA: Se quiser pedir confirmação antes de excluir um
   registro, apague as duas barras (//) da linha com confirm abaixo:
   ========================================================================= */
function removerPessoa(id) {
    // if (!confirm("Tem certeza que deseja apagar este paciente?")) return;

    pessoas = pessoas.filter((pessoa) => pessoa.id !== id);
    salvar();
    render();
}

// =========================================================
// 6. EVENTOS E INICIALIZAÇÃO DA APLICAÇÃO
// =========================================================
formPessoa.addEventListener("submit", (e) => {
    e.preventDefault();

    const dados = lerFormulario();
    const erro = validarDados(dados);

    if (erro !== "") {
        mostrarErro(erro);
        return;
    }

    limparErro();
    adicionarPessoa(dados);
    salvar();
    formPessoa.reset();
    inputNome.focus();
    render();
});

btnCancelar.addEventListener("click", () => {
    limparErro();
});

// Carregamento inicial
let pessoas = carregarPessoas();
ajustarContadorCodigo();
render();
