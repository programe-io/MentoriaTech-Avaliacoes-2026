// SCROLL SUAVE NOS LINKS DO MENU
document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", function(e) {
        e.preventDefault();

        const targetId = this.getAttribute("href");
        const target = document.querySelector(targetId);

        target.scrollIntoView({
            behavior: "smooth"
        });
    });
});


// ANIMAÇÃO AO APARECER NA TELA
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
});

document.querySelectorAll(".card").forEach(card => {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    card.style.transition = "0.6s";

    observer.observe(card);
});


// VALIDAÇÃO DO FORMULÁRIO
function enviarFormulario(event) {
    event.preventDefault();

    const inputs = document.querySelectorAll("#contato input, #contato textarea");
    let valido = true;

    inputs.forEach(input => {
        if (input.value.trim() === "") {
            input.style.border = "1px solid red";
            valido = false;
        } else {
            input.style.border = "1px solid #ccc";
        }
    });

    if (valido) {
        alert("Mensagem enviada com sucesso!");
    } else {
        alert("Preencha todos os campos!");
    }
}


// BOTÃO VOLTAR AO TOPO
const btnTopo = document.createElement("button");
btnTopo.innerText = "↑";
btnTopo.style.position = "fixed";
btnTopo.style.bottom = "20px";
btnTopo.style.right = "20px";
btnTopo.style.display = "none";
btnTopo.style.padding = "10px 15px";
btnTopo.style.borderRadius = "50%";
btnTopo.style.background = "#333";
btnTopo.style.color = "#fff";

document.body.appendChild(btnTopo);

window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        btnTopo.style.display = "block";
    } else {
        btnTopo.style.display = "none";
    }
});

btnTopo.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});


// MODO ESCURO
const btnDark = document.createElement("button");
btnDark.innerText = "🌙";
btnDark.style.position = "fixed";
btnDark.style.bottom = "70px";
btnDark.style.right = "20px";

document.body.appendChild(btnDark);

let darkMode = false;

btnDark.addEventListener("click", () => {
    darkMode = !darkMode;

    if (darkMode) {
        document.body.style.background = "#121212";
        document.body.style.color = "#fff";

        document.querySelectorAll(".card").forEach(card => {
            card.style.background = "#1e1e1e";
        });
    } else {
        document.body.style.background = "#f4f4f4";
        document.body.style.color = "#000";

        document.querySelectorAll(".card").forEach(card => {
            card.style.background = "#fff";
        });
    }
});


// DESTACAR LINK ATIVO NO MENU
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;

        if (scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.style.color = "white";

        if (link.getAttribute("href") === "#" + current) {
            link.style.color = "yellow";
        }
    });
});