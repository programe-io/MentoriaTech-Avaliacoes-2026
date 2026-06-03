/**
 * ==========================================================================
 * SISTEMA COMPLETO DE GERENCIAMENTO DE TAREFAS (TODO LIST) & API
 * ==========================================================================
 */

// Uso do 'strict mode' para evitar erros silenciosos e garantir código limpo
'use strict';

class AppTaskManager {
    // Propriedades privadas (utilizando a sintaxe # do ES6)
    #tasks = [];
    #storageKey = 'my_app_tasks';

    constructor() {
        // Seleção de elementos do DOM (HTML)
        this.form = document.querySelector('#task-form');
        this.input = document.querySelector('#task-input');
        this.taskList = document.querySelector('#task-list');
        this.loadingSpinner = document.querySelector('#loading');
        this.adviceElement = document.querySelector('#api-advice');

        // Inicializa o app se os elementos principais existirem na tela
        if (this.form && this.input && this.taskList) {
            this.init();
        }
    }

    /**
     * 1. INICIALIZAÇÃO DO APP
     */
    init() {
        // Carrega dados salvos no navegador
        this.loadTasksFromStorage();
        
        // Ativa os ouvintes de eventos (Cliques, Envios, etc)
        this.registerEvents();
        
        // Renderiza a lista inicial
        this.renderTasks();

        // Busca um dado externo via API para exibir na tela
        this.fetchDailyAdvice();
    }

    /**
     * 2. REGISTRO DE EVENTOS (Event Listeners)
     */
    registerEvents() {
        // Evento de envio do formulário (Adicionar tarefa)
        this.form.addEventListener('submit', (event) => {
            event.preventDefault(); // Impede a página de recarregar
            this.handleTaskSubmission();
        });

        // Evento de clique na lista (Deletar ou Concluir) usando Delegação de Eventos
        this.taskList.addEventListener('click', (event) => {
            const target = event.target;
            const taskId = parseInt(target.closest('li')?.dataset.id);

            if (!taskId) return;

            if (target.classList.contains('btn-delete')) {
                this.deleteTask(taskId);
            } else if (target.classList.contains('task-checkbox')) {
                this.toggleTaskStatus(taskId);
            }
        });
    }

    /**
     * 3. REGRAS DE NEGÓCIO & MANIPULAÇÃO DE DADOS
     */
    handleTaskSubmission() {
        const taskText = this.input.value.trim();

        // Validação simples
        if (taskText === '') {
            alert('Por favor, digite uma tarefa válida!');
            return;
        }

        // Criando o objeto da nova tarefa
        const newTask = {
            id: