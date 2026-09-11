let pontos = 0;
let defesas = 0;

function chutar(direcao) {

    const goleiro = document.getElementById("goleiro");
        const bola = document.getElementById("bola");
            const mensagem = document.getElementById("mensagem");

                const direcoes = ["esquerda", "meio", "direita"];

                    const defesa = direcoes[Math.floor(Math.random() * 3)];

                        // Movimento do goleiro
                            if (defesa === "esquerda") {
                                    goleiro.style.left = "10%";
                                        } 
                                            else if (defesa === "meio") {
                                                    goleiro.style.left = "42%";
                                                        } 
                                                            else {
                                                                    goleiro.style.left = "75%";
                                                                        }

                                                                            // Movimento da bola
                                                                                if (direcao === "esquerda") {
                                                                                        bola.style.left = "20%";
                                                                                                bola.style.bottom = "160px";
                                                                                                    } 
                                                                                                        else if (direcao === "meio") {
                                                                                                                bola.style.left = "46%";
                                                                                                                        bola.style.bottom = "160px";
                                                                                                                            } 
                                                                                                                                else {
                                                                                                                                        bola.style.left = "70%";
                                                                                                                                                bola.style.bottom = "160px";
                                                                                                                                                    }

                                                                                                                                                        setTimeout(() => {

                                                                                                                                                                if (direcao === defesa) {
                                                                                                                                                                            defesas++;

                                                                                                                                                                                        document.getElementById("defesas").textContent = defesas;

                                                                                                                                                                                                    mensagem.textContent = "🧤 DEFENDEU! O goleiro pegou!";
                                                                                                                                                                                                            } 
                                                                                                                                                                                                                    else {
                                                                                                                                                                                                                                pontos++;

                                                                                                                                                                                                                                            document.getElementById("pontos").textContent = pontos;

                                                                                                                                                                                                                                                        mensagem.textContent = "⚽ GOOOOOOL! Você marcou!";
                                                                                                                                                                                                                                                                }

                                                                                                                                                                                                                                                                        setTimeout(() => {
                                                                                                                                                                                                                                                                                    bola.style.left = "46%";
                                                                                                                                                                                                                                                                                                bola.style.bottom = "25px";
                                                                                                                                                                                                                                                                                                        }, 700);

                                                                                                                                                                                                                                                                                                            }, 600);
                                                                                                                                                                                                                                                                                                            }

                                                                                                                                                                                                                                                                                                            function reiniciar() {

                                                                                                                                                                                                                                                                                                                pontos = 0;
                                                                                                                                                                                                                                                                                                                    defesas = 0;

                                                                                                                                                                                                                                                                                                                        document.getElementById("pontos").textContent = 0;
                                                                                                                                                                                                                                                                                                                            document.getElementById("defesas").textContent = 0;

                                                                                                                                                                                                                                                                                                                                document.getElementById("mensagem").textContent =
                                                                                                                                                                                                                                                                                                                                        "Escolha onde você quer chutar!";

                                                                                                                                                                                                                                                                                                                                            document.getElementById("goleiro").style.left = "42%";
                                                                                                                                                                                                                                                                                                                                                document.getElementById("bola").style.left = "46%";
                                                                                                                                                                                                                                                                                                                                                    document.getElementById("bola").style.bottom = "25px";
                                                                                                                                                                                                                                                                                                                                                    }