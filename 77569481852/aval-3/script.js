// ==========================================
// 1. DADOS DOS BOTS E ESTADO INICIAL
// ==========================================
const CURRENT_USER = {
  username: 'voce.dev',
    name: 'Estudante de Web',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop'
      };

      const BOTS = [
        {
            id: 'bot_ana',
                username: 'ana.fotografia',
                    name: 'Ana Clara • Fotógrafa',
                        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop',
                            bio: 'Capturando luz natural e café ☕📸',
                                following: true,
                                    storyImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop',
                                        storyCaption: 'Fim de tarde perfeito na praia! 🌅',
                                            storySeen: false,
                                                commentsPool: [
                                                      'A iluminação dessa foto ficou absurda! 🔥',
                                                            'Que enquadramento lindo, parabéns!',
                                                                  'Simplesmente impecável 👏✨'
                                                                      ],
                                                                          dmReplies: [
                                                                                'Oi! Acabei de ver sua mensagem aqui, tudo certo por aí? 📸',
                                                                                      'Adorei seu último post no feed! Qual câmera/celular você usou?',
                                                                                            'Haha com certeza! Depois me manda mais fotos desse projeto.'
                                                                                                ]
                                                                                                  },
                                                                                                    {
                                                                                                        id: 'bot_lucas',
                                                                                                            username: 'lucas.tech',
                                                                                                                name: 'Lucas Mendes • Dev',
                                                                                                                    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop',
                                                                                                                        bio: 'JavaScript, Café e Setup Minimalista 💻',
                                                                                                                            following: true,
                                                                                                                                storyImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&auto=format&fit=crop',
                                                                                                                                    storyCaption: 'Mais uma madrugada codando o novo sistema 🚀',
                                                                                                                                        storySeen: false,
                                                                                                                                            commentsPool: [
                                                                                                                                                  'Ficou muito clean esse resultado! 💻🚀',
                                                                                                                                                        'Mandou bem demais nesse post!',
                                                                                                                                                              'Top demais, já deixei meu like aqui 👍'
                                                                                                                                                                  ],
                                                                                                                                                                      dmReplies: [
                                                                                                                                                                            'Fala dev! Vi que você está online. Como tá o projeto?',
                                                                                                                                                                                  'Esse clone do Instagram ficou muito fluido hein! 👀🔥',
                                                                                                                                                                                        'Se precisar testar alguma funcionalidade, só chamar!'
                                                                                                                                                                                            ]
                                                                                                                                                                                              },
                                                                                                                                                                                                {
                                                                                                                                                                                                    id: 'bot_marina',
                                                                                                                                                                                                        username: 'marina.viagens',
                                                                                                                                                                                                            name: 'Marina Costa • Travel',
                                                                                                                                                                                                                avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop',
                                                                                                                                                                                                                    bio: 'Explorando o mundo uma mochila por vez ✈️🌍',
                                                                                                                                                                                                                        following: false,
                                                                                                                                                                                                                            storyImage: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&auto=format&fit=crop',
                                                                                                                                                                                                                                storyCaption: 'Próxima parada: montanhas! 🏔️',
                                                                                                                                                                                                                                    storySeen: false,
                                                                                                                                                                                                                                        commentsPool: [
                                                                                                                                                                                                                                              'Já quero ir pra um lugar assim!! 😍✈️',
                                                                                                                                                                                                                                                    'Que vibe incrível essa imagem!',
                                                                                                                                                                                                                                                          'Sensacional! 🌍❤️'
                                                                                                                                                                                                                                                              ],
                                                                                                                                                                                                                                                                  dmReplies: [
                                                                                                                                                                                                                                                                        'Oii! Acabei de pousar e vi sua mensagem ✈️',
                                                                                                                                                                                                                                                                              'Nossa, super recomendo esse roteiro!',
                                                                                                                                                                                                                                                                                    'Obrigada por acompanhar minhas viagens por aqui ❤️'
                                                                                                                                                                                                                                                                                        ]
                                                                                                                                                                                                                                                                                          },
                                                                                                                                                                                                                                                                                            {
                                                                                                                                                                                                                                                                                                id: 'bot_chef',
                                                                                                                                                                                                                                                                                                    username: 'chef.rafael',
                                                                                                                                                                                                                                                                                                        name: 'Rafael Gourmet',
                                                                                                                                                                                                                                                                                                            avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop',
                                                                                                                                                                                                                                                                                                                bio: 'Receitas práticas e gastronomia artesanal 🍝',
                                                                                                                                                                                                                                                                                                                    following: true,
                                                                                                                                                                                                                                                                                                                        storyImage: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&auto=format&fit=crop',
                                                                                                                                                                                                                                                                                                                            storyCaption: 'Saindo do forno agora! 🍕🔥',
                                                                                                                                                                                                                                                                                                                                storySeen: false,
                                                                                                                                                                                                                                                                                                                                    commentsPool: [
                                                                                                                                                                                                                                                                                                                                          'Deu até fome olhando isso agora 😋🔥',
                                                                                                                                                                                                                                                                                                                                                'Nota
                                                                                                                                                                                                                                                                                                                                                