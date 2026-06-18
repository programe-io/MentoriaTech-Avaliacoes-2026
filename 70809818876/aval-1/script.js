// ===============================
// CONFIGURAÇÃO INICIAL
// ===============================

document.addEventListener("DOMContentLoaded", () => {
    console.log("Site carregado com sucesso!");

    atualizarRelogio();
    setInterval(atualizarRelogio, 1000);
});

// ===============================
// ALERTA PERSONALIZADO
// ===============================

function mostrarMensagem() {
    alert("Olá! Bem-vindo ao site.");
}

// ===============================
// RELÓGIO EM TEMPO REAL
// ===============================

function atualizarRelogio() {
    const relogio = document.getElementById("relogio");

    if (relogio) {
        const agora = new Date();

        const hora = agora.toLocaleTimeString("pt-BR");

        relogio.textContent = hora;
    }
}

// ===============================
// MODO ESCURO
// ===============================

function alternarTema() {
    document.body.classList.toggle("dark-mode");

    const temaAtual =
        document.body.classList.contains("dark-mode")
            ? "escuro"
            : "claro";

    localStorage.setItem("tema", temaAtual);
}

window.addEventListener("load", () => {
    const temaSalvo = localStorage.getItem("tema");

    if (temaSalvo === "escuro") {
        document.body.classList.add("dark-mode");
    }
});

// ===============================
// CONTADOR
// ===============================

let contador = 0;

function aumentarContador() {
    contador++;
    atualizarContador();
}

function diminuirContador() {
    contador--;
    atualizarContador();
}

function atualizarContador() {
    const elemento = document.getElementById("contador");

    if (elemento) {
        elemento.textContent = contador;
    }
}

// ===============================
// FORMULÁRIO
// ===============================

function validarFormulario(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();

    if (nome === "") {
        alert("Digite seu nome.");
        return;
    }

    if (!email.includes("@")) {
        alert("Digite um e-mail válido.");
        return;
    }

    alert("Formulário enviado com sucesso!");
}

// ===============================
// LISTA DE TAREFAS
// ===============================

function adicionarTarefa() {
    const input = document.getElementById("novaTarefa");
    const lista = document.getElementById("listaTarefas");

    if (!input || !lista) return;

    const texto = input.value.trim();

    if (texto === "") {
        alert("Digite uma tarefa.");
        return;
    }

    const item = document.createElement("li");

    item.textContent = texto;

    item.addEventListener("click", () => {
        item.style.textDecoration = "line-through";
    });

    lista.appendChild(item);

    input.value = "";
}

// ===============================
// CALCULADORA
// ===============================

function calcular() {
    const n1 = Number(document.getElementById("numero1").value);
    const n2 = Number(document.getElementById("numero2").value);

    const resultado = document.getElementById("resultado");

    if (resultado) {
        resultado.textContent = `Resultado: ${n1 + n2}`;
    }
}

// ===============================
// GERADOR DE NÚMERO ALEATÓRIO
// ===============================

function gerarNumero() {
    const numero = Math.floor(Math.random() * 100) + 1;

    const elemento = document.getElementById("numeroAleatorio");

    if (elemento) {
        elemento.textContent = numero;
    }
}

// ===============================
// BUSCA EM ARRAY
// ===============================

const usuarios = [
    "Ana",
    "Carlos",
    "João",
    "Maria",
    "Pedro"
];

function buscarUsuario() {
    const busca = document
        .getElementById("busca")
        .value
        .toLowerCase();

    const resultado = document.getElementById("resultadoBusca");

    const encontrados = usuarios.filter(usuario =>
        usuario.toLowerCase().includes(busca)
    );

    resultado.textContent =
        encontrados.length > 0
            ? encontrados.join(", ")
            : "Nenhum usuário encontrado.";
}

// ===============================
// API EXTERNA
// ===============================

async function carregarPost() {
    try {
        const resposta = await fetch(
            "https://jsonplaceholder.typicode.com/posts/1"
        );

        const dados = await resposta.json();

        console.log("Título:", dados.title);

    } catch (erro) {
        console.error("Erro:", erro);
    }
}

// ===============================
// CRONÔMETRO
// ===============================

let segundos = 0;
let intervalo;

function iniciarCronometro() {
    pararCronometro();

    intervalo = setInterval(() => {
        segundos++;

        const visor = document.getElementById("cronometro");

        if (visor) {
            visor.textContent = `${segundos}s`;
        }
    }, 1000);
}

function pararCronometro() {
    clearInterval(intervalo);
}

function zerarCronometro() {
    segundos = 0;

    const visor = document.getElementById("cronometro");

    if (visor) {
        visor.textContent = "0s";
    }
}