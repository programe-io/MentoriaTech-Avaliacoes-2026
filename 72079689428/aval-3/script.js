
let livros = [];

let indiceEdicao = null;

const form = document.getElementById("formLivro");
const lista = document.getElementById("listaLivros");

const codigo = document.getElementById("codigo");
const titulo = document.getElementById("titulo");
const autor = document.getElementById("autor");
const categoria = document.getElementById("categoria");
const quantidade = document.getElementById("quantidade");
const ano = document.getElementById("ano");

const pesquisa = document.getElementById("pesquisa");

const btnSalvar = document.getElementById("btnSalvar");
const btnCancelar = document.getElementById("btnCancelar");

// Recuperar dados salvos
try {
    livros = JSON.parse(localStorage.getItem("biblioteca")) || [];
    if (!Array.isArray(livros)) livros = [];
} catch (erro) {
    livros = [];
}

// Salvar dados
function salvarDados() {
    localStorage.setItem("biblioteca", JSON.stringify(livros));
    mostrarLivros();
}

// Cadastrar livro
form.addEventListener("submit", function(event) {
    event.preventDefault();

    const novoLivro = {
        codigo: codigo.value.trim(),
        titulo: titulo.value.trim(),
        autor: autor.value.trim(),
        categoria: categoria.value,
        quantidade: Number(quantidade.value),
        emprestados: 0,
        ano: Number(ano.value)
    };

    if (
        !novoLivro.codigo ||
        !novoLivro.titulo ||
        !novoLivro.autor ||
        !novoLivro.categoria ||
        quantidade.value === "" ||
        ano.value === "" ||
        !Number.isInteger(novoLivro.quantidade) ||
        novoLivro.quantidade < 0 ||
        !Number.isInteger(novoLivro.ano) ||
        novoLivro.ano < 1
    ) {
        alert("Preencha todos os campos corretamente!");
        return;
    }

    // Verificar código repetido
    const repetido = livros.some((livro, index) =>
        livro.codigo.toLowerCase() === novoLivro.codigo.toLowerCase()
        && index !== indiceEdicao
    );

    if (repetido) {
        alert("Este código já está cadastrado!");
        return;
    }

    if (indiceEdicao === null) {
        novoLivro.emprestados = 0;
        livros.push(novoLivro);

        alert("Livro cadastrado com sucesso!");
    } else {
        novoLivro.emprestados = livros[indiceEdicao].emprestados;

        if (novoLivro.quantidade < novoLivro.emprestados) {
            alert("A quantidade não pode ser menor que os livros emprestados!");
            return;
        }

        livros[indiceEdicao] = novoLivro;

        alert("Livro atualizado com sucesso!");
    }

    limparFormulario();
    salvarDados();
});

// Listar livros
function mostrarLivros() {
    lista.innerHTML = "";

    let disponiveis = 0;
    let emprestados = 0;

    const termo = pesquisa.value.toLowerCase();

    livros.forEach((livro, index) => {

        const quantidadeEmprestada = Number(livro.emprestados) || 0;
        const quantidadeTotal = Number(livro.quantidade) || 0;

        const quantidadeDisponivel = quantidadeTotal - quantidadeEmprestada;

        disponiveis += quantidadeDisponivel;
        emprestados += quantidadeEmprestada;

        if (
            !livro.titulo.toLowerCase().includes(termo) &&
            !livro.autor.toLowerCase().includes(termo) &&
            !livro.codigo.toLowerCase().includes(termo)
        ) {
            return;
        }

        const linha = document.createElement("tr");

        const celulas = [
            livro.codigo,
            livro.titulo,
            livro.autor,
            livro.categoria,
            `${quantidadeDisponivel} disponível(is)`
        ];

        celulas.forEach(texto => {
            const td = document.createElement("td");
            td.textContent = texto;
            linha.appendChild(td);
        });

        const acoes = document.createElement("td");
        const grupo = document.createElement("div");
        grupo.className = "acoes";

        const criarBotao = (texto, classe, funcao, desabilitado = false) => {
            const botao = document.createElement("button");
            botao.textContent = texto;
            botao.className = classe;
            botao.disabled = desabilitado;
            botao.addEventListener("click", funcao);
            grupo.appendChild(botao);
        };

        criarBotao("Editar", "btn-editar",
            () => editarLivro(index));

        criarBotao("Emprestar", "btn-emprestar",
            () => emprestarLivro(index), quantidadeDisponivel <= 0);

        criarBotao("Devolver", "btn-devolver",
            () => devolverLivro(index), quantidadeEmprestada <= 0);

        criarBotao("Excluir", "btn-excluir",
            () => excluirLivro(index));

        acoes.appendChild(grupo);
        linha.appendChild(acoes);
        lista.appendChild(linha);
    });

    document.getElementById("totalLivros").textContent = livros.length;
    document.getElementById("disponiveis").textContent = disponiveis;
    document.getElementById("emprestados").textContent = emprestados;

    document.getElementById("mensagemVazia").style.display =
        lista.children.length === 0 ? "block" : "none";

    document.getElementById("mensagemVazia").textContent =
        termo ? "Nenhum livro encontrado." : "Nenhum livro cadastrado.";
}

// Editar livro
function editarLivro(index) {
    const livro = livros[index];

    codigo.value = livro.codigo;
    titulo.value = livro.titulo;
    autor.value = livro.autor;
    categoria.value = livro.categoria;
    quantidade.value = livro.quantidade;
    ano.value = livro.ano;

    indiceEdicao = index;

    document.getElementById("tituloFormulario").textContent = "Editar Livro";
    btnSalvar.textContent = "Salvar Alterações";
    btnCancelar.hidden = false;

    window.scrollTo({ top: 0, behavior: "smooth" });
}

// Limpar formulário
function limparFormulario() {
    form.reset();
    indiceEdicao = null;

    document.getElementById("tituloFormulario").textContent =
        "Cadastrar Livro";

    btnSalvar.textContent = "Cadastrar Livro";
    btnCancelar.hidden = true;
}

btnCancelar.addEventListener("click", limparFormulario);

// Emprestar
function emprestarLivro(index) {
    if (livros[index].quantidade - livros[index].emprestados <= 0) {
        alert("Não há exemplares disponíveis!");
        return;
    }

    livros[index].emprestados++;
    salvarDados();

    alert("Empréstimo registrado!");
}

// Devolver
function devolverLivro(index) {
    if (livros[index].emprestados <= 0) {
        alert("Não existem exemplares emprestados!");
        return;
    }

    livros[index].emprestados--;
    salvarDados();

    alert("Devolução registrada!");
}

// Excluir
function excluirLivro(index) {
    if (livros[index].emprestados > 0) {
        alert("Não é possível excluir um livro com empréstimos pendentes!");
        return;
    }

    if (confirm("Deseja excluir este livro?")) {
        livros.splice(index, 1);

        if (indiceEdicao === index) {
            limparFormulario();
        }

        salvarDados();
        alert("Livro excluído!");
    }
}

// Pesquisar
pesquisa.addEventListener("input", mostrarLivros);

// Iniciar sistema
mostrarLivros();

