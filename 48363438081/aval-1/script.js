/**
 * ==========================================================================
 * BASE JAVASCRIPT (MODERN VANILLA JS BOILERPLATE)
 * ==========================================================================
 * Módulo com utilitários para DOM, Estado Reativo, API, Storage e Performance.
 */

// ==========================================================================
// 1. UTILITÁRIOS DE DOM (SELETORES E ATALHOS)
// ==========================================================================
/** Retorna o primeiro elemento que coincide com o seletor */
const $ = (selector, context = document) => context.querySelector(selector);

/** Retorna um Array com todos os elementos que coincidem com o seletor */
const $$ = (selector, context = document) => Array.from(context.querySelectorAll(selector));

/**
 * Cria um elemento HTML com atributos, ouvintes de evento e filhos
 */
function createElement(tag, attributes = {}, children = []) {
  const element = document.createElement(tag);

  Object.entries(attributes).forEach(([key, value]) => {
    if (key.startsWith('on') && typeof value === 'function') {
      element.addEventListener(key.slice(2).toLowerCase(), value);
    } else if (key === 'dataset' && typeof value === 'object') {
      Object.assign(element.dataset, value);
    } else {
      element.setAttribute(key, value);
    }
  });

  children.forEach(child => {
    if (typeof child === 'string') {
      element.appendChild(document.createTextNode(child));
    } else if (child instanceof HTMLElement) {
      element.appendChild(child);
    }
  });

  return element;
}

// ==========================================================================
// 2. GERENCIADOR DE ESTADO REATIVO (STORE / PUB-SUB)
// ==========================================================================
class Store {
  constructor(initialState = {}) {
    this.listeners = new Set();
    this.state = new Proxy(initialState, {
      set: (target, property, value) => {
        target[property] = value;
        this.notify();
        return true;
      }
    });
  }

  get data() {
    return this.state;
  }

  setState(newState) {
    Object.assign(this.state, newState);
  }

  subscribe(listener) {
    this.listeners.add(listener);
    // Retorna função para cancelar a inscrição (unsubscribe)
    return () => this.listeners.delete(listener);
  }

  notify() {
    this.listeners.forEach(listener => listener(this.state));
  }
}

// ==========================================================================
// 3. CLIENTE HTTP / API (FETCH WRAPPER)
// ==========================================================================
const http = {
  async request(endpoint, options = {}) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    if (config.body && typeof config.body === 'object') {
      config.body = JSON.stringify(config.body);
    }

    try {
      const response = await fetch(endpoint, config);
      
      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('[HTTP Error]:', error);
      throw error;
    }
  },

  get(url, headers = {}) {
    return this.request(url, { method: 'GET', headers });
  },

  post(url, body, headers = {}) {
    return this.request(url, { method: 'POST', body, headers });
  },

  put(url, body, headers = {}) {
    return this.request(url, { method: 'PUT', body, headers });
  },

  delete(url, headers = {}) {
    return this.request(url, { method: 'DELETE', headers });
  }
};

// ==========================================================================
// 4. ARMAZENAMENTO LOCAL (LOCALSTORAGE COM ERROR HANDLING)
// ==========================================================================
const storage = {
  get(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Erro ao ler chave "${key}" do localStorage:`, error);
      return defaultValue;
    }
  },

  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Erro ao salvar chave "${key}" no localStorage:`, error);
    }
  },

  remove(key) {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Erro ao remover chave "${key}" do localStorage:`, error);
    }
  }
};

// ==========================================================================
// 5. UTILITÁRIOS DE PERFORMANCE (DEBOUNCE E THROTTLE)
// ==========================================================================
/**
 * Adia a execução da função até que se passe um tempo sem novas chamadas
 */
function debounce(fn, delay = 300) {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

/**
 * Limita a frequência máxima de execução de uma função
 */
function throttle(fn, limit = 300) {
  let inThrottle;
  return (...args) => {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// ==========================================================================
// 6. INICIALIZAÇÃO DA APLICAÇÃO (EXEMPLO DE USO)
// ==========================================================================

// Criando um estado global da aplicação
const appStore = new Store({
  user: null,
  theme: storage.get('theme', 'light'),
  counter: 0
});

// Executado quando todo o HTML estiver carregado
document.addEventListener('DOMContentLoaded', () => {
  console.log('Aplicação iniciada!');

  // Ouvinte de estado: Executa sempre que o estado mude
  appStore.subscribe((state) => {
    console.log('Novo estado da aplicação:', state);
  });

  // Exemplo de uso de manipuladores do DOM e debounce em busca
  const searchInput = $('#search-input');
  if (searchInput) {
    searchInput.addEventListener(
      'input',
      debounce((e) => {
        console.log('Buscando por:', e.target.value);
      }, 500)
    );
  }
});