// Mostrar/ocultar curiosidade
const botaoInfo = document.getElementById('maisInfoBtn');
const caixaCuriosidade = document.getElementById('curiosidade');

botaoInfo.addEventListener('click', () => {
    caixaCuriosidade.classList.toggle('oculto');
    botaoInfo.textContent = caixaCuriosidade.classList.contains('oculto') 
        ? 'Ver curiosidade' 
        : 'Ocultar curiosidade';
});

// Adicionar novo álbum na lista
const botaoAdicionar = document.getElementById('adicionarAlbum');
const entradaAlbum = document.getElementById('novoAlbum');
const listaAlbuns = document.getElementById('lista-albuns');

botaoAdicionar.addEventListener('click', () => {
    const nomeAlbum = entradaAlbum.value.trim();
    
    if (nomeAlbum !== '') {
        const novoItem = document.createElement('li');
        novoItem.textContent = nomeAlbum;
        listaAlbuns.appendChild(novoItem);
        entradaAlbum.value = '';
    } else {
        alert('Por favor, digite o nome do álbum!');
    }
});

// Permitir adicionar ao pressionar Enter
entradaAlbum.addEventListener('keypress', (evento) => {
    if (evento.key === 'Enter') {
        botaoAdicionar.click();
    }
});