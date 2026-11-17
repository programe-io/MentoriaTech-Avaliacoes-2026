
// SISTEMA DE CURTIDAS
const botoesCurtir = document.querySelectorAll(".like");

botoesCurtir.forEach((botao) => {
    botao.addEventListener("click", () => {

        botao.classList.toggle("curtiu");

        if (botao.classList.contains("curtiu")) {
            botao.innerHTML = "♥";
        } else {
            botao.innerHTML = "♡";
        }
    });
});


// SISTEMA DE COMENTÁRIOS
document.querySelectorAll(".comentar").forEach((area) => {

    const input = area.querySelector("input");
    const botao = area.querySelector("button");
    const post = area.closest(".post");

    botao.addEventListener("click", () => {

        const mensagem = input.value.trim();

        if (mensagem === "") {
            alert("Digite um comentário!");
            return;
        }

        const novoComentario = document.createElement("p");

        novoComentario.style.padding = "10px 15px";

        const usuario = document.createElement("strong");
        usuario.textContent = "Você: ";

        novoComentario.appendChild(usuario);

        novoComentario.appendChild(
            document.createTextNode(mensagem)
        );

        post.insertBefore(novoComentario, area);

        input.value = "";
    });

    // PUBLICAR COM ENTER
    input.addEventListener("keypress", (evento) => {
        if (evento.key === "Enter") {
            botao.click();
        }
    });

});


// MENSAGEM DE BOAS-VINDAS
console.log("Bem-vindo ao KATSEYE Social! 💗");
