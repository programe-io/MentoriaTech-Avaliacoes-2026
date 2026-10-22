 <script>
    let tarefas = [];
    let geradorCodigo = 0;

    const form = document.getElementById("formTarefa");
    const campoTitulo = document.getElementById("titulo");
    const campoPrioridade = document.getElementById("prioridade");
    const listaTarefas = document.getElementById("listaTarefas");
    const mensagem = document.getElementById("mensagem");
    const contador = document.getElementById("contador");

    function validarDadosTarefa(titulo, prioridade) {
      if (
        typeof titulo !== "string" ||
        titulo.trim().length < 5
      ) {
        throw new Error(
          "O título deve ter no mínimo 5 caracteres."
        );
      }

      if (
        !Number.isInteger(prioridade) ||
        prioridade < 1 ||
        prioridade > 3
      ) {
        throw new Error(
          "Informe uma prioridade inteira entre 1 e 3."
        );
      }
    }

    function buscarTarefa(codigoTarefa) {
      const tarefaBuscada = tarefas.find(
        tarefa => tarefa.codigo === codigoTarefa
      );

      if (!tarefaBuscada) {
        throw new Error("Código de tarefa não encontrado.");
      }

      return tarefaBuscada;
    }

    function cadastrarTarefa(titulo, prioridade) {
      validarDadosTarefa(titulo, prioridade);

      const tarefa = {
        codigo: ++geradorCodigo,
        titulo: titulo.trim(),
        prioridade: prioridade,
        status: true
      };

      tarefas.push(tarefa);
      renderizarTarefas();
    }

    function listarTarefas() {
      return tarefas;
    }

    function concluirTarefa(codigo) {
      const tarefa = buscarTarefa(codigo);

      if (tarefa.status === false) {
        throw new Error("Essa tarefa já foi concluída.");
      }

      tarefa.status = false;
      renderizarTarefas();
    }

    function alterarPrioridade(codigo, novaPrioridade) {
      const tarefa = buscarTarefa(codigo);

      validarDadosTarefa(tarefa.titulo, novaPrioridade);

      tarefa.prioridade = novaPrioridade;
      renderizarTarefas();
    }

    function mostrarMensagem(texto, tipo) {
      mensagem.textContent = texto;
      mensagem.className = "mensagem " + tipo;
    }

    function renderizarTarefas() {
      listaTarefas.replaceChildren();

      const concluidas = tarefas.filter(
        tarefa => tarefa.status === false
      ).length;

      contador.textContent =
        `${tarefas.length} tarefa(s) cadastrada(s) · ` +
        `${concluidas} concluída(s)`;

      if (tarefas.length === 0) {
        const vazio = document.createElement("p");
        vazio.className = "vazia";
        vazio.textContent = "Nenhuma tarefa cadastrada.";
        listaTarefas.appendChild(vazio);
        return;
      }

      tarefas.forEach(tarefa => {
        const cartao = document.createElement("article");
        cartao.className = "tarefa";

        if (!tarefa.status) {
          cartao.classList.add("concluida");
        }

        const informacoes = document.createElement("div");

        const titulo = document.createElement("h3");
        titulo.textContent = `${tarefa.codigo}. ${tarefa.titulo}`;

        const detalhes = document.createElement("p");
        detalhes.className = "detalhes";
        detalhes.textContent =
          `Prioridade: ${tarefa.prioridade} - ` +
          nomePrioridade(tarefa.prioridade);

        const status = document.createElement("p");
        status.className = "status " +
          (tarefa.status ? "pendente" : "");

        status.textContent = tarefa.status
          ? "● Pendente"
          : "✓ Concluída";

        informacoes.append(titulo, detalhes, status);

        const acoes = document.createElement("div");
        acoes.className = "acoes";

        const btnAlterar = document.createElement("button");
        btnAlterar.type = "button";
        btnAlterar.className = "btn-alterar";
        btnAlterar.textContent = "Alterar prioridade";
        btnAlterar.setAttribute(
          "aria-label",
          `Alterar prioridade de ${tarefa.titulo}`
        );

        btnAlterar.addEventListener("click", () => {
          const resposta = prompt(
            "Digite a nova prioridade: 1 (Baixa), 2 (Média) ou 3 (Alta)",
            String(tarefa.prioridade)
          );

          if (resposta === null) return;

          try {
            const novaPrioridade = Number(resposta);
            alterarPrioridade(tarefa.codigo, novaPrioridade);
            mostrarMensagem(
              "Prioridade alterada com sucesso!",
              "sucesso"
            );
          } catch (erro) {
            mostrarMensagem(erro.message, "erro");
          }
        });

        const btnConcluir = document.createElement("button");
        btnConcluir.type = "button";
        btnConcluir.textContent = tarefa.status
          ? "Concluir"
          : "Concluída";

        btnConcluir.className = tarefa.status
          ? "btn-concluir"
          : "btn-concluida";

        btnConcluir.disabled = !tarefa.status;

        btnConcluir.addEventListener("click", () => {
          try {
            concluirTarefa(tarefa.codigo);
            mostrarMensagem(
              "Tarefa concluída com sucesso!",
              "sucesso"
            );
          } catch (erro) {
            mostrarMensagem(erro.message, "erro");
          }
        });

        acoes.append(btnAlterar, btnConcluir);
        cartao.append(informacoes, acoes);
        listaTarefas.appendChild(cartao);
      });
    }

    function nomePrioridade(prioridade) {
      const nomes = {
        1: "Baixa",
        2: "Média",
        3: "Alta"
      };

      return nomes[prioridade];
    }

    form.addEventListener("submit", event => {
      event.preventDefault();

      try {
        const titulo = campoTitulo.value;
        const prioridade = Number(campoPrioridade.value);

        cadastrarTarefa(titulo, prioridade);

        form.reset();

        mostrarMensagem(
          "Tarefa cadastrada com sucesso!",
          "sucesso"
        );
      } catch (erro) {
        mostrarMensagem(erro.message, "erro");
      }
    });

    renderizarTarefas();
  </script>