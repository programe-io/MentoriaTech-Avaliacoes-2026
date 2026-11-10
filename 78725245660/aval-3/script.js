
export const currentUser = {
  username: "seu_perfil",
  name: "Seu Nome",
  avatar: "https://i.pravatar.cc/150?img=12"
};

export const stories = [
  { id: 1, username: "ana_silva", avatar: "https://i.pravatar.cc/150?img=47" },
  { id: 2, username: "pedro.jpg", avatar: "https://i.pravatar.cc/150?img=11" },
  { id: 3, username: "mariana", avatar: "https://i.pravatar.cc/150?img=44" },
  { id: 4, username: "lucas", avatar: "https://i.pravatar.cc/150?img=13" },
  { id: 5, username: "juliana", avatar: "https://i.pravatar.cc/150?img=49" },
  { id: 6, username: "gabriel", avatar: "https://i.pravatar.cc/150?img=15" },
  { id: 7, username: "carol", avatar: "https://i.pravatar.cc/150?img=45" }
];

export const posts = [
  {
    id: 1,
    username: "ana_silva",
    avatar: "https://i.pravatar.cc/150?img=47",
    location: "Rio de Janeiro, Brasil",
    image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=900",
    likes: 1284,
    caption: "Dias incríveis merecem registros especiais! ☀️🌊",
    comments: [
      { username: "pedro.jpg", text: "Que lugar maravilhoso!" },
      { username: "mariana", text: "Perfeito! ❤️" }
    ],
    time: "2 HORAS ATRÁS"
  },
  {
    id: 2,
    username: "pedro.jpg",
    avatar: "https://i.pravatar.cc/150?img=11",
    location: "São Paulo, Brasil",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=900",
    likes: 856,
    caption: "Explorando novos lugares. 🌎",
    comments: [
      { username: "ana_silva", text: "Incrível!" }
    ],
    time: "5 HORAS ATRÁS"
  },
  {
    id: 3,
    username: "mariana",
    avatar: "https://i.pravatar.cc/150?img=44",
    location: "Natureza",
    image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=900",
    likes: 2340,
    caption: "Um pouco de paz em meio à correria. 🌿",
    comments: [],
    time: "1 DIA ATRÁS"
  }
];

export const suggestions = [
  { id: 1, username: "bruna.oficial", name: "Bruna Oliveira", avatar: "https://i.pravatar.cc/150?img=48" },
  { id: 2, username: "dev.mateus", name: "Mateus Ferreira", avatar: "https://i.pravatar.cc/150?img=14" },
  { id: 3, username: "carol_fashion", name: "Carolina Souza", avatar: "https://i.pravatar.cc/150?img=45" },
  { id: 4, username: "travel.world", name: "Travel World", avatar: "https://i.pravatar.cc/150?img=52" },
  { id: 5, username: "fitness.life", name: "Fitness Life", avatar: "https://i.pravatar.cc/150?img=56" }
];
