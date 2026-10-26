// --- CONFIGURAÇÃO DOS OBJETIVOS PARA O FUTURO ---
const objetivosFuturo = {
    profissional: [
        "Atuar como Desenvolvedor Full Stack júnior logo após finalizar o curso.",
        "Criar soluções de software que facilitem a rotina de empresas em Teresina.",
        "Aprender frameworks modernos como React, Node.js ou dominar a linguagem Python."
    ],
    estudos: [
        "Concluir o Ensino Médio no Colégio Modestina Bezerra com excelente desempenho.",
        "Ingressar em uma faculdade na área de tecnologia (Ciência da Computação ou Análise de Sistemas).",
        "Conquistar certificações técnicas reconhecidas no mercado de desenvolvimento."
    ],
    pessoal: [
        "Montar um setup de estudos/trabalho focado em produtividade.",
        "Contribuir com projetos de código aberto (Open Source) no GitHub.",
        "Ajudar outros jovens de Teresina a entrarem no mercado de tecnologia."
    ]
};

// --- FUNÇÃO PARA RENDERIZAR OS OBJETIVOS NA TELA ---
function mostrarObjetivos(categoria) {
    // Altera a classe ativa entre os botões para dar retorno visual ao usuário
    const botoes = document.querySelectorAll('.btn-futuro');
    botoes.forEach(botao => botao.classList.remove('ativo'));
    
    const botaoSelecionado = document.getElementById(`btn-${categoria}`);
    if (botaoSelecionado) {
        botaoSelecionado.classList.add('ativo');
    }

    // Busca a lista HTML onde os objetivos serão inseridos
    const listaElemento = document.getElementById('lista-futuro');
    if (!listaElemento) return;

    // Limpa a lista atual
    listaElemento.innerHTML = '';

    // Adiciona os itens da categoria selecionada com uma animação simples de fade-in
    objetivosFuturo[categoria].forEach((objetivo, index) => {
        const item = document.createElement('li');
        item.style.opacity = '0';
        item.style.transform = 'translateX(-10px)';
        item.style.transition = `all 0.3s ease ${index * 0.1}s`;
        
        item.innerHTML = `<strong>✨</strong> ${objetivo}`;
        listaElemento.appendChild(item);

        // Força o navegador a rodar a animação
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, 50);
    });
}

// --- EVENTO INICIAL ---
// Quando a página carregar, exibe automaticamente os objetivos profissionais
document.addEventListener('DOMContentLoaded', () => {
    mostrarObjetivos('profissional');
});
