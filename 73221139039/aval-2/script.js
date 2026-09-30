const searchInput =
    document.querySelector("#searchInput");

const searchButton =
    document.querySelector("#searchButton");


function buscarReceitas() {

    const termo =
        searchInput.value
            .toLowerCase()
            .trim();

    const resultados =
        receitas.filter(receita =>
            receita.nome
                .toLowerCase()
                .includes(termo)
            ||
            receita.categoria
                .toLowerCase()
                .includes(termo)
        );

    renderizarReceitas(resultados);
}


searchButton.addEventListener(
    "click",
    buscarReceitas
);


searchInput.addEventListener(
    "keydown",
    event => {

        if (event.key === "Enter") {
            buscarReceitas();
        }

    }
);
