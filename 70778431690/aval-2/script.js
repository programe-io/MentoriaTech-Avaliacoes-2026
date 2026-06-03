// ================================
// ROLAGEM SUAVE
// ================================

document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", function(e) {
        e.preventDefault();

        const alvo = document.querySelector(this.getAttribute("href"));

        if(alvo){
            alvo.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
});

// ================================
// FORMULÁRIO DE CONTATO
// ================================

const formulario = document.querySelector("form");

if(formulario){

    formulario.addEventListener("submit", function(e){

        e.preventDefault();

        const nome = this.querySelector('input[type="text"]').value.trim();
        const email = this.querySelector('input[type="email"]').value.trim();

        if(nome === "" || email === ""){
            alert("Preencha todos os campos obrigatórios.");
            return;
        }

        alert("Mensagem enviada com sucesso!");

        this.reset();

    });

}

// ================================
// BOTÃO VOLTAR AO TOPO
// ================================

const botaoTopo = document.createElement("button");

botaoTopo.innerHTML = "↑";
botaoTopo.id = "topoBtn";

document.body.appendChild(botaoTopo);

Object.assign(botaoTopo.style, {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    width: "50px",
    height: "50px",
    border: "none",
    borderRadius: "50%",
    background: "#ff4444",
    color: "#fff",
    fontSize: "24px",
    cursor: "pointer",
    display: "none",
    zIndex: "999"
});

window.addEventListener("scroll", () => {

    if(window.scrollY > 300){
        botaoTopo.style.display = "block";
    }else{
        botaoTopo.style.display = "none";
    }

});

botaoTopo.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});

// ================================
// ANIMAÇÃO AO ROLAR
// ================================

const elementos = document.querySelectorAll(
    ".video-card, .about, .contact"
);

const observador = new IntersectionObserver((entradas) => {

    entradas.forEach((entrada) => {

        if(entrada.isIntersecting){

            entrada.target.style.opacity = "1";
            entrada.target.style.transform = "translateY(0)";

        }

    });

}, {
    threshold: 0.2
});

elementos.forEach((elemento) => {

    elemento.style.opacity = "0";
    elemento.style.transform = "translateY(30px)";
    elemento.style.transition = "all 0.6s ease";

    observador.observe(elemento);

});

// ================================
// CONTADOR DE VISITAS LOCAL
// ================================

let visitas = localStorage.getItem("visitas");

if(!visitas){
    visitas = 0;
}

visitas++;

localStorage.setItem("visitas", visitas);

const contador = document.createElement("div");

contador.innerHTML = `👀 Visitas: ${visitas}`;

Object.assign(contador.style, {
    position: "fixed",
    top: "90px",
    right: "20px",
    background: "#111",
    color: "#fff",
    padding: "10px 15px",
    borderRadius: "10px",
    zIndex: "999"
});

document.body.appendChild(contador);

// ================================
// DATA ATUAL NO RODAPÉ
// ================================

const footer = document.querySelector("footer");

if(footer){

    const data = new Date();

    const info = document.createElement("p");

    info.innerHTML =
        `Atualizado em ${data.toLocaleDateString('pt-BR')}`;

    footer.appendChild(info);

}