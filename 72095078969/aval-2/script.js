let tarefas = [];
let proximoCodigo = 1;

function validarDadosTarefa(titulo, prioridade) {

    if (titulo.length < 5) {
        throw new Error('O título deve ter no mínimo 5 caracteres');
    }

    if (prioridade < 1 || prioridade > 3) {
        throw new Error('Informe uma prioridade entre 1 e 3');
    }
}

function buscarTarefa(codigoTarefa) {
    const tarefaBuscada = tarefas.find(
        t => t.codigo === codigoTarefa
    );

    if (!tarefaBuscada) {
        throw new Error('Código de tarefa não encontrado');
    }

    return tarefaBuscada;
}

function cadastrarTarefa() {

    const titulo = document.getElementById("titulo").value;
    const prioridade = Number(
        document.getElementById("prioridade").value
    );

    try {
        validarDadosTarefa(titulo, prioridade);

        let tarefa = {
            codigo: proximoCodigo++,
            descricao: titulo,
            prioridade: prioridade,
            status: true
        };

        tarefas.push(tarefa);

        document.getElementById("titulo").value = "";
        document.getElementById("prioridade").value = "";

        listarTarefas();

    } catch (erro) {
        alert(erro.message);
    }
}

function listarTarefas() {

    const lista = document.getElementById("listaTarefas");

    lista.innerHTML = "";

    tarefas.forEach(tarefa => {

        const div = document.createElement("div");

        div.className = "tarefa";

        if (!tarefa.status) {
            div.classList.add("concluida");
        }

        div.innerHTML = `
            <div class="info">
                <strong>${tarefa.descricao}</strong>
                <span>
                    Código: ${tarefa.codigo} |
                    Prioridade: ${tarefa.prioridade}
                </span>
            </div>

            ${
                tarefa.status
                ? `<button class="concluir" onclick="concluirTarefa(${tarefa.codigo})">
                    Concluir
                   </button>`
                : `<span>Concluída ✓</span>`
            }
        `;

        lista.appendChild(div);
    });
}

function concluirTarefa(codigo) {

    try {
        let tarefa = buscarTarefa(codigo);

        tarefa.status = false;

        listarTarefas();

    } catch (erro) {
        alert(erro.message);
    }
}