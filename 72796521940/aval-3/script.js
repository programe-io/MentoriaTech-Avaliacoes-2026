
function adicionarCliente() {

    const nome = document.getElementById("nome").value.trim();
    const telefone = document.getElementById("telefone").value.trim();

    if (nome === "" || telefone === "") {
        alert("Preencha todos os campos!");
        return;
    \}

    const lista = document.getElementById("listaClientes");

    const cliente = document.createElement("li");
    cliente.className = "cliente";
$0