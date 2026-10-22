document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Controle de Leitura dos Artigos (Exibe janela flutuante com detalhes)
    const botoesLeitura = document.querySelectorAll(".ler-post-btn");

    botoesLeitura.forEach(botao => {
        botao.addEventListener("click", (e) => {
            const postId = e.target.getAttribute("data-id");
            let mensagem = "";

            if (postId === "destaque") {
                mensagem = "Carregando dossiê de Patentes da IA da Rockstar...\n\nSistemas de rotas complexas de NPCs carregados com sucesso!";
            } else if (postId === "post-inventario") {
                mensagem = "Exibindo detalhes do inventário tático:\n\n- Slot de Pistola no coldre\n- Armas pesadas armazenadas na mala da mala do carro.";
            } else {
                mensagem = "Acessando banco de imagens de satélite do Estado de Leonida...";
            }

            alert(`[SISTEMA VICE CHRONICLE]\n\n${mensagem}`);
        });
    });

    // 2. Sistema de Envio de Comentários Dinâmico
    const formComentario = document.getElementById("comment-form");
    const containerComentarios = document.getElementById("comments-container");

    formComentario.addEventListener("submit", (evento) => {
        evento.preventDefault(); // Impede o site de atualizar a página

        const inputNome = document.getElementById("comment-name").value;
        const inputTexto = document.getElementById("comment-text").value;

        // Criando o elemento html do novo comentário na tela
        const novaCaixaComentario = document.createElement("div");
        novaCaixaComentario.classList.add("comment-box");
        novaCaixaComentario.innerHTML = `
            <strong>${inputNome}:</strong>
            <p>${inputTexto}</p>
        `;

        // Adicionando o comentário ao topo da lista de discussões
        containerComentarios.prepend(novaCaixaComentario);

        // Limpando o formulário para a próxima mensagem
        formComentario.reset();
    });
});