
function mostrarMensagem() {
    document.getElementById("destaques").scrollIntoView({
        behavior: "smooth"
    });
}

function lerMais(texto) {
    alert(texto);
}

function inscrever() {
    let email = document.getElementById("email").value.trim();

    if (email === "" || !email.includes("@") || !email.includes(".")) {
        alert("Digite um e-mail válido!");
        return;
    }

    alert("Inscrição realizada com sucesso!");

    document.getElementById("email").value = "";
}
