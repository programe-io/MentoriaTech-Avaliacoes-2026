// ===============================
// BOTÃO DE LOCALIZAÇÃO
// ===============================

const botaoLocalizacao =
    document.getElementById("botaoLocalizacao");

botaoLocalizacao.addEventListener("click", function () {

    alert(
        "📍 O CETI Zacarias de Góis está localizado em Teresina, no estado do Piauí."
    );

});


// ===============================
// BOTÃO DE INFORMAÇÕES
// ===============================

const botaoMensagem =
    document.getElementById("botaoMensagem");

botaoMensagem.addEventListener("click", function () {

    alert(
        "🎓 Para informações oficiais sobre matrícula, horários e atividades, consulte os canais oficiais da escola e da Secretaria de Educação do Piauí."
    );

});


// ===============================
// MENU
// ===============================

const links =
    document.querySelectorAll("nav a");

links.forEach(function (link) {

    link.addEventListener("click", function () {

        console.log(
            "Você acessou: " + link.textContent
        );

    });

});


// ===============================
// MENSAGEM NO CONSOLE
// ===============================

console.log(
    "Site do CETI Zacarias de Góis carregado com sucesso!"
);