

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

// Formulário

const formulario =
document.getElementById("formContato");

formulario.addEventListener("submit", function(e){

    e.preventDefault();

    let nome =
    document.getElementById("nome").value;

    let email =
    document.getElementById("email").value;

    let mensagem =
    document.getElementById("mensagem").value;

    if(
        nome === "" ||
        email === "" ||
        mensagem === ""
    ){

        alert("Preencha todos os campos!");

        return;

    }

    alert(
        "Mensagem enviada com sucesso, " +
        nome +
        "!"
    );

    formulario.reset();

});