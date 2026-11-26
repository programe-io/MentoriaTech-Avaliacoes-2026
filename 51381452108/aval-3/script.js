
/* PESQUISA DE VEÍCULOS */

const pesquisa = document.getElementById("pesquisa");

pesquisa.addEventListener("input", filtrarCarros);


/* FILTRO DE CATEGORIA */

const categoria = document.getElementById("categoria");

categoria.addEventListener("change", filtrarCarros);


/* FUNÇÃO DE FILTRAGEM */

function filtrarCarros() {

    const texto = pesquisa.value.toLowerCase();
    const tipo = categoria.value;

    const carros = document.querySelectorAll(".carro");

    carros.forEach(carro => {

        const nome = carro.querySelector("h3")
            .textContent.toLowerCase();

        const categoriaCarro = carro.dataset.categoria;

        const correspondeNome = nome.includes(texto);

        const correspondeCategoria =
            tipo === "todos" || tipo === categoriaCarro;

        carro.style.display =
            correspondeNome && correspondeCategoria
            ? "block"
            : "none";

    });

}


/* CONTATO PELO WHATSAPP */

function comprar(nome) {

    const telefone = "5511999999999";

    const mensagem =
        `Olá! Tenho interesse no veículo ${nome}. Gostaria de mais informações.`;

    const link =
        `https://wa.me/${telefone}?text=${encodeURIComponent(mensagem)}`;

    window.open(link, "_blank");

}
