// Seleciona o botão
const botao = document.querySelector("button");

// Contador de cliques
let cliques = 0;

// Evento de clique
botao.addEventListener("click", function () {
  cliques++;

    // Mostra quantidade de cliques
      botao.innerText = `Cliques: ${cliques}`;

        // Muda a cor do botão aleatoriamente
          const cores = ["#ff4757", "#1e90ff", "#2ed573", "#ffa502", "#a55eea"];

            const corAleatoria =
                cores[Math.floor(Math.random() * cores.length)];

                  botao.style.background = corAleatoria;
                  });

                  // Mensagem ao carregar a página
                  window.onload = function () {
                    console.log("Página carregada com sucesso!");
                    };