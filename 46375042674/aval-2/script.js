
/* =========================
   MUSIC HUB - JAVASCRIPT
========================= */

// Inicializar os ícones
document.addEventListener("DOMContentLoaded", function () {

    if (window.lucide) {
        lucide.createIcons();
    }

    // =========================
    // CAMPO DE BUSCA
    // =========================

    const campoBusca = document.querySelector(".busca input");

    const instrumentos = document.querySelectorAll(".instrumento");
    const generos = document.querySelectorAll(".genero");
    const aulas = document.querySelectorAll(".aula");

    if (campoBusca) {
        campoBusca.addEventListener("input", function () {

            const pesquisa = campoBusca.value
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "");

            const elementos = [
                ...instrumentos,
                ...generos,
                ...aulas
            ];

            elementos.forEach(function (elemento) {

                const texto = elemento.textContent
                    .toLowerCase()
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "");

                if (texto.includes(pesquisa)) {
                    elemento.style.display = "";
                } else {
                    elemento.style.display = "none";
                }

            });

        });
    }

    // =========================
    // ROTINA MUSICAL
    // =========================

    const caixas = document.querySelectorAll(
        '.atividade input[type="checkbox"]'
    );

    function atualizarRotina() {

        let concluidas = 0;

        caixas.forEach(function (caixa) {
            if (caixa.checked) {
                concluidas++;
            }
        });

        console.log(
            "Atividades concluídas: " +
            concluidas +
            " de " +
            caixas.length
        );

    }

    caixas.forEach(function (caixa) {
        caixa.addEventListener("change", atualizarRotina);
    });

    // =========================
    // MENU DE NAVEGAÇÃO
    // =========================

    const linksMenu = document.querySelectorAll(
        ".menu-lateral nav a"
    );

    linksMenu.forEach(function (link) {

        link.addEventListener("click", function () {

            linksMenu.forEach(function (item) {
                item.classList.remove("ativo");
            });

            link.classList.add("ativo");

        });

    });

    // =========================
    // MENSAGEM DE BOAS-VINDAS
    // =========================

    console.log("MusicHub carregado com sucesso!");

});

