
let tarefas = [];
let proximoCodigo = 1;

const formTarefa = document.getElementById("formTarefa");
const campoTitulo = document.getElementById("titulo");
const campoPrioridade = document.getElementById("prioridade");
const campoCodigo = document.getElementById("codigo");
const campoNovaPrioridade = document.getElementById("novaPrioridade");
const listaTarefas = document.getElementById("listaTarefas");
const mensagem = document.getElementById("mensagem");

// Mostrar mensagens na tela
function mostrarMensagem(texto) {
    mensagem.textContent = texto;
}

// Cadastrar uma nova tarefa
formTarefa.addEventListener("submit", function(event) {
    event.preventDefault();

    const titulo = campoTitulo.value.trim();
    const prioridade = Number(campoPrioridade.value);

    // Validar o título
    if (titulo.length < 5) {
        mostrarMensagem("O título deve ter no mínimo 5 caracteres.");
        return;
    }

    // Validar a prioridade
    if (!["1", "2", "3"].includes(campoPrioridade.value)) {
        mostrarMensagem("A prioridade deve ser 1, 2 ou 3.");
        return;
    }

    const tarefa = {
        codigo: proximoCodigo,
        titulo: titulo,
        prioridade: prioridade,
        concluida: false
    };

    tarefas.push(tarefa);
    proximoCodigo++;

    listarTarefas();
    formTarefa.reset();

    mostrarMensagem("Tarefa cadastrada com sucesso!");
});

// Listar todas as tarefas
function listarTarefas() {
    listaTarefas.replaceChildren();

    tarefas.forEach(function(tarefa) {
        const linha = document.createElement("tr");

        const status = tarefa.concluida
            ? "Concluída"
            : "Pendente";

        const dados = [
            tarefa.codigo,
            tarefa.titulo,
            tarefa.prioridade + " - " +
                (tarefa.prioridade === 1 ? "Alta" :
                 tarefa.prioridade === 2 ? "Média" : "Baixa"),
            status
        ];

        dados.forEach(function(dado, indice) {
            const celula = document.createElement("td");
            celula.textContent = dado;

            if (indice === 3) {
                celula.className = tarefa.concluida
                    ? "concluida"
                    : "pendente";
            }

            linha.appendChild(celula);
        });

        listaTarefas.appendChild(linha);
    });

    document.getElementById("totalTarefas").textContent =
        "Total de tarefas: " + tarefas.length;
}

// Procurar tarefa pelo código
function buscarTarefa(codigo) {
    return tarefas.find(function(tarefa) {
        return tarefa.codigo === codigo;
    });
}

// Marcar tarefa como concluída
document.getElementById("btnConcluir")
    .addEventListener("click", function() {
        if (campoCodigo.value === "" ||
            !Number.isInteger(Number(campoCodigo.value)) ||
            Number(campoCodigo.value) < 1) {
            mostrarMensagem("Digite um código válido.");
            return;
        }

        const codigo = Number(campoCodigo.value);
        const tarefa = buscarTarefa(codigo);

        if (!tarefa) {
            mostrarMensagem("Tarefa não encontrada.");
            return;
        }

        if (tarefa.concluida) {
            mostrarMensagem("Essa tarefa já foi concluída.");
            return;
        }

        tarefa.concluida = true;
        listarTarefas();

        mostrarMensagem("Tarefa marcada como concluída!");
    });

// Alterar prioridade de uma tarefa
document.getElementById("btnPrioridade")
    .addEventListener("click", function() {
        if (campoCodigo.value === "" ||
            !Number.isInteger(Number(campoCodigo.value)) ||
            Number(campoCodigo.value) < 1) {
            mostrarMensagem("Digite um código válido.");
            return;
        }

        if (!["1", "2", "3"].includes(campoNovaPrioridade.value)) {
            mostrarMensagem("Selecione uma prioridade válida: 1, 2 ou 3.");
            return;
        }

        const codigo = Number(campoCodigo.value);
        const tarefa = buscarTarefa(codigo);

        if (!tarefa) {
            mostrarMensagem("Tarefa não encontrada.");
            return;
        }

        tarefa.prioridade = Number(campoNovaPrioridade.value);
        listarTarefas();

        campoNovaPrioridade.value = "";
        mostrarMensagem("Prioridade alterada com sucesso!");
    });