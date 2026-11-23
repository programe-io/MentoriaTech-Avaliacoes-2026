
const form = document.getElementById("form-pessoa");

const nome = document.getElementById("nome");
const idade = document.getElementById("idade");
const altura = document.getElementById("altura");
const peso = document.getElementById("peso");

const tabela = document.getElementById("tabela-pessoas");
const mensagem = document.getElementById("mensagem");
const vazio = document.getElementById("vazio");

const btnSalvar = document.getElementById("btn-salvar");
const btnCancelar = document.getElementById("btn-cancelar");

const pesquisa = document.getElementById("pesquisa");

const totalPessoas = document.getElementById("total-pessoas");
const mediaIMC = document.getElementById("media-imc");

const CHAVE = "calculadora_imc_codepen";

let pessoas = [];
let idEditando = null;
let proximoId = 1;


// CARREGAR DADOS SALVOS

function carregarDados() {
    try {
        const dados = localStorage.getItem(CHAVE);

        pessoas = dados ? JSON.parse(dados) : [];

        if (!Array.isArray(pessoas)) {
            pessoas = [];
        }

        proximoId = pessoas.reduce((maior, pessoa) => {
            return Math.max(maior, Number(pessoa.id) || 0);
        }, 0) + 1;

    } catch (erro) {
        pessoas = [];
        mensagem.textContent = "Erro ao carregar os cadastros.";
    }
}


// SALVAR DADOS

function salvarDados() {
    try {
        localStorage.setItem(CHAVE, JSON.stringify(pessoas));
        return true;

    } catch (erro) {
        mensagem.textContent = "Não foi possível salvar os dados.";
        return false;
    }
}


// CALCULAR IMC

function calcularIMC(peso, altura) {
    return peso / (altura * altura);
}


// CLASSIFICAR IMC

function classificarIMC(imc) {
    if (imc < 18.5) return "Abaixo do peso";
    if (imc < 25) return "Peso normal";
    if (imc < 30) return "Sobrepeso";
    if (imc < 35) return "Obesidade I";
    if (imc < 40) return "Obesidade II";

    return "Obesidade III";
}


// ATUALIZAR RESUMO

function atualizarResumo() {
    totalPessoas.textContent = pessoas.length;

    if (pessoas.length === 0) {
        mediaIMC.textContent = "0.00";
        return;
    }

    const soma = pessoas.reduce((total, pessoa) => {
        return total + calcularIMC(pessoa.peso, pessoa.altura);
    }, 0);

    mediaIMC.textContent = (soma / pessoas.length).toFixed(2);
}


// MOSTRAR TABELA

function renderizarTabela() {
    tabela.innerHTML = "";

    const termo = pesquisa.value.toLowerCase();

    const filtradas = pessoas.filter(pessoa =>
        pessoa.nome.toLowerCase().includes(termo)
    );

    vazio.style.display = filtradas.length === 0 ? "block" : "none";

    if (pessoas.length > 0 && filtradas.length === 0) {
        vazio.textContent = "Nenhuma pessoa encontrada.";
    } else {
        vazio.textContent = "Nenhuma pessoa cadastrada.";
    }

    filtradas.forEach(pessoa => {
        const imc = calcularIMC(pessoa.peso, pessoa.altura);

        const linha = document.createElement("tr");

        const dados = [
            pessoa.nome,
            pessoa.idade,
            pessoa.altura.toFixed(2) + " m",
            pessoa.peso.toFixed(1) + " kg",
            imc.toFixed(2),
            classificarIMC(imc)
        ];

        dados.forEach(valor => {
            const celula = document.createElement("td");
            celula.textContent = valor;
            linha.appendChild(celula);
        });

        const celulaAcoes = document.createElement("td");

        const editar = document.createElement("button");
        editar.textContent = "Editar";
        editar.className = "btn-editar";
        editar.onclick = () => editarPessoa(pessoa.id);

        const excluir = document.createElement("button");
        excluir.textContent = "Excluir";
        excluir.className = "btn-excluir";
        excluir.onclick = () => excluirPessoa(pessoa.id);

        celulaAcoes.appendChild(editar);
        celulaAcoes.appendChild(excluir);

        linha.appendChild(celulaAcoes);
        tabela.appendChild(linha);
    });

    atualizarResumo();
}


// CADASTRAR E ATUALIZAR

form.addEventListener("submit", function(event) {
    event.preventDefault();

    mensagem.textContent = "";

    const dados = {
        nome: nome.value.trim(),
        idade: Number(idade.value),
        altura: Number(altura.value),
        peso: Number(peso.value)
    };

    if (dados.nome.length < 2) {
        mensagem.textContent = "Digite um nome válido.";
        return;
    }

    if (!Number.isInteger(dados.idade) || dados.idade < 1 || dados.idade > 120) {
        mensagem.textContent = "Digite uma idade entre 1 e 120.";
        return;
    }

    if (!Number.isFinite(dados.altura) || dados.altura < 0.5 || dados.altura > 2.5) {
        mensagem.textContent = "Digite uma altura válida em metros.";
        return;
    }

    if (!Number.isFinite(dados.peso) || dados.peso < 2 || dados.peso > 500) {
        mensagem.textContent = "Digite um peso válido.";
        return;
    }

    const dadosAntigos = [...pessoas];

    if (idEditando !== null) {
        pessoas = pessoas.map(pessoa =>
            pessoa.id === idEditando
                ? { ...dados, id: idEditando }
                : pessoa
        );

    } else {
        pessoas.push({
            ...dados,
            id: proximoId++
        });
    }

    if (!salvarDados()) {
        pessoas = dadosAntigos;
        return;
    }

    cancelarEdicao();
    renderizarTabela();
});


// EDITAR PESSOA

function editarPessoa(id) {
    const pessoa = pessoas.find(p => p.id === id);

    if (!pessoa) return;

    nome.value = pessoa.nome;
    idade.value = pessoa.idade;
    altura.value = pessoa.altura;
    peso.value = pessoa.peso;

    idEditando = id;

    btnSalvar.textContent = "Atualizar cadastro";
    btnCancelar.hidden = false;

    document.getElementById("titulo-formulario").textContent = "Editar pessoa";

    mensagem.textContent = "Você está editando este cadastro.";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// CANCELAR EDIÇÃO

function cancelarEdicao() {
    form.reset();

    idEditando = null;

    btnSalvar.textContent = "Cadastrar pessoa";
    btnCancelar.hidden = true;

    document.getElementById("titulo-formulario").textContent = "Cadastrar pessoa";

    mensagem.textContent = "";
}

btnCancelar.addEventListener("click", cancelarEdicao);


// EXCLUIR PESSOA

function excluirPessoa(id) {
    const confirmar = confirm("Deseja realmente excluir este cadastro?");

    if (!confirmar) return;

    const dadosAntigos = [...pessoas];

    pessoas = pessoas.filter(pessoa => pessoa.id !== id);

    if (!salvarDados()) {
        pessoas = dadosAntigos;
        return;
    }

    if (idEditando === id) {
        cancelarEdicao();
    }

    renderizarTabela();
}


// PESQUISAR PESSOAS

pesquisa.addEventListener("input", renderizarTabela);


// INICIAR SISTEMA

carregarDados();
renderizarTabela();
