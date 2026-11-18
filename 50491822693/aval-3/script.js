
        novoComentario.textContent = "💬 " + comentario;

        document.getElementById("comentarios")
            .appendChild(novoComentario);
    }
}

// MENSAGEM DE BOAS-VINDAS
function mensagem() {
    alert("Bem-vindo ao nosso feed! 🚀");
}

// MUDAR A COR DO TÍTULO
function mudarTitulo() {
    let titulo = document.querySelector("header h1");

    titulo.style.color = titulo.style.color === "yellow"
        ? "white"
        : "yellow";
}