const links = document.querySelectorAll("nav a");

links.forEach(function(link) {

    link.addEventListener("click", function(event) {

        event.preventDefault();

        alert("Você selecionou: " + link.textContent);

    });

});


console.log("Café & Doces carregado com sucesso! ☕");