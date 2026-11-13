// Aguarda o carregamento completo do HTML antes de executar o script
document.addEventListener("DOMContentLoaded", () => {

    // 1. BOTÃO DE CURTIR EM CADA POST
    const posts = document.querySelectorAll(".post");

    posts.forEach((post) => {
        // Cria um botão dinamicamente
        const btnCurtir = document.createElement("button");
        let curtidas = 0;
        btnCurtir.textContent = `👍 Curtir (${curtidas})`;
        btnCurtir.style.marginTop = "15px";
        btnCurtir.style.padding = "8px 14px";
        btnCurtir.style.cursor = "pointer";
        btnCurtir.style.border = "none";
        btnCurtir.style.borderRadius = "5px";
        btnCurtir.style.backgroundColor = "#2980b9";
        btnCurtir.style.color = "#ffffff";

        // Adiciona o evento de clique para incrementar curtidas
        btnCurtir.addEventListener("click", () => {
            curtidas++;
            btnCurtir.textContent = `👍 Curtido (${curtidas})`;
            btnCurtir.style.backgroundColor = "#27ae60";
        });

        post.appendChild(btnCurtir);
    });

    // 2. BOTÃO DE MODO ESCURO (DARK MODE) NO CABEÇALHO
    const cabecalho = document.querySelector(".cabecalho");
    const btnTema = document.createElement("button");
    btnTema.textContent = "🌙 Alternar Tema";
    btnTema.style.marginTop = "15px";
    btnTema.style.padding = "6px 12px";
    btnTema.style.cursor = "pointer";
    btnTema.style.borderRadius = "5px";
    btnTema.style.border = "none";

    let modoEscuro = false;

    btnTema.addEventListener("click", () => {
        modoEscuro = !modoEscuro;
        if (modoEscuro) {
            document.body.style.backgroundColor = "#1a1a1a";
            document.body.style.color = "#f4f6f8";
            document.querySelectorAll(".post, .widget").forEach(card => {
                card.style.backgroundColor = "#2c2c2c";
                card.style.color = "#ffffff";
            });
            btnTema.textContent = "☀️ Modo Claro";
        } else {
            document.body.style.backgroundColor = "#f4f6f8";
            document.body.style.color = "#333333";
            document.querySelectorAll(".post, .widget").forEach(card => {
                card.style.backgroundColor = "#ffffff";
                card.style.color = "#333333";
            });
            btnTema.textContent = "🌙 Modo Escuro";
        }
    });

    cabecalho.appendChild(btnTema);

    // 3. MENSAGEM DE BOAS-VINDAS INTERATIVA NOS LINKS DE CATEGORIA
    const linksCategorias = document.querySelectorAll(".widget ul li a");

    linksCategorias.forEach((link) => {
        link.addEventListener("click", (evento) => {
            evento.preventDefault(); // Evita que a página recarregue
            const categoria = link.textContent;
            alert(`Você selecionou a categoria: ${categoria}`);
        });
    });

});
