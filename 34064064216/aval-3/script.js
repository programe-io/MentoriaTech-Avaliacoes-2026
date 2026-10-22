
function adicionarPessoa() {
    const nome = document.getElementById("nome").value;
    const idade = document.getElementById("idade").value;
    const cidade = document.getElementById("cidade").value;

    if (nome === "" || idade === "" || cidade === "") {
        alert("Preencha todos os campos!");
        return;
    }

    const tabela = document.getElementById("tabelaPessoas");
    const linha = tabela.insertRow();

    linha.insertCell(0).textContent = nome;
    linha.insertCell(1).textContent = idade;
    linha.insertCell(2).textContent = cidade;

    document.getElementById("nome").value = "";
    document.getElementById("idade").value = "";
    document.getElementById("cidade").value = "";

    alert("Pessoa cadastrada com sucesso!");
}
