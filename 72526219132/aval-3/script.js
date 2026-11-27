/* ==========================================================
   CALCULADORA DE IMC
   Cadastro, edição, remoção e armazenamento de pessoas.
   ========================================================== */


/* ---------- Dados e identificadores ---------- */

let contadorCodigo = 0;
const CHAVE_PESSOAS = "controle-imc-pessoas";

function gerarCodigo() {
    return ++contadorCodigo;
}

// Registros iniciais usados na primeira abertura do projeto.
let pessoas = [
    {
        id: gerarCodigo(),
        nome: "Maria Silva",
        idade: 30,
        altura: 1.65,
        peso: 60
    },
    {
        id: gerarCodigo(),
        nome: "João Souza",
        idade: 45,
        altura: 1.80,
        peso: 95
    }
];


/* ---------- Elementos do HTML ---------- */

const tabelaPessoas = document.getElementById("tabela-pessoas");
const formPessoa = document.getElementById("form-pessoa");

const inputNome = document.getElementById("input-nome");
const inputIdade = document.getElementById("input-idade");
const inputAltura = document.getElementById("input-altura");
const inputPeso = document.getElementById("input-peso");

const mensagemErro = document.getElementById("erro");
const tituloForm = document.getElementById("titulo-form");
const btnSalvar = document.getElementById("btn-salvar");
const btnCancelar = document.getElementById("btn-cancelar");

// Guarda o ID da pessoa que está sendo editada.
let idEmEdicao = null;


/* ---------- Carregamento inicial ---------- */

// Se já houver dados salvos, eles substituem os registros de exemplo.
// Também permite manter uma lista vazia após excluir todos os registros.

try {
    if (localStorage.getItem(CHAVE_PESSOAS) !== null) {
        pessoas = carregarPessoas();
    }
} catch (erro) {
    console.warn("Não foi possível acessar os dados salvos:", erro);
}

ajustarContadorCodigo();


/* ---------- Eventos do formulário ---------- */

formPessoa.addEventListener("submit", (e) => {

    e.preventDefault();

    const dados = lerFormulario();
    const erro = validarDados(dados);

    if (erro !== "") {
        mostrarErro(erro);
        return;
    }

    limparErro();

    const cadastroAtualizado = adicionarPessoa(dados);

    if (!cadastroAtualizado) {
        return;
    }

    salvarPessoas();

    formPessoa.reset();
    sairDoModoEdicao();

    inputNome.focus();

    render();

});


// Evento do botão cancelar.

btnCancelar.addEventListener("click", () => {

    formPessoa.reset();

    sairDoModoEdicao();
    limparErro();

    render();

    inputNome.focus();

});


// Delegação de eventos: um único evento atende aos botões
// Editar e Remover criados dinamicamente dentro da tabela.

tabelaPessoas.addEventListener("click", (e) => {

    const botao = e.target.closest("button[data-acao]");

    if (!botao) {
        return;
    }

    const linha = botao.closest("tr");

    if (!linha) {
        return;
    }

    const id = Number(linha.dataset.id);
    const acao = botao.dataset.acao;

    if (acao === "editar") {
        prepararEdicao(id);
    }

    if (acao === "remover") {
        removerPessoa(id);
    }

});


/* ---------- Leitura e cadastro ---------- */

function lerFormulario() {

    return {
        nome: inputNome.value.trim().replace(/\s+/g, " "),
        idade: Number(inputIdade.value),
        altura: Number(inputAltura.value),
        peso: Number(inputPeso.value)
    };

}


function adicionarPessoa(dados) {

    // Verifica se o formulário está sendo utilizado para edição.

    if (idEmEdicao !== null) {

        const indice = pessoas.findIndex(
            (pessoa) => Number(pessoa.id) === idEmEdicao
        );

        if (indice === -1) {
            mostrarErro("Não foi possível localizar o cadastro que está sendo editado.");
            return false;
        }

        // Atualiza os dados sem alterar o ID original.

        pessoas[indice] = {
            ...pessoas[indice],
            ...dados
        };

        idEmEdicao = null;

        return true;
    }

    // Novo cadastro recebe um identificador exclusivo.

    pessoas.push({
        id: gerarCodigo(),
        ...dados
    });

    return true;

}


