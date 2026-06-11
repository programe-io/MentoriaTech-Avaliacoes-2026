// ==========================================
// 1. EFEITO MÁQUINA DE ESCREVER NO SUBTÍTULO
// ==========================================
function typewriterEffect(element, text, speed = 40) {
    let i = 0;
    element.innerHTML = ""; // Limpa o texto original
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// ==========================================
// 2. SISTEMA DE ABAS INTERATIVAS (TABS)
// ==========================================
function setupTabs() {
    const container = document.querySelector('.container');
    const sections = container.querySelectorAll('section');
    
    // Cria a barra de menu das abas
    const tabMenu = document.createElement('div');
    tabMenu.className = 'tab-menu';
    
    // Estilização básica do menu de abas via JS para não quebrar o layout
    tabMenu.style.display = 'flex';
    tabMenu.style.flexWrap = 'wrap';
    tabMenu.style.gap = '10px';
    tabMenu.style.marginBottom = '30px';
    tabMenu.style.justifyContent = 'center';
    
    // Injeta a barra de abas antes das seções
    container.insertBefore(tabMenu, sections[0]);
    
    sections.forEach((section, index) => {
        // Pega o título de cada seção para ser o nome do botão
        const sectionTitle = section.querySelector('h2').textContent.replace('?', '');
        
        const button = document.createElement('button');
        button.textContent = sectionTitle;
        button.className = 'tab-button';
        
        // Estilo dos botões
        Object.assign(button.style, {
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid #1e293b',
            color: '#718096',
            padding: '10px 20px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '0.9rem',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            transition: 'all 0.3s ease'
        });
        
        // Evento de clique para alternar as abas
        button.addEventListener('click', () => {
            // Desativa todos os botões e esconde as seções
            document.querySelectorAll('.tab-button').forEach(btn => {
                btn.style.borderColor = '#1e293b';
                btn.style.color = '#718096';
                btn.style.background = 'rgba(255, 255, 255, 0.03)';
                btn.style.boxShadow = 'none';
            });
            
            sections.forEach(sec => {
                sec.style.display = 'none';
                sec.style.opacity = '0';
            });
            
            // Ativa o botão clicado (Estilo Neon)
            button.style.borderColor = '#00f6ff';
            button.style.color = '#fff';
            button.style.background = 'rgba(0, 246, 255, 0.05)';
            button.style.boxShadow = '0 0 15px rgba(0, 246, 255, 0.2)';
            
            // Mostra a seção correspondente com efeito suave
            section.style.display = 'block';
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transition = 'opacity 0.5s ease';
            }, 10);
        });
        
        tabMenu.appendChild(button);
        
        // Inicialização: Deixa apenas a primeira aba visível
        if (index !== 0) {
            section.style.display = 'none';
        } else {
            // Simula o clique no primeiro botão para iniciar ativo
            setTimeout(() => button.click(), 100);
        }
    });
}

// ==========================================
// 3. INICIALIZAÇÃO DO SCRIPT
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    // Dispara a máquina de escrever no parágrafo do Header
    const headerDesc = document.querySelector('header p');
    if (headerDesc) {
        const originalText = headerDesc.textContent;
        typewriterEffect(headerDesc, originalText, 30);
    }
    
    // Transforma o site em um sistema de abas dinâmico
    setupTabs();
});