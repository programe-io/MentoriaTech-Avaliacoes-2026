document.addEventListener("DOMContentLoaded", () => {
    exibirAlertaBoasVindas();
    configurarMenu();
});

// Mensagem interativa e dinâmica que aparece no topo da página
function exibirAlertaBoasVindas() {
    const hora = new Date().getHours();
    let saudacao = "";

    if (hora >= 5 && hora < 12) saudacao = "Bom dia!";
    else if (hora >= 12 && hora < 18) saudacao = "Boa tarde!";
    else saudacao = "Boa noite!";

    // Cria um elemento dinâmico na tela em vez de apenas mandar no console
    const banner = document.createElement("div");
    banner.style.cssText = "background: #4a148c; color: white; text-align: center; padding: 10px; font-weight: bold;";
    banner.innerText = `🤖 ${saudacao} O futuro começou. Bem-vindo ao Universo IA!`;
    
    document.body.insertBefore(banner, document.body.firstChild);
}

// Controla a troca de classes ativas no menu de navegação
function configurarMenu() {
    const links = document.querySelectorAll("nav ul li a");

    links.forEach(link => {
        link.addEventListener("click", (evento) => {
            links.forEach(l => l.classList.remove("ativo"));
            evento.currentTarget.classList.add("ativo");
        });
    });
}