/* ---------- Criação das linhas da tabela ---------- */

function criarCelula(texto) {

    const td = document.createElement("td");

    td.textContent = texto;

    return td;

}


function criarLinha(pessoa) {

    const imc = calcularImc(pessoa.peso, pessoa.altura);
    const classificacao = classificarImc(imc);

    const tr = document.createElement("tr");

    tr.dataset.id = pessoa.id;

    // Destaca a pessoa que está sendo editada.

    if (Number(pessoa.id) === idEmEdicao) {
        tr.classList.add("em-edicao");
    }

    // Informações da pessoa.

    tr.appendChild(criarCelula(pessoa.nome));

    tr.appendChild(criarCelula(String(pessoa.idade)));

    tr.appendChild(
        criarCelula(formatar(pessoa.altura, 2) + " m")
    );

    tr.appendChild(
        criarCelula(formatar(pessoa.peso, 1) + " kg")
    );

    tr.appendChild(
        criarCelula(formatar(imc, 1))
    );


    // Célula da classificação.

    const tdClassificacao = document.createElement("td");

    const selo = document.createElement("span");

    selo.classList.add("selo", classificacao.classe);

    selo.textContent = classificacao.texto;

    tdClassificacao.appendChild(selo);

    tr.appendChild(tdClassificacao);


    // Célula das ações.

    const tdAcoes = document.createElement("td");

    tdAcoes.classList.add("acoes");


    // Botão editar.

    const btnEditar = document.createElement("button");

    btnEditar.type = "button";

    btnEditar.dataset.acao = "editar";

    btnEditar.textContent = "Editar";

    btnEditar.setAttribute(
        "aria-label",
        `Editar ${pessoa.nome}`
    );


    // Botão remover.

    const btnRemover = document.createElement("button");

    btnRemover.type = "button";

    btnRemover.dataset.acao = "remover";

    btnRemover.classList.add("remover");

    btnRemover.textContent = "Remover";

    btnRemover.setAttribute(
        "aria-label",
        `Remover ${pessoa.nome}`
    );


    // Adiciona os botões à célula.

    tdAcoes.appendChild(btnEditar);

    tdAcoes.appendChild(btnRemover);

    tr.appendChild(tdAcoes);


    return tr;

}


/* ---------- Validação dos dados ---------- */

