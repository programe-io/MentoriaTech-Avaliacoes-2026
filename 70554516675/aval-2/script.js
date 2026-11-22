const formulario = document.getElementById("atividadeForm");
const lista = document.getElementById("listaAtividades");
const filtro = document.getElementById("filtro");

let atividades = [];

formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const titulo = document.getElementById("titulo").value.trim();
    const materia = document.getElementById("materia").value;
    const prazo = document.getElementById("prazo").value;
    const prioridade = document.getElementById("prioridade").value;

    if (!titulo || !materia || !prazo || !prioridade) {
        alert("Preencha todos os campos.");
        return;
    }

    atividades.push({
        id: Date.now(),
        titulo: titulo,
        materia: materia,
        prazo: prazo,
        prioridade: prioridade,
        concluida: false
    });

    formulario.reset();
    atualizarSistema();
});

// Marcar tarefa como concluída
function concluirAtividade(id) {
    const atividade = atividades.find(function(item) {
        return item.id === id;
    });

    if (!atividade) return;

    atividade.concluida = !atividade.concluida;

    atualizarSistema();
}

// Mostrar atividades de acordo com o filtro
function mostrarAtividades() {
    lista.replaceChildren();

    let filtradas = atividades;

    if (filtro.value === "pendentes") {
        filtradas = atividades.filter(function(item) {
            return !item.concluida;
        });
    }

    if (filtro.value === "concluidas") {
        filtradas = atividades.filter(function(item) {
            return item.concluida;
        });
    }

    if (filtradas.length === 0) {
        const aviso = document.createElement("p");
        aviso.textContent = "Nenhuma atividade encontrada.";
        lista.appendChild(aviso);
        return;
    }

    for (let i = 0; i < filtradas.length; i++) {
        const item = filtradas[i];

        const card = document.createElement("article");
        card.className = "atividade";

        if (item.concluida) {
            card.classList.add("concluida");
        }

        const titulo = document.createElement("h3");
        titulo.textContent = item.titulo;

        const materia = document.createElement("p");
        materia.textContent = "Matéria: " + item.materia;

        const prazo = document.createElement("p");
        prazo.textContent = "Prazo: " +
            new Date(item.prazo + "T12:00:00").toLocaleDateString("pt-BR");

        const prioridade = document.createElement("p");
        prioridade.textContent = "Prioridade: " + item.prioridade;

        const status = document.createElement("p");
        status.textContent = item.concluida
            ? "Status: Concluída"
            : "Status: Pendente";

        const botao = document.createElement("button");
        botao.className = "concluir";
        botao.textContent = item.concluida
            ? "Marcar como pendente"
            : "Concluir atividade";

        botao.addEventListener("click", function() {
            concluirAtividade(item.id);
        });

        const acoes = document.createElement("div");
        acoes.className = "acoes";
        acoes.appendChild(botao);

        card.append(titulo, materia, prazo, prioridade, status, acoes);
        lista.appendChild(card);
    }
}

// Atualizar estatísticas e progresso
function atualizarResumo() {
    const total = atividades.length;

    const concluidas = atividades.filter(function(item) {
        return item.concluida;
    }).length;

    const pendentes = total - concluidas;

    const percentual = total === 0
        ? 0
        : (concluidas / total) * 100;

    document.getElementById("totalTarefas").textContent = total;
    document.getElementById("concluidas").textContent = concluidas;
    document.getElementById("pendentes").textContent = pendentes;

    document.getElementById("barraProgresso").style.width =
        percentual + "%";

    document.getElementById("percentual").textContent =
        percentual.toFixed(0) + "% concluído";
}

filtro.addEventListener("change", mostrarAtividades);

function atualizarSistema() {
    atualizarResumo();
    mostrarAtividades();
}

atualizarSistema();