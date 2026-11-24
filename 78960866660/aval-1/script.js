
function mensagem() {
    alert("Seja bem-vindo ao Blog do Enaldinho! 🎉");
}

function curiosidade() {

    const curiosidades = [
        "Enaldinho é conhecido por seus vídeos de desafios!",
        "Seu canal é focado em entretenimento e diversão!",
        "Ele conquistou milhões de inscritos no YouTube!",
        "Seus vídeos incluem brincadeiras e aventuras!"
    ];

    const sorteio = Math.floor(
        Math.random() * curiosidades.length
    );

    document.getElementById("resultado").innerText =
        curiosidades[sorteio];
}
