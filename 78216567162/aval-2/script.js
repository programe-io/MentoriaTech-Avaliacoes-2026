document.addEventListener("DOMContentLoaded", function(){

    console.log("Página carregada com sucesso!");

    const links = document.querySelectorAll(".menu-navegacao a");

    links.forEach(link => {
        link.addEventListener("click", function(){
            alert("Você clicou em: " + this.textContent);
        });
    });

});