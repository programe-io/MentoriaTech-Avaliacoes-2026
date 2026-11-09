// Base de dados simulada para os Perfis nos Stories
const listStories = [
    { user: 'dev_maria', img: 'https://unsplash.com' },
    { user: 'joao.codes', img: 'https://unsplash.com' },
    { user: 'gabi.tech', img: 'https://unsplash.com' },
    { user: 'lucas_dev', img: 'https://unsplash.com' },
    { user: 'ana_interface', img: 'https://unsplash.com' }
];

// Base de dados simulada para os Posts do Feed
const listPosts = [
    {
        user: 'dev_maria',
        avatar: 'https://unsplash.com',
        place: 'São Paulo, Brasil',
        media: 'https://unsplash.com',
        countLikes: 142,
        desc: 'Desenvolvendo interfaces modernas com Tailwind CSS. 🚀 #dev #uiux'
    },
    {
        user: 'joao.codes',
        avatar: 'https://unsplash.com',
        place: 'Home Office',
        media: 'https://unsplash.com',
        countLikes: 95,
        desc: 'Estruturação limpa em andamento!'
    }
];

// Injeção de dados nos Stories
const storiesBox = document.getElementById('stories-container');
listStories.forEach(item => {
    storiesBox.innerHTML += `
        <div class="flex flex-col items-center gap-1 cursor-pointer min-w-[70px]">
            <div class="w-16 h-16 rounded-full p-[2px] bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600">
                <img src="${item.img}" class="w-full h-full object-cover rounded-full border-2 border-black" alt="${item.user}">
            </div>
            <span class="text-xs truncate w-16 text-center text-zinc-400">${item.user}</span>
        </div>
    `;
});

// Injeção de dados nos Posts
const feedBox = document.getElementById('feed-container');
listPosts.forEach((post, i) => {
    feedBox.innerHTML += `
        <article class="border border-zinc-800 rounded-lg bg-black overflow-hidden">
            <div class="flex items-center justify-between p-3">
                <div class="flex items-center gap-3">
                    <img src="${post.avatar}" class="w-8 h-8 rounded-full object-cover" alt="Avatar">
                    <div class="flex flex-col">
                        <span class="text-sm font-semibold hover:text-zinc-400 cursor-pointer">${post.user}</span>
                        <span class="text-xs text-zinc-500">${post.place}</span>
                    </div>
                </div>
                <button class="text-zinc-400 hover:text-white"><i data-lucide="more-horizontal"></i></button>
            </div>

            <div class="w-full aspect-square bg-zinc-900">
                <img src="${post.media}" class="w-full h-full object-cover" alt="Mídia do Post">
            </div>

            <div class="p-3 flex flex-col gap-2">
                <div class="flex justify-between items-center">
                    <div class="flex gap-4">
                        <button onclick="handleLike(${i})" id="heart-${i}" class="hover:text-zinc-400 transition">
                            <i data-lucide="heart" class="w-6 h-6"></i>
                        </button>
                        <button class="hover:text-zinc-400 transition"><i data-lucide="message-circle" class="w-6 h-6"></i></button>
                        <button class="hover:text-zinc-400 transition"><i data-lucide="send" class="w-6 h-6"></i></button>
                    </div>
                    <button class="hover:text-zinc-400 transition"><i data-lucide="bookmark" class="w-6 h-6"></i></button>
                </div>

                <span class="text-sm font-semibold" id="likes-total-${i}">${post.countLikes} curtidas</span>
                <p class="text-sm">
                    <span class="font-semibold mr-2">${post.user}</span>${post.desc}
                </p>
            </div>
        </article>
    `;
});

// Renderização dos ícones estruturais
lucide.createIcons();

// Função para atualizar curtidas dinamicamente
function handleLike(index) {
    const heartElement = document.querySelector(`#heart-${index} i`);
    const labelLikes = document.getElementById(`likes-total-${index}`);
    let baseValue = listPosts[index].countLikes;

    if (heartElement.classList.contains('text-red-500')) {
        heartElement.classList.remove('text-red-500', 'fill-red-500');
        labelLikes.innerText = `${baseValue} curtidas`;
    } else {
        heartElement.classList.add('text-red-500', 'fill-red-500');
        labelLikes.innerText = `${baseValue + 1} curtidas`;
    }
}
