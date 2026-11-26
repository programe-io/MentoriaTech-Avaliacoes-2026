// Seleciona o formulário
const formulario = document.querySelector("form");

// Captura o evento de envio
formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    // Captura os valores digitados
    const nome = document.querySelector('input[type="text"]').value;
    const email = document.querySelector('input[type="email"]').value;

    // Verifica se os campos foram preenchidos
    if (nome.trim() === "" || email.trim() === "") {
        alert("Preencha todos os campos!");
    \} else {
        alert("Cadastro realizado com sucesso, " + nome + "!");
    \}
\});$0