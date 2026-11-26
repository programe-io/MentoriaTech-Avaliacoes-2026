* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: system-ui, -apple-system, sans-serif;
}

body {
    background: #f5f3ff;
    color: #1e1b4b;
    padding: 24px;
}

.wrapper {
    max-width: 780px;
    margin: 0 auto;
    background: #fff;
    padding: 24px;
    border-radius: 14px;
    box-shadow: 0 8px 24px rgba(76, 29, 149, 0.08);
}

.topo {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    margin-bottom: 12px;
}

.topo h1 {
    font-size: 1.5rem;
}

.topo p {
    font-size: 0.9rem;
    color: #6b7280;
}

.barra-progresso {
    height: 8px;
    background: #ede9fe;
    border-radius: 999px;
    overflow: hidden;
    margin-bottom: 20px;
}

#barra-fill {
    height: 100%;
    width: 0%;
    background: #7c3aed;
    transition: width 0.25s ease;
}

.form-task {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr auto;
    gap: 10px;
    margin-bottom: 14px;
}

input, select {
    padding: 10px;
    border: 1px solid #d8b4fe;
    border-radius: 8px;
    font-size: 0.92rem;
    background: #fff;
}

#btn-task-submit {
    background: #7c3aed;
    color: #fff;
    border: none;
    border-radius: 8px;
    padding: 0 18px;
    font-weight: 600;
    cursor: pointer;
}

.btn-limpar {
    background: #fee2e2;
    color: #b91c1c;
    border: none;
    border-radius: 8px;
    padding: 8px 12px;
    font-weight: 600;
    cursor: pointer;
}

.barra-filtros {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    margin-bottom: 16px;
}

.lista-task {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.task-card {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    padding: 12px 14px;
    border-radius: 10px;
    border: 1px solid #e5e7eb;
    background: #fafafa;
}

.task-card.feita {
    background: #f3f4f6;
    opacity: 0.72;
}

.task-card.feita .titulo-task {
    text-decoration: line-through;
}

.task-esq {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
}

.tag-p {
    font-size: 0.72rem;
    font-weight: 700;
    padding: 2px 8px;
    border-radius: 999px;
    text-transform: uppercase;
}

.p-alta { background: #fee2e2; color: #b91c1c; }
.p-media { background: #fef3c7; color: #b45309; }
.p-baixa { background: #dcfce7; color: #15803d; }

.task-dir {
    display: flex;
    gap: 6px;
}

.btn-mini {
    border: none;
    border-radius: 6px;
    padding: 5px 9px;
    font-size: 0.8rem;
    font-weight: 600;
    cursor: pointer;
}

.btn-edit-task { background: #e0e7ff; color: #3730a3; }
.btn-del-task { background: #ef4444; color: #fff; }

@media (max-width: 680px) {
    .form-task {
        grid-template-columns: 1fr;
    }
}