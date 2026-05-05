function validarForm() {
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const mensagem = document.getElementById("mensagem");

    if (nome === "" || email === "") {
        mensagem.textContent = "Preencha todos os campos!";
        mensagem.style.color = "red";
        return false;
    }

    mensagem.textContent = "Cadastro realizado com sucesso!";
    mensagem.style.color = "green";
    return false; // evita recarregar a página
}