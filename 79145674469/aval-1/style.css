/* ==========================================================
   Caderno de Bordo — estilos
   ========================================================== */

:root {
  --bg: #f7f3ec;
  --surface: #fffdf8;
  --surface-2: #efe8dc;
  --text: #1f1b16;
  --muted: #6b6258;
  --border: #e2d9cb;
  --accent: #c2502b;
  --accent-ink: #ffffff;
  --accent-soft: #f6e1d6;
  --shadow: 0 1px 2px rgba(31, 27, 22, .05), 0 8px 24px rgba(31, 27, 22, .06);

  --font-display: "Fraunces", Georgia, serif;
  --font-body: "Source Serif 4", Georgia, serif;
  --font-ui: "Inter", system-ui, -apple-system, sans-serif;

  --radius: 14px;
  --max: 1080px;
}

[data-theme="dark"] {
  --bg: #15130f;
  --surface: #1d1a16;
  --surface-2: #27231d;
  --text: #f1ebe1;
  --muted: #a89e90;
  --border: #353028;
  --accent: #e8794f;
  --accent-ink: #1a0f0a;
  --accent-soft: #3a2419;
  --shadow: 0 1px 2px rgba(0, 0, 0, .3), 0 8px 24px rgba(0, 0, 0, .25);
}

* { box-sizing: border-box; }

html { scroll-behavior: smooth; }

body {
  margin: 0;
  background: var(--bg);
  color: var(--text);
  font-family: var(--font-ui);
  font-size: 16px;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  transition: background .25s ease, color .25s ease;
}

a { color: inherit; }

.container {
  width: 100%;
  max-width: var(--max);
  margin: 0 auto;
  padding: 0 24px;
}

main.container { outline: none; min-height: 70vh; padding-top: 40px; padding-bottom: 80px; }

.muted { color: var(--muted); }

/* ---------- Cabeçalho ---------- */
.site-header {
  position: sticky;
  top: 0;
  z-index: 20;
  background: color-mix(in srgb, var(--bg) 85%, transparent);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--border);
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 68px;
  gap: 16px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
}

.logo-mark {
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  border-radius: 10px;
  background: var(--accent);
  color: var(--accent-ink);
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 20px;
}

.logo-text {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 20px;
  letter-spacing: -.01em;
}

.nav { display: flex; align-items: center; gap: 6px; }

.nav a {
  text-decoration: none;
  font-weight: 500;
  font-size: 15px;
  padding: 8px 12px;
  border-radius: 999px;
  color: var(--muted);
  transition: color .15s, background .15s;
}

.nav a:hover { color: var(--text); background: var(--surface-2); }
.nav a.active { color: var(--text); }
.nav a.nav-cta { background: var(--text); color: var(--bg); }
.nav a.nav-cta:hover { background: var(--accent); color: var(--accent-ink); }

.icon-btn {
  display: grid;
  place-items: center;
  width: 38px;
  height: 38px;
  margin-left: 4px;
  border: 1px solid var(--border);
  border-radius: 999px;
  background: var(--surface);
  color: var(--text);
  cursor: pointer;
}
.icon-btn:hover { border-color: var(--accent); color: var(--accent); }
.icon-moon { display: none; }
[data-theme="dark"] .icon-sun { display: none; }
[data-theme="dark"] .icon-moon { display: block; }

/* ---------- Destaque (hero) ---------- */
.hero {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 40px;
  align-items: center;
  margin-bottom: 56px;
}

.eyebrow {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: .12em;
  text-transform: uppercase;
  color: var(--accent);
  margin: 0 0 12px;
}

.hero h1 {
  font-family: var(--font-display);
  font-size: clamp(32px, 5vw, 52px);
  line-height: 1.08;
  letter-spacing: -.02em;
  margin: 0 0 16px;
}

.hero h1 a { text-decoration: none; }
.hero h1 a:hover { color: var(--accent); }

.hero p.summary {
  font-family: var(--font-body);
  font-size: 19px;
  color: var(--muted);
  margin: 0 0 20px;
}

.cover {
  position: relative;
  aspect-ratio: 4 / 3;
  border-radius: var(--radius);
  overflow: hidden;
  display: grid;
  place-items: center;
  box-shadow: var(--shadow);
}

.cover span {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(48px, 10vw, 110px);
  color: rgba(255, 255, 255, .92);
  letter-spacing: -.04em;
  text-shadow: 0 4px 20px rgba(0, 0, 0, .15);
}

.cover::after {
  content: "";
  position: absolute;
  inset: 0;
  background-image: radial-gradient(rgba(255,255,255,.18) 1px, transparent 1px);
  background-size: 14px 14px;
  mix-blend-mode: overlay;
}

