// ========================================
// MODO ESCURO
// ========================================

const modoBtn = document.getElementById("modoBtn");

modoBtn.addEventListener("click", function () {

    document.body.classList.toggle("escuro");

    if (document.body.classList.contains("escuro")) {
        modoBtn.textContent = "☀️";
    } else {
        modoBtn.textContent = "🌙";
    }

});


// ========================================
// MODAL DOS PERSONAGENS
// ========================================

const botoesPersonagem =
    document.querySelectorAll(".saibaMais");

const modal =
    document.getElementById("modal");

const fecharModal =
    document.getElementById("fecharModal");

const modalTitulo =
    document.getElementById("modalTitulo");

const modalTexto =
    document.getElementById("modalTexto");


const personagens = {

    kat: {
        titulo: "Kat Stratford",
        texto:
            "Kat é uma personagem inteligente, independente e " +
            "determinada. Sua personalidade forte faz com que " +
            "ela se destaque entre os estudantes."
    },

    patrick: {
        titulo: "Patrick Verona",
        texto:
            "Patrick é conhecido por sua personalidade misteriosa " +
            "e rebelde. Ao longo da história, ele desenvolve uma " +
            "relação importante com Kat."
    },

    bianca: {
        titulo: "Bianca Stratford",
        texto:
            "Bianca é a irmã mais nova de Kat. Ela deseja viver " +
            "sua experiência escolar e conhecer melhor o mundo " +
            "dos relacionamentos."
    },

    cameron: {
        titulo: "Cameron James",
        texto:
            "Cameron é um novo estudante que se interessa por " +
            "Bianca e acaba envolvido nos acontecimentos que " +
            "movimentam a história."
    }

};


botoesPersonagem.forEach(function (botao) {

    botao.addEventListener("click", function () {

        const personagem =
            botao.getAttribute("data-personagem");

        modalTitulo.textContent =
            personagens[personagem].titulo;

        modalTexto.textContent =
            personagens[personagem].texto;

        modal.classList.add("ativo");

    });

});


// FECHAR MODAL

fecharModal.addEventListener("click", function () {

    modal.classList.remove("ativo");

});


modal.addEventListener("click", function (evento) {

    if (evento.target === modal) {

        modal.classList.remove("ativo");

    }

});


// ========================================
// BOTÃO TRAILER
// ========================================

const trailerBtn =
    document.getElementById("trailerBtn");

trailerBtn.addEventListener("click", function () {

    alert(
        "Área de trailer: você pode adicionar aqui " +
        "um vídeo incorporado do trailer oficial."
    );

});


// ========================================
// FORMULÁRIO DE COMENTÁRIOS
// ========================================

const formulario =
    document.getElementById("formulario");

const comentarios =
    document.getElementById("comentarios");


formulario.addEventListener("submit", function (evento) {

    evento.preventDefault();

    const nome =
        document.getElementById("nome").value.trim();

    const comentario =
        document.getElementById("comentario").value.trim();


    if (nome === "" || comentario === "") {

        alert("Preencha todos os campos.");

        return;

    }


    const novoComentario =
        document.createElement("div");

    novoComentario.classList.add("comentario");


    novoComentario.innerHTML = `
        <strong>${nome}</strong>
        <p>${comentario}</p>
    `;


    comentarios.prepend(novoComentario);


    formulario.reset();


    alert("Comentário enviado com sucesso!");

});


// ========================================
// ANIMAÇÃO AO ROLAR A PÁGINA
// ========================================

const elementos =
    document.querySelectorAll(
        ".card, .curiosidade, .sobre"
    );


const observador =
    new IntersectionObserver(

        function (entradas) {

            entradas.forEach(function (entrada) {

                if (entrada.isIntersecting) {

                    entrada.target.style.opacity = "1";

                    entrada.target.style.transform =
                        "translateY(0)";

                }

            });

        },

        {
            threshold: 0.15
        }

    );


elementos.forEach(function (elemento) {

    elemento.style.opacity = "0";

    elemento.style.transform =
        "translateY(30px)";

    elemento.style.transition =
        "opacity 0.7s ease, transform 0.7s ease";

    observador.observe(elemento);

});