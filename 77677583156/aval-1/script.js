document.querySelectorAll('.class-item').forEach(item => {
    item.addEventListener('click', () => {
        // Remove a classe 'active' de todos os itens
        document.querySelectorAll('.class-item').forEach(i => i.classList.remove('active'));
        
        // Adiciona a classe 'active' no item clicado
        item.classList.add('active');
        
        // Obtém as informações do item clicado
        const classId = item.getAttribute('data-id');
        const classTitle = item.getAttribute('data-title');
        
        // Atualiza a interface dinâmica (Texto do player e materiais)
        document.getElementById('current-video-title').innerText = classTitle;
        document.getElementById('watching-text').innerText = `Assistindo: ${classId} - ${classTitle}`;
        
        document.getElementById('material-slide').innerText = `Slide - Aula ${classId}`;
        document.getElementById('material-summary').innerText = `Resumo - Aula ${classId}`;
    });
});
