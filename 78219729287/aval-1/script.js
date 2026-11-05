
// Mostrar e esconder o modo de preparo
function mostrarReceita(id) {
    const preparo = document.getElementById(id);

    if (preparo.style.display === "block") {
        preparo.style.display = "none";
    } else {
        preparo.style.display = "block";
    }
}

// Inscrição na newsletter
function inscrever() {
    const email = document.getElementById("email").value;

    if (email.trim() === "") {
        alert("Por favor, digite seu e-mail!");
        return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert("Digite um e-mail válido!");
        return;
    }

    alert("Oba! Você foi cadastrado com sucesso! 🍰");

    document.getElementById("email").value = "";
}

// Pesquisa de receitas
document.getElementById("pesquisa").addEventListener("input", function() {

    const busca = this.value.toLowerCase();
    const receitas = document.querySelectorAll(".receita");

    receitas.forEach(function(receita) {

        const texto = receita.textContent.toLowerCase();

        receita.style.display =
            texto.includes(busca) ? "block" : "none";

    });
});
