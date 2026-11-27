
document.addEventListener("DOMContentLoaded", function () {

    // Efeito de entrada da página
    document.body.style.opacity = "0";

    setTimeout(function () {
        document.body.style.transition = "opacity 1.5s ease";
        document.body.style.opacity = "1";
    }, 100);

});
