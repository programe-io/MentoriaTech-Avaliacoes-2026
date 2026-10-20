// Seleciona a área de atividades do site const secaoAtividades = document.getElementById("atividades");

if (secaoAtividades) { const titulo = secaoAtividades.querySelector("h2"); const lista = secaoAtividades.querySelector(".tarefas");

// Cria o campo para adicionar novas tarefas const formulario = document.createElement("form"); formulario.className = "nova-tarefa";

formulario.innerHTML = ` <input type="text" id="nomeTarefa" placeholder="Digite uma nova atividade..." aria-label="Nome da nova atividade" maxlength="100" required

>
<button type="submit">+ Adicionar</button>


`;

// Mostra o progresso das tarefas const progresso = document.createElement("div"); progresso.className = "progresso-escolar"; progresso.innerHTML =
<p id="textoProgresso">0 atividades concluídas</p>
<div class="progresso-fundo">
<div id="progressoBarra"></div>
</div>
;

if (lista) { lista.before(formulario); lista.before(progresso);

// Atualiza o contador e a barra de progresso
function atualizarProgresso() {
  const caixas = lista.querySelectorAll('input[type="checkbox"]');
  const total =