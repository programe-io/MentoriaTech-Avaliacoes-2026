// BANCO DE DADOS INICIAL DE RESENHAS
let reviewsData = [
    {
        id: 1,
        title: "O Nome do Vento",
        author: "Patrick Rothfuss",
        category: "Fantasia",
        rating: 5,
        cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=400",
        readTime: 8,
        date: "28 de Setembro, 2026",
        likes: 42,
        isLiked: false,
        isBookmarked: false,
        summary: "Uma obra-prima moderna sobre um jovem prodígio e sua jornada para se tornar uma lenda viva.",
        content: `
            <p>Poucas obras no gênero da alta fantasia conseguem capturar a atenção do leitor com uma prosa tão poética e envolvente quanto <strong>O Nome do Vento</strong>. Patrick Rothfuss nos introduz a Kvothe, um homem de passado lendário que agora vive sob o disfarce de um simples estalajadeiro.</p>
            <p>O livro é narrado em primeira pessoa, onde Kvothe conta a sua própria história a um cronista em um período de três dias. A forma como a magia é estruturada nesta narrativa — chamada de <em>Simpatia</em> — é extremamente lógica e fascinante.</p>
            <p><strong>Por que ler?</strong> Os personagens são extraordinariamente humanos, a construção do mundo é impecável e o mistério que envolve os Chandriani deixará você virando as páginas até altas horas da madrugada.</p>
        `
    },
    {
        id: 2,
        title: "Tudo Sobre o Amor",
        author: "bell hooks",
        category: "Não-Ficção",
        rating: 4.5,
        cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=400",
        readTime: 5,
        date: "25 de Setembro, 2026",
        likes: 29,
        isLiked: false,
        isBookmarked: false,
        summary: "Uma análise profunda e necessária sobre como o amor pode transformar nossas vidas e sociedade.",
        content: `
            <p>Em <strong>Tudo Sobre o Amor</strong>, a pensadora bell hooks desmistifica a ideia do amor como um mero sentimento passivo e o apresenta como uma <em>ação consciente</em> e transformadora.</p>
            <p>A autora examina a ausência de amor na sociedade contemporânea e nos desafia a repensar nossas conexões familiares, amizades e relacionamentos amorosos através da honestidade e do cuidado mútuo.</p>
            <p>Um livro essencial para quem busca construir relações mais autênticas e saudáveis no mundo moderno.</p>
        `
    },
    {
        id: 3,
        title: "A Paciente Silenciosa",
        author: "Alex Michaelides",
        category: "Mistério",
        rating: 4.0,
        cover: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=400",
        readTime: 6,
        date: "20 de Setembro, 2026",
        likes: 38,
        isLiked: false,
        isBookmarked: false,
        summary: "Um thriller psicológico chocante sobre uma mulher que atira no marido e nunca mais profere uma palavra.",
        content: `
            <p>Alicia Berenson tinha uma vida aparentemente perfeita. Pintora de sucesso, casada com um fotógrafo de moda requisitado. Um dia, ela dá cinco tiros no rosto do marido e nunca mais diz uma única palavra.</p>
            <p>Theo Faber, um psicoterapeuta forense, fica obcecado por descobrir a motivação por trás do crime e faz de tudo para fazê-la falar. O ritmo do livro é alucinante e o plot twist final é verdadeiramente surpreendente.</p>
        `
    },
    {
        id: 4,
        title: "Orgulho e Preconceito",
        author: "Jane Austen",
        category: "Romance",
        rating: 5,
        cover: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&q=80&w=400",
        readTime: 7,
        date: "15 de Setembro, 2026",
        likes: 56,
        isLiked: false,
        isBookmarked: false,
        summary: "Um clássico atemporal sobre aparências, classe social e a força dos afetos genuínos.",
        content: `
            <p>Jane Austen entrega uma das comédias românticas mais brilhantes da literatura mundial. Através dos embates inteligentes entre Elizabeth Bennet e o altivo Sr. Darcy, a obra explora com ironia afiada as convenções da sociedade inglesa do século XIX.</p>
        `
    }
];

const categories = ["Todos", "Fantasia", "Ficção", "Romance", "Mistério", "Não-Ficção"];
let selectedCategory = "Todos";

// ELEMENTOS DO DOM
const reviewsGrid = document.getElementById('reviewsGrid');
const categoriesContainer = document.getElementById('categoriesContainer');
const searchInput = document.getElementById('searchInput');
const resultsCounter = document.getElementById('resultsCounter');
const bookmarkCount = document.getElementById('bookmarkCount');

// Modais
const readModal = document.getElementById('readModal');
const closeReadModalBtn = document.getElementById('closeReadModalBtn');

const createModal = document.getElementById('createModal');
const openCreateModalBtn = document.getElementById('openCreateModalBtn');
const closeCreateModalBtn = document.getElementById('closeCreateModalBtn');
const createReviewForm = document.getElementById('createReviewForm');

