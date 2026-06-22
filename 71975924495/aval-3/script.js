function mostrarMensagem(){

    document.getElementById("mensagem").innerHTML =
    "🎵 Curiosidade: 'La La Land' ganhou diversos prêmios e ficou famoso por sua incrível trilha sonora e coreografias.";
}

function resposta(correta){

    if(correta){

        document.getElementById("resultado").innerHTML =
        "✅ Parabéns! Você acertou.";

    }else{

        document.getElementById("resultado").innerHTML =
        "❌ Resposta incorreta. O correto é 'La La Land'.";
    }

}