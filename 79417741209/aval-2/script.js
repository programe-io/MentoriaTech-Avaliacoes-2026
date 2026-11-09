
// =================================
// SISTEMA DE COMBATE À DESINFORMAÇÃO
// =================================

// 1. MENSAGEM DE BOAS-VINDAS

document.addEventListener("DOMContentLoaded", () => {
    console.log("Sistema iniciado com sucesso!");

    const titulo = document.querySelector("header h1");

    if (titulo) {
        titulo.style.transition = "all 1s ease";
        titulo.style.opacity = "1";
    }
});


// 2. RELÓGIO DIGITAL

function atualizarRelogio() {
    const agora = new Date();

    const horario = agora.toLocaleTimeString("pt-BR");

    const relogio = document.getElementById("relogio");

    if (relogio) {
        relogio.textContent = horario;
    }
}

setInterval(atualizarRelogio, 1000);
atualizarRelogio();


// 3. QUIZ INTERATIVO

let pontuacao = 0;
let perguntasRespondidas = 0;

function verificar(resposta) {

    const resultado = document.getElementById("resultado");

    if (!resultado) return;

    if (resposta === "correta") {

        pontuacao++;

        resultado.innerHTML =
            "✅ Resposta correta! Parabéns!";

        resultado.style.color = "#22c55e";

    } else {

        resultado.innerHTML =
            "❌ Resposta incorreta! Pesquise antes de compartilhar.";

        resultado.style.color = "#ef4444";
    }

    perguntasRespondidas++;

    atualizarPontuacao();
}


// 4. ATUALIZAR PONTUAÇÃO

function atualizarPontuacao() {

    const pontos = document.getElementById("pontuacao");

    if (pontos) {
        pontos.textContent =
            `Pontuação: ${pontuacao} / ${perguntasRespondidas}`;
    }
}


// 5. EFEITO DE APARECIMENTO

const observador = new IntersectionObserver((entradas) => {

    entradas.forEach((entrada) => {

        if (entrada.isIntersecting) {

            entrada.target.classList.add("visivel");

        }

    });

}, {
    threshold: 0.2
});

document.querySelectorAll("section, article").forEach((elemento) => {
    observador.observe(elemento);
});


// 6. BOTÃO DE VOLTAR AO TOPO

const voltarTopo = document.createElement("button");

voltarTopo.textContent = "↑";

voltarTopo.title = "Voltar ao topo";

voltarTopo.style.position = "fixed";
voltarTopo.style.bottom = "25px";
voltarTopo.style.right = "25px";
voltarTopo.style.borderRadius = "50%";
voltarTopo.style.fontSize = "25px";
voltarTopo.style.display = "none";
voltarTopo.style.zIndex = "1000";

document.body.appendChild(voltarTopo);

window.addEventListener("scroll", () => {

    voltarTopo.style.display =
        window.scrollY > 300 ? "block" : "none";

});

voltarTopo.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


// 7. MENSAGEM FINAL

function mensagemFinal() {

    alert(
        "A informação responsável transforma a sociedade. " +
        "Combata as Fake News!"
    );

}
