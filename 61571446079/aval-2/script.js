
function postar() {
    let titulo = document.getElementById("titulo").value;
    let texto = document.getElementById("texto").value;

    if (titulo == "" || texto == "") {
        alert("Preencha todos os campos!");
        return;
    }

    let blog = document.getElementById("blog");

    let post = document.createElement("div");
    post.className = "post";

    let h3 = document.createElement("h3");
    h3.textContent = titulo;

    let p = document.createElement("p");
    p.textContent = texto;

    post.appendChild(h3);
    post.appendChild(p);

    blog.prepend(post);

    document.getElementById("titulo").value = "";
    document.getElementById("texto").value = "";
}
