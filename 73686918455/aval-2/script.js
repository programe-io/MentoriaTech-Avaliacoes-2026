// Array que armazenará as tarefas
let tarefas = [];

// Código da próxima tarefa
let proximoCodigo = 1;


// Elementos do HTML
const formulario = document.getElementById("formTarefa");
const titulo = document.getElementById("titulo");
const prioridade = document.getElementById("prioridade");
const listaTarefas = document.getElementById("listaTarefas");
const mensagem = document.getElementById("mensagem");


// ==========================================
// CADASTRAR UMA NOVA TAREFA
// ==========================================

formulario.addEventListener("submit", function (evento) {

    evento.preventDefault();

    const tituloTarefa = titulo.value.trim();
    const prioridadeTarefa = Number(prioridade.value);


    // Validação do título
    if (tituloTarefa.length < 5) {

        mostrarMensagem(
            "O título deve ter no mínimo 5 caracteres.",
            "erro"
        );

        return;
    }


    // Validação da prioridade
    if (prioridadeTarefa < 1 || prioridadeTarefa > 3) {

        mostrarMensagem(
            "A prioridade deve ser um valor entre 1 e 3.",
            "erro"
        );

        return;
    }


    // Criação da tarefa
    const tarefa = {
        codigo: proximoCodigo,
        titulo: tituloTarefa,
        prioridade: prioridadeTarefa,
        concluida: false
    };


    // Adiciona a tarefa ao array
    tarefas.push(tarefa);

    proximoCodigo++;


    // Atualiza a tabela
    listarTarefas();


    // Limpa o formulário
    formulario.reset();


    mostrarMensagem(
        "Tarefa cadastrada com sucesso!",
        "sucesso"
    );
});


// ==========================================
// LISTAR AS TAREFAS
// ==========================================

function listarTarefas() {

    listaTarefas.innerHTML = "";


    if (tarefas.length === 0) {

        listaTarefas.innerHTML = `
            <tr>
                <td colspan="5">
                    Nenhuma tarefa cadastrada.
                </td>
            </tr>
        `;

        return;
    }


    tarefas.forEach(function (tarefa) {

        const linha = document.createElement("tr");


        const status = tarefa.concluida
            ? "Concluída"
            : "Pendente";


        const classeStatus = tarefa.concluida
            ? "concluida"
            : "pendente";


        const prioridadeTexto = obterPrioridade(tarefa.prioridade);


        linha.innerHTML = `
            <td>${tarefa.codigo}</td>

            <td>${tarefa.titulo}</td>

            <td>${prioridadeTexto}</td>

            <td class="${classeStatus}">
                ${status}
            </td>

            <td>

                <button
                    class="btn-concluir"
                    onclick="concluirTarefa(${tarefa.codigo})"
                    ${tarefa.concluida ? "disabled" : ""}
                >
                    Concluir
                </button>

                <button
                    class="btn-prioridade"
                    onclick="alterarPrioridade(${tarefa.codigo})"
                >
                    Alterar prioridade
                </button>

            </td>
        `;


        listaTarefas.appendChild(linha);
    });
}


// ==========================================
// MARCAR TAREFA COMO CONCLUÍDA
// ==========================================

function concluirTarefa(codigo) {

    const tarefa = tarefas.find(function (tarefa) {
        return tarefa.codigo === codigo;
    });


    if (!tarefa) {

        mostrarMensagem(
            "Tarefa não encontrada.",
            "erro"
        );

        return;
    }


    tarefa.concluida = true;


    listarTarefas();


    mostrarMensagem(
        "Tarefa marcada como concluída!",
        "sucesso"
    );
}


// ==========================================
// ALTERAR PRIORIDADE
// ==========================================

function alterarPrioridade(codigo) {

    const tarefa = tarefas.find(function (tarefa) {
        return tarefa.codigo === codigo;
    });


    if (!tarefa) {

        mostrarMensagem(
            "Tarefa não encontrada.",
            "erro"
        );

        return;
    }


    const novaPrioridade = prompt(
        "Digite a nova prioridade:\n" +
        "1 - Alta\n" +
        "2 - Média\n" +
        "3 - Baixa"
    );


    const prioridadeNumero = Number(novaPrioridade);


    // Validação da prioridade
    if (
        novaPrioridade === null ||
        prioridadeNumero < 1 ||
        prioridadeNumero > 3 ||
        !Number.isInteger(prioridadeNumero)
    ) {

        mostrarMensagem(
            "A prioridade deve ser 1, 2 ou 3.",
            "erro"
        );

        return;
    }


    tarefa.prioridade = prioridadeNumero;


    listarTarefas();


    mostrarMensagem(
        "Prioridade alterada com sucesso!",
        "sucesso"
    );
}


// ==========================================
// CONVERTER PRIORIDADE EM TEXTO
// ==========================================

function obterPrioridade(prioridade) {

    if (prioridade === 1) {
        return "1 - Alta";
    }

    if (prioridade === 2) {
        return "2 - Média";
    }

    if (prioridade === 3) {
        return "3 - Baixa";
    }

}


// ==========================================
// MOSTRAR MENSAGEM
// ==========================================

function mostrarMensagem(texto, tipo) {

    mensagem.textContent = texto;
    mensagem.className = tipo;


    setTimeout(function () {
        mensagem.textContent = "";
    }, 3000);
}


// Exibe a lista inicialmente
listarTarefas();