const botao = document.getElementById("tema");

botao.addEventListener("click", () => {
    document.body.classList.toggle("dark");

        if (document.body.classList.contains("dark")) {
                botao.textContent = "☀️ Modo Claro";
                    } else {
                            botao.textContent = "🌙 Modo Escuro";
                                }
                                });

                                