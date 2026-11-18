
// ==========================================
// 1. ARMAZENAMENTO DAS TAREFAS
// ==========================================

const tarefas = [];

let proximoCodigo = 0;


// ==========================================
// 2. FUNÇÃO PARA EXIBIR MENSAGENS
// ==========================================

function mostrarMensagem(texto, erro = false) {

    const mensagem = document.getElementById("mensagem");

    mensagem.textContent = texto;

    mensagem.classList.toggle("erro", erro);

    mensagem.style.display = "block";

    setTimeout(() => {
        mensagem.style.display = "none";
    }, 3000);
}


// ==========================================
// 3. VALIDAÇÃO DOS DADOS
// ==========================================

function validarDadosDaTarefa(titulo, prioridade) {

    if (typeof titulo !== "string" || titulo.trim().length < 5) {
        throw new Error("O título deve possuir no mínimo 5 caracteres.");
    }

    if (
        ![1, 2, 3].includes(Number(prioridade))
    ) {
        throw new Error("A prioridade deve estar entre 1 e 3.");
    }

}


// ==========================================
// 4. CADASTRAR UMA NOVA TAREFA
// ==========================================

function cadastrarTarefa(titulo, prioridade) {

    validarDadosDaTarefa(titulo, prioridade);

    proximoCodigo++;

    const novaTarefa = {

        codigo: proximoCodigo,

        titulo: titulo.trim(),

        prioridade: Number(prioridade),

        status: true

    };

    tarefas.push(novaTarefa);

    listarTarefas();

    mostrarMensagem("Tarefa cadastrada com sucesso!");

    return novaTarefa;
}


// ==========================================
// 5. LISTAR AS TAREFAS
// ==========================================

function listarTarefas() {

    const lista = document.getElementById("listaTarefas");

    lista.innerHTML = "";

    if (tarefas.length === 0) {

        lista.innerHTML = `
            <p class="vazio">Nenhuma tarefa cadastrada.</p>
        `;

        atualizarResumo();

        return tarefas;
    }

    tarefas.forEach((tarefa) => {

        const elemento = document.createElement("div");

        elemento.className = "tarefa";

        if (!tarefa.status) {
            elemento.classList.add("concluida");
        }

        const prioridadeTexto = {
            1: "Alta",
            2: "Média",
            3: "Baixa"
        };

        elemento.innerHTML = `
            <div>
                <h3>${escaparHTML(tarefa.titulo)}</h3>

                <p>Código: ${tarefa.codigo}</p>

                <p>
                    Prioridade:
                    ${prioridadeTexto[tarefa.prioridade]}
                </p>

                <p class="status ${tarefa.status ? "pendente" : "finalizada"}">
                    ${tarefa.status ? "Em andamento" : "Concluída"}
                </p>
            </div>

            <div class="acoes">

                <button
                    class="btn-concluir"
                    onclick="concluirTarefa(${tarefa.codigo})"
                    ${!tarefa.status ? "disabled" : ""}
                >
                    Concluir
                </button>

                <button
                    class="btn-prioridade"
                    onclick="alterarPrioridade(${tarefa.codigo})"
                >
                    Alterar prioridade
                </button>

            </div>
        `;

        lista.appendChild(elemento);

    });

    atualizarResumo();

    return tarefas;
}


// ==========================================
// 6. PROTEGER A EXIBIÇÃO DO TEXTO
// ==========================================

function escaparHTML(texto) {

    return texto.replace(/[&<>"']/g, caractere => {

        const entidades = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        };

        return entidades[caractere];

    });

}


// ==========================================
// 7. BUSCAR UMA TAREFA PELO CÓDIGO
// ==========================================

function buscarTarefa(codigo) {

    const tarefaEncontrada = tarefas.find((tarefa) => {

        return tarefa.codigo === Number(codigo);

    });

    if (!tarefaEncontrada) {

        throw new Error("Tarefa não encontrada.");

    }

    return tarefaEncontrada;
}


// ==========================================
// 8. CONCLUIR UMA TAREFA
// ==========================================

function concluirTarefa(codigo) {

    try {

        const tarefa = buscarTarefa(codigo);

        if (!tarefa.status) {

            throw new Error("Esta tarefa já foi concluída.");

        }

        tarefa.status = false;

        listarTarefas();

        mostrarMensagem("Tarefa concluída com sucesso!");

    } catch (erro) {

        mostrarMensagem(erro.message, true);

    }

}


// ==========================================
// 9. ALTERAR A PRIORIDADE
// ==========================================

function alterarPrioridade(codigo) {

    try {

        const tarefa = buscarTarefa(codigo);

        const novaPrioridade = prompt(
            "Digite a nova prioridade:\n\n1 - Alta\n2 - Média\n3 - Baixa"
        );

        if (novaPrioridade === null) {
            return;
        }

        validarDadosDaTarefa(
            tarefa.titulo,
            novaPrioridade
        );

        tarefa.prioridade = Number(novaPrioridade);

        listarTarefas();

        mostrarMensagem("Prioridade alterada com sucesso!");

    } catch (erro) {

        mostrarMensagem(erro.message, true);

    }

}


// ==========================================
// 10. ATUALIZAR OS CONTADORES
// ==========================================

function atualizarResumo() {

    const total = tarefas.length;

    const pendentes = tarefas.filter(
        tarefa => tarefa.status
    ).length;

    const concluidas = tarefas.filter(
        tarefa => !tarefa.status
    ).length;

    document.getElementById("totalTarefas").textContent = total;

    document.getElementById("tarefasPendentes").textContent = pendentes;

    document.getElementById("tarefasConcluidas").textContent = concluidas;

}


// ==========================================
// 11. EVENTO DE CADASTRO
// ==========================================

document.getElementById("formTarefa").addEventListener("submit", (evento) => {

    evento.preventDefault();

    try {

        const titulo = document.getElementById("titulo").value;

        const prioridade = document.getElementById("prioridade").value;

        cadastrarTarefa(titulo, prioridade);

        document.getElementById("formTarefa").reset();

    } catch (erro) {

        mostrarMensagem(erro.message, true);

    }

});


// ==========================================
// 12. EVENTO DE BUSCA
// ==========================================

document.getElementById("btnBuscar").addEventListener("click", () => {

    try {

        const codigo = document.getElementById("codigoBusca").value;

        if (!codigo || Number(codigo) <= 0) {
            throw new Error("Informe um código válido.");
        }

        const tarefa = buscarTarefa(codigo);

        document.getElementById("resultadoBusca").innerHTML = `
            <strong>Tarefa encontrada:</strong><br>
            Código: ${tarefa.codigo}<br>
            Título: ${escaparHTML(tarefa.titulo)}<br>
            Prioridade: ${tarefa.prioridade}<br>
            Status: ${tarefa.status ? "Em andamento" : "Concluída"}
        `;

    } catch (erro) {

        document.getElementById("resultadoBusca").textContent = erro.message;

    }

});


// ==========================================
// 13. MOSTRAR TODAS AS TAREFAS
// ==========================================

document.getElementById("btnMostrarTodas").addEventListener("click", () => {

    document.getElementById("codigoBusca").value = "";

    document.getElementById("resultadoBusca").textContent = "";

    listarTarefas();

});


// ==========================================
// 14. INICIALIZAÇÃO DO SISTEMA
// ==========================================

listarTarefas();
