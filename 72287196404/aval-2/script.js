
const tarefas = [];

let geradorCodigo = 0;

function validarDadosTarefa(titulo, prioridade) {

    if (titulo.length < 5) {
        throw new Error("O título deve ter no mínimo 5 caracteres");
    }

    if (prioridade < 1 || prioridade > 3) {
        throw new Error("Informe uma prioridade entre 1 e 3");
    }
}

function buscarTarefa(codigoTarefa) {

    const tarefaBuscada = tarefas.find(
        t => t.codigo === codigoTarefa
    );

    if (!tarefaBuscada) {
        throw new Error("Código de tarefa não encontrado");
    }

    return tarefaBuscada;
}

function cadastrarTarefa(titulo, prioridade) {

    validarDadosTarefa(titulo, prioridade);

    let tarefa = {
        codigo: ++geradorCodigo,
        titulo: titulo,
        prioridade: prioridade,
        status: true
    };

    tarefas.push(tarefa);

    listarTarefas();
}

function listarTarefas() {

    const lista = document.getElementById("listaTarefas");

    if (!lista) return;

    lista.innerHTML = "";

    tarefas.forEach(tarefa => {

        lista.innerHTML += `
            <tr>
                <td>${tarefa.codigo}</td>
                <td>${tarefa.titulo}</td>
                <td>${tarefa.prioridade}</td>

                <td>
                    ${tarefa.status ? "Ativa" : "Concluída"}
                </td>

                <td class="acoes">
                    <button class="concluir"
                        onclick="alterarStatus(${tarefa.codigo})">
                        Alterar Status
                    </button>

                    <button
                        onclick="atualizarPrioridade(${tarefa.codigo})">
                        Prioridade
                    </button>

                    <button class="excluir"
                        onclick="excluirTarefa(${tarefa.codigo})">
                        Excluir
                    </button>
                </td>
            </tr>
        `;
    });
}

function atualizarPrioridade(codigoTarefa) {

    const tarefa = buscarTarefa(codigoTarefa);

    const novaPrioridade = Number(
        prompt("Informe a nova prioridade (1 a 3):")
    );

    if (!Number.isInteger(novaPrioridade) ||
        novaPrioridade < 1 ||
        novaPrioridade > 3) {

        alert("Informe uma prioridade entre 1 e 3");
        return;
    }

    tarefa.prioridade = novaPrioridade;

    listarTarefas();
}

function alterarStatus(codigoTarefa) {

    const tarefa = buscarTarefa(codigoTarefa);

    tarefa.status = !tarefa.status;

    listarTarefas();
}

function excluirTarefa(codigoTarefa) {

    const indice = tarefas.findIndex(
        t => t.codigo === codigoTarefa
    );

    if (indice === -1) {
        alert("Tarefa não encontrada");
        return;
    }

    tarefas.splice(indice, 1);

    listarTarefas();
}

function buscarTarefaTela() {

    const codigo = Number(
        document.getElementById("codigoBusca").value
    );

    const resultado = document.getElementById("resultadoBusca");

    try {

        const tarefa = buscarTarefa(codigo);

        resultado.innerHTML = `
            Código: ${tarefa.codigo}<br>
            Título: ${tarefa.titulo}<br>
            Prioridade: ${tarefa.prioridade}<br>
            Status: ${tarefa.status ? "Ativa" : "Concluída"}
        `;

    } catch (erro) {

        resultado.innerHTML = erro.message;
    }
}

// Cadastro de exemplo

cadastrarTarefa("Cadastrar Clientes", 1);
atualizarPrioridade(1, 2);
