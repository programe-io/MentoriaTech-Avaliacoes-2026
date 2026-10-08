"use strict";

/* ========================================
   SELEÇÃO DE ELEMENTOS
======================================== */

const form = document.querySelector("#contato form");
const nomeInput = document.querySelector("#nome");
const emailInput = document.querySelector("#email");
const mensagemInput = document.querySelector("#mensagem");
const artigos = document.querySelectorAll("article");
const linksLeiaMais = document.querySelectorAll("article a");
const navLinks = document.querySelectorAll("nav a");


/* ========================================
   MENU DE NAVEGAÇÃO
======================================== */

navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {

        const destino = link.getAttribute("href");

        if (destino && destino.startsWith("#")) {
            event.preventDefault();

            const elemento = document.querySelector(destino);

            if (elemento) {
                elemento.scrollIntoView({
                    behavior: "smooth"
                });
            }
        }
    });
});


/* ========================================
   BOTÕES "LEIA MAIS"
======================================== */

linksLeiaMais.forEach((link) => {

    link.addEventListener("click", (event) => {

        event.preventDefault();

        const artigo = link.closest("article");
        const paragrafo = artigo.querySelector("p");

        if (paragrafo.dataset.expandido === "true") {

            paragrafo.style.maxHeight = "100px";
            paragrafo.style.overflow = "hidden";

            link.textContent = "Leia mais";

            paragrafo.dataset.expandido = "false";

        } else {

            paragrafo.style.maxHeight = "none";
            paragrafo.style.overflow = "visible";

            link.textContent = "Mostrar menos";

            paragrafo.dataset.expandido = "true";
        }

    });

});


/* ========================================
   VALIDAÇÃO DO FORMULÁRIO
======================================== */

if (form) {

    form.addEventListener("submit", (event) => {

        event.preventDefault();

        const nome = nomeInput.value.trim();
        const email = emailInput.value.trim();
        const mensagem = mensagemInput.value.trim();


        /* Verificar nome */

        if (nome.length < 3) {

            alert("Por favor, digite um nome válido.");

            nomeInput.focus();

            return;
        }


        /* Verificar e-mail */

        const emailValido =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailValido.test(email)) {

            alert("Digite um endereço de e-mail válido.");

            emailInput.focus();

            return;
        }


        /* Verificar mensagem */

        if (mensagem.length < 10) {

            alert(
                "A mensagem deve ter pelo menos 10 caracteres."
            );

            mensagemInput.focus();

            return;
        }


        /* Mensagem de sucesso */

        alert(
            `Obrigado, ${nome}! Sua mensagem foi enviada com sucesso.`
        );


        /* Limpar formulário */

        form.reset();

    });

}


/* ========================================
   EFEITO NOS ARTIGOS
======================================== */

artigos.forEach((artigo) => {

    artigo.addEventListener("mouseenter", () => {

        artigo.style.transform = "translateY(-5px)";

    });


    artigo.addEventListener("mouseleave", () => {

        artigo.style.transform = "translateY(0)";

    });

});


/* ========================================
   BOTÃO DE MODO ESCURO
======================================== */

const botaoTema = document.createElement("button");

botaoTema.textContent = "🌙 Modo escuro";

botaoTema.id = "botao-tema";

botaoTema.style.position = "fixed";
botaoTema.style.bottom = "20px";
botaoTema.style.right = "20px";
botaoTema.style.zIndex = "1000";

document.body.appendChild(botaoTema);


/* ========================================
   MODO ESCURO
======================================== */

let modoEscuro = false;

botaoTema.addEventListener("click", () => {

    modoEscuro = !modoEscuro;

    if (modoEscuro) {

        document.body.style.backgroundColor = "#111827";
        document.body.style.color = "#f9fafb";

        document.querySelectorAll("article").forEach((article) => {
            article.style.backgroundColor = "#1f2937";
            article.style.color = "#f9fafb";
        });

        document.querySelectorAll("#sobre, #contato form, aside")
            .forEach((elemento) => {
                elemento.style.backgroundColor = "#1f2937";
                elemento.style.color = "#f9fafb";
            });

        botaoTema.textContent = "☀️ Modo claro";

    } else {

        document.body.style.backgroundColor = "#f4f6f8";
        document.body.style.color = "#333";

        document.querySelectorAll("article").forEach((article) => {
            article.style.backgroundColor = "white";
            article.style.color = "#333";
        });

        document.querySelectorAll("#sobre, #contato form, aside")
            .forEach((elemento) => {
                elemento.style.backgroundColor = "white";
                elemento.style.color = "#333";
            });

        botaoTema.textContent = "🌙 Modo escuro";
    }

});


/* ========================================
   MENSAGEM DE BOAS-VINDAS
======================================== */

window.addEventListener("load", () => {

    console.log("Meu Blog foi carregado com sucesso!");

});


/* ========================================
   ANO AUTOMÁTICO NO RODAPÉ
======================================== */

const rodape = document.querySelector("footer p");

if (rodape) {

    const anoAtual = new Date().getFullYear();

    rodape.innerHTML =
        `&copy; ${anoAtual} Meu Blog. Todos os direitos reservados.`;

}
Como conectar o JavaScript ao HTML
No seu index.html, coloque esta linha antes de </body>:

<script src="script.js"></script>
A parte final do seu HTML ficará assim:

    <!-- Rodapé -->
    <footer>
        <p>&copy; 2026 Meu Blog. Todos os direitos reservados.</p>
    </footer>

    <!-- JavaScript -->
    <script src="script.js"></script>

</body>
</html>
📁 Estrutura final do projeto
Sua pasta pode ficar organizada assim:

Meu-Blog/
│
├── index.html
├── style.css
└── script.js
