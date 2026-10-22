
const pessoas = [
    { nome: "João Silva", idade: 25, cidade: "Teresina", profissao: "Programador" },
    { nome: "Maria Santos", idade: 30, cidade: "Fortaleza", profissao: "Professora" },
    { nome: "Pedro Costa", idade: 22, cidade: "São Paulo", profissao: "Designer" }
];

function mostrarPessoas(lista = pessoas) {
    const tabela = document.getElementById("corpoTabela");
    tabela.replaceChildren();

    lista.forEach((pessoa) => {
        const linha = tabela.insertRow();

        [pessoa.nome, pessoa.idade, pessoa.cidade, pessoa.profissao]
            .forEach(valor => {
                linha.insertCell().textContent = valor;
            });

        const celula = linha.insertCell();
        const botao = document.createElement("button");

        botao.textContent = "Excluir";
        botao.onclick = () => {
            const indice = pessoas.indexOf(pessoa);
            pessoas.splice(indice, 1);
            pesquisarPessoas();
        };

        celula.appendChild(botao);
    });
}

function adicionarPessoa() {
    const nome = document.getElementById("nome").value.trim();
    const idade = Number(document.getElementById("idade").value);
    const cidade = document.getElementById("cidade").value.trim();
    const profissao = document.getElementById("profissao").value.trim();

    if (!nome || !cidade || !profissao || idade <= 0 || !Number.isInteger(idade)) {
        alert("Preencha todos os campos corretamente!");
        return;
    }

    pessoas.push({ nome, idade, cidade, profissao });

    document.getElementById("nome").value = "";
    document.getElementById("idade").value = "";
    document.getElementById("cidade").value = "";
    document.getElementById("profissao").value = "";

    pesquisarPessoas();
}

function pesquisarPessoas() {
    const busca = document.getElementById("pesquisa").value.toLowerCase();

    const resultado = pessoas.filter(pessoa =>
        pessoa.nome.toLowerCase().includes(busca)
    );

    mostrarPessoas(resultado);
}

mostrarPessoas();
