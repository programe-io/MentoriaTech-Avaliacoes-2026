
// Função para falar um texto
function falar(texto) {

    // Para qualquer fala anterior
    window.speechSynthesis.cancel();

    // Cria uma mensagem de voz
    let voz = new SpeechSynthesisUtterance(texto);

    // Configura o idioma
    voz.lang = "pt-BR";

    // Velocidade da fala
    voz.rate = 0.9;

    // Tom da voz
    voz.pitch = 1;

    // Volume
    voz.volume = 1;

    // Faz o navegador falar
    window.speechSynthesis.speak(voz);
}

// Busca o texto de cada seção
function falarTexto(id) {

    let elemento = document.getElementById(id);

    let texto = elemento.innerText;

    falar(texto);
}

// Botão para parar a voz
function pararFala() {

    window.speechSynthesis.cancel();
}
