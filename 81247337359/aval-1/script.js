        button.addEventListener('click', () => {
            count++;
            // Localiza o elemento de texto do contador dentro do botão clicado
            const countSpan = button.querySelector('.like-count');
            countSpan.textContent = count;
            
            // Dá um pequeno efeito visual ao clicar
            button.style.transform = 'scale(1.1)';
            setTimeout(() => {
                button.style.transform = 'scale(1)';
            }, 100);
        });
    });
    
});