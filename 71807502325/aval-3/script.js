
// ==========================================
// PROJETO FICHA DE ANAMNESE - CONTROLE DE IMC
// ==========================================


// ==========================================
// 1. VARIÁVEIS E REFERÊNCIAS DO HTML
// ==========================================

// Chave utilizada no localStorage
const CHAVE_PESSOAS = "pessoas";

// Contador de códigos
let contadorCodigo = 0;

// Carregar pessoas salvas
let pessoas = carregarPessoas();

// Referências do formulário
const formPessoa = document.getElementById("formPessoa");

const inputNome = document.getElementById("nome");

const inputIdade = document.getElementById("idade");

const inputAltura = document.getElementById("altura");

const inputPeso = document.getElementById("peso");

// Referência da tabela
const tabelaPessoas = document.getElementById("tabelaPessoas");

// Referência da mensagem de erro
const mensagemDeErro = document.getElementById("erro");


// ==========================================
// 2. GERAR CÓDIGO AUTOMÁTICO
// ==========================================

function gerarCodigo() {

    return ++contadorCodigo;

}


// ==========================================
// 3. CRIAR CÉLULA DA TABELA
// ==========================================

function criarCelula(valor) {

    const td = document.createElement("td");

    td.textContent = valor;

    return td;

}


// ==========================================
// 4. CALCULAR IMC
// ==========================================

function calcularIMC(peso, altura) {

    return peso / (altura * altura);

}


// ==========================================
// 5. CLASSIFICAR IMC
// ==========================================

