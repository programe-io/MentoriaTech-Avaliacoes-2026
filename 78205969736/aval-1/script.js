
// SISTEMA DE CURTIDAS
document.querySelectorAll(".post").forEach(post => {

    const botaoLike = post.querySelector(".like");
    const contador = post.querySelector(".likes span");

    botaoLike.addEventListener("click", () => {

        let quantidade = Number(
            contador.textContent.replace(/\./g, "")
        );

        if (botaoLike.classList.contains("curtiu")) {
            quantidade--;
            botaoLike.classList.remove("curtiu");
            botaoLike.textContent = "♡";
        } else {
            quantidade++;
            botaoLike.classList.add("curtiu");
            botaoLike.textContent = "♥";
        }

        contador.textContent = quantidade.toLocaleString("pt-BR");
    });

    // SISTEMA DE COMENTÁRIOS
    const campo = post.querySelector("input");
    const publicar = post.querySelector(".adicionar-comentario button");
    const areaComentarios = post.querySelector(".comentarios");

    function adicionarComentario() {
        const texto = campo.value.trim();

        if (texto === "") {
            alert("Digite um comentário primeiro!");
            return;
        }

        const novoComentario = document.createElement("p");
        const usuario = document.createElement("strong");

        usuario.textContent = "Você: ";
        novoComentario.appendChild(usuario);
        novoComentario.appendChild(
            document.createTextNode(texto)
        );

        areaComentarios.appendChild(novoComentario);
        campo.value = "";
    }

    publicar.addEventListener("click", adicionarComentario);

    campo.addEventListener("keydown", event => {
        if (event.key === "Enter") {
            adicionarComentario();
        }
    });

    // BOTÃO DE COMENTÁRIO
    post.querySelector(".comentario-btn").addEventListener("click", () => {
        campo.focus();
    });

    // COMPARTILHAMENTO
    post.querySelector(".compartilhar").addEventListener("click", async () => {
        const texto = "Confira esta publicação da Neymar Fan Page!";

        if (navigator.share) {
            try {
                await navigator.share({
                    title: "Neymar Fan Page",
                    text: texto,
                    url: window.location.href
                });
            } catch (erro) {
                console.log("Compartilhamento cancelado.");
            }
        } else {
            try {
                await navigator.clipboard.writeText(
                    window.location.href
                );
                alert("Link copiado!");
            } catch (erro) {
                alert("Não foi possível copiar o link.");
            }
        }
    });

});

// ANIMAÇÃO DE ENTRADA
const elementos = document.querySelectorAll(
    ".time, .trofeus div, .post"
);

const observador = new IntersectionObserver(entradas => {
    entradas.forEach(entrada => {
        if (entrada.isIntersecting) {
            entrada.target.classList.add("aparecer");
            observador.unobserve(entrada.target);
        }
    });
}, { threshold: 0.15 });

elementos.forEach(elemento => {
    elemento.style.opacity = "0";
    elemento.style.transform = "translateY(25px)";
    elemento.style.transition = "all .6s ease";

    observador.observe(elemento);
});

// CLASSE DE ANIMAÇÃO
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".aparecer");
});

const estiloAnimacao = document.createElement("style");
estiloAnimacao.textContent = `
    .aparecer {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(estiloAnimacao);

console.log("NEYMAR FAN PAGE carregada com sucesso!");
