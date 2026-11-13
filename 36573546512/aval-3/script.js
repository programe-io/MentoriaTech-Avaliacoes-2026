
// ======================================
// BOOKVERSE - GERENCIADOR DE BIBLIOTECA
// ======================================


// CARREGAR LIVROS SALVOS

let livros = JSON.parse(
    localStorage.getItem("bookverse") || "[]"
);

let livroEditando = null;

let filtroAtual = "todos";


// ELEMENTOS DO HTML

const formulario = document.getElementById("formLivro");

const codigo = document.getElementById("codigo");

const titulo = document.getElementById("titulo");

const autor = document.getElementById("autor");

const genero = document.getElementById("genero");

const pesquisa = document.getElementById("pesquisa");

const listaLivros = document.getElementById("listaLivros");

const botaoSalvar = document.getElementById("botaoSalvar");

const botaoCancelar = document.getElementById("botaoCancelar");


// SALVAR DADOS

function salvarDados() {

    localStorage.setItem(
        "bookverse",
        JSON.stringify(livros)
    );

}


// LIMPAR FORMULÁRIO

function limparFormulario() {

    formulario.reset();

    livroEditando = null;

    document.getElementById("tituloFormulario").textContent =
        "＋ Cadastrar livro";

    botaoSalvar.textContent =
        "＋ Cadastrar livro";

    botaoCancelar.hidden = true;

}


// CANCELAR EDIÇÃO

botaoCancelar.addEventListener("click", function() {

    limparFormulario();

});


// CADASTRAR OU EDITAR LIVRO

formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    const novoLivro = {

        codigo: codigo.value.trim(),

        titulo: titulo.value.trim(),

        autor: autor.value.trim(),

        genero: genero.value

    };


    // VALIDAR TÍTULO

    if (novoLivro.titulo.length < 3) {

        alert("O título deve ter pelo menos 3 caracteres!");

        titulo.focus();

        return;

    }


    // VALIDAR AUTOR

    if (novoLivro.autor.length === 0) {

        alert("Informe o nome do autor!");

        autor.focus();

        return;

    }


    // VALIDAR CÓDIGO REPETIDO

    const codigoExiste = livros.some(livro => {

        return (
            livro.codigo.toLowerCase() ===
            novoLivro.codigo.toLowerCase() &&
            livro.id !== livroEditando
        );

    });

    if (codigoExiste) {

        alert("Este código já está cadastrado!");

        codigo.focus();

        return;

    }


    // EDITAR LIVRO

    if (livroEditando !== null) {

        const livro = livros.find(
            item => item.id === livroEditando
        );

        if (livro) {

            livro.codigo = novoLivro.codigo;

            livro.titulo = novoLivro.titulo;

            livro.autor = novoLivro.autor;

            livro.genero = novoLivro.genero;

        }

        alert("Livro atualizado com sucesso!");

    } else {

        // CADASTRAR NOVO LIVRO

        const livro = {

            id: Date.now().toString() +
                Math.random().toString(36).slice(2),

            ...novoLivro,

            disponibilidade: "disponivel",

            lido: false

        };

        livros.push(livro);

        alert("Livro cadastrado com sucesso!");

    }


    salvarDados();

    limparFormulario();

    atualizarLista();

});


// EDITAR LIVRO

