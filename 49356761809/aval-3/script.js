
function curtir(botao) {
    if (botao.innerHTML == "♡ Curtir") {
        botao.innerHTML = "♥ Curtido";
    } else {
        botao.innerHTML = "♡ Curtir";
    }
}

function comentar(botao) {
    var campo = botao.previousElementSibling;
    var texto = campo.value;

    if (texto != "") {
        alert("Comentário enviado: " + texto);
        campo.value = "";
    } else {
        alert("Digite um comentário!");
    }
}

function publicar() {
    var usuario = document.getElementById("usuario").value;
    var foto = document.getElementById("foto").value;
    var legenda = document.getElementById("legenda").value;

    if (usuario == "" || foto == "" || legenda == "") {
        alert("Preencha todos os campos!");
    } else {
        var post = document.createElement("div");

        post.className = "post";

        post.innerHTML = `
            <h3>${usuario}</h3>
            <img src="${foto}">
            <p>${legenda}</p>
            <button onclick="curtir(this)">♡ Curtir</button>
            <p>Comentários: <span>0</span></p>
            <input type="text" placeholder="Comente aqui">
            <button onclick="comentar(this)">Enviar</button>
        `;

        document.getElementById("feed").prepend(post);

        document.getElementById("usuario").value = "";
        document.getElementById("foto").value = "";
        document.getElementById("legenda").value = "";

        alert("Publicação criada!");
    }
}
