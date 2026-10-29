
let tarefas = [
  {
    codigo: "T001",
    titulo: "Finalizar atividade de JavaScript",
    prioridade: 1,
    concluida: false
  },
  {
    codigo: "T002",
    titulo: "Estudar lógica de programação",
    prioridade: 2,
    concluida: false
  },
  {
    codigo: "T003",
    titulo: "Organizar os arquivos do projeto",
    prioridade: 3,
    concluida: true
  },
  {
    codigo: "T004",
    titulo: "Revisar os exercícios da aula",
    prioridade: 2,
    concluida: false
  }
];

let proximoCodigo = 5;

function escaparHTML(texto) {
  return String(texto).replace(/[&<>"']/g, function(caractere) {
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

function nomePrioridade(prioridade) {
  if (prioridade === 1) return "01 — Alta";
  if (prioridade === 2) return "02 — Média";
  return "03 — Baixa";
}

function atualizarResumo() {
  document.getElementById("total").textContent = tarefas.length;

  document.getElementById("pendentes").textContent =
    tarefas.filter(function(tarefa) {
      return !tarefa.concluida;
    }).length;

  document.getElementById("concluidas").textContent =
    tarefas.filter(function(tarefa) {
      return tarefa.concluida;
    }).length;
}

function listarTarefas() {
  const lista = document.getElementById("lista");
  const busca = document.getElementById("busca").value
    .trim()
    .toLowerCase();
  const filtro = document.getElementById("filtroStatus").value;

  lista.innerHTML = "";

  const tarefasFiltradas = tarefas.filter(function(tarefa) {
    const combinaBusca =
      tarefa.titulo.toLowerCase().includes(busca) ||
      tarefa.codigo.toLowerCase().includes(busca);

    const combinaStatus =
      filtro === "todas" ||
      (filtro === "pendente" && !tarefa.concluida) ||
      (filtro === "concluida" && tarefa.concluida);

    return combinaBusca && combinaStatus;
  });

  tarefasFiltradas.forEach(function(tarefa) {
    const linha = document.createElement("article");
    linha.className = "task-row" +
      (tarefa.concluida ? " is-completed" : "");

    const tituloSeguro = escaparHTML(tarefa.titulo);
    const codigoSeguro = escaparHTML(tarefa.codigo);

    const status = tarefa.concluida
      ? '<span class="status-badge done">● Concluída</span>'
      : '<span class="status-badge pending">● Pendente</span>';

    linha.innerHTML = `
      <div class="task-info">
        <div class="task-check">${tarefa.concluida ? "✓" : "○"}</div>
        <div>
          <div class="task-name">${tituloSeguro}</div>
          <span class="task-code">${codigoSeguro} · TAREFA</span>
        </div>
      </div>

      <div class="task-priority">
        <span class="priority-badge priority-${tarefa.prioridade}">
          ${nomePrioridade(tarefa.prioridade)}
        </span>
      </div>

      <div class="task-status">${status}</div>

      <div class="task-actions">
        <button class="action-button"
          data-acao="concluir"
          data-codigo="${codigoSeguro}">
          ${tarefa.concluida ? "Reabrir" : "✓ Concluir"}
        </button>

        <button class="action-button"
          data-acao="prioridade"
          data-codigo="${codigoSeguro}">
          ↕ Prioridade
        </button>
      </div>
    `;

    lista.appendChild(linha);
  });

  document.getElementById("vazio").hidden =
    tarefasFiltradas.length !== 0;

  atualizarResumo();
}

document.getElementById("adicionar").addEventListener("click", function() {
  const campoTitulo = document.getElementById("titulo");
  const titulo = campoTitulo.value.trim();
  const prioridade = Number(
    document.getElementById("prioridade").value
  );
  const mensagem = document.getElementById("mensagem");

  if (titulo.length < 5) {
    mensagem.textContent =
      "O título precisa ter pelo menos 5 caracteres.";
    campoTitulo.focus();
    return;
  }

  if (![1, 2, 3].includes(prioridade)) {
    mensagem.textContent =
      "Selecione uma prioridade válida, de 1 a 3.";
    return;
  }

  const codigo = "T" + String(proximoCodigo).padStart(3, "0");

  tarefas.push({
    codigo: codigo,
    titulo: titulo,
    prioridade: prioridade,
    concluida: false
  });

  proximoCodigo++;
  campoTitulo.value = "";
  document.getElementById("filtroStatus").value = "todas";
  document.getElementById("busca").value = "";
  mensagem.textContent = "✓ Tarefa adicionada com sucesso!";

  listarTarefas();
});

document.getElementById("titulo").addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    document.getElementById("adicionar").click();
  }
});

document.getElementById("busca").addEventListener("input", listarTarefas);

document.getElementById("filtroStatus").addEventListener("change", listarTarefas);

document.getElementById("lista").addEventListener("click", function(event) {
  const botao = event.target.closest("button");
  if (!botao) return;

  const codigo = botao.dataset.codigo;
  const tarefa = tarefas.find(function(item) {
    return item.codigo === codigo;
  });

  if (!tarefa) return;

  if (botao.dataset.acao === "concluir") {
    tarefa.concluida = !tarefa.concluida;

    document.getElementById("mensagem").textContent =
      tarefa.concluida
        ? "✓ Tarefa concluída!"
        : "Tarefa reaberta.";
  }

  if (botao.dataset.acao === "prioridade") {
    tarefa.prioridade = tarefa.prioridade === 3
      ? 1
      : tarefa.prioridade + 1;

    document.getElementById("mensagem").textContent =
      "↻ Prioridade alterada para " +
      nomePrioridade(tarefa.prioridade) + ".";
  }

  listarTarefas();
});

listarTarefas();
