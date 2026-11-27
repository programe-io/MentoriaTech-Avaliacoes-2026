
function lerNoticia(titulo) {
    alert("Você selecionou a notícia: " + titulo);
}

function inscrever() {
    let email = document.getElementById("email").value;

    if (email === "") {
        alert("Digite seu e-mail!");
    } else if (!email.includes("@") || !email.includes(".")) {
        alert("Digite um e-mail válido!");
    } else {
        alert("Inscrição realizada com sucesso! ⚽");
        document.getElementById("email").value = "";
    }
}
