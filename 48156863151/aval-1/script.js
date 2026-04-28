const botao = document.getElementById("btnGlow");

botao.addEventListener("click", () => {

    document.body.style.transition = "0.5s";

        document.body.style.background =
            "linear-gradient(135deg, #ffd6e7, #fff5fa)";

                botao.innerHTML = "Brilho ativado ✨";

                    alert("Sua beleza natural acabou de brilhar!");
                    });