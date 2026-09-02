```javascript
// =============================
// JAVASCRIPT - MINIFEED RAPUNZEL
// =============================

// CURTIR POST
function curtir(botao) {

    const contador = botao.querySelector("span");
    let curtidas = Number(contador.textContent);

    if (botao.classList.contains("curtido")) {

        // Retirar curtida
        curtidas--;
        botao.classList.remove("curtido");

    } else {

        // Adicionar curtida
        curtidas++;
        botao.classList.add("curtido");

    }

    contador.textContent = curtidas;
}


// MOSTRAR OU ESCONDER COMENTÁRIOS
function mostrarComentario(botao) {

    const post = botao.closest(".post");
    const comentarios = post.querySelector(".comentarios");

    if (comentarios.style.display === "none" ||
        comentarios.style.display === "") {

        comentarios.style.display = "block";

    } else {

        comentarios.style.display = "none";
    }
}


// ADICIONAR COMENTÁRIO
function comentar(botao) {

    const area = botao.parentElement;

    const input = area.querySelector("input");
    const lista = area.querySelector(".lista-comentarios");

    const texto = input.value.trim();

    // Verifica se o campo está vazio
    if (texto === "") {

        alert("🌸 Escreva um comentário primeiro!");

        return;
    }

    // Criar comentário
    const novoComentario = document.createElement("div");

    novoComentario.classList.add("comentario");

    novoComentario.innerHTML = `
        💜 <strong>Visitante:</strong> ${texto}
    `;

    // Adicionar comentário
    lista.appendChild(novoComentario);

    // Limpar campo
    input.value = "";

    // Mostrar mensagem
    console.log("Comentário adicionado!");
}


// COMPARTILHAR POST
function compartilhar() {

    if (navigator.share) {

        navigator.share({
            title: "MiniFeed da Rapunzel 🌸",
            text: "Confira o MiniFeed da Rapunzel!"
        })
        .then(() => {
            console.log("Post compartilhado!");
        })
        .catch(() => {
            console.log("Compartilhamento cancelado.");
        });

    } else {

        alert(
            "🌸 Post compartilhado com sucesso!"
        );
    }
}


// ENTER PARA ENVIAR COMENTÁRIO
document.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {

        const elemento = document.activeElement;

        if (elemento.tagName === "INPUT") {

            const botao = elemento.nextElementSibling;

            if (botao) {
                botao.click();
            }
        }
    }
});


// MENSAGEM AO CARREGAR
window.addEventListener("load", function() {

    console.log(
        "🌸 Bem-vindo ao MiniFeed da Rapunzel! 👑"
    );

});
```
