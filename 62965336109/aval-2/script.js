// Aguarda o carregamento da página
document.addEventListener("DOMContentLoaded", function () {

    console.log("Site carregado com sucesso!");

    // ===== MENU ATIVO =====
    const links = document.querySelectorAll("nav a");

    links.forEach(link => {
        link.addEventListener("click", function () {
            links.forEach(l => l.classList.remove("ativo"));
            this.classList.add("ativo");
        });
    });

    // ===== BOTÃO COM ALERTA =====
    const botao = document.createElement("button");
    botao.textContent = "Clique aqui";
    document.body.appendChild(botao);

    botao.addEventListener("click", function () {
        alert("Você clicou no botão!");
    });

    // ===== ALTERAR TEXTO DO ARTIGO =====
    const artigo = document.querySelector("article");

    if (artigo) {
        const novoParagrafo = document.createElement("p");
        novoParagrafo.textContent = "Este texto foi adicionado com JavaScript!";
        artigo.appendChild(novoParagrafo);
    }

    // ===== MODO ESCURO =====
    const botaoTema = document.createElement("button");
    botaoTema.textContent = "Modo Escuro";
    document.body.appendChild(botaoTema);

    botaoTema.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");
    });

    // ===== RELÓGIO NA TELA =====
    const relogio = document.createElement("p");
    document.body.appendChild(relogio);

    function atualizarRelogio() {
        const agora = new Date();
        relogio.textContent = "Hora atual: " + agora.toLocaleTimeString();
    }

    setInterval(atualizarRelogio, 1000);

});