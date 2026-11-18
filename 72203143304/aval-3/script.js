
// ========================================
// 1. ARRAY PARA ARMAZENAR AS TAREFAS
// ========================================

const tarefas = [];

let codigoAtual = 0;


// ========================================
// 2. VALIDAR DADOS DA TAREFA
// ========================================

function validarDadosDaTarefa(titulo, prioridade) {

    if (titulo.trim().length < 5) {
        throw new Error(
            "O título deve possuir no mínimo 5 caracteres."
        );
    }

    if (prioridade < 1 || prioridade > 3) {
        throw new Error(
            "A prioridade deve estar entre 1 e 3."
        );
    }

}


// ========================================
// 3. CADASTRAR TAREFA
// ========================================

function cadastrarTarefa(titulo, prioridade) {

    validarDadosDaTarefa(titulo, prioridade);

    codigoAtual++;

    const novaTarefa = {

        codigo: codigoAtual,

        titulo: titulo.trim(),

        prioridade: Number(prioridade),

        status: true

    };

    tarefas.push(novaTarefa);

    listarTarefas();

    mostrarMensagem("Tarefa cadastrada com sucesso!");

    return novaTarefa;

}


// ========================================
// 4. LISTAR TAREFAS
// ========================================

function listarTarefas() {

    const lista = document.getElementById("listaTarefas");

    lista.innerHTML = "";

    if (tarefas.length === 0) {

        lista.innerHTML =
            '<p class="vazio">Nenhuma tarefa cadastrada.</p>';

        atualizarResumo();

        return tarefas;

    }

    tarefas.forEach(function(tarefa) {

        const elemento = document.createElement("div");

        elemento.className = "tarefa";

        if (!tarefa.status) {
            elemento.classList.add("concluida");
        }

        let prioridadeTexto;

        if (tarefa.prioridade === 1) {
            prioridadeTexto = "Alta";
        } else if (tarefa.prioridade === 2) {
            prioridadeTexto = "Média";
        } else {
            prioridadeTexto = "Baixa";
        }

        elemento.innerHTML = `

            <div>

                <h3>${escaparHTML(tarefa.titulo)}</h3>

                <p>Código: ${tarefa.codigo}</p>

                <p>Prioridade: ${prioridadeTexto}</p>

                <p class="${tarefa.status ? "pendente" : "finalizada"}">
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


// ========================================
// 5. BUSCAR TAREFA COM FIND
// ========================================

function buscarTarefa(codigo) {

    const tarefaEncontrada = tarefas.find(function(tarefa) {

        return tarefa.codigo === Number(codigo);

    });

    if (!tarefaEncontrada) {

        throw new Error("Código de tarefa não encontrado.");

    }

    return tarefaEncontrada;

}


// ========================================
// 6. CONCLUIR TAREFA
// ========================================

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


// ========================================
// 7. ALTERAR PRIORIDADE
// ========================================

function alterarPrioridade(codigo) {

    try {

        const tarefa = buscarTarefa(codigo);

        const novaPrioridade = prompt(
            "Digite a nova prioridade:\n\n" +
            "1 - Alta\n" +
            "2 - Média\n" +
            "3 - Baixa"
        );

        if (novaPrioridade === null) {
            return;
        }

        validarDadosDaTarefa(
            tarefa.titulo,
            Number(novaPrioridade)
        );

        tarefa.prioridade = Number(novaPrioridade);

        listarTarefas();

        mostrarMensagem("Prioridade alterada com sucesso!");

    } catch (erro) {

        mostrarMensagem(erro.message, true);

    }

}


// ========================================
// 8. ATUALIZAR RESUMO
// ========================================

function atualizarResumo() {

    const total = tarefas.length;

    const pendentes = tarefas.filter(
        tarefa => tarefa.status === true
    ).length;

    const concluidas = tarefas.filter(
        tarefa => tarefa.status === false
    ).length;

    document.getElementById("total").textContent = total;

    document.getElementById("pendentes").textContent = pendentes;

    document.getElementById("concluidas").textContent = concluidas;

}


// ========================================
// 9. EXIBIR MENSAGENS
// ========================================

function mostrarMensagem(texto, erro = false) {

    const mensagem = document.getElementById("mensagem");

    mensagem.textContent = texto;

    mensagem.classList.toggle("erro", erro);

    mensagem.style.display = "block";

    setTimeout(function() {

        mensagem.style.display = "none";

    }, 3000);

}


// ========================================
// 10. PROTEGER TEXTO HTML
// ========================================

function escaparHTML(texto) {

    return texto.replace(/[&<>"']/g, function(caractere) {

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


// ========================================
// 11. EVENTO DE CADASTRO
// ========================================

document.getElementById("formTarefa").addEventListener(
    "submit",
    function(evento) {

        evento.preventDefault();

        try {

            const titulo = document.getElementById("titulo").value;

            const prioridade = Number(
                document.getElementById("prioridade").value
            );

            cadastrarTarefa(titulo, prioridade);

            document.getElementById("formTarefa").reset();

        } catch (erro) {

            mostrarMensagem(erro.message, true);

        }

    }
);


// ========================================
// 12. EVENTO DE BUSCA
// ========================================

document.getElementById("btnBuscar").addEventListener(
    "click",
    function() {

        try {

            const codigo = document.getElementById("codigoBusca").value;

            if (!codigo || Number(codigo) <= 0) {

                throw new Error("Informe um código válido.");

            }

            const tarefa = buscarTarefa(codigo);

            document.getElementById("resultadoBusca").innerHTML = `

                <strong>Tarefa encontrada!</strong><br>

                Código: ${tarefa.codigo}<br>

                Título: ${escaparHTML(tarefa.titulo)}<br>

                Prioridade: ${tarefa.prioridade}<br>

                Status: ${tarefa.status ? "Em andamento" : "Concluída"}

            `;

        } catch (erro) {

            document.getElementById("resultadoBusca").textContent =
                erro.message;

        }

    }
);


// ========================================
// 13. MOSTRAR TODAS AS TAREFAS
// ========================================

document.getElementById("btnTodas").addEventListener(
    "click",
    function() {

        document.getElementById("codigoBusca").value = "";

        document.getElementById("resultadoBusca").textContent = "";

        listarTarefas();

    }
);


// ========================================
// 14. INICIALIZAR SISTEMA
// ========================================

listarTarefas();
