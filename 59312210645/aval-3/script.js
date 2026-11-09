
function entrar() {

    const usuario = document.getElementById("usuario").value;

    const senha = document.getElementById("senha").value;

    const resultado = document.getElementById("resultado");

    if (usuario === "" || senha === "") {

        resultado.textContent = "⚠️ Preencha todos os campos!";

        resultado.style.color = "orange";

    } else if (senha.length < 4) {

        resultado.textContent = "❌ Senha muito curta!";

        resultado.style.color = "red";

    } else {

        resultado.textContent =
            "✅ Bem-vindo, " + usuario + "!";

        resultado.style.color = "green";
    }
}
