function contarItens() {
        const itens = document.querySelectorAll("li").length;

            document.getElementById("resultado").textContent =
                    "Você está revisando " + itens + " tópicos.";
                    }
}