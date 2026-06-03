document.getElementById('bountyForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const nome = document.getElementById('pirateName').value;
    const multiplicador = parseInt(document.getElementById('perigo').value);
    const resultado = document.getElementById('resultadoBounty');
    const nomePoster = document.getElementById('nomePoster');
    const valorPoster = document.getElementById('valorPoster');
    const fotoPoster = document.getElementById('fotoPoster');

    // Cálculo aleatório de Berries
    const base = Math.floor(Math.random() * 1000000);
    const total = (base * multiplicador).toLocaleString('pt-BR');

    // Lista de imagens aleatórias de piratas/mar para ilustrar o cartaz gerado
    const fotosPiratas = [
        "https://images.unsplash.com/photo-1516467508483-a7212febe31a?q=80&w=300", 
        "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=300",
        "https://images.unsplash.com/photo-1559827291-72ee739d0d9a?q=80&w=300"
    ];
    
    // Escolhe uma foto da lista aleatoriamente para o novo cartaz
    const fotoAleatoria = fotosPiratas[Math.floor(Math.random() * fotosPiratas.length)];

    // Injeta os dados e a imagem na tag img do poster
    nomePoster.innerText = nome;
    valorPoster.innerText = "฿ " + total + "-";
    fotoPoster.src = fotoAleatoria;

    // Torna o cartaz visível
    resultado.classList.remove('hidden');
    
    // Scroll suave até o cartaz gerado
    resultado.scrollIntoView({ behavior: 'smooth' });
});