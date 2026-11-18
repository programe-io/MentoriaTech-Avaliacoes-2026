
const pesquisa = document.getElementById("pesquisa");

const noticias = document.querySelectorAll(".noticia");

const semResultados = document.getElementById("sem-resultados");

// SISTEMA DE PESQUISA

pesquisa.addEventListener("input", function() {

    const texto = pesquisa.value.toLowerCase();

    noticias.forEach(function(noticia) {

        const conteudo = noticia.innerText.toLowerCase();

        noticia.style.display =
            conteudo.includes(texto) ? "block" : "none";

    });

    verificarResultados();

});

// SISTEMA DE FILTRO

function filtrar(categoria) {

    pesquisa.value = "";

    noticias.forEach(function(noticia) {

        const tipo = noticia.dataset.categoria;

        if (categoria === "Todas" || tipo === categoria) {
            noticia.style.display = "block";
        } else {
            noticia.style.display = "none";
        }

    });

    verificarResultados();

}

// SISTEMA DE CURTIDAS

document.querySelectorAll(".curtir").forEach(function(botao) {

    botao.addEventListener("click", function() {

        const contador = botao.querySelector("span");

        let curtidas = Number(contador.textContent);

        curtidas++;

        contador.textContent = curtidas;

    });

});

// VERIFICAR RESULTADOS

function verificarResultados() {

    let visiveis = 0;

    noticias.forEach(function(noticia) {

        if (noticia.style.display !== "none") {
            visiveis++;
        }

    });

    semResultados.hidden = visiveis !== 0;

}

console.log("Roblox News iniciado com sucesso!");
