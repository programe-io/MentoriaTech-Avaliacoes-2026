// ===============================
// JAVASCRIPT COMPLETO (EXEMPLO)
// ===============================

// Espera o HTML carregar
document.addEventListener("DOMContentLoaded", function () {

  // =========================
  // 1. MENSAGEM DINÂMICA
  // =========================
  const botao = document.getElementById("botao");
  const mensagem = document.getElementById("mensagem");

  if (botao) {
    botao.addEventListener("click", function () {
      mensagem.textContent = "Você clicou no botão! 🚀";
      mensagem.style.color = "green";
    });
  }

  // =========================
  // 2. MUDAR TEMA (CLARO/ESCURO)
  // =========================
  const toggleTema = document.getElementById("toggleTema");

  if (toggleTema) {
    toggleTema.addEventListener("click", function () {
      document.body.classList.toggle("dark-mode");

      if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("tema", "escuro");
      } else {
        localStorage.setItem("tema", "claro");
      }
    });
  }

  // Carregar tema salvo
  if (localStorage.getItem("tema") === "escuro") {
    document.body.classList.add("dark-mode");
  }

  // =========================
  // 3. LISTA DE TAREFAS (TODO)
  // =========================
  const inputTarefa = document.getElementById("tarefa");
  const botaoAdd = document.getElementById("adicionar");
  const lista = document.getElementById("lista");

  let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

  function renderizarTarefas() {
    if (!lista) return;

    lista.innerHTML = "";

    tarefas.forEach((tarefa, index) => {
      const li = document.createElement("li");
      li.textContent = tarefa;

      const btnRemover = document.createElement("button");
      btnRemover.textContent = "X";
      btnRemover.style.marginLeft = "10px";

      btnRemover.addEventListener("click", () => {
        tarefas.splice(index, 1);
        salvarTarefas();
        renderizarTarefas();
      });

      li.appendChild(btnRemover);
      lista.appendChild(li);
    });
  }

  function salvarTarefas() {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
  }

  if (botaoAdd) {
    botaoAdd.addEventListener("click", function () {
      const valor = inputTarefa.value.trim();

      if (valor !== "") {
        tarefas.push(valor);
        salvarTarefas();
        renderizarTarefas();
        inputTarefa.value = "";
      }
    });
  }

  renderizarTarefas();

  // =========================
  // 4. RELÓGIO AO VIVO
  // =========================
  const relogio = document.getElementById("relogio");

  function atualizarRelogio() {
    const agora = new Date();
    const horas = String(agora.getHours()).padStart(2, "0");
    const minutos = String(agora.getMinutes()).padStart(2, "0");
    const segundos = String(agora.getSeconds()).padStart(2, "0");

    if (relogio) {
      relogio.textContent = `${horas}:${minutos}:${segundos}`;
    }
  }

  setInterval(atualizarRelogio, 1000);
  atualizarRelogio();

  // =========================
  // 5. VALIDAÇÃO DE FORMULÁRIO
  // =========================
  const form = document.getElementById("formulario");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const nome = document.getElementById("nome").value;
      const email = document.getElementById("email").value;

      if (nome === "" || email === "") {
        alert("Preencha todos os campos!");
        return;
      }

      alert(`Obrigado, ${nome}! Formulário enviado com sucesso 👍`);
      form.reset();
    });
  }

});