const bookmarksModal = document.getElementById('bookmarksModal');
const openBookmarksBtn = document.getElementById('openBookmarksBtn');
const closeBookmarksModalBtn = document.getElementById('closeBookmarksModalBtn');
const bookmarksList = document.getElementById('bookmarksList');

const themeToggleBtn = document.getElementById('themeToggleBtn');

// RENDERIZAR BOTOES DE CATEGORIA
function renderCategories() {
    categoriesContainer.innerHTML = categories.map(cat => `
        <button onclick="filterByCategory('${cat}')" 
            class="px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat 
                ? 'bg-brand-500 text-white shadow-md shadow-brand-500/20' 
                : 'bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 text-gray-600 dark:text-gray-300 hover:border-brand-500'
            }">
            ${cat}
        </button>
    `).join('');
}

// RENDERIZAR ESTRELAS DE AVALIAÇÃO
function renderStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 !== 0;
    let starsHtml = '';

    for (let i = 0; i < fullStars; i++) {
        starsHtml += '<i class="fa-solid fa-star text-amber-400"></i>';
    }
    if (hasHalf) {
        starsHtml += '<i class="fa-solid fa-star-half-stroke text-amber-400"></i>';
    }
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        starsHtml += '<i class="fa-regular fa-star text-gray-300 dark:text-zinc-700"></i>';
    }
    return starsHtml;
}

// RENDERIZAR CARDS DE RESENHA
function renderReviews(data = reviewsData) {
    let filtered = data;

    // Filtro por categoria
    if (selectedCategory !== "Todos") {
        filtered = filtered.filter(item => item.category === selectedCategory);
    }

    // Filtro por palavra-chave da busca
    const searchTerm = searchInput.value.toLowerCase().trim();
    if (searchTerm) {
        filtered = filtered.filter(item => 
            item.title.toLowerCase().includes(searchTerm) ||
            item.author.toLowerCase().includes(searchTerm) ||
            item.summary.toLowerCase().includes(searchTerm) ||
            item.category.toLowerCase().includes(searchTerm)
        );
    }

    resultsCounter.textContent = `${filtered.length} resenha(s) encontrada(s)`;

    if (filtered.length === 0) {
        reviewsGrid.innerHTML = `
            <div class="col-span-full text-center py-12 text-gray-400">
                <i class="fa-solid fa-book-open text-4xl mb-3 text-gray-300 dark:text-zinc-700"></i>
                <p class="text-sm">Nenhuma resenha encontrada com esses critérios.</p>
            </div>
        `;
        return;
    }

    reviewsGrid.innerHTML = filtered.map(post => `
        <article class="bg-white dark:bg-zinc-900 rounded-2xl border border-amber-100 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col justify-between group">
            <div>
                <!-- Capa e Categoria -->
                <div class="relative h-48 bg-amber-50 dark:bg-zinc-800 overflow-hidden cursor-pointer" onclick="openReadModal(${post.id})">
                    <img src="${post.cover}" alt="${post.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                    <span class="absolute top-3 left-3 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md text-brand-500 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                        ${post.category}
                    </span>
                    <button onclick="event.stopPropagation(); toggleBookmark(${post.id})" class="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-brand-500 transition-colors">
                        <i class="${post.isBookmarked ? 'fa-solid fa-bookmark text-brand-500' : 'fa-regular fa-bookmark'}"></i>
                    </button>
                </div>

                <!-- Conteúdo -->
                <div class="p-5 space-y-3">
                    <div class="flex items-center gap-1 text-xs">
                        ${renderStars(post.rating)}
                        <span class="text-gray-400 ml-1 font-semibold">${post.rating}</span>
                    </div>

                    <h4 class="font-bold text-lg leading-snug cursor-pointer hover:text-brand-500 transition-colors" onclick="openReadModal(${post.id})">
                        ${post.title}
                    </h4>
                    
                    <p class="text-xs font-medium text-gray-500 dark:text-gray-400">
                        por <span class="text-gray-700 dark:text-gray-200">${post.author}</span>
                    </p>

                    <p class="text-xs text-gray-600 dark:text-gray-300 line-clamp-3 leading-relaxed">
                        ${post.summary}
                    </p>
                </div>
            </div>

            <!-- Footer do Card -->
            <div class="px-5 py-3 border-t border-gray-100 dark:border-zinc-800/80 flex items-center justify-between text-xs text-gray-400">
                <span class="flex items-center gap-1">
                    <i class="fa-regular fa-clock"></i> ${post.readTime} min
                </span>
                <div class="flex items-center gap-3">
                    <button onclick="toggleLike(${post.id})" class="flex items-center gap-1 hover:text-red-500 transition-colors">
                        <i class="${post.isLiked ? 'fa-solid fa-heart text-red-500' : 'fa-regular fa-heart'}"></i>
                        <span>${post.likes}</span>
                    </button>
                    <button onclick="openReadModal(${post.id})" class="text-brand-500 font-semibold hover:underline">
                        Ler <i class="fa-solid fa-angle-right text-[10px]"></i>
                    </button>
                </div>
            </div>
        </article>
    `).join('');

    updateBookmarkBadge();
}

