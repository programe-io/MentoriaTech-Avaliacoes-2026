
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
  const total = tarefas.length;
  const pendentes = tarefas.filter(function(tarefa) {
    return !tarefa.concluida;
  }).length;
  const concluidas = total - pendentes;

  document.getElementById("total").textContent = total;
  document.getElementById("pendentes").textContent = pendentes;
  document.getElementById("concluidas").textContent = concluidas;

  document.getElementById("barraTotal").style.width =
    total > 0 ? "100%" : "0%";

  document.getElementById("barraPendente").style.width =
    total > 0 ? (pendentes / total * 100) + "%" : "0%";

  document.getElementById("barraConcluida").style.width =
    total > 0 ? (concluidas / total * 100) + "%" : "0%";
}

function listarTarefas() {
  const lista = document.getElementById("lista");
  const vazio = document.getElementById("vazio");

  lista.innerHTML = "";

  tarefas.forEach(function(tarefa) {
    const linha = document.createElement("tr");

    if (tarefa.concluida) {
      linha.classList.add("is-completed");
    }

    const codigoSeguro = escaparHTML(tarefa.codigo);
    const tituloSeguro = escaparHTML(tarefa.titulo);

    const classeStatus = tarefa.concluida
      ? "status-concluida"
      : "status-pendente";

    const textoStatus = tarefa.concluida
      ? "✓ Concluída"
      : "● Pendente";

    linha.innerHTML = `
      <td><span class="task-code">${codigoSeguro}</span></td>

      <td>${tituloSeguro}</td>

      <td>
        <span class="priority-badge priority-${tarefa.prioridade}">
          ${nomePrioridade(tarefa.prioridade)}
        </span>
      </td>

      <td>
        <span class="status-badge ${classeStatus}">
          ${textoStatus}
        </span>
      </td>

      <td>
        <div class="actions">
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
      </td>
    `;

    lista.appendChild(linha);
  });

  vazio.hidden = tarefas.length !== 0;
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

  mensagem.textContent = "✓ Tarefa cadastrada com sucesso!";
  listarTarefas();
});

document.getElementById("titulo").addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    document.getElementById("adicionar").click();
  }
});

document.getElementById("lista").addEventListener("click", function(event) {
  const botao = event.target.closest("button");

  if (!botao) return;

  const tarefa = tarefas.find(function(item) {
    return item.codigo === botao.dataset.codigo;
  });

  if (!tarefa) return;

  if (botao.dataset.acao === "concluir") {
    tarefa.concluida = !tarefa.concluida;

    document.getElementById("mensagem").textContent =
      tarefa.concluida
        ? "✓ Tarefa marcada como concluída!"
        : "Tarefa voltou para pendente.";
  }

  if (botao.dataset.acao === "prioridade") {
    tarefa.prioridade = tarefa.prioridade === 3
      ? 1
      : tarefa.prioridade + 1;

    document.getElementById("mensagem").textContent =
      "Prioridade atualizada para " +
      nomePrioridade(tarefa.prioridade) + ".";
  }

  listarTarefas();
});

listarTarefas();
