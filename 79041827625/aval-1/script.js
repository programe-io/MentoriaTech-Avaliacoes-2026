
const botoes = document.querySelectorAll(".curtir");

botoes.forEach((botao) => {
    botao.addEventListener("click", () => {
        const contador = botao.querySelector("span");
        const curtidas = Number(contador.textContent);

        contador.textContent = curtidas + 1;
        botao.disabled = true;
        botao.innerHTML = `❤️ Curtido! <span>${curtidas + 1}</span>`;
    });
});
