const form = document.getElementById("formInscricao");
const lista = document.getElementById("lista");
const pesquisa = document.getElementById("pesquisa");
const total = document.getElementById("total");
const cursos = document.getElementById("cursos");
const alunos = document.getElementById("alunos");
const notificacao = document.getElementById("notificacao");

let inscricoes = JSON.parse(localStorage.getItem("inscricoes")) || [];

function salvar() {
  localStorage.setItem("inscricoes", JSON.stringify(inscricoes));
}

function mostrarNotificacao(texto) {
  notificacao.textContent = texto;
  notificacao.classList.add("mostrar");

  setTimeout(() => {
    notificacao.classList.remove("mostrar");
  }, 2500);
}

function atualizar() {
  total.textContent = inscricoes.length;
  alunos.textContent = new Set(inscricoes.map(i => i.email)).size;
  cursos.textContent = new Set(inscricoes.map(i => i.curso)).size;

  renderizar(inscricoes);
}

function renderizar(dados) {
  if (dados.length === 0) {
    lista.innerHTML = `
      <div class="empty">
        <div>📋</div>
        <h3>Nenhuma inscrição</h3>
        <p>As inscrições aparecerão aqui.</p>
      </div>
    `;
    return;
  }

  lista.innerHTML = dados.map(item => {
    const inicial = item.nome.charAt(0).toUpperCase();

    return `
      <div class="inscricao">
        <div class="usuario">
          <div class="avatar">${inicial}</div>

          <div>
            <h3>${item.nome}</h3>
            <p>${item.email}</p>
            <p>${item.telefone}</p>
          </div>
        </div>

        <div class="info">
          <div class="curso">${item.curso}</div>
          <div class="data">${item.data}</div>
        </div>

        <button
          class="excluir"
          onclick="excluirInscricao(${item.id})">
          Excluir
        </button>
      </div>
    `;
  }).join("");
}

form.addEventListener("submit", function(event) {
  event.preventDefault();

  const novaInscricao = {
    id: Date.now(),
    nome: document.getElementById("nome").value.trim(),
    email: document.getElementById("email").value.trim(),
    telefone: document.getElementById("telefone").value.trim(),
    curso: document.getElementById("curso").value,
    data: new Date().toLocaleDateString("pt-BR")
  };

  const emailExiste = inscricoes.some(
    item => item.email.toLowerCase() === novaInscricao.email.toLowerCase()
  );

  if (emailExiste) {
    mostrarNotificacao("Este e-mail já está inscrito!");
    return;
  }

  inscricoes.push(novaInscricao);
  salvar();
  atualizar();

  form.reset();

  mostrarNotificacao("✓ Inscrição realizada com sucesso!");
});

function excluirInscricao(id) {
  inscricoes = inscricoes.filter(item => item.id !== id);

  salvar();
  atualizar();

  mostrarNotificacao("Inscrição excluída.");
}

pesquisa.addEventListener("input", function() {
  const termo = pesquisa.value.toLowerCase();

  const resultado = inscricoes.filter(item =>
    item.nome.toLowerCase().includes(termo) ||
    item.email.toLowerCase().includes(termo) ||
    item.curso.toLowerCase().includes(termo)
  );

  renderizar(resultado);
});

atualizar();