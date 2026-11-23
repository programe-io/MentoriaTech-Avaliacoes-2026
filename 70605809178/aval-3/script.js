
/* =========================================
   CONTROLE DE IMC - SISTEMA CRUD
========================================= */

// Recupera os dados salvos no navegador
let pessoas = JSON.parse(localStorage.getItem("pessoasIMC")) || [];

// Elementos do HTML
const form = document.getElementById("formIMC");
const nomeInput = document.getElementById("nome");
const idadeInput = document.getElementById("idade");
const pesoInput = document.getElementById("peso");
const alturaInput = document.getElementById("altura");
const idInput = document.getElementById("idPessoa");

const listaPessoas = document.getElementById("listaPessoas");
const pesquisaInput = document.getElementById("pesquisa");

const totalPessoas = document.getElementById("totalPessoas");
const imcMedio = document.getElementById("imcMedio");
const ultimoCadastro = document.getElementById("ultimoCadastro");

const tituloFormulario = document.getElementById("tituloFormulario");
const btnSalvar = document.getElementById("btnSalvar");
const btnCancelar = document.getElementById("btnCancelar");

// =========================================
// SALVAR NO LOCALSTORAGE
// =========================================

function salvarDados() {
    localStorage.setItem("pessoasIMC", JSON.stringify(pessoas));
}

// =========================================
// CALCULAR IMC
// =========================================

function calcularIMC(peso, altura) {
    return peso / (altura * altura);
}

// =========================================
// CLASSIFICAR IMC
// =========================================

function classificarIMC(imc) {

    if (imc < 18.5) {
        return {
            texto: "Abaixo do peso",
            classe: "abaixo"
        };
    }

    if (imc < 25) {
        return {
            texto: "Peso adequado",
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

// =========================================
// CADASTRAR OU EDITAR
// =========================================

form.addEventListener("submit", function(event) {

    event.preventDefault();

    const nome = nomeInput.value.trim();
    const idade = Number(idadeInput.value);
    const peso = Number(pesoInput.value);
    const altura = Number(alturaInput.value);

    // Validação dos dados
    if (!nome || idade <= 0 || peso <= 0 || altura <= 0) {
        alert("Preencha todos os campos corretamente!");
        return;
    }

    const imc = calcularIMC(peso, altura);

    // Verifica se está editando
    if (idInput.value !== "") {

        const id = Number(idInput.value);

        pessoas = pessoas.map(function(pessoa) {

            if (pessoa.id === id) {
                return {
                    ...pessoa,
                    nome,
                    idade,
                    peso,
                    altura,
                    imc
                };
            }

            return pessoa;
        });

        alert("Cadastro atualizado com sucesso!");

    } else {

        // Novo cadastro
        const pessoa = {
            id: Date.now(),
            nome,
            idade,
            peso,
            altura,
            imc
        };

        pessoas.push(pessoa);

        alert("Pessoa cadastrada com sucesso!");
    }

    salvarDados();
    form.reset();
    cancelarEdicao();
    renderizar();
});

// =========================================
// LISTAR PESSOAS
// =========================================

function renderizar() {

    listaPessoas.innerHTML = "";

    const termo = pesquisaInput.value.toLowerCase();

    const pessoasFiltradas = pessoas.filter(function(pessoa) {
        return pessoa.nome.toLowerCase().includes(termo);
    });

    pessoasFiltradas.forEach(function(pessoa) {

        const classificacao = classificarIMC(pessoa.imc);

        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${escapeHTML(pessoa.nome)}</td>
            <td>${pessoa.idade}</td>
            <td>${pessoa.peso.toFixed(1)} kg</td>
            <td>${pessoa.altura.toFixed(2)} m</td>
            <td><strong>${pessoa.imc.toFixed(2)}</strong></td>

            <td>
                <span class="classificacao ${classificacao.classe}">
                    ${classificacao.texto}
                </span>
            </td>

            <td>
                <button class="btn-editar"
                    onclick="editarPessoa(${pessoa.id})">
                    Editar
                </button>

                <button class="btn-excluir"
                    onclick="excluirPessoa(${pessoa.id})">
                    Excluir
                </button>
            </td>
        `;

        listaPessoas.appendChild(tr);
    });

    atualizarDashboard();
}

// =========================================
// PROTEÇÃO CONTRA HTML INJETADO
// =========================================

function escapeHTML(texto) {
    return String(texto).replace(/[&<>"']/g, function(caractere) {
        const mapa = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        };

        return mapa[caractere];
    });
}

// =========================================
// EDITAR PESSOA
// =========================================

function editarPessoa(id) {

    const pessoa = pessoas.find(function(pessoa) {
        return pessoa.id === id;
    });

    if (!pessoa) return;

    idInput.value = pessoa.id;
    nomeInput.value = pessoa.nome;
    idadeInput.value = pessoa.idade;
    pesoInput.value = pessoa.peso;
    alturaInput.value = pessoa.altura;

    tituloFormulario.textContent = "Editar Cadastro";
    btnSalvar.textContent = "Atualizar Cadastro";
    btnCancelar.hidden = false;

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

// =========================================
// CANCELAR EDIÇÃO
// =========================================

function cancelarEdicao() {

    form.reset();
    idInput.value = "";

    tituloFormulario.textContent = "Cadastrar Pessoa";
    btnSalvar.textContent = "💾 Salvar Cadastro";
    btnCancelar.hidden = true;
}

// =========================================
// EXCLUIR PESSOA
// =========================================

function excluirPessoa(id) {

    const confirmar = confirm(
        "Deseja realmente excluir este cadastro?"
    );

    if (!confirmar) return;

    pessoas = pessoas.filter(function(pessoa) {
        return pessoa.id !== id;
    });

    salvarDados();
    renderizar();

    alert("Cadastro excluído!");
}

// =========================================
// ATUALIZAR INDICADORES
// =========================================

function atualizarDashboard() {

    totalPessoas.textContent = pessoas.length;

    if (pessoas.length > 0) {

        const somaIMC = pessoas.reduce(function(total, pessoa) {
            return total + pessoa.imc;
        }, 0);

        const media = somaIMC / pessoas.length;

        imcMedio.textContent = media.toFixed(2);

        ultimoCadastro.textContent =
            pessoas[pessoas.length - 1].nome;

    } else {

        imcMedio.textContent = "0.00";
        ultimoCadastro.textContent = "Nenhum";
    }
}

// =========================================
// PESQUISAR
// =========================================

pesquisaInput.addEventListener("input", renderizar);

// =========================================
// INICIALIZAÇÃO
// =========================================

renderizar();
    