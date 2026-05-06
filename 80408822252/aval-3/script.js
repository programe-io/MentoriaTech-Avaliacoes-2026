function mudarSecao(secaoId) {
    const artigos = document.querySelectorAll("article");

    artigos.forEach(artigo => {
        artigo.classList.remove("ativo");
    });

    document.getElementById(secaoId).classList.add("ativo");

    document.getElementById("status").innerText =
        "Categoria selecionada: " + secaoId;
}