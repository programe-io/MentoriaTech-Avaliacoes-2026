let currentUser = {
        username: 'Sherek',
        name: 'Sherek da silva',
        avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuLnZ4kYY35ebhRmdVWpab8K2YY3IrbI7jeVHRCCK2FMod0rBix7QIZ-s&s=10'
  
    };
   
    let posts = [
        {
            id: 1,
            username: 'world_record_egg',
            userAvatar:'https://s2-g1.glbimg.com/bqk7R56DO_Cc5-wCWDkGbIZoF48=/0x0:584x584/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2019/Y/T/ZIdmDrSXu1WbWMqvyZIw/egg.jpg',
            image: 'https://s2-g1.glbimg.com/bqk7R56DO_Cc5-wCWDkGbIZoF48=/0x0:584x584/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2019/Y/T/ZIdmDrSXu1WbWMqvyZIw/egg.jpg',
            likes: 56123450,
            isLiked: false,
            caption: 'Let’s set a world record together and get the most-liked post on Instagram, beating the current world record held by Kylie Jenner (18 million)! We can do it.',
            timeAgo: '4 de janeiro de 2019'
        },
        {
            id: 2,
            username: 'Messi_taça',
            userAvatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRE2nDnV7-Du9oLCrAa6NZZQpwtsPrkyUrHXj6ZOxYIrCaArgoKiUUzWfgF&s=10',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRE2nDnV7-Du9oLCrAa6NZZQpwtsPrkyUrHXj6ZOxYIrCaArgoKiUUzWfgF&s=10',
            likes: 12450,
            isLiked: false,
            caption: '¡Ey, monos brasileños! Gracias a todos los que me animaron; y a los que no, ¡que les den por el culo!!  #natureza #pordosol',
            timeAgo: 'Há 5 horas'
        },
        {
            id: 3,
            username: 'dev_raiz',
            userAvatar: 'https://i.pinimg.com/1200x/8d/78/29/8d78290ddb68ab61bc8c862cc5d63818.jpg',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTutfz02aep8Mep3Dnrz0e1e6mViyenUaa5enppf_S2QxhVwGCCf4zgLSs&s=10',
            likes: 832,
            isLiked: true,
            caption: 'Focando no código hoje! Programação muda vidas. 💻☕ #javascript #webdev',
            timeAgo: 'Há 12 horas'
        }
    ];

   
    const networkUsers = [
        { user: 'joao.silva', img: '14' },
        { user: 'maria_dev', img: '5' },
        { user: 'carlos.arq', img: '8' },
        { user: 'ana.designer', img: '9' },
        { user: 'tech_news', img: '12' }
    ];

    
    function updateUIWithUserData() {
      
        document.getElementById('sidebar-username').innerText = currentUser.username;
        document.getElementById('sidebar-name').innerText = currentUser.name;
        document.getElementById('story-username').innerText = currentUser.username;

        
        const avatarIds = ['sidebar-avatar', 'story-avatar', 'header-avatar', 'mobile-nav-avatar', 'modal-avatar-preview'];
        avatarIds.forEach(id => {
            const imgEl = document.getElementById(id);
            if(imgEl) imgEl.src = currentUser.avatar;
        });
    }

   
    function renderFeed() {
        const container = document.getElementById('feed-container');
        container.innerHTML = '';
        posts.forEach(post => {
          
            const formattedLikes = post.likes.toLocaleString('pt-BR');
            
           
            const heartIconClass = post.isLiked ? "bx bxs-heart" : "bx bx-heart hover:text-gray-500";
            const heartColorStyle = post.isLiked ? "color: #ec4899;" : "";
            const heartAnimClass = post.isLiked ? "scale-110" : "scale-100";
            
            const postHTML = `
                <article class="bg-card border border-border rounded-lg mb-6">
                    <!-- Cabeçalho do Post -->
                    <div class="flex justify-between items-center p-3">
                        <div class="flex items-center gap-3 cursor-pointer">
                            <div class="avatar w-8 h-8 ring-1 ring-gray-200">
                                <img src="${post.userAvatar}" alt="${post.username}" />
                            </div>
                            <span class="font-semibold text-sm hover:text-gray-600">${post.username}</span>
                            <span class="text-gray-400 text-xs">• ${post.timeAgo}</span>
                        </div>
                        <i class='bx bx-dots-horizontal cursor-pointer text-gray-500 hover:text-black'></i>
                    </div>
                    
                    <!-- Imagem do Post -->
                    <div class="w-full bg-black flex items-center justify-center overflow-hidden max-h-[600px]">
                        <img 
                            src="${post.image}" 
                            alt="Post de ${post.username}" 
                            class="w-full object-contain" 
                            ondblclick="toggleLike(${post.id})"
                        />
                    </div>
                    
                    <!-- Ações do Post -->
                    <div class="p-3 pt-4">
                        <div class="flex justify-between mb-2">
                            <div class="flex gap-4">
                                <i class='${heartIconClass} text-2xl cursor-pointer transition-all duration-200 ${heartAnimClass}' style="${heartColorStyle}" onclick="toggleLike(${post.id})"></i>
                                <i class='bx bx-message-rounded text-2xl cursor-pointer hover:text-gray-500'></i>
                                <i class='bx bx-send text-2xl cursor-pointer hover:text-gray-500 -mt-0.5'></i>
                            </div>
                            <i class='bx bx-bookmark text-2xl cursor-pointer hover:text-gray-500'></i>
                        </div>
                        <p class="text-sm font-semibold mb-1 cursor-pointer">${formattedLikes} curtidas</p>
                        
                        <!-- Legenda -->
                        <p class="text-sm">
                            <span class="font-semibold cursor-pointer mr-1 hover:underline">${post.username}</span>
                            <span>${post.caption}</span>
                        </p>
                        
                        <p class="text-xs text-gray-400 mt-2 cursor-pointer mb-1">Ver todos os comentários</p>
                        
                        <!-- Adicionar comentário simples -->
                        <div class="flex items-center mt-2 relative">
                            <input type="text" placeholder="Adicione um comentário..." class="text-sm w-full outline-none border-b border-transparent focus:border-gray-300 pb-1 pr-10" />
                            <i class='bx bx-smile text-gray-400 absolute right-2 top-0 cursor-pointer'></i>
                        </div>
                    </div>
                </article>
            `;
            container.innerHTML += postHTML;
        });
    }

   
    function renderExtras() {
        const storiesContainer = document.getElementById('stories-container');
        const suggestionsContainer = document.getElementById('suggestions-container');
        
        networkUsers.forEach(user => {
          
            storiesContainer.innerHTML += `
                <div class="flex flex-col items-center cursor-pointer min-w-fit">
                    <div class="w-16 h-16 rounded-full bg-gray-300 ring-2 ring-pink-500 ring-offset-2 p-[2px]">
                        <div class="avatar w-full h-full rounded-full">
                            <img src="https://i.pravatar.cc/150?img=${user.img}" alt="${user.user}" />
                        </div>
                    </div>
                    <span class="text-xs mt-2 truncate w-16 text-center text-gray-700">${user.user}</span>
                </div>
            `;

           
            if(Math.random() > 0.3 && suggestionsContainer.children.length < 4){
                suggestionsContainer.innerHTML += `
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-3 cursor-pointer">
                            <div class="avatar w-8 h-8">
                                <img src="https://i.pravatar.cc/150?img=${user.img}" alt="${user.user}" />
                            </div>
                            <div class="flex flex-col">
                                <span class="font-semibold text-xs hover:underline">${user.user}</span>
                                <span class="text-[11px] text-gray-400">Sugestão para você</span>
                            </div>
                        </div>
                        <button class="text-xs font-semibold text-blue-500 hover:text-blue-900">Seguir</button>
                    </div>
                `;
            }
        });
    }

  
    function toggleLike(postId) {
       
        const post = posts.find(p => p.id === postId);
        if (post) {
            if (post.isLiked) {
                post.likes -= 1;
                post.isLiked = false;
            } else {
                post.likes += 1;
                post.isLiked = true;
            }
           
            renderFeed();
        }
    }

   

    const modal = document.getElementById('edit-profile-modal');
    
  
    function openEditProfileModal() {
        document.getElementById('input-username').value = currentUser.username;
        document.getElementById('input-name').value = currentUser.name;
        document.getElementById('modal-avatar-preview').src = currentUser.avatar;
        
        modal.classList.remove('hidden');
    }

    function closeEditProfileModal() {
        modal.classList.add('hidden');
    }

   
    function previewImage(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                
                document.getElementById('modal-avatar-preview').src = e.target.result;
            }
            reader.readAsDataURL(file);
        }
    }

  
    function saveProfile() {
        const newUsername = document.getElementById('input-username').value.trim();
        const newName = document.getElementById('input-name').value.trim();
        const newAvatarSrc = document.getElementById('modal-avatar-preview').src;

        if(newUsername === "") {
          
            return;
               }

        currentUser.username = newUsername;
        currentUser.name = newName;
        currentUser.avatar = newAvatarSrc;

        
        updateUIWithUserData();
        closeEditProfileModal();
    }

   
    window.onload = () => {
        updateUIWithUserData();
        renderExtras();
        renderFeed();
    };