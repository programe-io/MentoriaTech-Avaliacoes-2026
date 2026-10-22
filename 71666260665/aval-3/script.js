const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

// Menu para celular
menuToggle.addEventListener("click", () => {
    const aberto = nav.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(aberto));
    menuToggle.setAttribute(
        "aria-label",
        aberto ? "Fechar menu" : "Abrir menu"
    );
    menuToggle.textContent = aberto ? "✕" : "☰";
});

// Fechar menu ao selecionar uma seção
nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
        nav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Abrir menu");
        menuToggle.textContent = "☰";
    });
});

// Filtros das motocicletas
const filtros = document.querySelectorAll(".filter");
const motos = document.querySelectorAll(".bike-card");

filtros.forEach((filtro) => {
    filtro.addEventListener("click", () => {
        filtros.forEach((botao) => {
            botao.classList.remove("active");
        });

        filtro.classList.add("active");

        const categoria = filtro.dataset.filter;

        motos.forEach((moto) => {
            const corresponde =
                categoria === "todas" ||
                moto.dataset.category === categoria;

            moto.hidden = !corresponde;
        });
    });
});

// Modal com informações das categorias
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalClose = document.getElementById("modalClose");
const modalOk = document.getElementById("modalOk");

let ultimoBotao = null;

function abrirModal(titulo, descricao, botao) {
    ultimoBotao = botao;

    modalTitle.textContent = titulo;
    modalDescription.textContent = descricao;

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    modalClose.focus();
}

function fecharModal() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");

    if (ultimoBotao) {
        ultimoBotao.focus();
    }
}

document.querySelectorAll(".details-btn").forEach((botao) => {
    botao.addEventListener("click", () => {
        abrirModal(
            botao.dataset.title,
            botao.dataset.description,
            botao
        );
    });
});

modalClose.addEventListener("click", fecharModal);
modalOk.addEventListener("click", fecharModal);

// Fechar ao clicar fora da janela
modal.addEventListener("click", (evento) => {
    if (evento.target === modal) {
        fecharModal();
    }
});

// Fechar com a tecla Escape
document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape" && modal.classList.contains("open")) {
        fecharModal();
    }
});

// Dicas aleatórias de segurança
const dicas = [
    "Verifique os pneus, freios, luzes e nível de óleo regularmente.",
    "Mantenha distância segura dos outros veículos.",
    "Use roupas resistentes, luvas, botas e capacete adequado.",
    "Reduza a velocidade em pistas molhadas ou com pouca visibilidade.",
    "Sinalize suas manobras com antecedência.",
    "Faça revisões preventivas conforme o manual da motocicleta.",
    "Mantenha os olhos atentos ao trânsito e evite distrações.",
    "Respeite a sinalização e os limites de velocidade."
];

const tipButton = document.getElementById("tipButton");
const tipResult = document.getElementById("tipResult");

let ultimaDica = -1;

tipButton.addEventListener("click", () => {
    let indice;

    do {
        indice = Math.floor(Math.random() * dicas.length);
    } while (dicas.length > 1 && indice === ultimaDica);

    ultimaDica = indice;
    tipResult.textContent = "🏍️ " + dicas[indice];
});

// Atualizar o ano do rodapé
document.getElementById("year").textContent =
    new Date().getFullYear();