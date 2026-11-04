
// Sistema de curtidas
document.querySelectorAll(".post").forEach(post => {

    const likeBtn = post.querySelector(".like-btn");
    const likeCount = post.querySelector(".like-count");

    let liked = false;
    let count = parseInt(likeCount.textContent);

    likeBtn.addEventListener("click", () => {

        liked = !liked;

        if (liked) {
            count++;
            likeBtn.classList.remove("far");
            likeBtn.classList.add("fas", "liked");
        \} else {
            count--;
            likeBtn.classList.remove("fas", "liked");
            likeBtn.classList.add("far");
        \}

        likeCount.textContent = count + " curtidas";
    \});

    // Curtir com duplo clique na foto
    const image = post.querySelector(".post-image");

    image.addEventListener("dblclick", () => {
        if (!liked) {
            likeBtn.click();
        \}
    \});

    // Sistema de comentários
    const input = post.querySelector("input");
    const button = post.querySelector(".comment-btn");

    button.addEventListener("click", () => {

        const message = input.value.trim();

        if (message === "") {
            return;
        \}

        const comment = document.createElement("p");
        const username = document.createElement("strong");

        username.textContent = "Você ";
        comment.appendChild(username);
        comment.appendChild(document.createTextNode(message));

        post.querySelector(".comment-box").before(comment);

        input.value = "";
    \});

\});$0