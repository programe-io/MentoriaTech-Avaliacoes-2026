// ==========================================
// 1. BANCO DE DADOS SIMULADO (Mude os dados aqui)
// ==========================================
const usuariosStories = [
    { id: 1, nome: "Seu story", foto: "", ehUsuarioLogado: true },
    { id: 2, nome: "João", foto: "https://unsplash.com", ehUsuarioLogado: false },
    { id: 3, nome: "Maria", foto: "https://unsplash.com", ehUsuarioLogado: false },
    { id: 4, nome: "Ana_Silva", foto: "https://unsplash.com", ehUsuarioLogado: false },
    { id: 5, nome: "Pedro", foto: "https://unsplash.com", ehUsuarioLogado: false },
    { id: 6, nome: "Lucas_Dev", foto: "https://unsplash.com", ehUsuarioLogado: false }
];

const postagensFeed = [
    {
        id: 101,
        autor: "João",
        fotoPerfil: "https://unsplash.com",
        localizacao: "São Paulo, Brazil",
        imagemPost: "https://unsplash.com",
        curtidas: 142,
        legenda: "Criando meu portfólio novo usando Tailwind CSS! 💻🚀"
    }
];

// ==========================================
// 2. SELETORES DO DOM (Mapeamento do HTML)
// ==========================================
// Certifique-se de que a div de stories tenha a classe '.stories-container'
// Certifique-se de que a div do feed tenha a classe '.feed-container'
const containerStories = document.querySelector('.overflow-x-auto') || document.querySelector('.stories-container');
const containerFeed = document.querySelector('.feed-container');

// ==========================================
// 3. FUNÇÕES DE RENDERIZAÇÃO
// ==========================================

// Renderiza a barra horizontal de Stories (Item 9, 10 e 11)
function renderizarStories() {
    if (!containerStories) return;
    containerStories.innerHTML = '';

    usuariosStories.forEach(usuario => {
        const itemStory = document.createElement('div');
        itemStory.className = "flex flex-col items-center flex-shrink-0 cursor-pointer group";

        if (usuario.ehUsuarioLogado) {
            // Estrutura do Botão Adicionar Story (+)
            itemStory.innerHTML = `
                <div class="w-16 h-16 rounded-full bg-gray-100 p-[2px] transition group-hover:scale-105">
                    <div class="w-full h-full rounded-full bg-white p-[2px]">
                        <div class="w-full h-full rounded-full bg-gray-100 flex items-center justify-center">
                            <span class="text-2xl text-gray-500 font-light">+</span>
                        </div>
                    </div>
                </div>
                <span class="text-xs mt-1 text-center w-16 truncate text-gray-500">${usuario.nome}</span>
            `;
        } else {
            // Estrutura com Gradiente do Instagram
            itemStory.innerHTML = `
                <div class="w-16 h-16 rounded-full bg-gray-100 p-[2px] transition group-hover:scale-105">
                    <div class="w-full h-full rounded-full bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500 p-[2px]">
                        <img src="${usuario.foto}" alt="Perfil de ${usuario.nome}" class="w-full h-full object-cover rounded-full border-2 border-white">
                    </div>
                </div>
                <span class="text-xs mt-1 text-center w-16 truncate">${usuario.nome}</span>
            `;
        }

        // Evento de clique para interatividade básica
        itemStory.addEventListener('click', () => {
            console.log(`Abrindo stories de: ${usuario.nome}`);
        });

        containerStories.appendChild(itemStory);
    });
}

// Renderiza os cards do Feed de Notícias (Item 12 e 13)
function renderizarFeed() {
    // Procura o elemento correspondente ao feed (ignora se for o container lateral)
    const feedElement = document.querySelector('div.flex-1.max-w-lg') || containerFeed;
    if (!feedElement) return;

    // Mantém a seção de stories intacta e remove apenas os artigos antigos do feed
    const artigosAntigos = feedElement.querySelectorAll('article');
    artigosAntigos.forEach(artigo => artigo.remove());

    postagensFeed.forEach(post => {
        const postCard = document.createElement('article');
        postCard.className = "bg-white border border-gray-200 rounded-lg mb-4 overflow-hidden";

        postCard.innerHTML = `
            <!-- Cabeçalho do Post (Item 12 e 13) -->
            <header class="flex items-center justify-between p-3">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500 p-[2px] cursor-pointer">
                        <img src="${post.fotoPerfil}" alt="${post.autor}" class="w-full h-full object-cover rounded-full border border-white">
                    </div>
                    <div class="flex flex-col">
                        <span class="text-sm font-semibold cursor-pointer hover:underline">${post.autor}</span>
                        <span class="text-xs text-gray-500">${post.localizacao}</span>
                    </div>
                </div>
                <button class="text-gray-600 hover:text-gray-900">
                    <i class="bx bx-dots-horizontal-rounded text-xl"></i>
                </button>
            </header>

            <!-- Imagem Publicada (Adicionado para a transição para a Parte 2) -->
            <div class="w-full bg-gray-50 relative select-none">
                <img src="${post.imagemPost}" alt="Post de ${post.autor}" class="w-full object-cover aspect-square">
            </div>

            <!-- Rodapé com Informações da Postagem -->
            <footer class="p-3">
                <p class="text-sm font-semibold mb-1">${post.curtidas.toLocaleString()} curtidas</p>
                <p class="text-sm">
                    <span class="font-semibold mr-2 cursor-pointer hover:underline">${post.autor}</span>
                    <span class="text-gray-800">${post.legenda}</span>
                </p>
            </footer>
        `;

        feedElement.appendChild(postCard);
    });
}

// ==========================================
// 4. INICIALIZAÇÃO DA APLICAÇÃO
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    renderizarStories();
    renderizarFeed();
});
