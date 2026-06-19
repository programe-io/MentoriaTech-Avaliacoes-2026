const cartas = document.querySelectorAll(".carta");
const mensagem = document.getElementById("mensagem");

let primeiraCarta = null;
let segundaCarta = null;
let bloqueio = false;
let pares = 0;

cartas.forEach(carta => {
    carta.addEventListener("click", () => {
        if (bloqueio || carta.textContent !== "?") {
            return;
        }

        carta.textContent = carta.dataset.valor;

        if (!primeiraCarta) {
            primeiraCarta = carta;
        } else {
            segundaCarta = carta;
            bloqueio = true;

            if (primeiraCarta.dataset.valor === segundaCarta.dataset.valor) {
                pares++;
                primeiraCarta = null;
                segundaCarta = null;
                bloqueio = false;

                if (pares === 4) {
                    mensagem.textContent = "Parabéns! Você venceu o jogo!";
                }
            } else {
                setTimeout(() => {
                    primeiraCarta.textContent = "?";
                    segundaCarta.textContent = "?";

                    primeiraCarta = null;
                    segundaCarta = null;
                    bloqueio = false;
                }, 1000);
            }
        }
    });
});