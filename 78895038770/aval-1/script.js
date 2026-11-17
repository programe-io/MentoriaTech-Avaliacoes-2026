
// MENU MOBILE

function toggleMenu() {
    const menu = document.getElementById("menu");
    menu.classList.toggle("active");
}

// PESQUISAR E FILTRAR CARROS

function filtrarCarros() {

    const pesquisa = document
        .getElementById("pesquisa")
        .value.toLowerCase();

    const categoria = document
        .getElementById("categoria")
        .value;

    const carros = document.querySelectorAll(".car-card");

    carros.forEach(carro => {

        const nome = carro.dataset.nome.toLowerCase();
        const tipo = carro.dataset.categoria;

        const correspondeNome = nome.includes(pesquisa);

        const correspondeCategoria =
            categoria === "todos" || tipo === categoria;

        if (correspondeNome && correspondeCategoria) {
            carro.style.display = "block";
        } else {
            carro.style.display = "none";
        }

    });
}

// DETALHES DO VEÍCULO

function verCarro(nome) {

    alert(
        "Você selecionou: " + nome +
        "\nEntre em contato para saber mais!"
    );

}
