// Contador de cliques
let cliques = 0;

function contarCliques() {
    cliques++;
    document.getElementById("contador").textContent =
        "Cliques: " + cliques;
}

// Validação do formulário
document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.getElementById("formulario");

    formulario.addEventListener("submit", (event) => {
        event.preventDefault();

        const nome = document.getElementById("nome").value.trim();
        const email = document.getElementById("email").value.trim();

        if (nome === "" || email === "") {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        alert(`Obrigado, ${nome}! Seu formulário foi enviado com sucesso.`);

        formulario.reset();
    });
});