// Aguarda o carregamento completo do DOM
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Seleção de elementos
    const button = document.querySelector('#meuBotao');
    const input = document.querySelector('#meuInput');
    const resultado = document.querySelector('#resultado');

    // 2. Manipulação de eventos
    if (button) {
        button.addEventListener('click', async () => {
            const valorInput = input ? input.value.trim() : '';

            if (!valorInput) {
                mostrarMensagem('Por favor, digite algo!', 'erro');
                return;
            }

            mostrarMensagem('Carregando dados...', 'info');

            try {
                // Exemplo de requisição assíncrona (Fetch API)
                const dados = await buscarDados(valorInput);
                mostrarMensagem(`Sucesso: ${dados.title}`, 'sucesso');
            } catch (error) {
                mostrarMensagem('Erro ao buscar dados.', 'erro');
                console.error(error);
            }
        });
    }

    // 3. Função para simular ou realizar busca de dados (API)
    async function buscarDados(termo) {
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos/1`);
        if (!response.ok) {
            throw new Error('Falha na requisição');
        }
        return await response.json();
    }

    // 4. Função auxiliar para atualizar a interface
    function mostrarMensagem(texto, tipo) {
        if (resultado) {
            resultado.textContent = texto;
            resultado.className = `status-${tipo}`;
        }
    }
});
```<FollowUp label="Quer juntar esses três blocos (HTML, CSS e JavaScript) em um exemplo funcional?" query="Junte os blocos de HTML, CSS e JavaScript em um único exemplo completo e funcional."/>