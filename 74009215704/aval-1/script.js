
// Seleciona elementos
const forumList = document.getElementById('forum-list');
const newTopicInput = document.getElementById('new-topic');

// Função para adicionar novo tópico
function addTopic() {
    const topicText = newTopicInput.value.trim();
    if (topicText === '') return; // não adiciona vazio

    // Cria o item da lista
    const li = document.createElement('li');
    li.textContent = topicText;

    // Ao clicar, marca como lido/deslido
    li.addEventListener('click', () => {
        li.classList.toggle('read');
    \});

    // Botão de remover tópico
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remover';
    removeBtn.style.marginLeft = '1rem';
    removeBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // não marca como lido
        li.remove();
    \});

    li.appendChild(removeBtn);
    forumList.appendChild(li);

    // Limpa o input
    newTopicInput.value = '';
\}

// Adiciona tópico ao pressionar Enter
newTopicInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTopic();
\});
$0