const formulario = document.querySelector("form");

formulario.addEventListener("submit", function(event){
    event.preventDefault();

    const nome = document.getElementById("nome").value;

    if(nome === ""){
        alert("Digite seu nome!");
    }else{
        alert("Obrigado pela visita, " + nome + "!");
    }
});