function abrirPedra() {

    const senha = document.getElementById("senha-pedra");

    senha.style.display = "block";

    document.getElementById("codigo-pedra").focus();
}


let valorContador = 0;

function alterarContador(alteracao) {

    const proximoValor = valorContador + alteracao;

    if (proximoValor >= 0 && proximoValor <= 99) {
        valorContador = proximoValor;
        document.getElementById("valor-contador").textContent = valorContador;
    }
}


function verificarContador() {

    const resultado = document.getElementById("resultado-contador");

    if (valorContador === 14) {
        resultado.textContent = "✅ Segunda etapa concluída!";
        resultado.style.color = "darkgreen";
        document.getElementById("confirmar-contador").disabled = true;
        document.querySelectorAll(".controle-contador button").forEach((botao) => {
            botao.disabled = true;
        });
    } else {
        resultado.textContent = "❌ Esse não é o número secreto. Tente novamente.";
        resultado.style.color = "gray";
    }
}


function verificarPedra() {

    const campo = document.getElementById("codigo-pedra");

    const resultado = document.getElementById("resultado-pedra");

    const resposta = campo.value.trim().toLowerCase();


    if (resposta === "alquimia") {

        resultado.textContent = "⚡ A PEDRA FOI ATIVADA! ⚡";

        resultado.style.color = "darkred";

        campo.disabled = true;
        document.getElementById("segunda-etapa").style.display = "block";

    } else {

        resultado.textContent = "❌ Palavra incorreta...";

        resultado.style.color = "gray";

    }

}


let cliquesNaVerdade = 0;
let missaoVerdadeIniciada = false;
let etapaVerdade = 0;
const palavrasVerdade = ["verdade", "yourself", "fullmetizando"];

function clicarVerdade(event) {
    event.preventDefault();

    if (missaoVerdadeIniciada) {
        return;
    }

    cliquesNaVerdade++;

    if (cliquesNaVerdade === 3) {
        missaoVerdadeIniciada = true;
        const missao = document.getElementById("missao-verdade");
        const mensagem = document.getElementById("mensagem-verdade");

        missao.hidden = false;
        window.setTimeout(() => {
            mensagem.textContent = "A Verdade abriu um caminho. Complete a sequência.";
            document.getElementById("formulario-verdade").hidden = false;
            document.getElementById("palavra-verdade").focus();
        }, 3000);
    }
}

function verificarPalavraVerdade(event) {
    event.preventDefault();

    const campo = document.getElementById("palavra-verdade");
    const mensagem = document.getElementById("mensagem-verdade");
    const resposta = campo.value.trim().toLowerCase();

    if (resposta !== palavrasVerdade[etapaVerdade]) {
        mensagem.textContent = "Palavra incorreta. Tente novamente.";
        campo.value = "";
        campo.focus();
        return;
    }

    etapaVerdade++;
    campo.value = "";

    if (etapaVerdade === palavrasVerdade.length) {
        mensagem.textContent = "🎉 Parabéns por completar a missão secreta! 🎉";
        document.getElementById("formulario-verdade").hidden = true;
        soltarConfetes();
        return;
    }

    mensagem.textContent = "Correto! Digite a próxima palavra.";
    campo.focus();
}

function soltarConfetes() {
    const cores = ["#e63946", "#f4a261", "#2a9d8f", "#457b9d", "#9b5de5", "#ffd166"];
    const quantidade = 100;

    for (let i = 0; i < quantidade; i++) {
        const confete = document.createElement("span");
        confete.className = "confete";
        confete.style.left = `${Math.random() * 100}vw`;
        confete.style.backgroundColor = cores[i % cores.length];
        confete.style.animationDelay = `${Math.random() * 1.5}s`;
        confete.style.setProperty("--duracao", `${2.5 + Math.random() * 2}s`);
        document.body.appendChild(confete);
        window.setTimeout(() => confete.remove(), 5500);
    }
}