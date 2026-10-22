
document.querySelectorAll(".curtir").forEach((botao) => {
    botao.addEventListener("click", () => {
        const contador = botao.querySelector("span");
        let total = Number(contador.textContent);

        if (botao.classList.contains("ativo")) {
            total--;
            botao.classList.remove("ativo");
        } else {
            total++;
            botao.classList.add("ativo");
        }

        contador.textContent = total;
    });
});
