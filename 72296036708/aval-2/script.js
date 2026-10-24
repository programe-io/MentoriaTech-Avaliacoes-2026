
let tarefas = [];
let geradorCodigo = 0;

function validarDadosTarefa(titulo, prioridade) {
  if (titulo.trim().length < 5) {
    throw new Error("O título deve ter no mínimo 5 caracteres.");
  }

  if (!Number.isInteger(prioridade) ||
      prioridade < 1 || prioridade > 3) {
    throw new Error("Informe uma prioridade entre 1 e 3.");
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
  atualizarTela();
  mostrarMensagem("Tarefa cadastrada com sucesso!", false);
}

function listarTarefas() {
  return tarefas;
}

function concluirTarefa(codigo) {
  const tarefa = buscarTarefa(codigo);

  if (tarefa.status === false) {
    throw new Error("Esta tarefa já está concluída.");
  }

  tarefa.status = false;
  atualizarTela();
  mostrarMensagem("Tarefa concluída com sucesso!", false);
}

function mostrarMensagem(texto, erro) {
  const elemento = document.getElementById("mensagem");
  elemento.textContent = texto;
  elemento.className = erro ? "erro" : "sucesso";
}

function atualizarTela() {
  const lista = document.getElementById("lista-tarefas");
  const filtro = document.getElementById("filtro").value;

  lista.replaceChildren();

  const filtradas = listarTarefas().filter(tarefa => {
    if (filtro === "pendentes") return tarefa.status === true;
    if (filtro === "concluidas") return tarefa.status === false;
    return true;
  });

  if (filtradas.length === 0) {
    const vazio = document.createElement("p");
    vazio.className = "vazio";
    vazio.textContent = "Nenhuma tarefa encontrada.";
    lista.appendChild(vazio);
  }

  filtradas.forEach(tarefa => {
    const cartao = document.createElement("article");
    cartao.className = "tarefa";

    if (!tarefa.status) {
      cartao.classList.add("concluida");
    }

    const informacoes = document.createElement("div");
    const titulo = document.createElement("h3");
    titulo.textContent = tarefa.titulo;

    const codigo = document.createElement("p");
    codigo.textContent = "Código: " + tarefa.codigo;

    const prioridade = document.createElement("p");
    const nomesPrioridade = {
      1: "Baixa",
      2: "Média",
      3: "Alta"
    };
    prioridade.textContent =
      "Prioridade: " + nomesPrioridade[tarefa.prioridade];

    const status = document.createElement("p");
    status.textContent = tarefa.status ? "Pendente" : "Concluída";

    informacoes.append(titulo, codigo, prioridade, status);

    const acoes = document.createElement("div");
    acoes.className = "acoes";

    if (tarefa.status) {
      const botaoConcluir = document.createElement("button");
      botaoConcluir.textContent = "Concluir";

      botaoConcluir.addEventListener("click", () => {
        try {
          concluirTarefa(tarefa.codigo);
        } catch (erro) {
          mostrarMensagem(erro.message, true);
        }
      });

      acoes.appendChild(botaoConcluir);
    }

    const botaoRemover = document.createElement("button");
    botaoRemover.className = "botao-remover";
    botaoRemover.textContent = "Remover";

    botaoRemover.addEventListener("click", () => {
      const confirmar = confirm(
        "Deseja remover a tarefa '" + tarefa.titulo + "'?"
      );

      if (confirmar) {
        tarefas = tarefas.filter(
          item => item.codigo !== tarefa.codigo
        );
        atualizarTela();
        mostrarMensagem("Tarefa removida.", false);
      }
    });

    acoes.appendChild(botaoRemover);
    cartao.append(informacoes, acoes);
    lista.appendChild(cartao);
  });

  document.getElementById("total").textContent = tarefas.length;
  document.getElementById("pendentes").textContent =
    tarefas.filter(tarefa => tarefa.status).length;
  document.getElementById("concluidas").textContent =
    tarefas.filter(tarefa => !tarefa.status).length;
}

document.getElementById("form-tarefa").addEventListener("submit", evento => {
  evento.preventDefault();

  const titulo = document.getElementById("titulo").value;
  const prioridade = Number(
    document.getElementById("prioridade").value
  );

  try {
    cadastrarTarefa(titulo, prioridade);
    evento.target.reset();
    document.getElementById("titulo").focus();
  } catch (erro) {
    mostrarMensagem(erro.message, true);
  }
});

document.getElementById("filtro").addEventListener("change", atualizarTela);

atualizarTela();
