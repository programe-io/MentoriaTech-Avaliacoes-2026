function mostrarMensagem(tipo) {
    const mensagem = document.getElementById("mensagem");

    if (tipo === "HTML") {
        mensagem.textContent =
            "HTML: estrutura da página verificada com sucesso!";
    \}

    else if (tipo === "CSS") {
        mensagem.textContent =
            "CSS: estilos e aparência da página verificados com sucesso!";
    \}

    else if (tipo === "JavaScript") {
        mensagem.textContent =
            "JavaScript: interatividade funcionando corretamente!";
    \}
\}$0