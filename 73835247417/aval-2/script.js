document.addEventListener("DOMContentLoaded", function () {
  const formulario = document.getElementById("formulario");
  const campoTitulo = document.getElementById("titulo");
  const campoPrioridade = document.getElementById("prioridade");
  const lista = document.getElementById("lista");
  const mensagem = document.getElementById("mensagem");

  const total = document.getElementById("total");
  const pendentes = document.getElementById("pendentes");
  const concluidas = document.getElementById("concluidas");

  let tarefas = [];
  let proximoCodigo = 1;

  formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const titulo = campoTitulo.value.trim();
    const prioridade = Number(campoPrioridade.value);

    if (titulo.length < 5) {
      alert("O título deve ter no mínimo 5 caracteres.");
      campoTitulo.focus();
      return;
    }

    if (prioridade < 1 || prioridade > 3) {
      alert("A prioridade deve ser um valor entre 1 e 3.");
      return;
    }

    const novaTarefa = {
      codigo: proximoCodigo,
      titulo: titulo,
      prioridade: prioridade,
      concluida: false
    };

    tarefas.push(novaTarefa);
    proximoCodigo++;

    campoTitulo.value = "";
    campoPrioridade.value = "2";

    mostrarTarefas();
    campoTitulo.focus();
  });

  function mostrarTarefas() {
    lista.innerHTML = "";

    if (tarefas.length === 0) {
      mensagem.style.display = "block";
    } else {
      mensagem.style.display = "none";
    }

    let quantidadeConcluidas = 0;

    tarefas.forEach(function (tarefa) {
      if (tarefa.concluida) {
        quantidadeConcluidas++;
      }

      const item = document.createElement("div");

      if (tarefa.concluida) {
        item.className = "tarefa concluida";
      } else {
        item.className = "tarefa";
      }

      const informacoes = document.createElement("div");
      informacoes.className = "informacoes";

      const titulo = document.createElement("p");
      titulo.className = "titulo-tarefa";
      titulo.textContent =
        "Código " + tarefa.codigo + ": " + tarefa.titulo;

      const detalhes = document.createElement("p");
      detalhes.className = "detalhes";
      detalhes.textContent =
        "Prioridade: " +
        nomePrioridade(tarefa.prioridade) +
        " | Status: " +
        (tarefa.concluida ? "Concluída" : "Pendente");

      informacoes.appendChild(titulo);
      informacoes.appendChild(detalhes);

      const acoes = document.createElement("div");
      acoes.className = "acoes";

      const seletor = document.createElement("select");

      const alta = document.createElement("option");
      alta.value = "1";
      alta.textContent = "1 - Alta";

      const media = document.createElement("option");
      media.value = "2";
      media.textContent = "2 - Média";

      const baixa = document.createElement("option");
      baixa.value = "3";
      baixa.textContent = "3 - Baixa";

      seletor.appendChild(alta);
      seletor.appendChild(media);
      seletor.appendChild(baixa);

      seletor.value = tarefa.prioridade;

      seletor.addEventListener("change", function () {
        tarefa.prioridade = Number(seletor.value);
        mostrarTarefas();
      });

      const botao = document.createElement("button");
      botao.type = "button";

      if (tarefa.concluida) {
        botao.textContent = "Reabrir";
      } else {
        botao.textContent = "Concluir";
      }

      botao.addEventListener("click", function () {
        tarefa.concluida = !tarefa.concluida;
        mostrarTarefas();
      });

      acoes.appendChild(seletor);
      acoes.appendChild(botao);

      item.appendChild(informacoes);
      item.appendChild(acoes);

      lista.appendChild(item);
    });

    const quantidadePendentes =
      tarefas.length - quantidadeConcluidas;

    total.textContent = tarefas.length;
    pendentes.textContent = quantidadePendentes;
    concluidas.textContent = quantidadeConcluidas;
  }

  function nomePrioridade(valor) {
    if (valor === 1) {
      return "Alta";
    }

    if (valor === 2) {
      return "Média";
    }

    return "Baixa";
  }

  mostrarTarefas();
});
