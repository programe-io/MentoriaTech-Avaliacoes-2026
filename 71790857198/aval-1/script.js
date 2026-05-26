function mostrarMensagem(){

    document.getElementById("texto").innerHTML =
    "📚 A educação em Guaribas transforma sonhos em realidade!";
}

function trocarTema(){

    let body = document.body;

    if(body.style.background == "rgb(34, 34, 34)"){

        body.style.background = "#f4f4f4";
        body.style.color = "#333";

    }else{

        body.style.background = "#222";
        body.style.color = "white";
    }
}

console.log("Blog Educação em Guaribas carregado!");