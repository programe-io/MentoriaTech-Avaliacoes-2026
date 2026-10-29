:root {
  --bg-color: #0f172a;
  --card-bg: #1e293b;
  --border-color: #334155;
  --text-main: #f8fafc;
  --text-muted: #94a3b8;
  --primary: #3b82f6;
  --primary-hover: #2563eb;
  --danger: #ef4444;
  --success: #22c55e;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Inter', sans-serif;
  background-color: var(--bg-color);
  color: var(--text-main);
  padding: 2rem 1rem;
  display: flex;
  justify-content: center;
}

.container {
  width: 100%;
  max-width: 1100px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* Cabeçalho */
.header h1 {
  font-size: 1.875rem;
  font-weight: 700;
}

.header p {
  color: var(--text-muted);
  font-size: 0.95rem;
  margin-top: 0.25rem;
}

/* Cartões genéricos */
.card {
  background-color: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 0.75rem;
  padding: 1.5rem;
}

/* Estatísticas */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
}

.stat-card {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.stat-title {
  color: var(--text-muted);
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 700;
}

/* Disposição Principal */
.main-content {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 1.5rem;
}

@media (max-width: 850px) {
  .main-content {
    grid-template-columns: 1fr;
  }
}

/* Formulário */
.form-section h2, .table-section h2 {
  font-size: 1.25rem;
  margin-bottom: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  margin-bottom: 1rem;
}

.form-group label {
  font-size: 0.85rem;
  color: var(--text-muted);
}

.form-group input {
  background-color: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 0.375rem;
  padding: 0.6rem 0.75rem;
  color: var(--text-main);
  font-size: 0.95rem;
  outline: none;
}

.form-group input:focus {
  border-color: var(--primary);
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
}

/* Botões */
.btn {
  padding: 0.6rem 1rem;
  border-radius: 0.375rem;
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  font-size: 0.875rem;
}

.btn-primary {
  background-color: var(--primary);
  color: #fff;
  width: 100%;
}

.btn-primary:hover {
  background-color: var(--primary-hover);
}

.btn-secondary {
  background-color: transparent;
  border: 1px solid var(--border-color);
  color: var(--text-muted);
}

.btn-secondary:hover {
  background-color: var(--border-color);
  color: var(--text-main);
}

.btn-action {
  background-color: var(--border-color);
  color: var(--text-main);
  padding: 0.3rem 0.6rem;
  font-size: 0.75rem;
  border-radius: 0.25rem;
  margin-right: 0.25rem;
}

.btn-action:hover {
  background-color: var(--primary);
}

/* Tabela */
.table-container {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-size: 0.9rem;
}

th, td {
  padding: 0.75rem 0.5rem;
  border-bottom: 1px solid var(--border-color);
}

th {
  color: var(--text-muted);
  font-weight: 500;
}

/* Alertas */
.alert {
  padding: 0.75rem;
  border-radius: 0.375rem;
  font-size: 0.85rem;
  margin-top: 1rem;
}

.alert.error {
  background-color: rgba(239, 68, 68, 0.15);
  border: 1px solid var(--danger);
  color: #fca5a5;
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  padding: 1.5rem;
  width: 90%;
  max-width: 400px;
}

.modal-content h3 {
  margin-bottom: 0.5rem;
}

.modal-content p {
  color: var(--text-muted);
  font-size: 0.85rem;
  margin-bottom: 1rem;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: 1rem;
}
.modal-actions .btn {
  width: auto;
}