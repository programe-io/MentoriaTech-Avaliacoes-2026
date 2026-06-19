document.getElementById("formulario").addEventListener("submit", function(e) {
    e.preventDefault();

    let nome = document.getElementById("nome").value;
    let idade = document.getElementById("idade").value;

    if (nome === "" || idade === "") {
        alert("Preencha tudo!");
    } else {
        alert("Nome: " + nome + " | Idade: " + idade);
    }
});