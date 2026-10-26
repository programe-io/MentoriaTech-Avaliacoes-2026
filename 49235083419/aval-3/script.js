// --- CONFIGURAÇÃO DE INTERATIVIDADE DO POST DE PROPÓSITO ---

// 1. Banco de ideias/frases sobre tecnologia e impacto social
const metasSociais = [
    "Apoiar o Colégio Modestina Bezerra criando um clube de programação gratuito.",
    "Desenvolver aplicativos acessíveis para ONGs locais de Teresina.",
    "Criar sistemas que ajudem a organizar a distribuição de alimentos e doações.",
    "Mentorar novos estudantes de escolas públicas que querem entrar para a TI."
];

// 2. Função para sortear uma nova meta social na tela
function sortearMetaSocial() {
    const elementoTexto = document.getElementById('texto-meta-dinamica');
    if (!elementoTexto) return;

    // Escolhe um item aleatório da lista
    const indiceAleatorio = Math.floor(Math.random() * metasSociais.length);
    const metaEscolhida = metasSociais[indiceAleatorio];

    // Aplica um efeito suave de troca de texto
    elementoTexto.style.opacity = '0';
    setTimeout(() => {
        elementoTexto.innerHTML = `<strong>💡 Próximo Passo:</strong> ${metaEscolhida}`;
        elementoTexto.style.opacity = '1';
    }, 200);
}

// 3. Sistema de Reação (Contador de Corações) usando LocalStorage
function gerenciarReacoesProposito() {
    const btnApoiar = document.getElementById('btn-apoiar-causa');
    const contadorTexto = document.getElementById('contador-apoio');
    if (!btnApoiar || !contadorTexto) return;

    // Recupera os apoios já salvos ou começa em 12 (para não começar do zero)
    let totalApoios = parseInt(localStorage.getItem('apoiosCausa')) || 12;
    contadorTexto.innerText = totalApoios;

    btnApoiar.addEventListener('click', () => {
        totalApoios++;
        localStorage.setItem('apoiosCausa', totalApoios);
        contadorTexto.innerText = totalApoios;

        // Efeito visual rápido de pulo no botão
        btnApoiar.style.transform = 'scale(1.2)';
        setTimeout(() => btnApoiar.style.transform = 'scale(1)', 150);
    });
}

// Inicializa as funções assim que a página estiver carregada
document.addEventListener('DOMContentLoaded', () => {
    gerenciarReacoesProposito();
    
    // Adiciona o evento de clique no botão de sortear metas (se você optar por colocá-lo)
    const btnTrocarMeta = document.getElementById('btn-nova-meta');
    if (btnTrocarMeta) {
        btnTrocarMeta.addEventListener('click', sortearMetaSocial);
    }
});
