let sistemaAtivo = false;

function iniciarSistema() {
  sistemaAtivo = !sistemaAtivo;

  const terminal = document.getElementById("terminal-content");

  if (sistemaAtivo) {
    terminal.innerHTML += `
      <p><span>[${horaAtual()}]</span> SISTEMA ATIVADO.</p>
      <p><span>[${horaAtual()}]</span> Iniciando protocolos avançados...</p>
      <p><span>[${horaAtual()}]</span> <b style="color:#64ffda">STATUS: OPERACIONAL</b></p>
    `;

    document.querySelector(".primary-btn").innerHTML =
      "SISTEMA ATIVO ✓";
  } else {
    terminal.innerHTML += `
      <p><span>[${horaAtual()}]</span> Sistema colocado em espera.</p>
    `;

    document.querySelector(".primary-btn").innerHTML =
      "INICIAR SISTEMA →";
  }

  terminal.scrollTop = terminal.scrollHeight;
}

function mostrarInfo() {
  document.getElementById("sobre").scrollIntoView({
    behavior: "smooth"
  });
}

function horaAtual() {
  const agora = new Date();

  return agora.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });
}

/* Simulação de dados em tempo real */

setInterval(() => {
  const users = document.getElementById("users");

  let valor = 8492 + Math.floor(Math.random() * 80 - 40);

  users.textContent = valor.toLocaleString("en-US");
}, 2500);

setInterval(() => {
  const latency = document.getElementById("latency");

  let valor = 10 + Math.floor(Math.random() * 8);

  latency.textContent = valor + " ms";
}, 1800);

/* Efeito de entrada */

const elementos = document.querySelectorAll(".card, .stat-box");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  },
  {
    threshold: 0.15
  }
);

elementos.forEach((elemento) => {
  elemento.style.opacity = "0";
  elemento.style.transform = "translateY(30px)";
  elemento.style.transition = "opacity .7s ease, transform .7s ease";

  observer.observe(elemento);
});

/* Efeito de digitação no título */

const titulo = document.querySelector(".hero h1");

titulo.addEventListener("mouseenter", () => {
  titulo.style.textShadow = "0 0 25px rgba(0,247,255,.25)";
});

titulo.addEventListener("mouseleave", () => {
  titulo.style.textShadow = "none";
});
