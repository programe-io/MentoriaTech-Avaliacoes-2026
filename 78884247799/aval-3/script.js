
```html
<!DOCTYPE html>
<html lang="pt-BR" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Blog Consciência Negra - Memória, Luta e Justiça</title>
    <!-- Tailwind CSS CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        brandDark: '#120E0A',
                        brandGold: '#D4AF37',
                        brandBrown: '#5C3A21',
                        brandLight: '#FDFBF7',
                        brandCard: '#1C1611'
                    },
                    fontFamily: {
                        sans: ['Inter', 'sans-serif'],
                    }
                }
            }
        }
    </script>
    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <!-- FontAwesome Icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        body {
            font-family: 'Inter', sans-serif;
            background-color: #120E0A;
            color: #FDFBF7;
        }
        .gold-gradient {
            background: linear-gradient(135deg, #D4AF37 0%, #AA771C 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .card-hover {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .card-hover:hover {
            transform: translateY(-4px);
            box-shadow: 0 10px 25px -5px rgba(212, 175, 55, 0.15);
        }
    </style>
</head>
<body class="bg-brandDark text-brandLight antialiased selection:bg-brandGold selection:text-brandDark">

    <!-- Toast Notification Container -->
    <div id="toast-container" class="fixed bottom-5 right-5 z-50 flex flex-col gap-2"></div>

    <!-- Header / Navbar -->
    <header class="sticky top-0 z-40 bg-brandDark/90 backdrop-blur-md border-b border-brandGold/20">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
            <div class="flex items-center gap-3">
                <span class="text-3xl">✊🏿</span>
                <span class="font-bold text-xl sm:text-2xl tracking-wide gold-gradient">Consciência Viva</span>
            </div>
            <nav class="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
                <a href="#historia" class="hover:text-brandGold transition-colors">História</a>
                <a href="#resistencia" class="hover:text-brandGold transition-colors">Resistência</a>
                <a href="#leis" class="hover:text-brandGold transition-colors">Leis & Punições</a>
                <a href="#avaliacao" class="hover:text-brandGold transition-colors">Avaliação</a>
            </nav>
            <a href="#avaliacao" class="bg-brandGold text-brandDark font-semibold px-4 py-2 rounded-xl text-sm shadow-md hover:bg-yellow-500 transition-all">
                Deixar Feedback
            </a>
        </div>
    </header>

    <!-- Hero Section -->
    <section class="relative overflow-hidden py-20 lg:py-28 bg-gradient-to-b from-brandCard to-brandDark border-b border-brandGold/10">
        <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brandGold/10 border border-brandGold/30 text-brandGold text-xs sm:text-sm font-medium mb-6">
                <span>🇧🇷</span> 20 de Novembro • Dia Nacional da Consciência Negra
            </div>
            <h1 class="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
                Memória, <span class="gold-gradient">Resistência</span> e Justiça
            </h1>
            <p class="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-10">
                Um espaço dedicado a compreender as raízes históricas da escravidão, honrar os heróis da nossa ancestralidade, conhecer as leis de proteção atuais e combater o racismo diariamente.
            </p>
            <div class="flex flex-wrap justify-center gap-4">
                <a href="#historia" class="bg-brandGold text-brandDark font-bold px-8 py-3.5 rounded-xl shadow-lg hover:bg-yellow-500 transition-all">
                    Explorar Artigo <i class="fa-solid fa-arrow-down ml-2"></i>
                </a>
                <a href="#leis" class="bg-transparent border border-brandGold/50 text-brandLight font-semibold px-8 py-3.5 rounded-xl hover:bg-brandGold/10 transition-all">
                    Ver Leis e Punições
                </a>
            </div>
        </div>
    </section>

    <!-- Main Content Container -->
    <main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">

        <!-- Seção 1: História da Escravidão no Mundo e no Brasil -->
        <section id="historia" class="scroll-mt-28 bg-brandCard/60 border border-brandGold/20 rounded-3xl p-6 sm:p-10 card-hover">
            <div class="flex items-center gap-4 mb-6">
                <span class="text-4xl p-3 bg-brandGold/10 rounded-2xl border border-brandGold/20">⛓️</span>
                <div>
                    <span class="text-xs uppercase tracking-wider text-brandGold font-bold">Capítulo I</span>
                    <h2 class="text-2xl sm:text-3xl font-bold text-brandLight">A História da Escravidão: Do Mundo ao Brasil</h2>
                </div>
            </div>
            
            <div class="space-y-6 text-gray-300 leading-relaxed text-base sm:text-lg">
                <p>
                    A prática da escravidão infelizmente permeou diversas civilizações antigas ao longo da história mundial 🌍 (como em impérios da Grécia, Roma e Egito), onde prisioneiros de guerra ou devedores eram submetidos ao trabalho forçado. No entanto, o tráfico transatlântico de escravizados africanos, iniciado no século XV por potências europeias 🚢, assumiu uma escala industrial sem precedentes, marcada por profunda desumanização, racismo estrutural e extrema violência.
                </p>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                    <div class="bg-brandDark/80 p-5 rounded-2xl border border-brandGold/10">
                        <h3 class="font-bold text-brandGold mb-2 flex items-center gap-2">
                            <span>🌍</span> No Contexto Mundial
                        </h3>
                        <p class="text-sm text-gray-400">
                            Milhões de africanos foram arrancados de suas terras natais, culturas e famílias, sendo transportados em navios negreiros em condições insalubres rumo às Américas para alimentar economias coloniais.
                        </p>
                    </div>
                    <div class="bg-brandDark/80 p-5 rounded-2xl border border-brandGold/10">
                        <h3 class="font-bold text-brandGold mb-2 flex items-center gap-2">
                            <span>🇧🇷</span> No Brasil Colonial e Imperial
                        </h3>
                        <p class="text-sm text-gray-400">
                            O Brasil foi o último país das Américas a abolir formalmente a escravidão (1888). Por mais de 300 anos, o país sustentou sua economia na exploração brutal da mão de obra negra 🖤, deixando marcas profundas na sociedade atual.
                        </p>
                    </div>
                </div>
                <p>
                    O sofrimento imposto 😢 gerou cicatrizes geracionais. As famílias eram separadas nos leilões, castigos físicos severos eram aplicados rotineiramente, e negava-se aos negros o direito básico à humanidade, à educação e à liberdade.
                </p>
            </div>
        </section>

        <!-- Seção 2: O Sofrimento e a Resistência -->
        <section id="resistencia" class="scroll-mt-28 bg-brandCard/60 border border-brandGold/20 rounded-3xl p-6 sm:p-10 card-hover">
            <div class="flex items-center gap-4 mb-6">
                <span class="text-4xl p-3 bg-brandGold/10 rounded-2xl border border-brandGold/20">✊🏿</span>
                <div>
                    <span class="text-xs uppercase tracking-wider text-brandGold font-bold">Capítulo II</span>
                    <h2 class="text-2xl sm:text-3xl font-bold text-brandLight">Sofrimento, Quilombos e Zumbi dos Palmares</h2>
                </div>
            </div>

            <div class="space-y-6 text-gray-300 leading-relaxed text-base sm:text-lg">
                <p>
                    Apesar da opressão sistêmica, a resistência negra nunca cessou. Desde os tumbeiros até as fazendas e cidades, houve rebeliões, fugas e a criação de comunidades autônomas conhecidas como <strong>quilombos</strong> 🛖.
                </p>
                <div class="bg-brandDark/80 border-l-4 border-brandGold p-5 rounded-r-2xl my-4">
                    <h3 class="font-bold text-brandLight text-lg mb-1 flex items-center gap-2">
                        <span>👑</span> O Quilombo dos Palmares e Zumbi
                    </h3>
                    <p class="text-sm text-gray-300">
                        Localizado na Serra da Barriga (atual estado de Alagoas), Palmares foi o maior quilombo do período colonial, abrigando milhares de pessoas entre negros fugitivos, indígenas e brancos pobres. Sob a liderança heroica de <strong>Zumbi dos Palmares</strong>, a comunidade resistiu por décadas a ataques sucessivos das forças coloniais, tornando-se o maior símbolo nacional de liberdade, bravura e resistência negra. Zumbi foi assassinado em 20 de novembro de 1695, data que hoje consagra o nosso feriado nacional de conscientização.
                    </p>
                </div>
                <p>
                    A resistência também se deu na preservação secreta de religiões de matriz africana, na capoeira 🤸🏾‍♂️, nos batuques e na transmissão oral de sabedorias ancestrais que formam a espinha dorsal da cultura brasileira.
                </p>
            </div>
        </section>

        <!-- Seção 3: Leis de Proteção Atuais -->
        <section id="leis" class="scroll-mt-28 bg-brandCard/60 border border-brandGold/20 rounded-3xl p-6 sm:p-10 card-hover">
            <div class="flex items-center gap-4 mb-6">
                <span class="text-4xl p-3 bg-brandGold/10 rounded-2xl border border-brandGold/20">⚖️</span>
                <div>
                    <span class="text-xs uppercase tracking-wider text-brandGold font-bold">Capítulo III</span>
                    <h2 class="text-2xl sm:text-3xl font-bold text-brandLight">Leis de Proteção e Combate ao Racismo</h2>
                </div>
            </div>

            <div class="space-y-6 text-gray-300 leading-relaxed text-base sm:text-lg">
                <p>
                    Com a redemocratização e a Constituição Federal de 1988, o racismo passou a ser combatido de forma mais enérgica pelo Estado brasileiro, reconhecendo-se que a igualdade precisa ser garantida por meio de marcos legais rígidos.
                </p>
                
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div class="bg-brandDark/80 p-5 rounded-2xl border border-brandGold/10">
                        <div class="text-brandGold text-2xl font-black mb-2">Lei nº 7.716/1989</div>
                        <h4 class="font-bold text-brandLight mb-1">A Lei do Racismo</h4>
                        <p class="text-sm text-gray-400">
                            Define e pune os crimes resultantes de preconceito de raça, cor, etnia, religião ou procedência nacional. Trata de condutas que impedem o acesso a estabelecimentos, empregos ou cargos públicos por discriminação.
                        </p>
                    </div>

                    <div class="bg-brandDark/80 p-5 rounded-2xl border border-brandGold/10">
                        <div class="text-brandGold text-2xl font-black mb-2">Lei nº 14.532/2023</div>
                        <h4 class="font-bold text-brandLight mb-1">Injúria Racial Equiparada</h4>
                        <p class="text-sm text-gray-400">
                            Equiparou a injúria racial (ofender a honra de alguém com base em elementos de raça, cor, etnia ou origem) ao crime de racismo, tornando-a um crime <strong>imprescritível e inafiançável</strong>.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Seção 4: Como Ocorrem as Punições Hoje -->
        <section class="bg-brandCard/60 border border-brandGold/20 rounded-3xl p-6 sm:p-10 card-hover">
            <div class="flex items-center gap-4 mb-6">
                <span class="text-4xl p-3 bg-brandGold/10 rounded-2xl border border-brandGold/20">🚨</span>
                <div>
                    <span class="text-xs uppercase tracking-wider text-brandGold font-bold">Capítulo IV</span>
                    <h2 class="text-2xl sm:text-3xl font-bold text-brandLight">Como Ocorrem as Punições Perante a Lei Atual</h2>
                </div>
            </div>

            <div class="space-y-6 text-gray-300 leading-relaxed text-base sm:text-lg">
                <p>
                    Hoje, a legislação brasileira trata o racismo e a injúria racial com rigor severo. Entenda como a justiça atua diante de infrações:
                </p>
                <ul class="space-y-4">
                    <li class="flex items-start gap-3 bg-brandDark/50 p-4 rounded-xl border border-brandGold/10">
                        <span class="text-brandGold font-bold text-xl">1.</span>
                        <div>
                            <strong class="text-brandLight">Inafiançabilidade:</strong> O agressor preso em flagrante ou preventivamente não pode pagar fiança para responder ao processo em liberdade provisória com pagamento.
                        </div>
                    </li>
                    <li class="flex items-start gap-3 bg-brandDark/50 p-4 rounded-xl border border-brandGold/10">
                        <span class="text-brandGold font-bold text-xl">2.</span>
                        <div>
                            <strong class="text-brandLight">Imprescritibilidade:</strong> O crime não prescreve, ou seja, pode ser julgado e punido a qualquer momento da vida, mesmo que anos após a ocorrência da ofensa ou discriminação.
                        </div>
                    </li>
                    <li class="flex items-start gap-3 bg-brandDark/50 p-4 rounded-xl border border-brandGold/10">
                        <span class="text-brandGold font-bold text-xl">3.</span>
                        <div>
                            <strong class="text-brandLight">Penas de Reclusão:</strong> As penas podem variar de 2 a 5 anos de reclusão (podendo aumentar em casos de crimes cometidos em contexto de redes sociais ou por duas ou mais pessoas em concurso).
                        </div>
                    </li>
                    <li class="flex items-start gap-3 bg-brandDark/50 p-4 rounded-xl border border-brandGold/10">
                        <span class="text-brandGold font-bold text-xl">4.</span>
                        <div>
                            <strong class="text-brandLight">Canais de Denúncia:</strong> Denúncias podem ser feitas imediatamente em delegacias civis comuns, delegacias especializadas, pelo Disque 100 ou pelo site da Ouvidoria Nacional dos Direitos Humanos.
                        </div>
                    </li>
                </ul>
            </div>
        </section>

        <!-- Seção 5: Avaliação, Feedback e Comentários Interativos -->
        <section id="avaliacao" class="scroll-mt-28 bg-brandCard/60 border border-brandGold/30 rounded-3xl p-6 sm:p-10 shadow-2xl">
            <div class="text-center max-w-xl mx-auto mb-10">
                <span class="text-3xl">⭐</span>
                <h2 class="text-2xl sm:text-3xl font-bold text-brandLight mt-2">Avalie este Artigo</h2>
                <p class="text-sm text-gray-400 mt-1">Sua opinião é fundamental para promovermos reflexões cada vez mais profundas e construtivas.</p>
            </div>

            <!-- Formulário de Avaliação -->
            <form id="feedback-form" class="space-y-6 bg-brandDark/70 p-6 sm:p-8 rounded-2xl border border-brandGold/20 mb-12">
                <div>
                    <label class="block text-sm font-medium text-gray-300 mb-2">Sua nota para o conteúdo (1 a 5 estrelas):</label>
                    <div id="star-rating" class="flex gap-2 text-2xl cursor-pointer">
                        <i class="fa-solid fa-star text-gray-600 hover:text-brandGold transition-colors" data-value="1"></i>
                        <i class="fa-solid fa-star text-gray-600 hover:text-brandGold transition-colors" data-value="2"></i>
                        <i class="fa-solid fa-star text-gray-600 hover:text-brandGold transition-colors" data-value="3"></i>
                        <i class="fa-solid fa-star text-gray-600 hover:text-brandGold transition-colors" data-value="4"></i>
                        <i class="fa-solid fa-star text-gray-600 hover:text-brandGold transition-colors" data-value="5"></i>
                    </div>
                    <input type="hidden" id="selected-rating" value="5">
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label for="user-name" class="block text-sm font-medium text-gray-300 mb-1">Seu Nome:</label>
                        <input type="text" id="user-name" required placeholder="Como gostaria de ser chamado(a)?" class="w-full bg-brandDark border border-brandGold/30 rounded-xl px-4 py-3 text-brandLight placeholder-gray-500 focus:outline-none focus:border-brandGold transition-all">
                    </div>
                    <div>
                        <label for="user-email" class="block text-sm font-medium text-gray-300 mb-1">Seu E-mail (opcional):</label>
                        <input type="email" id="user-email" placeholder="exemplo@email.com" class="w-full bg-brandDark border border-brandGold/30 rounded-xl px-4 py-3 text-brandLight placeholder-gray-500 focus:outline-none focus:border-brandGold transition-all">
                    </div>
                </div>

                <div>
                    <label for="user-comment" class="block text-sm font-medium text-gray-300 mb-1">Seu Comentário ou Feedback:</label>
                    <textarea id="user-comment" rows="4" required placeholder="Deixe sua mensagem de apoio, reflexão ou crítica construtiva..." class="w-full bg-brandDark border border-brandGold/30 rounded-xl px-4 py-3 text-brandLight placeholder-gray-500 focus:outline-none focus:border-brandGold transition-all"></textarea>
                </div>

                <button type="submit" class="w-full bg-brandGold text-brandDark font-bold py-3.5 rounded-xl shadow-lg hover:bg-yellow-500 transition-all flex items-center justify-center gap-2">
                    <i class="fa-solid fa-paper-plane"></i> Publicar Comentário & Avaliação
                </button>
            </form>

            <!-- Lista de Comentários Dinâmicos -->
            <div>
                <h3 class="text-xl font-bold text-brandLight mb-6 flex items-center justify-between">
                    <span>Comentários dos Leitores</span>
                    <span id="comment-count" class="text-xs bg-brandGold/20 text-brandGold px-3 py-1 rounded-full border border-brandGold/30">3 comentários</span>
                </h3>

                <div id="comments-container" class="space-y-4">
                    <!-- Comentários Iniciais simulados -->
                    <div class="bg-brandDark/80 p-5 rounded-2xl border border-brandGold/10">
                        <div class="flex items-center justify-between mb-2">
                            <span class="font-bold text-brandLight flex items-center gap-2">
                                <span>👤</span> Mariana Souza
                            </span>
                            <div class="text-brandGold text-sm">
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                            </div>
                        </div>
                        <p class="text-gray-300 text-sm leading-relaxed">
                            Excelente iniciativa este blog! É fundamental mantermos viva a memória de Zumbi dos Palmares e discutirmos as leis atuais contra o racismo. Consciência negra é todo dia! ✊🏿
                        </p>
                        <span class="text-xs text-gray-500 mt-3 block">Há 2 horas</span>
                    </div>

                    <div class="bg-brandDark/80 p-5 rounded-2xl border border-brandGold/10">
                        <div class="flex items-center justify-between mb-2">
                            <span class="font-bold text-brandLight flex items-center gap-2">
                                <span>👤</span> Carlos Eduardo
                            </span>
                            <div class="text-brandGold text-sm">
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                            </div>
                        </div>
                        <p class="text-gray-300 text-sm leading-relaxed">
                            Muito didático e esclarecedor sobre a nova lei de injúria racial e a imprescritibilidade. Parabéns aos criadores do conteúdo.
                        </p>
                        <span class="text-xs text-gray-500 mt-3 block">Há 5 horas</span>
                    </div>

                    <div class="bg-brandDark/80 p-5 rounded-2xl border border-brandGold/10">
                        <div class="flex items-center justify-between mb-2">
                            <span class="font-bold text-brandLight flex items-center gap-2">
                                <span>👤</span> Ana Beatriz
                            </span>
                            <div class="text-brandGold text-sm">
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-regular fa-star"></i>
                            </div>
                        </div>
                        <p class="text-gray-300 text-sm leading-relaxed">
                            Informações essenciais! O uso dos emojis e a clareza dos tópicos facilitam muito a leitura e compreensão.
                        </p>
                        <span class="text-xs text-gray-500 mt-3 block">Ontem</span>
                    </div>
                </div>
            </div>
        </section>

    </main>

    <!-- Footer -->
    <footer class="border-t border-brandGold/20 bg-brandCard/80 mt-20 py-10 text-center text-sm text-gray-400">
        <div class="max-w-4xl mx-auto px-4 space-y-3">
            <p class="font-semibold text-brandLight">Blog Consciência Negra • Respeito, Justiça e Igualdade</p>
            <p>Criado em comemoração ao Feriado Nacional da Consciência Negra 🇧🇷 ✊🏿</p>
            <p class="text-xs text-gray-500">© 2026 Todos os direitos reservados.</p>
        </div>
    </footer>

    <!-- JavaScript Interativo -->
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            // Sistema de Estrelas de Avaliação Interativa
            const stars = document.querySelectorAll('#star-rating i');
            const selectedRatingInput = document.getElementById('selected-rating');

            function highlightStars(rating) {
                stars.forEach(star => {
                    const val = parseInt(star.getAttribute('data-value'));
                    if (val <= rating) {
                        star.classList.remove('text-gray-600', 'fa-regular');
                        star.classList.add('text-brandGold', 'fa-solid');
                    } else {
                        star.classList.remove('text-brandGold', 'fa-solid');
                        star.classList.add('text-gray-600', 'fa-solid');
                    }
                });
            }

            // Inicializar com 5 estrelas selecionadas
            highlightStars(5);

            stars.forEach(star => {
                star.addEventListener('click', () => {
                    const rating = parseInt(star.getAttribute('data-value'));
                    selectedRatingInput.value = rating;
                    highlightStars(rating);
                });
            });

            // Gerenciador de Comentários e Notificações Toast
            const feedbackForm = document.getElementById('feedback-form');
            const commentsContainer = document.getElementById('comments-container');
            const commentCountSpan = document.getElementById('comment-count');

            let commentCount = 3;

            function showToast(message, type = 'success') {
                const toastContainer = document.getElementById('toast-container');
                const toast = document.createElement('div');
                toast.className = `px-5 py-3 rounded-xl shadow-lg border text-sm font-medium transition-all transform translate-y-2 opacity-0 flex items-center gap-2 ${
                    type === 'success' 
                        ? 'bg-brandCard border-brandGold text-brandLight' 
                        : 'bg-red-950 border-red-500 text-red-200'
                }`;
                toast.innerHTML = `<i class="fa-solid fa-circle-check text-brandGold"></i> ${message}`;
                toastContainer.appendChild(toast);

                setTimeout(() => {
                    toast.classList.remove('translate-y-2', 'opacity-0');
                }, 10);

                setTimeout(() => {
                    toast.classList.add('translate-y-2', 'opacity-0');
                    setTimeout(() => toast.remove(), 300);
                }, 4000);
            }

            feedbackForm.addEventListener('submit', (e) => {
                e.preventDefault();

                const name = document.getElementById('user-name').value.trim();
                const commentText = document.getElementById('user-comment').value.trim();
                const rating = parseInt(selectedRatingInput.value);

                if (!name || !commentText) {
                    showToast('Por favor, preencha todos os campos obrigatórios.', 'error');
                    return;
                }

                // Gerar estrelas em HTML
                let starsHTML = '';
                for (let i = 1; i <= 5; i++) {
                    if (i <= rating) {
                        starsHTML += '<i class="fa-solid fa-star"></i>';
                    } else {
                        starsHTML += '<i class="fa-regular fa-star"></i>';
                    }
                }

                // Criar elemento de comentário
                const commentCard = document.createElement('div');
                commentCard.className = 'bg-brandDark/80 p-5 rounded-2xl border border-brandGold/10 animate-fade-in';
                commentCard.innerHTML = `
                    <div class="flex items-center justify-between mb-2">
                        <span class="font-bold text-brandLight flex items-center gap-2">
                            <span>👤</span> ${escapeHtml(name)}
                        </span>
                        <div class="text-brandGold text-sm">
                            ${starsHTML}
                        </div>
                    </div>
                    <p class="text-gray-300 text-sm leading-relaxed">
                        ${escapeHtml(commentText)}
                    </p>
                    <span class="text-xs text-gray-500 mt-3 block">Agora mesmo</span>
                `;

                commentsContainer.prepend(commentCard);
                commentCount++;
                commentCountSpan.textContent = `${commentCount} comentários`;

                feedbackForm.reset();
                highlightStars(5);
                selectedRatingInput.value = '5';

                showToast('Avaliação e comentário publicados com sucesso!');
            });

            function escapeHtml(text) {
                const map = {
                    '&': '&amp;',
                    '<': '&lt;',
                    '>': '&gt;',
                    '"': '&quot;',
                    "'": '&#039;'
                };
                return text.replace(/[&<>"']/g, function(m) { return map[m]; });
            }
        });
    </script>
</body>
</html>
```