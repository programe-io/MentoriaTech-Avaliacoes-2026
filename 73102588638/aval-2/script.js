:root {
  --bg: #f8fafc;
  --surface: #ffffff;
  --sidebar: #0f172a;
  --sidebar-hover: #1e293b;
  --text: #0f172a;
  --muted: #64748b;
  --border: #e2e8f0;
  --primary: #2563eb;
  --primary-hover: #1d4ed8;
  --danger: #dc2626;
  --radius: 10px;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
}

body {
  background: var(--bg);
  color: var(--text);
  height: 100vh;
  overflow: hidden;
}

.hidden {
  display: none !important;
}

.app {
  display: flex;
  height: 100vh;
}

/* Barra Lateral */
.sidebar {
  width: 250px;
  background: var(--sidebar);
  color: #fff;
  padding: 24px 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-shrink: 0;
}

.logo {
  font-size: 1.4rem;
  font-weight: 700;
  padding: 0 8px 24px;
  border-bottom: 1px solid #1e293b;
}

.menu {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: 20px;
  flex: 1;
}

.menu-item {
  background: transparent;
  color: #cbd5e1;
  text-align: left;
  padding: 11px 14px;
  border-radius: 8px;
  border: none;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: 0.15s;
}

.menu-item:hover,
.menu-item.active {
  background: var(--sidebar-hover);
  color: #fff;
}

.storage-box {
  background: #1e293b;
  padding: 14px;
  border-radius: 8px;
  font-size: 0.8rem;
  color: #cbd5e1;
}

.storage-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-weight: 600;
}

.progress-bar {
  width: 100%;
  height: 6px;
  background: #334155;
  border-radius: 999px;
  overflow: hidden;
  margin-bottom: 6px;
}

.progress-fill {
  height: 100%;
  background: #38bdf8;
  width: 0%;
  transition: width 0.3s;
}

/* Área Principal */
.main {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 24px;
  overflow-y: auto;
}

.topbar {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.topbar input[type="text"] {
  flex: 1;
  min-width: 240px;
  max-width: 420px;
  padding: 10px 14px;
  border: 1px solid var(--border);
  border-radius: 8px;
  font-size: 0.92rem;
  background: var(--surface);
}

.actions {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

button, .upload-btn {
  cursor: pointer;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  padding: 9px 14px;
  border: none;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: 0.15s;
}

.btn-primary {
  background: var(--primary);
  color: #fff;
}

.btn-primary:hover {
  background: var(--primary-hover);
}

.btn-outline {
  background: var(--surface);
  color: var(--text);
  border: 1px solid var(--border);
}

.btn-outline:hover {
  background: #f1f5f9;
}

/* Breadcrumb */
.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 14px;
  border-bottom: 1px solid var(--border);
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 10px;
}

.breadcrumb {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
  font-size: 0.95rem;
}

.crumb {
  color: var(--primary);
  cursor: pointer;
  font-weight: 600;
}

.crumb:hover {
  text-decoration: underline;
}

.crumb-current {
  color: var(--text);
  font-weight: 700;
}

.saved-badge {
  font-size: 0.8rem;
  color: #16a34a;
  font-weight: 600;
}

/* Grade de Itens */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
  gap: 16px;
}

.item-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.12s, box-shadow 0.12s;
  position: relative;
}

.item-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 14px rgba(15, 23, 42, 0.06);
}

.item-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
}

.item-icon {
  font-size: 2.2rem;
  cursor: pointer;
}

.item-menu {
  display: flex;
  gap: 4px;
}

.icon-btn {
  background: transparent;
  padding: 4px 6px;
  font-size: 0.95rem;
  border-radius: 6px;
}

.icon-btn:hover {
  background: #f1f5f9;
}

.item-name {
  font-weight: 600;
  font-size: 0.95rem;
  margin-bottom: 4px;
  word-break: break-word;
  cursor: pointer;
}

.item-name:hover {
  color: var(--primary);
}

.item-meta {
  font-size: 0.78rem;
  color: var(--muted);
}

.empty-state {
  grid-column: 1 / -1;
  text-align: center;
  padding: 60px 20px;
  color: var(--muted);
}

/* Modais */
.modal {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  z-index: 50;
}

.modal-card {
  background: var(--surface);
  width: 100%;
  max-width: 420px;
  border-radius: var(--radius);
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.modal-lg {
  max-width: 680px;
}

.modal-header {
  display: flex;
  gap: 10px;
  align-items: center;
}

.modal-header input {
  flex: 1;
  padding: 9px 12px;
  border: 1px solid var(--border);
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
}

.modal-card input[type="text"],
.modal-card textarea {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid var(--border);
  border-radius: 8px;
  font-size: 0.95rem;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

.btn-close {
  background: #f1f5f9;
  padding: 8px 12px;
}

.preview-box {
  text-align: center;
  max-height: 360px;
  overflow: auto;
  background: #f8fafc;
  padding: 12px;
  border-radius: 8px;
}

.preview-box img {
  max-width: 100%;
  max-height: 320px;
  border-radius: 6px;
}

@media (max-width: 720px) {
  body { overflow: auto; height: auto; }
  .app { flex-direction: column; height: auto; }
  .sidebar { width: 100%; }
}