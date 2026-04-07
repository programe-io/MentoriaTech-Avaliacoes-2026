/* =========================
   MODO ESTRITO
========================= */
"use strict";

/* =========================
   SELETORES
========================= */
const botao = document.querySelector("#botao");
const texto = document.querySelector("#texto");
const lista = document.querySelector("#lista");

/* =========================
   FUNÇÕES
========================= */
function mostrarMensagem() {
    alert("Olá! JavaScript está funcionando 🚀");
}

function alterarTexto() {
    if (texto) {
        texto.textContent = "Texto alterado com sucesso!";
    }
}

function adicionarItem() {
    if (lista) {
        const li = document.createElement("li");
        li.textContent = "Novo item " + (lista.children.length + 1);
        lista.appendChild(li);
    }
}

/* =========================
   EVENTOS
========================= */
if (botao) {
    botao.addEventListener("click", () => {
        mostrarMensagem();
        alterarTexto();
        adicionarItem();
    });
}

/* =========================
   LOCAL STORAGE
========================= */
function salvarDados(chave, valor) {
    localStorage.setItem(chave, JSON.stringify(valor));
}

function carregarDados(chave) {
    const dado = localStorage.getItem(chave);
    return dado ? JSON.parse(dado) : null;
}

// Exemplo de uso
salvarDados("usuario", { nome: "João", idade: 20 });
const usuario = carregarDados("usuario");
console.log("Usuário:", usuario);

/* =========================
   CLASSES
========================= */
class Pessoa {
    constructor(nome, idade) {
        this.nome = nome;
        this.idade = idade;
    }

    apresentar() {
        return `Olá, meu nome é ${this.nome} e tenho ${this.idade} anos.`;
    }
}

const pessoa1 = new Pessoa("Maria", 25);
console.log(pessoa1.apresentar());

/* =========================
   ARRAY E MÉTODOS
========================= */
const numeros = [1, 2, 3, 4, 5];

const dobrados = numeros.map(n => n * 2);
console.log("Dobrado:", dobrados);

const filtrados = numeros.filter(n => n > 2);
console.log("Filtrados:", filtrados);

/* =========================
   FETCH (REQUISIÇÃO API)
========================= */
async function buscarDados() {
    try {
        const resposta = await fetch("https://jsonplaceholder.typicode.com/posts/1");
        const dados = await resposta.json();
        console.log("Dados da API:", dados);
    } catch (erro) {
        console.error("Erro ao buscar dados:", erro);
    }
}

buscarDados();

/* =========================
   TIMER
========================= */
setTimeout(() => {
    console.log("Executado após 2 segundos");
}, 2000);

setInterval(() => {
    console.log("Executando a cada 5 segundos");
}, 5000);

/* =========================
   VALIDAÇÃO SIMPLES
========================= */
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

console.log("Email válido?", validarEmail("teste@email.com"));

/* =========================
   UTILITÁRIOS
========================= */
const Utils = {
    gerarId() {
        return Math.floor(Math.random() * 10000);
    },

    formatarData(data) {
        return new Date(data).toLocaleDateString("pt-BR");
    }
};

console.log("ID:", Utils.gerarId());
console.log("Data:", Utils.formatarData(new Date()));

/* =========================
   INICIALIZAÇÃO
========================= */
document.addEventListener("DOMContentLoaded", () => {
    console.log("Página carregada com sucesso!");
});