
const API = "/api/livros";

const formulario = document.getElementById("livroForm");
const lista = document.getElementById("listaLivros");
const pesquisa = document.getElementById("pesquisa");

let livros = [];

// Carregar livros do banco de dados
async function carregarLivros() {
    try {
        const resposta = await fetch(API);
        if (!resposta.ok) throw new Error("Erro ao carregar livros");

        livros = await resposta.json();
        atualizarTela();
    } catch (erro) {
        alert("Não foi possível conectar ao servidor Java.");
        console.error(erro);
    }
}

// Atualizar tabela e indicadores
function atualizarTela() {
    lista.innerHTML = "";

    const termo = pesquisa.value.toLowerCase();

    const filtrados = livros.filter(livro =>
        livro.titulo.toLowerCase().includes(termo) ||
        livro.autor.toLowerCase().includes(termo)
    );

    filtrados.forEach(livro => {
        const linha = document.createElement("tr");

        const dados = [
            livro.titulo,
            livro.autor,
            livro.categoria,
            livro.quantidade
        ];

        dados.forEach(valor => {
            const celula = document.createElement("td");
            celula.textContent = valor;
            linha.appendChild(celula);
        });

        const acoes = document.createElement("td");

        const editar = document.createElement("button");
        editar.textContent = "Editar";
        editar.className = "editar";
        editar.onclick = () => editarLivro(livro.id);

        const excluir = document.createElement("button");
        excluir.textContent = "Excluir";
        excluir.className = "excluir";
        excluir.onclick = () => excluirLivro(livro.id);

        acoes.append(editar, excluir);
        linha.appendChild(acoes);
        lista.appendChild(linha);
    });

    document.getElementById("total").textContent =
        livros.length;

    document.getElementById("disponiveis").textContent =
        livros.reduce((soma, livro) =>
            soma + livro.quantidade, 0);

    document.getElementById("emprestados").textContent =
        livros.filter(livro => livro.quantidade === 0).length;
}

// Cadastrar ou atualizar livro
formulario.addEventListener("submit", async function(event) {
    event.preventDefault();

    const id = document.getElementById("livroId").value;

    const livro = {
        titulo: document.getElementById("titulo").value.trim(),
        autor: document.getElementById("autor").value.trim(),
        categoria: document.getElementById("categoria").value.trim(),
        isbn: document.getElementById("isbn").value.trim(),
        quantidade: Number(document.getElementById("quantidade").value)
    };

    if (!livro.titulo || !livro.autor ||
        !livro.categoria || !Number.isInteger(livro.quantidade) ||
        livro.quantidade < 0) {
        alert("Preencha os campos corretamente.");
        return;
    }

    try {
        const resposta = await fetch(
            id ? `${API}/${id}` : API,
            {
                method: id ? "PUT" : "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(livro)
            }
        );

        if (!resposta.ok) throw new Error("Erro ao salvar");

        alert(id ? "Livro atualizado!" : "Livro cadastrado!");

        formulario.reset();
        document.getElementById("livroId").value = "";
        document.getElementById("botaoSalvar").textContent =
            "Cadastrar Livro";
        document.getElementById("cancelar").hidden = true;

        carregarLivros();

    } catch (erro) {
        alert("Erro ao salvar o livro.");
        console.error(erro);
    }
});

// Editar livro
function editarLivro(id) {
    const livro = livros.find(item => item.id === id);

    if (!livro) return;

    document.getElementById("livroId").value = livro.id;
    document.getElementById("titulo").value = livro.titulo;
    document.getElementById("autor").value = livro.autor;
    document.getElementById("categoria").value = livro.categoria;
    document.getElementById("isbn").value = livro.isbn || "";
    document.getElementById("quantidade").value =
        livro.quantidade;

    document.getElementById("botaoSalvar").textContent =
        "Salvar Alterações";

    document.getElementById("cancelar").hidden = false;

    document.getElementById("cadastro").scrollIntoView({
        behavior: "smooth"
    });
}

// Excluir livro
async function excluirLivro(id) {
    if (!confirm("Deseja realmente excluir este livro?")) return;

    try {
        const resposta = await fetch(`${API}/${id}`, {
            method: "DELETE"
        });

        if (!resposta.ok) throw new Error("Erro ao excluir");

        alert("Livro excluído com sucesso!");
        carregarLivros();

    } catch (erro) {
        alert("Não foi possível excluir o livro.");
    }
}

// Cancelar edição
document.getElementById("cancelar").addEventListener("click", () => {
    formulario.reset();
    document.getElementById("livroId").value = "";
    document.getElementById("botaoSalvar").textContent =
        "Cadastrar Livro";
    document.getElementById("cancelar").hidden = true;
});

// Pesquisa
pesquisa.addEventListener("input", atualizarTela);

// Inicializar sistema
carregarLivros();
