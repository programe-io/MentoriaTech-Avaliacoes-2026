// Aguarda a página carregar completamente antes de rodar o código
document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. ESPAÇO PARA DEFINIR E SALVAR O SEU NOME
    // ==========================================
    const nomePadrao = "[Coloque Seu Nome Aqui]";
    const nomeSalvo = localStorage.getItem('blogRapunzelNome') || nomePadrao;

    // Atualiza o nome em todos os lugares da página
    function atualizarNomeNaTela(novoNome) {
        const elementosNome = document.querySelectorAll('.nome-dinamico');
        elementosNome.forEach(elemento => {
            elemento.textContent = novoNome;
        });
    }

    // Aplica o nome assim que a página abre
    atualizarNomeNaTela(nomeSalvo);

    // Botão para alterar o nome direto no blog
    const btnEditarNome = document.getElementById('btn-editar-nome');
    if (btnEditarNome) {
        btnEditarNome.addEventListener('click', () => {
            const nomeDigitado = prompt("Digite o seu nome para personalizar o blog:", nomeSalvo === nomePadrao ? "" : nomeSalvo);
            
            if (nomeDigitado && nomeDigitado.trim() !== "") {
                localStorage.setItem('blogRapunzelNome', nomeDigitado.trim());
                atualizarNomeNaTela(nomeDigitado.trim());
            }
        });
    }

    // ==========================================
    // 2. CRIAR NOVAS POSTAGENS NO DIÁRIO
    // ==========================================
    const formPost = document.getElementById('form-novo-post');
    const listaPosts = document.getElementById('lista-posts');

    if (formPost && listaPosts) {
        formPost.addEventListener('submit', (evento) => {
            evento.preventDefault(); // Evita que a página recarregue

            const titulo = document.getElementById('post-titulo').value;
            const categoria = document.getElementById('post-categoria').value || "Diário";
            const conteudo = document.getElementById('post-conteudo').value;

            // Pega a data atual formatada
            const hoje = new Date();
            const dataFormatada = hoje.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' });

            // Cria o cartão da nova postagem
            const novoArtigo = document.createElement('article');
            novoArtigo.classList.add('card');
            novoArtigo.innerHTML = `
                <span class="post-data">${dataFormatada} • ${categoria}</span>
                <h2>${titulo}</h2>
                <p>${conteudo}</p>
                <button class="btn-ler btn-curtir">☀️ Iluminar Post (<span class="contador-luz">0</span>)</button>
            `;

            // Adiciona a nova postagem no topo do blog
            listaPosts.prepend(novoArtigo);

            // Limpa os campos do formulário
            formPost.reset();
            soltarLanternaExtra(); // Solta uma lanterna comemorativa!
        });
    }

    // ==========================================
    // 3. BOTÃO DE CURTIR ("ILUMINAR POST")
    // ==========================================
    document.addEventListener('click', (evento) => {
        if (evento.target.classList.contains('btn-curtir') || evento.target.parentElement.classList.contains('btn-curtir')) {
            const botao = evento.target.classList.contains('btn-curtir') ? evento.target : evento.target.parentElement;
            const spanContador = botao.querySelector('.contador-luz');
            let curtidas = parseInt(spanContador.textContent);
            spanContador.textContent = curtidas + 1;
            soltarLanternaExtra();
        }
    });

    // ==========================================
    // 4. SOLTAR LANTERNAS MÁGICAS EXTRAS
    // ==========================================
    const containerLanternas = document.querySelector('.lanternas');
    const btnSoltarLanterna = document.getElementById('btn-soltar-lanterna');

    function soltarLanternaExtra() {
        if (!containerLanternas) return;

        const novaLanterna = document.createElement('div');
        novaLanterna.classList.add('lanterna');
        
        // Posição e tamanho aleatórios
        novaLanterna.style.left = Math.random() * 90 + 5 + '%';
        novaLanterna.style.animationDuration = (Math.random() * 6 + 8) + 's';
        novaLanterna.style.width = '14px';
        novaLanterna.style.height = '20px';

        containerLanternas.appendChild(novaLanterna);

        // Remove a lanterna depois que ela subir para não pesar o navegador
        setTimeout(() => {
            novaLanterna.remove();
        }, 14000);
    }

    if (btnSoltarLanterna) {
        btnSoltarLanterna.addEventListener('click', () => {
            for (let i = 0; i < 5; i++) {
                setTimeout(soltarLanternaExtra, i * 300);
            }
        });
    }
});
