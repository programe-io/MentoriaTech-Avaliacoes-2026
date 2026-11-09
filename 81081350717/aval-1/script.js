const btnJogar = document.getElementById("btnJogar");
const btnInstrucoes = document.getElementById("btnInstrucoes");
const btnSair = document.getElementById("btnSair");
const textoMensagem = document.getElementById("textoMensagem");

btnJogar.addEventListener("click", function() {
    textoMensagem.textContent = "✅ Iniciando o jogo! Prepare-se para os zumbis!";
    });

    btnInstrucoes.addEventListener("click", function() {
        textoMensagem.textContent = "📖 Use as teclas WASD para se mover e atire nos zumbis!";
        });

        btnSair.addEventListener("click", function() {
            textoMensagem.textContent = "🚪 Saindo do menu do jogo...";
            });
            