const dicas = [
    "Divida uma tarefa grande em pequenas etapas.",
    "Afaste o celular durante seus estudos.",
    "Organize suas tarefas por ordem de importância.",
    "Comece com apenas cinco minutos de dedicação.",
    "Faça pequenas pausas entre as atividades.",
    "Não espere pela motivação: comece aos poucos!"
];

// Criar o painel na página
const painel = document.createElement("section");
painel.id = "painel-interativo";

painel.innerHTML = `
    <h2>Vamos colocar em prática?</h2>

    <p id="mensagem-dica">
        Clique abaixo para receber uma dica!
    </p>

    <div style="text-align: center;">
        <button id="botao-dica">
            Receber uma dica
        </button>

        <button id="botao-foco">
            Ativar modo foco
        </button>

        <button id="botao-cronometro">
            Começar 5 minutos
        </button>
    </div>

    <p id="cronometro">05:00</p>
`;

document.body.appendChild(painel);

// Mostrar dicas aleatórias
document.getElementById("botao-dica")
    .addEventListener("click", function() {
        const indice = Math.floor(
            Math.random() * dicas.length
        );

        document.getElementById("mensagem-dica")
            .textContent = dicas[indice];
    });

// Ativar ou desativar o modo foco
document.getElementById("botao-foco")
    .addEventListener("click", function() {
        document.body.classList.toggle("modo-foco");

        if (document.body.classList.contains("modo-foco")) {
            this.textContent = "Desativar modo foco";
        } else {
            this.textContent = "Ativar modo foco";
        }
    });

// Cronômetro de cinco minutos
let tempo = 300;
let intervalo = null;

document.getElementById("botao-cronometro")
    .addEventListener("click", function() {
        if (intervalo !== null) {
            clearInterval(intervalo);
            intervalo = null;
            this.textContent = "Continuar cronômetro";
            return;
        }

        if (tempo <= 0) {
            tempo = 300;
        }

        this.textContent = "Pausar cronômetro";

        intervalo = setInterval(function() {
            tempo--;

            const minutos = Math.floor(tempo / 60);
            const segundos = tempo % 60;

            document.getElementById("cronometro")
                .textContent =
                String(minutos).padStart(2, "0") + ":" +
                String(segundos).padStart(2, "0");

            if (tempo <= 0) {
                clearInterval(intervalo);
                intervalo = null;

                document.getElementById("cronometro")
                    .textContent = "Tempo concluído! Parabéns!";

                document.getElementById("botao-cronometro")
                    .textContent = "Começar novamente";
            }
        }, 1000);
    });