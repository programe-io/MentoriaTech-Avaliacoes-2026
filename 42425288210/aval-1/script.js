
const projetos = {
    moderna: {
        titulo: "Piscina Moderna",
        html: `<section class="piscina-moderna">
    <h1>Minha Piscina</h1>
    <p>Um espaço para relaxar.</p>
</section>`,
        css: `.piscina-moderna {
    background: linear-gradient(135deg, #00bcd4, #006994);
    padding: 60px 20px;
    text-align: center;
    color: white;
    border-radius: 15px;
}`,
        js: `console.log("Projeto Piscina Moderna carregado!");`
    },

    infinita: {
        titulo: "Piscina Infinita",
        html: `<section class="piscina-infinita">
    <h1>Piscina Infinita</h1>
    <p>Uma vista incrível!</p>
</section>`,
        css: `.piscina-infinita {
    background: linear-gradient(to bottom, #4dd0e1, #006064);
    padding: 70px 20px;
    text-align: center;
    color: white;
    border-radius: 15px;
}`,
        js: `console.log("Projeto Piscina Infinita carregado!");`
    },

    tropical: {
        titulo: "Piscina Tropical",
        html: `<section class="piscina-tropical">
    <h1>Paraíso Tropical</h1>
    <p>Natureza e lazer.</p>
</section>`,
        css: `.piscina-tropical {
    background: linear-gradient(135deg, #26a69a, #00695c);
    padding: 70px 20px;
    text-align: center;
    color: white;
    border-radius: 15px;
}`,
        js: `console.log("Projeto Piscina Tropical carregado!");`
    }
};

function mostrarCodigo(tipo) {
    const projeto = projetos[tipo];

    if (!projeto) return;

    document.getElementById("tituloCodigo").textContent =
        projeto.titulo;

    document.getElementById("codigoHTML").textContent =
        projeto.html;

    document.getElementById("codigoCSS").textContent =
        projeto.css;

    document.getElementById("codigoJS").textContent =
        projeto.js;

    const area = document.getElementById("areaCodigo");

    area.hidden = false;
    area.scrollIntoView({ behavior: "smooth" });
}

async function copiarCodigo(id) {
    const codigo = document.getElementById(id).textContent;

    try {
        await navigator.clipboard.writeText(codigo);
        alert("Código copiado com sucesso!");
    } catch (erro) {
        alert("Não foi possível copiar. Selecione o código manualmente.");
    }
}

// Pesquisa de projetos
document.getElementById("pesquisa").addEventListener("input", function() {
    const termo = this.value.toLowerCase();

    document.querySelectorAll(".card").forEach(card => {
        const nome = card.dataset.nome;

        card.style.display = nome.includes(termo) ? "block" : "none";
    });
});
