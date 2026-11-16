const buttons = document.querySelectorAll(".like-btn");

buttons.forEach(button => {
    button.addEventListener("click", () => {

        const contador = button.querySelector("span");
        let curtidas = Number(contador.textContent);

        if (button.classList.contains("liked")) {
            curtidas--;
            button.classList.remove("liked");
            button.innerHTML = `❤️ Curtir <span>${curtidas}</span>`;
        } else {
            curtidas++;
            button.classList.add("liked");
            button.innerHTML = `❤️ Curtido <span>${curtidas}</span>`;
        }

    });
});
