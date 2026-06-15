/* ==========================================================================
   script.js - Interatividade para a Página dos Serafins
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    
    // 1. INTERATIVIDADE NAS ASAS DOS SERAFINS
    // Procura a lista de asas no HTML para torná-la clicável
    const topicosAsas = document.querySelectorAll("main ul li ul li");

    topicosAsas.forEach(topico => {
        // Altera o cursor para indicar que o elemento é clicável
        topico.style.cursor = "pointer";
        
        topico.addEventListener("click", () => {
            let significado = "";
            const textoOpcao = topico.innerText.toLowerCase();

            // Define uma mensagem personalizada dependendo do par de asas clicado
            if (textoOpcao.includes("rosto")) {
                significado = "💡 Os Serafins cobrem o rosto porque a glória de Deus é tão intensa que nem mesmo os seres celestiais mais elevados olham diretamente para ela, demonstrando extrema reverência.";
            } else if (textoOpcao.includes("pés") || textoOpcao.includes("pes")) {
                significado = "💡 Cobrir os pés é um símbolo oriental antigo de humildade, modéstia e respeito absoluto perante a presença de um Rei Sagrado.";
            } else if (textoOpcao.includes("voar")) {
                significado = "💡 Os dois pares de asas para voar representam a sua prontidão e velocidade espiritual para executar as ordens e a vontade de Deus instantaneamente.";
            }

            // Exibe uma caixinha de alerta elegante no navegador com a explicação
            if (significado !== "") {
                alert(significado);
            }
        });
    });


    // 2. EFEITO DE REVELAÇÃO SUAVE (FADE-IN) AO FAZER SCROLL
    const seccoes = document.querySelectorAll("section");

    // Configura o estilo inicial das secções via JS para não quebrar a página sem script
    seccoes.forEach(seccao => {
        seccao.style.opacity = "0";
        seccao.style.transform = "translateY(20px)";
        seccao.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
    });

    const verificarScroll = () => {
        const alturaDisparador = window.innerHeight * 0.85;

        seccoes.forEach(seccao => {
            const topoSeccao = seccao.getBoundingClientRect().top;

            // Se a secção estiver visível na janela do navegador, ativa o efeito
            if (topoSeccao < alturaDisparador) {
                seccao.style.opacity = "1";
                seccao.style.transform = "translateY(0)";
            }
        });
    };

    // Executa uma vez ao carregar a página e sempre que o utilizador fizer scroll
    window.addEventListener("scroll", verificarScroll);
    verificarScroll(); 
});