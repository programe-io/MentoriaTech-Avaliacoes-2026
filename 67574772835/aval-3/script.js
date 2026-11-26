
// Armazenamento das atividades
const atividades = [];

const formulario = document.getElementById("formTarefa");
const painel = document.getElementById("listaTarefas");


// CADASTRAR TAREFA
formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    const codigo = document.getElementById("codigo").value.trim();
    const titulo = document.getElementById("titulo").value.trim();
    const prioridade = Number(document.getElementById("prioridade").value);

    // Validação do título
    if (titulo.length < 5) {
        alert("O título precisa ter pelo menos 5 caracteres!");
        return;
    }

    // Validação da prioridade
    if (![1, 2, 3].includes(prioridade)) {
        alert("Prioridade inválida!");
        return;
    }

    // Verificação do código
    if (atividades.find(item => item.codigo === codigo)) {
        alert("Código já utilizado!");
        return;
    }

    // Criando a tarefa
    atividades.push({
        codigo,
        titulo,
        prioridade,
        status: false
    });

    formulario.reset();

    mostrarTarefas();

    alert("Atividade adicionada!");
});


// MOSTRAR TAREFAS NA TELA
function mostrarTarefas() {

    painel.replaceChildren();

    document.getElementById("contador").textContent =
        atividades.length + " tarefas";

    if (atividades.length === 0) {

        const mensagem = document.createElement("p");
        mensagem.className = "vazio";
        mensagem.textContent = "Nenhuma tarefa cadastrada ainda.";

        painel.appendChild(mensagem);
        return;
    }

    atividades.forEach((item, posicao) => {

        // Criar cartão
        const cartao = document.createElement("div");
        cartao.className = "cartao";

        if (item.status) {
            cartao.classList.add("concluida");
        }

        // Código
        const codigo = document.createElement("p");
        codigo.textContent = "Código: " + item.codigo;

        // Título
        const titulo = document.createElement("h3");
        titulo.textContent = item.titulo;

        // Prioridade
        const prioridade = document.createElement("span");

        const classificacoes = {
            1: ["Alta", "alta"],
            2: ["Média", "media"],
            3: ["Baixa", "baixa"]
        };

        prioridade.textContent = classificacoes[item.prioridade][0];
        prioridade.className = "prioridade " +
            classificacoes[item.prioridade][1];

        // Status
        const status = document.createElement("p");
        status.textContent = item.status
            ? "Status: Concluída"
            : "Status: Pendente";

        // Área dos botões
        const botoes = document.createElement("div");
        botoes.className = "botoes";

        // Botão concluir
        const concluir = document.createElement("button");
        concluir.textContent = item.status ? "Concluída" : "Concluir";
        concluir.className = "concluir";
        concluir.dataset.acao = "concluir";
        concluir.dataset.posicao = posicao;
        concluir.disabled = item.status;

        // Botão alterar prioridade
        const alterar = document.createElement("button");
        alterar.textContent = "Prioridade";
        alterar.className = "alterar";
        alterar.dataset.acao = "alterar";
        alterar.dataset.posicao = posicao;

        botoes.append(concluir, alterar);

        cartao.append(
            codigo,
            titulo,
            prioridade,
            status,
            botoes
        );

        painel.appendChild(cartao);
    });
}


// EXECUTAR AS AÇÕES DOS CARTÕES
painel.addEventListener("click", function(event) {

    const botao = event.target.closest("button[data-acao]");

    if (!botao) return;

    const posicao = Number(botao.dataset.posicao);
    const tarefa = atividades[posicao];

    if (!tarefa) return;

    // CONCLUIR TAREFA
    if (botao.dataset.acao === "concluir") {

        tarefa.status = true;

        alert("Tarefa finalizada!");

    }

    // ALTERAR PRIORIDADE
    else if (botao.dataset.acao === "alterar") {

        const novaPrioridade = prompt(
            "Escolha a prioridade:\n\n1 - Alta\n2 - Média\n3 - Baixa"
        );

        if (novaPrioridade === null || novaPrioridade.trim() === "") {
            return;
        }

        const numero = Number(novaPrioridade);

        if (![1, 2, 3].includes(numero)) {
            alert("Escolha apenas 1, 2 ou 3!");
            return;
        }

        tarefa.prioridade = numero;

        alert("Prioridade modificada!");
    }

    mostrarTarefas();
});
