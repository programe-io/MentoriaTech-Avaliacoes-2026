
window.onload = function(){

    alert("Bem-vindo ao Meu Blog!");

}


const tema = document.getElementById("tema");

tema.addEventListener("click", () => {

    document.body.classList.toggle("dark-mode");

    if(document.body.classList.contains("dark-mode")){

        tema.innerHTML = "☀️";

    }else{

        tema.innerHTML = "🌙";

    }

});


const formulario =
document.getElementById("formContato");

formulario.addEventListener("submit", function(e){

    e.preventDefault();

    let nome =
    document.getElementById("nome").value;

    let email =
    document.getElementById("email").value;
    let mensagem=
    document.getElementById("mensagem").value;
    if(
        mome==="" ||
        email === "" ||
        mensagem === ""

    ){
        alert("precha todos os campos !");
        return;
        

    }
    alert(
        "mensagem enviada com sucesso,"+
        nome+
        "!"
    );
    formulario.reset();


   });