function editarLivro(id) {

    const livro = livros.find(
        item => item.id === id
    );

    if (!livro) return;

    codigo.value = livro.codigo;

    titulo.value = livro.titulo;

    autor.value = livro.autor;

    genero.value = livro.genero;

    livroEditando = id;

    document.getElementById("tituloFormulario").textContent =
        "✎ Editar livro";

    botaoSalvar.textContent =
        "Salvar alterações";

    botaoCancelar.hidden = false;

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


// ALTERAR DISPONIBILIDADE

function alterarDisponibilidade(id) {

    const livro = livros.find(
        item => item.id === id
    );

    if (!livro) return;

    if (livro.disponibilidade === "disponivel") {

        livro.disponibilidade = "emprestado";

    } else {

        livro.disponibilidade = "disponivel";

    }

    salvarDados();

    atualizarLista();

}


// MARCAR COMO LIDO OU NÃO LIDO

function alterarLeitura(id) {

    const livro = livros.find(
        item => item.id === id
    );

    if (!livro) return;

    livro.lido = !livro.lido;

    salvarDados();

    atualizarLista();

}


// EXCLUIR LIVRO

function excluirLivro(id) {

    const confirmacao = confirm(
        "Deseja realmente excluir este livro?"
    );

    if (!confirmacao) return;

    livros = livros.filter(
        item => item.id !== id
    );

    if (livroEditando === id) {

        limparFormulario();

    }

    salvarDados();

    atualizarLista();

    alert("Livro excluído com sucesso!");

}


// ATUALIZAR PAINEL DE RESUMO

function atualizarResumo() {

    const total = livros.length;

    const disponiveis = livros.filter(
        livro => livro.disponibilidade === "disponivel"
    ).length;

    const emprestados = livros.filter(
        livro => livro.disponibilidade === "emprestado"
    ).length;

    const lidos = livros.filter(
        livro => livro.lido
    ).length;


    document.getElementById("totalLivros").textContent =
        total;

    document.getElementById("livrosDisponiveis").textContent =
        disponiveis;

    document.getElementById("livrosEmprestados").textContent =
        emprestados;

    document.getElementById("livrosLidos").textContent =
        lidos;

}


// CRIAR ETIQUETAS

function criarEtiqueta(texto, classe) {

    const etiqueta = document.createElement("span");

    etiqueta.className = "etiqueta " + classe;

    etiqueta.textContent = texto;

    return etiqueta;

}


// CRIAR BOTÕES

function criarBotao(texto, classe, acao) {

    const botao = document.createElement("button");

    botao.type = "button";

    botao.textContent = texto;

    botao.className = classe;

    botao.addEventListener("click", acao);

    return botao;

}


// LISTAR LIVROS

function atualizarLista() {

    listaLivros.innerHTML = "";

    const termo = pesquisa.value.toLowerCase().trim();


    // APLICAR PESQUISA E FILTROS

    const livrosFiltrados = livros.filter(livro => {

        const correspondePesquisa =
            livro.titulo.toLowerCase().includes(termo) ||
            livro.autor.toLowerCase().includes(termo) ||
            livro.codigo.toLowerCase().includes(termo);

        const correspondeFiltro =
            filtroAtual === "todos" ||
            (filtroAtual === "disponivel" &&
                livro.disponibilidade === "disponivel") ||
            (filtroAtual === "emprestado" &&
                livro.disponibilidade === "emprestado") ||
            (filtroAtual === "lido" && livro.lido);

        return correspondePesquisa && correspondeFiltro;

    });


    // EXIBIR MENSAGEM QUANDO NÃO HOUVER LIVROS

    document.getElementById("mensagemVazia").style.display =
        livrosFiltrados.length === 0 ? "block" : "none";


    // ORGANIZAR LIVROS PELO TÍTULO

    livrosFiltrados.sort((a, b) =>
        a.titulo.localeCompare(b.titulo, "pt-BR")
    );


    // PERCORRER LIVROS

    livrosFiltrados.forEach(livro => {

        const linha = document.createElement("tr");


        // CÓDIGO

        const celulaCodigo = document.createElement("td");

        celulaCodigo.textContent = livro.codigo;


        // TÍTULO E AUTOR

        const celulaLivro = document.createElement("td");

        const nome = document.createElement("div");

        nome.className = "nome-livro";

        nome.textContent = livro.titulo;

        const nomeAutor = document.createElement("div");

        nomeAutor.className = "nome-autor";

        nomeAutor.textContent = "Por: " + livro.autor;

        celulaLivro.appendChild(nome);

        celulaLivro.appendChild(nomeAutor);


        // GÊNERO

        const celulaGenero = document.createElement("td");

        celulaGenero.textContent = livro.genero;


        // DISPONIBILIDADE

        const celulaDisponibilidade = document.createElement("td");

        const etiquetaDisponibilidade =
            livro.disponibilidade === "disponivel"
                ? criarEtiqueta("Disponível", "disponivel")
                : criarEtiqueta("Emprestado", "emprestado");

        celulaDisponibilidade.appendChild(
            etiquetaDisponibilidade
        );


        // STATUS DE LEITURA

        const celulaLeitura = document.createElement("td");

        const etiquetaLeitura = livro.lido
            ? criarEtiqueta("Lido", "lido")
            : criarEtiqueta("Não lido", "nao-lido");

        celulaLeitura.appendChild(etiquetaLeitura);


        // AÇÕES

        const celulaAcoes = document.createElement("td");

        const acoes = document.createElement("div");

        acoes.className = "acoes";


        // BOTÃO EDITAR

        const botaoEditar = criarBotao(
            "Editar",
            "editar",
            () => editarLivro(livro.id)
        );


        // BOTÃO EMPRÉSTIMO

        const botaoStatus = criarBotao(
            livro.disponibilidade === "disponivel"
                ? "Emprestar"
                : "Devolver",
            "status-btn",
            () => alterarDisponibilidade(livro.id)
        );


        // BOTÃO EXCLUIR

        const botaoExcluir = criarBotao(
            "Excluir",
            "excluir",
            () => excluirLivro(livro.id)
        );


        // BOTÃO DE LEITURA

        const botaoLeitura = criarBotao(
            livro.lido ? "Desmarcar leitura" : "Marcar como lido",
            "editar",
            () => alterarLeitura(livro.id)
        );


        acoes.appendChild(botaoEditar);

        acoes.appendChild(botaoStatus);

        acoes.appendChild(botaoLeitura);

        acoes.appendChild(botaoExcluir);

        celulaAcoes.appendChild(acoes);


        // ADICIONAR À TABELA

        linha.appendChild(celulaCodigo);

        linha.appendChild(celulaLivro);

        linha.appendChild(celulaGenero);

        linha.appendChild(celulaDisponibilidade);

        linha.appendChild(celulaLeitura);

        linha.appendChild(celulaAcoes);

        listaLivros.appendChild(linha);

    });


    atualizarResumo();

}


// PESQUISAR LIVROS

pesquisa.addEventListener("input", function() {

    atualizarLista();

});


// FILTRAR LIVROS

document.querySelectorAll(".filtro").forEach(botao => {

    botao.addEventListener("click", function() {

        document.querySelectorAll(".filtro").forEach(item => {

            item.classList.remove("ativo");

        });

        this.classList.add("ativo");

        filtroAtual = this.dataset.filtro;

        atualizarLista();

    });

});


// INICIALIZAR SISTEMA

atualizarLista();
