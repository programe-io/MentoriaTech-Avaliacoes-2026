// Instagram demonstrativo completo: interações locais no navegador.
document.addEventListener('DOMContentLoaded', () => {
// Instagram demonstrativo completo: interações locais no navegador.
document.addEventListener('DOMContentLoaded', () => {
    const $ = (s, root=document) => root.querySelector(s);
    const $$ = (s, root=document) => [...root.querySelectorAll(s)];
    const storage = {
        get(key, fallback) { try { const v=localStorage.getItem('ig-'+key); return v===null?fallback:JSON.parse(v); } catch { return fallback; } },
        set(key, value) { try { localStorage.setItem('ig-'+key, JSON.stringify(value)); } catch {} }
    };

    // Fotos genéricas para deixar o visual próximo ao Instagram tradicional.
    const instagramPhotos = {
        avatars: [
            'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=240&h=240&fit=crop&crop=faces',
            'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=240&h=240&fit=crop&crop=faces',
            'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=240&h=240&fit=crop&crop=faces',
            'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=240&h=240&fit=crop&crop=faces',
            'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=240&h=240&fit=crop&crop=faces',
            'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=240&h=240&fit=crop&crop=faces'
        ],
        posts: [
            'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1000&h=1000&fit=crop',
            'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=1000&h=1000&fit=crop',
            'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=1000&h=1000&fit=crop'
        ],
        stories: [
            'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=900&h=1400&fit=crop',
            'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=900&h=1400&fit=crop',
            'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=900&h=1400&fit=crop',
            'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=900&h=1400&fit=crop',
            'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=900&h=1400&fit=crop'
        ]
    };
    function applyInstagramPhotos() {
        const avatarNodes = $$('.image-placeholder[data-image-type="avatar"], .contact-avatar, .profile-avatar');
        avatarNodes.forEach((el, i) => {
            const url = instagramPhotos.avatars[i % instagramPhotos.avatars.length];
            el.style.backgroundImage = `url("${url}")`;
            el.style.backgroundSize = 'cover';
            el.style.backgroundPosition = 'center';
            el.classList.add('instagram-photo');
            el.setAttribute('aria-label', 'Foto de perfil');
        });
        $$('.post-card .post-image').forEach((el, i) => {
            el.style.backgroundImage = `url("${instagramPhotos.posts[i % instagramPhotos.posts.length]}")`;
            el.style.backgroundSize = 'cover';
            el.style.backgroundPosition = 'center';
            el.classList.add('instagram-photo');
        });
        const createMedia = $('.create-post-media');
        if (createMedia) {
            createMedia.style.backgroundImage = `url("${instagramPhotos.posts[0]}")`;
            createMedia.style.backgroundSize = 'cover';
            createMedia.style.backgroundPosition = 'center';
        }
    }
    applyInstagramPhotos();

    const modals = ['story-modal','chat-modal','create-post-modal','comments-modal','notifications-modal','profile-modal']
        .map(id => document.getElementById(id)).filter(Boolean);
    function openModal(id) {
        const modal=document.getElementById(id); if(!modal) return;
        modals.forEach(m=>{m.classList.toggle('is-open',m===modal);m.setAttribute('aria-hidden',m===modal?'false':'true');});
        const focusable=$('button, input, textarea',modal); focusable?.focus();
    }
    function closeModal(modal) { modal?.classList.remove('is-open'); modal?.setAttribute('aria-hidden','true'); }
    $$('[data-close]').forEach(b=>b.addEventListener('click',()=>closeModal(document.getElementById(b.dataset.close))));
    modals.forEach(m=>m.addEventListener('click',e=>{if(e.target===m)closeModal(m);}));
    document.addEventListener('keydown',e=>{if(e.key==='Escape')modals.forEach(closeModal);});

    let toastTimer;
    window.mostrarNotificacao = function(msg) {
        const toast=$('#toast-notification'); if(!toast)return;
        toast.textContent=msg; toast.classList.remove('opacity-0'); toast.classList.add('opacity-100');
        clearTimeout(toastTimer); toastTimer=setTimeout(()=>{toast.classList.remove('opacity-100');toast.classList.add('opacity-0');},2600);
    };
    function addActivity(message) {
        const list=$('#notification-list'); if(!list)return;
        const p=document.createElement('p'); p.className='notification-entry';
        const icon=document.createElement('i'); icon.className='bx bx-bell';
        const span=document.createElement('span'); span.textContent=message;
        p.append(icon,span); list.prepend(p);
    }

    // Tema persistente.
    const themeButtons=[$('#theme-toggle'),$('#mobile-theme-toggle')].filter(Boolean);
    function applyTheme(theme) {
        const dark=theme==='dark'; document.body.classList.toggle('dark-mode',dark);
        themeButtons.forEach(b=>{const i=$('i',b);if(i)i.className=dark?'bx bx-sun':'bx bx-moon';b.title=dark?'Ativar tema claro':'Ativar tema escuro';});
        storage.set('theme',theme);
    }
    applyTheme(storage.get('theme','light'));
    themeButtons.forEach(b=>b.addEventListener('click',()=>applyTheme(document.body.classList.contains('dark-mode')?'light':'dark')));

    // Curtidas, salvos e seguindo com estado salvo.
    const liked=storage.get('liked',{}), saved=storage.get('saved',{}), followed=storage.get('followed',{});
    const posts=$$('.post-card');
    posts.forEach((card,index)=>{
        card.dataset.postId=card.dataset.postId||`post-${index+1}`;
        const id=card.dataset.postId, like=$('.like-btn',card), icon=$('i',like||card), save=$('.save-btn',card);
        const setLike=state=>{
            liked[id]=state; storage.set('liked',liked);
            const i=$('i',like); if(i){i.classList.toggle('bx-heart',!state);i.classList.toggle('bxs-heart',state);i.classList.toggle('text-red-500',state);}
            like?.setAttribute('aria-pressed',String(state));
            const t=$('.likes-text',card); if(t)t.textContent=state?'Curtido por você e outras pessoas':'mil e poucas curtidas';
        };
        setLike(!!liked[id]);
        like?.addEventListener('click',()=>setLike(!liked[id]));
        $('.post-image',card)?.addEventListener('dblclick',()=>{
            if(!liked[id])setLike(true);
            const heart=document.createElement('i');heart.className='bx bxs-heart double-tap-heart';$('.post-image',card).append(heart);setTimeout(()=>heart.remove(),800);
        });
        const setSaved=state=>{
            saved[id]=state;storage.set('saved',saved);
            const i=$('i',save);if(i){i.classList.toggle('bxs-bookmark',state);i.classList.toggle('bx-bookmark',!state);}
            save?.setAttribute('aria-pressed',String(state));
        };
        setSaved(!!saved[id]);
        save?.addEventListener('click',()=>{setSaved(!saved[id]);mostrarNotificacao(saved[id]?'Publicação salva':'Publicação removida dos salvos');});
    });

    // Seguir e deixar de seguir.
    $$('.follow-btn').forEach((b,i)=>{
        const key=b.dataset.username||`suggestion-${i+1}`;
        const render=()=>{const on=!!followed[key];b.textContent=on?'Seguindo':'Seguir';b.classList.toggle('text-blue-500',!on);b.classList.toggle('text-slate-900',on);};
        render();b.addEventListener('click',()=>{followed[key]=!followed[key];storage.set('followed',followed);render();const msg=followed[key]?'Você começou a seguir um perfil':'Você deixou de seguir um perfil';mostrarNotificacao(msg);addActivity(msg);});
    });

    // Stories com navegação por teclado e botões.
    const storyItems=$$('.story-item'), own=$('#own-story'), storyEntries=[...(own?[own]:[]),...storyItems];let storyIndex=0;
    function showStory(i){if(!storyEntries.length)return;storyIndex=(i+storyEntries.length)%storyEntries.length;const item=storyEntries[storyIndex];$('#story-user-label').textContent=item.dataset.user||'Seu story';const area=$('#story-photo-area');if(area){area.style.backgroundImage=`linear-gradient(180deg,rgba(0,0,0,.12),rgba(0,0,0,.55)),url("${instagramPhotos.stories[storyIndex % instagramPhotos.stories.length]}")`;area.classList.add('has-story-photo');}openModal('story-modal');}
    storyEntries.forEach((item,i)=>{item.setAttribute('tabindex','0');item.addEventListener('click',()=>showStory(i));item.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();showStory(i);}});});
    $('#previous-story')?.addEventListener('click',()=>showStory(storyIndex-1));
    $('#next-story')?.addEventListener('click',()=>showStory(storyIndex+1));

    // Conversas locais persistidas no navegador.
    const contacts=$$('.chat-contact');let currentContact='João';
    const messages=storage.get('messages',{});
    function renderMessages(){
        const area=$('#chat-messages');if(!area)return;area.replaceChildren();
        (messages[currentContact]||[]).forEach(msg=>{
            const bubble=document.createElement('div');bubble.className='chat-bubble';bubble.textContent=msg.text;area.append(bubble);
        });
        if(!(messages[currentContact]||[]).length){const p=document.createElement('p');p.className='chat-empty';p.textContent='Esta é uma conversa demonstrativa. Envie uma mensagem para começar.';area.append(p);}
        area.scrollTop=area.scrollHeight;
    }
    contacts.forEach(btn=>btn.addEventListener('click',()=>{currentContact=btn.dataset.contact;contacts.forEach(c=>c.classList.toggle('active',c===btn));$('#active-contact-name').textContent=currentContact;renderMessages();}));
    $('#chat-form')?.addEventListener('submit',e=>{e.preventDefault();const input=$('#chat-message-input'),value=input.value.trim();if(!value)return;(messages[currentContact]||=[]).push({text:value});storage.set('messages',messages);input.value='';renderMessages();});
    ['desktop-chat-open','mobile-chat-open'].forEach(id=>$('#'+id)?.addEventListener('click',()=>{openModal('chat-modal');renderMessages();}));

    // Pesquisa no feed. Também abre o campo no celular.
    const search=$('#search-input');
    function filterPosts(term){posts.forEach(card=>{card.style.display=card.textContent.toLowerCase().includes(term.toLowerCase())?'':'none';});}
    search?.addEventListener('input',()=>filterPosts(search.value.trim()));
    $('#mobile-search-open')?.addEventListener('click',()=>{if(search){search.classList.remove('hidden');search.focus();search.scrollIntoView({block:'nearest',behavior:'smooth'});}});
    $('#explore-open')?.addEventListener('click',()=>{if(search){search.focus();mostrarNotificacao('Pesquise nomes, locais ou assuntos no feed.');}});
    // Nova publicação de texto: mantém o espaço de imagem em branco para futura edição do HTML.
    ['desktop-new-post-btn','mobile-new-post-btn'].forEach(id=>$('#'+id)?.addEventListener('click',()=>openModal('create-post-modal')));
    const caption=$('#new-post-caption'),counter=$('#caption-counter');
    caption?.addEventListener('input',()=>{if(counter)counter.textContent=`${caption.value.length}/500`;});
    $('#create-post-form')?.addEventListener('submit',e=>{
        e.preventDefault();const text=caption.value.trim();if(!text){mostrarNotificacao('Escreva uma legenda antes de publicar.');return;}
        const card=document.createElement('article');card.className='bg-white border border-gray-200 rounded-lg mb-4 post-card';card.dataset.postId='post-'+Date.now();
        card.innerHTML=`<header class="flex items-center justify-between p-3"><div class="flex items-center gap-3"><div class="w-10 h-10 rounded-full image-placeholder"></div><div><p class="text-sm font-semibold">frojo_dev</p><p class="text-xs text-gray-500">Agora mesmo</p></div></div><button class="options-btn" aria-label="Mais opções"><i class="bx bx-dots-horizontal-rounded"></i></button></header><div class="bg-gray-100 relative aspect-square overflow-hidden"><div class="w-full h-full post-image image-placeholder"></div></div><div class="p-3"><div class="flex items-center justify-between mb-3"><div class="flex items-center gap-4"><button class="text-2xl like-btn" aria-label="Curtir"><i class="bx bx-heart"></i></button><button class="text-2xl comment-focus-btn" aria-label="Comentar"><i class="bx bx-message-rounded"></i></button><button class="text-2xl share-btn" aria-label="Compartilhar"><i class="bx bx-send"></i></button></div><button class="text-2xl save-btn" aria-label="Salvar"><i class="bx bx-bookmark"></i></button></div><p class="font-semibold text-sm mb-2 likes-text">0 curtidas</p><p class="text-sm"><b>frojo_dev</b> ${escapeHTML(text)}</p><button class="text-sm text-gray-500 mt-2 view-comments-btn">Ver comentários</button><p class="text-xs text-gray-500 mt-2 uppercase">agora mesmo</p></div>`;
        $('#feed-posts').prepend(card);posts.unshift(card);wireNewPost(card);const newPhoto=$('.post-image',card);if(newPhoto){newPhoto.style.backgroundImage=`url("${instagramPhotos.posts[posts.length % instagramPhotos.posts.length]}")`;newPhoto.style.backgroundSize='cover';newPhoto.style.backgroundPosition='center';}caption.value='';if(counter)counter.textContent='0/500';closeModal($('#create-post-modal'));$('#profile-post-count').textContent=posts.length;mostrarNotificacao('Sua publicação foi adicionada ao feed.');addActivity('Você publicou uma nova atualização.');
    });
    function escapeHTML(s){return s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
    function wireNewPost(card){
        const id=card.dataset.postId;
        $('.like-btn',card)?.addEventListener('click',()=>{const on=$('.like-btn i',card).classList.toggle('bxs-heart');$('.like-btn i',card).classList.toggle('bx-heart',!on);$('.like-btn i',card).classList.toggle('text-red-500',on);$('.likes-text',card).textContent=on?'Curtido por você':'0 curtidas';});
        $('.save-btn',card)?.addEventListener('click',()=>{const i=$('.save-btn i',card);i.classList.toggle('bxs-bookmark');i.classList.toggle('bx-bookmark');mostrarNotificacao('Publicação atualizada nos salvos.');});
        $('.post-image',card)?.addEventListener('dblclick',()=>$('.like-btn',card)?.click());
        $('.comment-focus-btn',card)?.addEventListener('click',()=>openComments(card));
        $('.view-comments-btn',card)?.addEventListener('click',()=>openComments(card));
        $('.share-btn',card)?.addEventListener('click',()=>sharePost(card));
        $('.options-btn',card)?.addEventListener('click',()=>mostrarNotificacao('Opções da publicação.'));
    }

    // Comentários por publicação.
    const comments=storage.get('comments',{});
    let activePost=null;
    function openComments(card){
        activePost=card;const id=card.dataset.postId;const list=$('#comments-list');list.replaceChildren();
        (comments[id]||[]).forEach(c=>{const p=document.createElement('p');p.className='comment-entry';const b=document.createElement('b');b.textContent=c.user;const span=document.createElement('span');span.textContent=c.text;p.append(b,span);list.append(p);});
        if(!(comments[id]||[]).length){const p=document.createElement('p');p.className='chat-empty';p.textContent='Ainda não há comentários. Seja o primeiro a comentar!';list.append(p);}
        openModal('comments-modal');
    }
    $$('.comment-focus-btn, .view-comments-btn').forEach(b=>b.addEventListener('click',()=>openComments(b.closest('.post-card'))));
    $('#comment-form')?.addEventListener('submit',e=>{e.preventDefault();const input=$('#comment-input'),text=input.value.trim();if(!text||!activePost)return;const id=activePost.dataset.postId;(comments[id]||=[]).push({user:'frojo_dev',text});storage.set('comments',comments);input.value='';openComments(activePost);addActivity('Você comentou em uma publicação.');});
    async function sharePost(card){
        const caption=$('p.text-sm',card)?.innerText||'Confira esta publicação';
        try{if(navigator.share)await navigator.share({title:'Publicação do Instagram',text:caption});else if(navigator.clipboard?.writeText){await navigator.clipboard.writeText(caption);mostrarNotificacao('Legenda copiada para compartilhar.');}else mostrarNotificacao('Compartilhamento demonstrativo.');}catch{}
    }
    $$('.share-btn').forEach(b=>b.addEventListener('click',()=>sharePost(b.closest('.post-card'))));
    $$('.options-btn').forEach(b=>b.addEventListener('click',()=>mostrarNotificacao('Menu de opções demonstrativo.')));

    // Atalhos de navegação para as telas novas.
    ['notifications-open','mobile-notifications-open'].forEach(id=>$('#'+id)?.addEventListener('click',()=>openModal('notifications-modal')));
    ['profile-open','mobile-profile-open'].forEach(id=>$('#'+id)?.addEventListener('click',()=>openModal('profile-modal')));
    $('#edit-profile-btn')?.addEventListener('click',()=>mostrarNotificacao('Para editar nome e foto, altere os dados no HTML. A bio pode ser ajustada no arquivo index.html.'));
    renderMessages();
});
