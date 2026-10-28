document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. GERADOR DInÂMICO DE ESTRELAS E NOTAS MUSICAIS
       ========================================================================== */
    const starsContainer = document.getElementById('starsContainer');
    const notesContainer = document.getElementById('notesContainer');

    // Criar Estrelas
    function createStars() {
        const starCount = 60;
        for (let i = 0; i < starCount; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.top = `${Math.random() * 100}%`;
            star.style.left = `${Math.random() * 100}%`;
            
            const size = Math.random() * 3 + 1;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            
            star.style.setProperty('--duration', `${Math.random() * 3 + 2}s`);
            starsContainer.appendChild(star);
        }
    }

    // Criar Notas Musicais Flutuantes
    function createMusicNotes() {
        const notes = ['🎵', '🎶', '🎼', '🎤', '✨'];
        const noteCount = 15;

        for (let i = 0; i < noteCount; i++) {
            const note = document.createElement('div');
            note.className = 'music-note';
            note.innerText = notes[Math.floor(Math.random() * notes.length)];
            note.style.left = `${Math.random() * 100}%`;
            note.style.setProperty('--size', `${Math.random() * 20 + 15}px`);
            note.style.setProperty('--duration', `${Math.random() * 6 + 6}s`);
            note.style.animationDelay = `${Math.random() * 5}s`;
            
            notesContainer.appendChild(note);
        }
    }

    createStars();
    createMusicNotes();

    /* ==========================================================================
       2. MENU MOBILE RESPONSIVO
       ========================================================================== */
    const mobileToggleBtn = document.getElementById('mobileToggleBtn');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    mobileToggleBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Fechar menu ao clicar num link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });

    /* ==========================================================================
       3. ROLAGEM SUAVE & LINK ATIVO NO SCROLL
       ========================================================================== */
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelector(`.nav-menu a[href*=${sectionId}]`)?.classList.add('active');
            } else {
                document.querySelector(`.nav-menu a[href*=${sectionId}]`)?.classList.remove('active');
            }
        });

        // Botão voltar ao topo
        const backToTopBtn = document.getElementById('backToTopBtn');
        if (scrollY > 400) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    // Evento Voltar ao Topo
    document.getElementById('backToTopBtn').addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    /* ==========================================================================
       4. ANIMAÇÕES FADE-IN AO ROLAR A PÁGINA
       ========================================================================== */
    const fadeInElements = document.querySelectorAll('.fade-in');

    const observerOptions = {
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeInElements.forEach(el => observer.observe(el));

    /* ==========================================================================
       5. MODAL DE GALERIA DE IMAGENS (LIGHTBOX)
       ========================================================================== */
    const galleryItems = document.querySelectorAll('.gallery-item');
    const imageModal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    const closeModal = document.getElementById('closeModal');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const imgSrc = item.querySelector('img').src;
            const caption = item.getAttribute('data-caption');

            modalImage.src = imgSrc;
            modalCaption.innerText = caption;
            imageModal.classList.add('active');
            imageModal.setAttribute('aria-hidden', 'false');
        });
    });

    closeModal.addEventListener('click', () => {
        imageModal.classList.remove('active');
        imageModal.setAttribute('aria-hidden', 'true');
    });

    imageModal.addEventListener('click', (e) => {
        if (e.target === imageModal) {
            imageModal.classList.remove('active');
            imageModal.setAttribute('aria-hidden', 'true');
        }
    });

    /* ==========================================================================
       6. VALIDAÇÃO DO FORMULÁRIO DE CONTATO
       ========================================================================== */
    const contactForm = document.getElementById('contactForm');
    const nomeInput = document.getElementById('nome');
    const emailInput = document.getElementById('email');
    const mensagemInput = document.getElementById('mensagem');

    const nomeError = document.getElementById('nomeError');
    const emailError = document.getElementById('emailError');
    const mensagemError = document.getElementById('mensagemError');
    const formStatus = document.getElementById('formStatus');

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;

        // Limpar erros prévios
        nomeError.innerText = '';
        emailError.innerText = '';
        mensagemError.innerText = '';
        formStatus.innerText = '';
        formStatus.className = 'form-status';

        // Validação Nome
        if (nomeInput.value.trim() === '') {
            nomeError.innerText = 'Por favor, informe o seu nome.';
            isValid = false;
        }

        // Validação Email
        if (emailInput.value.trim() === '') {
            emailError.innerText = 'Por favor, informe o seu e-mail.';
            isValid = false;
        } else if (!validateEmail(emailInput.value.trim())) {
            emailError.innerText = 'Por favor, insira um e-mail válido.';
            isValid = false;
        }

        // Validação Mensagem
        if (mensagemInput.value.trim() === '') {
            mensagemError.innerText = 'Escreva sua mensagem antes de enviar!';
            isValid = false;
        }

        // Sucesso na validação
        if (isValid) {
            formStatus.classList.add('success');
            formStatus.innerText = '✨ Mensagem validada com sucesso! Obrigada por entrar em contato com a Ana Julia! 💜';
            contactForm.reset();
        }
    });

});