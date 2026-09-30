// ===============================
// NAVEGAÇÃO ENTRE ABAS
// ===============================

const botoes = document.querySelectorAll(".nav-btn");
const paginas = document.querySelectorAll(".page");

botoes.forEach(botao => {

    botao.addEventListener("click", () => {

        const pagina = botao.dataset.page;

        abrirPagina(pagina);

    });

});


function abrirPagina(nomePagina) {

    paginas.forEach(pagina => {
        pagina.classList.remove("active");
    });

    botoes.forEach(botao => {
        botao.classList.remove("active");
    });

    const paginaSelecionada = document.getElementById(nomePagina);

    if (paginaSelecionada) {
        paginaSelecionada.classList.add("active");
    }

    const botaoSelecionado =
        document.querySelector(`[data-page="${nomePagina}"]`);

    if (botaoSelecionado) {
        botaoSelecionado.classList.add("active");
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// ===============================
// MONTA SEU TIME
// ===============================

function salvarTime() {

    const nome = document.getElementById("nomeTime").value.trim();

    const jogador1 = document.getElementById("player1").value.trim();
    const jogador2 = document.getElementById("player2").value.trim();
    const jogador3 = document.getElementById("player3").value.trim();
    const jogador4 = document.getElementById("player4").value.trim();

    const mensagem = document.getElementById("timeMensagem");

    if (
        nome === "" ||
        jogador1 === "" ||
        jogador2 === "" ||
        jogador3 === "" ||
        jogador4 === ""
    ) {

        mensagem.style.display = "block";
        mensagem.style.background = "#4a1717";
        mensagem.style.color = "#ff7777";

        mensagem.innerHTML =
            "⚠️ Preencha o nome da equipe e os 4 jogadores.";

        return;
    }


    document.getElementById("nomeTimeVisual").textContent = nome;

    mensagem.style.display = "block";
    mensagem.style.background = "#123b20";
    mensagem.style.color = "#66ff94";

    mensagem.innerHTML =
        "✅ Time salvo com sucesso! Sua equipe está pronta para o campeonato.";

}


// ===============================
// INSCRIÇÃO
// ===============================

function finalizarInscricao() {

    const responsavel =
        document.getElementById("responsavel").value.trim();

    const whatsapp =
        document.getElementById("whatsapp").value.trim();

    const equipe =
        document.getElementById("equipeInscricao").value.trim();

    const servidor =
        document.getElementById("servidor").value;


    if (
        responsavel === "" ||
        whatsapp === "" ||
        equipe === ""
    ) {

        abrirModal(
            "⚠️",
            "Campos obrigatórios",
            "Preencha todos os campos antes de enviar a inscrição."
        );

        return;
    }


    abrirModal(
        "🏆",
        "Inscrição recebida!",
        `Equipe <strong>${equipe}</strong> cadastrada para análise.<br><br>
        Responsável: ${responsavel}<br>
        Servidor: ${servidor}<br><br>
        Valor da inscrição: <strong>R$ 5,00</strong>`
    );

}


// ===============================
// MODAL
// ===============================

function abrirModal(icone, titulo, texto) {

    document.getElementById("modalIcon").textContent = icone;

    document.getElementById("modalTitulo").textContent = titulo;

    document.getElementById("modalTexto").innerHTML = texto;

    document.getElementById("modal").classList.add("show");

}


function fecharModal() {

    document.getElementById("modal").classList.remove("show");

}


// Fechar clicando fora

document.getElementById("modal").addEventListener("click", function(event) {

    if (event.target === this) {
        fecharModal();
    }

});


// ===============================
// ESC PARA FECHAR MODAL
// ===============================

document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {
        fecharModal();
    }

});


// ===============================
// MENSAGEM NO CONSOLE
// ===============================

console.log("🔥 FF Arena carregado com sucesso!");
console.log("🎮 Campeonato Free Fire 4x4");
console.log("💰 Inscrição: R$ 5,00");