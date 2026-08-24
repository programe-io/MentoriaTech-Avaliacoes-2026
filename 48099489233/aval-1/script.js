const menu =
document.getElementById("menu");

const links =
document.getElementById("navlinks");


menu.onclick=function(){

links.classList.toggle("show");

}


const form=
document.getElementById("form");


form.addEventListener("submit",function(e){

e.preventDefault();

alert("Mensagem enviada com sucesso!");

form.reset();

});