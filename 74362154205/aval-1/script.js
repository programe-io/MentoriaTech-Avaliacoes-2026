const botao=document.getElementById("tema");

botao.onclick=function(){

document.body.classList.toggle("dark");

if(document.body.classList.contains("dark")){
botao.innerHTML="☀";
}else{
botao.innerHTML="🌙";
}

}

const imagens=document.querySelectorAll(".galeria img");

imagens.forEach(function(img){

img.addEventListener("click",function(){

window.open(img.src);

});

});