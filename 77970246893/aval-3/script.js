function mudarAba(idAba) {
    document.querySelectorAll('.tab-content').forEach(aba => aba.classList.remove('active'));
    
    const abaAlvo = document.getElementById(idAba);
    if (abaAlvo) {
        abaAlvo.classList.add('active');
    }

    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active-link'));
    const linkAtivo = document.getElementById(`link-${idAba}`);
    if (linkAtivo) {
        linkAtivo.classList.add('active-link');
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
}