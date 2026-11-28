
let tarefas = [
    {
        id: 1,
        nome: "Estudar matemática",
        descricao: "1. Revisar o conteúdo da aula.\n2. Resolver 5 exercícios.\n3. Conferir as respostas.",
        prioridade: "Alta",
        prazo: "",
        concluida: false
    },
    {
        id: 2,
        nome: "Organizar o quarto",
        descricao: "1. Arrumar a cama.\n2. Organizar os materiais.\n3. Guardar os objetos.",
        prioridade: "Média",
        prazo: "",
        concluida: false
    },
    {
        id: 3,
        nome: "Fazer trabalho escolar",
        descricao: "1. Pesquisar o assunto.\n2. Escrever o trabalho.\n3. Revisar antes de entregar.",
        prioridade: "Baixa",
        prazo: "",
        concluida: true
    }
];

function adicionarTarefa() {
    const nome = document.getElementById("nome").value.trim();
    const descricao = document.getElementById("descricao").value.trim();
    const prioridade = document.getElementById("prioridade").value;
    const prazo = document.getElementById("prazo").value;

    if (!nome || !descricao) {
        alert("Preencha o nome e o passo a passo da tarefa!");
        return;
    }

    tarefas.push({
        id: Date.now(),
        nome,
        descricao,
        prioridade,
        prazo,
        concluida: false
    });

    document.getElementById("nome").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("prazo").value = "";

    atualizar();
}

function concluirTarefa(id) {
    const tarefa = tarefas.find(t => t.id === id);
    tarefa.concluida = !tarefa.concluida;
    atualizar();
}

function excluirTarefa(id) {
    tarefas = tarefas.filter(t => t.id !== id);
    atualizar();
}

function verPassos(id) {
    const tarefa = tarefas.find(t => t.id === id);

    alert(
        "COMO CONCLUIR: " + tarefa.nome +
        "\n\n" + tarefa.descricao
    );
}

function mostrarTarefas() {
    const filtro = document.getElementById("filtro").value;

    const filtradas = tarefas.filter(t => {
        if (filtro === "Pendente") return !t.concluida;
        if (filtro === "Concluída") return t.concluida;
        return true;
    });

    const lista = document.getElementById("listaTarefas");

    if (filtradas.length === 0) {
        lista.innerHTML = "<p>Nenhuma tarefa encontrada.</p>";
        return;
    }

    lista.innerHTML = filtradas.map(t => {
        const classe = t.prioridade === "Alta" ? "alta" :
            t.prioridade === "Média" ? "media" : "";

        return `
            <div class="tarefa ${classe} ${t.concluida ? "concluida" : ""}">
                <div class="tarefa-topo">
                    <div>
                        <h3>${t.concluida ? "✅ " : "📌 "}${t.nome}</h3>
                        <span class="etiqueta">
                            Prioridade: ${t.prioridade}
                        </span>
                    </div>
                    <span class="etiqueta">
                        ${t.concluida ? "Concluída" : "Pendente"}
                    </span>
                </div>

                <p>${t.descricao.replace(/\n/g, "<br>")}</p>

                <p>📅 Prazo: ${t.prazo || "Não definido"}</p>

                <div class="acoes">
                    <button class="concluir"
                        onclick="concluirTarefa(${t.id})">
                        ${t.concluida ? "Desmarcar" : "Concluir tarefa"}
                    </button>

                    <button class="ver"
                        onclick="verPassos(${t.id})">
                        Ver como fazer
                    </button>

                    <button class="excluir"
                        onclick="excluirTarefa(${t.id})">
                        Excluir
                    </button>
                </div>
            </div>
        `;
    }).join("");
}

function atualizar() {
    const total = tarefas.length;
    const concluidas = tarefas.filter(t => t.concluida).length;
    const pendentes = total - concluidas;
    const porcentagem = total === 0 ? 0 :
        Math.round((concluidas / total) * 100);

    document.getElementById("total").textContent = total;
    document.getElementById("concluidas").textContent = concluidas;
    document.getElementById("pendentes").textContent = pendentes;
    document.getElementById("progresso").textContent = porcentagem + "%";

    document.getElementById("barraProgresso").style.width =
        porcentagem + "%";

    document.getElementById("mensagem").textContent =
        porcentagem === 100 && total > 0
            ? "Parabéns! Você concluiu todas as tarefas! 🎉"
            : "Continue avançando! Cada tarefa concluída é uma conquista.";

    mostrarTarefas();
}

document.getElementById("dataAtual").textContent =
    new Date().toLocaleDateString("pt-BR", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    });

atualizar();