function classificarIMC(imc, idade) {

    // A classificação adulta não deve ser aplicada
    // automaticamente a crianças e adolescentes.

    if (idade < 20) {

        return {
            texto: "Avaliação específica",
            classe: "nao-avaliado"
        };

    }

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
// 6. FORMATAR VALORES NUMÉRICOS
// ==========================================

function formatar(valor, casasDecimais) {

    return valor.toLocaleString("pt-BR", {

        minimumFractionDigits: casasDecimais,

        maximumFractionDigits: casasDecimais

    });

}


// ==========================================
// 7. CRIAR LINHA DA TABELA
// ==========================================

function criarLinha(pessoa) {

    const tr = document.createElement("tr");

    // Identificador da pessoa
    tr.dataset.id = pessoa.id;

    // Calcular IMC
    const imc = calcularIMC(
        pessoa.peso,
        pessoa.altura
    );

    // Classificar IMC
    const classificacao = classificarIMC(
        imc,
        pessoa.idade
    );

    // Colunas básicas
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

    // Coluna de classificação
    const tdClassificacao = document.createElement("td");

    const selo = document.createElement("span");

    selo.classList.add(
        "selo",
        classificacao.classe
    );

    selo.textContent = classificacao.texto;

    tdClassificacao.appendChild(selo);

    tr.appendChild(tdClassificacao);

    // Coluna de ações
    const tdAcoes = document.createElement("td");

    const botaoExcluir = document.createElement("button");

    botaoExcluir.textContent = "Excluir";

    botaoExcluir.className = "btn-excluir";

    botaoExcluir.addEventListener("click", () => {

        excluirPessoa(pessoa.id);

    });

    tdAcoes.appendChild(botaoExcluir);

    tr.appendChild(tdAcoes);

    return tr;

}


// ==========================================
// 8. FUNÇÃO DE RENDERIZAÇÃO
// ==========================================

function render() {

    // Limpar tabela
    tabelaPessoas.innerHTML = "";

    // Verificar se existem pessoas
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

    // Percorrer pessoas cadastradas
    pessoas.forEach((pessoa) => {

        const linha = criarLinha(pessoa);

        tabelaPessoas.appendChild(linha);

    });

}


// ==========================================
// 9. LER DADOS DO FORMULÁRIO
// ==========================================

function lerFormulario() {

    return {

        nome: inputNome.value.trim(),

        idade: Number(inputIdade.value),

        altura: Number(inputAltura.value),

        peso: Number(inputPeso.value)

    };

}


// ==========================================
// 10. VALIDAR DADOS
// ==========================================

function validarDados(dados) {

    if (
        typeof dados.nome !== "string" ||
        dados.nome.length < 2
    ) {

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


// ==========================================
// 11. ADICIONAR PESSOA
// ==========================================

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


// ==========================================
// 12. MOSTRAR MENSAGEM DE ERRO
// ==========================================

function mostrarErro(mensagem) {

    mensagemDeErro.textContent = mensagem;

    mensagemDeErro.hidden = false;

}


// ==========================================
// 13. LIMPAR MENSAGEM DE ERRO
// ==========================================

function limparErro() {

    mensagemDeErro.textContent = "";

    mensagemDeErro.hidden = true;

}


// ==========================================
// 14. SALVAR NO LOCALSTORAGE
// ==========================================

function salvar() {

    try {

        localStorage.setItem(
            CHAVE_PESSOAS,
            JSON.stringify(pessoas)
        );

    } catch (erro) {

        console.error("Erro ao salvar os dados:", erro);

        throw new Error(
            "Não foi possível salvar os dados neste navegador."
        );

    }

}


// ==========================================
// 15. CARREGAR PESSOAS SALVAS
// ==========================================

function carregarPessoas() {

    try {

        const dados = localStorage.getItem(CHAVE_PESSOAS);

        // Se não existir informação, retornar array vazio
        if (dados === null) {

            return [];

        }

        // Converter texto para array
        const pessoasSalvas = JSON.parse(dados);

        // Verificar se o conteúdo é um array
        if (!Array.isArray(pessoasSalvas)) {

            throw new Error("Os dados armazenados são inválidos.");

        }

        return pessoasSalvas;

    } catch (erro) {

        console.error("Erro ao carregar pessoas:", erro);

        return [];

    }

}


// ==========================================
// 16. AJUSTAR CONTADOR DE CÓDIGO
// ==========================================

function ajustarContadorCodigo() {

    let maior = 0;

    pessoas.forEach((pessoa) => {

        if (
            Number.isInteger(pessoa.id) &&
            pessoa.id > maior
        ) {

            maior = pessoa.id;

        }

    });

    contadorCodigo = maior;

}


// ==========================================
// 17. EXCLUIR PESSOA
// ==========================================

function excluirPessoa(id) {

    const pessoa = pessoas.find(
        (item) => item.id === id
    );

    if (!pessoa) {

        alert("Paciente não encontrado.");

        return;

    }

    const confirmar = confirm(
        `Deseja excluir o cadastro de ${pessoa.nome}?`
    );

    if (!confirmar) return;

    // Criar nova lista sem o paciente excluído
    const pessoasAnteriores = pessoas;

    pessoas = pessoas.filter(
        (item) => item.id !== id
    );

    try {

        // Salvar alterações
        salvar();

        // Atualizar tabela
        render();

        alert("Paciente excluído com sucesso!");

    } catch (erro) {

        // Restaurar dados caso não consiga salvar
        pessoas = pessoasAnteriores;

        alert(erro.message);

    }

}


// ==========================================
// 18. EVENTO DE ENVIO DO FORMULÁRIO
// ==========================================

formPessoa.addEventListener("submit", (evento) => {

    evento.preventDefault();

    // Ler informações
    const dados = lerFormulario();

    // Validar informações
    const erro = validarDados(dados);

    // Verificar se existe erro
    if (erro !== "") {

        mostrarErro(erro);

        return;

    }

    limparErro();

    // Adicionar pessoa
    const pessoaAdicionada = adicionarPessoa(dados);

    try {

        // Salvar no navegador
        salvar();

        // Atualizar tabela
        render();

        // Limpar formulário
        formPessoa.reset();

        // Focar no campo nome
        inputNome.focus();

    } catch (erro) {

        // Desfazer cadastro se o armazenamento falhar
        pessoas = pessoas.filter(
            (pessoa) => pessoa.id !== pessoaAdicionada.id
        );

        // Restaurar contador
        contadorCodigo = Math.max(
            0,
            ...pessoas.map((pessoa) => pessoa.id)
        );

        mostrarErro(erro.message);

    }

});


// ==========================================
// 19. EVENTO DO BOTÃO CANCELAR
// ==========================================

formPessoa.addEventListener("reset", () => {

    limparErro();

});


// ==========================================
// 20. INICIALIZAÇÃO DO SISTEMA
// ==========================================

// Ajustar contador de códigos
ajustarContadorCodigo();

// Exibir pessoas salvas
render();

