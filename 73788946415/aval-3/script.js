
/* ==========================================================
   FICHA DE ANAMNESE - CALCULADORA DE IMC
   Arquivo: app.js
   ========================================================== */

// ---------- 1. Elementos do HTML ----------

const formPessoa = document.getElementById("form-pessoa");

const inputNome = document.getElementById("input-nome");
const inputIdade = document.getElementById("input-idade");
const inputAltura = document.getElementById("input-altura");
const inputPeso = document.getElementById("input-peso");

const tabelaPessoas = document.getElementById("tabela-pessoas");
const mensagemErro = document.getElementById("erro");

const tituloForm = document.getElementById("titulo-form");
const btnSalvar = document.getElementById("btn-salvar");
const btnCancelar = document.getElementById("btn-cancelar");


// ---------- 2. Armazenamento ----------

const CHAVE_PESSOAS = "pessoas";

const dadosIniciais = [
    {
        id: 1,
        nome: "Maria",
        idade: 25,
        altura: 1.65,
        peso: 60
    },
    {
        id: 2,
        nome: "João",
        idade: 32,
        altura: 1.78,
        peso: 82
    },
    {
        id: 3,
        nome: "Francisco",
        idade: 30,
        altura: 1.70,
        peso: 65
    }
];

let pessoas = carregarPessoas();
let proximoId = ajustarContador();
let idEdicao = null;


// ---------- 3. Calcular IMC ----------

function calcularIMC(peso, altura) {
    return peso / (altura * altura);
}


// ---------- 4. Classificar IMC ----------

function classificarIMC(imc) {

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

    return {
        texto: "Obesidade",
        classe: "obesidade"
    };
}


// ---------- 5. Formatar números ----------

function formatar(valor, casas = 2) {
    return Number(valor).toFixed(casas);
}


// ---------- 6. Criar linha da tabela ----------

function criarLinha(pessoa) {

    const tr = document.createElement("tr");

    const imc = calcularIMC(pessoa.peso, pessoa.altura);
    const classificacao = classificarIMC(imc);

    if (pessoa.id === idEdicao) {
        tr.classList.add("em-edicao");
    }

    // Nome
    const tdNome = document.createElement("td");
    tdNome.textContent = pessoa.nome;
    tr.appendChild(tdNome);

    // Idade
    const tdIdade = document.createElement("td");
    tdIdade.textContent = pessoa.idade;
    tr.appendChild(tdIdade);

    // Altura
    const tdAltura = document.createElement("td");
    tdAltura.textContent = formatar(pessoa.altura) + " m";
    tr.appendChild(tdAltura);

    // Peso
    const tdPeso = document.createElement("td");
    tdPeso.textContent = formatar(pessoa.peso, 1) + " kg";
    tr.appendChild(tdPeso);

    // IMC
    const tdIMC = document.createElement("td");
    tdIMC.textContent = formatar(imc, 1);
    tr.appendChild(tdIMC);

    // Classificação
    const tdClassificacao = document.createElement("td");
    const selo = document.createElement("span");

    selo.classList.add("selo", classificacao.classe);
    selo.textContent = classificacao.texto;

    tdClassificacao.appendChild(selo);
    tr.appendChild(tdClassificacao);

    // Ações
    const tdAcoes = document.createElement("td");
    tdAcoes.classList.add("acoes");

    // Botão editar
    const btnEditar = document.createElement("button");
    btnEditar.type = "button";
    btnEditar.textContent = "Editar";

    btnEditar.addEventListener("click", function () {
        editarPessoa(pessoa.id);
    });

    // Botão excluir
    const btnExcluir = document.createElement("button");
    btnExcluir.type = "button";
    btnExcluir.textContent = "Excluir";
    btnExcluir.classList.add("remover");

    btnExcluir.addEventListener("click", function () {
        excluirPessoa(pessoa.id);
    });

    tdAcoes.appendChild(btnEditar);
    tdAcoes.appendChild(btnExcluir);

    tr.appendChild(tdAcoes);

    return tr;
}


// ---------- 7. Renderizar tabela ----------

function render() {

    tabelaPessoas.replaceChildren();

    if (pessoas.length === 0) {

        const tr = document.createElement("tr");
        const td = document.createElement("td");

        td.colSpan = 7;
        td.classList.add("vazio");
        td.textContent = "Nenhuma pessoa cadastrada.";

        tr.appendChild(td);
        tabelaPessoas.appendChild(tr);

        return;
    }

    pessoas.forEach(function (pessoa) {
        tabelaPessoas.appendChild(criarLinha(pessoa));
    });
}


// ---------- 8. Ler formulário ----------

function lerFormulario() {

    return {
        nome: inputNome.value.trim(),
        idade: Number(inputIdade.value),
        altura: Number(inputAltura.value),
        peso: Number(inputPeso.value)
    };
}


// ---------- 9. Validar dados ----------

function validarDados(dados) {

    if (dados.nome.length < 2) {
        return "Informe um nome com no mínimo duas letras.";
    }

    if (
        inputIdade.value === "" ||
        !Number.isInteger(dados.idade) ||
        dados.idade < 1 ||
        dados.idade > 120
    ) {
        return "A idade deve estar entre 1 e 120 anos.";
    }

    if (
        inputAltura.value === "" ||
        !Number.isFinite(dados.altura) ||
        dados.altura < 0.5 ||
        dados.altura > 2.5
    ) {
        return "A altura deve estar entre 0,5 e 2,5 metros.";
    }

    if (
        inputPeso.value === "" ||
        !Number.isFinite(dados.peso) ||
        dados.peso < 2 ||
        dados.peso > 500
    ) {
        return "O peso deve estar entre 2 e 500 kg.";
    }

    return "";
}


