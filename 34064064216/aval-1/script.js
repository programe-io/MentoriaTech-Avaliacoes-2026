
function adicionarPessoa() {
    const nome = prompt("Digite o nome da pessoa:");
    if (!nome) return;

    const idade = prompt("Digite a idade:");
    if (!idade || isNaN(idade)) return;

    const cidade = prompt("Digite a cidade:");

    if (!cidade) return;

    const tabela = document.querySelector("table tbody") || document.querySelector("table");
    const linha = tabela.insertRow();

    linha.insertCell().textContent = nome;
    linha.insertCell().textContent = idade;
    linha.insertCell().textContent = cidade;
}

