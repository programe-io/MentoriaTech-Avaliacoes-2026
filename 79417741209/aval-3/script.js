
// ======================================
// SISTEMA DE INFORMAÇÃO E CONSCIENTIZAÇÃO
// ======================================

// 1. SISTEMA DE PESQUISA

function pesquisarNoticia() {

    const pesquisa = document.getElementById("pesquisa");

    const resultado = document.getElementById("resultado");

    if (!pesquisa || !resultado) return;

    const texto = pesquisa.value.trim();

    if (texto === "") {

        resultado.innerHTML =
            "⚠️ Digite uma informação para pesquisar.";

        return;
    }

    resultado.innerHTML =
        "🔎 Pesquise essa informação em fontes confiáveis: " + texto;
}


// 2. VERIFICADOR DE INFORMAÇÕES

function verificarInformacao() {

    const resultado =
        document.getElementById("verificacao");

    if (!resultado) return;

    resultado.innerHTML = `
        <strong>Antes de acreditar, confira:</strong>
        <br><br>
        ✔ Quem publicou a notícia?
        <br>
        ✔ Existem fontes confiáveis?
        <br>
        ✔ A informação foi confirmada?
        <br>
        ✔ A data está atualizada?
    `;
}


// 3. CONTADOR DE COMPARTILHAMENTOS

let compartilhamentos = 0;

function compartilharProjeto() {

    compartilhamentos++;

    const contador =
        document.getElementById("contador");

    if (contador) {

        contador.innerHTML =
            "Compartilhamentos: " + compartilhamentos;

    }

}


// 4. MODO NOTURNO

function alternarTema() {

    document.body.classList.toggle("modo-claro");

}


// 5. FRASES DE CONSCIENTIZAÇÃO

const frases = [

    "Nem tudo que viraliza é verdadeiro.",

    "A informação precisa de responsabilidade.",

    "Verifique antes de compartilhar.",

    "O conhecimento combate a desinformação.",

    "A verdade merece ser investigada."

];

function mostrarFrase() {

    const indice =
        Math.floor(Math.random() * frases.length);

    const elemento =
        document.getElementById("frase");

    if (elemento) {

        elemento.innerHTML = frases[indice];

    }

}


// 6. ANIMAÇÃO DE PROGRESSO

function iniciarProgresso() {

    const barra =
        document.getElementById("progresso");

    if (!barra) return;

    barra.style.width = "0%";

    let progresso = 0;

    const intervalo = setInterval(() => {

        progresso += 5;

        barra.style.width = progresso + "%";

        if (progresso >= 100) {

            clearInterval(intervalo);

        }

    }, 100);

}


// 7. DATA AUTOMÁTICA

function atualizarData() {

    const elemento =
        document.getElementById("data");

    if (elemento) {

        elemento.textContent =
            new Date().toLocaleDateString("pt-BR");

    }

}

atualizarData();


// 8. MENSAGEM DE ENCERRAMENTO

function finalizarProjeto() {

    alert(
        "Parabéns por participar!\n\n" +
        "Combater a desinformação começa com uma atitude: " +
        "pensar, pesquisar e verificar antes de compartilhar."
    );

}
