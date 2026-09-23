const campoTarefa = document.getElementById("campoTarefa");
const btnAdicionar = document.getElementById("btnAdicionar");
const listaTarefas = document.getElementById("listaTarefas");
const contadorTarefas = document.getElementById("contadorTarefas");
const btnLimpar = document.getElementById("btnLimpar");

const filtros = document.querySelectorAll(".filtro");

let tarefas = [];
let filtroAtual = "todas";


// Adicionar tarefa
function adicionarTarefa() {

    const texto = campoTarefa.value.trim();

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

    campoTarefa.value = "";

    salvarTarefas();
    renderizarTarefas();
}


// Renderizar tarefas
function renderizarTarefas() {

    listaTarefas.innerHTML = "";

    let tarefasFiltradas = tarefas.filter(tarefa => {

        if (filtroAtual === "pendentes") {
            return !tarefa.concluida;
        }

        if (filtroAtual === "concluidas") {
            return tarefa.concluida;
        }

        return true;
    });


    if (tarefasFiltradas.length === 0) {

        const mensagem = document.createElement("li");

        mensagem.classList.add("vazia");
        mensagem.textContent = "Nenhuma tarefa encontrada.";

        listaTarefas.appendChild(mensagem);

    } else {

        tarefasFiltradas.forEach(tarefa => {

            const item = document.createElement("li");

            item.classList.add("tarefa");

            if (tarefa.concluida) {
                item.classList.add("concluida");
            }


            const texto = document.createElement("span");

            texto.textContent = tarefa.texto;


            const btnConcluir = document.createElement("button");

            btnConcluir.classList.add("btn-concluir");

            btnConcluir.textContent =
                tarefa.concluida ? "Desfazer" : "Concluir";

            btnConcluir.addEventListener("click", () => {
                alternarTarefa(tarefa.id);
            });


            const btnExcluir = document.createElement("button");

            btnExcluir.classList.add("btn-excluir");
            btnExcluir.textContent = "Excluir";

            btnExcluir.addEventListener("click", () => {
                excluirTarefa(tarefa.id);
            });


            item.appendChild(texto);
            item.appendChild(btnConcluir);
            item.appendChild(btnExcluir);

            listaTarefas.appendChild(item);
        });
    }

    atualizarContador();
}


// Marcar/desmarcar tarefa
function alternarTarefa(id) {

    tarefas = tarefas.map(tarefa => {

        if (tarefa.id === id) {
            return {
                ...tarefa,
                concluida: !tarefa.concluida
            };
        }

        return tarefa;
    });

    salvarTarefas();
    renderizarTarefas();
}


// Excluir tarefa
function excluirTarefa(id) {

    tarefas = tarefas.filter(tarefa => tarefa.id !== id);

    salvarTarefas();
    renderizarTarefas();
}


// Limpar tarefas concluídas
function limparConcluidas() {

    tarefas = tarefas.filter(tarefa => !tarefa.concluida);

    salvarTarefas();
    renderizarTarefas();
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


// Salvar no navegador
function salvarTarefas() {

    localStorage.setItem(
        "tarefas",
        JSON.stringify(tarefas)
    );
}


// Carregar tarefas
function carregarTarefas() {

    const tarefasSalvas =
        localStorage.getItem("tarefas");

    if (tarefasSalvas) {
        tarefas = JSON.parse(tarefasSalvas);
    }

    renderizarTarefas();
}


// Eventos
btnAdicionar.addEventListener(
    "click",
    adicionarTarefa
);

campoTarefa.addEventListener(
    "keydown",
    event => {

        if (event.key === "Enter") {
            adicionarTarefa();
        }
    }
);


btnLimpar.addEventListener(
    "click",
    limparConcluidas
);


// Filtros
filtros.forEach(botao => {

    botao.addEventListener("click", () => {

        filtros.forEach(
            b => b.classList.remove("ativo")
        );

        botao.classList.add("ativo");

        filtroAtual = botao.dataset.filtro;

        renderizarTarefas();
    });
});


// Iniciar aplicação
carregarTarefas();
