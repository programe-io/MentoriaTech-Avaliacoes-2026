function irParaPlanos() {
    document.getElementById("planos").scrollIntoView({
        behavior: "smooth"
    });
}


function mostrarCurso() {
    document.getElementById("curso").scrollIntoView({
        behavior: "smooth"
    });
}


function assinar(plano) {

    alert(
        "Você escolheu o plano " +
        plano +
        "!\n\nEm um site real, aqui poderia abrir a página de pagamento."
    );

}
