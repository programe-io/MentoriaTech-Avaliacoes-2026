// --- SELEÇÃO DE ELEMENTOS DO DOM (HTML) ---
// Captura o player de áudio principal
const audioPlayer = document.getElementById('main-audio');

// Captura os campos de texto do player em destaque
const currentTitle = document.getElementById('current-title');
const currentDescription = document.getElementById('current-description');

// Captura todos os botões "Ouvir" da lista de episódios
const playButtons = document.querySelectorAll('.play-btn');

// --- LÓGICA DE REPRODUÇÃO ---
// Cria um loop que adiciona o evento de clique em cada um dos botões encontrados
playButtons.forEach(button => {
    button.addEventListener('click', function() {
        
        // 1. Coleta as informações do episódio guardadas nos atributos 'data-' do botão clicado
        const audioSrc = this.getAttribute('data-src');
        const epTitle = this.getAttribute('data-title');
        const epDesc = this.getAttribute('data-desc');

        // 2. Atualiza o player principal com o arquivo de áudio correto
        audioPlayer.src = audioSrc;

        // 3. Atualiza os textos da tela para mostrar o que está tocando
        currentTitle.textContent = epTitle;
        currentDescription.textContent = epDesc;

        // 4. Inicia a reprodução do áudio automaticamente
        audioPlayer.play();

        // 5. Faz a tela rolar suavemente para o player em destaque (bom para celulares)
        document.querySelector('.featured-player').scrollIntoView({ 
            behavior: 'smooth' 
        });
        
    });
});