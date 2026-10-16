
let sinal = 0;

function mudarLuz() {
  const cores = ["vermelho", "amarelo", "verde"];
  const mensagens = [
    "Pare!",
    "Atenção!",
    "Siga em frente!"
  ];

  document.querySelectorAll(".luz").forEach(luz => {
    luz.style.background = "#555";
  });

  const cor = cores[sinal];
  const elemento = document.getElementById(cor);

  const coresAcesas = {
    vermelho: "#f44336",
    amarelo: "#ffeb3b",
    verde: "#4caf50"
  };

  elemento.style.background = coresAcesas[cor];
  document.getElementById("mensagem").textContent =
    mensagens[sinal];

  sinal = (sinal + 1) % 3;
}
