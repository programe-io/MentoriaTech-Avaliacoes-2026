const tarefaInput = document.getElementById("tarefaInput");
const adicionarBtn = document.getElementById("adicionarBtn");
const listaTarefas = document.getElementById("listaTarefas");
const contadorTarefas = document.getElementById("contadorTarefas");
const limparBtn = document.getElementById("limparBtn");
const filtros = document.querySelectorAll(".filtro");

let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

let filtroAtual = "todas";

// Adicionar tarefa
function adicionarTarefa() {

    const texto = tarefaInput.value.trim();

    if (texto === "") {
        alert("Digite uma tarefa!");
        return;
    }

    const novaTarefa = {
        id: Date.now(),
        texto: texto,
        concluida: false
    };

    tarefas.push(novaTarefa);

    salvarTarefas();

    tarefaInput.value = "";

    mostrarTarefas();
}

// Mostrar tarefas
function mostrarTarefas() {

    listaTarefas.innerHTML = "";

    let tarefasFiltradas = tarefas;

    if (filtroAtual === "pendentes") {
        tarefasFiltradas = tarefas.filter(
            tarefa => !tarefa.concluida
        );
    }

    if (filtroAtual === "concluidas") {
        tarefasFiltradas = tarefas.filter(
            tarefa => tarefa.concluida
        );
    }

    tarefasFiltradas.forEach(tarefa => {

        const li = document.createElement("li");

        li.classList.add("tarefa");

        if (tarefa.concluida) {
            li.classList.add("concluida");
        }

        li.innerHTML = `
            <input 
                type="checkbox" 
                class="checkbox"
                ${tarefa.concluida ? "checked" : ""}
            >

            <span>${tarefa.texto}</span>

            <button class="editar">
                Editar
            </button>

            <button class="excluir">
                Excluir
            </button>
        `;

        // Marcar como concluída
        const checkbox = li.querySelector(".checkbox");

        checkbox.addEventListener("change", () => {

            tarefa.concluida = checkbox.checked;

            salvarTarefas();

            mostrarTarefas();
        });

        // Editar tarefa
        const editarBtn = li.querySelector(".editar");

        editarBtn.addEventListener("click", () => {

            const novoTexto = prompt(
                "Digite o novo nome da tarefa:",
                tarefa.texto
            );

            if (
                novoTexto !== null &&
                novoTexto.trim() !== ""
            ) {

                tarefa.texto = novoTexto.trim();

                salvarTarefas();

                mostrarTarefas();
            }
        });

        // Excluir tarefa
        const excluirBtn = li.querySelector(".excluir");

        excluirBtn.addEventListener("click", () => {

            const confirmar = confirm(
                "Deseja realmente excluir esta tarefa?"
            );

            if (confirmar) {

                tarefas = tarefas.filter(
                    item => item.id !== tarefa.id
                );

                salvarTarefas();

                mostrarTarefas();
            }
        });

        listaTarefas.appendChild(li);
    });

    atualizarContador();
}

// Atualizar contador
function atualizarContador() {

    const pendentes = tarefas.filter(
        tarefa => !tarefa.concluida
    ).length;

    if (pendentes === 1) {
        contadorTarefas.textContent = "1 tarefa pendente";
    } else {
        contadorTarefas.textContent =
            `${pendentes} tarefas pendentes`;
    }
}

// Salvar no localStorage
function salvarTarefas() {

    localStorage.setItem(
        "tarefas",
        JSON.stringify(tarefas)
    );
}

// Filtros
filtros.forEach(botao => {

    botao.addEventListener("click", () => {

        filtros.forEach(
            item => item.classList.remove("ativo")
        );

        botao.classList.add("ativo");

        filtroAtual = botao.dataset.filtro;

        mostrarTarefas();
    });
});

// Limpar tarefas concluídas
limparBtn.addEventListener("click", () => {

    tarefas = tarefas.filter(
        tarefa => !tarefa.concluida
    );

    salvarTarefas();

    mostrarTarefas();
});

// Botão adicionar
adicionarBtn.addEventListener(
    "click",
    adicionarTarefa
);

// Adicionar pressionando Enter
tarefaInput.addEventListener("keydown", event => {

    if (event.key === "Enter") {
        adicionarTarefa();
    }
});

// Carregar tarefas ao abrir a página
mostrarTarefas();
