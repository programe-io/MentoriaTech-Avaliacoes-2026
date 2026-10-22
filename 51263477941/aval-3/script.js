
const pesquisa = document.getElementById("pesquisa");
const filtros = document.querySelectorAll(".filtro");
const carros = document.querySelectorAll(".card-carro");
const mensagemVazia = document.getElementById("mensagemVazia");

const modal = document.getElementById("modal");
const modalTitulo = document.getElementById("modalTitulo");
const modalTexto = document.getElementById("modalTexto");
const fecharModal = document.getElementById("fecharModal");
const confirmarModal = document.getElementById("confirmarModal");

let tipoSelecionado = "todos";

function filtrarCarros() {
    const termo = pesquisa.value.toLowerCase().trim();
    let encontrados = 0;

    carros.forEach((carro) => {
        const nome = carro.dataset.nome.toLowerCase();
        const tipo = carro.dataset.tipo;

        const combinaNome = nome.includes(termo);
        const combinaTipo =
            tipoSelecionado === "todos" ||
            tipo === tipoSelecionado;

        const mostrar = combinaNome && combinaTipo;

        carro.hidden = !mostrar;

        if (mostrar) {
            encontrados++;
        }
    });

    mensagemVazia.hidden = encontrados !== 0;
}

pesquisa.addEventListener("input", filtrarCarros);

filtros.forEach((botao) => {
    botao.addEventListener("click", () => {
        filtros.forEach((filtro) => {
            filtro.classList.remove("ativo");
        });

        botao.classList.add("ativo");
        tipoSelecionado = botao.dataset.tipo;

        filtrarCarros();
    });
});

const informacoes = {
    "Porsche 911":
        "Um esportivo conhecido pelo design icônico, pela engenharia alemã e pela experiência de condução.",

    "Ferrari":
        "Uma marca italiana famosa por seus carros esportivos, pelo design marcante e pela tradição nas pistas.",

    "Mercedes-Benz":
        "Uma fabricante reconhecida pelo luxo, conforto, tecnologia e modelos de alto desempenho.",

    "Lamborghini":
        "Uma marca italiana conhecida por seus supercarros de aparência ousada e desempenho impressionante."
};

document.querySelectorAll(".botao-detalhes").forEach((botao) => {
    botao.addEventListener("click", () => {
        const nome = botao.dataset.carro;

        modalTitulo.textContent = nome;
        modalTexto.textContent = informacoes[nome] ||
            "Conheça mais sobre este automóvel.";

        modal.hidden = false;
        fecharModal.focus();
    });
});

function fecharJanela() {
    modal.hidden = true;
}

fecharModal.addEventListener("click", fecharJanela);
confirmarModal.addEventListener("click", fecharJanela);

modal.addEventListener("click", (evento) => {
    if (evento.target === modal) {
        fecharJanela();
    }
});

document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape") {
        fecharJanela();
    }
});