function validarDados(dados) {

    if (dados.nome.length < 2) {
        return "Informe o nome (mínimo 2 letras).";
    }

    if (dados.nome.length > 50) {
        return "O nome deve ter no máximo 50 caracteres.";
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
        return "A altura deve estar entre 0,50 e 2,50 metros.";
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


/* ---------- Mensagens de erro ---------- */

function mostrarErro(mensagem) {

    mensagemErro.textContent = mensagem;

    mensagemErro.hidden = false;

}


function limparErro() {

    mensagemErro.textContent = "";

    mensagemErro.hidden = true;

}


/* ---------- Funções de negócio ---------- */

// Calcula o IMC utilizando peso e altura.

function calcularImc(peso, altura) {

    return peso / (altura * altura);

}


// Classifica o resultado do IMC.

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


// Formata os números utilizando o padrão brasileiro.

function formatar(valor, casas) {

    return valor.toLocaleString("pt-BR", {
        minimumFractionDigits: casas,
        maximumFractionDigits: casas
    });

}


/* ---------- Edição de cadastro ---------- */

function prepararEdicao(id) {

    const pessoa = pessoas.find(
        (item) => Number(item.id) === Number(id)
    );

    if (!pessoa) {
        mostrarErro("Pessoa não encontrada para edição.");
        return;
    }

    idEmEdicao = Number(pessoa.id);

    // Preenche os campos com os dados existentes.

    inputNome.value = pessoa.nome;

    inputIdade.value = pessoa.idade;

    inputAltura.value = pessoa.altura;

    inputPeso.value = pessoa.peso;


    // Atualiza o título e os botões do formulário.

    tituloForm.textContent = "Editar pessoa";

    btnSalvar.textContent = "Atualizar";

    btnCancelar.hidden = false;

    limparErro();

    render();

    inputNome.focus();

}


// Retorna o formulário ao modo de cadastro.

function sairDoModoEdicao() {

    idEmEdicao = null;

    tituloForm.textContent = "Nova pessoa";

    btnSalvar.textContent = "Salvar";

    btnCancelar.hidden = true;

}


/* ---------- Remoção de cadastro ---------- */

function removerPessoa(id) {

    const indice = pessoas.findIndex(
        (pessoa) => Number(pessoa.id) === Number(id)
    );

    if (indice === -1) {
        return;
    }

    const pessoa = pessoas[indice];

    const confirmou = window.confirm(
        `Deseja realmente remover o cadastro de ${pessoa.nome}?`
    );

    if (!confirmou) {
        return;
    }

    // Remove a pessoa da lista.

    pessoas.splice(indice, 1);


    // Se a pessoa removida estava em edição,
    // encerra o modo de edição.

    if (idEmEdicao === Number(id)) {

        formPessoa.reset();

        sairDoModoEdicao();

    }

    limparErro();

    salvarPessoas();

    render();

}


/* ---------- LocalStorage ---------- */

// Salva a lista de pessoas no navegador.

function salvarPessoas() {

    try {

        localStorage.setItem(
            CHAVE_PESSOAS,
            JSON.stringify(pessoas)
        );

        return true;

    } catch (erro) {

        console.error(
            "Não foi possível salvar os cadastros:",
            erro
        );

        mostrarErro(
            "Não foi possível salvar os dados no navegador."
        );

        return false;

    }

}


// Recupera os dados armazenados no navegador.

function carregarPessoas() {

    try {

        const texto = localStorage.getItem(CHAVE_PESSOAS);

        if (texto === null) {
            return [];
        }

        const dados = JSON.parse(texto);

        if (Array.isArray(dados)) {

            // Confere os registros salvos antes de utilizá-los.

            return dados

                .filter(
                    (pessoa) => pessoa && typeof pessoa === "object"
                )

                .map((pessoa) => ({
                    id: Number(pessoa.id),
                    nome: String(pessoa.nome ?? "").trim(),
                    idade: Number(pessoa.idade),
                    altura: Number(pessoa.altura),
                    peso: Number(pessoa.peso)
                }))

                .filter((pessoa) =>

                    Number.isInteger(pessoa.id) &&
                    pessoa.id > 0 &&
                    validarDados(pessoa) === ""

                );

        }

    } catch (erro) {

        console.log("Dados salvos inválidos:", erro);

    }

    return [];

}


// Ajusta o contador para evitar IDs repetidos
// depois de carregar os dados armazenados.

function ajustarContadorCodigo() {

    let maior = 0;

    pessoas.forEach((pessoa) => {

        const id = Number(pessoa.id);

        if (Number.isInteger(id) && id > maior) {
            maior = id;
        }

    });

    contadorCodigo = maior;

}


/* ---------- Renderização da tabela ---------- */

function render() {

    // Limpa o conteúdo atual da tabela.

    tabelaPessoas.innerHTML = "";


    // Verifica se existem pessoas cadastradas.

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


    // Percorre a lista e cria uma linha para cada pessoa.

    pessoas.forEach((pessoa) => {

        tabelaPessoas.appendChild(
            criarLinha(pessoa)
        );

    });

}


/* ---------- Inicialização ---------- */

render();
