const zumbi = document.getElementById("zumbi");
const areaJogo = document.getElementById("areaJogo");
const pontosEl = document.getElementById("pontos");
const btnReiniciar = document.getElementById("reiniciar");
let pontos = 0;

function moverZumbi() {
    const maxX = areaJogo.clientWidth - 60;
        const maxY = areaJogo.clientHeight - 60;
            const x = Math.floor(Math.random() * maxX);
                const y = Math.floor(Math.random() * maxY);
                    zumbi.style.left = x + "px";
                        zumbi.style.top = y + "px";
                        }

                        zumbi.addEventListener("click", () => {
                            pontos++;
                                pontosEl.textContent = pontos;
                                    moverZumbi();
                                    });

                                    btnReiniciar.addEventListener("click", () => {
                                        pontos = 0;
                                            pontosEl.textContent = pontos;
                                                moverZumbi();
                                                });

                                                moverZumbi();
                                                