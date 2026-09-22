<script>

/* =====================================================
   MINI FEED SOCIAL
===================================================== */

const avatarList = [
  "🎮",
  "🐠",
  "🧸",
  "🍪",
  "💉",
  "🌸",
  "🫧",
  "⭐",
  "🐰",
  "💎"
];


/* ---------------------------------------------
   POSTS
--------------------------------------------- */

function getPosts(){
  return JSON.parse(
    localStorage.getItem("socialFeedPosts") || "[]"
  );
}


function savePosts(posts){
  localStorage.setItem(
    "socialFeedPosts",
    JSON.stringify(posts)
  );
}


/* ---------------------------------------------
   DATA
--------------------------------------------- */

function formatDate(date){

  const d = new Date(date);

  return d.toLocaleDateString("pt-BR", {
    day:"2-digit",
    month:"2-digit",
    year:"numeric"
  }) + " • " +
  d.toLocaleTimeString("pt-BR", {
    hour:"2-digit",
    minute:"2-digit"
  });
}


/* ---------------------------------------------
   USERNAME
--------------------------------------------- */

function createHandle(name){

  return "@" +
    name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g,"")
      .replace(/[^a-z0-9]/g,"")
      .slice(0,18);
}


/* ---------------------------------------------
