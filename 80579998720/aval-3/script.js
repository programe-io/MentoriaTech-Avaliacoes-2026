
/* =================================
   MUNDO DOS CURSOS - JAVASCRIPT
================================= */

// 1. PESQUISA DE CURSOS
function filtrarCursos() {
    const pesquisa = document
        .getElementById("pesquisa")
        .value.toLowerCase();

    const cursos = document.querySelectorAll(".card");

    cursos.forEach(curso => {
        const nome = curso.innerText.toLowerCase();

        if (nome.includes(pesquisa)) {
            curso.style.display = "block";
        } else {
            curso.style.display = "none";
        }
    });
}

// 2. BOTÃO EXPLORAR CURSOS
function explorarCursos() {
    document.getElementById("cursos").scrollIntoView({
        behavior: "smooth"
    });
}

// 3. FILTRAR CURSOS POR CATEGORIA
function filtrarCategoria(categoria) {
    const cursos = document.querySelectorAll(".card");

    cursos.forEach(curso => {
        const texto = curso.innerText.toLowerCase();

        if (
            categoria === "todos" ||
            texto.includes(categoria.toLowerCase())
        ) {
            curso.style.display = "block";
        } else {
            curso.style.display = "none";
        }
    });

    document.getElementById("cursos").scrollIntoView({
        behavior: "smooth"
    });
}

// 4. MENSAGEM AO ACESSAR UM CURSO
function acessarCurso(nome, link) {
    if (link && link !== "#") {
        window.open(link, "_blank", "noopener,noreferrer");
    } else {
        alert(
            "O curso " + nome +
            " ainda não possui um link cadastrado."
        );
    }
}

// 5. ANO AUTOMÁTICO NO RODAPÉ
const ano = document.getElementById("ano");

if (ano) {
    ano.textContent = new Date().getFullYear();
}

// 6. ANIMAÇÃO DOS CARDS
const observador = new IntersectionObserver(
    entradas => {
        entradas.forEach(entrada => {
            if (entrada.isIntersecting) {
                entrada.target.classList.add("mostrar");
            }
        });
    },
    { threshold: 0.1 }
);

document.querySelectorAll(".card").forEach(card => {
    observador.observe(card);
});

// 7. MENSAGEM DE BOAS-VINDAS
console.log(
    "Bem-vindo ao Mundo dos Cursos! 🌎"
);
