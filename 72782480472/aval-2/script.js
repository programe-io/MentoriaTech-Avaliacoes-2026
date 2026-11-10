
let tarefas = [];
let proximoCodigo = 1;

// Elementos da página
const formulario = document.getElementById("formTarefa");
const campoTitulo = document.getElementById("titulo");
const campoPrioridade = document.getElementById("prioridade");
const listaTarefas = document.getElementById("listaTarefas");
const mensagem = document.getElementById("mensagem");
const estatisticas = document.getElementById("estatisticas");

// Cadastrar tarefa
formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const titulo = campoTitulo.value.trim();
    const prioridade = Number(campoPrioridade.value);

    // Validar título
    if (titulo.length < 5) {
        mostrarMensagem("O título precisa ter pelo menos 5 caracteres.", "erro");
        return;
    }

    // Validar prioridade
    if (![1, 2, 3].includes(prioridade)) {
        mostrarMensagem("Selecione uma prioridade válida.", "erro");
        return;
    }

    // Criar tarefa
    const tarefa = {
        codigo: proximoCodigo++,
        titulo: titulo,
        prioridade: prioridade,
        concluida: false
    };

    // Adicionar tarefa
    tarefas.push(tarefa);

    // Atualizar tela
    listarTarefas();

    // Limpar formulário
    formulario.reset();

    mostrarMensagem("Tarefa cadastrada com sucesso!", "sucesso");
});

// Listar tarefas
function listarTarefas() {
    listaTarefas.innerHTML = "";

    if (tarefas.length === 0) {
        listaTarefas.innerHTML =
            '<p class="vazio">Nenhuma tarefa cadastrada.</p>';
    }

    tarefas.forEach(tarefa => {
        const elemento = document.createElement("div");

        elemento.className = tarefa.concluida
            ? "tarefa concluida"
            : "tarefa";

        const prioridades = {
            1: { nome: "Alta", classe: "alta" },
            2: { nome: "Média", classe: "media" },
            3: { nome: "Baixa", classe: "baixa" }
        };

        elemento.innerHTML = `
            <div class="tarefa-info">
                <h3>${escaparHTML(tarefa.titulo)}</h3>

                <p>Código: ${tarefa.codigo}</p>

                <span class="prioridade ${prioridades[tarefa.prioridade].classe}">
                    Prioridade: ${prioridades[tarefa.prioridade].nome}
                </span>

                <p>Status: ${tarefa.concluida ? "Concluída" : "Pendente"}</p>
            </div>

            <div class="acoes">
                ${!tarefa.concluida ? `
                    <button class="concluir"
                        onclick="marcarConcluida(${tarefa.codigo})">
                        Concluir
                    </button>
                ` : ""}

                <button class="alterar"
                    onclick="alterarPrioridade(${tarefa.codigo})">
                    Alterar prioridade
                </button>
            </div>
        `;

        listaTarefas.appendChild(elemento);
    });

    atualizarEstatisticas();
}

// Evitar interpretar o título como HTML
function escaparHTML(texto) {
    return texto.replace(/[&<>"']/g, caractere => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[caractere]);
}

// Concluir tarefa
function marcarConcluida(codigo) {
    const tarefa = tarefas.find(t => t.codigo === codigo);

    if (!tarefa) return;

    tarefa.concluida = true;

    listarTarefas();
    mostrarMensagem("Tarefa concluída!", "sucesso");
}

// Alterar prioridade
function alterarPrioridade(codigo) {
    const tarefa = tarefas.find(t => t.codigo === codigo);

    if (!tarefa) return;

    const novaPrioridade = prompt(
        "Digite a nova prioridade:\n1 - Alta\n2 - Média\n3 - Baixa"
    );

    if (novaPrioridade === null) return;

    const prioridade = Number(novaPrioridade);

    if (![1, 2, 3].includes(prioridade)) {
        mostrarMensagem("Prioridade inválida!", "erro");
        return;
    }

    tarefa.prioridade = prioridade;

    listarTarefas();
    mostrarMensagem("Prioridade alterada!", "sucesso");
}

// Atualizar estatísticas
function atualizarEstatisticas() {
    const total = tarefas.length;

    const concluidas = tarefas.filter(
        t => t.concluida
    ).length;

    const pendentes = total - concluidas;

    estatisticas.textContent =
        `Total: ${total} | Pendentes: ${pendentes} | Concluídas: ${concluidas}`;
}

// Mensagens
function mostrarMensagem(texto, tipo) {
    mensagem.textContent = texto;
    mensagem.className = tipo;
}

// Inicializar
listarTarefas();
