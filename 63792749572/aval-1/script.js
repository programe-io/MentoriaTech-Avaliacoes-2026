document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-comentario');
    const listaComentarios = document.getElementById('lista-comentarios');

    form.addEventListener('submit', (event) => {
        // Impede a página de recarregar ao enviar o formulário
        event.preventDefault();

        // Captura os valores digitados pelo usuário
        const nome = document.getElementById('nome').value;
        const texto = document.getElementById('texto').value;

        // Cria a estrutura do novo comentário
        const novoComentario = document.createElement('div');
        novoComentario.classList.add('item-comentario');
        novoComentario.innerHTML = `<strong>${nome}:</strong> <p>${texto}</p>`;

        // Adiciona o comentário na lista abaixo do formulário
        listaComentarios.appendChild(novoComentario);

        // Limpa os campos do formulário para o próximo envio
        form.reset();
    });
});