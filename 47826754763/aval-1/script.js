<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>MeuBlog | Ideias, Tecnologia & Design</title>
  <!-- Google Fonts: Plus Jakarta Sans & Lora para uma leitura editorial elegante -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,500;0,600;1,400&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <!-- Ícones Phosphor Icons -->
  <script src="https://unpkg.com/@phosphor-icons/web"></script>

  <style>
    /* ==========================================================================
       1. VARIÁVEIS CSS (DESIGN TOKENS) & TEMAS (CLARO / ESCURO)
       ========================================================================== */
    :root {
      /* Paleta Modo Claro */
      --bg-body: #f8fafc;
      --bg-surface: #ffffff;
      --bg-surface-alt: #f1f5f9;
      --bg-header: rgba(255, 255, 255, 0.85);
      --text-primary: #0f172a;
      --text-secondary: #475569;
      --text-muted: #94a3b8;
      --border-color: #e2e8f0;
      
      /* Cores de Destaque */
      --accent-primary: #4f46e5;
      --accent-hover: #4338ca;
      --accent-soft: rgba(79, 70, 229, 0.1);
      --accent-secondary: #0ea5e9;

      /* Sombras Suaves */
      --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
      --shadow-md: 0 4px 12px -2px rgba(15, 23, 42, 0.06), 0 2px 6px -2px rgba(15, 23, 42, 0.04);
      --shadow-lg: 0 20px 25px -5px rgba(15, 23, 42, 0.08), 0 8px 10px -6px rgba(15, 23, 42, 0.04);
      --shadow-modal: 0 25px 50px -12px rgba(0, 0, 0, 0.25);

      /* Tipografia e Medidas */
      --font-sans: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
      --font-serif: 'Lora', Georgia, serif;
      --radius-sm: 8px;
      --radius-md: 14px;
      --radius-lg: 20px;
      --radius-full: 9999px;
      --container-max: 1220px;
      --transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    }

    /* Variáveis Modo Escuro */
    [data-theme="dark"] {
      --bg-body: #0b1120;
      --bg-surface: #131c31;
      --bg-surface-alt: #1e293b;
      --bg-header: rgba(19, 28, 49, 0.85);
      --text-primary: #f8fafc;
      --text-secondary: #cbd5e1;
      --text-muted: #64748b;
      --border-color: #1e293b;

      --accent-primary: #6366f1;
      --accent-hover: #818cf8;
      --accent-soft: rgba(99, 102, 241, 0.16);

      --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.3);
      --shadow-md: 0 4px 14px -2px rgba(0, 0, 0, 0.35);
      --shadow-lg: 0 20px 25px -5px rgba(0, 0, 0, 0.45);
    }

    /* ==========================================================================
       2. RESET & BASE STYLES
       ========================================================================== */
    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    html {
      scroll-behavior: smooth;
    }

    body {
      font-family: var(--font-sans);
      background-color: var(--bg-body);
      color: var(--text-primary);
      line-height: 1.6;
      transition: background-color 0.3s ease, color 0.3s ease;
      overflow-x: hidden;
    }

    img {
      max-width: 100%;
      display: block;
    }

    button, input, textarea, select {
      font-family: inherit;
      color: inherit;
    }

    button {
      cursor: pointer;
      border: none;
      background: none;
    }

    a {
      text-decoration: none;
      color: inherit;
    }

    .container {
      width: 100%;
      max-width: var(--container-max);
      margin: 0 auto;
      padding: 0 1.25rem;
    }

    /* ==========================================================================
       3. CABEÇALHO RESPONSIVO (HEADER)
       ========================================================================== */
    .header {
      position: sticky;
      top: 0;
      z-index: 100;
      background: var(--bg-header);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border-bottom: 1px solid var(--border-color);
      transition: var(--transition);
    }

    .header-inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 76px;
      gap: 1rem;
    }

    .logo {
      display: flex;
      align-items: center;
      gap: 0.6rem;
      font-size: 1.45rem;
      font-weight: 800;
      letter-spacing: -0.03em;
      color: var(--text-primary);
    }

    .logo-icon {
      width: 36px;
      height: 36px;
      border-radius: 10px;
      background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
      color: #fff;
      display: grid;
      place-items: center;
      font-size: 1.25rem;
      box-shadow: 0 4px 10px rgba(79, 70, 229, 0.3);
    }

    .logo span {
      color: var(--accent-primary);
    }

    .nav-links {
      display: flex;
      align-items: center;
      gap: 1.75rem;
      list-style: none;
    }

    .nav-links a {
      font-weight: 600;
      font-size: 0.95rem;
      color: var(--text-secondary);
      transition: var(--transition);
      position: relative;
      padding: 0.25rem 0;
    }

    .nav-links a:hover,
    .nav-links a.active {
      color: var(--accent-primary);
    }

    .nav-links a::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 0;
      height: 2px;
      background: var(--accent-primary);
      border-radius: 2px;
      transition: width 0.25s ease;
    }

    .nav-links a:hover::after,
    .nav-links a.active::after {
      width: 100%;
    }

    .header-actions {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    /* Barra de Busca */
    .search-box {
      position: relative;
      display: flex;
      align-items: center;
    }

    .search-box i {
      position: absolute;
      left: 0.85rem;
      color: var(--text-muted);
      font-size: 1.05rem;
      pointer-events: none;
    }

    .search-input {
      background: var(--bg-surface-alt);
      border: 1px solid transparent;
      border-radius: var(--radius-full);
      padding: 0.55rem 1rem 0.55rem 2.4rem;
      font-size: 0.9rem;
      width: 210px;
      transition: var(--transition);
    }

    .search-input:focus {
      outline: none;
      width: 250px;
      background: var(--bg-surface);
      border-color: var(--accent-primary);
      box-shadow: 0 0 0 3px var(--accent-soft);
    }

    .btn-icon {
      width: 40px;
      height: 40px;
      border-radius: var(--radius-full);
      background: var(--bg-surface-alt);
      color: var(--text-primary);
      display: grid;
      place-items: center;
      font-size: 1.2rem;
      transition: var(--transition);
    }

    .btn-icon:hover {
      background: var(--accent-soft);
      color: var(--accent-primary);
      transform: translateY(-1px);
    }

    .btn-primary {
      display: inline-flex;
      align-items: center;
      gap: 0.45rem;
      background: var(--accent-primary);
      color: #ffffff;
      font-weight: 600;
      font-size: 0.9rem;
      padding: 0.6rem 1.15rem;
      border-radius: var(--radius-full);
      box-shadow: 0 4px 12px rgba(79, 70, 229, 0.25);
      transition: var(--transition);
    }

    .btn-primary:hover {
      background: var(--accent-hover);
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(79, 70, 229, 0.35);
    }

    .mobile-menu-btn {
      display: none;
    }

    /* ==========================================================================
       4. SEÇÃO HERO (ARTIGO PRINCIPAL EM DESTAQUE)
       ========================================================================== */
    .hero-section {
      padding: 2.5rem 0 1.5rem;
    }

    .hero-card {
      background: var(--bg-surface);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-lg);
      overflow: hidden;
      display: grid;
      grid-template-columns: 1.15fr 1fr;
      box-shadow: var(--shadow-lg);
      transition: var(--transition);
    }

    .hero-image-wrapper {
      position: relative;
      min-height: 360px;
      overflow: hidden;
    }

    .hero-image-wrapper img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.6s ease;
    }

    .hero-card:hover .hero-image-wrapper img {
      transform: scale(1.04);
    }

    .hero-badge {
      position: absolute;
      top: 1.25rem;
      left: 1.25rem;
      background: var(--accent-primary);
      color: #fff;
      font-size: 0.78rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      padding: 0.35rem 0.85rem;
      border-radius: var(--radius-full);
      box-shadow: var(--shadow-md);
    }

    .hero-content {
      padding: 2.75rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 1.15rem;
    }

    .post-meta {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 0.75rem;
      font-size: 0.85rem;
      color: var(--text-muted);
      font-weight: 500;
    }

    .category-tag {
      background: var(--accent-soft);
      color: var(--accent-primary);
      font-weight: 700;
      font-size: 0.78rem;
      padding: 0.25rem 0.75rem;
      border-radius: var(--radius-full);
    }

    .hero-title {
      font-size: clamp(1.6rem, 2.5vw, 2.25rem);
      font-weight: 800;
      line-height: 1.25;
      letter-spacing: -0.02em;
      color: var(--text-primary);
    }

    .hero-excerpt {
      color: var(--text-secondary);
      font-size: 1.02rem;
      line-height: 1.7;
    }

    .hero-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 0.5rem;
      padding-top: 1.25rem;
      border-top: 1px solid var(--border-color);
    }

    .author-mini {
      display: flex;
      align-items: center;
      gap: 0.65rem;
    }

    .author-mini img {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      object-fit: cover;
    }

    .author-mini-info span {
      display: block;
      font-size: 0.88rem;
      font-weight: 700;
    }

    .author-mini-info small {
      color: var(--text-muted);
      font-size: 0.78rem;
    }

    /* ==========================================================================
       5. FILTROS DE CATEGORIA & LAYOUT PRINCIPAL (GRID + SIDEBAR)
       ========================================================================== */
    .filter-bar {
      padding: 1.5rem 0 2rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 1rem;
    }

    .category-pills {
      display: flex;
      align-items: center;
      gap: 0.6rem;
      flex-wrap: wrap;
    }

    .pill-btn {
      padding: 0.55rem 1.15rem;
      border-radius: var(--radius-full);
      background: var(--bg-surface);
      border: 1px solid var(--border-color);
      color: var(--text-secondary);
      font-weight: 600;
      font-size: 0.88rem;
      transition: var(--transition);
    }

    .pill-btn:hover {
      border-color: var(--accent-primary);
      color: var(--accent-primary);
    }

    .pill-btn.active {
      background: var(--accent-primary);
      border-color: var(--accent-primary);
      color: #ffffff;
      box-shadow: 0 4px 10px rgba(79, 70, 229, 0.25);
    }

    .filter-controls {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      flex-wrap: wrap;
    }

    .sort-select {
      padding: 0.5rem 0.9rem;
      border-radius: var(--radius-full);
      background: var(--bg-surface);
      border: 1px solid var(--border-color);
      color: var(--text-primary);
      font-size: 0.85rem;
      font-weight: 600;
      cursor: pointer;
    }

    .view-tabs {
      display: inline-flex;
      background: var(--bg-surface-alt);
      padding: 0.25rem;
      border-radius: var(--radius-full);
      border: 1px solid var(--border-color);
    }

    .tab-btn {
      padding: 0.4rem 0.95rem;
      border-radius: var(--radius-full);
      font-size: 0.85rem;
      font-weight: 700;
      color: var(--text-secondary);
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      transition: var(--transition);
    }

    .tab-btn.active {
      background: var(--bg-surface);
      color: var(--accent-primary);
      box-shadow: var(--shadow-sm);
    }

    .badge-count {
      background: var(--accent-soft);
      color: var(--accent-primary);
      padding: 0.1rem 0.45rem;
      border-radius: var(--radius-full);
      font-size: 0.75rem;
    }

    mark.search-highlight {
      background: rgba(250, 204, 21, 0.35);
      color: inherit;
      padding: 0 0.2rem;
      border-radius: 4px;
    }

    .results-count {
      font-size: 0.9rem;
      color: var(--text-muted);
      font-weight: 500;
    }

    /* Layout Principal com Sidebar */
    .main-layout {
      display: grid;
      grid-template-columns: 1fr 340px;
      gap: 2.25rem;
      padding-bottom: 4.5rem;
      align-items: start;
    }

    /* Grade de Artigos Recentes */
    .posts-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(310px, 1fr));
      gap: 1.75rem;
    }

    .post-card {
      background: var(--bg-surface);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-md);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      box-shadow: var(--shadow-md);
      transition: var(--transition);
    }

    .post-card:hover {
      transform: translateY(-6px);
      box-shadow: var(--shadow-lg);
      border-color: rgba(99, 102, 241, 0.35);
    }

    .card-thumb {
      position: relative;
      height: 205px;
      overflow: hidden;
      background: var(--bg-surface-alt);
    }

    .card-thumb img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s ease;
    }

    .post-card:hover .card-thumb img {
      transform: scale(1.06);
    }

    .card-thumb .category-tag {
      position: absolute;
      top: 0.9rem;
      left: 0.9rem;
      background: var(--bg-surface);
      backdrop-filter: blur(8px);
      box-shadow: var(--shadow-sm);
    }

    .card-body {
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      flex: 1;
      gap: 0.75rem;
    }

    .card-title {
      font-size: 1.2rem;
      font-weight: 700;
      line-height: 1.35;
      color: var(--text-primary);
      transition: color 0.2s ease;
    }

    .post-card:hover .card-title {
      color: var(--accent-primary);
    }

    .card-excerpt {
      color: var(--text-secondary);
      font-size: 0.93rem;
      line-height: 1.6;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
      flex: 1;
    }

    .card-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-top: 1rem;
      margin-top: 0.25rem;
      border-top: 1px solid var(--border-color);
    }

    .read-more-btn {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      font-weight: 700;
      font-size: 0.88rem;
      color: var(--accent-primary);
      transition: var(--transition);
    }

    .read-more-btn:hover {
      gap: 0.65rem;
      color: var(--accent-hover);
    }

    .comment-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.3rem;
      font-size: 0.82rem;
      color: var(--text-muted);
      font-weight: 600;
    }

    .card-stats {
      display: inline-flex;
      align-items: center;
      gap: 0.85rem;
    }

    .like-btn {
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      font-size: 0.85rem;
      font-weight: 700;
      color: var(--text-muted);
      padding: 0.3rem 0.65rem;
      border-radius: var(--radius-full);
      background: var(--bg-surface-alt);
      transition: var(--transition);
    }

    .like-btn:hover {
      color: #ef4444;
      background: rgba(239, 68, 68, 0.1);
    }

    .like-btn.liked {
      color: #ef4444;
      background: rgba(239, 68, 68, 0.12);
    }

    .bookmark-btn {
      position: absolute;
      top: 0.9rem;
      right: 0.9rem;
      width: 34px;
      height: 34px;
      border-radius: 50%;
      background: var(--bg-surface);
      color: var(--text-primary);
      display: grid;
      place-items: center;
      font-size: 1.05rem;
      box-shadow: var(--shadow-sm);
      transition: var(--transition);
    }

    .bookmark-btn:hover,
    .bookmark-btn.saved {
      background: var(--accent-primary);
      color: #ffffff;
      transform: scale(1.08);
    }

    .tags-row {
      display: flex;
      flex-wrap: wrap;
      gap: 0.4rem;
    }

    .tag-chip {
      font-size: 0.75rem;
      font-weight: 600;
      color: var(--text-muted);
      background: var(--bg-surface-alt);
      padding: 0.15rem 0.55rem;
      border-radius: 6px;
    }

    .article-actions-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 1rem;
      padding: 1.25rem 0;
      border-top: 1px solid var(--border-color);
      margin-bottom: 1.5rem;
    }

    .reading-progress-bar {
      position: sticky;
      top: 0;
      left: 0;
      width: 0%;
      height: 4px;
      background: linear-gradient(90deg, var(--accent-primary), var(--accent-secondary));
      z-index: 25;
      transition: width 0.1s linear;
    }

    .editor-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.5rem;
      align-items: start;
    }

    .preview-pane {
      background: var(--bg-surface-alt);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-md);
      padding: 1.25rem;
    }

    .comment-delete-btn {
      color: var(--text-muted);
      font-size: 0.85rem;
      padding: 0.2rem 0.4rem;
      border-radius: 4px;
      transition: var(--transition);
    }

    .comment-delete-btn:hover {
      color: #ef4444;
      background: rgba(239, 68, 68, 0.1);
    }

    .like-btn-lg {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.6rem 1.2rem;
      border-radius: var(--radius-full);
      font-weight: 700;
      font-size: 0.92rem;
      background: var(--bg-surface-alt);
      color: var(--text-primary);
      border: 1px solid var(--border-color);
      transition: var(--transition);
    }

    .like-btn-lg:hover,
    .like-btn-lg.liked {
      background: rgba(239, 68, 68, 0.12);
      border-color: rgba(239, 68, 68, 0.35);
      color: #ef4444;
    }

    /* Estado Vazio na Busca */
    .empty-state {
      grid-column: 1 / -1;
      text-align: center;
      padding: 4rem 1.5rem;
      background: var(--bg-surface);
      border: 1px dashed var(--border-color);
      border-radius: var(--radius-md);
    }

    .empty-state i {
      font-size: 3rem;
      color: var(--text-muted);
      margin-bottom: 0.75rem;
    }

    /* ==========================================================================
       6. BARRA LATERAL (SIDEBAR)
       ========================================================================== */
    .sidebar {
      display: flex;
      flex-direction: column;
      gap: 1.75rem;
    }

    .widget {
      background: var(--bg-surface);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-md);
      padding: 1.65rem;
      box-shadow: var(--shadow-md);
    }

    .widget-title {
      font-size: 1.05rem;
      font-weight: 800;
      margin-bottom: 1.15rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: var(--text-primary);
    }

    .widget-title i {
      color: var(--accent-primary);
    }

    /* Perfil do Autor */
    .author-widget {
      text-align: center;
    }

    .author-avatar {
      width: 88px;
      height: 88px;
      border-radius: 50%;
      object-fit: cover;
      margin: 0 auto 1rem;
      border: 3px solid var(--accent-primary);
      padding: 3px;
      background: var(--bg-surface);
    }

    .author-name {
      font-size: 1.15rem;
      font-weight: 800;
    }

    .author-role {
      font-size: 0.85rem;
      color: var(--accent-primary);
      font-weight: 600;
      margin-bottom: 0.75rem;
    }

    .author-bio {
      font-size: 0.9rem;
      color: var(--text-secondary);
      margin-bottom: 1.25rem;
      line-height: 1.6;
    }

    .social-links {
      display: flex;
      justify-content: center;
      gap: 0.65rem;
    }

    .social-links a {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      background: var(--bg-surface-alt);
      display: grid;
      place-items: center;
      font-size: 1.15rem;
      color: var(--text-secondary);
      transition: var(--transition);
    }

    .social-links a:hover {
      background: var(--accent-primary);
      color: #fff;
      transform: translateY(-3px);
    }

    /* Artigos Populares */
    .popular-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .popular-item {
      display: flex;
      align-items: center;
      gap: 0.9rem;
      cursor: pointer;
      padding: 0.4rem;
      border-radius: var(--radius-sm);
      transition: var(--transition);
    }

    .popular-item:hover {
      background: var(--bg-surface-alt);
    }

    .popular-num {
      font-size: 1.25rem;
      font-weight: 800;
      color: var(--accent-primary);
      opacity: 0.45;
      min-width: 24px;
    }

    .popular-info h4 {
      font-size: 0.92rem;
      font-weight: 700;
      line-height: 1.35;
      margin-bottom: 0.2rem;
      transition: color 0.2s;
    }

    .popular-item:hover .popular-info h4 {
      color: var(--accent-primary);
    }

    .popular-info span {
      font-size: 0.78rem;
      color: var(--text-muted);
    }

    /* Newsletter Widget */
    .newsletter-widget {
      background: linear-gradient(145deg, var(--bg-surface), var(--accent-soft));
    }

    .newsletter-desc {
      font-size: 0.9rem;
      color: var(--text-secondary);
      margin-bottom: 1rem;
    }

    .newsletter-form {
      display: flex;
      flex-direction: column;
      gap: 0.7rem;
    }

    .form-input {
      width: 100%;
      padding: 0.7rem 0.95rem;
      border-radius: var(--radius-sm);
      border: 1px solid var(--border-color);
      background: var(--bg-surface);
      font-size: 0.92rem;
      transition: var(--transition);
    }

    .form-input:focus {
      outline: none;
      border-color: var(--accent-primary);
      box-shadow: 0 0 0 3px var(--accent-soft);
    }

    /* ==========================================================================
       7. MODAIS (LEITURA COMPLETA + COMENTÁRIOS & NOVO POST)
       ========================================================================== */
    .modal-overlay {
      position: fixed;
      inset: 0;
      background: rgba(15, 23, 42, 0.65);
      backdrop-filter: blur(6px);
      z-index: 1000;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1.25rem;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.25s ease, visibility 0.25s ease;
    }

    .modal-overlay.open {
      opacity: 1;
      visibility: visible;
    }

    .modal-container {
      background: var(--bg-surface);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-lg);
      width: 100%;
      max-width: 780px;
      max-height: 90vh;
      overflow-y: auto;
      box-shadow: var(--shadow-modal);
      transform: translateY(20px) scale(0.98);
      transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      position: relative;
    }

    .modal-overlay.open .modal-container {
      transform: translateY(0) scale(1);
    }

    .modal-close {
      position: sticky;
      top: 1rem;
      float: right;
      margin: 1rem 1rem 0 0;
      width: 38px;
      height: 38px;
      border-radius: 50%;
      background: var(--bg-surface);
      border: 1px solid var(--border-color);
      color: var(--text-primary);
      display: grid;
      place-items: center;
      font-size: 1.2rem;
      z-index: 10;
      box-shadow: var(--shadow-md);
      transition: var(--transition);
    }

    .modal-close:hover {
      background: #ef4444;
      color: #fff;
      border-color: #ef4444;
    }

    /* Conteúdo do Artigo no Modal */
    .article-modal-cover {
      width: 100%;
      height: 320px;
      object-fit: cover;
      margin-top: -54px;
    }

    .article-modal-body {
      padding: 2.25rem 2.5rem;
    }

    .article-modal-title {
      font-size: clamp(1.5rem, 3vw, 2.1rem);
      font-weight: 800;
      line-height: 1.25;
      margin: 0.75rem 0 1.25rem;
    }

    .article-prose {
      font-family: var(--font-serif);
      font-size: 1.08rem;
      line-height: 1.85;
      color: var(--text-secondary);
      margin-bottom: 2.5rem;
    }

    .article-prose p {
      margin-bottom: 1.25rem;
    }

    /* Seção de Comentários */
    .comments-section {
      border-top: 1px solid var(--border-color);
      padding-top: 2rem;
    }

    .comments-section h3 {
      font-size: 1.2rem;
      font-weight: 800;
      margin-bottom: 1.25rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .comment-form {
      background: var(--bg-surface-alt);
      padding: 1.25rem;
      border-radius: var(--radius-md);
      display: flex;
      flex-direction: column;
      gap: 0.85rem;
      margin-bottom: 1.75rem;
    }

    .comment-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .comment-item {
      padding: 1rem 1.25rem;
      border-radius: var(--radius-sm);
      border: 1px solid var(--border-color);
      background: var(--bg-surface);
    }

    .comment-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.4rem;
    }

    .comment-author {
      font-weight: 700;
      font-size: 0.92rem;
      color: var(--text-primary);
    }

    .comment-date {
      font-size: 0.78rem;
      color: var(--text-muted);
    }

    .comment-text {
      font-size: 0.93rem;
      color: var(--text-secondary);
    }

    /* Formulário Novo Post */
    .new-post-modal {
      max-width: 920px;
      padding: 2rem;
    }

    @media (max-width: 768px) {
      .editor-grid {
        grid-template-columns: 1fr;
      }
    }
  </style>
