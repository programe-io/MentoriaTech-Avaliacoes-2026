function mostrarMensagem() {
    const nome = document.getElementById("nome").value;

    if (nome === "") {
        alert("Digite seu nome!");
    } else {
        alert(`Obrigado pelo contato, ${nome}!`);
    }
}