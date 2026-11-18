(function () {
  "use strict";

  var KEY = "agua-treino-v1";
  var CIRC = 2 * Math.PI * 52; // circunferência do anel de progresso
  var DIAS = ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"];

  /* ---------- utilidades ---------- */
  function dateKey(d) {
    var m = d.getMonth() + 1, dd = d.getDate();
    return d.getFullYear() + "-" + (m < 10 ? "0" : "") + m + "-" + (dd < 10 ? "0" : "") + dd;
  }
  function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 6); }
  function sum(a) { return a.reduce(function (s, n) { return s + n; }, 0); }
  function $(id) { return document.getElementById(id); }

  /* ---------- estado e armazenamento ---------- */
  var state = null;
  try {
    var raw = localStorage.getItem(KEY);
    if (raw) state = JSON.parse(raw);
  } catch (e) {}

  if (!state || !state.exercises) {
    state = {
      goal: 2500,
      exercises: [
        { id: uid(), name: "Caminhada leve", min: 30 },
        { id: uid(), name: "Agachamento, 3 séries de 15", min: 10 },
        { id: uid(), name: "Alongamento", min: 10 }
      ],
      days: {} // { "2026-11-18": { water: [200, 300], done: [idDoExercicio] } }
    };
  }

  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {}
  }

  function getDay(key) {
    if (!state.days[key]) state.days[key] = { water: [], done: [] };
    return state.days[key];
  }

  /* ---------- regras ---------- */
  function waterOk(key) {
    var d = state.days[key];
    return !!d && sum(d.water) >= state.goal;
  }
  function doneCount(key) {
    var d = state.days[key];
    if (!d) return 0;
    var ids = state.exercises.map(function (e) { return e.id; });
    return d.done.filter(function (id) { return ids.indexOf(id) > -1; }).length;
  }
  function moveOk(key) {
    return state.exercises.length > 0 && doneCount(key) === state.exercises.length;
  }

  /* ---------- renderização ---------- */
  function renderWeek() {
    var box = $("week");
    box.innerHTML = "";
    var now = new Date();

    for (var i = 6; i >= 0; i--) {
      var d = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i);
      var k = dateKey(d);
      var el = document.createElement("div");
      el.className = "day" + (i === 0 ? " today" : "");
      el.innerHTML = "<small></small><b></b><div class='dots'><span class='dot w'></span><span class='dot m'></span></div>";
      el.querySelector("small").textContent = DIAS[d.getDay()];
      el.querySelector("b").textContent = d.getDate();
      if (waterOk(k)) el.querySelector(".w").classList.add("on");
      if (moveOk(k)) el.querySelector(".m").classList.add("on");
      box.appendChild(el);
    }

    // Sequência: dias seguidos com água e treino completos (hoje ainda pode estar em andamento)
    var streak = 0;
    for (var j = 0; j < 365; j++) {
      var dd = new Date(now.getFullYear(), now.getMonth(), now.getDate() - j);
      var kk = dateKey(dd);
      if (waterOk(kk) && moveOk(kk)) streak++;
      else if (j === 0) continue;
      else break;
    }
    $("streak").textContent = streak > 0
      ? streak + (streak === 1 ? " dia seguido" : " dias seguidos") + " com tudo feito"
      : "";
  }

  function renderWater() {
    var d = getDay(dateKey(new Date()));
    var total = sum(d.water);
    var pct = Math.min(total / state.goal, 1);

    $("ml").textContent = total;
    $("de").textContent = "de " + state.goal + " ml";
    $("ring").setAttribute("stroke-dashoffset", String(CIRC * (1 - pct)));
    $("meta").value = state.goal;
    $("copo-info").textContent = Math.round(total / 250 * 10) / 10 + " copos de 250 ml";

    var msg = $("msg");
    if (total >= state.goal) {
      msg.textContent = "Meta de água batida. Bom trabalho.";
      msg.className = "msg ok";
    } else {
      msg.textContent = "Faltam " + (state.goal - total) + " ml";
      msg.className = "msg";
    }

    $("hist").textContent = d.water.length
      ? "Hoje: " + d.water.join(" + ") + " ml"
      : "Nenhum registro hoje ainda.";
    $("undo").disabled = d.water.length === 0;
  }

  function renderExercises() {
    var key = dateKey(new Date());
    var d = getDay(key);
    var ul = $("lista");
    ul.innerHTML = "";

    if (!state.exercises.length) {
      var vazio = document.createElement("li");
      vazio.className = "empty";
      vazio.textContent = "Nenhum exercício na lista. Adicione o primeiro abaixo.";
      ul.appendChild(vazio);
    }

    state.exercises.forEach(function (ex) {
      var li = document.createElement("li");
      var done = d.done.indexOf(ex.id) > -1;
      if (done) li.className = "done";

      var cb = document.createElement("input");
      cb.type = "checkbox";
      cb.checked = done;
      cb.id = "cb-" + ex.id;
      cb.setAttribute("aria-label", ex.name);
      cb.addEventListener("change", function () {
        var dia = getDay(dateKey(new Date()));
        var idx = dia.done.indexOf(ex.id);
        if (cb.checked && idx < 0) dia.done.push(ex.id);
        if (!cb.checked && idx > -1) dia.done.splice(idx, 1);
        save();
        renderAll();
      });

      var nome = document.createElement("span");
      nome.className = "name";
      nome.textContent = ex.name;

      li.appendChild(cb);
      li.appendChild(nome);

      if (ex.min) {
        var mn = document.createElement("span");
        mn.className = "min";
        mn.textContent = ex.min + " min";
        li.appendChild(mn);
      }

      var x = document.createElement("button");
      x.type = "button";
      x.className = "x";
      x.textContent = "×";
      x.setAttribute("aria-label", "Remover " + ex.name);
      x.addEventListener("click", function () {
        state.exercises = state.exercises.filter(function (e) { return e.id !== ex.id; });
        save();
        renderAll();
      });
      li.appendChild(x);

      ul.appendChild(li);
    });

    var n = doneCount(key), t = state.exercises.length;
    $("ex-info").textContent = n + " de " + t + " feitos";
    $("exbar").style.width = (t ? n / t * 100 : 0) + "%";
  }

  function renderAll() {
    renderWater();
    renderExercises();
    renderWeek();
  }

  /* ---------- eventos ---------- */
  document.querySelectorAll("[data-add]").forEach(function (b) {
    b.addEventListener("click", function () {
      getDay(dateKey(new Date())).water.push(parseInt(b.getAttribute("data-add"), 10));
      save();
      renderAll();
    });
  });

  $("undo").addEventListener("click", function () {
    getDay(dateKey(new Date())).water.pop();
    save();
    renderAll();
  });

  $("meta").addEventListener("change", function () {
    var v = parseInt($("meta").value, 10);
    if (v >= 500 && v <= 8000) {
      state.goal = v;
      save();
    }
    renderAll();
  });

  $("form").addEventListener("submit", function (e) {
    e.preventDefault();
    var nome = $("novo-nome").value.trim();
    if (!nome) return;
    var min = parseInt($("novo-min").value, 10);
    state.exercises.push({ id: uid(), name: nome, min: min > 0 ? min : 0 });
    $("novo-nome").value = "";
    $("novo-min").value = "";
    save();
    renderAll();
  });

  /* ---------- início ---------- */
  var texto = new Date().toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long" });
  $("hoje").textContent = texto.charAt(0).toUpperCase() + texto.slice(1);
  renderAll();
})();