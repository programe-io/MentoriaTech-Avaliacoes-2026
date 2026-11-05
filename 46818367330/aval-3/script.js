document.addEventListener("DOMContentLoaded", () => {
    inicializarFeed();
});

function inicializarFeed() {
    // Seleciona todos os cards de postagem na página
    const postagens = document.querySelectorAll(".post-card");

    postagens.forEach((postagem) => {
        configurarCurtidas(postagem);
        configurarFavorito(postagem);
        configurarComentarios(postagem);
    });
}

/**
 * 5 e 6. Gerencia o sistema de curtidas (Clique no ícone e duplo clique na imagem)
 */
function configurarCurtidas(postagem) {
    const botaoCurtir = postagem.querySelector(".left-actions button:first-child");
    const iconeCurtir = botaoCurtir.querySelector("i");
    const containerImagem = postagem.querySelector(".post-image-container");
    const textoCurtidas = postagem.querySelector(".likes-count");

    let curtido = false;

    // Função interna para alternar o estado de curtido
    function alternarCurtida() {
        curtido = !curtido;

        if (curtido) {
            iconeCurtir.className = "bx bxs-heart"; // Ícone preenchido
            botaoCurtir.style.color = "#ef4444";   // Cor vermelha
            textoCurtidas.textContent = "1.001 curtidas"; // Simulação de incremento
        } else {
            iconeCurtir.className = "bx bx-heart";  // Ícone de linha
            botaoCurtir.style.color = "";          // Reseta cor padrão
            textoCurtidas.textContent = "mil e poucas curtidas";
        }
    }

    // Evento 1: Clique no ícone de coração
    botaoCurtir.addEventListener("click", alternarCurtida);

    // Evento 2: Duplo clique na imagem principal da postagem (Like do Instagram)
    containerImagem.addEventListener("dblclick", () => {
        // Se ainda não estiver curtido, curte a postagem
        if (!curtido) {
            alternarCurtida();
        }

        // Criar animação visual do coração surgindo no meio da imagem
        const coracaoAnimado = document.createElement("i");
        coracaoAnimado.className = "bx bxs-heart coracao-animado-central";
        
        // Estilização dinâmica via JS para garantir o posicionamento centralizado
        Object.assign(coracaoAnimado.style, {
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%) scale(0)",
            fontSize: "5rem",
            color: "#ffffff",
            opacity: "0.9",
            transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
            pointerEvents: "none"
        });

        containerImagem.appendChild(coracaoAnimado);

        // Dispara a animação (Surgir -> Sumir)
        setTimeout(() => {
            coracaoAnimado.style.transform = "translate(-50%, -50%) scale(1.2)";
        }, 10);

        setTimeout(() => {
            coracaoAnimado.style.opacity = "0";
            coracaoAnimado.style.transform = "translate(-50%, -50%) scale(0.5)";
        }, 500);

        // Remove o elemento criado após o fim da animação
        setTimeout(() => {
            coracaoAnimado.remove();
        }, 900);
    });
}

/**
 * 5. Gerencia o botão de salvar/favoritar postagem
 */
function configurarFavorito(postagem) {
    const botaoSalvar = postagem.querySelector(".interaction-bar > button");
    const iconeSalvar = botaoSalvar.querySelector("i");
    
    let salvo = false;

    botaoSalvar.addEventListener("click", () => {
        salvo = !salvo;
        if (salvo) {
            iconeSalvar.className = "bx bxs-bookmark"; // Ícone preenchido
        } else {
            iconeSalvar.className = "bx bx-bookmark";  // Ícone de linha
        }
    });
}

/**
 * 7. Gerencia a inserção e fluxo de novos comentários
 */
function configurarComentarios(postagem) {
    const postBody = postagem.querySelector(".post-body");
    const botaoVerComentarios = postagem.querySelector(".view-comments-btn");

    // Cria dinamicamente um mini-formulário de comentários abaixo da postagem
    const formComentario = document.createElement("div");
    formComentario.className = "comment-form-container";
    
    Object.assign(formComentario.style, {
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        marginTop: "0.75rem",
        borderTop: "1px solid var(--border-color)",
        paddingTop: "0.75rem"
    });

    formComentario.innerHTML = `
        <input type="text" placeholder="Adicione um comentário..." class="new-comment-input" style="flex: 1; font-size: 0.875rem; border: none; outline: none; background: transparent;">
        <button class="submit-comment-btn" style="font-size: 0.875rem; font-weight: 600; color: var(--blue-link); opacity: 0.5; pointer-events: none; transition: opacity 0.2s;">Publicar</button>
    `;

    postBody.appendChild(formComentario);

    const input = formComentario.querySelector(".new-comment-input");
    const botaoPublicar = formComentario.querySelector(".submit-comment-btn");

    // Habilita/desabilita o botão conforme o usuário digita text
    input.addEventListener("input", () => {
        if (input.value.trim().length > 0) {
            botaoPublicar.style.opacity = "1";
            botaoPublicar.style.pointerEvents = "auto";
        } else {
            botaoPublicar.style.opacity = "0.5";
            botaoPublicar.style.pointerEvents = "none";
        }
    });

    // Envia o comentário ao clicar em "Publicar"
    function enviarComentario() {
        const texto = input.value.trim();
        if (!texto) return;

        // Cria o novo parágrafo do comentário imitanto a estrutura do HTML
        const novoComentario = document.createElement("p");
        novoComentario.style.fontSize = "0.875rem";
        novoComentario.style.marginTop = "0.25rem";
        novoComentario.innerHTML = `
            <span style="font-weight: 600; margin-right: 0.5rem;">voce_dev</span>
            <span style="opacity: 0.9;">${texto}</span>
        `;

        // Insere o comentário logo acima do botão "Ver todos os comentários"
        postBody.insertBefore(novoComentario, botaoVerComentarios);

        // Limpa o campo e reseta o botão
        input.value = "";
        botaoPublicar.style.opacity = "0.5";
        botaoPublicar.style.pointerEvents = "none";
    }

    botaoPublicar.addEventListener("click", enviarComentario);

    // Também envia se pressionar a tecla Enter dentro do campo
    input.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            enviarComentario();
        }
    });
}
