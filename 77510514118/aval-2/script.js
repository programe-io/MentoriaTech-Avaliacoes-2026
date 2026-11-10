
function publicar() {

    let nome = document.getElementById("nome").value;
    let mensagem = document.getElementById("mensagem").value;

    if (nome === "" || mensagem === "") {
        alert("Preencha todos os campos!");
        return;
    }

    let feed = document.getElementById("feed");

    let post = document.createElement("div");
    post.className = "post";

    let titulo = document.createElement("h3");
    titulo.textContent = nome;

    let texto = document.createElement("p");
    texto.textContent = mensagem;

    let botao = document.createElement("button");
    botao.textContent = "Curtir ❤️";

    let curtidas = 0;

    botao.onclick = function() {
        curtidas++;
        botao.textContent = "Curtidas: " + curtidas + " ❤️";
    };

    post.appendChild(titulo);
    post.appendChild(texto);
    post.appendChild(botao);

    feed.prepend(post);

    document.getElementById("nome").value = "";
    document.getElementById("mensagem").value = "";
}
