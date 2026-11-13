
/* =====================================
   GAME ZONE - JAVASCRIPT
===================================== */

// ELEMENTOS DO SITE

const pesquisa = document.getElementById("pesquisa");

const cards = document.querySelectorAll(".card");

const botoes = document.querySelectorAll(
    ".categorias button"
);

const resultado = document.getElementById("resultado");


// =====================================
// PESQUISA E FILTROS
// =====================================

let categoriaAtual = "Todos";

function filtrarJogos() {

    const termo = pesquisa.value.toLowerCase().trim();

    let encontrados = 0;

    cards.forEach(card => {

        const nome = card.querySelector("h3")
            .textContent.toLowerCase();

        const categoria = card.dataset.categoria;

        const correspondeNome = nome.includes(termo);

        const correspondeCategoria =
            categoriaAtual === "Todos" ||
            categoria === categoriaAtual;

        if (correspondeNome && correspondeCategoria) {

            card.style.display = "block";

            encontrados++;

        } else {

            card.style.display = "none";

        }

    });

    resultado.textContent =
        encontrados + " jogo(s) encontrado(s).";

}


// =====================================
// EVENTO DE PESQUISA
// =====================================

pesquisa.addEventListener("input", filtrarJogos);


// =====================================
// FILTRO DE CATEGORIAS
// =====================================

botoes.forEach(botao => {

    botao.addEventListener("click", () => {

        botoes.forEach(b => {
            b.classList.remove("active");
        });

        botao.classList.add("active");

        categoriaAtual = botao.dataset.categoria;

        filtrarJogos();

    });

});


// =====================================
// ABRIR JOGOS
// =====================================

function abrirJogo(nome) {

    alert(
        "🎮 GAME ZONE\n\n" +
        "Você selecionou: " + nome +
        "\n\nEm breve este jogo estará disponível!"
    );

}


// =====================================
// SISTEMA DE FAVORITOS
// =====================================

let favoritos = JSON.parse(
    localStorage.getItem("gamezone_favoritos") || "[]"
);

function salvarFavoritos() {

    localStorage.setItem(
        "gamezone_favoritos",
        JSON.stringify(favoritos)
    );

}

function alternarFavorito(nome, botao) {

    if (favoritos.includes(nome)) {

        favoritos = favoritos.filter(
            jogo => jogo !== nome
        );

        botao.textContent = "♡ Favoritar";

    } else {

        favoritos.push(nome);

        botao.textContent = "❤️ Favoritado";

    }

    salvarFavoritos();

}


// =====================================
// ADICIONAR BOTÕES DE FAVORITOS
// =====================================

cards.forEach(card => {

    const nome = card.querySelector("h3").textContent;

    const botao = document.createElement("button");

    botao.textContent = favoritos.includes(nome)
        ? "❤️ Favoritado"
        : "♡ Favoritar";

    botao.style.width = "100%";
    botao.style.marginTop = "10px";
    botao.style.padding = "10px";
    botao.style.borderRadius = "8px";
    botao.style.border = "1px solid #00e5ff";
    botao.style.background = "#19243c";
    botao.style.color = "white";
    botao.style.cursor = "pointer";

    botao.addEventListener("click", () => {

        alternarFavorito(nome, botao);

    });

    card.querySelector(".card-info").appendChild(botao);

});


// =====================================
// INICIALIZAÇÃO
// =====================================

filtrarJogos();

console.log("🎮 GAME ZONE iniciado com sucesso!");
