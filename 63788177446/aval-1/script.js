function responder() {
    let pergunta = document.getElementById("pergunta").value.toLowerCase();
    let resposta = document.getElementById("resposta");

    if (pergunta.includes("html")) {
        resposta.innerHTML = "HTML é a linguagem usada para estruturar páginas web.";
    } else if (pergunta.includes("css")) {
        resposta.innerHTML = "CSS é utilizado para estilizar páginas web.";
    } else if (pergunta.includes("javascript")) {
        resposta.innerHTML = "JavaScript adiciona interatividade aos sites.";
    } else {
        resposta.innerHTML = "Desculpe, ainda não sei responder essa pergunta.";
    }
}