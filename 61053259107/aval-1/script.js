/**
 * Sistema de Notificações Toast Moderno
 * Zero dependências | Acessível | Responsivo
 */
class ToastManager {
  constructor(options = {}) {
    this.position = options.position || 'top-right'; // top-right, top-left, bottom-right, bottom-left
    this.duration = options.duration || 4000;
    this.maxVisible = options.maxVisible || 5;
    this.container = null;
    
    this._initContainer();
  }

  // Cria o container fixo na tela
  _initContainer() {
    this.container = document.createElement('div');
    this.container.className = `toast-container toast-${this.position}`;
    this.container.setAttribute('aria-live', 'polite');
    this.container.setAttribute('role', 'status');
    
    // Injeta o CSS necessário automaticamente
    if (!document.getElementById('toast-styles')) {
      const style = document.createElement('style');
      style.id = 'toast-styles';
      style.textContent = this._getStyles();
      document.head.appendChild(style);
    }
    
    document.body.appendChild(this.container);
  }

  /**
   * Exibe uma notificação
   * @param {string} message - Texto da mensagem
   * @param {object} opts - { type: 'success'|'error'|'warning'|'info', duration: number }
   */
  show(message, opts = {}) {
    const type = opts.type || 'info';
    const duration = opts.duration || this.duration;

    // Limita quantidade visível
    const toasts = this.container.querySelectorAll('.toast');
    if (toasts.length >= this.maxVisible) {
      toasts[0].remove();
    }

    // Cria o elemento toast
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <span class="toast-icon">${this._getIcon(type)}</span>
      <span class="toast-message">${message}</span>
      <button class="toast-close" aria-label="Fechar notificação">&times;</button>
      <div class="toast-progress"></div>
    `;

    // Evento de fechar manualmente
    toast.querySelector('.toast-close').addEventListener('click', () => {
      this._dismiss(toast);
    });

    // Pausa o timer ao passar o mouse
    let timeoutId;
    const startTimer = () => {
      toast.classList.remove('paused');
      timeoutId = setTimeout(() => this._dismiss(toast), duration);
    };
    
    const pauseTimer = () => {
      toast.classList.add('paused');
      clearTimeout(timeoutId);
    };

    toast.addEventListener('mouseenter', pauseTimer);
    toast.addEventListener('mouseleave', startTimer);

    // Adiciona ao DOM e inicia animação
    this.container.appendChild(toast);
    
    // Força reflow para a animação CSS funcionar
    requestAnimationFrame(() => {
      toast.classList.add('toast-visible');
      startTimer();
    });

    return toast;
  }

  // Métodos de conveniência
  success(msg, opts) { return this.show(msg, { ...opts, type: 'success' }); }
  error(msg, opts)   { return this.show(msg, { ...opts, type: 'error' }); }
  warning(msg, opts) { return this.show(msg, { ...opts, type: 'warning' }); }
  info(msg, opts)    { return this.show(msg, { ...opts, type: 'info' }); }

  // Remove com animação de saída
  _dismiss(toast) {
    toast.classList.remove('toast-visible');
    toast.classList.add('toast-exit');
    toast.addEventListener('animationend', () => toast.remove(), { once: true });
  }

  // Ícones SVG inline (sem dependência externa)
  _getIcon(type) {
    const icons = {
      success: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>',
      error:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M15 9l-6 6M9 9l6 6"/></svg>',
      warning: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/></svg>',
      info:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4m0-4h.01"/></svg>'
    };
    return icons[type] || icons.info;
  }

  // CSS encapsulado dentro da classe
  _getStyles() {
    return `
      .toast-container {
        position: fixed; z-index: 99999; display: flex; flex-direction: column;
        gap: 10px; padding: 20px; pointer-events: none; max-width: 400px; width: 100%;
      }
      .toast-top-right     { top: 0; right: 0; align-items: flex-end; }
      .toast-top-left      { top: 0; left: 0; align-items: flex-start; }
      .toast-bottom-right  { bottom: 0; right: 0; align-items: flex-end; }
      .toast-bottom-left   { bottom: 0; left: 0; align-items: flex-start; }

      .toast {
        pointer-events: auto; display: flex; align-items: center; gap: 12px;
        padding: 14px 18px; border-radius: 10px; background: #1e293b; color: #f1f5f9;
        font-family: system-ui, sans-serif; font-size: 14px; line-height: 1.4;
        box-shadow: 0 10px 40px rgba(0,0,0,0.2); position: relative; overflow: hidden;
        opacity: 0; transform: translateX(100%); transition: all 0.4s cubic-bezier(0.16,1,0.3,1);
      }
      .toast-top-left .toast, .toast-bottom-left .toast { transform: translateX(-100%); }
      .toast-visible { opacity: 1; transform: translateX(0) !important; }
      .toast-exit { opacity: 0; transform: scale(0.9) !important; transition-duration: 0.3s; }

      .toast-icon svg { width: 20px; height: 20px; flex-shrink: 0; }
      .toast-success .toast-icon { color: #4ade80; }
      .toast-error .toast-icon   { color: #f87171; }
      .toast-warning .toast-icon { color: #fbbf24; }
      .toast-info .toast-icon    { color: #60a5fa; }

      .toast-close {
        background: none; border: none; color: #94a3b8; font-size: 18px;
        cursor: pointer; margin-left: auto; padding: 0 4px; opacity: 0.7;
        transition: opacity 0.2s;
      }
      .toast-close:hover { opacity: 1; }

      .toast-progress {
        position: absolute; bottom: 0; left: 0; height: 3px; width: 100%;
        transform-origin: left; animation: toast-progress-shrink linear forwards;
      }
      .toast-success .toast-progress { background: #4ade80; }
      .toast-error .toast-progress   { background: #f87171; }
      .toast-warning .toast-progress { background: #fbbf24; }
      .toast-info .toast-progress    { background: #60a5fa; }

      .toast:not(.paused) .toast-progress { animation-duration: inherit; }
      .toast.paused .toast-progress { animation-play-state: paused; }

      @keyframes toast-progress-shrink { from { transform: scaleX(1); } to { transform: scaleX(0); } }

      @media (max-width: 480px) {
        .toast-container { padding: 10px; max-width: 100%; }
        .toast-container[class*="right"], .toast-container[class*="left"] { align-items: stretch; }
        .toast { transform: translateY(100%) !important; }
        .toast-visible { transform: translateY(0) !important; }
      }
    `;
  }
}

// ✅ Exporta uma instância global pronta para uso
const toast = new ToastManager({ position: 'top-right', duration: 4000 });