
function mostrarDica(tipo) {
    const resultado = document.getElementById("resultado");

    if (tipo === "naturais") {
        resultado.textContent =
            "Unhas naturais: mantenha-as limpas, hidratadas e evite roer.";
    } else if (tipo === "decoradas") {
        resultado.textContent =
            "Unhas decoradas: experimente flores, francesinha, glitter e cores diferentes!";
    } else if (tipo === "gel") {
        resultado.textContent =
            "Esmaltação em gel: procure uma profissional e siga os cuidados de remoção.";
    }
}

function enviarMensagem() {
    const nome = document.getElementById("nome").value.trim();
    const mensagem = document.getElementById("mensagem").value.trim();
    const resposta = document.getElementById("resposta");

    if (nome === "" || mensagem === "") {
        resposta.textContent = "Preencha seu nome e sua mensagem!";
        return;
    }

    resposta.textContent =
        "Obrigada, " + nome + "! Sua mensagem foi preenchida com sucesso.";

    document.getElementById("nome").value = "";
    document.getElementById("mensagem").value = "";
}
