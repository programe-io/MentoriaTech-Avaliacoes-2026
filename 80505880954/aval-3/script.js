// SELECIONAR TODAS AS PUBLICAÇÕES
const posts = document.querySelectorAll(".post");

// CURTIR PUBLICAÇÕES
posts.forEach(post => {

    const actions = post.querySelectorAll(".actions span");

    if (actions.length > 0) {

        const likeButton = actions[0];

        likeButton.addEventListener("click", function() {

            if (this.classList.contains("liked")) {
                this.classList.remove("liked");
                this.textContent = "♡";
            \} else {
                this.classList.add("liked");
                this.textContent = "♥";
            \}

        \});

        // SALVAR PUBLICAÇÃO
        const saveButton = post.querySelector(".save");

        if (saveButton) {
            saveButton.addEventListener("click", function() {

                this.classList.toggle("saved");

                if (this.classList.contains("saved")) {
                    this.textContent = "▣";
                    alert("Publicação salva!");
                \} else {$0