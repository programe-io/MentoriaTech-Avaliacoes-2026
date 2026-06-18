/* =====================================
   JAVASCRIPT COMPLETO - SITE INTERATIVO
===================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     1. RELÓGIO AO VIVO
  ========================= */
  function atualizarRelogio() {
    const agora = new Date();

    const horas = String(agora.getHours()).padStart(2, "0");
    const minutos = String(agora.getMinutes()).padStart(2, "0");
    const segundos = String(agora.getSeconds()).padStart(2, "0");

    const relogio = document.getElementById("relogio");
    if (relogio) {
      relogio.textContent = `${horas}:${minutos}:${segundos}`;
    }
  }

  setInterval(atualizarRelogio, 1000);
  atualizarRelogio();


  /* =========================
     2. MODO ESCURO
  ========================= */
  const btnTema = document.getElementById("btnTema");

  function aplicarTemaSalvo() {
    const tema = localStorage.getItem("tema");
    if (tema === "escuro") {
      document.body.classList.add("dark");
    }
  }

  aplicarTemaSalvo();

  if (btnTema) {
    btnTema.addEventListener("click", () => {
      document.body.classList.toggle("dark");

      if (document.body.classList.contains("dark")) {
        localStorage.setItem("tema", "escuro");
      } else {
        localStorage.setItem("tema", "claro");
      }
    });
  }


  /* =========================
     3. BOTÃO INTERATIVO
  ========================= */
  const botao = document.getElementById("botao");
  const mensagem = document.getElementById("mensagem");

  if (botao && mensagem) {
    botao.addEventListener("click", () => {
      mensagem.textContent = "Você clicou no botão 🚀";
    });
  }


  /* =========================
     4. LISTA DE TAREFAS
  ========================= */
  const input = document.getElementById("tarefa");
  const btnAdd = document.getElementById("adicionar");
  const lista = document.getElementById("lista");

  let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

  function salvarTarefas() {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
  }

  function renderizarTarefas() {
    if (!lista) return;

    lista.innerHTML = "";

    tarefas.forEach((tarefa, index) => {
      const li = document.createElement("li");

      li.innerHTML = `
        ${tarefa}
        <button class="remover">X</button>
      `;

      li.querySelector(".remover").addEventListener("click", () => {
        tarefas.splice(index, 1);
        salvarTarefas();
        renderizarTarefas();
      });

      lista.appendChild(li);
    });
  }

  if (btnAdd) {
    btnAdd.addEventListener("click", () => {
      const valor = input.value.trim();

      if (valor !== "") {
        tarefas.push(valor);
        input.value = "";
        salvarTarefas();
        renderizarTarefas();
      }
    });
  }

  renderizarTarefas();


  /* =========================
     5. FORMULÁRIO
  ========================= */
  const form = document.getElementById("formulario");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const nome = document.getElementById("nome")?.value.trim();
      const email = document.getElementById("email")?.value.trim();

      if (!nome || !email) {
        alert("Preencha todos os campos!");
        return;
      }

      alert(`Obrigado ${nome}! Enviado com sucesso 👍`);
      form.reset();
    });
  }


  /* =========================
     6. ANIMAÇÃO SIMPLES
  ========================= */
  const titulo = document.querySelector("h1");

  if (titulo) {
    let opacidade = 0;

    const fade = setInterval(() => {
      opacidade += 0.05;
      titulo.style.opacity = opacidade;

      if (opacidade >= 1) {
        clearInterval(fade);
      }
    }, 50);
  }

});