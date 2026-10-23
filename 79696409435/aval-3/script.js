root {
  --bg: #0b1220;
  --surface: #111b2c;
  --surface-soft: #152238;
  --border: #26354b;
  --text: #e8eef8;
  --muted: #91a0b6;
  --purple: #7772f5;
  --purple-light: #a6a2ff;
}
* { box-sizing: border-box; }
body { margin: 0; min-height: 100vh; background: var(--bg); color: var(--text); font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
button, input, select { font: inherit; }
button { cursor: pointer; }
button:focus-visible, input:focus-visible, select:focus-visible { outline: 2px solid var(--purple-light); outline-offset: 3px; }
.app-shell { min-height: 100vh; display: flex; flex-direction: column; }
.topbar { min-height: 82px; display: flex; align-items: center; justify-content: space-between; padding: 18px 30px; border-bottom: 1px solid var(--border); background: #0d1727; }
.brand h1 { margin: 0; font-size: 20px; letter-spacing: -.5px; }
.brand p { margin: 4px 0 0; color: var(--muted); font-size: 12px; }
.user-actions { display: flex; align-items: center; gap: 18px; }
.icon-button { position: relative; display: grid; place-items: center; width: 40px; height: 40px; border: 1px solid var(--border); border-radius: 12px; color: var(--muted); background: transparent; font-size: 20px; }
.icon-button:hover, .more-button:hover { background: var(--surface-soft); color: white; }
.notification-dot { position: absolute; width: 7px; height: 7px; top: 8px; right: 8px; border-radius: 50%; background: #f97373; }
.profile-button { display: flex; align-items: center; gap: 10px; border: 0; color: var(--text); background: transparent; font-size: 13px; }
.avatar { width: 34px; height: 34px; display: grid; place-items: center; border-radius: 50%; background: #38346f; color: #d5d3ff; font-weight: 700; }
.page-layout { display: flex; flex: 1; min-height: 0; }
.sidebar { width: 245px; flex-shrink: 0; display: flex; flex-direction: column; justify-content: space-between; padding: 26px 16px 18px; border-right: 1px solid var(--border); background: #0d1727; }
.nav-heading { padding: 0 12px; margin: 0 0 14px; color: #74849b; font-size: 10px; font-weight: 700; letter-spacing: 1.1px; }
.nav-link { width: 100%; display: flex; align-items: center; gap: 12px; margin-bottom: 6px; padding: 12px; border: 0; border-radius: 10px; text-align: left; color: #a6b3c7; background: transparent; font-size: 13px; transition: .2s ease; }
.nav-link > i { font-size: 19px; }
.nav-link:hover { color: white; background: #17243a; }
.nav-link.active { color: #f5f4ff; background: #39356f; }
.nav-link span:nth-child(2) { flex: 1; }
.nav-mark { color: #a6a2ff; font-size: 20px; }
.nav-count { padding: 3px 7px; border-radius: 7px; color: #b8b5ff; background: #302d5c; font-size: 11px; }
.sidebar-bottom { display: flex; flex-direction: column; gap: 20px; }
.upgrade-card { padding: 16px; border: 1px solid #34365f; border-radius: 14px; background: linear-gradient(140deg, #211f46, #151d31); }
.upgrade-icon { display: grid; place-items: center; width: 32px; height: 32px; margin-bottom: 13px; border-radius: 10px; color: #c4c1ff; background: #3a3674; font-size: 18px; }
.upgrade-card strong { font-size: 12px; }
.upgrade-card p { margin: 7px 0 0; color: var(--muted); font-size: 11px; line-height: 1.6; }
.main-content { flex: 1; min-width: 0; padding: 34px; overflow-y: auto; }
.content-wrap { max-width: 1400px; margin: 0 auto; }
.welcome-section { display: flex; justify-content: space-between; align-items: center; gap: 20px; margin-bottom: 32px; }
.eyebrow { margin: 0 0 9px; color: #918df8; font-size: 10px; font-weight: 800; letter-spacing: 1.2px; }
.welcome-section h2 { margin: 0; font-size: clamp(25px, 3vw, 31px); letter-spacing: -.8px; }
.welcome-text { margin: 9px 0 0; color: var(--muted); font-size: 13px; }
.primary-button, .secondary-button { display: inline-flex; align-items: center; justify-content: center; gap: 8px; min-height: 42px; padding: 0 16px; border: 0; border-radius: 10px; font-size: 12px; font-weight: 700; transition: .2s ease; }
.primary-button { color: white; background: #655fe2; box-shadow: 0 5px 18px #514bc52b; }
.primary-button:hover { background: #7771f2; transform: translateY(-1px); }
.primary-button i { font-size: 18px; }
.secondary-button { color: var(--text); background: #263248; }
.section-title { margin: 0; font-size: 15px; font-weight: 700; letter-spacing: -.2px; }
.stats-section { margin-bottom: 30px; }
.stats-section > .section-title { margin-bottom: 16px; }
.stats-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 16px; }
.stat-card, .panel { border: 1px solid var(--border); border-radius: 15px; background: var(--surface); }
.stat-card { min-width: 0; padding: 18px; }
.stat-top { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
.stat-icon { display: grid; place-items: center; width: 37px; height: 37px; border-radius: 11px; font-size: 20px; }
.stat-icon.purple { color: #aaa6ff; background: #302d5d; }
.stat-icon.blue { color: #82c6ff; background: #193d59; }
.stat-icon.orange { color: #ffbd7d; background: #513823; }
.stat-icon.green { color: #80e2b4; background: #194b3c; }
.trend { color: #7cdbb0; font-size: 10px; white-space: nowrap; }
.trend.neutral { color: #a4b0c2; }
.stat-number { margin: 17px 0 4px; font-size: 27px; font-weight: 750; letter-spacing: -.7px; }
.stat-label { margin: 0; color: var(--muted); font-size: 11px; }
.dashboard-grid { display: grid; grid-template-columns: minmax(0, 1.45fr) minmax(280px, 1fr); align-items: start; gap: 20px; }
.panel { min-width: 0; padding: 21px; }
.panel-heading { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
.panel-subtitle { margin: 6px 0 0; color: var(--muted); font-size: 11px; }
.text-button { border: 0; padding: 5px; color: #a6a2ff; background: transparent; font-size: 11px; }
.text-button:hover { text-decoration: underline; }
.task-list { display: flex; flex-direction: column; gap: 8px; margin-top: 19px; }
.task-item { display: flex; align-items: center; gap: 12px; padding: 13px 10px; border: 1px solid transparent; border-radius: 11px; transition: .2s ease; }
.task-item:hover { border-color: var(--border); background: #152238; }
.task-check { width: 18px; height: 18px; flex-shrink: 0; border: 1.5px solid #61718a; border-radius: 50%; background: transparent; }
.task-check:hover { border-color: #a6a2ff; }
.task-item.completed .task-check { border-color: #7772f5; color: white; background: #7772f5; }
.task-item.completed .task-check::after { content: "✓"; display: block; font-size: 12px; line-height: 15px; }
.task-item.completed .task-info > p { color: #75839a; text-decoration: line-through; }
.task-info { flex: 1; min-width: 0; }
.task-info > p { margin: 0; font-size: 12px; font-weight: 600; overflow-wrap: anywhere; }
.task-meta { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 8px; color: #8493a9; font-size: 10px; }
.task-meta span { display: inline-flex; align-items: center; gap: 4px; }
.priority { padding: 3px 7px; border-radius: 5px; }
.priority.high { color: #ffaaa8; background: #4b292f; }
.priority.medium { color: #ffd08b; background: #493921; }
.priority.low { color: #83dfb3; background: #1b4238; }
.more-button { width: 30px; height: 30px; border: 0; border-radius: 7px; color: var(--muted); background: transparent; font-size: 22px; letter-spacing: 1px; }
.side-panels { display: flex; flex-direction: column; gap: 20px; }
.progress-summary { display: flex; align-items: baseline; gap: 9px; margin: 22px 0 12px; }
.progress-summary strong { font-size: 27px; }
.progress-summary span { color: var(--muted); font-size: 11px; }
.progress-track, .mini-progress { overflow: hidden; border-radius: 99px; background: #29364b; }
.progress-track { height: 7px; }
.progress-bar { width: 80%; height: 100%; border-radius: inherit; background: linear-gradient(90deg, #655fe2, #a6a2ff); }
.week-days { display: flex; align-items: end; justify-content: space-between; gap: 10px; height: 100px; margin-top: 20px; }
.week-days span { display: flex; flex: 1; height: 100%; flex-direction: column; justify-content: end; align-items: center; gap: 7px; color: var(--muted); font-size: 9px; }
.week-days i { width: min(100%, 18px); min-height: 8px; border-radius: 5px 5px 2px 2px; background: #5e59c9; opacity: .85; }
.week-days span:nth-child(5) i { background: #aaa6ff; }
.muted-icon { color: var(--muted); font-size: 20px; }
.projects-panel .panel-heading { margin-bottom: 18px; }
.project-item { display: flex; align-items: center; gap: 10px; margin-top: 13px; }
.project-icon { display: grid; place-items: center; width: 36px; height: 36px; flex-shrink: 0; border-radius: 10px; font-size: 19px; }
.project-icon.violet { color: #b5b1ff; background: #302d5d; }
.project-icon.teal { color: #81dfd0; background: #1d4949; }
.project-info { flex: 1; min-width: 0; }
.project-info strong, .project-info span { display: block; }
.project-info strong { font-size: 11px; }
.project-info span { margin: 4px 0 8px; color: var(--muted); font-size: 10px; }
.project-item > b { color: #b8b4ff; font-size: 10px; }
.mini-progress { height: 4px; }
.mini-progress i { display: block; height: 100%; border-radius: inherit; background: #7772f5; }
footer { padding: 26px 0 6px; color: #66758b; text-align: center; font-size: 10px; }
.modal-backdrop { position: fixed; inset: 0; z-index: 10; display: grid; place-items: center; padding: 20px; background: #030712c9; }
.modal-backdrop[hidden] { display: none; }
.task-modal { width: min(100%, 460px); padding: 25px; border: 1px solid var(--border); border-radius: 17px; background: #111b2c; box-shadow: 0 24px 80px #0008; }
.modal-heading { display: flex; align-items: start; justify-content: space-between; margin-bottom: 24px; }
.modal-heading h2 { margin: 0; font-size: 23px; }
.task-modal label { display: block; margin: 15px 0 7px; color: #c3cede; font-size: 12px; font-weight: 600; }
.task-modal input, .task-modal select { width: 100%; min-height: 42px; padding: 10px 12px; border: 1px solid var(--border); border-radius: 9px; color: var(--text); background: #0d1727; font-size: 12px; }
.modal-actions { display: flex; justify-content: end; gap: 10px; margin-top: 24px; }
.toast { position: fixed; right: 22px; bottom: 22px; z-index: 20; max-width: calc(100% - 44px); padding: 13px 17px; border: 1px solid #45417f; border-radius: 10px; color: white; background: #24214b; box-shadow: 0 10px 30px #0004; font-size: 12px; opacity: 0; transform: translateY(10px); pointer-events: none; transition: .25s ease; }
.toast.show { opacity: 1; transform: translateY(0); }
@media (max-width: 1100px) {
  .sidebar { width: 205px; }
  .main-content { padding: 25px; }
  .stats-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .dashboard-grid { grid-template-columns: 1fr; }
  .side-panels { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
@media (max-width: 700px) {
  .topbar { min-height: 70px; padding: 14px 17px; }
  .brand h1 { font-size: 17px; }
  .user-actions { gap: 8px; }
  .profile-button > span:not(.avatar), .profile-button > i { display: none; }
  .page-layout { flex-direction: column; }
  .sidebar { width: 100%; padding: 10px 12px; border-right: 0; border-bottom: 1px solid var(--border); }
  .sidebar nav { display: flex; flex-wrap: wrap; gap: 5px; }
  .nav-heading, .sidebar-bottom { display: none; }
  .nav-link { width: auto; flex: 1; justify-content: center; gap: 6px; margin: 0; padding: 10px 8px; font-size: 11px; }
  .nav-link > i { font-size: 16px; }
  .nav-mark, .nav-count { display: none; }
  .main-content { padding: 23px 15px; }
  .welcome-section { align-items: flex-start; flex-direction: column; margin-bottom: 25px; }
  .welcome-section .primary-button { width: 100%; }
  .stats-grid { gap: 10px; }
  .stat-card { padding: 14px; }
  .stat-number { font-size: 24px; }
  .stat-label { line-height: 1.4; }
  .side-panels { grid-template-columns: 1fr; }
  .panel { padding: 16px; }
}
