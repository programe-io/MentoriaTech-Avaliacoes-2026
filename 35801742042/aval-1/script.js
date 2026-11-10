<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gerenciador de Tarefas</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

    <div class="container">
        <header>
            <h1>Gerenciador de Tarefas</h1>
            <p>Organize suas tarefas de maneira simples!</p>
        </header>

        <section class="formulario">
            <h2>Cadastrar nova tarefa</h2>

            <form id="formTarefa">
                <label for="titulo">Título da tarefa:</label>
                <input
                    type="text"
                    id="titulo"
                    placeholder="Digite o título da tarefa"
                    required
                >

                <label for="prioridade">Prioridade:</label>
                <select id="prioridade">
                    <option value="1">1 - Alta</option>
                    <option value="2">2 - Média</option>
                    <option value="3">3 - Baixa</option>
                </select>

                <button type="submit">Cadastrar tarefa</button>
            </form>
        </section>

        <section class="lista">
            <h2>Minhas tarefas</h2>
            <div id="mensagem"></div>
            <div id="listaTarefas"></div>
        </section>
    </div>

    <script>
        // Array que armazena as tarefas
        let tarefas = [];

        // Contador independente para gerar códigos
        let proximoCodigo = 0;

        // Valida os dados da tarefa
        function validarDadosDaTarefa(titulo, prioridade) {
            if (!titulo || titulo.trim().length < 5) {
                throw new Error("O título deve ter pelo menos 5 caracteres.");
            }

            if (![1, 2, 3].includes(Number(prioridade))) {
                throw new Error("A prioridade deve ser 1, 2 ou 3.");
            }
        }

        // Busca uma tarefa pelo código
        function buscarTarefa(codigo) {
            const tarefa = tarefas.find(t => t.codigo === Number(codigo));

            if (!tarefa) {
                throw new Error("Tarefa não encontrada!");
            }

            return tarefa;
        }

        // Cadastra uma nova tarefa
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

            return novaTarefa;
        }

        // Lista todas as tarefas
        function listarTarefas() {
            return tarefas;
        }

        // Conclui uma tarefa
        function concluirTarefa(codigo) {
            const tarefa = buscarTarefa(codigo);

            if (tarefa.status === false) {
                throw new Error("Essa tarefa já foi concluída!");
            }

            tarefa.status = false;
        }

        // Altera a prioridade de uma tarefa
        function alterarPrioridade(codigo, novaPrioridade) {
            const tarefa = buscarTarefa(codigo);

            validarDadosDaTarefa(tarefa.titulo, novaPrioridade);

            tarefa.prioridade = Number(novaPrioridade);
        }

        // Exibe mensagens na tela
        function mostrarMensagem(texto, tipo) {
            const mensagem = document.getElementById("mensagem");

            mensagem.textContent = texto;
            mensagem.className = tipo;
        }

        // Atualiza a lista de tarefas na tela
        function atualizarTela() {
            const lista = document.getElementById("listaTarefas");
            lista.innerHTML = "";

            const tarefasCadastradas = listarTarefas();

            if (tarefasCadastradas.length === 0) {
                lista.textContent = "Nenhuma tarefa cadastrada.";
                return;
            }

            tarefasCadastradas.forEach(tarefa => {
                const card = document.createElement("div");
                card.className = "tarefa";

                const titulo = document.createElement("h3");
                titulo.textContent = tarefa.titulo;

                const codigo = document.createElement("p");
                codigo.textContent = "Código: " + tarefa.codigo;

                const prioridade = document.createElement("p");
                prioridade.textContent =
                    "Prioridade: " +
                    (tarefa.prioridade === 1 ? "Alta" :
                    tarefa.prioridade === 2 ? "Média" : "Baixa");

                const status = document.createElement("p");
                status.textContent = tarefa.status
                    ? "Status: Em andamento"
                    : "Status: Concluída";

                card.appendChild(titulo);
                card.appendChild(codigo);
                card.appendChild(prioridade);
                card.appendChild(status);

                if (tarefa.status) {
                    const acoes = document.createElement("div");
                    acoes.className = "acoes";

                    const select = document.createElement("select");
                    select.id = "prioridade-" + tarefa.codigo;

                    for (let i = 1; i <= 3; i++) {
                        const opcao = document.createElement("option");
                        opcao.value = i;
                        opcao.textContent =
                            i === 1 ? "Alta" :
                            i === 2 ? "Média" : "Baixa";

                        if (i === tarefa.prioridade) {
                            opcao.selected = true;
                        }

                        select.appendChild(opcao);
                    }

                    const botaoAlterar = document.createElement("button");
                    botaoAlterar.textContent = "Alterar prioridade";
                    botaoAlterar.className = "botao-alterar";
                    botaoAlterar.onclick = function () {
                        alterarPrioridadeNaTela(tarefa.codigo);
                    };

                    const botaoConcluir = document.createElement("button");
                    botaoConcluir.textContent = "Concluir";
                    botaoConcluir.className = "botao-concluir";
                    botaoConcluir.onclick = function () {
                        concluirNaTela(tarefa.codigo);
                    };

                    acoes.appendChild(select);
                    acoes.appendChild(botaoAlterar);
                    acoes.appendChild(botaoConcluir);

                    card.appendChild(acoes);
                }

                lista.appendChild(card);
            });
        }

        // Cadastra tarefa pela tela
        document.getElementById("formTarefa").addEventListener("submit", function(event) {
            event.preventDefault();

            const titulo = document.getElementById("titulo").value;
            const prioridade = document.getElementById("prioridade").value;

            try {
                cadastrarTarefa(titulo, prioridade);

                mostrarMensagem("Tarefa cadastrada com sucesso!", "sucesso");

                document.getElementById("formTarefa").reset();

                atualizarTela();
            } catch (erro) {
                mostrarMensagem(erro.message, "erro");
            }
        });

        // Conclui tarefa pela tela
        function concluirNaTela(codigo) {
            try {
                concluirTarefa(codigo);
                mostrarMensagem("Tarefa concluída com sucesso!", "sucesso");
                atualizarTela();
            } catch (erro) {
                mostrarMensagem(erro.message, "erro");
            }
        }

        // Altera prioridade pela tela
        function alterarPrioridadeNaTela(codigo) {
            const novaPrioridade =
                document.getElementById("prioridade-" + codigo).value;

            try {
                alterarPrioridade(codigo, novaPrioridade);
                mostrarMensagem("Prioridade alterada com sucesso!", "sucesso");
                atualizarTela();
            } catch (erro) {
                mostrarMensagem(erro.message, "erro");
            }
        }

        // Exibe a lista inicial
        atualizarTela();
    </script>

</body>
</html>