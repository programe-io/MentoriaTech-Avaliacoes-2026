const links = document.querySelectorAll(".post a");

links.forEach(link => {
    link.addEventListener("click", function(event){
        event.preventDefault();
        alert("Página completa do artigo em breve!");
    });
});