(function(){
  var KEY = 'tarefas-v1';
  var ordem = {alta:0, media:1, baixa:2};
  var tarefas = carregar();

  function carregar(){
    try { var r = localStorage.getItem(KEY); var d = r ? JSON.parse(r) : null; if (Array.isArray(d)) return d; } catch(e){}
    return [
      {id:1, titulo:'Responder e-mails pendentes', prio:'media', prazo:'', feita:false},
      {id:2, titulo:'Enviar relatório da semana', prio:'alta', prazo:'', feita:false},
      {id:3, titulo:'Organizar a mesa de trabalho', prio:'baixa', prazo:'', feita:true}
    ];
  }
  function salvar(){ try { localStorage.setItem(KEY, JSON.stringify(tarefas)); } catch(e){} }

  var $ = function(id){ return document.getElementById(id); };
  var labels = {alta:'Alta', media:'Média', baixa:'Baixa'};

  function hoje(){ var d = new Date(); d.setHours(0,0,0,0); return d; }
  function fmt(s){ var p = s.split('-'); return p[2] + '/' + p[1] + '/' + p[0]; }

  function item(t){
    var li = document.createElement('li');
    li.dataset.p = t.prio;

    var body = document.createElement('div'); body.className = 'body';
    var ti = document.createElement('div'); ti.className = 'title'; ti.textContent = t.titulo;
    var me = document.createElement('div'); me.className = 'meta';
    var txt = 'Prioridade ' + labels[t.prio].toLowerCase();
    me.textContent = txt;
    if (t.prazo){
      var sp = document.createElement('span');
      var atrasada = !t.feita && new Date(t.prazo + 'T00:00:00') < hoje();
      sp.textContent = ' • Prazo: ' + fmt(t.prazo) + (atrasada ? ' (atrasada)' : '');
      if (atrasada) sp.className = 'late';
      me.appendChild(sp);
    }
    body.appendChild(ti); body.appendChild(me);

    var rs = document.createElement('button');
    rs.className = 'resolve'; rs.type = 'button';
    rs.textContent = t.feita ? 'Reabrir' : 'Resolver';
    rs.onclick = function(){ t.feita = !t.feita; salvar(); render(); };

    var del = document.createElement('button');
    del.className = 'del'; del.type = 'button'; del.textContent = '\u00d7';
    del.setAttribute('aria-label', 'Excluir tarefa');
    del.onclick = function(){ tarefas = tarefas.filter(function(x){ return x.id !== t.id; }); salvar(); render(); };

    li.appendChild(body); li.appendChild(rs); li.appendChild(del);
    return li;
  }

  function lista(el, arr, vazio){
    el.innerHTML = '';
    if (!arr.length){
      var li = document.createElement('li');
      li.style.cssText = 'display:block;border-left-width:1px;background:transparent;border-style:dashed';
      var p = document.createElement('p'); p.className = 'empty'; p.style.cssText = 'border:0;padding:6px'; p.textContent = vazio;
      li.appendChild(p); el.appendChild(li); return;
    }
    arr.forEach(function(t){ el.appendChild(item(t)); });
  }

  function render(){
    var pend = tarefas.filter(function(t){ return !t.feita; }).sort(function(a,b){
      if (ordem[a.prio] !== ordem[b.prio]) return ordem[a.prio] - ordem[b.prio];
      if (a.prazo && b.prazo) return a.prazo < b.prazo ? -1 : 1;
      return a.prazo ? -1 : b.prazo ? 1 : 0;
    });
    var feitas = tarefas.filter(function(t){ return t.feita; });
    lista($('pendentes'), pend, 'Nada pendente. Adicione uma tarefa acima.');
    lista($('resolvidas'), feitas, 'Nenhuma tarefa resolvida ainda.');
    $('c1').textContent = pend.length;
    $('c2').textContent = feitas.length;
    var total = tarefas.length;
    var pct = total ? Math.round(feitas.length / total * 100) : 0;
    $('pct').textContent = pct + '%';
    $('bar').style.width = pct + '%';
    $('sub').textContent = pend.length === 0 ? (total ? 'Tudo resolvido!' : 'Comece adicionando uma tarefa.')
      : pend.length + (pend.length === 1 ? ' tarefa para concluir' : ' tarefas para concluir');
    $('limpar').style.display = feitas.length ? '' : 'none';
  }

  $('form').addEventListener('submit', function(e){
    e.preventDefault();
    var titulo = $('titulo').value.trim();
    if (!titulo) return;
    tarefas.push({id: Date.now(), titulo: titulo, prio: $('prio').value, prazo: $('prazo').value, feita: false});
    salvar(); render();
    $('titulo').value = ''; $('prazo').value = ''; $('titulo').focus();
  });

  $('limpar').addEventListener('click', function(){
    tarefas = tarefas.filter(function(t){ return !t.feita; });
    salvar(); render();
  });

  render();
})();