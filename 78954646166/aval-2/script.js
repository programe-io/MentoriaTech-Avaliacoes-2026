<script>
    const botoes_curtir = document.querySelectorAll(".curtir");

    botoes_curtir.forEach(function (botao_curtir) {
        let curtido = false;
        let curtidas = 0;

        botao_curtir.addEventListener("click", function () {
            curtido = !curtido;
            curtidas += curtido ? 1 : -1;

            botao_curtir.querySelector("span").textContent = curtidas;
            botao_curtir.firstChild.textContent = curtido
                ? "❤️ Curtido "
                : "🤍 Curtir ";
        });
    });
    const botoes_comentar = document.querySelectorAll(".comentar");

    botoes_comentar.forEach(botao_comentar => {
        botao_comentar.addEventListener("click", () => {

            const post = botao_comentar.closest(".post");
            const campo = post.querySelector("input");
            const comentarios = post.querySelector(".comentarios");

            if (campo.value.trim() === "") {
                alert("Digite um comentário!");
                return;
            }

            const novoComentario = document.createElement("p");

            novoComentario.textContent = campo.value;

            comentarios.appendChild(novoComentario);

            campo.value = "";
        });
    });
</script>