/* ---------- Barra de filtros ---------- */
.toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 20px 0;
  border-top: 1px solid var(--border);
  margin-bottom: 28px;
}

.toolbar h2 {
  font-family: var(--font-display);
  font-size: 26px;
  margin: 0;
}

.search {
  position: relative;
  flex: 0 1 320px;
}

.search input {
  width: 100%;
  padding: 10px 14px 10px 38px;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--text);
  font: inherit;
  font-size: 15px;
}

.search input:focus { outline: 2px solid var(--accent); outline-offset: 1px; border-color: transparent; }

.search svg {
  position: absolute;
  left: 13px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--muted);
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 28px;
}

.tag {
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--muted);
  font: inherit;
  font-size: 13px;
  font-weight: 500;
  padding: 6px 12px;
  border-radius: 999px;
  cursor: pointer;
  transition: all .15s;
}

.tag:hover { color: var(--text); border-color: var(--muted); }
.tag.active { background: var(--accent); border-color: var(--accent); color: var(--accent-ink); }

.tag-inline {
  display: inline-block;
  font-size: 12px;
  font-weight: 600;
  color: var(--accent);
  background: var(--accent-soft);
  padding: 3px 9px;
  border-radius: 999px;
  margin-right: 6px;
}

/* ---------- Grade de posts ---------- */
.grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 28px;
}

.card {
  display: flex;
  flex-direction: column;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  overflow: hidden;
  text-decoration: none;
  transition: transform .2s ease, box-shadow .2s ease, border-color .2s;
}

.card:hover { transform: translateY(-4px); box-shadow: var(--shadow); border-color: transparent; }

.card .cover { aspect-ratio: 16 / 9; border-radius: 0; box-shadow: none; }
.card .cover span { font-size: 54px; }

.card-body { padding: 18px 20px 22px; display: flex; flex-direction: column; gap: 10px; flex: 1; }

.card h3 {
  font-family: var(--font-display);
  font-size: 21px;
  line-height: 1.25;
  margin: 0;
}

.card p {
  font-family: var(--font-body);
  color: var(--muted);
  margin: 0;
  font-size: 16px;
  flex: 1;
}

.meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px 12px;
  font-size: 13px;
  color: var(--muted);
}

.meta .dot { width: 3px; height: 3px; border-radius: 50%; background: currentColor; opacity: .6; }

.badge-local {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: .06em;
  color: var(--muted);
  border: 1px dashed var(--border);
  padding: 2px 8px;
  border-radius: 6px;
}

.empty {
  text-align: center;
  padding: 60px 20px;
  color: var(--muted);
  border: 1px dashed var(--border);
  border-radius: var(--radius);
}

/* ---------- Página do post ---------- */
.progress {
  position: fixed;
  top: 0;
  left: 0;
  height: 3px;
  width: 0;
  background: var(--accent);
  z-index: 30;
  transition: width .1s linear;
}

.article { max-width: 700px; margin: 0 auto; }

.back {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  font-weight: 500;
  color: var(--muted);
  text-decoration: none;
  margin-bottom: 28px;
}
.back:hover { color: var(--accent); }

.article h1 {
  font-family: var(--font-display);
  font-size: clamp(32px, 5vw, 48px);
  line-height: 1.1;
  letter-spacing: -.02em;
  margin: 14px 0 16px;
}

.article .lead {
  font-family: var(--font-body);
  font-size: 21px;
  color: var(--muted);
  margin: 0 0 24px;
}

.article .cover { margin: 32px 0 40px; aspect-ratio: 16 / 8; }

.prose {
  font-family: var(--font-body);
  font-size: 19px;
  line-height: 1.75;
}

.prose p { margin: 0 0 1.3em; }
.prose h2 { font-family: var(--font-display); font-size: 28px; line-height: 1.25; margin: 1.8em 0 .6em; }
.prose blockquote {
  margin: 1.6em 0;
  padding: 4px 0 4px 22px;
  border-left: 3px solid var(--accent);
  font-style: italic;
  color: var(--muted);
}
.prose ul, .prose ol { padding-left: 1.3em; margin: 0 0 1.3em; }
.prose li { margin-bottom: .4em; }
.prose code {
  font-family: ui-monospace, "SF Mono", Menlo, monospace;
  font-size: .82em;
  background: var(--surface-2);
  padding: 2px 6px;
  border-radius: 5px;
}
.prose pre {
  background: #1f1b16;
  color: #f1ebe1;
  padding: 18px 20px;
  border-radius: 10px;
  overflow-x: auto;
  font-size: 15px;
  line-height: 1.55;
  margin: 0 0 1.4em;
}
.prose pre code { background: none; padding: 0; color: inherit; font-size: inherit; }

