let currentMode="all";

function toast(message){
  const t=document.getElementById("toast");
  t.textContent=message;
  t.style.display="block";
  clearTimeout(window.toastTimer);
  window.toastTimer=setTimeout(()=>t.style.display="none",2500);
}

function likePost(button){
  button.classList.toggle("liked");
  const count=button.querySelector("span");
  let value=parseInt(count.textContent);
  count.textContent=button.classList.contains("liked")?value+1:value-1;
  button.innerHTML=button.classList.contains("liked")
    ?"♥ <span>"+count.textContent+"</span>"
    :"♡ <span>"+count.textContent+"</span>";
}

function savePost(button){
  button.classList.toggle("saved");
  toast(button.classList.contains("saved")
    ?"Publicação salva!"
    :"Publicação removida dos salvos");
}

function toggleFollow(button){
  button.classList.toggle("following");
  button.textContent=button.classList.contains("following")
    ?"Seguindo"
    :"Seguir";
}

function suggestFollow(button){
  button.textContent=button.textContent==="＋"?"✓":"＋";
  toast(button.textContent==="✓"?"Você começou a seguir!":"");
}

function commentFocus(button){
  button.closest(".post").querySelector(".comment-area input").focus();
}

function addComment(input){
  const text=input.value.trim();
  if(!text)return;

  const comments=input.closest(".post").querySelector(".comments");

  const div=document.createElement("div");
  div.style.padding="5px 0";
  div.innerHTML="<strong>Você:</strong> ";
  div.appendChild(document.createTextNode(text));

  comments.appendChild(div);
  input.value="";
}

function sharePost(button){
  const post=button.closest(".post");
  const text=post.querySelector(".post-text").innerText;

  if(navigator.clipboard){
    navigator.clipboard.writeText(text)
      .then(()=>toast("Texto copiado para compartilhar!"))
      .catch(()=>toast("Não foi possível copiar."));
  }else{
    toast("Compartilhamento indisponível.");
  }
}

function showAll(){
  currentMode="all";
  document.getElementById("feedTitle").textContent="Explore o VYRO";
  filterPosts();
}

function showLiked(){
  currentMode="liked";
  document.getElementById("feedTitle").textContent="Suas curtidas";
  filterPosts();
}

function showSaved(){
  currentMode="saved";
  document.getElementById("feedTitle").textContent="Publicações salvas";
  filterPosts();
}

function filterPosts(){
  const search=document.getElementById("search").value.toLowerCase();

  document.querySelectorAll(".post").forEach(post=>{
    let show=true;

    if(currentMode==="liked"&&!post.querySelector(".action.liked"))
      show=false;

    if(currentMode==="saved"&&!post.querySelector(".action.save.saved"))
      show=false;

    const content=post.innerText.toLowerCase();

    if(search&&!content.includes(search))
      show=false;

    post.style.display=show?"block":"none";
  });
}

document.getElementById("search").addEventListener("input",filterPosts);

function openModal(){
  document.getElementById("modal").classList.add("open");
}

function closeModal(){
  document.getElementById("modal").classList.remove("open");
}

function createPost(){
  const name=document.getElementById("newName").value.trim()||"Você";
  const text=document.getElementById("newText").value.trim();
  const tags=document.getElementById("newTags").value.trim();

  if(!text){
    toast("Escreva algo antes de publicar.");
    return;
  }

  const post=document.createElement("article");
  post.className="post";
  post.dataset.tags=tags;

  post.innerHTML=`
    <div class="post-header">
      <div class="avatar">👤</div>
      <div class="user-info">
        <strong>${escapeHTML(name)}</strong>
        <small>Agora</small>
      </div>
    </div>

    <div style="padding:30px 20px;background:#eeedff;color:#46416e;font-size:17px;line-height:1.7;min-height:150px">
      ${escapeHTML(text)}
    </div>

    <div class="post-text">
      <strong>${escapeHTML(name)}</strong>
      ${escapeHTML(text)}
    </div>

    <div class="tags">${escapeHTML(tags.split(" ").map(t=>t.startsWith("#")?t:"#"+t).join(" "))}</div>

    <div class="post-actions">
      <button class="action" onclick="likePost(this)">♡ <span>0</span></button>
      <button class="action" onclick="commentFocus(this)">◯ <span>0</span></button>
      <button class="action" onclick="sharePost(this)">↗</button>
      <button class="action save" onclick="savePost(this)" style="margin-left:auto">▣</button>
    </div>

    <div class="comments"></div>

    <div class="comment-area">
      <input placeholder="Escreva um comentário..." onkeydown="if(event.key==='Enter')addComment(this)">
      <button onclick="addComment(this.previousElementSibling)">Enviar</button>
    </div>
  `;

  document.getElementById("feed").prepend(post);

  document.getElementById("newName").value="";
  document.getElementById("newText").value="";
  document.getElementById("newTags").value="";

  closeModal();
  showAll();
  toast("Publicação criada com sucesso!");
}

function escapeHTML(str){
  return str.replace(/[&<>"']/g,function(match){
    return {
      "&":"&amp;",
      "<":"&lt;",
      ">":"&gt;",
      '"':"&quot;",
      "'":"&#039;"
    }[match];
  });
}