/**
 * Alterna dinamicamente a identidade visual do Mini Feed aplicando classes
 * baseadas no perfil do personagem escolhido.
 */
function mudarTema(nomePersonagem) {
    const corpoPagina = document.body;
    const temasDisponiveis = ['tema-monica', 'tema-cebolinha', 'tema-magali', 'tema-cascao'];
    
    // Remove os temas antigos
    temasDisponiveis.forEach(tema => corpoPagina.classList.remove(tema));
    
    // Insere o novo tema selecionado
    corpoPagina.classList.add(`tema-${nomePersonagem}`);
    
    // Sincroniza o estado ativo dos botões seletores
    const botoes = document.querySelectorAll('.btn-personagem');
    botoes.forEach(b => b.classList.remove('active'));
    
    const botaoAtivo = document.querySelector(`.btn-personagem.${nomePersonagem}`);
    if (botaoAtivo) {
        botaoAtivo.classList.add('active');
    }
}

// Mecânica de contagem de caracteres em tempo real na caixa de texto
const campoTexto = document.getElementById('texto-post');
const contador = document.getElementById('contador-caracteres');

if (campoTexto && contador) {
    campoTexto.addEventListener('input', function() {
        const total = this.value.length;
        contador.textContent = `${total} caractere${total === 1 ? '' : 's'}`;
    });
}

// Envio dinâmico do formulário para gerar novos itens no feed
const formulario = document.getElementById('form-post');
const containerFeed = document.getElementById('feed-container');

if (formulario && containerFeed) {
    formulario.addEventListener('submit', function(evento) {
        evento.preventDefault(); // Impede o recarregamento clássico da página
        
        const mensagem = campoTexto.value.trim();
        if (mensagem === '') return;

        // Captura o nome do personagem ativo no momento para rotular o autor do post
        let nomeAutor = "Mônica";
        if (document.body.classList.contains('tema-cebolinha')) nomeAutor = "Cebolinha";
        if (document.body.classList.contains('tema-magali')) nomeAutor = "Magali";
        if (document.body.classList.contains('tema-cascao')) nomeAutor = "Cascão";

        // Cria o elemento estrutural da publicação
        const novoCard = document.createElement('article');
        novoCard.className = 'card-feed';
        
        // Monta o template interno com emojis temáticos
        novoCard.innerHTML = `
            <div class="avatar-perfil usuario">💬</div>
            <div class="conteudo-feed">
                <div class="topo-post">
                    <h3>${nomeAutor} (Você)</h3>
                    <span class="data-post">Agora mesmo</span>
                </div>
                <p class="texto-feed">${mensagem}</p>
                <div class="reacoes-box">
                    <button class="btn-reacao" onclick="curtirPost(this)">❤️ <span>0</span></button>
                    <button class="btn-reacao" onclick="comentarPost(this)">💬 Comentar</button>
                </div>
            </div>
        `;
        
        // Adiciona a nova publicação no topo do feed do Limoeiro
        containerFeed.insertBefore(novoCard, containerFeed.firstChild);
        
        // Limpa o formulário e reseta o contador de caracteres
        formulario.reset();
        contador.textContent = '0 caracteres';
    });
}

/**
 * Função interativa acionada ao clicar no botão de curtir de qualquer publicação.
 */
function curtirPost(botao) {
    const contadorSpan = botao.querySelector('span');
    let totalCurtidas = parseInt(contadorSpan.textContent, 10);
    
    // Incrementa a curtida de forma simples e direta
    totalCurtidas++;
    contadorSpan.textContent = totalCurtidas;
    
    // Adiciona uma animação rápida no botão de coração
    botao.style.transform = 'scale(1.2)';
    setTimeout(() => {
        botao.style.transform = 'scale(1)';
    }, 150);
}

/**
 * Função simples para simular abertura de caixas de comentários.
 */
function comentarPost(botao) {
    alert("Recurso de resposta em desenvolvimento pela Turma! 📝");
}
