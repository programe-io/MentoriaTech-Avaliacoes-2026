
document.addEventListener("DOMContentLoaded", function () {

    const links = document.querySelectorAll("nav a");

    links.forEach(function (link) {
        link.addEventListener("click", function (event) {
            event.preventDefault();

            links.forEach(function (item) {
                item.classList.remove("ativo");
            });

            this.classList.add("ativo");
        });
    });

});
