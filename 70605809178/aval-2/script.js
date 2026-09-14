document.addEventListener('DOMContentLoaded', () => {
    const btnFrase = document.getElementById('btn-frase');
    const btnCor = document.getElementById('btn-cor');
    const inputTarefa = document.getElementById('nova-tarefa');
    const btnAdicionar = document.getElementById('btn-adicionar');
    const listaTarefas = document.getElementById('lista-tarefas');

    // 1. Frase marcante de Colin McRae
    if (btnFrase) {
        btnFrase.addEventListener('click', () => {
            alert('"Straight roads are for fast cars, turns are for fast drivers." — Colin McRae');
        \});
    \}

    // 2. Alternar fundo para a cor oficial (Sonic Blue)
    if (btnCor) {
        btnCor.addEventListener('click', () => {
            document.body.style.backgroundColor = "#001f4d";
            alert("Cor alterada para o tom World Rally Blue da Subaru!");
        \});
    \}

    // 3. Adicionar novos marcos à lista
    if (btnAdicionar && inputTarefa && listaTarefas) {
        const adicionarItem = () => {
            const texto = inputTarefa.value.trim();

            if (texto !== "") {
                const novoItem = document.createElement('li');
                novoItem.textContent = texto;
                listaTarefas.appendChild(novoItem);
                inputTarefa.value = "";
            \} else {
                alert("Digite algum marco ou conquista da equipe!");
            \}
        \};

        btnAdicionar.addEventListener('click', adicionarItem);

        inputTarefa.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                adicionarItem();
            \}
        \});
    \}
\});$0