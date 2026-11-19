
import React, { useState } from "react";
import {
  Home, Search, Compass, Film, MessageCircle, Heart,
  PlusSquare, Menu, Instagram, Send, Bookmark, MoreHorizontal,
  Smile, User, Clapperboard
} from "lucide-react";

const stories = [
  { name: "Seu story", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100" },
  { name: "mariana", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100" },
  { name: "pedro.jpg", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100" },
  { name: "ana_clara", img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100" },
  { name: "lucas", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100" },
  { name: "beatriz", img: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100" },
];

const initialPosts = [
  {
    id: 1,
    user: "mariana",
    avatar: stories[1].img,
    location: "São Paulo, Brasil",
    image: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800",
    likes: 1248,
    caption: "Um dia de cada vez, aproveitando cada momento ✨",
    comments: ["Que foto linda!", "Perfeito 🌸"],
  },
  {
    id: 2,
    user: "pedro.jpg",
    avatar: stories[2].img,
    location: "Rio de Janeiro",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
    likes: 892,
    caption: "Dias de sol, mar e tranquilidade 🌊",
    comments: ["Que lugar incrível!"],
  },
  {
    id: 3,
    user: "ana_clara",
    avatar: stories[3].img,
    location: "Piauí, Brasil",
    image: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=800",
    likes: 2031,
    caption: "Pequenas coisas, grandes memórias ☀️",
    comments: ["Amei! ❤️"],
  },
];

function App() {
  const [posts, setPosts] = useState(initialPosts);
  const [liked, setLiked] = useState({});
  const [saved, setSaved] = useState({});
  const [comment, setComment] = useState({});
  const [active, setActive] = useState("Início");

  const toggleLike = (id) => {
    setLiked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const addComment = (id) => {
    if (!comment[id]?.trim()) return;
    setPosts((prev) =>
      prev.map((post) =>
        post.id === id
          ? { ...post, comments: [...post.comments, comment[id]] }
          : post
      )
    );
    setComment((prev) => ({ ...prev, [id]: "" }));
  };

  const menuItems = [
    { label: "Início", icon: Home },
    { label: "Pesquisa", icon: Search },
    { label: "Explorar", icon: Compass },
    { label: "Reels", icon: Film },
    { label: "Mensagens", icon: MessageCircle },
    { label: "Notificações", icon: Heart },
    { label: "Criar", icon: PlusSquare },
    { label: "Perfil", icon: User },
  ];

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 hidden h-screen w-[245px] border-r border-gray-200 bg-white px-5 py-8 lg:block">
        <div className="mb-10 flex items-center gap-2 px-2">
          <Instagram size={28} />
          <span className="text-2xl font-bold tracking-tight">Instagram</span>
        </div>

        <nav className="space-y-2">
          {menuItems.map(({ label, icon: Icon }) => (
            <button
              key={label}
              onClick={() => setActive(label)}
              className={`flex w-full items-center gap-4 rounded-lg px-3 py-3 text-[15px] transition hover:bg-gray-100 ${
                active === label ? "font-bold" : ""
              }`}
            >
              <Icon size={24} strokeWidth={active === label ? 2.5 : 1.8} />
              {label}
            </button>
          ))}
        </nav>

        <button className="absolute bottom-8 flex items-center gap-4 px-3 py-3 hover:bg-gray-100 rounded-lg w-[85%]">
          <Menu size={24} /> Mais
        </button>
      </aside>

      {/* Main content */}
      <main className="mx-auto flex max-w-[1100px] justify-center gap-12 px-4 pb-20 pt-8 lg:ml-[245px]">
        <section className="w-full max-w-[470px]">
          {/* Stories */}
          <div className="mb-8 flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {stories.map((story, i) => (
              <button key={i} className="flex min-w-[66px] flex-col items-center gap-1">
                <div className={`rounded-full p-[3px] ${i === 0 ? "bg-gray-300" : "bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600"}`}>
                  <div className="rounded-full border-2 border-white p-[2px]">
                    <img
                      src={story.img}
                      alt={story.name}
                      className="h-14 w-14 rounded-full object-cover"
                    />
                  </div>
                </div>
                <span className="max-w-[70px] truncate text-xs">{story.name}</span>
              </button>
            ))}
          </div>

          {/* Posts */}
          {posts.map((post) => (
            <article key={post.id} className="mb-8 border-b border-gray-200 pb-5">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={post.avatar} className="h-9 w-9 rounded-full object-cover" />
                  <div>
                    <p className="text-sm font-semibold">{post.user}</p>
                    <p className="text-xs text-gray-500">{post.location}</p>
                  </div>
                </div>
                <button className="p-1"><MoreHorizontal size={22} /></button>
              </div>

              <img
                src={post.image}
                alt="Publicação"
                className="w-full rounded-sm object-cover"
              />

              {/* Actions */}
              <div className="mt-3 flex items-center justify-between">
                <div className="flex gap-4">
                  <button onClick={() => toggleLike(post.id)}>
                    <Heart
                      size={26}
                      className={liked[post.id] ? "fill-red-500 text-red-500" : "hover:text-gray-500"}
                    />
                  </button>
                  <button><MessageCircle size={26} /></button>
                  <button><Send size={25} /></button>
                </div>
                <button onClick={() => setSaved(p => ({ ...p, [post.id]: !p[post.id] }))}>
                  <Bookmark size={25} className={saved[post.id] ? "fill-black" : ""} />
                </button>
              </div>

              <p className="mt-2 text-sm font-semibold">
                {(post.likes + (liked[post.id] ? 1 : 0)).toLocaleString("pt-BR")} curtidas
              </p>

              <p className="mt-1 text-sm">
                <span className="font-semibold">{post.user}</span>{" "}
                {post.caption}
              </p>

              <button className="mt-1 text-sm text-gray-500">
                Ver todos os {post.comments.length} comentários
              </button>

              {post.comments.slice(-2).map((c, i) => (
                <p key={i} className="mt-1 text-sm text-gray-700">{c}</p>
              ))}

              {/* Add comment */}
              <div className="mt-3 flex items-center gap-2">
                <input
                  value={comment[post.id] || ""}
                  onChange={(e) => setComment(p => ({ ...p, [post.id]: e.target.value }))}
                  onKeyDown={(e) => e.key === "Enter" && addComment(post.id)}
                  placeholder="Adicione um comentário..."
                  className="w-full bg-transparent text-sm outline-none"
                />
                {comment[post.id]?.trim() && (
                  <button onClick={() => addComment(post.id)} className="text-sm font-semibold text-blue-500">
                    Publicar
                  </button>
                )}
                <Smile size={18} className="text-gray-400" />
              </div>
            </article>
          ))}
        </section>

        {/* Suggestions */}
        <aside className="hidden w-[320px] pt-4 xl:block">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={stories[0].img} className="h-11 w-11 rounded-full object-cover" />
              <div>
                <p className="text-sm font-semibold">seu_perfil</p>
                <p className="text-xs text-gray-500">Seu perfil</p>
              </div>
            </div>
            <button className="text-xs font-semibold text-blue-500">Alternar</button>
          </div>

          <div className="mb-4 flex justify-between">
            <span className="text-sm font-semibold text-gray-500">Sugestões para você</span>
            <button className="text-xs font-semibold">Ver tudo</button>
          </div>

          {stories.slice(1).map((user, i) => (
            <div key={i} className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img src={user.img} className="h-9 w-9 rounded-full object-cover" />
                <div>
                  <p className="text-sm font-semibold">{user.name}</p>
                  <p className="text-xs text-gray-500">Sugestão para você</p>
                </div>
              </div>
              <button className="text-xs font-semibold text-blue-500">Seguir</button>
            </div>
          ))}

          <div className="mt-8 text-xs text-gray-400 leading-6">
            Sobre · Ajuda · Imprensa · API · Carreiras · Privacidade ·
            Termos · Localizações · Idioma
            <p className="mt-4">© 2026 INSTAGRAM CLONE</p>
          </div>
        </aside>
      </main>

      {/* Mobile navigation */}
      <nav className="fixed bottom-0 flex w-full justify-around border-t border-gray-200 bg-white py-3 lg:hidden">
        <Home size={24} />
        <Search size={24} />
        <PlusSquare size={24} />
        <Clapperboard size={24} />
        <img src={stories[0].img} className="h-6 w-6 rounded-full object-cover" />
      </nav>
    </div>
  );
}

export default App;