.article-actions {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  padding: 24px 0;
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  margin: 40px 0;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font: inherit;
  font-size: 14px;
  font-weight: 600;
  padding: 10px 16px;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--text);
  cursor: pointer;
  text-decoration: none;
  transition: all .15s;
}

.btn:hover { border-color: var(--accent); color: var(--accent); }
.btn.primary { background: var(--accent); border-color: var(--accent); color: var(--accent-ink); }
.btn.primary:hover { filter: brightness(1.08); color: var(--accent-ink); }
.btn.danger:hover { border-color: #c0392b; color: #c0392b; }
.btn.liked { background: var(--accent-soft); border-color: var(--accent); color: var(--accent); }
.btn.liked svg { fill: currentColor; }

.pager {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 48px;
}

.pager a {
  display: block;
  padding: 18px 20px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  text-decoration: none;
  background: var(--surface);
  transition: border-color .15s;
}
.pager a:hover { border-color: var(--accent); }
.pager small { display: block; font-size: 12px; color: var(--muted); text-transform: uppercase; letter-spacing: .08em; margin-bottom: 4px; }
.pager strong { font-family: var(--font-display); font-size: 17px; }
.pager .next { text-align: right; grid-column: 2; }

/* ---------- Comentários ---------- */
.comments h2 { font-family: var(--font-display); font-size: 26px; margin: 0 0 20px; }

.comment {
  padding: 16px 0;
  border-bottom: 1px solid var(--border);
}
.comment-head { display: flex; align-items: center; gap: 10px; margin-bottom: 6px; }
.avatar {
  width: 32px; height: 32px; border-radius: 50%;
  display: grid; place-items: center;
  font-weight: 600; font-size: 13px; color: #fff;
}
.comment-head strong { font-size: 15px; }
.comment-head time { font-size: 13px; color: var(--muted); }
.comment p { margin: 0 0 0 42px; font-family: var(--font-body); font-size: 17px; white-space: pre-wrap; overflow-wrap: anywhere; }

/* ---------- Formulários ---------- */
.form { display: grid; gap: 18px; }
.form.card-like {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 28px;
}

.field { display: grid; gap: 6px; }
.field label { font-size: 14px; font-weight: 600; }
.field .hint { font-size: 13px; color: var(--muted); }

.field input,
.field textarea,
.field select {
  font: inherit;
  font-size: 16px;
  padding: 11px 14px;
  border-radius: 10px;
  border: 1px solid var(--border);
  background: var(--bg);
  color: var(--text);
  width: 100%;
}

.field textarea { min-height: 120px; resize: vertical; font-family: var(--font-body); font-size: 17px; line-height: 1.6; }
.field textarea.tall { min-height: 280px; }

.field input:focus,
.field textarea:focus { outline: 2px solid var(--accent); outline-offset: 1px; border-color: transparent; }

.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
.form-actions { display: flex; gap: 10px; justify-content: flex-end; flex-wrap: wrap; }

.error { color: #c0392b; font-size: 14px; margin: 0; min-height: 1em; }

.page-head { max-width: 700px; margin: 0 auto 32px; }
.page-head h1 { font-family: var(--font-display); font-size: clamp(30px, 4.5vw, 44px); line-height: 1.1; margin: 0 0 10px; letter-spacing: -.02em; }
.page-head p { font-family: var(--font-body); font-size: 19px; color: var(--muted); margin: 0; }
.narrow { max-width: 700px; margin: 0 auto; }

.preview-box {
  border: 1px dashed var(--border);
  border-radius: var(--radius);
  padding: 24px;
  margin-top: 28px;
}
.preview-box > .eyebrow { margin-bottom: 16px; }

/* ---------- Sobre ---------- */
.about-grid { display: grid; grid-template-columns: 220px 1fr; gap: 40px; align-items: start; }
.about-photo {
  aspect-ratio: 1;
  border-radius: 50%;
  display: grid; place-items: center;
  background: linear-gradient(135deg, #c2502b, #e9a23b);
  color: #fff;
  font-family: var(--font-display);
  font-size: 72px;
  font-weight: 700;
}
.stats { display: flex; gap: 32px; margin: 24px 0; flex-wrap: wrap; }
.stats div strong { display: block; font-family: var(--font-display); font-size: 34px; line-height: 1; }
.stats div span { font-size: 13px; color: var(--muted); }

/* ---------- Rodapé ---------- */
.site-footer {
  border-top: 1px solid var(--border);
  padding: 32px 0;
  font-size: 14px;
}
.footer-inner { display: flex; justify-content: space-between; gap: 16px; flex-wrap: wrap; }
.footer-inner p { margin: 0; }

/* ---------- Toast ---------- */
.toast {
  position: fixed;
  left: 50%;
  bottom: 24px;
  transform: translate(-50%, 20px);
  background: var(--text);
  color: var(--bg);
  padding: 12px 20px;
  border-radius: 999px;
  font-size: 14px;
  font-weight: 500;
  opacity: 0;
  pointer-events: none;
  transition: all .25s ease;
  z-index: 50;
  max-width: calc(100% - 32px);
}
.toast.show { opacity: 1; transform: translate(-50%, 0); }

/* ---------- Animação de entrada ---------- */
.fade-in { animation: fadeIn .35s ease both; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation: none !important; transition: none !important; }
  html { scroll-behavior: auto; }
}

/* ---------- Responsivo ---------- */
@media (max-width: 900px) {
  .grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .hero { grid-template-columns: 1fr; gap: 24px; }
  .hero .cover { order: -1; aspect-ratio: 16 / 9; }
}

@media (max-width: 640px) {
  .container { padding: 0 18px; }
  .grid { grid-template-columns: 1fr; }
  .logo-text { display: none; }
  .nav a { padding: 8px 10px; }
  .form-row { grid-template-columns: 1fr; }
  .about-grid { grid-template-columns: 1fr; }
  .about-photo { width: 140px; }
  .pager { grid-template-columns: 1fr; }
  .pager .next { grid-column: 1; }
  .prose { font-size: 18px; }
  .form.card-like { padding: 20px; }
  .search { flex: 1 1 100%; }
}

/* ==========================================================
   Blog da Turma — componentes extras
   ========================================================== */

.class-hero {
  text-align: center;
  max-width: 760px;
  margin: 8px auto 56px;
}
.class-hero h1 {
  font-family: var(--font-display);
  font-size: clamp(38px, 6vw, 64px);
  line-height: 1.05;
  letter-spacing: -.02em;
  margin: 0 0 14px;
}
.class-hero .summary {
  font-family: var(--font-body);
  font-size: 20px;
  color: var(--muted);
  margin: 0;
}
.class-hero .stats { justify-content: center; }
.hero-actions { display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; }

/* Avatares */
.avatar {
  display: inline-grid;
  place-items: center;
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  color: #fff;
  font-weight: 600;
  font-size: 13px;
  letter-spacing: .02em;
}
.avatar.xs { width: 24px; height: 24px; font-size: 10px; }
.avatar.sm { width: 32px; height: 32px; font-size: 12px; }
.avatar.md { width: 64px; height: 64px; font-size: 22px; font-family: var(--font-display); }
.avatar.lg { width: 120px; height: 120px; font-size: 44px; font-family: var(--font-display); box-shadow: var(--shadow); }
.avatar.pending { background: transparent; color: var(--muted); border: 2px dashed var(--border); }

/* Grade de alunos */
.students {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 16px;
}
.student {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 22px 12px 18px;
  text-align: center;
  text-decoration: none;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  transition: transform .2s ease, box-shadow .2s ease, border-color .2s;
}
.student:hover { transform: translateY(-3px); box-shadow: var(--shadow); border-color: transparent; }
.student.pending { background: transparent; border-style: dashed; }
.student-name { font-family: var(--font-display); font-weight: 700; font-size: 16px; line-height: 1.2; }
.student-sub { font-size: 12px; color: var(--muted); }

/* Perfil */
.profile {
  display: flex;
  align-items: center;
  gap: 32px;
  margin-bottom: 44px;
  flex-wrap: wrap;
}
.profile h1 {
  font-family: var(--font-display);
  font-size: clamp(30px, 5vw, 48px);
  line-height: 1.08;
  letter-spacing: -.02em;
  margin: 0 0 10px;
}
.profile .summary { font-family: var(--font-body); font-size: 19px; color: var(--muted); margin: 0 0 18px; }

.card-author { display: flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 600; }
.author-link { display: inline-flex; align-items: center; gap: 8px; text-decoration: none; color: var(--text); }
.author-link:hover strong { color: var(--accent); }

.page-title { font-family: var(--font-display); font-size: clamp(30px, 4.5vw, 44px); line-height: 1.1; margin: 0 0 16px; letter-spacing: -.02em; }

.field select:disabled { opacity: .7; }

@media (max-width: 640px) {
  .students { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .profile { gap: 20px; }
  .avatar.lg { width: 88px; height: 88px; font-size: 32px; }
}
#alunos-sec { scroll-margin-top: 84px; }