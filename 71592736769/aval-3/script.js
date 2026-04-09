// Mostrar ou esconder curiosidade
function mostrarCuriosidade() {
  const texto = document.getElementById("curiosidade");
  texto.classList.toggle("hidden");
}

// Alerta ao carregar a página
window.onload = function() {
  alert("Bem-vindo! Vamos aprender sobre a Revolução Industrial 🚂");
};

// Mudar cor do fundo ao clicar em um botão
function mudarCor() {
  const cores = ["#f4f4f4", "#e6f7ff", "#fff3cd", "#e8f5e9"];
  const corAleatoria = cores[Math.floor(Math.random() * cores.length)];
  document.body.style.backgroundColor = corAleatoria;
}

// Mostrar data atual
function mostrarData() {
  const data = new Date();
  const elemento = document.getElementById("data");
  elemento.innerText = "Data atual: " + data.toLocaleDateString("pt-BR");
}

// Pequeno quiz simples
function verificarResposta() {
  const resposta = document.getElementById("resposta").value;

  if (resposta.toLowerCase() === "maquina a vapor") {
    alert("Correto! 🎉");
  } else {
    alert("Tente novamente!");
  }
}