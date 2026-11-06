
// SISTEMA DE BIBLIOTECA VIRTUAL

let biblioteca = [];

// Cadastrar livro
function adicionarLivro(titulo, autor) {
    let livro = {
        titulo: titulo,
        autor: autor
    };

    biblioteca.push(livro);

    console.log("Livro cadastrado com sucesso!");
}

// Mostrar livros
function mostrarLivros() {
    console.log("=== BIBLIOTECA VIRTUAL ===");

    biblioteca.forEach((livro, indice) => {
        console.log(
            `${indice + 1}. ${livro.titulo} - ${livro.autor}`
        );
    });
}

// Pesquisar livro
function pesquisarLivro(nome) {
    let resultado = biblioteca.filter(livro =>
        livro.titulo.toLowerCase().includes(nome.toLowerCase())
    );

    console.log("Resultado da pesquisa:", resultado);
}

// Excluir livro
function excluirLivro(titulo) {
    biblioteca = biblioteca.filter(livro =>
        livro.titulo !== titulo
    );

    console.log("Livro excluído!");
}

// Exemplos de cadastro
adicionarLivro("Dom Casmurro", "Machado de Assis");
adicionarLivro("O Pequeno Príncipe", "Antoine de Saint-Exupéry");
adicionarLivro("Harry Potter", "J.K. Rowling");

// Executar funções
mostrarLivros();

pesquisarLivro("Harry Potter");

excluirLivro("Dom Casmurro");

mostrarLivros();
