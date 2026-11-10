'use strict';

document.addEventListener("DOMContentLoaded", () => {
  // Gerador de ID único e seguro
  const gerarId = () => 
    typeof crypto !== "undefined" && crypto.randomUUID 
      ? crypto.randomUUID() 
      : String(Date.now() + Math.random());

  // 1. ESTADO EM MEMÓRIA (Única Fonte da Verdade)
  let tarefas = [
    { id: gerarId(), titulo: "Aprender renderização orientada a dados", concluida: true },
    { id: gerarId(), titulo: "Entender o fluxo do estado para o DOM", concluida: false }
  ];

  // Elementos do DOM
  const containerLista = document.getElementById("lista-tarefas");
  const formTarefa = document.getElementById("form-tarefa");
  const inputTarefa = document.getElementById("input-tarefa");

  // 2. FUNÇÃO DE RENDERIZAÇÃO (Dados -> DOM)
  function render() {
    // Passo A: Limpar o container de forma otimizada
    containerLista.replaceChildren();

    // Tratamento de lista vazia
    if (tarefas.length === 0) {
      const liVazio = document.createElement("li");
      liVazio.className = "vazio";
      liVazio.textContent = "Nenhuma tarefa encontrada.";
      containerLista.appendChild(liVazio);
      return;
    }

    // Passo B, C e D: Percorrer dados, gerar HTML seguro e inserir no DOM
    tarefas.forEach(tarefa => {
      const li = document.createElement("li");
      li.className = `item-tarefa ${tarefa.concluida ? "concluida" : ""}`;

      const span = document.createElement("span");
      span.textContent = tarefa.titulo;
      span.addEventListener("click", () => alternarStatus(tarefa.id));

      const btnDeletar = document.createElement("button");
      btnDeletar.className = "btn-deletar";
      btnDeletar.type = "button";
      btnDeletar.textContent = "✕";
      btnDeletar.setAttribute("aria-label", `Excluir ${tarefa.titulo}`);
      btnDeletar.addEventListener("click", () => removerTarefa(tarefa.id));

      li.appendChild(span);
      li.appendChild(btnDeletar);
      containerLista.appendChild(li);
    });
  }

  // 3. OPERAÇÕES NO ARRAY + RE-RENDERIZAÇÃO
  function adicionarTarefa(titulo) {
    tarefas.push({
      id: gerarId(),
      titulo: titulo,
      concluida: false
    });
    render();
  }

  function removerTarefa(id) {
    tarefas = tarefas.filter(t => t.id !== id);
    render();
  }

  function alternarStatus(id) {
    tarefas = tarefas.map(t => 
      t.id === id ? { ...t, concluida: !t.concluida } : t
    );
    render();
  }

  // Evento de submissão
  formTarefa.addEventListener("submit", (e) => {
    e.preventDefault();
    const valor = inputTarefa.value.trim();

    if (valor) {
      adicionarTarefa(valor);
      inputTarefa.value = "";
      inputTarefa.focus();
    }
  });

  // Renderização inicial
  render();
});