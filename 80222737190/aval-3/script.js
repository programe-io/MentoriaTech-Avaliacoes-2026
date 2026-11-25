
function curtir(botao) {
    let numero = Number(
        botao.innerText.match(/\d+/)[0]
    );

    numero++;

    botao.innerText = "❤️ Curtir (" + numero + ")";
}

function comentar() {
    let campo = document.getElementById("comentario");
    let texto = campo.value.trim();

    if (texto === "") {
        alert("Digite um comentário!");
        return;
    }

    let novo = document.createElement("p");

    novo.textContent = "💬 " + texto;

    novo.style.padding = "8px";
    novo.style.borderBottom = "1px solid #ddd";

    document.getElementById("comentarios")
        .appendChild(novo);

    campo.value = "";
}
+