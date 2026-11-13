
// Array de objetos
let alunos = [
    { nome: "Maria" },
    { nome: "João" },
    { nome: "Pedro" }
];

// Função responsável por atualizar a tela
function render() {

    let lista = document.getElementById("lista");

    // Limpar o conteúdo atual
    lista.innerHTML = "";

    // Percorrer o Array
    alunos.forEach(function(aluno) {

        // Criar elemento HTML
        let item = document.createElement("li");

        // Inserir o nome do aluno
        item.textContent = aluno.nome;

        // Adicionar na lista
        lista.appendChild(item);

    });
}

// Adicionar aluno
function adicionarAluno() {

    let campo = document.getElementById("nome");

    let nome = campo.value.trim();

    if (nome === "") {
        alert("Digite um nome!");
        return;
    }

    // Alterar o Array
    alunos.push({ nome: nome });

    // Atualizar a tela
    render();

    campo.value = "";
}

// Executar a renderização inicial
render();
