
function abrirPagina(pagina) {
    document.querySelectorAll(".pagina").forEach(item => {
        item.classList.add("oculto");
    });

    document.getElementById(pagina).classList.remove("oculto");
}

// PROGRESSO DAS AULAS

let aulasConcluidas = JSON.parse(
    localStorage.getItem("aulasConcluidas") || "[]"
);

function concluir(aula) {
    if (aulasConcluidas.includes(aula)) {
        alert("Você já concluiu esta aula!");
        return;
    }

    aulasConcluidas.push(aula);

    localStorage.setItem(
        "aulasConcluidas",
        JSON.stringify(aulasConcluidas)
    );

    atualizarProgresso();

    alert("Parabéns! Aula concluída!");
}

function atualizarProgresso() {
    const totalAulas = 3;

    const porcentagem = Math.round(
        (aulasConcluidas.length / totalAulas) * 100
    );

    document.getElementById("progresso").style.width =
        porcentagem + "%";

    document.getElementById("textoProgresso").innerText =
        porcentagem + "% concluído";
}

// QUIZ 1

function responder(correto) {
    const resposta = document.getElementById("resposta");

    if (correto) {
        resposta.innerText = "✅ Correto! A ginga é fundamental!";
        resposta.style.color = "green";
    } else {
        resposta.innerText = "❌ Tente novamente!";
        resposta.style.color = "red";
    }
}

// QUIZ 2

function responder2(correto) {
    const resposta = document.getElementById("resposta2");

    if (correto) {
        resposta.innerText = "✅ Muito bem! É o berimbau!";
        resposta.style.color = "green";
    } else {
        resposta.innerText = "❌ Tente novamente!";
        resposta.style.color = "red";
    }
}

// INICIALIZAÇÃO

atualizarProgresso();
