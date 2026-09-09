const botao = document.querySelector(".botao");

botao.addEventListener("click", function(event) {
    event.preventDefault();

    alert("Olá! 👋 Obrigado por visitar meu site!");
\});

Depois, no seu index.html, coloque antes de </body>:

<script src="script.js"></script>

Sua estrutura ficará assim:

meu-site/
├── index.html
├── style.css
└── script.js$0