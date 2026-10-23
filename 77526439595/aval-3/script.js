
// Seleciona o botão de notificações
const btnNotificacao = document.getElementById("btnNotificacao");

// Adiciona um evento de clique
btnNotificacao.addEventListener("click", function () {
    alert("Você não possui novas notificações.");
});

// Seleciona todos os links do menu
const linksMenu = document.querySelectorAll(".menu-link");

// Percorre os links do menu
linksMenu.forEach(function (link) {
    link.addEventListener("click", function () {

        // Remove a classe ativa de todos os links
        linksMenu.forEach(function (item) {
            item.classList.remove("ativo");
        });

        // Ativa o link clicado
        link.classList.add("ativo");
    });
});
