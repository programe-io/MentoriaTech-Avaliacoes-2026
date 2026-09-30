// ==========================================
// MENU MOBILE
// ==========================================

const menuBtn =
    document.getElementById("menuBtn");

const menu =
    document.getElementById("menu");


menuBtn.addEventListener("click", () => {

    menu.classList.toggle("ativo");

});


const linksMenu =
    document.querySelectorAll("#menu a");


linksMenu.forEach(link => {

    link.addEventListener("click", () => {

        menu.classList.remove("ativo");

    });

});


// ==========================================
// MODAL DAS ESPECIALIDADES
// ==========================================

const modal =
    document.getElementById("modal");

const modalTitulo =
    document.getElementById("modalTitulo");

const fecharModal =
    document.getElementById("fecharModal");

const botoesEspecialidade =
    document.querySelectorAll(".saiba-btn");


botoesEspecialidade.forEach(botao => {

    botao.addEventListener("click", () => {

        const titulo =
            botao.dataset.titulo;

        modalTitulo.textContent =
            titulo;

        modal.classList.add("ativo");

    });

});


fecharModal.addEventListener("click", () => {

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
// FORMULÁRIO
// ==========================================

const formulario =
    document.getElementById("contatoForm");


formulario.addEventListener("submit", evento => {

    evento.preventDefault();

    const nome =
        document.getElementById("nome").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const mensagem =
        document.getElementById("mensagem").value.trim();


    if (
        nome === "" ||
        email === "" ||
        mensagem === ""
    ) {

        alert(
            "Por favor, preencha todos os campos."
        );

        return;

    }


    alert(
        `Obrigada, ${nome}!\n\n` +
        "Sua mensagem foi registrada no formulário " +
        "de demonstração."
    );


    formulario.reset();

});


// ==========================================
// ANIMAÇÃO AO ROLAR
// ==========================================

const elementos =
    document.querySelectorAll(
        ".especialidade, .servico, " +
        ".sobre-grid, .contato-grid"
    );


const observador =
    new IntersectionObserver(

        entradas => {

            entradas.forEach(entrada => {

                if (entrada.isIntersecting) {

                    entrada.target.classList.add(
                        "aparecer"
                    );

                }

            });

        },

        {
            threshold: 0.15
        }

    );


elementos.forEach(elemento => {

    observador.observe(elemento);

});
