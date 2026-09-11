// ===============================
// TEMA ESCURO
// ===============================

function toggleTheme() {

    document.body.classList.toggle("dark");

    const button = document.querySelector(".theme-btn");

    if (document.body.classList.contains("dark")) {

        button.textContent = "☀️";

    } else {

        button.textContent = "🌙";

    }

}


// ===============================
// NAVEGAÇÃO
// ===============================

function scrollToSection(id) {

    const section = document.getElementById(id);

    section.scrollIntoView({
        behavior: "smooth"
    });

}


// ===============================
// CATEGORIAS
// ===============================

function showCategory(category) {

    const modal = document.getElementById("modal");

    const content = document.getElementById("modalContent");

    const messages = {

        "Cabelo": `
            <h2>💇‍♀️ Cabelo</h2>
            <p>
                Explore penteados, ideias de cuidados,
                acessórios e diferentes formas de
                expressar seu estilo através do cabelo.
            </p>
        `,

        "Maquiagem": `
            <h2>💄 Maquiagem</h2>
            <p>
                Experimente diferentes cores, técnicas
                e estilos. A maquiagem pode ser uma forma
                divertida de criatividade e expressão.
            </p>
        `,

        "Unhas": `
            <h2>💅 Unhas</h2>
            <p>
                Descubra ideias de nail art, combinações
                de cores e cuidados básicos com as unhas.
            </p>
        `,

        "Skincare": `
            <h2>🧴 Skincare</h2>
            <p>
                Uma rotina básica pode incluir limpeza,
                hidratação e proteção solar. Produtos
                devem ser escolhidos de acordo com as
                necessidades da pele.
            </p>
        `,

        "Moda": `
            <h2>👗 Moda</h2>
            <p>
                Moda é uma forma de expressão. Misture
                cores, peças e acessórios para descobrir
                combinações que façam sentido para você.
            </p>
        `,

        "Bem-estar": `
            <h2>🧘‍♀️ Bem-estar</h2>
            <p>
                Reserve momentos para descansar, fazer
                atividades que gosta e cuidar da sua
                rotina de forma equilibrada.
            </p>
        `

    };

    content.innerHTML = messages[category];

    modal.classList.add("show");

}


// ===============================
// DICAS
// ===============================

function readTip(type) {

    const modal = document.getElementById("modal");

    const content = document.getElementById("modalContent");

    const tips = {

        pele: `
            <h2>🧴 Dica para a pele</h2>
            <p>
                Uma rotina simples pode começar com
                limpeza suave, hidratação e protetor solar.
                Se algum produto causar irritação, suspenda
                o uso e procure orientação adequada.
            </p>
        `,

        cabelo: `
            <h2>💇‍♀️ Dica para os cabelos</h2>
            <p>
                Evite excesso de calor e escolha produtos
                compatíveis com as características do seu
                cabelo. Manter uma rotina simples já pode
                ajudar bastante.
            </p>
        `,

        unhas: `
            <h2>💅 Dica para as unhas</h2>
            <p>
                Mantenha as unhas limpas e evite remover
                a cutícula de forma agressiva. Dê pausas
                quando necessário entre procedimentos.
            </p>
        `

    };

    content.innerHTML = tips[type];

    modal.classList.add("show");

}


// ===============================
// MAQUIAGEM
// ===============================

function showMakeupMessage() {

    const modal = document.getElementById("modal");

    const content = document.getElementById("modalContent");

    content.innerHTML = `
        <h2>💄 Inspiração Bella</h2>

        <p>
            Que tal experimentar uma combinação de cores
            diferente hoje? Você pode começar com tons
            que gosta e ir descobrindo novas possibilidades.
        </p>

        <br>

        <p>
            ✨ Lembre-se: não existe um único jeito
            correto de se maquiar.
        </p>
    `;

    modal.classList.add("show");

}


// ===============================
// QUIZ
// ===============================

function startQuiz() {

    const modal = document.getElementById("modal");

    const content = document.getElementById("modalContent");

    content.innerHTML = `
        <h2>🌷 Quiz Bella</h2>

        <p>
            Qual tipo de estilo você gostaria de experimentar?
        </p>

        <br>

        <button onclick="quizResult('romantico')">
            🌸 Romântico
        </button>

        <br><br>

        <button onclick="quizResult('moderno')">
            🖤 Moderno
        </button>

        <br><br>

        <button onclick="quizResult('colorido')">
            🌈 Colorido
        </button>
    `;

    modal.classList.add("show");

}


function quizResult(style) {

    const content = document.getElementById("modalContent");

    const results = {

        romantico: `
            <h2>🌸 Vibe Romântica</h2>
            <p>
                Você pode experimentar tons suaves,
                detalhes delicados e acessórios florais.
            </p>
        `,

        moderno: `
            <h2>🖤 Vibe Moderna</h2>
            <p>
                Experimente combinações contemporâneas,
                peças versáteis e acessórios marcantes.
            </p>
        `,

        colorido: `
            <h2>🌈 Vibe Colorida</h2>
            <p>
                Que tal experimentar novas cores?
                Misture tons e descubra combinações
                que expressem sua criatividade.
            </p>
        `

    };

    content.innerHTML = results[style];

}


// ===============================
// NEWSLETTER
// ===============================

function subscribe() {

    const email =
        document.getElementById("email").value.trim();

    if (email === "") {

        alert("💌 Digite seu e-mail primeiro.");

        return;

    }

    if (!email.includes("@")) {

        alert("⚠️ Digite um e-mail válido.");

        return;

    }

    alert(
        "🌷 Cadastro realizado com sucesso! " +
        "Você receberá nossas novidades."
    );

    document.getElementById("email").value = "";

}


// ===============================
// FECHAR MODAL
// ===============================

function closeModal() {

    document
        .getElementById("modal")
        .classList.remove("show");

}


// FECHAR CLICANDO FORA

document
    .getElementById("modal")
    .addEventListener("click", function(event) {

        if (event.target === this) {

            closeModal();

        }

    });


// ESC FECHA O MODAL

document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {

        closeModal();

    }

});