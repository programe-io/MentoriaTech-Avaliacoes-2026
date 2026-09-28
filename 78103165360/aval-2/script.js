const botao = document.getElementById("seguirBtn");
const mensagem = document.getElementById("mensagem");

let seguindo = false;

botao.addEventListener("click", () => {
    seguindo = !seguindo;

    if (seguindo) {
        botao.textContent = "Seguindo ✓";
        botao.classList.add("seguindo");
        mensagem.textContent = "Você está seguindo José Henrique!";
    } else {
        botao.textContent = "Seguir";
        botao.classList.remove("seguindo");
        mensagem.textContent = "";
    }
});
