
// ======================================
// 1. MENSAGEM DE BOAS-VINDAS
// ======================================

window.addEventListener("load", function () {
    console.log("Bem-vindo ao site Internet e Web!");

    const titulo = document.querySelector("h1");

    if (titulo) {
        titulo.setAttribute("title", "Trabalho sobre Internet e World Wide Web");
    }
});


// ======================================
// 2. MODO ESCURO
// ======================================

const botaoTema = document.createElement("button");

botaoTema.textContent = "🌙 Modo Escuro";
botaoTema.id = "botao-tema";

document.body.appendChild(botaoTema);

botaoTema.addEventListener("click", function () {

    document.body.classList.toggle("modo-escuro");

    if (document.body.classList.contains("modo-escuro")) {
        botaoTema.textContent = "☀️ Modo Claro";
    } else {
        botaoTema.textContent = "🌙 Modo Escuro";
    }

});


// ======================================
// 3. BOTÃO VOLTAR AO TOPO
// ======================================

const botaoTopo = document.createElement("button");

botaoTopo.textContent = "⬆ Voltar ao topo";
botaoTopo.id = "botao-topo";

document.body.appendChild(botaoTopo);

botaoTopo.addEventListener("click", function () {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


// ======================================
// 4. MOSTRAR OU ESCONDER BOTÃO DO TOPO
// ======================================

window.addEventListener("scroll", function () {

    if (window.scrollY > 300) {
        botaoTopo.style.display = "block";
    } else {
        botaoTopo.style.display = "none";
    }

});


// ======================================
// 5. NAVEGAÇÃO SUAVE PELO SUMÁRIO
// ======================================

const links = document.querySelectorAll(".sumario a");

links.forEach(function (link) {

    link.addEventListener("click", function (evento) {

        const destino = document.querySelector(
            link.getAttribute("href")
        );

        if (destino) {
            evento.preventDefault();

            destino.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }

    });

});


// ======================================
// 6. DESTAQUE DA SEÇÃO ATUAL
// ======================================

const secoes = document.querySelectorAll("section");

window.addEventListener("scroll", function () {

    let secaoAtual = "";

    secoes.forEach(function (secao) {

        const distancia = secao.offsetTop;

        if (window.scrollY >= distancia - 150) {
            secaoAtual = secao.getAttribute("id");
        }

    });

    links.forEach(function (link) {

        link.classList.remove("ativo");

        if (link.getAttribute("href") === "#" + secaoAtual) {
            link.classList.add("ativo");
        }

    });

});


// ======================================
// 7. ANO AUTOMÁTICO NO RODAPÉ
// ======================================

const rodape = document.querySelector("footer");

if (rodape) {

    const ano = document.createElement("p");

    ano.textContent = "© " + new Date().getFullYear();

    rodape.appendChild(ano);

}
