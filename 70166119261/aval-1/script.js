// MODO ESCURO

const botaoModo = document.getElementById('modoEscuro');

botaoModo.addEventListener('click', () => {

    document.body.classList.toggle('dark');

    if(document.body.classList.contains('dark')){

        botaoModo.innerHTML = '☀️';

    }else{

        botaoModo.innerHTML = '🌙';

    }

});


// LIGHTBOX GALERIA

const imagens = document.querySelectorAll('.galeria-grid img');

imagens.forEach(img => {

    img.addEventListener('click', () => {

        const overlay = document.createElement('div');

        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.background = 'rgba(0,0,0,0.9)';
        overlay.style.display = 'flex';
        overlay.style.justifyContent = 'center';
        overlay.style.alignItems = 'center';
        overlay.style.zIndex = '9999';

        const imagemGrande = document.createElement('img');

        imagemGrande.src = img.src;

        imagemGrande.style.maxWidth = '90%';
        imagemGrande.style.maxHeight = '90%';
        imagemGrande.style.borderRadius = '12px';

        overlay.appendChild(imagemGrande);

        document.body.appendChild(overlay);

        overlay.addEventListener('click', () => {
            overlay.remove();
        });

    });

});