</head>
<body>

  <!-- ========================================================================
       1. CABEÇALHO RESPONSIVO
       ======================================================================== -->
  <header class="header">
    <div class="container header-inner">
      <a href="#inicio" class="logo">
        <div class="logo-icon"><i class="ph-bold ph-feather"></i></div>
        Meu<span>Blog</span>
      </a>

      <nav>
        <ul class="nav-links" id="navLinks">
          <li><a href="#inicio" class="active">Início</a></li>
          <li><a href="#artigos">Artigos</a></li>
          <li><a href="#categorias">Categorias</a></li>
          <li><a href="#sobre">Sobre</a></li>
        </ul>
      </nav>

      <div class="header-actions">
        <div class="search-box">
          <i class="ph ph-magnifying-glass"></i>
          <input type="search" id="searchInput" class="search-input" placeholder="Buscar artigos..." aria-label="Buscar artigos">
        </div>

        <button class="btn-primary btn-new-post" id="openNewPostBtn" title="Escrever novo artigo">
          <i class="ph-bold ph-plus"></i>
          <span>Novo Post</span>
        </button>

        <button class="btn-icon" id="themeToggle" title="Alternar tema Claro/Escuro" aria-label="Alternar tema">
          <i class="ph-bold ph-moon" id="themeIcon"></i>
        </button>

        <button class="btn-icon mobile-menu-btn" id="mobileMenuBtn" aria-label="Abrir menu">
          <i class="ph-bold ph-list"></i>
        </button>
      </div>
    </div>
  </header>

  <!-- ========================================================================
       2. SEÇÃO HERO DE DESTAQUE
       ======================================================================== -->
  <section class="hero-section" id="inicio">
    <div class="container">
      <article class="hero-card" id="heroContainer">
        <!-- Preenchido dinamicamente via JavaScript -->
      </article>
    </div>
  </section>

  <!-- ========================================================================
       3. FILTRO DE CATEGORIAS
       ======================================================================== -->
  <section class="container" id="categorias">
    <div class="filter-bar">
      <div class="category-pills" id="categoryPills">
        <button class="pill-btn active" data-category="Todos">Todos</button>
        <button class="pill-btn" data-category="Tecnologia">Tecnologia</button>
        <button class="pill-btn" data-category="Design">Design</button>
        <button class="pill-btn" data-category="Produtividade">Produtividade</button>
        <button class="pill-btn" data-category="Estilo de Vida">Estilo de Vida</button>
      </div>

      <div class="filter-controls">
        <div class="view-tabs" role="tablist">
          <button class="tab-btn active" id="tabAll" data-view="all">
            <i class="ph-bold ph-articles"></i> Todos
          </button>
          <button class="tab-btn" id="tabSaved" data-view="saved">
            <i class="ph-bold ph-bookmark-simple"></i> Salvos <span class="badge-count" id="savedCountBadge">0</span>
          </button>
        </div>

        <select id="sortSelect" class="sort-select" aria-label="Ordenar artigos">
          <option value="recent">Mais recentes</option>
          <option value="likes">Mais curtidos</option>
          <option value="comments">Mais comentados</option>
        </select>

        <span class="results-count" id="resultsCount">Mostrando 6 artigos</span>
      </div>
    </div>
  </section>

  <!-- ========================================================================
       4. GRADE DE ARTIGOS & BARRA LATERAL (SIDEBAR)
       ======================================================================== -->
  <main class="container main-layout" id="artigos">
    <!-- Grade de Artigos Recentes -->
    <section class="posts-grid" id="postsGrid">
      <!-- Cartões renderizados via JS -->
    </section>

    <!-- Barra Lateral (Sidebar) -->
    <aside class="sidebar">
      <!-- Perfil do Autor -->
      <div class="widget author-widget" id="sobre">
        <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80" alt="Foto de Mariana Costa" class="author-avatar" onerror="this.src='https://placehold.co/150x150/4f46e5/ffffff?text=MC'">
        <h3 class="author-name">Mariana Costa</h3>
        <p class="author-role">Designer de Produto & Desenvolvedora</p>
        <p class="author-bio">Compartilhando reflexões sobre interfaces minimalistas, engenharia front-end, hábitos criativos e uma vida digital mais intencional.</p>
        <div class="social-links">
          <a href="#sobre" aria-label="GitHub" title="GitHub"><i class="ph-bold ph-github-logo"></i></a>
          <a href="#sobre" aria-label="LinkedIn" title="LinkedIn"><i class="ph-bold ph-linkedin-logo"></i></a>
          <a href="#sobre" aria-label="Twitter / X" title="Twitter / X"><i class="ph-bold ph-x-logo"></i></a>
          <a href="#sobre" aria-label="Instagram" title="Instagram"><i class="ph-bold ph-instagram-logo"></i></a>
        </div>
      </div>

      <!-- Artigos Populares -->
      <div class="widget">
        <h3 class="widget-title"><i class="ph-fill ph-fire"></i> Artigos Populares</h3>
        <div class="popular-list" id="popularList">
          <!-- Renderizado via JS -->
        </div>
      </div>

      <!-- Newsletter Funcional -->
      <div class="widget newsletter-widget">
        <h3 class="widget-title"><i class="ph-fill ph-envelope-simple-open"></i> Assine a Newsletter</h3>
        <p class="newsletter-desc">Receba toda terça-feira uma curadoria exclusiva de artigos sobre design, código e criatividade.</p>
        <form class="newsletter-form" id="newsletterForm">
          <input type="text" class="form-input" id="newsletterName" placeholder="Seu primeiro nome" required>
          <input type="email" class="form-input" id="newsletterEmail" placeholder="seu@email.com" required>
          <button type="submit" class="btn-primary" style="justify-content: center;">
            Inscrever-se gratuitamente
          </button>
        </form>
      </div>
    </aside>
  </main>

  <!-- ========================================================================
       5. MODAL DE LEITURA COMPLETA + COMENTÁRIOS
       ======================================================================== -->
  <div class="modal-overlay" id="articleModal" role="dialog" aria-modal="true">
    <div class="modal-container" id="articleModalScroll">
      <div class="reading-progress-bar" id="readingProgressBar"></div>
      <button class="modal-close" id="closeArticleModal" aria-label="Fechar artigo">
        <i class="ph-bold ph-x"></i>
      </button>
      <div id="articleModalContent">
        <!-- Conteúdo dinâmico do artigo -->
      </div>
    </div>
  </div>

  <!-- ========================================================================
       6. MODAL / FORMULÁRIO PARA "NOVO POST" / EDIÇÃO COM PREVIEW
       ======================================================================== -->
  <div class="modal-overlay" id="newPostModal" role="dialog" aria-modal="true">
    <div class="modal-container new-post-modal">
      <button class="modal-close" id="closeNewPostModal" style="margin: 0;" aria-label="Fechar formulário">
        <i class="ph-bold ph-x"></i>
      </button>
      <h2 id="editorModalHeading" style="font-size: 1.45rem; font-weight: 800; margin-bottom: 0.35rem;">Publicar Novo Artigo</h2>
      <p style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 1.5rem;">Escreva ou edite suas ideias com visualização instantânea.</p>

      <div class="editor-grid">
        <form id="newPostForm">
          <input type="hidden" id="editingPostId" value="">
          <div class="form-group">
            <label for="postTitle">Título do Artigo</label>
            <input type="text" id="postTitle" class="form-input" placeholder="Ex: O futuro do CSS moderno em 2026" required>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
            <div class="form-group">
              <label for="postCategory">Categoria</label>
              <select id="postCategory" class="form-input" required>
                <option value="Tecnologia">Tecnologia</option>
                <option value="Design">Design</option>
                <option value="Produtividade">Produtividade</option>
                <option value="Estilo de Vida">Estilo de Vida</option>
              </select>
            </div>

            <div class="form-group">
              <label for="postTags">Tags (separadas por vírgula)</label>
              <input type="text" id="postTags" class="form-input" placeholder="css, web, frontend">
            </div>
          </div>

          <div class="form-group">
            <label for="postImage">URL da Imagem de Capa (opcional)</label>
            <input type="url" id="postImage" class="form-input" placeholder="https://images.unsplash.com/...">
          </div>

          <div class="form-group">
            <label for="postExcerpt">Resumo curto (aparece no cartão)</label>
            <textarea id="postExcerpt" class="form-input" rows="2" placeholder="Uma breve introdução cativante..." required></textarea>
          </div>

          <div class="form-group">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <label for="postContent">Conteúdo Completo do Artigo</label>
              <small id="liveStats" style="color: var(--accent-primary); font-weight: 700;">0 palavras &bull; 1 min de leitura</small>
            </div>
            <textarea id="postContent" class="form-input" rows="5" placeholder="Escreva aqui os parágrafos do seu artigo..." required></textarea>
          </div>

          <button type="submit" id="submitPostBtn" class="btn-primary" style="width: 100%; justify-content: center; padding: 0.8rem;">
            <i class="ph-bold ph-paper-plane-tilt"></i> Publicar Artigo Agora
          </button>
        </form>

        <div class="preview-pane">
          <span style="font-size: 0.75rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.06em; color: var(--accent-primary); display: block; margin-bottom: 0.75rem;">
            <i class="ph-bold ph-eye"></i> Preview em Tempo Real
          </span>
          <div id="livePreviewCard" class="post-card" style="transform: none;"></div>
        </div>
      </div>
    </div>
  </div>

  <!-- ========================================================================
       6. MODAL / FORMULÁRIO PARA "NOVO POST"
       ======================================================================== -->
  <div class="modal-overlay" id="newPostModal" role="dialog" aria-modal="true">
    <div class="modal-container new-post-modal">
      <button class="modal-close" id="closeNewPostModal" style="margin: 0;" aria-label="Fechar formulário">
        <i class="ph-bold ph-x"></i>
      </button>
      <h2 style="font-size: 1.45rem; font-weight: 800; margin-bottom: 0.35rem;">Publicar Novo Artigo</h2>
      <p style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 1.5rem;">Escreva suas ideias e publique instantaneamente no MeuBlog.</p>

      <form id="newPostForm">
        <div class="form-group">
          <label for="postTitle">Título do Artigo</label>
          <input type="text" id="postTitle" class="form-input" placeholder="Ex: O futuro do CSS moderno em 2026" required>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
          <div class="form-group">
            <label for="postCategory">Categoria</label>
            <select id="postCategory" class="form-input" required>
              <option value="Tecnologia">Tecnologia</option>
              <option value="Design">Design</option>
              <option value="Produtividade">Produtividade</option>
              <option value="Estilo de Vida">Estilo de Vida</option>
            </select>
          </div>

          <div class="form-group">
            <label for="postReadTime">Tempo de Leitura</label>
            <input type="text" id="postReadTime" class="form-input" value="5 min de leitura" required>
          </div>
        </div>

        <div class="form-group">
          <label for="postImage">URL da Imagem de Capa (opcional)</label>
          <input type="url" id="postImage" class="form-input" placeholder="https://images.unsplash.com/...">
        </div>

        <div class="form-group">
          <label for="postExcerpt">Resumo curto (aparece no cartão)</label>
          <textarea id="postExcerpt" class="form-input" rows="2" placeholder="Uma breve introdução cativante..." required></textarea>
        </div>

        <div class="form-group">
          <label for="postContent">Conteúdo Completo do Artigo</label>
          <textarea id="postContent" class="form-input" rows="5" placeholder="Escreva aqui os parágrafos do seu artigo..." required></textarea>
        </div>

        <button type="submit" class="btn-primary" style="width: 100%; justify-content: center; padding: 0.8rem;">
          <i class="ph-bold ph-paper-plane-tilt"></i> Publicar Artigo Agora
        </button>
      </form>
    </div>
  </div>

  <!-- ========================================================================
       7. RODAPÉ COMPLETO
       ======================================================================== -->
  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <a href="#inicio" class="logo">
            <div class="logo-icon"><i class="ph-bold ph-feather"></i></div>
            Meu<span>Blog</span>
          </a>
          <p>Um espaço digital dedicado a explorar a interseção entre tecnologia, design centrado no humano e hábitos de vida equilibrados.</p>
        </div>

        <div class="footer-col">
          <h4>Navegação</h4>
          <ul>
            <li><a href="#inicio">Início</a></li>
            <li><a href="#artigos">Artigos Recentes</a></li>
            <li><a href="#categorias">Explorar Categorias</a></li>
            <li><a href="#sobre">Sobre a Autora</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h4>Categorias</h4>
          <ul>
            <li><a href="#categorias" onclick="filterByCategory('Tecnologia')">Tecnologia</a></li>
            <li><a href="#categorias" onclick="filterByCategory('Design')">Design</a></li>
            <li><a href="#categorias" onclick="filterByCategory('Produtividade')">Produtividade</a></li>
            <li><a href="#categorias" onclick="filterByCategory('Estilo de Vida')">Estilo de Vida</a></li>
          </ul>
        </div>
      </div>

      <div class="footer-bottom">
        <span>&copy; 2026 MeuBlog. Todos os direitos reservados.</span>
        <span>Feito com HTML, CSS Moderno & JavaScript.</span>
      </div>
    </div>
  </footer>

  <!-- Notificação Toast -->
  <div class="toast" id="toast">
    <i class="ph-fill ph-check-circle" style="color: #4ade80; font-size: 1.2rem;"></i>
    <span id="toastMessage">Ação concluída!</span>
  </div>

  <!-- ========================================================================
       8. JAVASCRIPT PARA INTERATIVIDADE COMPLETA (ES6+)
       ======================================================================== -->
  <script>
    const STORAGE_KEY = "meublog-state-v2";

    // Utilitário de cálculo automático de palavras e tempo de leitura
    const calculateReadingMetrics = (textArrayOrString) => {
      const fullText = Array.isArray(textArrayOrString) ? textArrayOrString.join(" ") : String(textArrayOrString || "");
      const words = fullText.trim().split(/\s+/).filter(Boolean).length;
      const minutes = Math.max(1, Math.ceil(words / 200));
      return { words, minutes, label: `${minutes} min de leitura` };
    };

    // Utilitário de timestamp relativo para comentários
    const formatRelativeTime = (isoOrLabel) => {
      const timestamp = Date.parse(isoOrLabel);
      if (Number.isNaN(timestamp)) return isoOrLabel;
      const diffSec = Math.floor((Date.now() - timestamp) / 1000);
      if (diffSec < 60) return "agora mesmo";
      const diffMin = Math.floor(diffSec / 60);
      if (diffMin < 60) return `há ${diffMin} min`;
      const diffHours = Math.floor(diffMin / 60);
      if (diffHours < 24) return `há ${diffHours}h`;
      const diffDays = Math.floor(diffHours / 24);
      return diffDays === 1 ? "ontem" : `há ${diffDays} dias`;
    };

    // Debounce para busca instantânea suave
    const debounce = (fn, delay = 220) => {
      let timer;
      return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), delay);
      };
    };

    // Dados iniciais padrão dos artigos
    const defaultArticles = [
      {
        id: 1,
        createdAt: Date.now() - 86400000 * 1,
        featured: true,
        author: "Mariana Costa",
        title: "Arquitetura CSS Moderna: Como Variáveis, Grid e Subgrid Transformaram a Web",
        category: "Tecnologia",
        tags: ["css", "grid", "arquitetura", "frontend"],
        date: "10 Nov 2026",
        likes: 42,
        liked: false,
        bookmarked: true,
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
        excerpt: "Descubra como abandonar dependências pesadas e construir sistemas de design resilientes, escaláveis e ultra-rápidos utilizando apenas recursos nativos do CSS contemporâneo.",
        content: [
          "Nos últimos anos, o CSS passou por uma revolução silenciosa, porém profunda. Recursos que antes exigiam pré-processadores complexos ou bibliotecas JavaScript inteiras agora são nativos nos navegadores modernos.",
          "As Variáveis CSS (Custom Properties) permitem criar temas dinâmicos — como a alternância instantânea entre Modo Claro e Escuro que você vê neste blog — sem duplicar folhas de estilo ou causar recálculos custosos de layout.",
          "Combinando CSS Grid para macro-layouts bidimensionais e Flexbox para alinhamento fino de componentes, conseguimos interfaces fluidas que se adaptam organicamente a qualquer tamanho de tela."
        ],
        comments: [
          { id: 101, author: "Lucas Mendes", date: "11 Nov 2026", text: "Excelente artigo! Reduzi metade do bundle CSS do meu projeto aplicando variáveis nativas." },
          { id: 102, author: "Camila Rocha", date: "11 Nov 2026", text: "A combinação de Grid com clamp() para tipografia fluida mudou completamente meu fluxo de trabalho." }
        ]
      },
      {
        id: 2,
        createdAt: Date.now() - 86400000 * 3,
        featured: false,
        author: "Mariana Costa",
        title: "Minimalismo Funcional: Projetando Interfaces que Respeitam a Atenção do Usuário",
        category: "Design",
        tags: ["ui", "ux", "minimalismo", "tipografia"],
        date: "06 Nov 2026",
        likes: 31,
        liked: false,
        bookmarked: false,
        image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=900&q=80",
        excerpt: "Menos ruído visual não significa menos funcionalidade. Veja como hierarquia tipográfica, espaço em branco e micro-interações sutis elevam a experiência digital.",
        content: [
          "O bom design é frequentemente invisível. Quando uma interface remove distrações desnecessárias, o conteúdo assume o protagonismo e o leitor entra em estado de fluxo.",
          "O espaço negativo (ou espaço em branco) atua como respiro cognitivo, guiando o olhar naturalmente entre títulos, resumos e chamadas para ação sem fadiga visual.",
          "Ao escolher paletas neutras com uma única cor de destaque bem calibrada, criamos identidade visual forte sem sobrecarregar os sentidos."
        ],
        comments: [
          { id: 201, author: "Rafael Torres", date: "07 Nov 2026", text: "Espaço em branco é realmente o elemento mais subestimado no UI Design." }
        ]
      },
      {
        id: 3,
        createdAt: Date.now() - 86400000 * 5,
        featured: false,
        author: "Mariana Costa",
        title: "Ritual Matinal Analógico: Como Começar o Dia Sem Telas Aumenta seu Foco",
        category: "Estilo de Vida",
        tags: ["hábitos", "foco", "bem-estar"],
        date: "02 Nov 2026",
        likes: 27,
        liked: false,
        bookmarked: false,
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80",
        excerpt: "Trocar os primeiros 45 minutos de notificações no smartphone por café fresco, leitura em papel e planejamento intencional transforma sua clareza mental.",
        content: [
          "Acordar e imediatamente checar mensagens coloca o cérebro em modo reativo antes mesmo de sairmos da cama. Passamos a responder às prioridades dos outros em vez das nossas.",
          "Experimente deixar o celular carregando fora do quarto e dedicar a primeira hora da manhã a hábitos analógicos: preparar um café com calma, alongar o corpo e anotar três metas essenciais em um caderno.",
          "Essa pequena mudança reduz a ansiedade matinal e preserva sua energia criativa para as tarefas mais exigentes do dia."
        ],
        comments: []
      },
      {
        id: 4,
        createdAt: Date.now() - 86400000 * 8,
        featured: false,
        author: "Mariana Costa",
        title: "Sistemas de Segundo Cérebro: Organizando Notas Técnicas sem Fricção",
        category: "Produtividade",
        tags: ["notas", "organização", "markdown"],
        date: "28 Out 2026",
        likes: 38,
        liked: false,
        bookmarked: false,
        image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=900&q=80",
        excerpt: "Aprenda a estruturar um arquivo pessoal de conhecimento usando links bidirecionais e notas atômicas para nunca mais perder uma boa ideia.",
        content: [
          "Nossa mente foi feita para ter ideias, não para armazená-las todas de uma vez. Quando tentamos lembrar de dezenas de links, trechos de código e referências, geramos sobrecarga mental.",
          "Um sistema simples baseado em arquivos Markdown e captura rápida permite conectar conceitos de áreas diferentes — como ligar um princípio de arquitetura a um padrão de design de software.",
          "O segredo não está na ferramenta mais complexa, mas na consistência de revisar e conectar suas anotações semanalmente."
        ],
        comments: [
          { id: 401, author: "Beatriz Lima", date: "29 Out 2026", text: "Comecei a usar notas atômicas mês passado e minha escrita ficou muito mais rápida!" }
        ]
      },
      {
        id: 5,
        createdAt: Date.now() - 86400000 * 12,
        featured: false,
        author: "Mariana Costa",
        title: "Tipografia na Web: Combinando Fontes Serifadas e Sem Serifa com Harmonia",
        category: "Design",
        tags: ["tipografia", "fontes", "leitura"],
        date: "21 Out 2026",
        likes: 19,
        liked: false,
        bookmarked: false,
        image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=900&q=80",
        excerpt: "Um guia prático sobre contraste tipográfico, altura-x, espaçamento entre linhas e como tornar textos longos prazerosos de ler em qualquer tela.",
        content: [
          "A tipografia representa mais de 90% do conteúdo da web. Escolher boas fontes e configurar corretamente o ritmo vertical define se o visitante vai ler seu artigo até o fim ou fechar a aba.",
          "Uma combinação clássica e eficaz é utilizar uma fonte geométrica sem serifa (como Plus Jakarta Sans) para títulos e navegação, e uma fonte serifada editorial (como Lora) no corpo de textos longos.",
          "Mantenha a largura da linha entre 60 e 75 caracteres e uma altura de linha generosa (1.7 a 1.85) para máximo conforto ocular."
        ],
        comments: []
      },
      {
        id: 6,
        createdAt: Date.now() - 86400000 * 16,
        featured: false,
        author: "Mariana Costa",
        title: "JavaScript Vanilla em 2026: Quando Você Realmente Precisa de um Framework?",
        category: "Tecnologia",
        tags: ["javascript", "es6", "performance"],
        date: "14 Out 2026",
        likes: 54,
        liked: false,
        bookmarked: false,
        image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=900&q=80",
        excerpt: "Analisamos cenários reais onde JavaScript puro, Web Components e APIs modernas do navegador entregam performance instantânea com zero etapas de build.",
        content: [
          "Frameworks modernos são ferramentas extraordinárias para aplicações complexas de estado distribuído, mas muitas vezes são aplicados por hábito em sites orientados a conteúdo.",
          "Com APIs nativas como Fetch, Template Literals, IntersectionObserver e Dialog, construir experiências ricas e interativas em JavaScript puro tornou-se limpo e prazeroso.",
          "Antes de iniciar um projeto, vale perguntar: qual é a arquitetura mais simples capaz de entregar a melhor experiência ao leitor?"
        ],
        comments: [
          { id: 601, author: "Diego Alves", date: "15 Out 2026", text: "Menos complexidade acidental e mais foco no produto final. Concordo 100%!" }
        ]
      }
    ];

    // Estado reativo centralizado
    const loadState = () => {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
      } catch (err) {
        console.warn("Erro ao carregar estado do localStorage:", err);
      }
      return defaultArticles;
    };

    const state = {
      articles: loadState(),
      category: "Todos",
      view: "all", // "all" | "saved"
      sortBy: "recent", // "recent" | "likes" | "comments"
      searchQuery: "",
      activeArticleId: null
    };

    const saveState = () => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state.articles));
      } catch (err) {
        console.warn("Erro ao persistir estado no localStorage:", err);
      }
    };

    // Elementos do DOM
    const heroContainer = document.getElementById("heroContainer");
    const postsGrid = document.getElementById("postsGrid");
    const popularList = document.getElementById("popularList");
    const resultsCount = document.getElementById("resultsCount");
    const savedCountBadge = document.getElementById("savedCountBadge");
    const searchInput = document.getElementById("searchInput");
    const categoryPills = document.getElementById("categoryPills");
    const sortSelect = document.getElementById("sortSelect");
    const articleModal = document.getElementById("articleModal");
    const articleModalScroll = document.getElementById("articleModalScroll");
    const readingProgressBar = document.getElementById("readingProgressBar");
    const articleModalContent = document.getElementById("articleModalContent");
    const newPostModal = document.getElementById("newPostModal");
    const themeToggle = document.getElementById("themeToggle");
    const themeIcon = document.getElementById("themeIcon");

    // ========================================================================
    // NOTIFICAÇÃO TOAST
    // ========================================================================
    const showToast = (message) => {
      const toast = document.getElementById("toast");
      const toastMessage = document.getElementById("toastMessage");
      toastMessage.textContent = message;
      toast.classList.add("show");
      clearTimeout(toast._timer);
      toast._timer = setTimeout(() => toast.classList.remove("show"), 3200);
    };

    // Destaque de termos pesquisados
    const highlightText = (text, query) => {
      const safe = escapeHTML(text);
      if (!query) return safe;
      const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      return safe.replace(new RegExp(`(${escapedQuery})`, "gi"), `<mark class="search-highlight">$1</mark>`);
    };

    // ========================================================================
    // RENDERIZAÇÃO DO ARTIGO HERO (DESTAQUE)
    // ========================================================================
    const renderHero = () => {
      const featured = state.articles.find(a => a.featured) || state.articles[0];
      if (!featured) return;
      const metrics = calculateReadingMetrics(featured.content);

      heroContainer.innerHTML = `
        <div class="hero-image-wrapper">
          <span class="hero-badge">Artigo em Destaque</span>
          <img src="${featured.image}" alt="${escapeHTML(featured.title)}" onerror="this.src='https://placehold.co/800x500/4f46e5/ffffff?text=MeuBlog+Destaque'">
        </div>
        <div class="hero-content">
          <div class="post-meta">
            <span class="category-tag">${featured.category}</span>
            <span>&bull; ${featured.date}</span>
            <span>&bull; ${metrics.label}</span>
          </div>
          <h1 class="hero-title">${escapeHTML(featured.title)}</h1>
          <p class="hero-excerpt">${escapeHTML(featured.excerpt)}</p>
          <div class="hero-footer">
            <div class="author-mini">
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80" alt="Mariana Costa" onerror="this.src='https://placehold.co/80x80/4f46e5/ffffff?text=MC'">
              <div class="author-mini-info">
                <span>${escapeHTML(featured.author || "Mariana Costa")}</span>
                <small>Editora Chefe</small>
              </div>
            </div>
            <button class="btn-primary" onclick="openArticle(${featured.id})">
              Ler artigo <i class="ph-bold ph-arrow-right"></i>
            </button>
          </div>
        </div>
      `;
    };

    // ========================================================================
    // RENDERIZAÇÃO DA GRADE DE ARTIGOS (BUSCA, FILTRO, FAVORITOS & ORDENAÇÃO)
    // ========================================================================
    const renderPosts = () => {
      const savedTotal = state.articles.filter(a => a.bookmarked).length;
      savedCountBadge.textContent = savedTotal;

      const query = state.searchQuery.toLowerCase().trim();
      let filtered = state.articles.filter(article => {
        const matchesView = state.view === "all" || article.bookmarked;
        const matchesCategory = state.category === "Todos" || article.category === state.category;
        const tagsText = (article.tags || []).join(" ").toLowerCase();
        const matchesSearch = !query ||
          article.title.toLowerCase().includes(query) ||
          article.excerpt.toLowerCase().includes(query) ||
          (article.author || "Mariana Costa").toLowerCase().includes(query) ||
          article.category.toLowerCase().includes(query) ||
          tagsText.includes(query);
        return matchesView && matchesCategory && matchesSearch;
      });

      // Ordenação dinâmica
      filtered = [...filtered].sort((a, b) => {
        if (state.sortBy === "likes") return (b.likes || 0) - (a.likes || 0);
        if (state.sortBy === "comments") return b.comments.length - a.comments.length;
        return (b.createdAt || b.id) - (a.createdAt || a.id);
      });

      resultsCount.textContent = filtered.length === 1
        ? "Mostrando 1 artigo"
        : `Mostrando ${filtered.length} artigos`;

      if (filtered.length === 0) {
        postsGrid.innerHTML = `
          <div class="empty-state">
            <i class="ph ${state.view === "saved" ? "ph-bookmark-simple" : "ph-magnifying-glass"}"></i>
            <h3 style="margin-bottom: 0.4rem;">${state.view === "saved" ? "Nenhum artigo salvo nos favoritos" : "Nenhum artigo encontrado"}</h3>
            <p style="color: var(--text-secondary); margin-bottom: 1rem;">
              ${state.view === "saved" ? "Clique no ícone de marcador nos artigos para salvá-los aqui." : "Tente buscar por outro termo ou limpe os filtros selecionados."}
            </p>
            <button class="btn-primary" onclick="resetFilters()">Ver Todos os Artigos</button>
          </div>
        `;
        return;
      }

      postsGrid.innerHTML = filtered.map(article => {
        const metrics = calculateReadingMetrics(article.content);
        const tagsHtml = (article.tags || []).slice(0, 3)
          .map(t => `<span class="tag-chip">#${highlightText(t, query)}</span>`)
          .join("");

        return `
          <article class="post-card">
            <div class="card-thumb">
              <span class="category-tag">${article.category}</span>
              <button class="bookmark-btn ${article.bookmarked ? "saved" : ""}" onclick="toggleBookmark(${article.id})" title="${article.bookmarked ? "Remover dos salvos" : "Salvar nos favoritos"}" aria-label="Salvar artigo">
                <i class="${article.bookmarked ? "ph-fill" : "ph-bold"} ph-bookmark-simple"></i>
              </button>
              <img src="${article.image}" alt="${escapeHTML(article.title)}" loading="lazy" onerror="this.src='https://placehold.co/600x400/1e293b/ffffff?text=${encodeURIComponent(article.category)}'">
            </div>
            <div class="card-body">
              <div class="post-meta">
                <span>${article.date}</span>
                <span>&bull;</span>
                <span>${metrics.label}</span>
              </div>
              <h2 class="card-title">
                <a href="javascript:void(0)" onclick="openArticle(${article.id})">${highlightText(article.title, query)}</a>
              </h2>
              <p class="card-excerpt">${highlightText(article.excerpt, query)}</p>
              ${tagsHtml ? `<div class="tags-row">${tagsHtml}</div>` : ""}
              <div class="card-footer">
                <button class="read-more-btn" onclick="openArticle(${article.id})">
                  Ler mais <i class="ph-bold ph-arrow-right"></i>
                </button>
                <div class="card-stats">
                  <button class="like-btn ${article.liked ? "liked" : ""}" onclick="toggleLike(${article.id}, false)" title="Curtir artigo" aria-label="Curtir artigo">
                    <i class="${article.liked ? "ph-fill" : "ph-bold"} ph-heart"></i> ${article.likes || 0}
                  </button>
                  <span class="comment-badge" title="Comentários">
                    <i class="ph-fill ph-chat-circle-text"></i> ${article.comments.length}
                  </span>
                </div>
              </div>
            </div>
          </article>
        `;
      }).join("");
    };

    // ========================================================================
    // RENDERIZAÇÃO DOS ARTIGOS POPULARES NA SIDEBAR
    // ========================================================================
    const renderPopular = () => {
      const topArticles = [...state.articles]
        .sort((a, b) => (b.likes || 0) - (a.likes || 0))
        .slice(0, 4);

      popularList.innerHTML = topArticles.map((art, index) => {
        const metrics = calculateReadingMetrics(art.content);
        return `
          <div class="popular-item" onclick="openArticle(${art.id})">
            <span class="popular-num">0${index + 1}</span>
            <div class="popular-info">
              <h4>${escapeHTML(art.title)}</h4>
              <span>${art.category} &bull; ${metrics.label}</span>
            </div>
          </div>
        `;
      }).join("");
    };

    // ========================================================================
    // FILTROS, ABAS E ORDENAÇÃO
    // ========================================================================
    const filterByCategory = (category) => {
      state.category = category;
      document.querySelectorAll(".pill-btn").forEach(btn => {
        btn.classList.toggle("active", btn.dataset.category === category);
      });
      renderPosts();
    };

    const switchView = (view) => {
      state.view = view;
      document.querySelectorAll(".tab-btn").forEach(btn => {
        btn.classList.toggle("active", btn.dataset.view === view);
      });
      renderPosts();
    };

    const resetFilters = () => {
      state.searchQuery = "";
      searchInput.value = "";
      state.view = "all";
      switchView("all");
      filterByCategory("Todos");
    };

    categoryPills.addEventListener("click", (e) => {
      if (e.target.classList.contains("pill-btn")) {
        filterByCategory(e.target.dataset.category);
      }
    });

    document.querySelectorAll(".tab-btn").forEach(btn => {
      btn.addEventListener("click", () => switchView(btn.dataset.view));
    });

    sortSelect.addEventListener("change", (e) => {
      state.sortBy = e.target.value;
      renderPosts();
    });

    searchInput.addEventListener("input", debounce((e) => {
      state.searchQuery = e.target.value;
      renderPosts();
    }, 200));

    // ========================================================================
    // MODAL DE LEITURA COMPLETA, PROGRESSO DE SCROLL, SHARE & COMENTÁRIOS
    // ========================================================================
    const updateReadingProgress = () => {
      const { scrollTop, scrollHeight, clientHeight } = articleModalScroll;
      const scrollable = scrollHeight - clientHeight;
      const pct = scrollable > 0 ? Math.min(100, Math.max(0, (scrollTop / scrollable) * 100)) : 100;
      readingProgressBar.style.width = `${pct}%`;
    };

    articleModalScroll.addEventListener("scroll", updateReadingProgress);

    const shareArticle = async (article) => {
      const shareUrl = `${window.location.origin}${window.location.pathname}#artigo-${article.id}`;
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(shareUrl);
        } else {
          const temp = document.createElement("input");
          temp.value = shareUrl;
          document.body.appendChild(temp);
          temp.select();
          document.execCommand("copy");
          document.body.removeChild(temp);
        }
        showToast("Link do artigo copiado para a área de transferência!");
      } catch {
        showToast("Link pronto para compartilhamento!");
      }
    };

    const openArticle = (id) => {
      const article = state.articles.find(a => a.id === id);
      if (!article) return;
      state.activeArticleId = id;

      const metrics = calculateReadingMetrics(article.content);
      const paragraphsHtml = article.content.map(p => `<p>${escapeHTML(p)}</p>`).join("");
      const tagsHtml = (article.tags || []).map(t => `<span class="tag-chip">#${escapeHTML(t)}</span>`).join("");

      const commentsHtml = article.comments.length > 0
        ? article.comments.map(c => `
            <div class="comment-item">
              <div class="comment-header">
                <span class="comment-author">${escapeHTML(c.author)}</span>
                <div style="display: flex; align-items: center; gap: 0.6rem;">
                  <span class="comment-date">${formatRelativeTime(c.createdAt || c.date)}</span>
                  <button class="comment-delete-btn" onclick="deleteComment(${article.id}, ${c.id})" title="Excluir comentário" aria-label="Excluir comentário">
                    <i class="ph-bold ph-trash"></i>
                  </button>
                </div>
              </div>
              <p class="comment-text">${escapeHTML(c.text)}</p>
            </div>
          `).join("")
        : `<p style="color: var(--text-muted); font-size: 0.9rem;">Seja o primeiro a comentar neste artigo!</p>`;

      articleModalContent.innerHTML = `
        <img src="${article.image}" alt="${escapeHTML(article.title)}" class="article-modal-cover" onerror="this.src='https://placehold.co/800x400/4f46e5/ffffff?text=MeuBlog'">
        <div class="article-modal-body">
          <div class="post-meta">
            <span class="category-tag">${article.category}</span>
            <span>&bull; ${article.date}</span>
            <span>&bull; ${metrics.words} palavras (${metrics.label})</span>
          </div>
          <h2 class="article-modal-title">${escapeHTML(article.title)}</h2>
          ${tagsHtml ? `<div class="tags-row" style="margin-bottom: 1.25rem;">${tagsHtml}</div>` : ""}
          <div class="article-prose">
            ${paragraphsHtml}
          </div>

          <div class="article-actions-bar">
            <div style="display: flex; align-items: center; gap: 0.6rem; flex-wrap: wrap;">
              <button class="like-btn-lg ${article.liked ? "liked" : ""}" onclick="toggleLike(${article.id}, true)">
                <i class="${article.liked ? "ph-fill" : "ph-bold"} ph-heart"></i>
                <span>${article.liked ? "Curtido" : "Curtir"} (${article.likes || 0})</span>
              </button>
              <button class="like-btn-lg" onclick="toggleBookmark(${article.id}, true)">
                <i class="${article.bookmarked ? "ph-fill" : "ph-bold"} ph-bookmark-simple"></i>
                <span>${article.bookmarked ? "Salvo" : "Salvar"}</span>
              </button>
              <button class="like-btn-lg" id="shareArticleBtn">
                <i class="ph-bold ph-share-network"></i>
                <span>Compartilhar</span>
              </button>
              <button class="like-btn-lg" onclick="openEditArticle(${article.id})">
                <i class="ph-bold ph-pencil-simple"></i>
                <span>Editar</span>
              </button>
            </div>
            <span style="font-size: 0.88rem; color: var(--text-muted);">
              Por <strong>${escapeHTML(article.author || "Mariana Costa")}</strong>
            </span>
          </div>

          <section class="comments-section">
            <h3><i class="ph-fill ph-chats-circle"></i> Comentários (${article.comments.length})</h3>
            <form class="comment-form" onsubmit="addComment(event, ${article.id})">
              <input type="text" id="commentAuthor" class="form-input" placeholder="Seu nome" required>
              <textarea id="commentText" class="form-input" rows="3" placeholder="Compartilhe sua opinião sobre este artigo..." required></textarea>
              <button type="submit" class="btn-primary" style="align-self: flex-start;">
                Publicar Comentário
              </button>
            </form>
            <div class="comment-list">
              ${commentsHtml}
            </div>
          </section>
        </div>
      `;

      document.getElementById("shareArticleBtn").addEventListener("click", () => shareArticle(article));

      articleModal.classList.add("open");
      articleModalScroll.scrollTop = 0;
      updateReadingProgress();
      document.body.style.overflow = "hidden";
    };

    const addComment = (event, articleId) => {
      event.preventDefault();
      const authorInput = document.getElementById("commentAuthor");
      const textInput = document.getElementById("commentText");

      const article = state.articles.find(a => a.id === articleId);
      if (!article) return;

      article.comments.unshift({
        id: Date.now(),
        author: authorInput.value.trim(),
        createdAt: new Date().toISOString(),
        date: "agora mesmo",
        text: textInput.value.trim()
      });

      saveState();
      openArticle(articleId);
      renderPosts();
      showToast("Comentário adicionado com sucesso!");
    };

    const deleteComment = (articleId, commentId) => {
      const article = state.articles.find(a => a.id === articleId);
      if (!article) return;
      article.comments = article.comments.filter(c => c.id !== commentId);
      saveState();
      openArticle(articleId);
      renderPosts();
      showToast("Comentário removido.");
    };

    const toggleLike = (articleId, fromModal = false) => {
      const article = state.articles.find(a => a.id === articleId);
      if (!article) return;

      article.liked = !article.liked;
      article.likes = (article.likes || 0) + (article.liked ? 1 : -1);

      saveState();
      renderPosts();
      renderPopular();
      if (fromModal) openArticle(articleId);
      if (article.liked) showToast("Você curtiu este artigo!");
    };

    const toggleBookmark = (articleId, fromModal = false) => {
      const article = state.articles.find(a => a.id === articleId);
      if (!article) return;

      article.bookmarked = !article.bookmarked;
      saveState();
      renderPosts();
      if (fromModal) openArticle(articleId);
      showToast(article.bookmarked ? "Artigo salvo nos favoritos!" : "Removido dos favoritos.");
    };

    const closeArticleModalFn = () => {
      articleModal.classList.remove("open");
      state.activeArticleId = null;
      document.body.style.overflow = "";
    };

    document.getElementById("closeArticleModal").addEventListener("click", closeArticleModalFn);
    articleModal.addEventListener("click", (e) => {
      if (e.target === articleModal) closeArticleModalFn();
    });

    // ========================================================================
    // MODAL & FORMULÁRIO DE CRIAÇÃO / EDIÇÃO COM PREVIEW EM TEMPO REAL
    // ========================================================================
    const editorForm = document.getElementById("newPostForm");
    const livePreviewCard = document.getElementById("livePreviewCard");
    const liveStats = document.getElementById("liveStats");

    const defaultCategoryImages = {
      "Tecnologia": "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80",
      "Design": "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=900&q=80",
      "Produtividade": "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=900&q=80",
      "Estilo de Vida": "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=900&q=80"
    };

    const updateLiveEditorPreview = () => {
      const title = document.getElementById("postTitle").value.trim() || "Título do seu artigo aparecerá aqui";
      const category = document.getElementById("postCategory").value;
      const image = document.getElementById("postImage").value.trim() || defaultCategoryImages[category];
      const excerpt = document.getElementById("postExcerpt").value.trim() || "O resumo cativante do seu artigo será exibido neste espaço do cartão...";
      const content = document.getElementById("postContent").value;
      const metrics = calculateReadingMetrics(content);

      liveStats.textContent = `${metrics.words} palavras • ${metrics.label}`;

      livePreviewCard.innerHTML = `
        <div class="card-thumb" style="height: 165px;">
          <span class="category-tag">${category}</span>
          <img src="${image}" alt="Preview" onerror="this.src='https://placehold.co/600x400/4f46e5/ffffff?text=Preview'">
        </div>
        <div class="card-body">
          <div class="post-meta">
            <span>Hoje</span>
            <span>&bull;</span>
            <span>${metrics.label}</span>
          </div>
          <h3 class="card-title">${escapeHTML(title)}</h3>
          <p class="card-excerpt">${escapeHTML(excerpt)}</p>
        </div>
      `;
    };

    ["postTitle", "postCategory", "postImage", "postExcerpt", "postContent"].forEach(id => {
      document.getElementById(id).addEventListener("input", updateLiveEditorPreview);
    });

    document.getElementById("openNewPostBtn").addEventListener("click", () => {
      editorForm.reset();
      document.getElementById("editingPostId").value = "";
      document.getElementById("editorModalHeading").textContent = "Publicar Novo Artigo";
      document.getElementById("submitPostBtn").innerHTML = `<i class="ph-bold ph-paper-plane-tilt"></i> Publicar Artigo Agora`;
      updateLiveEditorPreview();
      newPostModal.classList.add("open");
      document.body.style.overflow = "hidden";
    });

    const openEditArticle = (id) => {
      const article = state.articles.find(a => a.id === id);
      if (!article) return;
      closeArticleModalFn();

      document.getElementById("editingPostId").value = article.id;
      document.getElementById("postTitle").value = article.title;
      document.getElementById("postCategory").value = article.category;
      document.getElementById("postTags").value = (article.tags || []).join(", ");
      document.getElementById("postImage").value = article.image;
      document.getElementById("postExcerpt").value = article.excerpt;
      document.getElementById("postContent").value = article.content.join("\n\n");

      document.getElementById("editorModalHeading").textContent = "Editar Artigo";
      document.getElementById("submitPostBtn").innerHTML = `<i class="ph-bold ph-check"></i> Salvar Alterações`;
      updateLiveEditorPreview();

      newPostModal.classList.add("open");
      document.body.style.overflow = "hidden";
    };

    const closeNewPostModalFn = () => {
      newPostModal.classList.remove("open");
      document.body.style.overflow = "";
    };

    document.getElementById("closeNewPostModal").addEventListener("click", closeNewPostModalFn);
    newPostModal.addEventListener("click", (e) => {
      if (e.target === newPostModal) closeNewPostModalFn();
    });

    editorForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const editingId = Number(document.getElementById("editingPostId").value);
      const title = document.getElementById("postTitle").value.trim();
      const category = document.getElementById("postCategory").value;
      const tags = document.getElementById("postTags").value
        .split(",")
        .map(t => t.trim().toLowerCase())
        .filter(Boolean);
      const imageInput = document.getElementById("postImage").value.trim();
      const excerpt = document.getElementById("postExcerpt").value.trim();
      const rawContent = document.getElementById("postContent").value.trim();
      const paragraphs = rawContent.split(/\n+/).filter(p => p.trim() !== "");

      if (editingId) {
        const existing = state.articles.find(a => a.id === editingId);
        if (existing) {
          existing.title = title;
          existing.category = category;
          existing.tags = tags;
          existing.image = imageInput || defaultCategoryImages[category];
          existing.excerpt = excerpt;
          existing.content = paragraphs;
        }
        saveState();
        closeNewPostModalFn();
        renderHero();
        renderPosts();
        renderPopular();
        showToast("Artigo atualizado com sucesso!");
        return;
      }

      const today = new Date().toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" });
      const newArticle = {
        id: Date.now(),
        createdAt: Date.now(),
        featured: false,
        author: "Mariana Costa",
        title,
        category,
        tags,
        date: today,
        likes: 0,
        liked: false,
        bookmarked: false,
        image: imageInput || defaultCategoryImages[category],
        excerpt,
        content: paragraphs,
        comments: []
      };

      state.articles.unshift(newArticle);
      saveState();
      e.target.reset();
      closeNewPostModalFn();
      switchView("all");
      filterByCategory("Todos");
      renderPopular();
      showToast("Novo artigo publicado e salvo no navegador!");
    });

    // ========================================================================
    // NEWSLETTER FUNCIONAL
    // ========================================================================
    document.getElementById("newsletterForm").addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("newsletterName").value.trim();
      e.target.reset();
      showToast(`Obrigado, ${name}! Inscrição confirmada na newsletter.`);
    });

    // ========================================================================
    // ALTERNÂNCIA DE TEMA (MODO CLARO / MODO ESCURO)
    // ========================================================================
    function setTheme(theme) {
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem("meublog-theme", theme);
      themeIcon.className = theme === "dark" ? "ph-bold ph-sun" : "ph-bold ph-moon";
    }

    const savedTheme = localStorage.getItem("meublog-theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    setTheme(savedTheme);

    themeToggle.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme");
      setTheme(current === "dark" ? "light" : "dark");
    });

    // ========================================================================
    // MENU MOBILE & UTILITÁRIOS
    // ========================================================================
    const mobileMenuBtn = document.getElementById("mobileMenuBtn");
    const navLinks = document.getElementById("navLinks");

    mobileMenuBtn.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });

    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => navLinks.classList.remove("active"));
    });

    // Fechar modais com a tecla ESC
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeArticleModalFn();
        closeNewPostModalFn();
      }
    });

    // Prevenção simples de XSS nos comentários
    function escapeHTML(str) {
      const div = document.createElement("div");
      div.textContent = str;
      return div.innerHTML;
    }

    // Inicialização da página
    renderHero();
    renderPosts();
    renderPopular();
  </script>
</body>
</html>