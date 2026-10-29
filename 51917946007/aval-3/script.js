document.addEventListener('DOMContentLoaded', () => {
    initAudioPlayer();
    initFanComments();
    initMobileMenu();
    initScrollAnimations();
\});

/* ==========================================================================
   1. PLAYER DE ÁUDIO SINTETIZADO (Sintonizador / Melodia)
   ========================================================================== */
function initAudioPlayer() {
    let audioCtx = null;

    window.playAudioDemo = function(frequency) {
        // Inicializa o contexto de áudio na primeira interação do usuário
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        \}

        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        \}

        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        // Configuração do oscilador para som suave (onda senoidal)
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(frequency, audioCtx.currentTime);

        // Envelope do som (fade out natural de 1.5 segundos)
        gainNode.gain.setValueAtTime(0.15, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1.5);

        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 1.5);
    \};
\}

/* ==========================================================================
   2. ESPAÇO FÃ COM PERSISTÊNCIA EM LOCALSTORAGE
   ========================================================================== */
function initFanComments() {
    const commentForm = document.getElementById('commentForm');
    const commentList = document.getElementById('commentList');

    if (!commentForm || !commentList) return;

    // Carrega comentários salvos previamente no navegador
    loadSavedComments();

    commentForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const nameInput = document.getElementById('fanName');
        const messageInput = document.getElementById('fanMessage');

        const name = nameInput.value.trim();
        const message = messageInput.value.trim();

        if (name && message) {
            const newComment = {
                id: Date.now(),
                name: name,
                message: message,
                date: new Date().toLocaleDateString('pt-BR')
            \};

            renderCommentCard(newComment, true);
            saveCommentToStorage(newComment);

            nameInput.value = '';
            messageInput.value = '';
        \}
    \});

    function renderCommentCard(comment, isNew = false) {
        const card = document.createElement('div');
        card.className = 'comment-card';
        if (isNew) card.style.animation = 'fadeIn 0.5s ease-in-out';

        const author = document.createElement('div');
        author.className = 'comment-author';
        author.textContent = `\${comment.name\} • \${comment.date || 'Hoje'\}`;

        const text = document.createElement('p');
        text.textContent = `"\${comment.message\}"`;

        card.appendChild(author);
        card.appendChild(text);

        commentList.prepend(card);
    \}

    function saveCommentToStorage(comment) {
        const comments = JSON.parse(localStorage.getItem('marilia_fan_comments')) || [];
        comments.push(comment);
        localStorage.setItem('marilia_fan_comments', JSON.stringify(comments));
    \}

    function loadSavedComments() {
        const comments = JSON.parse(localStorage.getItem('marilia_fan_comments')) || [];
        comments.forEach(comment => renderCommentCard(comment));
    \}
\}

/* ==========================================================================
   3. MENU NAVEGAÇÃO RESPONSIVO (MOBILE)
   ========================================================================== */
function initMobileMenu() {
    const toggleBtn = document.querySelector('.menu-toggle');
    const navUl = document.querySelector('nav ul');

    if (toggleBtn && navUl) {
        toggleBtn.addEventListener('click', () => {
            navUl.classList.toggle('active');
        \});
    \}
\}

/* ==========================================================================
   4. EFEITO SUAVE DE REVELAÇÃO AO ROLAR A PÁGINA (SCROLL REVEAL)
   ========================================================================== */
function initScrollAnimations() {
    const cards = document.querySelectorAll('.card, .music-item');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            \}
        \});
    \}, {
        threshold: 0.1
    \});

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    \});$0