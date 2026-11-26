<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Projetos - Estoque + Tarefas | Aulas 14 e 17</title>
<style>
  *{margin:0;padding:0;box-sizing:border-box;font-family:Arial,sans-serif}
  body{background:#f4f4f4;color:#222;padding:16px}
  main{max-width:950px;margin:0 auto}
  header{background:#111;color:#fff;padding:26px;border-radius:14px;text-align:center;margin-bottom:16px}
  header h1{font-size:24px}
  header p{margin-top:6px;color:#ccc}
  .abas{display:flex;gap:10px;margin-bottom:16px}
  .abas button{flex:1;padding:14px;border:none;border-radius:12px;font-size:16px;font-weight:bold;cursor:pointer}
  .aba-estoque{background:#f7df1e;color:#111}
  .aba-tarefas{background:#2563eb;color:#fff}
  .abas button.inativa{opacity:.45}
  .card{background:#fff;border-radius:12px;padding:20px;margin-bottom:16px;box-shadow:0 2px 10px rgba(0,0,0,.08)}
  .card h2{border-left:5px solid #111;padding-left:10px;margin-bottom:14px;font-size:19px}
  .card.tarefas h2{border-color:#2563eb}
  label{display:block;margin:10px 0 4px;font-weight:bold;font-size:14px}
  input,select{width:100%;padding:11px;border:1px solid #ccc;border-radius:8px;font-size:15px}
  .linha{display:flex;gap:12px}.linha div{flex:1}
  button{cursor:pointer}
  .btn-big{width:100%;border:none;border-radius:8px;padding:13px;font-size:15px;font-weight:bold;margin-top:14px}
  .btn-estoque{background:#111;color:#f7df1e}
  .btn-tarefas{background:#2563eb;color:#fff}
  .msg{margin-top:12px;padding:10px;border-radius:8px;font-size:14px;display:none}
  .erro{background:#ffe0e0;color:#a00;display:block}
  .sucesso{background:#d9f7d9;color:#0a6b0a;display:block}
  .resumo{display:flex;gap:12px;flex-wrap:wrap}
  .resumo div{flex:1;min-width:130px;background:#f8fafc;border-radius:10px;padding:14px;text-align:center}
  .resumo b{font-size:22px;display:block}
  .filtros{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px}
  .filtros button{border:none;padding:8px 14px;border-radius:20px;background:#eef2ff;color:#2563eb;font-weight:bold}
  .filtros button.ativo{background:#2563eb;color:#fff}
  table{width:100%;border-collapse:collapse;font-size:14px}
  th,td{border-bottom:1px solid #eee;padding:10px;text-align:left}
  th{background:#f9f9f9}
  .badge{padding:4px 9px;border-radius:20px;font-size:12px;font-weight:bold;color:#fff;white-space:nowrap}
  .p1{background:#dc2626}.p2{background:#f59e0b}.p3{background:#16a34a}
  .st-exec{background:#2563eb}.st-conc{background:#16a34a}
  .btn-mini{border:none;padding:6px 10px;border-radius:6px;font-size:12px;font-weight:bold;margin:2px;color:#fff}
  .btn-concluir{background:#16a34a}.btn-prior{background:#f59e0b}.btn-remover{background:#ef4444}.btn-editar{background:#2563eb}
  .concluida td{color:#888;text-decoration:line-through}
  .total{text-align:right;font-weight:bold;margin-top:12px}
  .regras{background:#fffbe6;border:1px solid #f7df1e;border-radius:10px;padding:14px;font-size:14px}
  .regras.tarefas{background:#eff6ff;border-color:#2563eb}
  @media(max-width:600px){.linha{flex-direction:column}table{font-size:12px}.abas{flex-direction:column}}
</style>
</head>
<body>
<main>
  <header>
    <h1>📦 + ✅ Meus 2 Projetos de JavaScript</h1>
    <p>Aula 14 - Sistema de Estoque &nbsp;•&nbsp; Aula 17 - Gerenciador de Tarefas</p>
  </header>

  <div class="abas">
    <button id="btnAbaEstoque" class="aba-estoque" onclick="mostrarAba('estoque')">📦 ESTOQUE - Aula 14</button>
    <button id="btnAbaTarefas" class="aba-tarefas inativa" onclick="mostrarAba('tarefas')">✅ TAREFAS - Aula 17</button>
  </div>

  <!-- ==================== ESTOQUE - AULA 14 ==================== -->
  <div id="aba-estoque">

    <section class="card">
      <h2>📦 Cadastrar Produto - Aula 14</h2>
      <label>Descrição (mínimo 5 caracteres)</label>
      <input type="text" id="descProduto" placeholder="Ex: Teclado Mecânico">
      <div class="linha">
        <div><label>Preço (R$)</label><input type="number" id="precoProduto" placeholder="Ex: 250"></div>
        <div><label>Quantidade</label><input type="number" id="qtdProduto" placeholder="Ex: 5"></div>
      </div>
      <button class="btn-big btn-estoque" onclick="cadastrarProdutoTela()">Cadastrar Produto</button>
      <div id="msgEstoque" class="msg"></div>
    </section>

    <section class="card">
      <h2>📦 Estoque Cadastrado</h2>
      <label>Buscar produto</label>
      <input type="text" id="buscaEstoque" placeholder="Digite descrição ou código..." oninput="listarProdutosTela()">
      <table>
        <thead><tr><th>Código</th><th>Descrição</th><th>Preço</th><th>Qtd</th><th>Total</th><th>Ação</th></tr></thead>
        <tbody id="tabelaEstoque"></tbody>
      </table>
      <div id="totalEstoque" class="total"></div>
    </section>

    <section class="card">
      <h2>Regras - Aula 14</h2>
      <div class="regras">
        • Produtos em um <b>array</b> de objetos &nbsp;•&nbsp; Código = <b>produtos.length + 1</b><br>
        • <b>validarProduto()</b> verifica antes de cadastrar &nbsp;•&nbsp; Descrição mínimo <b>5 caracteres</b><br>
        • Funções com <b>uma responsabilidade</b> cada: validar, cadastrar, listar, remover
      </div>
    </section>
  </div>

  <!-- ==================== TAREFAS - AULA 17 ==================== -->
  <div id="aba-tarefas" style="display:none">

    <section class="card tarefas">
      <h2>✅ Cadastrar Tarefa - Aula 17</h2>
      <label>Título (mínimo 5 caracteres)</label>
      <input type="text" id="tituloTarefa" placeholder="Ex: Estudar JavaScript">
      <div class="linha">
        <div>
          <label>Prioridade</label>
          <select id="prioridadeTarefa">
            <option value="1">1 - Alta 🔴</option>
            <option value="2" selected>2 - Média 🟡</option>
            <option value="3">3 - Baixa 🟢</option>
          </select>
        </div>
        <div>
          <label>Buscar</label>
          <input type="text" id="buscaTarefa" placeholder="Título ou código..." oninput="renderizarTarefas()">
        </div>
      </div>
      <button class="btn-big btn-tarefas" onclick="cadastrarTarefaTela()">+ Cadastrar Tarefa</button>
      <div id="msgTarefa" class="msg"></div>
    </section>

    <section class="card tarefas">
      <h2>✅ Resumo</h2>
      <div class="resumo">
        <div><b id="totalTarefas">0</b>Total</div>
        <div><b id="emExecucao">0</b>Em execução</div>
        <div><b id="concluidas">0</b>Concluídas</div>
      </div>
    </section>

    <section class="card tarefas">
      <h2>✅ Tarefas Cadastradas</h2>
      <div class="filtros">
        <button id="f-todas" class="ativo" onclick="setFiltro('todas')">Todas</button>
        <button id="f-exec" onclick="setFiltro('exec')">Em execução</button>
        <button id="f-conc" onclick="setFiltro('conc')">Concluídas</button>
      </div>
      <table>
        <thead><tr><th>Código</th><th>Título</th><th>Prioridade</th><th>Status</th><th>Ações</th></tr></thead>
        <tbody id="tabelaTarefas"></tbody>
      </table>
    </section>

    <section class="card tarefas">
      <h2>Regras - Aula 17</h2>
      <div class="regras tarefas">
        • Tarefas em <b>array</b> de objetos &nbsp;•&nbsp; Código por <b>gerador independente</b> (geradorCodigo++)<br>
        • <b>validarDadosDaTarefa()</b> com <b>throw</b> &nbsp;•&nbsp; Título mínimo <b>5</b>, prioridade <b>1 a 3</b> (1 = mais alta)<br>
        • <b>buscarTarefa()</b> com <b>find</b> &nbsp;•&nbsp; Status nasce <b>true</b> (em execução), concluir vira <b>false</b><br>
        • <b>alterarPrioridade()</b> reutiliza buscar + validar
      </div>
    </section>
  </div>

</main>

<script>
/* ============================================================
   PROJETO 1 - AULA 14: SISTEMA DE ESTOQUE
   ============================================================ */
let produtos = [];

function validarProduto(descricao, preco, quantidade) {
  if (descricao.length < 5) throw new Error("Descrição precisa ter no mínimo 5 caracteres!");
  if (isNaN(preco) || preco <= 0) throw new Error("Preço deve ser maior que zero!");
  if (isNaN(quantidade) || quantidade < 0) throw new Error("Quantidade não pode ser negativa!");
}

function cadastrarProduto(descricao, preco, quantidade) {
  validarProduto(descricao, preco, quantidade);
  let produto = {
    codigo: produtos.length + 1, // regra da Aula 14
    descricao: descricao,
    preco: preco,
    quantidade: quantidade
  };
  produtos.push(produto);
  return produto;
}

function listarProdutos() { return produtos; }

function removerProduto(codigo) {
  produtos = produtos.filter(p => p.codigo !== codigo);
  // Renumera para manter a regra codigo = posição (length + 1) nos próximos cadastros
  produtos.forEach((p, i) => p.codigo = i + 1);
}

/* Funções da tela - Estoque */
function msgEstoque(texto, tipo) {
  let el = document.getElementById("msgEstoque");
  el.innerText = texto; el.className = "msg " + tipo; el.style.display = "block";
}
function cadastrarProdutoTela() {
  try {
    let d = document.getElementById("descProduto").value.trim();
    let p = Number(document.getElementById("precoProduto").value);
    let q = Number(document.getElementById("qtdProduto").value);
    let novo = cadastrarProduto(d, p, q);
    msgEstoque(`Produto cadastrado! Código: ${novo.codigo}`, "sucesso");
    document.getElementById("descProduto").value = "";
    document.getElementById("precoProduto").value = "";
    document.getElementById("qtdProduto").value = "";
    listarProdutosTela();
  } catch (e) { msgEstoque("Erro: " + e.message, "erro"); }
}
function removerProdutoTela(codigo) {
  removerProduto(codigo);
  msgEstoque(`Produto ${codigo} removido!`, "sucesso");
  listarProdutosTela();
}
function listarProdutosTela() {
  let termo = document.getElementById("buscaEstoque").value.toLowerCase();
  let tabela = document.getElementById("tabelaEstoque");
  let totalGeral = 0;
  tabela.innerHTML = "";
  let lista = listarProdutos().filter(p => p.descricao.toLowerCase().includes(termo) || String(p.codigo) === termo);
  if (lista.length === 0) tabela.innerHTML = `<tr><td colspan="6" style="text-align:center;color:#888;padding:20px">Nenhum produto encontrado.</td></tr>`;
  for (let p of lista) {
    let total = p.preco * p.quantidade;
    totalGeral += total;
    tabela.innerHTML += `<tr><td>#${p.codigo}</td><td>${p.descricao}</td><td>R$ ${p.preco.toFixed(2)}</td><td>${p.quantidade}</td><td>R$ ${total.toFixed(2)}</td><td><button class="btn-mini btn-remover" onclick="removerProdutoTela(${p.codigo})">Remover</button></td></tr>`;
  }
  document.getElementById("totalEstoque").innerText = "Valor total em estoque: R$ " + totalGeral.toFixed(2);
}

/* ============================================================
   PROJETO 2 - AULA 17: GERENCIADOR DE TAREFAS
   ============================================================ */
let tarefas = [];
let geradorCodigo = 0; // independente, não usa tarefas.length
let filtroAtual = 'todas';

function validarDadosDaTarefa(titulo, prioridade) {
  if (titulo.length < 5) throw new Error("O título deve ter no mínimo 5 caracteres!");
  if (prioridade < 1 || prioridade > 3) throw new Error("Informe uma prioridade entre 1 e 3!");
}
function buscarTarefa(codigo) {
  let tarefa = tarefas.find(t => t.codigo === codigo);
  if (!tarefa) throw new Error("Código não encontrado!");
  return tarefa;
}
function cadastrarTarefa(titulo, prioridade) {
  validarDadosDaTarefa(titulo, prioridade);
  geradorCodigo++;
  let tarefa = { codigo: geradorCodigo, titulo: titulo, prioridade: prioridade, status: true };
  tarefas.push(tarefa);
  return tarefa;
}
function listarTarefas() { return tarefas; }
function concluirTarefa(codigo) {
  let tarefa = buscarTarefa(codigo);
  if (tarefa.status === false) throw new Error("A tarefa já estava concluída!");
  tarefa.status = false;
  return tarefa;
}
function alterarPrioridade(codigo, novaPrioridade) {
  let tarefa = buscarTarefa(codigo);
  validarDadosDaTarefa(tarefa.titulo, novaPrioridade); // reutiliza validação
  tarefa.prioridade = novaPrioridade;
  return tarefa;
}

/* Funções da tela - Tarefas */
function msgTarefa(texto, tipo) {
  let el = document.getElementById("msgTarefa");
  el.innerText = texto; el.className = "msg " + tipo; el.style.display = "block";
}
function cadastrarTarefaTela() {
  try {
    let titulo = document.getElementById("tituloTarefa").value.trim();
    let prioridade = Number(document.getElementById("prioridadeTarefa").value);
    let nova = cadastrarTarefa(titulo, prioridade);
    msgTarefa(`Tarefa cadastrada! Código: ${nova.codigo}`, "sucesso");
    document.getElementById("tituloTarefa").value = "";
    renderizarTarefas();
  } catch (e) { msgTarefa("Erro: " + e.message, "erro"); }
}
function concluirTarefaTela(codigo) {
  try { concluirTarefa(codigo); msgTarefa(`Tarefa ${codigo} concluída!`, "sucesso"); renderizarTarefas(); }
  catch (e) { msgTarefa("Erro: " + e.message, "erro"); }
}
function alterarPrioridadeTela(codigo) {
  let nova = Number(prompt("Nova prioridade (1 a 3) - 1 Alta, 2 Média, 3 Baixa:"));
  if (!nova) return;
  try { alterarPrioridade(codigo, nova); msgTarefa(`Prioridade da tarefa ${codigo} alterada para ${nova}!`, "sucesso"); renderizarTarefas(); }
  catch (e) { msgTarefa("Erro: " + e.message, "erro"); }
}
function setFiltro(f) {
  filtroAtual = f;
  document.querySelectorAll(".filtros button").forEach(b => b.classList.remove("ativo"));
  document.getElementById(f === 'todas' ? 'f-todas' : f === 'exec' ? 'f-exec' : 'f-conc').classList.add("ativo");
  renderizarTarefas();
}
function textoPrioridade(p) { return p === 1 ? "1 - Alta" : p === 2 ? "2 - Média" : "3 - Baixa"; }
function renderizarTarefas() {
  let termo = document.getElementById("buscaTarefa").value.toLowerCase();
  let lista = listarTarefas().filter(t => {
    let busca = t.titulo.toLowerCase().includes(termo) || String(t.codigo) === termo;
    let filtro = filtroAtual === 'todas' ? true : filtroAtual === 'exec' ? t.status === true : t.status === false;
    return busca && filtro;
  });
  let tabela = document.getElementById("tabelaTarefas");
  tabela.innerHTML = "";
  if (lista.length === 0) tabela.innerHTML = `<tr><td colspan="5" style="text-align:center;color:#888;padding:20px">Nenhuma tarefa encontrada.</td></tr>`;
  for (let t of lista) {
    tabela.innerHTML += `<tr class="${t.status === false ? 'concluida' : ''}">
      <td>#${t.codigo}</td><td>${t.titulo}</td>
      <td><span class="badge p${t.prioridade}">${textoPrioridade(t.prioridade)}</span></td>
      <td><span class="badge ${t.status ? 'st-exec' : 'st-conc'}">${t.status ? 'Em execução' : 'Concluída'}</span></td>
      <td>
        ${t.status ? `<button class="btn-mini btn-concluir" onclick="concluirTarefaTela(${t.codigo})">Concluir</button>` : ''}
        <button class="btn-mini btn-prior" onclick="alterarPrioridadeTela(${t.codigo})">Prioridade</button>
      </td></tr>`;
  }
  document.getElementById("totalTarefas").innerText = tarefas.length;
  document.getElementById("emExecucao").innerText = tarefas.filter(t => t.status === true).length;
  document.getElementById("concluidas").innerText = tarefas.filter(t => t.status === false).length;
}

/* Abas */
function mostrarAba(qual) {
  document.getElementById("aba-estoque").style.display = qual === 'estoque' ? 'block' : 'none';
  document.getElementById("aba-tarefas").style.display = qual === 'tarefas' ? 'block' : 'none';
  document.getElementById("btnAbaEstoque").classList.toggle("inativa", qual !== 'estoque');
  document.getElementById("btnAbaTarefas").classList.toggle("inativa", qual !== 'tarefas');
}

/* ===== DADOS DE TESTE (iguais aos das aulas) ===== */
cadastrarProduto("Mouse", 80, 10);
cadastrarProduto("Teclado Mecânico", 250, 5);
listarProdutosTela();

cadastrarTarefa("Estudar JavaScript", 1);
cadastrarTarefa("Fazer exercícios da aula", 2);
cadastrarTarefa("Revisar funções e arrays", 3);
concluirTarefa(2);
renderizarTarefas();
</script>
</body>
</html>