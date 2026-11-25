
const CHAVE = "biblioteca";

let livros = carregarLivros();
let filtroAtual = "Todos";
let textoBusca = "";

// Elementos do HTML
const formulario = document.getElementById("formulario");
const titulo = document.getElementById("titulo");
const autor = document.getElementById("autor");
const status = document.getElementById("status");
const erro = document.getElementById("erro");
const busca = document.getElementById("busca");
const listaLivros = document.getElementById("listaLivros");

// Carregar dados salvos
function carregarLivros() {
    const dados = localStorage.getItem(CHAVE);

    if (!dados) {
        return [];
    }

    try {
        const resultado = JSON.parse(dados);
        return Array.isArray(resultado) ? resultado : [];
    } catch {
        return [];
    }
}

// Salvar dados
function salvarLivros() {
    localStorage.setItem(CHAVE, JSON.stringify(livros));
}

// Cadastrar livro
function cadastrarLivro(dados) {
    const livro = {
        id: Date.now(),
        titulo: dados.titulo,
        autor: dados.autor,
        status: dados.status
    };

    livros.push(livro);
    salvarLivros();
}

// Validar formulário
function validarDados(dados) {
    if (dados.titulo.length < 2) {
        return "O título precisa ter pelo menos 2 caracteres.";
    }

    if (dados.autor.length < 2) {
        return "Informe um autor válido.";
    }

    return "";
}

// Criar cartão de livro
function criarLivro(livro) {
    const card = document.createElement("div");
    card.classList.add("livro");

    const nome = document.createElement("h3");
    nome.textContent = livro.titulo;

    const autor = document.createElement("p");
    autor.textContent = "Autor: " + livro.autor;

    const situacao = document.createElement("p");
    situacao.classList.add("status");
    situacao.textContent = "Situação: " + livro.status;

    const seletor = document.createElement("select");
    seletor.dataset.id = livro.id;
    seletor.classList.add("alterar-status");

    ["Quero ler", "Lendo", "Concluído"].forEach(opcao => {
        const option = document.createElement("option");
        option.value = opcao;
        option.textContent = opcao;

        if (opcao === livro.status) {
            option.selected = true;
        }

        seletor.appendChild(option);
    });

    const excluir = document.createElement("button");
    excluir.textContent = "Excluir";
    excluir.classList.add("excluir");
    excluir.dataset.id = livro.id;

    card.append(nome, autor, situacao, seletor, excluir);

    return card;
}

// Filtrar por situação
function filtrarPorStatus(lista) {
    if (filtroAtual === "Todos") {
        return lista;
    }

    return lista.filter(livro => livro.status === filtroAtual);
}

// Filtrar por texto
function filtrarPorBusca(lista) {
    const termo = textoBusca.toLowerCase();

    return lista.filter(livro =>
        livro.titulo.toLowerCase().includes(termo) ||
        livro.autor.toLowerCase().includes(termo)
    );
}

// Atualizar contadores
function atualizarResumo() {
    const total = livros.length;

    const lendo = livros.filter(
        livro => livro.status === "Lendo"
    ).length;

    const lidos = livros.filter(
        livro => livro.status === "Concluído"
    ).length;

    document.getElementById("total").textContent = total;
    document.getElementById("lendo").textContent = lendo;
    document.getElementById("lidos").textContent = lidos;

    const percentual = total > 0
        ? Math.round((lidos / total) * 100)
        : 0;

    document.getElementById("progresso").textContent =
        percentual + "% concluído";

    document.getElementById("barraPreenchida")
        .style.width = percentual + "%";
}

// Mostrar livros na tela
function render() {
    listaLivros.innerHTML = "";

    let lista = filtrarPorStatus(livros);
    lista = filtrarPorBusca(lista);

    if (lista.length === 0) {
        listaLivros.textContent = "Nenhum livro encontrado.";
    }

    lista.forEach(livro => {
        listaLivros.appendChild(criarLivro(livro));
    });

    atualizarResumo();
}

// Cadastrar pelo formulário
formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    const dados = {
        titulo: titulo.value.trim(),
        autor: autor.value.trim(),
        status: status.value
    };

    const mensagem = validarDados(dados);

    if (mensagem !== "") {
        erro.textContent = mensagem;
        erro.hidden = false;
        return;
    }

    erro.hidden = true;

    cadastrarLivro(dados);

    formulario.reset();
    titulo.focus();

    render();
});

// Buscar enquanto digita
busca.addEventListener("input", () => {
    textoBusca = busca.value.trim();
    render();
});

// Delegação de eventos para excluir livros
listaLivros.addEventListener("click", (e) => {
    if (e.target.classList.contains("excluir")) {
        const id = Number(e.target.dataset.id);

        livros = livros.filter(livro => livro.id !== id);

        salvarLivros();
        render();
    }
});

// Delegação de eventos para alterar situação
listaLivros.addEventListener("change", (e) => {
    if (e.target.classList.contains("alterar-status")) {
        const id = Number(e.target.dataset.id);

        const livro = livros.find(item => item.id === id);

        if (livro) {
            livro.status = e.target.value;
            salvarLivros();
            render();
        }
    }
});

// Filtros
document.querySelector(".filtros").addEventListener("click", (e) => {
    if (e.target.dataset.filtro) {
        filtroAtual = e.target.dataset.filtro;
        render();
    }
});

// Exibir os livros ao abrir a página
render();
