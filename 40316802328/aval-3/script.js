
/* =================================
   CONFIGURAÇÕES E ELEMENTOS
================================= */

const CHAVE_STORAGE = "historico_pessoas_imc";

const tabelaPessoas = document.getElementById("tabela-pessoas");
const formPessoa = document.getElementById("form-pessoa");

const inputNome = document.getElementById("input-nome");
const inputIdade = document.getElementById("input-idade");
const inputAltura = document.getElementById("input-altura");
const inputPeso = document.getElementById("input-peso");

const tituloForm = document.getElementById("titulo-form");
const btnSalvar = document.getElementById("btn-salvar");
const btnCancelar = document.getElementById("btn-cancelar");
const erro = document.getElementById("erro");

const totalPessoas = document.getElementById("total-pessoas");
const mediaImc = document.getElementById("media-imc");
const contador = document.getElementById("contador");


/* =================================
   DADOS E ARMAZENAMENTO
================================= */

// Carregar pessoas salvas no navegador

function carregarPessoas() {

    try {

        const dados = localStorage.getItem(CHAVE_STORAGE);

        if (!dados) {
            return [];
        }

        const resultado = JSON.parse(dados);

        if (!Array.isArray(resultado)) {
            return [];
        }

        return resultado.filter(pessoa =>
            pessoa &&
            typeof pessoa.id === "string" &&
            typeof pessoa.nome === "string" &&
            Number.isInteger(pessoa.idade) &&
            Number.isFinite(pessoa.altura) &&
            Number.isFinite(pessoa.peso) &&
            pessoa.altura > 0 &&
            pessoa.peso > 0
        );

    } catch (error) {

        console.error("Erro ao carregar histórico:", error);

        return [];

    }

}


// Lista de pessoas

let pessoas = carregarPessoas();

let idEmEdicao = null;


// Salvar dados no navegador

function salvarStorage(novosDados) {

    try {

        localStorage.setItem(
            CHAVE_STORAGE,
            JSON.stringify(novosDados)
        );

        return true;

    } catch (error) {

        console.error("Erro ao salvar:", error);

        alert("Não foi possível salvar os dados no navegador.");

        return false;

    }

}


// Gerar identificador único

function gerarCodigo() {

    return Date.now().toString() +
        Math.random().toString(36).substring(2, 7);

}


/* =================================
   FUNÇÕES DE NEGÓCIO
================================= */

// Calcular IMC

function calcularIMC(peso, altura) {

    return peso / (altura * altura);

}


// Classificar IMC

