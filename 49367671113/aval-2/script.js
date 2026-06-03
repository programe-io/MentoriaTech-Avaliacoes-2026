document.addEventListener("DOMContentLoaded", function () {
    console.log("Página de prevenção ao suicídio carregada com sucesso.");

    const botaoAjuda = document.getElementById("btn-ajuda");

    if (botaoAjuda) {
        botaoAjuda.addEventListener("click", function () {
            alert(
                "Você não está sozinho. Procure ajuda de familiares, amigos ou profissionais de saúde mental. Em caso de emergência, entre em contato com os serviços de apoio da sua região."
            );
        });
    }
});