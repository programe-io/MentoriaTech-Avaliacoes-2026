const botao = document.getElementById("lerMais");
const texto = document.getElementById("textoExtra");

botao.addEventListener("click", function(){

    texto.innerHTML =
    "Especialistas afirmam que o uso da inteligência artificial, plataformas digitais e ferramentas colaborativas está tornando o ensino mais dinâmico, acessível e personalizado para milhões de estudantes.";

    botao.innerHTML = "Notícia completa";
});