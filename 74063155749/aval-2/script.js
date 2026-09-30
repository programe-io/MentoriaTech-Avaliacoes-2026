// Botão "Entrar na mente"
function mostrarMensagem() {
    alert("🧠 Bem-vindo à mente da Riley! Prepare-se para conhecer as emoções!");
}


// Curiosidades
function mostrarCuriosidade() {

    const curiosidades = [
        "🧠 Divertida Mente 2 apresenta novas emoções na mente da Riley.",
        "😊 A Alegria tenta manter Riley positiva durante as mudanças da adolescência.",
        "😰 A Ansiedade é uma das novas emoções apresentadas no filme.",
        "🎬 Divertida Mente 2 é uma continuação de Divertida Mente.",
        "🌈 O filme mostra como diferentes emoções podem trabalhar juntas.",
        "👧 Riley está passando pela fase da adolescência no segundo filme."
    ];

    const numero = Math.floor(Math.random() * curiosidades.length);

    document.getElementById("textoCuriosidade").textContent =
        curiosidades[numero];
}