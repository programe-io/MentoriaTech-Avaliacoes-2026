function mostrarFato(){

    document.getElementById("fato").innerHTML =
    "📚 Fato histórico: A Segunda Guerra Mundial ocorreu entre 1939 e 1945 e envolveu mais de 30 países em um conflito de escala global.";

}

function mostrarData(){

    const dataAtual = new Date();

    document.getElementById("data").innerHTML =
    "Página acessada em: " +
    dataAtual.toLocaleDateString("pt-BR");

}