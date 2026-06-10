// === LÓGICA FUTURISTA AVANÇADA (JAVASCRIPT) ===

// 1. EFEITO DE DIGITAÇÃO (CYBER BOOT) NO HEADER
const headerDescricao = document.querySelector('header p');
const textoOriginal = "Sistemas carregados. Entenda a função do HTML, CSS e JavaScript na construção de sites...";
headerDescricao.textContent = ""; // Limpa o texto inicial

let index = 0;
function digitarTexto() {
    if (index < textoOriginal.length) {
        headerDescricao.textContent += textoOriginal.charAt(index);
        index++;
        // Velocidade da digitação (em milissegundos)
        setTimeout(digitarTexto, 40); 
    }
}

// Inicia o efeito de digitação assim que a página carrega
window.addEventListener('DOMContentLoaded', digitarTexto);


// 2. CONTROLE DO REATOR INTERATIVO (LABORATÓRIO)
const botao = document.getElementById('botao-acao');
const caixa = document.getElementById('caixa-exemplo');
let estadoAtivo = false;

botao.addEventListener('click', function(e) {
    if (!estadoAtivo) {
        // Ativando o Reator (Mudanças estéticas e estruturais)
        caixa.style.backgroundColor = '#00f2fe';
        caixa.style.borderColor = '#ffdf00';
        caixa.style.borderRadius = '50%';
        caixa.style.transform = 'scale(1.1) rotate(360deg)';
        caixa.style.boxShadow = '0 0 30px #00f2fe, inset 0 0 15px #ffffff';
        caixa.style.color = '#0a0b10';
        
        caixa.textContent = '⚡ REATOR ATIVO ⚡';
        botao.textContent = 'Desativar Núcleo';
        botao.style.borderColor = '#ff4500';
        botao.style.color = '#ff4500';
        botao.style.boxShadow = '0 0 20px rgba(255, 69, 0, 0.4)';

        // Cria o efeito visual de fagulhas no clique
        criarParticulas(e.clientX, e.clientY);
        
        estadoAtivo = true;
    } else {
        // Resetando o Reator para o modo Neutro
        caixa.style.backgroundColor = '#1e293b';
        caixa.style.borderColor = '#475569';
        caixa.style.borderRadius = '12px';
        caixa.style.transform = 'scale(1) rotate(0deg)';
        caixa.style.boxShadow = 'inset 0 0 20px rgba(0,0,0,0.6)';
        caixa.style.color = '#94a3b8';
        
        caixa.textContent = 'Caixa Neutra';
        botao.textContent = 'Ativar JavaScript';
        botao.style.borderColor = '#00f2fe';
        botao.style.color = '#00f2fe';
        botao.style.boxShadow = '0 0 15px rgba(0, 242, 254, 0.2)';
        
        estadoAtivo = false;
    }
});

// 3. FUNÇÃO EXTRA: GERADOR DE PARTÍCULAS NEON (Efeito Sci-Fi ao clicar)
function criarParticulas(x, y) {
    for (let i = 0; i < 15; i++) {
        const particula = document.createElement('div');
        
        // Estilizando a partícula dinamicamente via JS
        particula.style.position = 'fixed';
        particula.style.left = `${x}px`;
        particula.style.top = `${y}px`;
        particula.style.width = '6px';
        particula.style.height = '6px';
        particula.style.backgroundColor = Math.random() > 0.5 ? '#00f2fe' : '#ffdf00';
        particula.style.borderRadius = '50%';
        particula.style.pointerEvents = 'none';
        particula.style.boxShadow = '0 0 10px currentColor';
        
        // Direção aleatória para a explosão da partícula
        const destinoX = (Math.random() - 0.5) * 200;
        const destinoY = (Math.random() - 0.5) * 200;
        
        document.body.appendChild(particula);
        
        // Animação da partícula usando a API de Animações do próprio JS
        const animacao = particula.animate([
            { transform: 'translate(0, 0) scale(1)', opacity: 1 },
            { transform: `translate(${destinoX}px, ${destinoY}px) scale(0)`, opacity: 0 }
        ], {
            duration: 800,
            easing: 'cubic-bezier(0.1, 0.8, 0.3, 1)'
        });
        
        // Remove a partícula do HTML após o fim da animação para não travar o site
        animacao.onfinish = () => particula.remove();
    }
}