function adotar(){
    alert("❤️ Obrigado! Em breve entraremos em contato sobre a adoção.");
    }

    document.addEventListener("DOMContentLoaded", function(){

    const pets = document.querySelectorAll(".produto");
    const pesquisa = document.getElementById("pesquisa");

    pesquisa.addEventListener("keyup", function(){

    let texto = pesquisa.value.toLowerCase();

    pets.forEach(p => {

    let nome = p.querySelector("h3").innerText.toLowerCase();

    if(nome.includes(texto)){
    p.style.display = "block";
    }else{
    p.style.display = "none";
    }

    });

    });

    });
