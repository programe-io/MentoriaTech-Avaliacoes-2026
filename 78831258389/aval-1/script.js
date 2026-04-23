const btn = document.getElementById("btn");
const msg = document.getElementById("msg");

btn.addEventListener("mouseover", () => {
  const x = Math.random() * (window.innerWidth - 100);
    const y = Math.random() * (window.innerHeight - 50);

      btn.style.left = x + "px";
        btn.style.top = y + "px";
        });

        btn.addEventListener("click", () => {
          msg.innerText = "😱 Você conseguiu clicar!";
          });