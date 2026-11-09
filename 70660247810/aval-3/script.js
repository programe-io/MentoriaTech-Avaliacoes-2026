
document.addEventListener("DOMContentLoaded", function () {

    // 1. Capturando os elementos do DOM

    const formTarefa = document.getElementById("form-tarefa");

    const inputTitulo = document.getElementById("input-titulo");

    const listaTarefas = document.getElementById("lista-tarefas");

    const total = document.getElementById("total");

    const pendentes = document.getElementById("pendentes");

    const concluidas = document.getElementById("concluidas");


    // 2. Criando o array de tarefas

    let tarefas = [];

    try {
        const dadosSalvos = JSON.parse(
            localStorage.getItem("tarefas")
        );

        if (Array.isArray(dadosSalvos)) {
            tarefas = dadosSalvos;
        }
    } catch (erro) {
        console.error("Erro ao carregar tarefas:", erro);
    }


    // 3. Gerando códigos automaticamente

    let contadorCodigo = tarefas.reduce(
        (maior, tarefa) => Math.max(maior, Number(tarefa.id) || 0),
        0
    );

    function gerarCodigo() {
        contadorCodigo++;
        return contadorCodigo;
    }


    // 4. Salvando os dados

    function salvarTarefas() {
        localStorage.setItem(
            "tarefas",
            JSON.stringify(tarefas)
        );
    }


    // 5. Função de renderização

    function render() {

        // Limpa a lista antes de atualizar
        listaTarefas.innerHTML = "";

        // Percorre o array de tarefas
        tarefas.forEach(function (tarefa) {

            // Cria um elemento li
            const li = document.createElement("li");

            li.className = "tarefa";

            if (tarefa.concluida) {
                li.classList.add("concluida");
            }

            // Cria a área de informações
            const info = document.createElement("div");

            info.className = "info";

            // Cria o título
            const nome = document.createElement("strong");

            nome.className = "nome";

            nome.textContent = tarefa.titulo;

            // Cria as informações adicionais
            const detalhes = document.createElement("p");

            detalhes.textContent =
                "Código: " + tarefa.id +
                " | Status: " +
                (tarefa.concluida ? "Concluída" : "Pendente");

            info.appendChild(nome);

            info.appendChild(detalhes);


            // Cria a área dos botões
            const acoes = document.createElement("div");

            acoes.className = "acoes";


            // Botão concluir
            const btnConcluir = document.createElement("button");

            btnConcluir.type = "button";

            btnConcluir.className = "concluir";

            btnConcluir.dataset.id = tarefa.id;

            btnConcluir.dataset.acao = "concluir";

            btnConcluir.textContent = tarefa.concluida
                ? "Reabrir"
                : "Concluir";


            // Botão excluir
            const btnExcluir = document.createElement("button");

            btnExcluir.type = "button";

            btnExcluir.className = "excluir";

            btnExcluir.dataset.id = tarefa.id;

            btnExcluir.dataset.acao = "excluir";

            btnExcluir.textContent = "Excluir";


            // Adiciona os botões
            acoes.appendChild(btnConcluir);

            acoes.appendChild(btnExcluir);


            // Monta o item completo
            li.appendChild(info);

            li.appendChild(acoes);


            // Insere o item na lista
            listaTarefas.appendChild(li);

        });


        // 6. Atualizando os contadores

        total.textContent = tarefas.length;

        pendentes.textContent = tarefas.filter(
            tarefa => !tarefa.concluida
        ).length;

        concluidas.textContent = tarefas.filter(
            tarefa => tarefa.concluida
        ).length;

    }


    // 7. Evento de cadastro de tarefas

    formTarefa.addEventListener("submit", function (event) {

        // Impede o recarregamento da página
        event.preventDefault();

        // Captura e limpa os espaços do texto
        const novoTitulo = inputTitulo.value.trim();

        // Verifica se o campo está vazio
        if (novoTitulo === "") {

            alert("Digite o nome da tarefa!");

            inputTitulo.focus();

            return;
        }


        // Cria um novo objeto
        const novaTarefa = {

            id: gerarCodigo(),

            titulo: novoTitulo,

            concluida: false

        };


        // Adiciona a tarefa ao array
        tarefas.push(novaTarefa);


        // Salva os dados
        salvarTarefas();


        // Limpa o campo
        inputTitulo.value = "";


        // Atualiza a interface
        render();


        // Devolve o foco ao input
        inputTitulo.focus();

    });


    // 8. Delegação de eventos na lista

    listaTarefas.addEventListener("click", function (event) {

        const botao = event.target.closest("button[data-acao]");

        if (!botao || !listaTarefas.contains(botao)) {
            return;
        }

        const id = Number(botao.dataset.id);

        const acao = botao.dataset.acao;


        // Localiza a tarefa
        const tarefa = tarefas.find(
            item => item.id === id
        );

        if (!tarefa) return;


        // Concluir ou reabrir
        if (acao === "concluir") {

            tarefa.concluida = !tarefa.concluida;

        }


        // Excluir tarefa
        if (acao === "excluir") {

            if (!confirm("Deseja excluir esta tarefa?")) {
                return;
            }

            tarefas = tarefas.filter(
                item => item.id !== id
            );

        }


        // Salva e atualiza
        salvarTarefas();

        render();

    });


    // 9. Renderização inicial

    render();

    console.log("Gerenciador de tarefas iniciado!");

});
