
document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("formTarefa");
    const nomeTarefa = document.getElementById("nomeTarefa");
    const prioridade = document.getElementById("prioridade");
    const dataTarefa = document.getElementById("dataTarefa");
    const listaTarefas = document.getElementById("listaTarefas");

    const total = document.getElementById("total");
    const pendentes = document.getElementById("pendentes");
    const concluidas = document.getElementById("concluidas");

    let tarefas = [];

    try {
        tarefas = JSON.parse(
            localStorage.getItem("tarefas") || "[]"
        );

        if (!Array.isArray(tarefas)) {
            tarefas = [];
        }
    } catch (erro) {
        tarefas = [];
    }

    let filtroAtual = "todas";

    // Salvar tarefas
    function salvar() {
        localStorage.setItem(
            "tarefas",
            JSON.stringify(tarefas)
        );
    }

    // Cadastrar tarefa
    form.addEventListener("submit", function (event) {

        event.preventDefault();

        const nome = nomeTarefa.value.trim();

        if (nome === "") {
            alert("Digite o nome da tarefa!");
            nomeTarefa.focus();
            return;
        }

        const novaTarefa = {
            id: Date.now(),
            nome: nome,
            prioridade: prioridade.value,
            data: dataTarefa.value,
            concluida: false
        };

        tarefas.push(novaTarefa);

        salvar();

        atualizarLista();

        form.reset();

        prioridade.value = "Média";

        nomeTarefa.focus();

    });

    // Mostrar tarefas na tela
    function atualizarLista() {

        listaTarefas.innerHTML = "";

        const filtradas = tarefas.filter(function (tarefa) {

            if (filtroAtual === "pendentes") {
                return !tarefa.concluida;
            }

            if (filtroAtual === "concluidas") {
                return tarefa.concluida;
            }

            return true;

        });

        if (filtradas.length === 0) {

            const mensagem = document.createElement("li");

            mensagem.className = "vazio";
            mensagem.textContent = "Nenhuma tarefa encontrada!";

            listaTarefas.appendChild(mensagem);

        }

        filtradas.forEach(function (tarefa) {

            const li = document.createElement("li");

            li.className = "tarefa";

            if (tarefa.concluida) {
                li.classList.add("concluida");
            }

            const info = document.createElement("div");
            info.className = "info";

            const nome = document.createElement("strong");
            nome.className = "nome";
            nome.textContent = tarefa.nome;

            const detalhes = document.createElement("p");

            detalhes.textContent =
                "Prioridade: " + tarefa.prioridade +
                (tarefa.data ? " | Data: " + tarefa.data : "");

            info.appendChild(nome);
            info.appendChild(detalhes);

            const acoes = document.createElement("div");
            acoes.className = "acoes";

            // Botão concluir
            const btnConcluir = document.createElement("button");

            btnConcluir.type = "button";
            btnConcluir.className = "concluir";
            btnConcluir.textContent = tarefa.concluida
                ? "Reabrir"
                : "Concluir";

            btnConcluir.addEventListener("click", function () {

                tarefa.concluida = !tarefa.concluida;

                salvar();
                atualizarLista();

            });

            // Botão editar
            const btnEditar = document.createElement("button");

            btnEditar.type = "button";
            btnEditar.className = "editar";
            btnEditar.textContent = "Editar";

            btnEditar.addEventListener("click", function () {

                const novoNome = prompt(
                    "Digite o novo nome da tarefa:",
                    tarefa.nome
                );

                if (novoNome === null) return;

                if (novoNome.trim() === "") {
                    alert("O nome não pode ficar vazio!");
                    return;
                }

                tarefa.nome = novoNome.trim();

                salvar();
                atualizarLista();

            });

            // Botão excluir
            const btnExcluir = document.createElement("button");

            btnExcluir.type = "button";
            btnExcluir.className = "excluir";
            btnExcluir.textContent = "Excluir";

            btnExcluir.addEventListener("click", function () {

                if (confirm("Deseja excluir esta tarefa?")) {

                    tarefas = tarefas.filter(function (item) {
                        return item.id !== tarefa.id;
                    });

                    salvar();
                    atualizarLista();

                }

            });

            acoes.appendChild(btnConcluir);
            acoes.appendChild(btnEditar);
            acoes.appendChild(btnExcluir);

            li.appendChild(info);
            li.appendChild(acoes);

            listaTarefas.appendChild(li);

        });

        // Atualizar contadores
        total.textContent = tarefas.length;

        pendentes.textContent = tarefas.filter(
            tarefa => !tarefa.concluida
        ).length;

        concluidas.textContent = tarefas.filter(
            tarefa => tarefa.concluida
        ).length;

    }

    // Filtros
    document.querySelectorAll("[data-filtro]").forEach(
        function (botao) {

            botao.addEventListener("click", function () {

                filtroAtual = botao.dataset.filtro;

                document.querySelectorAll("[data-filtro]").forEach(
                    function (b) {
                        b.classList.remove("ativo");
                    }
                );

                botao.classList.add("ativo");

                atualizarLista();

            });

        }
    );

    // Carregar tarefas ao abrir o sistema
    atualizarLista();

    console.log("Gerenciador de Tarefas iniciado com sucesso!");

});
