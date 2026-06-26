const curiosidades = [

    "🩸 Damon é conhecido pelo seu humor sarcástico.",

    "🦇 Seu personagem evolui bastante durante a série.",

    "❤️ Apesar da aparência fria, demonstra lealdade às pessoas que ama.",

    "🌙 Damon é um dos personagens mais populares da série.",

    "🔥 Seu estilo marcante influenciou muitos fãs."

    ];

    const botao = document.getElementById("btn");

    const texto = document.getElementById("texto");

    botao.onclick = () => {

    const numero = Math.floor(Math.random()*curiosidades.length);

    texto.innerHTML = curiosidades[numero];

    };
]