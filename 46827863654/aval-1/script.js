function publicar() {

    // Capturar os valores digitados
    let titulo = document.getElementById("titulo").value;

    let conteudo = document.getElementById("conteudo").value;

    // Verificar se os campos estão preenchidos
    if (titulo === "" || conteudo === "") {
        alert("Preencha todos os campos!");
        return;
    }

    // Criar uma nova publicação
    let novaPostagem = document.createElement("article");

    novaPostagem.className = "post";

    novaPostagem.innerHTML = `
        <h3>${titulo}</h3>
        <p>${conteudo}</p>
    `;

    // Adicionar a publicação na página
    document.getElementById("postagens")
        .prepend(novaPostagem);

    // Limpar os campos
    document.getElementById("titulo").value = "";

    document.getElementById("conteudo").value = "";

    alert("Postagem publicada com sucesso!");
}