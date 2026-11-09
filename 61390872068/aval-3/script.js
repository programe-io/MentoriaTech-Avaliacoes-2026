/**
 * Dicionário contendo dados de personalização dinâmicos baseados
 * nos principais membros da Patrulha Canina.
 */
const dadosFilhotes = {
    ryder: {
        username: "@ryder_lider",
        nome: "Ryder - Líder da Patrulha",
        bio: "🚨 Sempre que houver problemas na Baía da Aventura, é só chamar! Comandante técnico dos filhotes.",
        avatar: "🧑‍✈️"
    },
    chase: {
        username: "@chase_oficial",
        nome: "Chase (Pastor Alemão)",
        bio: "🚓 O Chase está no caso! Filhote policial focado em manter a ordem e guiar o trânsito da Baía.",
        avatar: "🐕‍🦺"
    },
    marshall: {
        username: "@marshall_bombeiro",
        nome: "Marshall (Dálmata)",
        bio: "消防 Prontinho para o resgate! Filhote bombeiro que apaga incêndios e comete algumas trapalhadas.",
        avatar: "🦮"
    },
    skye: {
        username: "@skye_voadora",
        nome: "Skye (Cockapoo)",
        bio: "🚁 Esse filhote vai voar! Pilota aérea oficial equipada com asas em seu casulo tecnológico.",
        avatar: "🐕"
    }
};

/**
 * Modifica o tema geral da interface do Pupstagram alterando classes do body
 * e atualizando os campos de texto do perfil dinamicamente.
 * @param {string} nomeFilhote - Chave do filhote ('ryder', 'chase', etc)
 */
function mudarTema(nomeFilhote) {
    const corpoPagina = document.body;
    const classesTemas = ['tema-ryder', 'tema-chase', 'tema-marshall', 'tema-skye'];
    
    // Altera a classe cromática estrutural do CSS
    classesTemas.forEach(classe => corpoPagina.classList.remove(classe));
    corpoPagina.classList.add(`tema-${nomeFilhote}`);
    
    // Atualiza o estado visual ativo no painel de botões
    const botoes = document.querySelectorAll('.btn-filhote');
    botoes.forEach(btn => btn.classList.remove('active'));
    
    const botaoAlvo = document.querySelector(`.btn-filhote.${nomeFilhote}`);
    if (botaoAlvo) {
        botaoAlvo.classList.add('active');
    }
    
    // Executa a alteração dinâmica de dados do perfil na tela
    const info = dadosFilhotes[nomeFilhote];
    if (info) {
        document.getElementById('perfil-username').textContent = info.username;
        document.getElementById('perfil-nome').textContent = info.nome;
        document.getElementById('perfil-avatar').textContent = info.avatar;
        
        // Aplica o texto da bio atualizada com animação suave
        const elementoBio = document.querySelector('.perfil-bio p');
        elementoBio.textContent = info.bio;
    }
}

// Vincula alerta divertido ao clicar nos blocos quadrados da grelha de fotos
const itensGrade = document.querySelectorAll('.item-grade');
itensGrade.forEach((item, index) => {
    item.addEventListener('click', function() {
        alert(`Carregando imagem do Equipamento de Resgate Nº ${index + 1}... 🚀`);
    });
});
