
let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

let filtroAtual = "todas";

const hoje = new Date();

document.getElementById("dataAtual").textContent =
    hoje.toLocaleDateString("pt-BR", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    });

function salvarDados() {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function abrirFormulario() {
    document.getElementById("modal").classList.add("ativo");
}

function fecharFormulario() {
    document.getElementById("modal").classList.remove("ativo");
}

function adicionarTarefa() {
    const nome = document.getElementById("nomeTarefa").value.trim();
    const descricao = document.getElementById("descricao").value.trim();
    const categoria = document.getElementById("categoria").value;
    const prioridade = document.getElementById("prioridade").value;
    const prazo = document.getElementById("prazo").value;

    if (!nome) {
        alert("Digite o nome da tarefa!");
        return;
    }

    tarefas.push({
        id: Date.now(),
        nome,
        descricao,
        categoria,
        prioridade,
        prazo,
        concluida: false
    });

    salvarDados();
    atualizar();

    document.getElementById("nomeTarefa").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("prazo").value = "";

    fecharFormulario();
}

function concluir(id) {
    tarefas = tarefas.map(t => {
        if (t.id === id) {
            t.concluida = !t.concluida;
        }
        return t;
    });

    salvarDados();
    atualizar();
}

function excluir(id) {
    if (confirm("Deseja realmente excluir esta tarefa?")) {
        tarefas = tarefas.filter(t => t.id !== id);
        salvarDados();
        atualizar();
    }
}

function filtrar(filtro, botao) {
    filtroAtual = filtro;

    document.querySelectorAll(".menu").forEach(b => {
        b.classList.remove("ativo");
    });

    botao.classList.add("ativo");

    const titulos = {
        todas: "Minhas tarefas",
        pendente: "Tarefas pendentes",
        concluida: "Tarefas concluídas",
        Estudos: "Tarefas de estudos",
        Trabalho: "Tarefas de trabalho",
        Pessoal: "Tarefas pessoais"
    };

    document.getElementById("tituloLista").textContent = titulos[filtro];

    atualizar();
}

function atualizar() {
    const total = tarefas.length;
    const concluidas = tarefas.filter(t => t.concluida).length;
    const pendentes = total - concluidas;

    const porcentagem = total === 0
        ? 0
        : Math.round((concluidas / total) * 100);

    document.getElementById("total").textContent = total;
    document.getElementById("pendentes").textContent = pendentes;
    document.getElementById("concluidas").textContent = concluidas;
    document.getElementById("porcentagem").textContent = porcentagem + "%";

    document.getElementById("progressoTexto").textContent = porcentagem + "%";
    document.getElementById("barraInterna").style.width = porcentagem + "%";

    let lista = tarefas;

    if (filtroAtual === "pendente") {
        lista = tarefas.filter(t => !t.concluida);
    } else if (filtroAtual === "concluida") {
        lista = tarefas.filter(t => t.concluida);
    } else if (["Estudos", "Trabalho", "Pessoal"].includes(filtroAtual)) {
        lista = tarefas.filter(t => t.categoria === filtroAtual);
    }

    const area = document.getElementById("listaTarefas");

    if (lista.length === 0) {
        area.innerHTML = `
            <div class="vazio">
                <h2>📭</h2>
                <h3>Nenhuma tarefa encontrada</h3>
                <p>Adicione uma nova tarefa para começar!</p>
            </div>
        `;
        return;
    }

    area.innerHTML = lista.map(t => {
        const prioridadeClasse =
            t.prioridade === "Alta" ? "alta" :
            t.prioridade === "Média" ? "media" : "";

        return `
            <div class="tarefa ${t.concluida ? "concluida" : ""}">

                <input class="check"
                    type="checkbox"
                    ${t.concluida ? "checked" : ""}
                    onchange="concluir(${t.id})">

                <div class="info">
                    <h3>${escapar(t.nome)}</h3>
                    <p>${escapar(t.descricao || "Sem descrição")}</p>
                    <small>
                        ${t.categoria} 
                        ${t.prazo ? " • Prazo: " + formatarData(t.prazo) : ""}
                    </small>
                </div>

                <span class="prioridade ${prioridadeClasse}">
                    ${t.prioridade}
                </span>

                <div class="acoes">
                    <button class="excluir"
                        onclick="excluir(${t.id})">
                        🗑
                    </button>
                </div>

            </div>
        `;
    }).join("");
}

function formatarData(data) {
    const [ano, mes, dia] = data.split("-");
    return `${dia}/${mes}/${ano}`;
}

function escapar(texto) {
    return String(texto).replace(/[&<>"']/g, letra => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[letra]);
}

atualizar();
