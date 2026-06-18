// ==========================================
// INICIALIZAÇÃO
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
    iniciarRelogio();
    carregarTema();
    carregarTarefas();

    console.log("Sistema iniciado com sucesso.");
});

// ==========================================
// RELÓGIO DIGITAL
// ==========================================

function iniciarRelogio() {
    atualizarRelogio();
    setInterval(atualizarRelogio, 1000);
}

function atualizarRelogio() {
    const relogio = document.getElementById("relogio");

    if (!relogio) return;

    const agora = new Date();

    relogio.textContent =
        agora.toLocaleTimeString("pt-BR");
}

// ==========================================
// TEMA ESCURO
// ==========================================

function alternarTema() {
    document.body.classList.toggle("dark");

    const tema = document.body.classList.contains("dark")
        ? "dark"
        : "light";

    localStorage.setItem("tema", tema);
}

function carregarTema() {
    const tema = localStorage.getItem("tema");

    if (tema === "dark") {
        document.body.classList.add("dark");
    }
}

// ==========================================
// CONTADOR
// ==========================================

let contador = 0;

function aumentar() {
    contador++;
    atualizarContador();
}

function diminuir() {
    contador--;
    atualizarContador();
}

function zerar() {
    contador = 0;
    atualizarContador();
}

function atualizarContador() {
    const elemento =
        document.getElementById("contador");

    if (elemento) {
        elemento.textContent = contador;
    }
}

// ==========================================
// CALCULADORA
// ==========================================

function calcular(operacao) {
    const n1 = parseFloat(
        document.getElementById("num1").value
    ) || 0;

    const n2 = parseFloat(
        document.getElementById("num2").value
    ) || 0;

    let resultado = 0;

    switch (operacao) {
        case "+":
            resultado = n1 + n2;
            break;

        case "-":
            resultado = n1 - n2;
            break;

        case "*":
            resultado = n1 * n2;
            break;

        case "/":
            resultado =
                n2 !== 0
                    ? n1 / n2
                    : "Divisão inválida";
            break;
    }

    document.getElementById("resultado")
        .textContent = resultado;
}

// ==========================================
// LISTA DE TAREFAS
// ==========================================

let tarefas = [];

function adicionarTarefa() {
    const input =
        document.getElementById("novaTarefa");

    const texto = input.value.trim();

    if (!texto) return;

    tarefas.push(texto);

    salvarTarefas();
    renderizarTarefas();

    input.value = "";
}

function renderizarTarefas() {
    const lista =
        document.getElementById("listaTarefas");

    if (!lista) return;

    lista.innerHTML = "";

    tarefas.forEach((tarefa, indice) => {
        const li = document.createElement("li");

        li.innerHTML = `
            ${tarefa}
            <button onclick="removerTarefa(${indice})">
                Remover
            </button>
        `;

        lista.appendChild(li);
    });
}

function removerTarefa(indice) {
    tarefas.splice(indice, 1);

    salvarTarefas();
    renderizarTarefas();
}

function salvarTarefas() {
    localStorage.setItem(
        "tarefas",
        JSON.stringify(tarefas)
    );
}

function carregarTarefas() {
    const dados =
        localStorage.getItem("tarefas");

    if (dados) {
        tarefas = JSON.parse(dados);
        renderizarTarefas();
    }
}

// ==========================================
// CRONÔMETRO
// ==========================================

let segundos = 0;
let timer = null;

function iniciarCronometro() {

    if (timer) return;

    timer = setInterval(() => {

        segundos++;

        const visor =
            document.getElementById("cronometro");

        if (visor) {
            visor.textContent =
                formatarTempo(segundos);
        }

    }, 1000);
}

function pararCronometro() {
    clearInterval(timer);
    timer = null;
}

function resetarCronometro() {
    pararCronometro();

    segundos = 0;

    const visor =
        document.getElementById("cronometro");

    if (visor) {
        visor.textContent = "00:00:00";
    }
}

function formatarTempo(total) {

    const horas =
        String(Math.floor(total / 3600))
            .padStart(2, "0");

    const minutos =
        String(Math.floor((total % 3600) / 60))
            .padStart(2, "0");

    const segundosFormatados =
        String(total % 60)
            .padStart(2, "0");

    return `${horas}:${minutos}:${segundosFormatados}`;
}

// ==========================================
// GERADOR DE NÚMERO ALEATÓRIO
// ==========================================

function gerarNumero() {

    const numero =
        Math.floor(Math.random() * 1000) + 1;

    const elemento =
        document.getElementById("numero");

    if (elemento) {
        elemento.textContent = numero;
    }
}

// ==========================================
// BUSCA EM LISTA
// ==========================================

const usuarios = [
    "Ana",
    "Carlos",
    "João",
    "Maria",
    "Pedro",
    "Fernanda",
    "Lucas"
];

function pesquisarUsuario() {

    const busca =
        document
            .getElementById("pesquisa")
            .value
            .toLowerCase();

    const resultado =
        document.getElementById("resultadoBusca");

    const encontrados =
        usuarios.filter(usuario =>
            usuario
                .toLowerCase()
                .includes(busca)
        );

    resultado.textContent =
        encontrados.length
            ? encontrados.join(", ")
            : "Nenhum usuário encontrado.";
}

// ==========================================
// API EXTERNA
// ==========================================

async function buscarPost() {

    try {

        const resposta = await fetch(
            "https://jsonplaceholder.typicode.com/posts/1"
        );

        const dados =
            await resposta.json();

        const area =
            document.getElementById("api");

        if (area) {
            area.innerHTML = `
                <h3>${dados.title}</h3>
                <p>${dados.body}</p>
            `;
        }

    } catch (erro) {

        console.error(erro);

        alert(
            "Erro ao carregar os dados."
        );
    }
}

// ==========================================
// DATA ATUAL
// ==========================================

function mostrarDataAtual() {

    const elemento =
        document.getElementById("dataAtual");

    if (!elemento) return;

    const data =
        new Date().toLocaleDateString(
            "pt-BR"
        );

    elemento.textContent = data;
}

mostrarDataAtual();

// ==========================================
// MENSAGEM DE BOAS-VINDAS
// ==========================================

function boasVindas(nome) {

    return `Olá, ${nome}! Seja bem-vindo.`;
}

console.log(
    boasVindas("Usuário")
);