
const botao = document.getElementById("entrarBlog");

botao.addEventListener("click", function () {
    document.getElementById("sobre").scrollIntoView({
        behavior: "smooth"
    });
});