function classificarImc(imc) {

    if (imc < 18.5) {

        return {
            texto: "Abaixo do peso",
            classe: "abaixo"
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
        classe: "obesidade"
    };

}


// Formatar números

function formatar(valor, casas) {

    return Number(valor).toLocaleString("pt-BR", {

        minimumFractionDigits: casas,

        maximumFractionDigits: casas

    });

}


/* =================================
   LER FORMULÁRIO
================================= */

function lerFormulario() {

    return {

        nome: inputNome.value.trim(),

        idade: Number(inputIdade.value),

        altura: Number(inputAltura.value),

        peso: Number(inputPeso.value)

    };

}


/* =================================
   VALIDAR FORMULÁRIO
================================= */

function validarFormulario(dados) {

    if (!dados.nome) {

        return "Informe o nome do paciente.";

    }

    if (
        !Number.isInteger(dados.idade) ||
        dados.idade < 1 ||
        dados.idade > 126
    ) {

        return "Informe uma idade válida entre 1 e 126 anos.";

    }

    if (
        !Number.isFinite(dados.altura) ||
        dados.altura < 0.5 ||
        dados.altura > 2.5
    ) {

        return "Informe uma altura entre 0,50 m e 2,50 m.";

    }

    if (
        !Number.isFinite(dados.peso) ||
        dados.peso < 1 ||
        dados.peso > 500
    ) {

        return "Informe um peso entre 1 e 500 kg.";

    }

    return "";

}


/* =================================
   CADASTRAR PESSOA
================================= */

function adicionarPessoa(dados) {

    const novaPessoa = {

        id: gerarCodigo(),

        nome: dados.nome,

        idade: dados.idade,

        altura: dados.altura,

        peso: dados.peso

    };

    const novaLista = [...pessoas, novaPessoa];

    if (salvarStorage(novaLista)) {

        pessoas = novaLista;

        return true;

    }

    return false;

}


/* =================================
   EDITAR PESSOA
================================= */

function editarPessoa(id) {

    const pessoa = pessoas.find(
        pessoa => pessoa.id === id
    );

    if (!pessoa) return;

    idEmEdicao = id;

    inputNome.value = pessoa.nome;

    inputIdade.value = pessoa.idade;

    inputAltura.value = pessoa.altura;

    inputPeso.value = pessoa.peso;

    tituloForm.textContent = "Editar pessoa";

    btnSalvar.textContent = "Salvar alterações";

    btnCancelar.hidden = false;

    erro.hidden = true;

    inputNome.focus();

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


// Atualizar pessoa

function atualizarPessoa(id, dados) {

    const novaLista = pessoas.map(pessoa => {

        if (pessoa.id === id) {

            return {

                ...pessoa,

                ...dados

            };

        }

        return pessoa;

    });

    if (salvarStorage(novaLista)) {

        pessoas = novaLista;

        return true;

    }

    return false;

}


/* =================================
   EXCLUIR PESSOA DO HISTÓRICO
================================= */

function excluirPessoa(id) {

    const pessoa = pessoas.find(
        pessoa => pessoa.id === id
    );

    if (!pessoa) return;

    const confirmar = confirm(
        `Deseja realmente excluir ${pessoa.nome} do histórico?`
    );

    if (!confirmar) return;

    const novaLista = pessoas.filter(
        pessoa => pessoa.id !== id
    );

    if (!salvarStorage(novaLista)) {
        return;
    }

    pessoas = novaLista;

    // Cancelar edição caso seja a pessoa excluída

    if (idEmEdicao === id) {

        cancelarEdicao();

    }

    render();

    alert("Pessoa excluída com sucesso!");

}


/* =================================
   CANCELAR EDIÇÃO
================================= */

function cancelarEdicao() {

    idEmEdicao = null;

    formPessoa.reset();

    tituloForm.textContent = "Nova pessoa";

    btnSalvar.textContent = "+ Salvar pessoa";

    btnCancelar.hidden = true;

    erro.hidden = true;

}


/* =================================
   CRIAR CÉLULAS DA TABELA
================================= */

function criarCelula(texto) {

    const td = document.createElement("td");

    td.textContent = texto;

    return td;

}


/* =================================
   CRIAR LINHA DA TABELA
================================= */

function criarLinha(pessoa) {

    // Calcular IMC

    const imc = calcularIMC(
        pessoa.peso,
        pessoa.altura
    );

    // Classificar resultado

    const classificacao = classificarImc(imc);

    const tr = document.createElement("tr");


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

    selo.classList.add(
        "selo",
        classificacao.classe
    );

    selo.textContent = classificacao.texto;

    tdClassificacao.appendChild(selo);

    tr.appendChild(tdClassificacao);


    // Ações

    const tdAcoes = document.createElement("td");

    const divAcoes = document.createElement("div");

    divAcoes.classList.add("acoes");


    // Botão editar

    const btnEditar = document.createElement("button");

    btnEditar.type = "button";

    btnEditar.classList.add("btn-editar");

    btnEditar.textContent = "Editar";

    btnEditar.dataset.acao = "editar";

    btnEditar.dataset.id = pessoa.id;


    // Botão excluir

    const btnExcluir = document.createElement("button");

    btnExcluir.type = "button";

    btnExcluir.classList.add("btn-excluir");

    btnExcluir.textContent = "Excluir";

    btnExcluir.dataset.acao = "excluir";

    btnExcluir.dataset.id = pessoa.id;


    // Adicionar botões

    divAcoes.appendChild(btnEditar);

    divAcoes.appendChild(btnExcluir);

    tdAcoes.appendChild(divAcoes);

    tr.appendChild(tdAcoes);


    return tr;

}


/* =================================
   ATUALIZAR INDICADORES
================================= */

function atualizarIndicadores() {

    const total = pessoas.length;

    // Quantidade de pessoas

    totalPessoas.textContent = total;

    contador.textContent =
        total + (total === 1 ? " registro" : " registros");


    // Média de IMC

    if (total === 0) {

        mediaImc.textContent = "0,0";

        return;

    }


    const somaImc = pessoas.reduce(

        (soma, pessoa) => {

            return soma + calcularIMC(
                pessoa.peso,
                pessoa.altura
            );

        },

        0

    );


    const media = somaImc / total;

    mediaImc.textContent = formatar(media, 1);

}


/* =================================
   RENDERIZAR TABELA
================================= */

function render() {

    // Limpar tabela

    tabelaPessoas.innerHTML = "";


    // Atualizar indicadores

    atualizarIndicadores();


    // Verificar se existem pessoas

    if (pessoas.length === 0) {

        const tr = document.createElement("tr");

        const td = document.createElement("td");

        td.colSpan = 7;

        td.classList.add("vazio");

        td.textContent =
            "Nenhuma pessoa cadastrada ainda. Adicione um paciente acima!";

        tr.appendChild(td);

        tabelaPessoas.appendChild(tr);

        return;

    }


    // Mostrar pessoas cadastradas

    pessoas.forEach(pessoa => {

        tabelaPessoas.appendChild(
            criarLinha(pessoa)
        );

    });

}


/* =================================
   EVENTO DO FORMULÁRIO
================================= */

formPessoa.addEventListener("submit", function(e) {

    e.preventDefault();


    // Ler informações

    const dados = lerFormulario();


    // Validar informações

    const mensagemErro = validarFormulario(dados);


    if (mensagemErro) {

        erro.textContent = mensagemErro;

        erro.hidden = false;

        return;

    }


    erro.hidden = true;


    // Verificar se está editando ou cadastrando

    let sucesso = false;

    if (idEmEdicao !== null) {

        sucesso = atualizarPessoa(idEmEdicao, dados);

        if (sucesso) {

            alert("Dados atualizados com sucesso!");

        }

    } else {

        sucesso = adicionarPessoa(dados);

        if (sucesso) {

            alert("Pessoa cadastrada com sucesso!");

        }

    }


    // Se não salvou, manter os dados no formulário

    if (!sucesso) return;


    // Limpar formulário

    cancelarEdicao();


    // Atualizar tabela

    render();

});


/* =================================
   EVENTOS DOS BOTÕES DA TABELA
================================= */

tabelaPessoas.addEventListener("click", function(e) {

    const botao = e.target.closest("button");

    if (!botao) return;


    const id = botao.dataset.id;

    const acao = botao.dataset.acao;


    // Editar

    if (acao === "editar") {

        editarPessoa(id);

    }


    // Excluir

    if (acao === "excluir") {

        excluirPessoa(id);

    }

});


/* =================================
   BOTÃO CANCELAR
================================= */

btnCancelar.addEventListener("click", function() {

    cancelarEdicao();

});


/* =================================
   INICIALIZAR PROJETO
================================= */

// Mostrar histórico ao abrir a página

render();

