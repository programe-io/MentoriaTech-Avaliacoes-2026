// ==========================================
// MODO ESCURO
// ==========================================

const temaBtn = document.getElementById("temaBtn");

temaBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {

        temaBtn.textContent = "☀️";

    } else {

        temaBtn.textContent = "🌙";

    }

});


// ==========================================
// DADOS DOS PERSONAGENS
// ==========================================

const personagens = {

    kally: {
        titulo: "Kally",
        categoria: "PIANISTA",
        imagem: "img/kally.jpg",
        descricao:
            "Kally é uma jovem apaixonada por música. " +
            "Ela busca equilibrar sua vida pessoal, " +
            "amizades e sua trajetória musical."
    },

    dante: {
        titulo: "Dante",
        categoria: "MÚSICO",
        imagem: "img/dante.jpg",
        descricao:
            "Dante é um dos personagens ligados ao universo " +
            "musical da série e compartilha momentos importantes " +
            "com seus amigos."
    },

    tina: {
        titulo: "Tina",
        categoria: "AMIGA",
        imagem: "img/tina.jpg",
        descricao:
            "Tina é uma amiga importante na história e participa " +
            "de diversos momentos da jornada de Kally."
    },

    lucas: {
        titulo: "Lucas",
        categoria: "MÚSICA",
        imagem: "img/lucas.jpg",
        descricao:
            "Lucas faz parte do ambiente musical da série e " +
            "participa das experiências vividas pelos personagens."
    },

    gloria: {
        titulo: "Gloria",
        categoria: "MÚSICA",
        imagem: "img/gloria.jpg",
        descricao:
            "Gloria é uma das personagens que fazem parte " +
            "do universo escolar e musical da série."
    }

};


// ==========================================
// MODAL DOS PERSONAGENS
// ==========================================

const modal = document.getElementById("modal");

const modalImagem =
    document.getElementById("modalImagem");

const modalTitulo =
    document.getElementById("modalTitulo");

const modalCategoria =
    document.getElementById("modalCategoria");

const modalDescricao =
    document.getElementById("modalDescricao");

const fechar =
    document.getElementById("fechar");


const botoes =
    document.querySelectorAll(".infoBtn");


botoes.forEach(botao => {

    botao.addEventListener("click", () => {

        const nome =
            botao.dataset.personagem;

        const personagem =
            personagens[nome];


        modalImagem.src =
            personagem.imagem;

        modalImagem.alt =
            personagem.titulo;

        modalTitulo.textContent =
            personagem.titulo;

        modalCategoria.textContent =
            personagem.categoria;

        modalDescricao.textContent =
            personagem.descricao;


        modal.classList.add("ativo");

    });

});


// ==========================================
// FECHAR MODAL
// ==========================================

fechar.addEventListener("click", () => {

    modal.classList.remove("ativo");

});


modal.addEventListener("click", evento => {

    if (evento.target === modal) {

        modal.classList.remove("ativo");

    }

});


document.addEventListener("keydown", evento => {

    if (evento.key === "Escape") {

        modal.classList.remove("ativo");

    }

});


// ==========================================
// BOTÃO DE MÚSICA
// ==========================================

const musicaBtn =
    document.getElementById("musicaBtn");

musicaBtn.addEventListener("click", () => {

    alert(
        "🎵 Área musical ativada!\n\n" +
        "Você pode adicionar aqui um player " +
        "de áudio com músicas licenciadas."
    );

});


// ==========================================
// BOTÕES DOS EPISÓDIOS
// ==========================================

const episodios =
    document.querySelectorAll(".episodioBtn");


episodios.forEach((botao, index) => {

    botao.addEventListener("click", () => {

        alert(
            "Episódio " +
            String(index + 1).padStart(2, "0") +
            "\n\n" +
            "Nesta área você pode colocar o " +
            "link ou player do episódio."
        );

    });

});


// ==========================================
// GALERIA - VISUALIZAÇÃO
// ==========================================

const imagens =
    document.querySelectorAll(".galeria-grid img");


imagens.forEach(imagem => {

    imagem.addEventListener("click", () => {

        modalImagem.src =
            imagem.src;

        modalImagem.alt =
            imagem.alt;

        modalTitulo.textContent =
            imagem.alt;

        modalCategoria.textContent =
            "GALERIA";

        modalDescricao.textContent =
            "Imagem da galeria do projeto " +
            "Kally's Mashup.";

        modal.classList.add("ativo");

    });

});