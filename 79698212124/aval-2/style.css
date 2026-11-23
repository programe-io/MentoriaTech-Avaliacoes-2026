/* ==========================================================
   FOTOTURMA — rede de fotos da turma
   ========================================================== */
:root {
  --bg: #fafafa;
  --surface: #ffffff;
  --surface-2: #f2f2f2;
  --text: #111111;
  --muted: #737373;
  --border: #e3e3e3;
  --accent: #0d9488;
  --accent-2: #6366f1;
  --like: #ed4956;
  --ring: conic-gradient(from 200deg, #14b8a6, #6366f1, #f59e0b, #14b8a6);
  --radius: 12px;
  --font: "Inter", system-ui, -apple-system, sans-serif;
  --font-logo: "Sora", "Inter", sans-serif;
}
@media (prefers-color-scheme: dark) {
  :root {
    --bg: #000000;
    --surface: #0c0c0c;
    --surface-2: #1c1c1c;
    --text: #f5f5f5;
    --muted: #a3a3a3;
    --border: #262626;
    --accent: #2dd4bf;
    --accent-2: #818cf8;
  }
}

* { box-sizing: border-box; }
html, body { margin: 0; }
body {
  background: var(--bg);
  color: var(--text);
  font-family: var(--font);
  font-size: 14px;
  line-height: 1.45;
  -webkit-font-smoothing: antialiased;
}
a { color: inherit; text-decoration: none; }
button { font: inherit; color: inherit; background: none; border: 0; padding: 0; cursor: pointer; }
input, textarea { font: inherit; color: inherit; }
svg { display: block; }
.muted { color: var(--muted); }

/* ---------- Topo ---------- */
.topbar {
  position: sticky; top: 0; z-index: 30;
  background: var(--surface);
  border-bottom: 1px solid var(--border);
}
.topbar-inner {
  max-width: 975px; margin: 0 auto; height: 60px; padding: 0 20px;
  display: flex; align-items: center; justify-content: space-between; gap: 16px;
}
.logo { display: flex; align-items: center; gap: 8px; }
.logo-icon {
  width: 30px; height: 30px; border-radius: 9px; display: grid; place-items: center;
  background: linear-gradient(135deg, var(--accent), var(--accent-2)); color: #fff;
}
.logo-text { font-family: var(--font-logo); font-weight: 800; font-size: 22px; letter-spacing: -.03em; }
.top-search {
  flex: 0 1 260px; position: relative;
}
.top-search input {
  width: 100%; height: 36px; border-radius: 8px; border: 0; background: var(--surface-2);
  padding: 0 12px 0 34px; font-size: 14px;
}
.top-search input:focus { outline: 2px solid var(--accent); }
.top-search svg { position: absolute; left: 10px; top: 50%; transform: translateY(-50%); color: var(--muted); }
.top-nav { display: flex; align-items: center; gap: 18px; }
.icon-btn { display: grid; place-items: center; width: 32px; height: 32px; border-radius: 8px; transition: transform .1s; }
.icon-btn:active { transform: scale(.9); }
.icon-btn.active svg { stroke-width: 2.6; }

.bottom-nav { display: none; }

/* ---------- Avatares ---------- */
.av {
  display: inline-grid; place-items: center; flex-shrink: 0; border-radius: 50%;
  color: #fff; font-weight: 700; width: 32px; height: 32px; font-size: 12px; letter-spacing: .02em;
  user-select: none;
}
.av.s24 { width: 24px; height: 24px; font-size: 9px; }
.av.s44 { width: 44px; height: 44px; font-size: 15px; }
.av.s56 { width: 56px; height: 56px; font-size: 19px; }
.av.s150 { width: 150px; height: 150px; font-size: 52px; }
.av.ghost { background: var(--surface-2); color: var(--muted); }

.ring { padding: 3px; border-radius: 50%; background: var(--ring); display: inline-block; }
.ring.seen { background: var(--border); }
.ring > .av { border: 3px solid var(--surface); }

/* ---------- Layout ---------- */
main { max-width: 975px; margin: 0 auto; padding: 24px 20px 80px; outline: none; }
.home { display: grid; grid-template-columns: minmax(0, 470px) 320px; gap: 56px; justify-content: center; }
.col { min-width: 0; }

/* ---------- Stories ---------- */
.stories {
  display: flex; gap: 14px; overflow-x: auto; padding: 14px 12px; margin-bottom: 20px;
  background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius);
  scrollbar-width: none; scroll-snap-type: x proximity;
}
.stories::-webkit-scrollbar { display: none; }
.story-item { display: flex; flex-direction: column; align-items: center; gap: 6px; width: 70px; flex-shrink: 0; scroll-snap-align: start; }
.story-item span.name { font-size: 12px; max-width: 70px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

/* ---------- Post ---------- */
.post { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); margin-bottom: 24px; overflow: hidden; }
.post-head { display: flex; align-items: center; gap: 10px; padding: 12px 14px; }
.post-head .who { display: flex; flex-direction: column; min-width: 0; }
.post-head .who a { font-weight: 600; }
.post-head .time { color: var(--muted); font-size: 12px; }
.post-head .menu { margin-left: auto; }
.media { position: relative; aspect-ratio: 1; background: var(--surface-2); overflow: hidden; touch-action: manipulation; cursor: pointer; user-select: none; }
.media svg, .media img { width: 100%; height: 100%; object-fit: cover; display: block; pointer-events: none; }
.heart-burst {
  position: absolute; inset: 0; display: grid; place-items: center; pointer-events: none; opacity: 0;
}
.heart-burst svg { width: 110px; height: 110px; fill: #fff; filter: drop-shadow(0 4px 18px rgba(0,0,0,.35)); }
.heart-burst.go { animation: burst .9s ease forwards; }
@keyframes burst {
  0% { opacity: 0; transform: scale(.3); }
  15% { opacity: 1; transform: scale(1.15); }
  30% { transform: scale(.95); }
  70% { opacity: 1; transform: scale(1); }
  100% { opacity: 0; transform: scale(.8); }
}
.actions { display: flex; align-items: center; gap: 14px; padding: 10px 14px 4px; }
.actions .icon-btn { width: 28px; height: 28px; }
.like-btn.on svg { fill: var(--like); stroke: var(--like); animation: pop .3s ease; }
@keyframes pop { 50% { transform: scale(1.25); } }
.likes-line { padding: 4px 14px; font-weight: 600; }
.caption { padding: 2px 14px; overflow-wrap: anywhere; }
.caption b { font-weight: 600; margin-right: 4px; }
.comments-preview { padding: 4px 14px 0; }
.comment-row { display: flex; gap: 6px; padding: 2px 0; overflow-wrap: anywhere; }
.comment-row b { font-weight: 600; flex-shrink: 0; }
.comment-row .del { margin-left: auto; color: var(--muted); font-size: 12px; flex-shrink: 0; }
.view-all { color: var(--muted); display: inline-block; padding: 2px 0; }
.add-comment { display: flex; align-items: center; gap: 8px; padding: 10px 14px 14px; border-top: 1px solid var(--border); margin-top: 10px; }
.add-comment input { flex: 1; border: 0; background: none; padding: 6px 0; min-width: 0; }
.add-comment input:focus { outline: none; }
.add-comment button { color: var(--accent); font-weight: 600; }
.add-comment button:disabled { opacity: .4; cursor: default; }

.load-more { text-align: center; padding: 10px 0 30px; }

/* ---------- Lateral ---------- */
.side { position: sticky; top: 84px; align-self: start; }
.me-card { display: flex; align-items: center; gap: 12px; margin-bottom: 22px; }
.me-card .info { display: flex; flex-direction: column; min-width: 0; flex: 1; }
.me-card .info b { font-weight: 600; }
.link-btn { color: var(--accent); font-weight: 600; font-size: 13px; }
.side h4 { margin: 0 0 12px; font-size: 14px; color: var(--muted); font-weight: 600; display: flex; justify-content: space-between; }
.user-row { display: flex; align-items: center; gap: 12px; padding: 7px 0; }
.user-row .info { display: flex; flex-direction: column; min-width: 0; flex: 1; }
.user-row .info b { font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.user-row .info span { color: var(--muted); font-size: 12px; }
.side-foot { margin-top: 24px; color: var(--muted); font-size: 12px; }

/* ---------- Botões ---------- */
.btn {
  display: inline-flex; align-items: center; justify-content: center; gap: 6px;
  height: 34px; padding: 0 16px; border-radius: 8px; font-weight: 600; font-size: 14px;
  background: var(--surface-2); color: var(--text); transition: filter .15s;
}
.btn:hover { filter: brightness(.95); }
.btn.primary { background: var(--accent); color: #fff; }
.btn.primary:disabled { opacity: .5; cursor: default; }
.btn.small { height: 30px; padding: 0 12px; font-size: 13px; }

/* ---------- Perfil ---------- */
.profile-head { display: grid; grid-template-columns: 290px 1fr; align-items: center; padding: 10px 0 40px; border-bottom: 1px solid var(--border); }
.profile-head .pic { display: flex; justify-content: center; }
.profile-head .row1 { display: flex; align-items: center; gap: 14px; flex-wrap: wrap; margin-bottom: 18px; }
.profile-head .row1 h2 { margin: 0; font-size: 20px; font-weight: 400; }
.pstats { display: flex; gap: 36px; margin-bottom: 16px; font-size: 16px; }
.pstats b { font-weight: 600; }
.pname { font-weight: 600; }
.ptabs { display: flex; justify-content: center; gap: 50px; border-top: 1px solid transparent; }
.ptabs span { display: flex; align-items: center; gap: 6px; padding: 14px 0; border-top: 1px solid var(--text); margin-top: -1px; font-size: 12px; font-weight: 600; letter-spacing: .1em; text-transform: uppercase; }
.pgrid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 4px; }
.tile { position: relative; aspect-ratio: 1; background: var(--surface-2); overflow: hidden; }
.tile svg, .tile img { width: 100%; height: 100%; object-fit: cover; }
.tile .ov {
  position: absolute; inset: 0; background: rgba(0,0,0,.35); color: #fff; font-weight: 700;
  display: flex; align-items: center; justify-content: center; gap: 22px; opacity: 0; transition: opacity .15s;
}
.tile:hover .ov { opacity: 1; }
.tile .ov span { display: flex; align-items: center; gap: 6px; }
.empty { text-align: center; padding: 60px 20px; color: var(--muted); }

/* ---------- Busca ---------- */
.narrow { max-width: 600px; margin: 0 auto; }
.search-big { position: relative; margin-bottom: 18px; }
.search-big input { width: 100%; height: 44px; border-radius: 10px; border: 1px solid var(--border); background: var(--surface); padding: 0 14px 0 40px; font-size: 15px; }
.search-big input:focus { outline: 2px solid var(--accent); border-color: transparent; }
.search-big svg { position: absolute; left: 13px; top: 50%; transform: translateY(-50%); color: var(--muted); }
.list-card { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 6px 16px; }
.list-card .user-row + .user-row { border-top: 1px solid var(--border); }

/* ---------- Novo post ---------- */
.create { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); overflow: hidden; }
.create-head { padding: 14px 16px; border-bottom: 1px solid var(--border); font-weight: 600; text-align: center; font-size: 16px; }
.create-body { display: grid; grid-template-columns: 1fr 1fr; }
.create .media { cursor: default; }
.create-side { padding: 16px; display: flex; flex-direction: column; gap: 14px; border-left: 1px solid var(--border); }
.create-side textarea { width: 100%; min-height: 140px; resize: vertical; border: 1px solid var(--border); border-radius: 10px; background: var(--bg); padding: 10px 12px; }
.create-side textarea:focus { outline: 2px solid var(--accent); border-color: transparent; }
.create-btns { display: flex; gap: 8px; flex-wrap: wrap; }
.error { color: var(--like); font-size: 13px; min-height: 1em; margin: 0; }
.file-input { position: absolute; width: 1px; height: 1px; opacity: 0; pointer-events: none; }

/* ---------- Página do post ---------- */
.back { display: inline-flex; align-items: center; gap: 6px; color: var(--muted); font-weight: 500; margin-bottom: 14px; }
.back:hover { color: var(--text); }

/* ---------- Janela "quem é você" ---------- */
.overlay {
  position: fixed; inset: 0; z-index: 60; background: rgba(0,0,0,.6);
  display: none; align-items: center; justify-content: center; padding: 20px;
}
.overlay.open { display: flex; }
.dialog {
  background: var(--surface); border-radius: 14px; width: 100%; max-width: 400px;
  max-height: 80vh; display: flex; flex-direction: column; overflow: hidden;
}
.dialog-head { padding: 14px 16px; border-bottom: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; font-weight: 600; font-size: 16px; }
.dialog-search { padding: 10px 16px; border-bottom: 1px solid var(--border); }
.dialog-search input { width: 100%; height: 36px; border: 0; border-radius: 8px; background: var(--surface-2); padding: 0 12px; }
.dialog-search input:focus { outline: 2px solid var(--accent); }
.dialog-list { overflow-y: auto; padding: 4px 16px 12px; }
.dialog-list button.user-row { width: 100%; text-align: left; }
.dialog-list button.user-row:hover b { color: var(--accent); }

/* ---------- Stories em tela cheia ---------- */
.story-view {
  position: fixed; inset: 0; z-index: 70; background: #111; display: none;
  align-items: center; justify-content: center;
}
.story-view.open { display: flex; }
.story-frame {
  position: relative; width: min(420px, 100vw); height: min(746px, 100vh);
  background: #000; border-radius: 10px; overflow: hidden; display: flex; align-items: center;
}
.story-frame .media { aspect-ratio: 1; width: 100%; cursor: default; }
.story-bars { position: absolute; top: 10px; left: 10px; right: 10px; display: flex; gap: 4px; z-index: 3; }
.story-bars div { flex: 1; height: 3px; border-radius: 3px; background: rgba(255,255,255,.35); overflow: hidden; }
.story-bars i { display: block; height: 100%; width: 0; background: #fff; }
.story-top { position: absolute; top: 22px; left: 12px; right: 12px; display: flex; align-items: center; gap: 10px; color: #fff; z-index: 3; }
.story-top b { font-weight: 600; }
.story-top .t { opacity: .75; font-size: 13px; }
.story-top .x { margin-left: auto; color: #fff; }
.story-cap { position: absolute; bottom: 24px; left: 16px; right: 16px; color: #fff; text-align: center; font-size: 16px; font-weight: 500; text-shadow: 0 1px 8px rgba(0,0,0,.6); z-index: 3; }
.story-tap { position: absolute; top: 0; bottom: 0; width: 40%; z-index: 2; }
.story-tap.l { left: 0; }
.story-tap.r { right: 0; width: 60%; }
.story-arrow {
  position: absolute; top: 50%; transform: translateY(-50%); width: 34px; height: 34px; border-radius: 50%;
  background: rgba(255,255,255,.85); color: #111; display: grid; place-items: center; z-index: 4;
}
.story-arrow.prev { left: calc(50% - 250px); }
.story-arrow.next { right: calc(50% - 250px); }

/* ---------- Aviso ---------- */
.toast {
  position: fixed; left: 50%; bottom: 80px; transform: translate(-50%, 20px);
  background: var(--text); color: var(--bg); padding: 10px 18px; border-radius: 10px;
  font-weight: 500; opacity: 0; pointer-events: none; transition: all .25s; z-index: 90;
  max-width: calc(100% - 32px);
}
.toast.show { opacity: 1; transform: translate(-50%, 0); }

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation: none !important; transition: none !important; }
}

/* ---------- Celular ---------- */
@media (max-width: 1000px) {
  .home { grid-template-columns: minmax(0, 470px); }
  .side { display: none; }
}
@media (max-width: 735px) {
  .top-search, .top-nav .hide-sm { display: none; }
  main { padding: 0 0 80px; }
  .stories { border-radius: 0; border-left: 0; border-right: 0; margin-bottom: 0; }
  .post { border-radius: 0; border-left: 0; border-right: 0; margin-bottom: 8px; }
  .bottom-nav {
    display: flex; justify-content: space-around; align-items: center;
    position: fixed; bottom: 0; left: 0; right: 0; height: 56px; z-index: 30;
    background: var(--surface); border-top: 1px solid var(--border);
    padding-bottom: env(safe-area-inset-bottom);
  }
  .profile-head { grid-template-columns: 96px 1fr; gap: 20px; padding: 18px 16px 24px; }
  .profile-head .av.s150 { width: 86px; height: 86px; font-size: 30px; }
  .pstats { gap: 20px; font-size: 14px; }
  .narrow { padding: 16px; }
  .create { border-radius: 0; border-left: 0; border-right: 0; }
  .create-body { grid-template-columns: 1fr; }
  .create-side { border-left: 0; border-top: 1px solid var(--border); }
  .back { margin: 12px 16px; }
  .story-frame { border-radius: 0; }
  .story-arrow { display: none; }
}