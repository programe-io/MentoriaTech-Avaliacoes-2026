function entrar() {
    let usuario = document.getElementById("user").value;
    let senha = document.getElementById("pass").value;

    if (usuario === "admin" && senha === "1234") {
        alert("Login realizado com sucesso!");
    } else {
        alert("Usuário ou senha incorretos!");
    }
}