// ---------- 10. Mensagens de erro ----------

function mostrarErro(mensagem) {
    mensagemErro.textContent = mensagem;
    mensagemErro.hidden = false;
}

function limparErro() {

    mensagemErro.textContent = "";
    mensagemErro.hidden = true;

    document.querySelectorAll("input").forEach(function (input) {
        input.classList.remove("invalido");
    });
}


// ---------- 11. Adicionar pessoa ----------

function adicionarPessoa(dados) {

    const pessoa = {
        id: proximoId++,
        nome: dados.nome,
        idade: dados.idade,
        altura: dados.altura,
        peso: dados.peso
    };

    pessoas.push(pessoa);
}


// ---------- 12. Salvar no localStorage ----------

function salvarPessoas() {

    try {

        localStorage.setItem(
            CHAVE_PESSOAS,
            JSON.stringify(pessoas)
        );

        return true;

    } catch (erro) {

        console.error("Erro ao salvar:", erro);

        mostrarErro("Não foi possível salvar os dados.");

        return false;
    }
}


// ---------- 13. Carregar pessoas ----------

function carregarPessoas() {

    try {

        const dadosSalvos = localStorage.getItem(CHAVE_PESSOAS);

        // Primeiro acesso: cadastrar exemplos
        if (dadosSalvos === null) {

            localStorage.setItem(
                CHAVE_PESSOAS,
                JSON.stringify(dadosIniciais)
            );

            return dadosIniciais.map(pessoa => ({ ...pessoa }));
        }

        const lista = JSON.parse(dadosSalvos);

        if (!Array.isArray(lista)) {
            return [];
        }

        return lista.filter(function (pessoa) {

            return (
                Number.isInteger(pessoa.id) &&
                pessoa.id > 0 &&
                typeof pessoa.nome === "string" &&
                Number.isInteger(pessoa.idade) &&
                Number.isFinite(pessoa.altura) &&
                Number.isFinite(pessoa.peso) &&
                pessoa.altura > 0 &&
                pessoa.peso > 0
            );
        });

    } catch (erro) {

        console.error("Erro ao carregar:", erro);

        return [];
    }
}


// ---------- 14. Ajustar contador de código ----------

function ajustarContador() {

    let maior = 0;

    pessoas.forEach(function (pessoa) {

        if (pessoa.id > maior) {
            maior = pessoa.id;
        }

    });

    return maior + 1;
}


// ---------- 15. Editar pessoa ----------

function editarPessoa(id) {

    const pessoa = pessoas.find(function (p) {
        return p.id === id;
    });

    if (!pessoa) return;

    idEdicao = id;

    inputNome.value = pessoa.nome;
    inputIdade.value = pessoa.idade;
    inputAltura.value = pessoa.altura;
    inputPeso.value = pessoa.peso;

    tituloForm.textContent = "Editar pessoa";
    btnSalvar.textContent = "Atualizar cadastro";
    btnCancelar.hidden = false;

    limparErro();
    render();

    inputNome.focus();
}


// ---------- 16. Excluir pessoa ----------

function excluirPessoa(id) {

    const pessoa = pessoas.find(function (p) {
        return p.id === id;
    });

    if (!pessoa) return;

    const confirmar = confirm(
        "Deseja realmente excluir " + pessoa.nome + "?"
    );

    if (!confirmar) return;

    const listaAnterior = pessoas;

    pessoas = pessoas.filter(function (p) {
        return p.id !== id;
    });

    if (!salvarPessoas()) {
        pessoas = listaAnterior;
        render();
        return;
    }

    if (idEdicao === id) {
        cancelarEdicao();
    } else {
        render();
    }
}


// ---------- 17. Cancelar edição ----------

function cancelarEdicao() {

    formPessoa.reset();

    idEdicao = null;

    tituloForm.textContent = "Cadastrar nova pessoa";
    btnSalvar.textContent = "Salvar cadastro";
    btnCancelar.hidden = true;

    limparErro();
    render();
}


// ---------- 18. Evento do formulário ----------

formPessoa.addEventListener("submit", function (e) {

    e.preventDefault();

    const dados = lerFormulario();
    const erro = validarDados(dados);

    if (erro !== "") {
        mostrarErro(erro);
        return;
    }

    limparErro();

    const listaAnterior = pessoas.map(p => ({ ...p }));
    const contadorAnterior = proximoId;

    if (idEdicao === null) {

        adicionarPessoa(dados);

    } else {

        const pessoa = pessoas.find(function (p) {
            return p.id === idEdicao;
        });

        if (pessoa) {
            pessoa.nome = dados.nome;
            pessoa.idade = dados.idade;
            pessoa.altura = dados.altura;
            pessoa.peso = dados.peso;
        }
    }

    if (!salvarPessoas()) {

        pessoas = listaAnterior;
        proximoId = contadorAnterior;

        render();

        return;
    }

    formPessoa.reset();

    idEdicao = null;

    tituloForm.textContent = "Cadastrar nova pessoa";
    btnSalvar.textContent = "Salvar cadastro";
    btnCancelar.hidden = true;

    inputNome.focus();

    render();
});


// ---------- 19. Botão cancelar ----------

btnCancelar.addEventListener("click", cancelarEdicao);


// ---------- 20. Iniciar aplicação ----------

render();
