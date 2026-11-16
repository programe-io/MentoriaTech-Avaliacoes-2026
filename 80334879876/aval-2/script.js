
function adicionarPost() {
    const titulo = document.getElementById("titulo").value.trim();
    const categoria = document.getElementById("categoria").value;
    const descricao = document.getElementById("descricao").value.trim();

    if (!titulo || !categoria || !descricao) {
        alert("Preencha todos os campos!");
        return;
    }

    const artigo = document.createElement("article");
    artigo.className = "post";

    const conteudo = document.createElement("div");
    conteudo.className = "post-info";

    const categoriaTexto = document.createElement("span");
    categoriaTexto.textContent = categoria;

    const tituloTexto = document.createElement("h3");
    tituloTexto.textContent = titulo;

    const descricaoTexto = document.createElement("p");
    descricaoTexto.textContent = descricao;

    const data = document.createElement("small");
    data.textContent = "Publicado em " +
        new Date().toLocaleDateString("pt-BR");

    conteudo.append(
        categoriaTexto,
        tituloTexto,
        descricaoTexto,
        data
    );

    artigo.appendChild(conteudo);

    document.querySelector(".posts").prepend(artigo);

    document.getElementById("titulo").value = "";
    document.getElementById("categoria").value = "";
    document.getElementById("descricao").value = "";

    alert("Artigo publicado com sucesso!");
}
