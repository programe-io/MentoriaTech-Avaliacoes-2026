:root {
  --bg-app: #f4f6fb;
  --bg-sidebar: #131129;
  --bg-card: #ffffff;
  --bg-input: #f8fafc;
  --texto-principal: #0f172a;
  --texto-secundario: #64748b;
  --borda: #e2e8f0;
  --primaria: #4f46e5;
  --primaria-hover: #4338ca;
  --esmeralda: #10b981;
  --esmeralda-hover: #059669;
  --ambar: #f59e0b;
  --vermelho: #ef4444;
  --sombra: 0 10px 25px -5px rgba(15, 23, 42, 0.05);
}

body.dark {
  --bg-app: #090d16;
  --bg-sidebar: #06080f;
  --bg-card: #111827;
  --bg-input: #1f2937;
  --texto-principal: #f8fafc;
  --texto-secundario: #94a3b8;
  --borda: #1f2937;
  --sombra: 0 10px 25px -5px rgba(0, 0, 0, 0.4);
}

- {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Inter', sans-serif;
}

body {
  background-color: var(--bg-app);
  color: var(--texto-principal);
  transition: background-color 0.25s, color 0.25s;
}

.app-layout {
  display: grid;
  grid-template-columns: 280px 1fr;
  min-height: 100vh;
}

