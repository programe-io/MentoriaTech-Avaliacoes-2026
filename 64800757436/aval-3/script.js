document.querySelectorAll('.like').forEach(btn=>{
  btn.addEventListener('click',()=>{
    btn.classList.toggle('active');
    btn.textContent=btn.classList.contains('active')
      ? '♥ Curtido' : '♡ Curtir';

    const likes=btn.closest('.post').querySelector('.likes');
    let n=Number(likes.dataset.count ||
      likes.textContent.replace(/\D/g,''));

    n+=btn.classList.contains('active')?1:-1;
    likes.dataset.count=n;
    likes.textContent=n.toLocaleString('pt-BR')+' curtidas';
  });
});

document.querySelectorAll('.comment-input').forEach(input=>{
  input.addEventListener('keydown',e=>{
    if(e.key==='Enter' && input.value.trim()){
      const p=document.createElement('p');
      p.textContent='Você: '+input.value.trim();
      input.closest('.post')
        .querySelector('.comments').appendChild(p);
      input.value='';
    }
  });
});

document.getElementById('publish').addEventListener('click',()=>{
  const input=document.getElementById('caption');
  if(!input.value.trim())return;

  const post=document.createElement('article');
  post.className='post';

  const p=document.createElement('p');
  p.textContent=input.value;
  post.appendChild(p);

  document.getElementById('feed').prepend(post);
  input.value='';
});

document.getElementById('search').addEventListener('input',e=>{
  document.querySelectorAll('.post').forEach(post=>{
    post.style.display=post.textContent.toLowerCase()
      .includes(e.target.value.toLowerCase())?'block':'none';
  });
});
  