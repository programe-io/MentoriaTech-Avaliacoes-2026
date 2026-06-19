function mostrarSecao(id) {
    const secoes = document.querySelectorAll(".secao");

    secoes.forEach(secao => {
        secao.classList.remove("ativo");
    });

    document.getElementById(id).classList.add("ativo");
}