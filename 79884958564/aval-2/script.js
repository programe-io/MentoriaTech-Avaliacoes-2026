/* =========================================================
   MINIFEED — FUTEBOL FEMININO
   JAVASCRIPT PRINCIPAL
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     ELEMENTOS
     ======================================================= */

  const searchInput = document.getElementById("searchInput");
  const themeButton = document.querySelector(".theme-btn");
  const posts = document.querySelectorAll(".post");
  const menuButtons = document.querySelectorAll(".menu button");


  /* =======================================================
     MODO ESCURO
     ======================================================= */

  function loadTheme() {

    const savedTheme = localStorage.getItem("miniFeedTheme");

    if (savedTheme === "dark") {

      document.body.classList.add("dark");

      if (themeButton) {
        themeButton.textContent = "☀️";
      }

    } else {

      document.body.classList.remove("dark");

      if (themeButton) {
        themeButton.textContent = "🌙";
      }

    }
  }


  function toggleDarkMode() {

    document.body.classList.toggle("dark");

    const darkMode =
      document.body.classList.contains("dark");

    localStorage.setItem(
      "miniFeedTheme",
      darkMode ? "dark" : "light"
    );

    if (themeButton) {
      themeButton.textContent =
        darkMode ? "☀️" : "🌙";
    }
  }


  if (themeButton) {
    themeButton.addEventListener(
      "click",
      toggleDarkMode
    );
  }


  loadTheme();


  /* =======================================================
     CURTIDAS
     ======================================================= */

  function loadLikes() {

    posts.forEach((post, index) => {

      const likeCount =
        post.querySelector(".like-count");

      const button =
        post.querySelector(".action");

      const savedLikes =
        localStorage.getItem(
          `miniFeedLikes_${index}`
        );

      const savedLiked =
        localStorage.getItem(
          `miniFeedLiked_${index}`
        );

      if (savedLikes !== null) {
        likeCount.textContent = savedLikes;
      }

      if (savedLiked === "true") {

        button.classList.add("liked");

        button.innerHTML =
          "❤️ Curtido";

      }

    });
  }


  function likePost(button) {

    const post =
      button.closest(".post");

    const count =
      post.querySelector(".like-count");

    const postIndex =
      [...posts].indexOf(post);

    let likes =
      parseInt(count.textContent) || 0;

    const alreadyLiked =
      button.classList.contains("liked");


    if (alreadyLiked) {

      likes--;

      button.classList.remove("liked");

      button.innerHTML =
        "❤️ Curtir";

      localStorage.setItem(
        `miniFeedLiked_${postIndex}`,
        "false"
      );

    } else {

      likes++;

      button.classList.add("liked");

      button.innerHTML =
        "❤️ Curtido";

      localStorage.setItem(
        `miniFeedLiked_${postIndex}`,
        "true"
      );

    }


    count.textContent = likes;

    localStorage.setItem(
      `miniFeedLikes_${postIndex}`,
      likes
    );


    // Pequena animação
    button.animate(
      [
        {
          transform: "scale(1)"
        },
        {
          transform: "scale(1.12)"
        },
        {
          transform: "scale(1)"
        }
      ],
      {
        duration: 250
      }
    );

  }


  /* =======================================================
     COMENTÁRIOS
     ======================================================= */

  function toggleComments(button) {

    const post =
      button.closest(".post");

    const comments =
      post.querySelector(".comments");


    if (!comments) {
      return;
    }


    if (
      comments.style.display === "none" ||
      comments.style.display === ""
    ) {

      comments.style.display = "block";

      button.innerHTML =
        "💬 Fechar comentários";

    } else {

      comments.style.display = "none";

      button.innerHTML =
        "💬 Comentar";

    }

  }


  /* =======================================================
     ADICIONAR COMENTÁRIO
     ======================================================= */

  function addComment(button) {

    const form =
      button.closest(".comment-form");

    const input =
      form.querySelector("input");

    const comments =
      form.parentElement;

    const text =
      input.value.trim();


    if (!text) {

      input.focus();

      input.style.borderColor =
        "#ef4444";

      setTimeout(() => {
        input.style.borderColor = "";
      }, 1200);

      return;
    }


    const comment =
      document.createElement("div");

    comment.className =
      "comment";


    comment.innerHTML =
      `<strong>Você:</strong> ${escapeHTML(text)}`;


    comments.insertBefore(
      comment,
      form
    );


    input.value = "";


    saveComment(
      form.closest(".post"),
      text
    );


    // Animação
    comment.animate(
      [
        {
          opacity: 0,
          transform: "translateY(8px)"
        },
        {
          opacity: 1,
          transform: "translateY(0)"
        }
      ],
      {
        duration: 300
      }
    );

  }


  /* =======================================================
     SALVAR COMENTÁRIOS
     ======================================================= */

  function saveComment(post, text) {

    const postIndex =
      [...posts].indexOf(post);

    const key =
      `miniFeedComments_${postIndex}`;

    let comments =
      JSON.parse(
        localStorage.getItem(key)
      ) || [];


    comments.push({
      author: "Você",
      text: text
    });


    localStorage.setItem(
      key,
      JSON.stringify(comments)
    );

  }


  /* =======================================================
     CARREGAR COMENTÁRIOS
     ======================================================= */

  function loadComments() {

    posts.forEach((post, index) => {

      const commentsContainer =
        post.querySelector(".comments");

      if (!commentsContainer) {
        return;
      }


      const form =
        commentsContainer.querySelector(
          ".comment-form"
        );


      const savedComments =
        JSON.parse(
          localStorage.getItem(
            `miniFeedComments_${index}`
          )
        ) || [];


      savedComments.forEach(commentData => {

        const comment =
          document.createElement("div");

        comment.className =
          "comment";

        comment.innerHTML =
          `<strong>${escapeHTML(commentData.author)}:</strong>
           ${escapeHTML(commentData.text)}`;


        commentsContainer.insertBefore(
          comment,
          form
        );

      });

    });

  }


  /* =======================================================
     PROTEÇÃO CONTRA HTML
     ======================================================= */

  function escapeHTML(text) {

    const div =
      document.createElement("div");

    div.textContent = text;

    return div.innerHTML;

  }


  /* =======================================================
     BUSCA
     ======================================================= */

  function searchPosts() {

    const search =
      searchInput.value
        .toLowerCase()
        .trim();


    posts.forEach(post => {

      const content =
        post.textContent.toLowerCase();


      if (content.includes(search)) {

        post.style.display = "";

        animatePost(post);

      } else {

        post.style.display = "none";

      }

    });


    // Se pesquisar, remove filtro ativo
    if (search !== "") {

      menuButtons.forEach(button => {
        button.classList.remove("active");
      });

    }

  }


  if (searchInput) {

    searchInput.addEventListener(
      "input",
      searchPosts
    );

  }


  /* =======================================================
     FILTROS
     ======================================================= */

  function filterPosts(category, button) {

    // Remove busca
    if (searchInput) {
      searchInput.value = "";
    }


    // Atualiza botão ativo
    menuButtons.forEach(btn => {
      btn.classList.remove("active");
    });


    if (button) {
      button.classList.add("active");
    }


    posts.forEach(post => {

      const postCategory =
        post.dataset.category;


      if (
        category === "todos" ||
        postCategory === category
      ) {

        post.style.display = "";

        animatePost(post);

      } else {

        post.style.display = "none";

      }

    });

  }


  /* =======================================================
     ANIMAÇÃO
     ======================================================= */

  function animatePost(post) {

    post.animate(
      [
        {
          opacity: 0.4,
          transform: "translateY(8px)"
        },
        {
          opacity: 1,
          transform: "translateY(0)"
        }
      ],
      {
        duration: 250,
        easing: "ease-out"
      }
    );

  }


  /* =======================================================
     COMPARTILHAR
     ======================================================= */

  async function sharePost() {

    const shareData = {

      title:
        "MiniFeed — Futebol Feminino",

      text:
        "Confira esta notícia sobre futebol feminino!",

      url:
        window.location.href

    };


    // Celular / navegador compatível
    if (
      navigator.share &&
      typeof navigator.share === "function"
    ) {

      try {

        await navigator.share(shareData);

      } catch (error) {

        // Usuário cancelou o compartilhamento
        console.log(
          "Compartilhamento cancelado."
        );

      }

      return;
    }


    // Fallback para navegadores sem Web Share
    try {

      await navigator.clipboard.writeText(
        window.location.href
      );

      showNotification(
        "🔗 Link copiado!"
      );

    } catch (error) {

      showNotification(
        "Não foi possível copiar o link."
      );

    }

  }


  /* =======================================================
     NOTIFICAÇÃO
     ======================================================= */

  function showNotification(message) {

    const notification =
      document.createElement("div");


    notification.textContent =
      message;


    notification.style.position =
      "fixed";

    notification.style.bottom =
      "25px";

    notification.style.left =
      "50%";

    notification.style.transform =
      "translateX(-50%)";

    notification.style.zIndex =
      "9999";

    notification.style.padding =
      "12px 20px";

    notification.style.borderRadius =
      "50px";

    notification.style.background =
      "linear-gradient(135deg,#8b5cf6,#ec4899)";

    notification.style.color =
      "#fff";

    notification.style.fontSize =
      "13px";

    notification.style.fontWeight =
      "700";

    notification.style.boxShadow =
      "0 10px 30px rgba(0,0,0,.25)";


    document.body.appendChild(
      notification
    );


    notification.animate(
      [
        {
          opacity: 0,
          transform:
            "translate(-50%,20px)"
        },
        {
          opacity: 1,
          transform:
            "translate(-50%,0)"
        }
      ],
      {
        duration: 250,
        fill: "forwards"
      }
    );


    setTimeout(() => {

      notification.animate(
        [
          {
            opacity: 1
          },
          {
            opacity: 0
          }
        ],
        {
          duration: 250,
          fill: "forwards"
        }
      );

      setTimeout(() => {
        notification.remove();
      }, 250);

    }, 1800);

  }


  /* =======================================================
     EVENTOS DOS POSTS
     ======================================================= */

  posts.forEach(post => {

    const actions =
      post.querySelectorAll(".action");


    actions.forEach(action => {

      const text =
        action.textContent.toLowerCase();


      if (text.includes("curtir")) {

        action.addEventListener(
          "click",
          () => likePost(action)
        );

      }


      else if (
        text.includes("comentar")
      ) {

        action.addEventListener(
          "click",
          () => toggleComments(action)
        );

      }


      else if (
        text.includes("compartilhar")
      ) {

        action.addEventListener(
          "click",
          sharePost
        );

      }

    });


    const commentButton =
      post.querySelector(
        ".comment-form button"
      );


    if (commentButton) {

      commentButton.addEventListener(
        "click",
        () => addComment(commentButton)
      );

    }


    const input =
      post.querySelector(
        ".comment-form input"
      );


    // Enter envia comentário
    if (input) {

      input.addEventListener(
        "keydown",
        event => {

          if (event.key === "Enter") {

            event.preventDefault();

            if (commentButton) {
              addComment(commentButton);
            }

          }

        }
      );

    }

  });


  /* =======================================================
     MENU DE CATEGORIAS
     ======================================================= */

  menuButtons.forEach(button => {

    button.addEventListener(
      "click",
      () => {

        const text =
          button.textContent
            .toLowerCase();


        if (text.includes("início")) {

          filterPosts(
            "todos",
            button
          );

        }

        else if (text.includes("brasil")) {

          filterPosts(
            "brasil",
            button
          );

        }

        else if (
          text.includes("internacional")
        ) {

          filterPosts(
            "internacional",
            button
          );

        }

        else if (
          text.includes("clubes")
        ) {

          filterPosts(
            "clubes",
            button
          );

        }

        else if (
          text.includes("seleção")
        ) {

          filterPosts(
            "selecao",
            button
          );

        }

      }
    );

  });


  /* =======================================================
     CARREGAR DADOS SALVOS
     ======================================================= */

  loadLikes();

  loadComments();


  /* =======================================================
     EFEITO AO ROLAR
     ======================================================= */

  const observer =
    new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            entry.target.style.opacity =
              "1";

            entry.target.style.transform =
              "translateY(0)";

          }

        });

      },
      {
        threshold: 0.08
      }
    );


  posts.forEach(post => {

    post.style.opacity = "0";

    post.style.transform =
      "translateY(15px)";

    post.style.transition =
      "opacity .5s ease, transform .5s ease";

    observer.observe(post);

  });


  /* =======================================================
     ATALHO DE TECLADO
     ======================================================= */

  document.addEventListener(
    "keydown",
    event => {

      // "/" foca na pesquisa
      if (
        event.key === "/" &&
        document.activeElement.tagName !== "INPUT"
      ) {

        event.preventDefault();

        if (searchInput) {
          searchInput.focus();
        }

      }

      // ESC limpa pesquisa
      if (
        event.key === "Escape" &&
        searchInput
      ) {

        searchInput.value = "";

        searchPosts();

        searchInput.blur();

      }

    }
  );


  /* =======================================================
     CONSOLE
     ======================================================= */

  console.log(
    "%c⚽ MiniFeed Futebol Feminino",
    "color:#8b5cf6;font-size:20px;font-weight:bold"
  );

  console.log(
    "Feed carregado com sucesso!"
  );

});
