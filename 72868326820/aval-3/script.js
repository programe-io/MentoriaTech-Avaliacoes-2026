const formulario = document.getElementById("form-tarefa");
const campoTarefa = document.getElementById("nova-tarefa");
const campoBusca = document.getElementById("busca");
const lista = document.getElementById("lista-tarefas");
const mensagemVazia = document.getElementById("mensagem-vazia");

const total = document.getElementById("total");
const pendentes = document.getElementById("pendentes");
const concluidas = document.getElementById("concluidas");

// Tarefas iniciais
let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

const tarefasIniciais = [
    "Estudar JavaScript",
    "Estudar CSS",
    "Revisar o código da aula"
];

// Cadastrar tarefas automaticamente
if (tarefas.length === 0) {

    tarefas = tarefasIniciais.map((texto, index) => ({
        id: Date.now() + index,
        texto: texto,
        concluida: false
    }));

    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

let filtroAtual = "todas";
let buscaAtual = "";

// Salvar tarefas
function salvar() {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

// Atualizar contadores
function atualizarContadores() {

    total.textContent = tarefas.length;

    pendentes.textContent =
        tarefas.filter(t => !t.concluida).length;

    concluidas.textContent =
        tarefas.filter(t => t.concluida).length;
}

// Renderizar lista
function renderizar() {

    lista.innerHTML = "";

    const resultado = tarefas.filter(tarefa => {

        const correspondeBusca = tarefa.texto
            .toLocaleLowerCase("pt-BR")
            .includes(buscaAtual.toLocaleLowerCase("pt-BR"));

        const correspondeFiltro =
            filtroAtual === "todas" ||
            (filtroAtual === "pendentes" && !tarefa.concluida) ||
            (filtroAtual === "concluidas" && tarefa.concluida);

        return correspondeBusca && correspondeFiltro;
    });

    resultado.forEach(tarefa => {

        const item = document.createElement("li");

        if (tarefa.concluida) {
            item.classList.add("concluida");
        }

        // Checkbox
        const checkbox = document.createElement("input");

        checkbox.type = "checkbox";
        checkbox.checked = tarefa.concluida;

        checkbox.setAttribute(
            "aria-label",
            "Concluir tarefa"
        );

        checkbox.addEventListener("change", () => {

            tarefa.concluida = checkbox.checked;

            salvar();
            renderizar();

        });

        // Texto da tarefa
        const texto = document.createElement("span");

        texto.textContent = tarefa.texto;

        // Botão excluir
        const excluir = document.createElement("button");

        excluir.textContent = "Excluir";
        excluir.className = "btn-excluir";
        excluir.type = "button";

        excluir.addEventListener("click", () => {

            tarefas = tarefas.filter(
                t => t.id !== tarefa.id
            );

            salvar();
            renderizar();

        });

        item.append(checkbox, texto, excluir);

        lista.appendChild(item);

    });

    // Mensagem da lista vazia
    if (resultado.length === 0) {

        if (tarefas.length === 0) {

            mensagemVazia.textContent =
                "Nenhuma tarefa adicionada ainda.";

        } else if (buscaAtual) {

            mensagemVazia.textContent =
                "Nenhuma tarefa encontrada.";

        } else {

            mensagemVazia.textContent =
                "Não existem tarefas neste filtro.";

        }

    } else {

        mensagemVazia.textContent = "";

    }

    atualizarContadores();

}

// Adicionar tarefa
formulario.addEventListener("submit", event => {

    event.preventDefault();

    const texto = campoTarefa.value.trim();

    if (!texto) return;

    tarefas.push({

        id: Date.now() + Math.random(),

        texto: texto,

        concluida: false

    });

    salvar();

    campoTarefa.value = "";

    filtroAtual = "todas";

    document.querySelectorAll(".filtro").forEach(botao => {

        botao.classList.toggle(
            "ativo",
            botao.dataset.filtro === "todas"
        );

    });

    renderizar();

    campoTarefa.focus();

});

// Busca em tempo real
campoBusca.addEventListener("input", () => {

    buscaAtual = campoBusca.value.trim();

    renderizar();

});

// Filtros
document.querySelectorAll(".filtro").forEach(botao => {

    botao.addEventListener("click", () => {

        filtroAtual = botao.dataset.filtro;

        document.querySelectorAll(".filtro").forEach(b => {

            b.classList.remove("ativo");

        });

        botao.classList.add("ativo");

        renderizar();

    });

});

// Inicialização
renderizar();
