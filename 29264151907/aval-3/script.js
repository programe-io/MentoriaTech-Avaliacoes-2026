
const formulario = document.getElementById("form-tarefa");
const campoTitulo = document.getElementById("titulo-tarefa");
const campoPrioridade = document.getElementById("prioridade");
const listaTarefas = document.getElementById("lista-tarefas");
const contador = document.getElementById("contador");

// Array de objetos que armazena as tarefas
let tarefas = [
    {
        codigo: 1,
        titulo: "Estudar HTML e CSS",
        prioridade: "Alta",
        concluida: false
    },
    {
        codigo: 2,
        titulo: "Praticar JavaScript",
        prioridade: "Média",
        concluida: false
    },
    {
        codigo: 3,
        titulo: "Revisar os conteúdos da aula",
        prioridade: "Baixa",
        concluida: true
    }
];

// Função para evitar que textos sejam interpretados como HTML
function escaparHTML(texto) {
    return String(texto).replace(/[&<>"']/g, function (caractere) {
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

// Função responsável por atualizar a tela
function render() {

    // 1. Limpar o container atual
    listaTarefas.innerHTML = "";

    // Atualizar contador
    contador.textContent =
        tarefas.length + (tarefas.length === 1 ? " tarefa" : " tarefas");

    // Verificar se existem tarefas
    if (tarefas.length === 0) {
        listaTarefas.innerHTML = `
            <p class="vazio">
                Nenhuma tarefa cadastrada.
                Adicione uma nova tarefa!
            </p>
        `;

        return;
    }

    // 2. Percorrer o Array e gerar o HTML
    tarefas.forEach(function (tarefa) {

        let classePrioridade = "";

        if (tarefa.prioridade === "Baixa") {
            classePrioridade = "baixa";
        } else if (tarefa.prioridade === "Média") {
            classePrioridade = "media";
        } else {
            classePrioridade = "alta";
        }

        const classeConcluida = tarefa.concluida
            ? "concluida"
            : "";

        const textoBotao = tarefa.concluida
            ? "Desfazer"
            : "Concluir";

        // 3. Gerar os elementos HTML
        const elementoHTML = `
            <article class="tarefa">

                <div class="tarefa-info ${classeConcluida}">

                    <h3>${escaparHTML(tarefa.titulo)}</h3>

                    <p>
                        Código: ${tarefa.codigo}
                    </p>

                    <span class="prioridade ${classePrioridade}">
                        ${escaparHTML(tarefa.prioridade)}
                    </span>

                </div>

                <div class="acoes">

                    <button
                        class="btn-concluir"
                        data-acao="concluir"
                        data-codigo="${tarefa.codigo}"
                    >
                        ${textoBotao}
                    </button>

                    <button
                        class="btn-excluir"
                        data-acao="excluir"
                        data-codigo="${tarefa.codigo}"
                    >
                        Excluir
                    </button>

                </div>

            </article>
        `;

        // 4. Inserir o HTML no DOM
        listaTarefas.insertAdjacentHTML(
            "beforeend",
            elementoHTML
        );

    });
}

// Cadastrar uma nova tarefa
formulario.addEventListener("submit", function (evento) {

    evento.preventDefault();

    const titulo = campoTitulo.value.trim();
    const prioridade = campoPrioridade.value;

    // Validar o título
    if (titulo.length < 5) {
        alert("O título deve ter no mínimo 5 caracteres!");
        return;
    }

    // Criar um novo objeto
    const novaTarefa = {
        codigo: Date.now(),
        titulo: titulo,
        prioridade: prioridade,
        concluida: false
    };

    // Adicionar o objeto ao Array
    tarefas.push(novaTarefa);

    // Atualizar a interface
    render();

    // Limpar o formulário
    formulario.reset();
});

// Concluir ou excluir tarefas
listaTarefas.addEventListener("click", function (evento) {

    const botao = evento.target.closest("button[data-acao]");

    if (!botao) {
        return;
    }

    const codigo = Number(botao.dataset.codigo);
    const acao = botao.dataset.acao;

    if (acao === "concluir") {

        // Encontrar a tarefa pelo código
        const tarefa = tarefas.find(function (item) {
            return item.codigo === codigo;
        });

        if (tarefa) {

            // Modificar o objeto dentro do Array
            tarefa.concluida = !tarefa.concluida;

            // Atualizar a interface
            render();
        }

    } else if (acao === "excluir") {

        // Remover a tarefa do Array
        tarefas = tarefas.filter(function (item) {
            return item.codigo !== codigo;
        });

        // Atualizar a interface
        render();
    }

});

// Renderizar as tarefas ao iniciar a página
render();
