
const botoesDetalhes = document.querySelectorAll(".detalhes");

const modal = document.getElementById("modal");
const modalTitulo = document.getElementById("modalTitulo");
const modalTexto = document.getElementById("modalTexto");

const fechar = document.getElementById("fechar");
const confirmar = document.getElementById("confirmar");

const transformacoes = {
    normal: {
        titulo: "Goku Normal",
        texto: "A forma original de Goku. Mesmo sem transformação, ele possui grande força, velocidade e habilidade de combate."
    },

    ssj: {
        titulo: "Super Saiyajin",
        texto: "Uma transformação lendária dos Saiyajins, marcada pelos cabelos dourados e pelo aumento expressivo do poder."
    },

    ssj3: {
        titulo: "Super Saiyajin 3",
        texto: "Uma transformação de grande poder que exige muita energia e apresenta cabelos longos e dourados."
    },

    blue: {
        titulo: "Super Saiyajin Blue",
        texto: "Também conhecido como Super Saiyajin Deus Super Saiyajin, combina a transformação Saiyajin com o poder divino."
    },

    ui: {
        titulo: "Instinto Superior",
        texto: "Uma técnica avançada que permite ao corpo reagir aos ataques de forma automática, sem depender do raciocínio consciente."
    }
};

botoesDetalhes.forEach((botao) => {
    botao.addEventListener("click", () => {
        const forma = botao.dataset.forma;
        const dados = transformacoes[forma];

        if (!dados) return;

        modalTitulo.textContent = dados.titulo;
        modalTexto.textContent = dados.texto;

        modal.hidden = false;
        fechar.focus();
    });
});

function fecharModal() {
    modal.hidden = true;
}

fechar.addEventListener("click", fecharModal);
confirmar.addEventListener("click", fecharModal);

modal.addEventListener("click", (evento) => {
    if (evento.target === modal) {
        fecharModal();
    }
});

document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape" && !modal.hidden) {
        fecharModal();
    }
});
