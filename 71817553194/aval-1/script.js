document.getElementById("form").addEventListener("submit", function(e) {
    e.preventDefault();

    let nome = document.getElementById("nome").value;

    document.getElementById("mensagem").textContent =
        "Olá, " + nome + "! Obrigado pelo contato.";
\});$0