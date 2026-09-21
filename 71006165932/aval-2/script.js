// Aguarda o carregamento completo do HTML antes de executar os scripts
document.addEventListener("DOMContentLoaded", function () {
    
    // Elementos da área interativa
    const btnMensagem = document.getElementById("btn-mensagem");
    const campoTexto = document.getElementById("frase-motivacional");

    // Lista de frases para sorteio
    const frases = [
        "\"O conhecimento é a chave para transformar sonhos em realidade.\"",
        "\"Fisioterapia e Tecnologia: cuidado humano aliado à inovação!\"",
        "\"Passo a passo, a dedicação nos estudos constrói grandes empreendedoras.\"",
        "\"A lógica de programação nos ensina a resolver qualquer problema por partes.\"",
        "\"Acredite no seu potencial no CETI Paulo Freire e vá além!\""
    ];

    // Função para alterar a mensagem de forma aleatória
    btnMensagem.addEventListener("click", function () {
        const indiceAleatorio = Math.floor(Math.random() * frases.length);
        campoTexto.innerText = frases[indiceAleatorio];
    });

    // Log de verificação no console
    console.log("Portfólio de Andressa Rocha carregado com sucesso!");
});