function mostrarMensagem(){

  document.getElementById("mensagem").innerHTML =
    "Você clicou no botão!";
}

/* FORMULÁRIO */

const formulario = document.getElementById("formulario");

formulario.addEventListener("submit", function(event){

  event.preventDefault();

  alert("Formulário enviado com sucesso!");
});