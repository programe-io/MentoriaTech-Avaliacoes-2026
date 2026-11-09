// ==========================================
// 1. SISTEMA DE DIALOGAR E PUBLICAR UM NOVO POST
// ==========================================
const btnPublicar = document.querySelector('.new-post-card button');
const feedContainer = document.querySelector('main');

btnPublicar.addEventListener('click', () => {
    // Solicita o texto ao usuário através de uma caixa de diálogo do navegador
    const textoPost = prompt("O que você está pensando?");
    
    // Valida se o usuário escreveu algo e não apenas cancelou a janela
    if (textoPost && textoPost.trim() !== "") {
        // Cria o elemento article para a nova postagem
        const novoPost = document.createElement('article');
        novoPost.classList.add('post-card');
        
        // Define a estrutura HTML idêntica à do projeto
        novoPost.innerHTML = `
            <div class="post-header">
                <div class="avatar">U</div>
                <div class="user-info">
                    <strong>Seu Nome</strong>
                    <span>agora mesmo</span>
                </div>
            </div>
            
            <div class="post-text">
                <p>${textoPost}</p>
            </div>

            <div class="post-actions">
                <button class="btn-curtir">Curtir (0)</button>
                <button class="btn-comentar">Comentar</button>
            </div>
            <div class="comments-section" style="margin-top: 10px; display: flex; flex-direction: column; gap: 5px;"></div>
        `;
        
        // Adiciona os eventos de curtir e comentar especificamente para este novo post criado
        configurarEventosPost(novoPost);

        // Insere o novo post logo após o card de publicação (segundo elemento do main)
        const cardPublicacao = document.querySelector('.new-post-card');
        cardPublicacao.after(novoPost);
    }
});

// ==========================================
// 2. FUNÇÃO PARA GERENCIAR AS INTERAÇÕES DOS POSTS
// ==========================================
function configurarEventosPost(postElement) {
    const btnCurtir = postElement.querySelector('.btn-curtir') || postElement.querySelectorAll('.post-actions button')[0];
    const btnComentar = postElement.querySelector('.btn-comentar') || postElement.querySelectorAll('.post-actions button')[1];
    
    // Garante que as classes corretas existam para identificação posterior
    if(btnCurtir) btnCurtir.classList.add('btn-curtir');
    if(btnComentar) btnComentar.classList.add('btn-comentar');

    let curtidas = 0;
    let jaCurtido = false;

    // Ação de Curtir
    if (btnCurtir) {
        // Inicializa o texto padrão com contador zerado caso não venha do HTML
        if (!btnCurtir.textContent.includes('(')) {
            btnCurtir.textContent = `Curtir (0)`;
        }

        btnCurtir.addEventListener('click', () => {
            if (!jaCurtido) {
                curtidas++;
                btnCurtir.textContent = `Curtido (${curtidas})`;
                btnCurtir.style.backgroundColor = '#1877f2'; // Fica azul ao curtir
                btnCurtir.style.color = '#ffffff';
                jaCurtido = true;
            } else {
                curtidas--;
                btnCurtir.textContent = `Curtir (${curtidas})`;
                btnCurtir.style.backgroundColor = '#f0f2f5'; // Retorna à cor padrão
                btnCurtir.style.color = '#65676b';
                jaCurtido = false;
            }
        });
    }

    // Ação de Comentar
    if (btnComentar) {
        btnComentar.addEventListener('click', () => {
            const textoComentario = prompt("Digite seu comentário:");
            
            if (textoComentario && textoComentario.trim() !== "") {
                // Cria ou localiza uma área para agrupar os comentários dentro do card do post
                let secaoComentarios = postElement.querySelector('.comments-section');
                if (!secaoComentarios) {
                    secaoComentarios = document.createElement('div');
                    secaoComentarios.classList.add('comments-section');
                    secaoComentarios.style.marginTop = "12px";
                    secaoComentarios.style.paddingTop = "12px";
                    secaoComentarios.style.borderTop = "1px dashed #e4e6eb";
                    secaoComentarios.style.display = "flex";
                    secaoComentarios.style.flexDirection = "column";
                    secaoComentarios.style.gap = "8px";
                    postElement.appendChild(secaoComentarios);
                }

                // Cria a estrutura visual do comentário adicionado
                const novoComentario = document.createElement('div');
                novoComentario.style.backgroundColor = "#f0f2f5";
                novoComentario.style.padding = "8px 12px";
                novoComentario.style.borderRadius = "12px";
                novoComentario.style.fontSize = "14px";
                novoComentario.innerHTML = `<strong>Você:</strong> ${textoComentario}`;

                secaoComentarios.appendChild(novoComentario);
            }
        });
    }
}

// ==========================================
// 3. INICIALIZAÇÃO NOS POSTS EXISTENTES DO HTML
// ==========================================
// Aplica as regras de cliques para todos os artigos que já vieram prontos no HTML inicial
document.querySelectorAll('.post-card').forEach(post => {
    configurarEventosPost(post);
});
