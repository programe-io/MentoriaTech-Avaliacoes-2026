```react
import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Sun,
  Feather,
  UserPen,
  PlusCircle,
  Search,
  PenTool,
  Edit3,
  BookOpen,
  Sparkles,
  Pencil,
  Trash2,
  ArrowRight,
  X,
  Send,
  Share2,
  SearchX,
  RotateCcw,
  CheckCircle2,
  Quote
} from 'lucide-react';

// Chaves do armazenamento local (localStorage) para persistência automática
const STORAGE_AUTHOR_KEY = 'vozes_raizes_react_author_v1';
const STORAGE_ARTICLES_KEY = 'vozes_raizes_react_articles_v1';
const STORAGE_APPLAUSE_KEY = 'vozes_raizes_react_applause_v1';

// Perfil inicial personalizável pelo usuário
const DEFAULT_AUTHOR = {
  name: 'Seu Nome',
  role: 'Autor(a) & Voz Ativa',
  bio: 'Bem-vindo ao meu espaço de escrita e reflexão. Aqui compartilho minhas palavras sobre identidade, ancestralidade, cultura afro-brasileira e a importância de manter viva a nossa história todos os dias do ano.'
};

// Temas visuais para as capas artísticas dos artigos
const COVER_THEMES = {
  ouro: {
    gradient: 'from-amber-700 via-amber-600 to-[#1c100b]',
    accent: '#fbbf24',
    label: 'Ouro & Ancestralidade'
  },
  esmeralda: {
    gradient: 'from-emerald-800 via-emerald-950 to-[#120a07]',
    accent: '#34d399',
    label: 'Força & Quilombo'
  },
  terracota: {
    gradient: 'from-red-900 via-amber-900 to-[#120a07]',
    accent: '#f87171',
    label: 'Terracota & Raízes'
  },
  kente: {
    gradient: 'from-amber-600 via-red-800 to-emerald-950',
    accent: '#fde68a',
    label: 'Arte & Tradição'
  }
};

const CATEGORIES = [
  'Todos',
  'História & Memória',
  'Cultura & Arte',
  'Reflexões',
  'Atualidade'
];

// Artigos iniciais em primeira pessoa prontos para levar a assinatura do usuário
const DEFAULT_ARTICLES = [
  {
    id: 1,
    title: '20 de Novembro: Muito Além de Uma Data no Calendário',
    category: 'História & Memória',
    theme: 'ouro',
    date: '20 Nov • Especial',
    readTime: '4 min',
    applause: 48,
    excerpt:
      'Quando olho para a história de Zumbi e Dandara dos Palmares, entendo que a resistência não ficou no passado: ela pulsa na nossa voz hoje.',
    paragraphs: [
      'Escrevo este texto pensando no verdadeiro significado de celebrarmos o Dia Nacional de Zumbi e da Consciência Negra. Para mim, esta data nunca foi apenas um feriado ou uma formalidade escolar — ela é um convite urgente à memória e ao reconhecimento.',
      'Durante muito tempo, tentaram contar a nossa história apenas pelo ponto de vista da dor. Mas quando estudamos a fundo a organização do Quilombo dos Palmares, a estratégia de Zumbi e a liderança destemida de Dandara, descobrimos uma história de inteligência, soberania e construção coletiva.',
      'Ter consciência negra, no meu dia a dia, significa reconhecer o valor de quem veio antes de mim, valorizar nossa estética, nossa fala e garantir que as próximas gerações cresçam sabendo que somos protagonistas da cultura e do futuro deste país.'
    ]
  },
  {
    id: 2,
    title: 'A Herança que Carregamos na Música, na Língua e no Cotidiano',
    category: 'Cultura & Arte',
    theme: 'kente',
    date: '14 Nov',
    readTime: '5 min',
    applause: 36,
    excerpt:
      'Do ritmo dos tambores às palavras que usamos sem perceber: a matriz africana é o coração pulsante da identidade brasileira.',
    paragraphs: [
      'Basta prestar atenção ao som das ruas, ao vocabulário que usamos em casa ou à culinária que reúne nossas famílias à mesa para perceber: a cultura afro-brasileira é a base viva do que somos.',
      'Palavras como cafuné, quilombo, axé, moleque e dengo carregam afeto e ancestralidade. Na música, o samba, o maracatu, o jongo, o rap e o ijexá transformaram resistência em poesia e celebração.',
      'Ao escrever sobre cultura aqui no meu blog, quero sempre lembrar que valorizar nossas expressões artísticas é também valorizar os artistas, mestres e griôs que mantêm essas tradições vivas.'
    ]
  },
  {
    id: 3,
    title: 'Representatividade Importa: O Impacto de Nos Vermos em Todos os Espaços',
    category: 'Reflexões',
    theme: 'esmeralda',
    date: '08 Nov',
    readTime: '4 min',
    applause: 52,
    excerpt:
      'Quando ocupamos lugares de criação, liderança e escrita, abrimos portas para que outras pessoas também acreditem no próprio potencial.',
    paragraphs: [
      'Sempre reflito sobre como a presença muda tudo. Quando vemos pessoas negras escrevendo livros, dirigindo filmes, liderando pesquisas científicas e criando tecnologia, a percepção sobre o que é possível se transforma.',
      'A representatividade não é apenas estética; ela é sobre ter voz ativa nas decisões e contar nossas próprias narrativas com autenticidade e respeito.',
      'Cada texto que publico neste espaço é uma forma de afirmar que nossas histórias merecem ser lidas, discutidas e celebradas com toda a riqueza que possuem.'
    ]
  },
  {
    id: 4,
    title: 'Educação Antirracista: Um Compromisso de Todos os Dias',
    category: 'Atualidade',
    theme: 'terracota',
    date: '02 Nov',
    readTime: '3 min',
    applause: 29,
    excerpt:
      'O combate ao racismo começa no diálogo honesto, na leitura de autores negros e na transformação das nossas atitudes diárias.',
    paragraphs: [
      'Falar sobre consciência negra exige também olhar para o presente com responsabilidade. Não basta dizer que não somos racistas; é preciso construir ativamente uma sociedade mais justa e igualitária.',
      'Isso passa por ler escritores e escritoras negras, apoiar empreendedores locais, questionar estereótipos e ensinar às crianças o orgulho de suas raízes desde cedo.',
      'Que este blog seja sempre um ponto de encontro para ideias que constroem pontes, despertam consciência e fortalecem nossa caminhada.'
    ]
  }
];

// Componente auxiliar para ilustrações geométricas nas capas dos cards
function CoverGeometricArt({ themeKey, uniqueId }) {
  const theme = COVER_THEMES[themeKey] || COVER_THEMES.ouro;
  const patternId = `geo-pattern-${themeKey}-${uniqueId}`;

  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-35 pointer-events-none"
      viewBox="0 0 400 200"
      preserveAspectRatio="none"
    >
      <defs>
        <pattern id={patternId} width="40" height="40" patternUnits="userSpaceOnUse">
          <path
            d="M20 0 L40 20 L20 40 L0 20 Z"
            fill="none"
            stroke={theme.accent}
            strokeWidth="1.2"
          />
          <circle cx="20" cy="20" r="4" fill={theme.accent} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
}

// Faixa decorativa inspirada nos tecidos Kente
function KenteStripe() {
  return (
    <div
      className="w-full h-1.5"
      style={{
        background:
          'repeating-linear-gradient(90deg, #d97706 0px, #d97706 24px, #059669 24px, #059669 48px, #b91c1c 48px, #b91c1c 72px, #f59e0b 72px, #f59e0b 96px)'
      }}
    />
  );
}

export default function App() {
  // Estado do perfil do autor com carregamento seguro do localStorage
  const [author, setAuthor] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_AUTHOR_KEY);
      return saved ? JSON.parse(saved) : DEFAULT_AUTHOR;
    } catch {
      return DEFAULT_AUTHOR;
    }
  });

  // Estado dos artigos com carregamento seguro do localStorage
  const [articles, setArticles] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_ARTICLES_KEY);
      return saved ? JSON.parse(saved) : DEFAULT_ARTICLES;
    } catch {
      return DEFAULT_ARTICLES;
    }
  });

  // Estado dos artigos curtidos/aplaudidos pelo usuário
  const [applaudedIds, setApplaudedIds] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_APPLAUSE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Estados de filtro, busca e modais
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [readingArticleId, setReadingArticleId] = useState(null);
  const [readProgress, setReadProgress] = useState(0);
  const [isAuthorModalOpen, setIsAuthorModalOpen] = useState(false);
  const [isEditorModalOpen, setIsEditorModalOpen] = useState(false);
  const [editingArticleId, setEditingArticleId] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  // Estados dos formulários
  const [authorForm, setAuthorForm] = useState({ name: '', role: '', bio: '' });
  const [articleForm, setArticleForm] = useState({
    title: '',
    category: 'Reflexões',
    theme: 'ouro',
    excerpt: '',
    content: ''
  });

  const readModalScrollRef = useRef(null);
  const toastTimerRef = useRef(null);

  // Persistência automática no localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_AUTHOR_KEY, JSON.stringify(author));
    } catch {
      // Ignora erro caso armazenamento esteja indisponível
    }
  }, [author]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_ARTICLES_KEY, JSON.stringify(articles));
    } catch {
      // Ignora erro caso armazenamento esteja indisponível
    }
  }, [articles]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_APPLAUSE_KEY, JSON.stringify(applaudedIds));
    } catch {
      // Ignora erro caso armazenamento esteja indisponível
    }
  }, [applaudedIds]);

  // Bloqueia rolagem do fundo quando algum modal estiver aberto
  useEffect(() => {
    const anyModalOpen =
      readingArticleId !== null || isAuthorModalOpen || isEditorModalOpen;
    document.body.style.overflow = anyModalOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [readingArticleId, isAuthorModalOpen, isEditorModalOpen]);

  // Exibe notificação flutuante suave
  const triggerToast = (msg) => {
    setToastMessage(msg);
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => {
      setToastMessage('');
    }, 3200);
  };

  // Dados derivados da assinatura do autor
  const displayAuthorName = author.name?.trim() || 'Seu Nome';
  const authorFirstName = displayAuthorName.split(' ')[0];
  const authorInitials = useMemo(() => {
    return (
      displayAuthorName
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0].toUpperCase())
        .join('') || 'SN'
    );
  }, [displayAuthorName]);

  // Filtragem de artigos por categoria e busca
  const filteredArticles = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return articles.filter((art) => {
      const matchesCategory =
        selectedCategory === 'Todos' || art.category === selectedCategory;
      const matchesQuery =
        !query ||
        art.title.toLowerCase().includes(query) ||
        art.excerpt.toLowerCase().includes(query) ||
        art.category.toLowerCase().includes(query) ||
        art.paragraphs.some((p) => p.toLowerCase().includes(query));
      return matchesCategory && matchesQuery;
    });
  }, [articles, selectedCategory, searchQuery]);

  const readingArticle = useMemo(
    () => articles.find((a) => a.id === readingArticleId) || null,
    [articles, readingArticleId]
  );

  // Handlers de interação
  const handleToggleApplause = (e, id) => {
    e.stopPropagation();
    setApplaudedIds((prev) => {
      const exists = prev.includes(id);
      if (exists) {
        return prev.filter((item) => item !== id);
      }
      triggerToast('Você aplaudiu este texto!');
      return [...prev, id];
    });
  };

  const openAuthorEditor = () => {
    setAuthorForm({
      name: author.name === 'Seu Nome' ? '' : author.name,
      role: author.role,
      bio: author.bio
    });
    setIsAuthorModalOpen(true);
  };

  const handleSaveAuthor = (e) => {
    e.preventDefault();
    const updated = {
      name: authorForm.name.trim() || 'Seu Nome',
      role: authorForm.role.trim() || 'Autor(a) & Voz Ativa',
      bio: authorForm.bio.trim() || DEFAULT_AUTHOR.bio
    };
    setAuthor(updated);
    setIsAuthorModalOpen(false);
    triggerToast(`Blog personalizado para ${updated.name}!`);
  };

  const openNewArticleEditor = () => {
    setEditingArticleId(null);
    setArticleForm({
      title: '',
      category: 'Reflexões',
      theme: 'ouro',
      excerpt: '',
      content: ''
    });
    setIsEditorModalOpen(true);
  };

  const openEditArticleEditor = (e, art) => {
    if (e) e.stopPropagation();
    setEditingArticleId(art.id);
    setArticleForm({
      title: art.title,
      category: art.category,
      theme: art.theme,
      excerpt: art.excerpt,
      content: art.paragraphs.join('\n\n')
    });
    setIsEditorModalOpen(true);
  };

  const handleSaveArticle = (e) => {
    e.preventDefault();
    const paragraphs = articleForm.content
      .split(/\n+/)
      .map((p) => p.trim())
      .filter(Boolean);

    if (!articleForm.title.trim() || paragraphs.length === 0) return;

    const wordCount = articleForm.content.trim().split(/\s+/).length;
    const readTime = `${Math.max(1, Math.ceil(wordCount / 180))} min`;

    if (editingArticleId !== null) {
      setArticles((prev) =>
        prev.map((art) =>
          art.id === editingArticleId
            ? {
                ...art,
                title: articleForm.title.trim(),
                category: articleForm.category,
                theme: articleForm.theme,
                excerpt: articleForm.excerpt.trim(),
                paragraphs,
                readTime
              }
            : art
        )
      );
      triggerToast('Texto atualizado com sucesso!');
    } else {
      const created = {
        id: Date.now(),
        title: articleForm.title.trim(),
        category: articleForm.category,
        theme: articleForm.theme,
        date: 'Hoje',
        readTime,
        applause: 1,
        excerpt: articleForm.excerpt.trim(),
        paragraphs
      };
      setArticles((prev) => [created, ...prev]);
      triggerToast('Seu novo texto foi publicado no blog!');
    }

    setIsEditorModalOpen(false);
    setEditingArticleId(null);
  };

  const handleDeleteArticle = (id) => {
    setArticles((prev) => prev.filter((art) => art.id !== id));
    setConfirmDeleteId(null);
    if (readingArticleId === id) {
      setReadingArticleId(null);
    }
    triggerToast('Texto removido do blog.');
  };

  const handleRestoreDefaults = () => {
    setArticles(DEFAULT_ARTICLES);
    setConfirmDeleteId(null);
    triggerToast('Textos iniciais restaurados!');
  };

  const handleCopyCitation = (title) => {
    const citation = `"${title}" — Texto escrito por ${displayAuthorName} no blog Vozes & Raízes (Consciência Negra).`;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(citation).catch(() => {});
    }
    triggerToast('Título e sua assinatura copiados para compartilhar!');
  };

  const handleReadModalScroll = () => {
    const el = readModalScrollRef.current;
    if (!el) return;
    const maxScroll = el.scrollHeight - el.clientHeight;
    const pct = maxScroll > 0 ? (el.scrollTop / maxScroll) * 100 : 0;
    setReadProgress(pct);
  };

  const openArticleReader = (id) => {
    setReadProgress(0);
    setReadingArticleId(id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#120a07] via-[#1c100b] to-[#0b1913] text-amber-50 font-sans antialiased selection:bg-amber-500 selection:text-[#120a07] relative overflow-x-hidden">
      {/* Estilos globais para texturas geométricas Kente/Adinkra e animações */}
      <style>{`
        .afro-geometric-bg {
          background-image:
            radial-gradient(circle at 2px 2px, rgba(245, 158, 11, 0.14) 1px, transparent 0),
            linear-gradient(45deg, rgba(217, 119, 6, 0.045) 25%, transparent 25%, transparent 75%, rgba(217, 119, 6, 0.045) 75%),
            linear-gradient(-45deg, rgba(5, 150, 105, 0.045) 25%, transparent 25%, transparent 75%, rgba(5, 150, 105, 0.045) 75%);
          background-size: 32px 32px, 64px 64px, 64px 64px;
        }
        @keyframes pulseGlow {
          0%, 100% { transform: scale(1) translate(0, 0); opacity: 0.25; }
          50% { transform: scale(1.12) translate(16px, -18px); opacity: 0.4; }
        }
        .animate-glow-slow {
          animation: pulseGlow 9s ease-in-out infinite;
        }
        .animate-glow-delayed {
          animation: pulseGlow 11s ease-in-out 3s infinite;
        }
      `}</style>

      {/* Camada de Fundo Atmosférico com Padrão Geométrico e Luzes Difusas */}
      <div aria-hidden="true" className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute inset-0 afro-geometric-bg opacity-90" />
        <div className="absolute -top-32 -left-24 w-[30rem] h-[30rem] bg-amber-600/25 rounded-full blur-[120px] animate-glow-slow" />
        <div className="absolute top-1/3 -right-24 w-[28rem] h-[28rem] bg-red-800/25 rounded-full blur-[120px] animate-glow-delayed" />
        <div className="absolute -bottom-32 left-1/4 w-[32rem] h-[32rem] bg-emerald-800/25 rounded-full blur-[130px] animate-glow-slow" />
      </div>

      {/* Conteúdo Principal acima do fundo */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Faixa Geométrica Kente Superior */}
        <KenteStripe />

        {/* Barra Superior do Espaço Autoral */}
        <div className="bg-[#1c100b]/90 border-b border-amber-500/25 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-300 font-semibold text-xs">
                <Feather className="w-3.5 h-3.5" />
                <span>Espaço Autoral</span>
              </span>
              <span className="text-amber-100/80">
                Escrito por:{' '}
                <strong className="text-amber-300 font-semibold">{displayAuthorName}</strong>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={openAuthorEditor}
                className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-amber-500/20 border border-amber-500/30 text-amber-200 hover:text-white text-xs font-medium transition-all flex items-center gap-1.5"
              >
                <UserPen className="w-3.5 h-3.5 text-amber-400" />
                <span>Personalizar Meu Nome & Bio</span>
              </button>
              <button
                type="button"
                onClick={openNewArticleEditor}
                className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-[#120a07] font-bold text-xs shadow-md shadow-amber-600/25 transition-all flex items-center gap-1.5"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Escrever Artigo</span>
              </button>
            </div>
          </div>
        </div>

        {/* Cabeçalho Glassmorphism com Borda Dourada */}
        <header className="sticky top-0 z-30 backdrop-blur-xl bg-[#120a07]/85 border-b border-amber-500/20 shadow-xl shadow-black/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              {/* Logo e Título */}
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('Todos');
                  setSearchQuery('');
                }}
                className="flex items-center gap-3.5 group text-left"
              >
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-400 via-amber-600 to-red-800 p-[1.5px] shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform duration-300">
                  <div className="w-full h-full rounded-[14.5px] bg-[#120a07] flex items-center justify-center text-amber-400">
                    <Sun className="w-6 h-6 group-hover:rotate-45 transition-transform duration-500" />
                  </div>
                </div>
                <div>
                  <span className="font-serif font-extrabold text-xl sm:text-2xl tracking-tight bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100 bg-clip-text text-transparent block">
                    Vozes & Raízes
                  </span>
                  <span className="block text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-400 -mt-0.5">
                    Consciência Negra • Por {authorFirstName}
                  </span>
                </div>
              </button>

              {/* Navegação por Categorias (Desktop) */}
              <nav className="hidden lg:flex items-center gap-1.5 bg-white/[0.04] p-1.5 rounded-2xl border border-amber-500/20">
                {CATEGORIES.map((cat) => {
                  const active = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-4 py-2 rounded-xl text-sm transition-all duration-300 ${
                        active
                          ? 'bg-amber-500 text-[#120a07] font-bold shadow-sm'
                          : 'font-medium text-amber-100/75 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </nav>

              {/* Barra de Busca Desktop & Botão Mobile */}
              <div className="flex items-center gap-3">
                <div className="relative hidden sm:block">
                  <Search className="w-4 h-4 text-amber-400/75 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar nos textos..."
                    className="pl-10 pr-4 py-2 w-44 xl:w-56 rounded-2xl bg-white/[0.06] border border-amber-500/25 text-sm text-amber-50 placeholder:text-amber-200/40 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition-all"
                  />
                </div>

                <button
                  type="button"
                  onClick={openNewArticleEditor}
                  className="lg:hidden px-3.5 py-2 rounded-xl bg-amber-500 text-[#120a07] font-bold text-xs shadow-md flex items-center gap-1.5"
                >
                  <PenTool className="w-3.5 h-3.5" />
                  <span>Escrever</span>
                </button>
              </div>
            </div>

            {/* Navegação Horizontal Mobile */}
            <div className="flex lg:hidden items-center gap-2 overflow-x-auto pb-3 pt-1">
              {CATEGORIES.map((cat) => {
                const active = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`shrink-0 px-3.5 py-1.5 rounded-xl text-xs transition-all ${
                      active
                        ? 'bg-amber-500 text-[#120a07] font-bold'
                        : 'bg-white/5 text-amber-100/80 border border-amber-500/20 font-medium'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
        </header>

        {/* Área Principal */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 flex-1 w-full">
          {/* Banner Manifesto & Assinatura Editável */}
          <section className="mb-14">
            <div className="relative rounded-3xl p-[1.5px] bg-gradient-to-r from-amber-500/70 via-amber-700/40 to-emerald-600/70 shadow-2xl shadow-black/60">
              <div className="bg-[#1c100b]/90 backdrop-blur-xl rounded-[22.5px] p-6 sm:p-10 lg:p-12 relative overflow-hidden">
                {/* Círculos geométricos decorativos */}
                <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full border border-amber-500/15 pointer-events-none" />
                <div className="absolute -right-8 -top-8 w-48 h-48 rounded-full border border-amber-500/25 pointer-events-none" />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
                  <div className="lg:col-span-8">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/35 text-emerald-300 text-xs font-semibold tracking-wide uppercase mb-4">
                      <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                      <span>20 de Novembro • Consciência, Memória e Futuro</span>
                    </div>

                    <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-amber-50 leading-tight mb-4">
                      Honrar quem abriu caminhos, escrever o nosso próprio amanhã.
                    </h1>

                    <p className="text-amber-100/80 text-base sm:text-lg leading-relaxed max-w-2xl mb-6">
                      {author.bio}
                    </p>

                    <div className="flex flex-wrap items-center gap-4">
                      <button
                        type="button"
                        onClick={openNewArticleEditor}
                        className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-[#120a07] font-bold text-sm shadow-lg shadow-amber-600/30 hover:-translate-y-0.5 transition-all flex items-center gap-2"
                      >
                        <PenTool className="w-4 h-4" />
                        <span>Escrever Novo Texto</span>
                      </button>
                      <button
                        type="button"
                        onClick={openAuthorEditor}
                        className="px-5 py-3 rounded-2xl bg-white/[0.06] hover:bg-white/[0.12] border border-amber-500/35 text-amber-200 text-sm font-medium transition-all flex items-center gap-2"
                      >
                        <Edit3 className="w-4 h-4 text-amber-400" />
                        <span>Editar Minha Assinatura</span>
                      </button>
                    </div>
                  </div>

                  {/* Cartão da Assinatura do Autor */}
                  <div className="lg:col-span-4">
                    <div className="rounded-2xl bg-[#120a07]/85 border border-amber-500/35 p-6 shadow-inner">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 via-amber-600 to-red-800 flex items-center justify-center text-[#120a07] font-serif font-extrabold text-xl shadow-md shrink-0">
                          {authorInitials}
                        </div>
                        <div className="min-w-0">
                          <span className="text-[11px] uppercase tracking-widest text-amber-400 font-semibold block">
                            Autoria do Blog
                          </span>
                          <h2 className="font-serif text-xl font-bold text-white leading-snug truncate">
                            {displayAuthorName}
                          </h2>
                          <p className="text-xs text-amber-200/70 truncate">{author.role}</p>
                        </div>
                      </div>
                      <div className="pt-4 border-t border-amber-500/20 flex items-center justify-between text-xs text-amber-200/75">
                        <span className="flex items-center gap-1.5">
                          <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                          <span>
                            {articles.length}{' '}
                            {articles.length === 1 ? 'texto publicado' : 'textos publicados'}
                          </span>
                        </span>
                        <button
                          type="button"
                          onClick={openAuthorEditor}
                          className="text-amber-400 hover:text-amber-300 underline underline-offset-4 font-semibold"
                        >
                          Alterar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Cabeçalho da Lista de Artigos e Busca Mobile */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-amber-50 flex items-center gap-3">
                <span>Meus Textos & Reflexões</span>
                <span className="text-xs font-sans font-semibold px-3 py-1 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/35">
                  {filteredArticles.length}{' '}
                  {filteredArticles.length === 1 ? 'artigo' : 'artigos'}
                </span>
              </h2>
              <p className="text-sm text-amber-200/65 mt-1">
                Clique em qualquer artigo para ler na íntegra, curtir ou editar.
              </p>
            </div>

            {/* Campo de busca para telas pequenas */}
            <div className="relative sm:hidden">
              <Search className="w-4 h-4 text-amber-400/75 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar nos textos..."
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white/[0.06] border border-amber-500/25 text-sm text-amber-50 placeholder:text-amber-200/40 focus:outline-none focus:ring-2 focus:ring-amber-400/50"
              />
            </div>
          </div>

          {/* Grade de Artigos */}
          {filteredArticles.length > 0 ? (
            <section className="grid grid-cols-1 md:grid-cols-2 gap-7 mb-16">
              {filteredArticles.map((art) => {
                const theme = COVER_THEMES[art.theme] || COVER_THEMES.ouro;
                const hasApplauded = applaudedIds.includes(art.id);
                const totalApplause = art.applause + (hasApplauded ? 1 : 0);

                return (
                  <article
                    key={art.id}
                    className="group rounded-3xl bg-[#1c100b]/85 backdrop-blur-md border border-amber-500/25 hover:border-amber-400/75 shadow-xl shadow-black/40 hover:shadow-2xl hover:shadow-amber-500/15 hover:-translate-y-1.5 transition-all duration-300 flex flex-col overflow-hidden"
                  >
                    {/* Capa Geométrica Afro-Brasileira */}
                    <div
                      onClick={() => openArticleReader(art.id)}
                      className={`relative h-44 bg-gradient-to-br ${theme.gradient} p-6 flex flex-col justify-between cursor-pointer overflow-hidden`}
                    >
                      <CoverGeometricArt themeKey={art.theme} uniqueId={art.id} />

                      <div className="relative z-10 flex items-center justify-between gap-2">
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#120a07]/80 text-amber-300 border border-amber-400/35 backdrop-blur-md">
                          {art.category}
                        </span>
                        <span className="text-xs font-medium text-amber-100/90 bg-black/40 px-2.5 py-1 rounded-full backdrop-blur-sm">
                          {art.date} • {art.readTime}
                        </span>
                      </div>

                      <div className="relative z-10">
                        <span className="text-[11px] uppercase tracking-widest text-amber-200/85 font-semibold">
                          {theme.label}
                        </span>
                      </div>
                    </div>

                    {/* Corpo do Card */}
                    <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                      <div>
                        <h3
                          onClick={() => openArticleReader(art.id)}
                          className="font-serif text-xl sm:text-2xl font-bold text-amber-50 group-hover:text-amber-300 leading-snug mb-3 cursor-pointer transition-colors"
                        >
                          {art.title}
                        </h3>
                        <p className="text-amber-100/75 text-sm leading-relaxed mb-6">
                          {art.excerpt}
                        </p>
                      </div>

                      {/* Rodapé com Assinatura do Usuário e Controles */}
                      <div className="pt-4 border-t border-amber-500/20 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 shrink-0">
                            <Feather className="w-3.5 h-3.5" />
                          </div>
                          <div className="truncate">
                            <p className="text-[11px] text-amber-200/60">Escrito por</p>
                            <p className="text-xs font-semibold text-amber-200 truncate">
                              {displayAuthorName}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                          <button
                            type="button"
                            onClick={(e) => handleToggleApplause(e, art.id)}
                            title="Curtir / Aplaudir texto"
                            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                              hasApplauded
                                ? 'bg-amber-500 text-[#120a07] shadow-sm'
                                : 'bg-white/5 hover:bg-amber-500/20 text-amber-300 border border-amber-500/25'
                            }`}
                          >
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>{totalApplause}</span>
                          </button>

                          <button
                            type="button"
                            onClick={(e) => openEditArticleEditor(e, art)}
                            title="Editar este texto"
                            className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/15 border border-amber-500/20 text-amber-200 flex items-center justify-center transition-colors"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </button>

                          {confirmDeleteId === art.id ? (
                            <button
                              type="button"
                              onClick={() => handleDeleteArticle(art.id)}
                              title="Confirmar exclusão"
                              className="px-2.5 h-8 rounded-xl bg-red-600 hover:bg-red-500 text-white text-[11px] font-bold flex items-center gap-1 transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Confirmar</span>
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => setConfirmDeleteId(art.id)}
                              title="Excluir este texto"
                              className="w-8 h-8 rounded-xl bg-white/5 hover:bg-red-500/20 border border-amber-500/20 hover:border-red-500/40 text-amber-200/70 hover:text-red-300 flex items-center justify-center transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}

                          <button
                            type="button"
                            onClick={() => openArticleReader(art.id)}
                            className="px-3.5 py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500 text-amber-300 hover:text-[#120a07] border border-amber-500/35 text-xs font-bold transition-all flex items-center gap-1"
                          >
                            <span>Ler</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </section>
          ) : (
            /* Estado Vazio quando a busca ou filtro não encontra textos */
            <div className="text-center py-16 px-6 rounded-3xl bg-[#1c100b]/80 border border-amber-500/25 mb-16">
              <div className="w-16 h-16 rounded-2xl bg-amber-500/15 text-amber-400 flex items-center justify-center mx-auto mb-4 border border-amber-500/30">
                <SearchX className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-xl font-bold text-amber-50 mb-2">
                Nenhum texto encontrado
              </h3>
              <p className="text-amber-200/70 text-sm max-w-md mx-auto mb-6">
                Tente buscar por outra palavra-chave ou visualize todas as categorias do seu blog.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('Todos');
                  setSearchQuery('');
                }}
                className="px-5 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-[#120a07] text-sm font-bold transition-all"
              >
                Mostrar todos os textos
              </button>
            </div>
          )}

          {/* Seção Provérbio Sankofa */}
          <section className="rounded-3xl p-[1px] bg-gradient-to-r from-emerald-600/60 via-amber-500/60 to-red-700/60 shadow-xl">
            <div className="bg-[#120a07]/90 backdrop-blur-xl rounded-[23px] px-6 py-10 sm:px-12 text-center relative overflow-hidden">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-amber-400 mb-3">
                <Quote className="w-4 h-4" />
                <span>Filosofia Sankofa</span>
              </div>
              <blockquote className="font-serif italic text-xl sm:text-2xl lg:text-3xl text-amber-50 max-w-3xl mx-auto leading-relaxed mb-4">
                “Nunca é tarde para voltar e apanhar aquilo que ficou para trás.”
              </blockquote>
              <p className="text-sm text-amber-200/70">
                Símbolo tradicional Adinkra • Resgatar nossas raízes para construir o futuro.
              </p>
            </div>
          </section>
        </main>

        {/* Rodapé */}
        <footer className="border-t border-amber-500/20 bg-[#120a07]/95 mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-amber-200/70">
            <div className="flex items-center gap-2.5 flex-wrap justify-center">
              <Sun className="w-4 h-4 text-amber-400" />
              <span className="font-serif font-bold text-amber-100">Vozes & Raízes</span>
              <span>•</span>
              <span>
                Escrito por <strong className="text-amber-300">{displayAuthorName}</strong>
              </span>
            </div>

            <div className="flex items-center gap-4 flex-wrap justify-center">
              <button
                type="button"
                onClick={openAuthorEditor}
                className="hover:text-amber-300 transition-colors"
              >
                Editar Autor
              </button>
              <button
                type="button"
                onClick={openNewArticleEditor}
                className="hover:text-amber-300 transition-colors"
              >
                Novo Texto
              </button>
              <button
                type="button"
                onClick={handleRestoreDefaults}
                className="text-xs text-amber-200/45 hover:text-amber-300 transition-colors flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Restaurar textos iniciais</span>
              </button>
            </div>
          </div>
          <KenteStripe />
        </footer>
      </div>

      {/* MODAL 1: Leitura Completa do Artigo */}
      {readingArticle && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) setReadingArticleId(null);
          }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md"
        >
          <div
            ref={readModalScrollRef}
            onScroll={handleReadModalScroll}
            className="bg-[#1c100b] border border-amber-500/40 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative"
          >
            {/* Barra de Progresso de Leitura */}
            <div
              className="sticky top-0 left-0 h-1 bg-gradient-to-r from-amber-400 via-amber-500 to-emerald-500 z-30 transition-all duration-150"
              style={{ width: `${readProgress}%` }}
            />

            <button
              type="button"
              onClick={() => setReadingArticleId(null)}
              aria-label="Fechar leitura"
              className="sticky top-4 float-right mr-4 mt-4 z-20 w-10 h-10 rounded-full bg-[#120a07]/90 border border-amber-500/45 text-amber-100 hover:bg-amber-500 hover:text-[#120a07] flex items-center justify-center shadow-lg transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Cabeçalho da Leitura */}
            {(() => {
              const theme = COVER_THEMES[readingArticle.theme] || COVER_THEMES.ouro;
              const hasApplauded = applaudedIds.includes(readingArticle.id);
              const totalApplause =
                readingArticle.applause + (hasApplauded ? 1 : 0);

              return (
                <>
                  <div
                    className={`relative bg-gradient-to-br ${theme.gradient} p-7 sm:p-10 overflow-hidden`}
                  >
                    <CoverGeometricArt
                      themeKey={readingArticle.theme}
                      uniqueId={`modal-${readingArticle.id}`}
                    />
                    <div className="relative z-10">
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-[#120a07]/85 text-amber-300 border border-amber-400/35 mb-4">
                        {readingArticle.category}
                      </span>
                      <h2 className="font-serif text-2xl sm:text-4xl font-extrabold text-white leading-tight mb-4">
                        {readingArticle.title}
                      </h2>
                      <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-amber-100/90">
                        <span className="font-semibold text-amber-300 flex items-center gap-1.5">
                          <Feather className="w-4 h-4" />
                          <span>Escrito por {displayAuthorName}</span>
                        </span>
                        <span>•</span>
                        <span>{readingArticle.date}</span>
                        <span>•</span>
                        <span>{readingArticle.readTime} de leitura</span>
                      </div>
                    </div>
                  </div>

                  {/* Corpo do Texto */}
                  <div className="p-6 sm:p-10">
                    <p className="text-lg font-serif italic text-amber-200/95 border-l-4 border-amber-500 pl-4 mb-8 leading-relaxed">
                      {readingArticle.excerpt}
                    </p>

                    <div className="space-y-5 text-amber-50/90 text-base sm:text-lg leading-relaxed">
                      {readingArticle.paragraphs.map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                      ))}
                    </div>

                    {/* Rodapé do Modal de Leitura */}
                    <div className="mt-10 pt-6 border-t border-amber-500/25 flex flex-wrap items-center justify-between gap-4">
                      <div>
                        <p className="text-xs text-amber-200/60">
                          Texto autoral publicado por
                        </p>
                        <p className="font-serif font-bold text-amber-300 text-lg">
                          {displayAuthorName}
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center gap-2.5">
                        <button
                          type="button"
                          onClick={(e) => handleToggleApplause(e, readingArticle.id)}
                          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                            hasApplauded
                              ? 'bg-amber-500 text-[#120a07]'
                              : 'bg-white/5 hover:bg-amber-500/20 border border-amber-500/35 text-amber-300'
                          }`}
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Aplaudir ({totalApplause})</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            const target = readingArticle;
                            setReadingArticleId(null);
                            openEditArticleEditor(null, target);
                          }}
                          className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-amber-500/30 text-amber-100 text-xs font-semibold flex items-center gap-1.5"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                          <span>Editar Texto</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleCopyCitation(readingArticle.title)}
                          className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-[#120a07] text-xs font-bold flex items-center gap-1.5"
                        >
                          <Share2 className="w-3.5 h-3.5" />
                          <span>Copiar Citação</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}

      {/* MODAL 2: Personalizar Identidade do Autor */}
      {isAuthorModalOpen && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsAuthorModalOpen(false);
          }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
        >
          <div className="bg-[#1c100b] border border-amber-500/40 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/35 flex items-center justify-center text-amber-400">
                  <UserPen className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-amber-50">
                    Sua Assinatura no Blog
                  </h3>
                  <p className="text-xs text-amber-200/70">
                    Personalize como seu nome aparece em todos os textos
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsAuthorModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-amber-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveAuthor} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-amber-300 mb-1.5">
                  Seu Nome Completo ou Assinatura
                </label>
                <input
                  type="text"
                  required
                  value={authorForm.name}
                  onChange={(e) =>
                    setAuthorForm((prev) => ({ ...prev, name: e.target.value }))
                  }
                  placeholder="Ex: Mariana Silva ou João Pedro"
                  className="w-full px-4 py-3 rounded-2xl bg-[#120a07] border border-amber-500/35 text-amber-50 placeholder:text-amber-200/30 focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-amber-300 mb-1.5">
                  Seu Título / Ocupação
                </label>
                <input
                  type="text"
                  value={authorForm.role}
                  onChange={(e) =>
                    setAuthorForm((prev) => ({ ...prev, role: e.target.value }))
                  }
                  placeholder="Ex: Estudante, Escritor(a), Educador(a)..."
                  className="w-full px-4 py-3 rounded-2xl bg-[#120a07] border border-amber-500/35 text-amber-50 placeholder:text-amber-200/30 focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-amber-300 mb-1.5">
                  Apresentação do Seu Blog
                </label>
                <textarea
                  rows={3}
                  value={authorForm.bio}
                  onChange={(e) =>
                    setAuthorForm((prev) => ({ ...prev, bio: e.target.value }))
                  }
                  placeholder="Escreva uma breve apresentação sobre você e o propósito deste blog..."
                  className="w-full px-4 py-3 rounded-2xl bg-[#120a07] border border-amber-500/35 text-amber-50 placeholder:text-amber-200/30 focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAuthorModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-amber-200 text-sm font-medium transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-[#120a07] text-sm font-bold shadow-lg shadow-amber-600/25 transition-all"
                >
                  Salvar Minha Assinatura
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: Escrever ou Editar Artigo */}
      {isEditorModalOpen && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsEditorModalOpen(false);
          }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
        >
          <div className="bg-[#1c100b] border border-amber-500/40 rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-900/50 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                  <PenTool className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-amber-50">
                    {editingArticleId !== null
                      ? 'Editar Meu Texto'
                      : 'Escrever Novo Texto'}
                  </h3>
                  <p className="text-xs text-amber-200/70">
                    Será publicado imediatamente com a assinatura de {displayAuthorName}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsEditorModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-amber-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveArticle} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-amber-300 mb-1.5">
                  Título do Texto
                </label>
                <input
                  type="text"
                  required
                  value={articleForm.title}
                  onChange={(e) =>
                    setArticleForm((prev) => ({ ...prev, title: e.target.value }))
                  }
                  placeholder="Ex: O que o 20 de Novembro significa para mim"
                  className="w-full px-4 py-3 rounded-2xl bg-[#120a07] border border-amber-500/35 text-amber-50 placeholder:text-amber-200/30 focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-amber-300 mb-1.5">
                    Categoria
                  </label>
                  <select
                    value={articleForm.category}
                    onChange={(e) =>
                      setArticleForm((prev) => ({
                        ...prev,
                        category: e.target.value
                      }))
                    }
                    className="w-full px-4 py-3 rounded-2xl bg-[#120a07] border border-amber-500/35 text-amber-50 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  >
                    <option value="Reflexões">Reflexões</option>
                    <option value="História & Memória">História & Memória</option>
                    <option value="Cultura & Arte">Cultura & Arte</option>
                    <option value="Atualidade">Atualidade</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-amber-300 mb-1.5">
                    Tema Visual da Capa
                  </label>
                  <select
                    value={articleForm.theme}
                    onChange={(e) =>
                      setArticleForm((prev) => ({ ...prev, theme: e.target.value }))
                    }
                    className="w-full px-4 py-3 rounded-2xl bg-[#120a07] border border-amber-500/35 text-amber-50 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  >
                    <option value="ouro">Ouro & Ancestralidade</option>
                    <option value="esmeralda">Verde Esmeralda & Quilombo</option>
                    <option value="terracota">Terracota & Raízes</option>
                    <option value="kente">Cores Kente & Arte</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-amber-300 mb-1.5">
                  Resumo / Chamada Inicial
                </label>
                <input
                  type="text"
                  required
                  value={articleForm.excerpt}
                  onChange={(e) =>
                    setArticleForm((prev) => ({ ...prev, excerpt: e.target.value }))
                  }
                  placeholder="Uma frase marcante que resume a ideia principal do seu texto..."
                  className="w-full px-4 py-3 rounded-2xl bg-[#120a07] border border-amber-500/35 text-amber-50 placeholder:text-amber-200/30 focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-amber-300 mb-1.5">
                  Seu Texto Completo
                </label>
                <textarea
                  rows={7}
                  required
                  value={articleForm.content}
                  onChange={(e) =>
                    setArticleForm((prev) => ({ ...prev, content: e.target.value }))
                  }
                  placeholder="Escreva aqui suas ideias, vivências, poemas ou reflexões sobre a Consciência Negra. Separe os parágrafos pulando uma linha..."
                  className="w-full px-4 py-3 rounded-2xl bg-[#120a07] border border-amber-500/35 text-amber-50 placeholder:text-amber-200/30 focus:outline-none focus:ring-2 focus:ring-amber-400 leading-relaxed"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditorModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-amber-200 text-sm font-medium transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-[#120a07] text-sm font-bold shadow-lg shadow-amber-600/25 transition-all flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>
                    {editingArticleId !== null
                      ? 'Salvar Alterações'
                      : 'Publicar no Meu Blog'}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Notificação Flutuante (Toast) */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 transition-all duration-300">
          <div className="px-5 py-3.5 rounded-2xl bg-[#120a07] border border-amber-500/45 text-amber-50 text-sm font-medium shadow-2xl flex items-center gap-3">
            <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
}
```