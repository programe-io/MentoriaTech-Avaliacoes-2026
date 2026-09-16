const tarefas = [];

let proximoCodigo = 0;

function validarDadosDaTarefa(titulo, prioridade) {
  if (titulo.length < 5) {
    throw new Error(
      "O título deve possuir, no mínimo, cinco caracteres."
    );
  }

  if (prioridade < 1 || prioridade > 3) {
    throw new Error(
      "A prioridade deve estar entre 1 e 3."
    );
  }
}

function buscarTarefa(codigo) {
  const tarefa = tarefas.find(
    tarefa => tarefa.codigo === codigo
  );

  if (!tarefa) {
    throw new Error("Tarefa não encontrada.");
  }

  return tarefa;
}

function nomeDaPrioridade(prioridade) {
  if (prioridade === 1) {
    return "Alta";
  }

  if (prioridade === 2) {
    return "Média";
  }

  return "Baixa";
}

function classeDaPrioridade(prioridade) {
  if (prioridade === 1) {
    return "prioridade-alta";
  }

  if (prioridade === 2) {
    return "prioridade-media";
  }

  return "prioridade-baixa";
}

function mostrarMensagem(texto, tipo = "sucesso") {
  const mensagem = document.getElementById("mensagem");

  mensagem.textContent = texto;

  mensagem.className =
    tipo === "erro"
      ? "mensagem-erro"
      : "mensagem-sucesso";
}

function limparFormulario() {
  document.getElementById("areaFormulario").innerHTML = "";
}

function abrirCadastro() {
  limparFormulario();

  document.getElementById("areaFormulario").innerHTML = `
    <div class="formulario">
      <h2>Cadastrar tarefa</h2>

      <label for="titulo">
        Título da tarefa:
      </label>

      <input type="text" id="titulo">

      <label for="prioridade">
        Prioridade:
      </label>

      <select id="prioridade">
        <option value="">Selecione uma prioridade</option>
        <option value="1">1 - Alta</option>
        <option value="2">2 - Média</option>
        <option value="3">3 - Baixa</option>
      </select>

      <button onclick="cadastrarTarefa()">
        Salvar tarefa
      </button>
    </div>
  `;
}

function cadastrarTarefa() {
  try {
    const titulo = document
      .getElementById("titulo")
      .value
      .trim();

    const prioridade = Number(
      document.getElementById("prioridade").value
    );

    validarDadosDaTarefa(titulo, prioridade);

    proximoCodigo++;

    const novaTarefa = {
      codigo: proximoCodigo,
      titulo: titulo,
      prioridade: prioridade,
      status: true
    };

    tarefas.push(novaTarefa);

    mostrarMensagem(
      `Tarefa cadastrada com sucesso! Código gerado: ${novaTarefa.codigo}.`
    );

    limparFormulario();
    listarTarefas(false);
  } catch (erro) {
    mostrarMensagem(`Erro: ${erro.message}`, "erro");
  }
}

function listarTarefas(exibirMensagem = true) {
  const lista = document.getElementById("listaTarefas");

  if (tarefas.length === 0) {
    lista.innerHTML = "<p>Nenhuma tarefa cadastrada.</p>";
  } else {
    lista.innerHTML = tarefas.map(tarefa => {
      const status = tarefa.status
        ? "Em execução"
        : "Concluída";

      const classeStatus = tarefa.status
        ? "status-execucao"
        : "status-concluida";

      const classeTarefa = tarefa.status
        ? "tarefa"
        : "tarefa tarefa-concluida";

      return `
        <div class="${classeTarefa}">
          <p>
            <strong>Código:</strong>
            ${tarefa.codigo}
          </p>

          <p>
            <strong>Título:</strong>
            ${tarefa.titulo}
          </p>

          <p>
            <strong>Prioridade:</strong>
            <span class="${classeDaPrioridade(tarefa.prioridade)}">
              ${tarefa.prioridade}
              (${nomeDaPrioridade(tarefa.prioridade)})
            </span>
          </p>

          <p>
            <strong>Status:</strong>
            <span class="${classeStatus}">
              ${status}
            </span>
          </p>
        </div>
      `;
    }).join("");
  }

  if (exibirMensagem) {
    mostrarMensagem("Lista de tarefas atualizada.");
  }
}

function abrirConclusao() {
  limparFormulario();

  document.getElementById("areaFormulario").innerHTML = `
    <div class="formulario">
      <h2>Concluir tarefa</h2>

      <label for="codigoConclusao">
        Código da tarefa:
      </label>

      <input type="number" id="codigoConclusao" min="1">

      <button onclick="concluirTarefa()">
        Marcar como concluída
      </button>
    </div>
  `;
}

function concluirTarefa() {
  try {
    const codigo = Number(
      document.getElementById("codigoConclusao").value
    );

    const tarefa = buscarTarefa(codigo);

    if (tarefa.status === false) {
      throw new Error(
        "Essa tarefa já foi concluída."
      );
    }

    tarefa.status = false;

    mostrarMensagem(
      "Tarefa marcada como concluída!"
    );

    limparFormulario();
    listarTarefas(false);
  } catch (erro) {
    mostrarMensagem(`Erro: ${erro.message}`, "erro");
  }
}

function abrirAlteracaoPrioridade() {
  limparFormulario();

  document.getElementById("areaFormulario").innerHTML = `
    <div class="formulario">
      <h2>Alterar prioridade</h2>

      <label for="codigoPrioridade">
        Código da tarefa:
      </label>

      <input type="number" id="codigoPrioridade" min="1">

      <label for="novaPrioridade">
        Nova prioridade:
      </label>

      <select id="novaPrioridade">
        <option value="">Selecione uma prioridade</option>
        <option value="1">1 - Alta</option>
        <option value="2">2 - Média</option>
        <option value="3">3 - Baixa</option>
      </select>

      <button onclick="alterarPrioridade()">
        Alterar prioridade
      </button>
    </div>
  `;
}

function alterarPrioridade() {
  try {
    const codigo = Number(
      document.getElementById("codigoPrioridade").value
    );

    const novaPrioridade = Number(
      document.getElementById("novaPrioridade").value
    );

    const tarefa = buscarTarefa(codigo);

    validarDadosDaTarefa(
      tarefa.titulo,
      novaPrioridade
    );

    tarefa.prioridade = novaPrioridade;

    mostrarMensagem(
      "Prioridade alterada com sucesso!"
    );

    limparFormulario();
    listarTarefas(false);
  } catch (erro) {
    mostrarMensagem(`Erro: ${erro.message}`, "erro");
  }
}

function sairSistema() {
  limparFormulario();

  document.getElementById("listaTarefas").innerHTML =
    "<p>Gerenciador de tarefas encerrado.</p>";

  mostrarMensagem(
    "Gerenciador de tarefas encerrado."
  );
}