/* Sidebar */
.sidebar {
  background: linear-gradient(180deg, #161333 0%, #0f172a 100%);
  color: #f8fafc;
  padding: 28px 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-right: 1px solid rgba(255, 255, 255, 0.06);
}

.logo-escola {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
}

.logo-icone {
  width: 44px;
  height: 44px;
  background: linear-gradient(135deg, #6366f1, #10b981);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 1.1rem;
  color: white;
  box-shadow: 0 4px 14px rgba(99, 102, 241, 0.4);
}

.logo-sigla {
  display: block;
  font-size: 0.85rem;
  font-weight: 800;
  letter-spacing: 0.6px;
  color: #a5b4fc;
}

.logo-sub {
  font-size: 0.75rem;
  color: #94a3b8;
}

.perfil-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  padding: 14px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 28px;
}

.perfil-avatar {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ec4899, #8b5cf6);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.95rem;
}

.perfil-dados strong {
  display: block;
  font-size: 0.9rem;
}

.perfil-dados span {
  font-size: 0.75rem;
  color: #94a3b8;
}

.menu-nav {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.nav-item {
  width: 100%;
  background: transparent;
  border: none;
  color: #cbd5e1;
  padding: 12px 14px;
  border-radius: 10px;
  font-size: 0.88rem;
  font-weight: 600;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s;
}

.nav-item:hover {
  background: rgba(255, 255, 255, 0.06);
  color: white;
}

.nav-item.ativo {
  background: linear-gradient(90deg, rgba(99, 102, 241, 0.25), rgba(99, 102, 241, 0.08));
  color: #ffffff;
  border-left: 3px solid #818cf8;
}

.nav-count {
  background: rgba(255, 255, 255, 0.1);
  padding: 2px 8px;
  border-radius: 99px;
  font-size: 0.75rem;
}

.meta-box {
  background: rgba(255, 255, 255, 0.04);
  padding: 16px;
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.07);
  margin-bottom: 14px;
}

.meta-header {
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  margin-bottom: 8px;
}

.barra-fundo {
  width: 100%;
  height: 8px;
  background: rgba(255, 255, 255, 0.12);
  border-radius: 99px;
  overflow: hidden;
  margin-bottom: 8px;
}

.barra-preenchimento {
  height: 100%;
  width: 0%;
  background: linear-gradient(90deg, #6366f1, #10b981);
  border-radius: 99px;
  transition: width 0.4s ease;
}

.meta-box small {
  font-size: 0.74rem;
  color: #94a3b8;
}

.sidebar-acoes {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

.btn-sidebar {
  background: rgba(255, 255, 255, 0.07);
  color: #e2e8f0;
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 9px 8px;
  border-radius: 10px;
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-sidebar:hover {
  background: rgba(255, 255, 255, 0.15);
}

.btn-sidebar.perigo:hover {
  background: rgba(239, 68, 68, 0.25);
  border-color: #ef4444;
  color: #fca5a5;
}

/* Conteúdo Principal */
.main-content {
  padding: 32px 36px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
}

.topbar h1 {
  font-size: 1.65rem;
  font-weight: 800;
  letter-spacing: -0.4px;
}

.topbar p {
  font-size: 0.88rem;
  color: var(--texto-secundario);
  margin-top: 3px;
}

.btn-exportar {
  background: var(--bg-card);
  color: var(--texto-principal);
  border: 1px solid var(--borda);
  padding: 10px 16px;
  border-radius: 10px;
  font-size: 0.84rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: var(--sombra);
  transition: all 0.2s;
}

.btn-exportar:hover {
  border-color: var(--primaria);
  color: var(--primaria);
}

/* KPIs */
.kpis-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.kpi-card {
  background: var(--bg-card);
  padding: 20px;
  border-radius: 16px;
  border: 1px solid var(--borda);
  box-shadow: var(--sombra);
}

.kpi-titulo {
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--texto-secundario);
}

.kpi-numero-box {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-top: 10px;
}

.kpi-numero-box strong {
  font-size: 1.85rem;
  font-weight: 800;
}

.kpi-tag {
  font-size: 0.72rem;
  font-weight: 700;
  padding: 3px 9px;
  border-radius: 99px;
}

.kpi-tag.roxo { background: #e0e7ff; color: #4338ca; }
.kpi-tag.vermelho { background: #fee2e2; color: #b91c1c; }
.kpi-tag.ambar { background: #fef3c7; color: #b45309; }
.kpi-tag.verde { background: #d1fae5; color: #065f46; }

/* Painéis */
.panel-card {
  background: var(--bg-card);
  padding: 26px;
  border-radius: 18px;
  border: 1px solid var(--borda);
  box-shadow: var(--sombra);
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 14px;
  margin-bottom: 20px;
}

.panel-header h2 {
  font-size: 1.12rem;
  font-weight: 700;
}

.panel-header p {
  font-size: 0.83rem;
  color: var(--texto-secundario);
  margin-top: 2px;
}

.pill-contador {
  font-size: 0.78rem;
  font-weight: 700;
  padding: 5px 12px;
  border-radius: 99px;
  background: var(--bg-input);
  color: var(--texto-secundario);
  border: 1px solid var(--borda);
}

.pill-contador.ok {
  background: #d1fae5;
  color: #065f46;
  border-color: #a7f3d0;
}

/* Formulário */
.form-grid {
  display: grid;
  grid-template-columns: 1fr 240px auto;
  gap: 16px;
  align-items: end;
}

.campo {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

label {
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--texto-secundario);
}

input, select {
  padding: 12px 14px;
  border: 1.5px solid var(--borda);
  border-radius: 10px;
  font-size: 0.92rem;
  background: var(--bg-input);
  color: var(--texto-principal);
  outline: none;
  transition: all 0.2s;
}

input:focus, select:focus {
  border-color: var(--primaria);
  background: var(--bg-card);
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.12);
}

.btn-cadastrar {
  background: linear-gradient(135deg, var(--primaria), #6366f1);
  color: white;
  border: none;
  padding: 13px 24px;
  border-radius: 10px;
  font-weight: 700;
  font-size: 0.92rem;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(79, 70, 229, 0.3);
  transition: transform 0.15s, background 0.2s;
}

.btn-cadastrar:hover {
  background: linear-gradient(135deg, var(--primaria-hover), var(--primaria));
  transform: translateY(-1px);
}

/* Ferramentas e Tabela */
.ferramentas {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.input-busca {
  padding: 9px 14px;
  font-size: 0.85rem;
  width: 220px;
}

.btn-ordenar {
  background: var(--bg-input);
  border: 1.5px solid var(--borda);
  color: var(--texto-principal);
  padding: 9px 14px;
  border-radius: 10px;
  font-size: 0.84rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-ordenar:hover {
  border-color: var(--primaria);
  color: var(--primaria);
}

.tabela-wrapper {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

th {
  padding: 12px 14px;
  font-size: 0.76rem;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  color: var(--texto-secundario);
  background: var(--bg-input);
  border-bottom: 1.5px solid var(--borda);
}

td {
  padding: 15px 14px;
  border-bottom: 1px solid var(--borda);
  font-size: 0.92rem;
}

tr.concluida td.col-titulo {
  text-decoration: line-through;
  color: var(--texto-secundario);
}

.select-prioridade {
  padding: 6px 10px;
  font-size: 0.84rem;
  border-radius: 8px;
  cursor: pointer;
}

.status-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 11px;
  border-radius: 99px;
  font-size: 0.78rem;
  font-weight: 700;
}

.status-pendente {
  background: #fef3c7;
  color: #b45309;
}

.status-concluida {
  background: #d1fae5;
  color: #065f46;
}

.texto-direita {
  text-align: right;
}

.acoes-grupo {
  display: inline-flex;
  gap: 8px;
}

.btn-acao {
  border: none;
  padding: 7px 12px;
  border-radius: 8px;
  font-size: 0.8rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-concluir {
  background: #ecfdf5;
  color: #059669;
  border: 1px solid #a7f3d0;
}

.btn-concluir:hover:not(:disabled) {
  background: #10b981;
  color: white;
}

.btn-concluir:disabled {
  background: var(--bg-input);
  color: var(--texto-secundario);
  border-color: var(--borda);
  cursor: not-allowed;
}

.btn-excluir {
  background: #fef2f2;
  color: #dc2626;
  border: 1px solid #fecaca;
}

.btn-excluir:hover {
  background: #ef4444;
  color: white;
}

/* Notificações Toast */
.toast-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.toast {
  background: #1e293b;
  color: white;
  padding: 14px 18px;
  border-radius: 12px;
  font-size: 0.88rem;
  font-weight: 600;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  border-left: 4px solid var(--primaria);
  animation: slideIn 0.25s ease;
}

.toast.sucesso { border-left-color: var(--esmeralda); }
.toast.erro { border-left-color: var(--vermelho); }

@keyframes slideIn {
  from { transform: translateX(100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}

.estado-vazio {
  text-align: center;
  padding: 40px 20px;
  color: var(--texto-secundario);
}

.estado-vazio strong {
  display: block;
  font-size: 1rem;
  color: var(--texto-principal);
  margin-bottom: 4px;
}

@media (max-width: 960px) {
  .app-layout {
    grid-template-columns: 1fr;
  }
  .kpis-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .form-grid {
    grid-template-columns: 1fr;
  }
} muda as cores