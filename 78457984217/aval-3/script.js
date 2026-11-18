
let quantidade = 0;

function curtir() {

    quantidade++;

    document.getElementById("curtidas").innerHTML =
        quantidade + " curtidas";

}

function comentar() {

    let texto = document.getElementById("comentario").value;

    if (texto.trim() === "") {
        alert("Digite um comentário!");
        return;
    }

    document.getElementById("resultado").innerHTML =
        "👤 Você: " + texto;

    document.getElementById("comentario").value = "";

}
