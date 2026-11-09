
// Sistema de curtidas
function curtir(botao) {
    let contador = botao.querySelector("span");
    let quantidade = Number(contador.textContent);

    if (botao.classList.contains("curtido")) {
        quantidade--;
        botao.classList.remove("curtido");
        botao.style.background = "#7137d8";
    } else {
        quantidade++;
        botao.classList.add("curtido");
        botao.style.background = "#e63965";
    }

    contador.textContent = quantidade;
}

// Mostrar e esconder comentários
function mostrarComentarios(botao) {
    let comentarios = botao.parentElement.querySelector(".comentarios");

    comentarios.style.display =
        comentarios.style.display === "block" ? "none" : "block";
}

// Adicionar comentário
function comentar(botao) {
    let area = botao.parentElement;
    let input = area.querySelector("input");
    let lista = area.querySelector(".lista-comentarios");

    let texto = input.value.trim();

    if (texto === "") {
        alert("Digite um comentário primeiro!");
        return;
    }

    let comentario = document.createElement("div");
    comentario.className = "item-comentario";

    let mensagem = document.createElement("span");
    mensagem.textContent = "👤 Você: " + texto;

    // Botão editar
    let editar = document.createElement("button");
    editar.textContent = "✏️ Editar";

    editar.onclick = function() {
        let novoTexto = prompt("Edite seu comentário:", mensagem.textContent.replace("👤 Você: ", ""));

        if (novoTexto !== null && novoTexto.trim() !== "") {
            mensagem.textContent = "👤 Você: " + novoTexto.trim();
        }
    };

    // Botão excluir
    let excluir = document.createElement("button");
    excluir.textContent = "🗑️ Excluir";

    excluir.onclick = function() {
        comentario.remove();
    };

    comentario.append(mensagem, editar, excluir);
    lista.appendChild(comentario);

    input.value = "";
}

// Pesquisa de publicações
document.getElementById("pesquisa").addEventListener("input", function() {
    let pesquisa = this.value.toLowerCase();

    document.querySelectorAll(".post").forEach(post => {
        let conteudo = post.textContent.toLowerCase();

        post.style.display = conteudo.includes(pesquisa)
            ? "block"
            : "none";
    });
});
