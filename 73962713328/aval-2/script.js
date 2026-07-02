const senha=document.getElementById("senha");

const forca=document.getElementById("forca");

senha.addEventListener("keyup",()=>{

if(senha.value.length<4){

forca.innerHTML="Senha fraca";

forca.style.color="red";

}else if(senha.value.length<8){

forca.innerHTML="Senha média";

forca.style.color="orange";

}else{

forca.innerHTML="Senha forte";

forca.style.color="green";

}

});

const foto=document.getElementById("foto");

const preview=document.getElementById("preview");

foto.addEventListener("change",function(){

const arquivo=this.files[0];

if(arquivo){

preview.src=URL.createObjectURL(arquivo);

preview.style.display="block";

}

});

document.getElementById("formulario").addEventListener("submit",function(e){

e.preventDefault();

alert("Cadastro realizado com sucesso!");

});