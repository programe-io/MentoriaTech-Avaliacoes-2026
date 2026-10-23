const artigos = [
    {
        titulo: "Bem-vindo ao Meu Blog!",
        conteudo: "Este é o nosso primeiro artigo. Aqui compartilhamos ideias e conhecimentos."
    },
    {
        titulo: "Aprendendo JavaScript",
        conteudo: "JavaScript permite adicionar interatividade e funcionalidades às páginas web."
    },
    {
        titulo: "A importância da tecnologia",
        conteudo: "A tecnologia ajuda a conectar pessoas e facilita o acesso à informação."
    }
];

const lista = document.getElementById("lista-artigos");
const pesquisa = document.getElementById("pesquisa");
const formulario = document.getElementById("form-artigo");
const campoTitulo = document.getElementById("titulo");
const campoConteudo = document.getElementById("conteudo");
const mensagem = document.getElementById("mensagem");

function mostrarArtigos(filtro = "") {
    lista.replaceChildren();

    const resultado = artigos.filter(artigo =>
        artigo.titulo.toLowerCase().includes(filtro.toLowerCase()) ||
        artigo.conteudo.toLowerCase().includes(filtro.toLowerCase())
    );

    resultado.forEach(artigo => {
        const card = document.createElement("article");
        card.className = "post";

        const titulo = document.createElement("h3");
        titulo.textContent = artigo.titulo;

        const data = document.createElement("p");
        data.className = "data";
        data.textContent = "Publicado em " + artigo.data;

        const conteudo = document.createElement("p");
        conteudo.textContent = artigo.conteudo;

        card.append(titulo, data, conteudo);
        lista.appendChild(card);
    });

    mensagem.textContent = resultado.length === 0
        ? "Nenhum artigo encontrado."
        : `${resultado.length} artigo(s) encontrado(s).`;
}

// Adiciona a data aos artigos iniciais.
artigos.forEach(artigo => {
    artigo.data = new Date().toLocaleDateString("pt-BR");
});

// Pesquisa artigos.
pesquisa.addEventListener("input", () => {
    mostrarArtigos(pesquisa.value);
});

// Publica um novo artigo.
formulario.addEventListener("submit", evento => {
    evento.preventDefault();

    const titulo = campoTitulo.value.trim();
    const conteudo = campoConteudo.value.trim();

    if (!titulo || !conteudo) {
        mensagem.textContent = "Preencha o título e o conteúdo.";
        return;
    }

    artigos.unshift({
        titulo: titulo,
        conteudo: conteudo,
        data: new Date().toLocaleDateString("pt-BR")
    });

    formulario.reset();
    mostrarArtigos(pesquisa.value);

    mensagem.textContent = "Artigo publicado com sucesso!";
});

mostrarArtigos();