function mudarCor() {
    document.body.style.backgroundColor = 
        "#" + Math.floor(Math.random() * 16777215)
        .toString(16).padStart(6, "0");

    document.getElementById("mensagem").innerText =
        "Você clicou no botão! 🎉";
\}$0