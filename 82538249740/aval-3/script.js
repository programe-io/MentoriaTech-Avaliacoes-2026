function abrirAba(id) {
    document.getElementById('painel-perfil').style.display = 'none';
    document.getElementById(id).style.display = 'block';
}

function voltar() {
    document.querySelectorAll('.conteudo-aba').forEach(aba => aba.style.display = 'none');
    document.getElementById('painel-perfil').style.display = 'block';
}

function sortearVibe() {
    const vibes = [
        "😴 Ignorar o mundo e capotar.", 
        "🍻 Chamar os amigos pro rolê.", 
        "🚫 Faltar aula mentalmente.", 
        "🍕 Pedir uma pizza.", 
        "🚀 Sobreviver ao dia."
    ];
    document.getElementById("status-atual").innerHTML = vibes[Math.floor(Math.random() * vibes.length)];
}