// MODAL DE LEITURA COMPLETA
function openReadModal(postId) {
    const post = reviewsData.find(p => p.id === postId);
    if (!post) return;

    document.getElementById('modalCategory').textContent = post.category;
    document.getElementById('modalCover').src = post.cover;
    document.getElementById('modalTitle').textContent = post.title;
    document.getElementById('modalAuthor').textContent = `Autor(a): ${post.author}`;
    document.getElementById('modalRating').innerHTML = renderStars(post.rating) + `<span class="text-xs text-gray-400 font-normal ml-2">(${post.rating} / 5)</span>`;
    document.getElementById('modalReadTime').textContent = post.readTime;
    document.getElementById('modalDate').textContent = post.date;
    document.getElementById('modalContent').innerHTML = post.content || `<p>${post.summary}</p>`;

    readModal.classList.remove('hidden');
}

function readFeaturedPost() {
    openReadModal(1); // Abre o post id 1 (O Nome do Vento)
}

closeReadModalBtn.addEventListener('click', () => readModal.classList.add('hidden'));
readModal.addEventListener('click', (e) => { if (e.target === readModal) readModal.classList.add('hidden'); });

// FILTRAR POR CATEGORIA
function filterByCategory(cat) {
    selectedCategory = cat;
    renderCategories();
    renderReviews();
}

function resetFilters() {
    selectedCategory = "Todos";
    searchInput.value = "";
    renderCategories();
    renderReviews();
}

// CURTIR E SALVAR
function toggleLike(postId) {
    const post = reviewsData.find(p => p.id === postId);
    if (!post) return;
    post.isLiked = !post.isLiked;
    post.likes += post.isLiked ? 1 : -1;
    renderReviews();
}

function toggleBookmark(postId) {
    const post = reviewsData.find(p => p.id === postId);
    if (!post) return;
    post.isBookmarked = !post.isBookmarked;
    renderReviews();
    renderBookmarksList();
}

function updateBookmarkBadge() {
    const savedCount = reviewsData.filter(p => p.isBookmarked).length;
    if (savedCount > 0) {
        bookmarkCount.textContent = savedCount;
        bookmarkCount.classList.remove('hidden');
    } else {
        bookmarkCount.classList.add('hidden');
    }
}

// LISTA DE LEITURA (BOOKMARKS)
function renderBookmarksList() {
    const saved = reviewsData.filter(p => p.isBookmarked);
    if (saved.length === 0) {
        bookmarksList.innerHTML = `
            <div class="text-center py-8 text-gray-400">
                <i class="fa-regular fa-bookmark text-3xl mb-2"></i>
                <p class="text-xs">Sua lista de leitura está vazia.</p>
            </div>
        `;
        return;
    }

    bookmarksList.innerHTML = saved.map(post => `
        <div class="flex items-center gap-3 p-2 bg-amber-50/50 dark:bg-zinc-800/50 rounded-xl">
            <img src="${post.cover}" class="w-12 h-16 object-cover rounded-lg">
            <div class="flex-1 min-w-0">
                <h5 class="font-bold text-sm truncate">${post.title}</h5>
                <p class="text-xs text-gray-400 truncate">${post.author}</p>
            </div>
            <button onclick="toggleBookmark(${post.id})" class="text-red-500 hover:text-red-600 p-2 text-xs">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
    `).join('');
}

openBookmarksBtn.addEventListener('click', () => {
    renderBookmarksList();
    bookmarksModal.classList.remove('hidden');
});
closeBookmarksModalBtn.addEventListener('click', () => bookmarksModal.classList.add('hidden'));

// MODAL DE CRIAR RESENHA
openCreateModalBtn.addEventListener('click', () => createModal.classList.remove('hidden'));
closeCreateModalBtn.addEventListener('click', () => createModal.classList.add('hidden'));

createReviewForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = document.getElementById('bookTitleInput').value;
    const author = document.getElementById('bookAuthorInput').value;
    const category = document.getElementById('bookCategoryInput').value;
    const rating = parseFloat(document.getElementById('bookRatingInput').value);
    const cover = document.getElementById('bookCoverInput').value || 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=400';
    const reviewText = document.getElementById('bookReviewInput').value;

    const newReview = {
        id: Date.now(),
        title: title,
        author: author,
        category: category,
        rating: rating,
        cover: cover,
        readTime: Math.ceil(reviewText.split(' ').length / 150) || 3,
        date: "Hoje",
        likes: 0,
        isLiked: false,
        isBookmarked: false,
        summary: reviewText.substring(0, 120) + "...",
        content: `<p>${reviewText}</p>`
    };

    reviewsData.unshift(newReview);
    renderReviews();

    createReviewForm.reset();
    createModal.classList.add('hidden');
});

// ALTERNAR TEMA ESCURO / CLARO
themeToggleBtn.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
});

// PESQUISA EM TEMPO REAL
searchInput.addEventListener('input', () => renderReviews());

// INICIALIZAÇÃO
document.addEventListener('DOMContentLoaded', () => {
    renderCategories();
    renderReviews();
});