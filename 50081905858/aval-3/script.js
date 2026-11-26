let curtidas = 1245;

const btnCurtir = document.getElementById("btnCurtir");
const textoCurtidas = document.getElementById("curtidas");

btnCurtir.addEventListener("click", () => {
    curtidas++;
    textoCurtidas.textContent = `${curtidas} curtidas`;
});