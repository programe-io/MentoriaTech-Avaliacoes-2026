
const beneficios = [
    "Os microsserviços permitem atualizar uma parte do aplicativo sem modificar o sistema inteiro!",
    "Cada serviço pode ser escalado de acordo com a quantidade de usuários!",
    "Problemas em um serviço podem não afetar os demais!",
    "Novas funcionalidades podem ser desenvolvidas com mais rapidez!"
];

let indice = 0;

function mostrarBeneficio() {
    document.getElementById("mensagem").textContent =
        beneficios[indice];

    indice = (indice + 1) % beneficios.length;
}
