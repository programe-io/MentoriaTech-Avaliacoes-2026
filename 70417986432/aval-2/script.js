
// Array para armazenar as tarefas
let tarefas = [];

// Código automático de identificação
let proximoCodigo = 1;


// FUNÇÃO PARA CADASTRAR TAREFAS
function cadastrarTarefa() {

    try {

        let titulo = document.getElementById("titulo").value.trim();
        let prioridade = document.getElementById("prioridade").value;

        // Verificando se os campos foram preenchidos
        if (titulo === "" || prioridade === "") {
            throw new Error("Preencha todos os campos!");
        }

        // Criando o objeto da tarefa
        let novaTarefa = {
            codigo: proximoCodigo,
            titulo: titulo,
            prioridade: prioridade,
            status: "Pendente"
        };

        // Adicionando ao array
        tarefas.push(novaTarefa);

        proximoCodigo++;

        alert("Tarefa cadastrada com sucesso!");

        // Limpando os campos
        document.getElementById("titulo").value = "";
        document.getElementById("prioridade").value = "";

        listarTarefas();

    } catch (erro) {

        alert(erro.message);

    }
}


// FUNÇÃO PARA LISTAR AS TAREFAS
function listarTarefas() {

    let lista = document.getElementById("listaTarefas");

    lista.innerHTML = "";

    if (tarefas.length === 0) {
        lista.innerHTML =
            '<p class="vazio">Nenhuma tarefa cadastrada.</p>';
        return;
    }

    // Percorrendo o array
    tarefas.forEach(function(tarefa) {

        let classe = tarefa.status === "Concluída"
            ? "tarefa concluida"
            : "tarefa";

        let desabilitado = tarefa.status === "Concluída"
            ? "disabled"
            : "";

        lista.innerHTML += `
            <div class="${classe}">

                <div>
                    <h3>${tarefa.titulo}</h3>

                    <p><strong>Código:</strong> ${tarefa.codigo}</p>

                    <p><strong>Prioridade:</strong> ${tarefa.prioridade}</p>

                    <p><strong>Status:</strong> ${tarefa.status}</p>
                </div>

                <button
                    class="btn-concluir"
                    onclick="concluirTarefa(${tarefa.codigo})"
                    ${desabilitado}>
                    ${tarefa.status === "Concluída" ? "Concluída ✓" : "Concluir"}
                </button>

            </div>
        `;
    });

}


// FUNÇÃO PARA CONCLUIR UMA TAREFA
function concluirTarefa(codigo) {

    try {

        // Procurando a tarefa pelo código
        let tarefaEncontrada = tarefas.find(function(tarefa) {
            return tarefa.codigo === codigo;
        });

        // Verificando se a tarefa existe
        if (!tarefaEncontrada) {
            throw new Error("Tarefa não encontrada!");
        }

        // Verificando se já foi concluída
        if (tarefaEncontrada.status === "Concluída") {
            throw new Error("Esta tarefa já foi concluída!");
        }

        // Alterando o status
        tarefaEncontrada.status = "Concluída";

        alert("Tarefa concluída com sucesso!");

        listarTarefas();

    } catch (erro) {

        alert(erro.message);

    }

}
