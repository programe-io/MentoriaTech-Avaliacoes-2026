// ==========================================
//        SISTEMA DE TAREFAS - JAVASCRIPT
// ==========================================

// Lista onde as tarefas serão armazenadas
let tarefas = [];

// Contador para criar IDs únicos
let proximoId = 1;


// ==========================================
// ADICIONAR TAREFA
// ==========================================

function adicionarTarefa(nome) {

    if (!nome || nome.trim() === "") {
        alert("Digite uma tarefa!");
        return;
    }

    const novaTarefa = {
        id: proximoId++,
        nome: nome.trim(),
        concluida: false,
        criadaEm: new Date()
    };

    tarefas.push(novaTarefa);

    atualizarTela();
}


// ==========================================
// REMOVER TAREFA
// ==========================================

function removerTarefa(id) {

    tarefas = tarefas.filter(function(tarefa) {
        return tarefa.id !== id;
    });

    atualizarTela();
}


// ==========================================
// CONCLUIR TAREFA
// ==========================================

function concluirTarefa(id) {

    const tarefa = tarefas.find(function(tarefa) {
        return tarefa.id === id;
    });

    if (tarefa) {
        tarefa.concluida = !tarefa.concluida;
    }

    atualizarTela();
}


// ==========================================
// EDITAR TAREFA
// ==========================================

function editarTarefa(id) {

    const tarefa = tarefas.find(function(tarefa) {
        return tarefa.id === id;
    });

    if (!tarefa) {
        return;
    }

    const novoNome = prompt(
        "Digite o novo nome da tarefa:",
        tarefa.nome
    );

    if (novoNome && novoNome.trim() !== "") {
        tarefa.nome = novoNome.trim();
    }

    atualizarTela();
}


// ==========================================
// PESQUISAR TAREFAS
// ==========================================

function pesquisarTarefas(texto) {

    const resultado = tarefas.filter(function(tarefa) {

        return tarefa.nome
            .toLowerCase()
            .includes(texto.toLowerCase());

    });

    mostrarTarefas(resultado);
}


// ==========================================
// MOSTRAR TAREFAS
// ==========================================

function mostrarTarefas(lista = tarefas) {

    const container = document.getElementById("lista-tarefas");

    if (!container) {
        return;
    }

    container.innerHTML = "";

    if (lista.length === 0) {

        container.innerHTML = `
            <p class="sem-tarefas">
                Nenhuma tarefa encontrada.
            </p>
        `;

        return;
    }

    lista.forEach(function(tarefa) {

        const item = document.createElement("div");

        item.classList.add("tarefa");

        if (tarefa.concluida) {
            item.classList.add("concluida");
        }

        item.innerHTML = `
            <div class="informacoes">
                <h3>${escaparHTML(tarefa.nome)}</h3>

                <small>
                    ID: ${tarefa.id}
                </small>
            </div>

            <div class="acoes">

                <button
                    onclick="concluirTarefa(${tarefa.id})">
                    ${tarefa.concluida ? "↩️ Desfazer" : "✅ Concluir"}
                </button>

                <button
                    onclick="editarTarefa(${tarefa.id})">
                    ✏️ Editar
                </button>

                <button
                    onclick="removerTarefa(${tarefa.id})">
                    🗑️ Remover
                </button>

            </div>
        `;

        container.appendChild(item);
    });
}


// ==========================================
// ESCAPAR HTML
// ==========================================

function escaparHTML(texto) {

    const elemento = document.createElement("div");

    elemento.textContent = texto;

    return elemento.innerHTML;
}


// ==========================================
// ATUALIZAR CONTADORES
// ==========================================

function atualizarContadores() {

    const total = tarefas.length;

    const concluidas = tarefas.filter(function(tarefa) {
        return tarefa.concluida;
    }).length;

    const pendentes = total - concluidas;

    const elementoTotal = document.getElementById("total");

    const elementoConcluidas =
        document.getElementById("concluidas");

    const elementoPendentes =
        document.getElementById("pendentes");

    if (elementoTotal) {
        elementoTotal.textContent = total;
    }

    if (elementoConcluidas) {
        elementoConcluidas.textContent = concluidas;
    }

    if (elementoPendentes) {
        elementoPendentes.textContent = pendentes;
    }
}


// ==========================================
// ATUALIZAR TELA
// ==========================================

function atualizarTela() {

    mostrarTarefas();

    atualizarContadores();

    salvarDados();
}


// ==========================================
// APAGAR TODAS AS TAREFAS
// ==========================================

function apagarTodas() {

    if (tarefas.length === 0) {
        alert("Não existem tarefas.");
        return;
    }

    const confirmar = confirm(
        "Tem certeza que deseja apagar todas as tarefas?"
    );

    if (!confirmar) {
        return;
    }

    tarefas = [];

    atualizarTela();
}


// ==========================================
// APAGAR TAREFAS CONCLUÍDAS
// ==========================================

function apagarConcluidas() {

    tarefas = tarefas.filter(function(tarefa) {
        return !tarefa.concluida;
    });

    atualizarTela();
}


// ==========================================
// SALVAR NO NAVEGADOR
// ==========================================

function salvarDados() {

    localStorage.setItem(
        "minhasTarefas",
        JSON.stringify(tarefas)
    );
}


// ==========================================
// CARREGAR DADOS
// ==========================================

function carregarDados() {

    const dados =
        localStorage.getItem("minhasTarefas");

    if (!dados) {
        return;
    }

    try {

        tarefas = JSON.parse(dados);

        if (tarefas.length > 0) {

            const maiorId = Math.max(
                ...tarefas.map(function(tarefa) {
                    return tarefa.id;
                })
            );

            proximoId = maiorId + 1;
        }

    } catch (erro) {

        console.error(
            "Erro ao carregar tarefas:",
            erro
        );

        tarefas = [];
    }
}


// ==========================================
// EVENTOS DA PÁGINA
// ==========================================

document.addEventListener("DOMContentLoaded", function() {

    carregarDados();

    atualizarTela();

    const formulario =
        document.getElementById("formulario");

    const campo =
        document.getElementById("nova-tarefa");

    const pesquisa =
        document.getElementById("pesquisa");

    if (formulario) {

        formulario.addEventListener(
            "submit",
            function(evento) {

                evento.preventDefault();

                adicionarTarefa(campo.value);

                campo.value = "";

                campo.focus();
            }
        );
    }

    if (pesquisa) {

        pesquisa.addEventListener(
            "input",
            function() {

                pesquisarTarefas(
                    pesquisa.value
                );

            }
        );
    }
});


// ==========================================
// EXEMPLO DE TAREFAS
// ==========================================

// Para adicionar tarefas automaticamente,
// retire os comentários abaixo.

// adicionarTarefa("Estudar JavaScript");
// adicionarTarefa("Fazer um projeto");
// adicionarTarefa("Aprender HTML");
// adicionarTarefa("Aprender CSS");


// ==========================================
// MENSAGEM NO CONSOLE
// ==========================================

console.log(
    "🚀 Sistema de tarefas iniciado!"
);

console.log(
    "Total de tarefas:",
    tarefas.length
);