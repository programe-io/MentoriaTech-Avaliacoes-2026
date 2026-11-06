<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Gerenciador de Tarefas</title>
<style>
:root{--bg:#eef1f6;--card:#fff;--ink:#1b2330;--mut:#5d6878;--line:#d5dbe5;--acc:#2f5bea;--p1:#d6334a;--p2:#e08a00;--p3:#2a9d6a;--err:#b3261e;--errbg:#fde8e6}
@media (prefers-color-scheme:dark){:root{--bg:#10151d;--card:#19212c;--ink:#e7ecf3;--mut:#9aa5b5;--line:#2b3544;--acc:#7f9cff;--p1:#ff6b7f;--p2:#ffb347;--p3:#4cc38a;--err:#ffb4ab;--errbg:#3a1d1b}}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--ink);font-family:system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;line-height:1.5}
main{max-width:720px;margin:0 auto;padding:28px 16px 48px}
h1{font-size:2rem;font-weight:800;margin:0 0 4px;letter-spacing:-.02em}
.sub{color:var(--mut);margin:0 0 24px}
.card{background:var(--card);border:1px solid var(--line);border-radius:12px;padding:18px;margin-bottom:20px}
form{display:grid;grid-template-columns:1fr 150px auto;gap:12px;align-items:end}
label{display:block;font-size:.85rem;font-weight:600;margin-bottom:4px}
input,select,button{font:inherit;color:inherit}
input,select{width:100%;padding:10px;border:1px solid var(--line);border-radius:8px;background:var(--bg)}
button{cursor:pointer;border:0;border-radius:8px;padding:10px 16px;background:var(--acc);color:#fff;font-weight:600}
button.sec{background:transparent;color:var(--acc);border:1px solid var(--acc);padding:6px 10px;font-size:.85rem}
button:disabled{opacity:.4;cursor:default}
:focus-visible{outline:3px solid var(--acc);outline-offset:2px}
#erro{display:none;margin-top:12px;padding:10px 12px;border-radius:8px;background:var(--errbg);color:var(--err);font-weight:600}
ul{list-style:none;margin:0;padding:0}
li{display:flex;gap:12px;align-items:center;padding:14px 0;border-bottom:1px solid var(--line);flex-wrap:wrap}
li:last-child{border-bottom:0}
.cod{font-weight:800;color:var(--mut);min-width:2.2rem}
.tit{flex:1;min-width:140px;font-weight:600}
.feita .tit{text-decoration:line-through;color:var(--mut)}
.badge{font-size:.8rem;font-weight:800;padding:2px 10px;border-radius:99px;border:2px solid currentColor}
.p1{color:var(--p1)}.p2{color:var(--p2)}.p3{color:var(--p3)}
.acoes{display:flex;gap:8px;align-items:center}
.acoes select{width:auto;padding:5px 8px;font-size:.85rem}
.vazio{color:var(--mut);padding:8px 0}
@media (max-width:560px){form{grid-template-columns:1fr}}
</style>
</head>
<body>
<main>
  <h1>Gerenciador de Tarefas</h1>
  <p class="sub">Prioridade 1 é a mais alta e 3 a mais baixa. O título precisa ter pelo menos 5 caracteres.</p>

  <section class="card">
    <form id="form">
      <div>
        <label for="titulo">Título da tarefa</label>
        <input id="titulo" autocomplete="off">
      </div>
      <div>
        <label for="prioridade">Prioridade</label>
        <select id="prioridade">
          <option value="1">1 (alta)</option>
          <option value="2" selected>2 (média)</option>
          <option value="3">3 (baixa)</option>
        </select>
      </div>
      <button type="submit">Cadastrar tarefa</button>
    </form>
    <div id="erro" role="alert"></div>
  </section>

  <section class="card">
    <ul id="lista"></ul>
  </section>
</main>

<script>
// ===== Lógica do projeto (funções da aula) =====
const tarefas = [];
let geradorDeCodigo = 0;

function validarDadosDaTarefa(titulo, prioridade) {
  if (titulo.length < 5) {
    throw new Error("O título deve ter no mínimo 5 caracteres.");
  }
  if (prioridade < 1 || prioridade > 3) {
    throw new Error("A prioridade deve ser um valor entre 1 e 3.");
  }
}

function buscarTarefa(codigo) {
  const tarefa = tarefas.find((t) => t.codigo === codigo);
  if (!tarefa) {
    throw new Error("Tarefa com o código " + codigo + " não encontrada.");
  }
  return tarefa;
}

function cadastrarTarefa(titulo, prioridade) {
  validarDadosDaTarefa(titulo, prioridade);
  geradorDeCodigo++;
  const novaTarefa = {
    codigo: geradorDeCodigo,
    titulo: titulo,
    prioridade: prioridade,
    status: true // true = em execução, false = concluída
  };
  tarefas.push(novaTarefa);
}

function listarTarefas() {
  return tarefas;
}

function concluirTarefa(codigo) {
  const tarefa = buscarTarefa(codigo);
  if (!tarefa.status) {
    throw new Error("A tarefa " + codigo + " já estava concluída.");
  }
  tarefa.status = false;
}

function alterarPrioridade(codigo, novaPrioridade) {
  const tarefa = buscarTarefa(codigo);
  validarDadosDaTarefa(tarefa.titulo, novaPrioridade);
  tarefa.prioridade = novaPrioridade;
}

//