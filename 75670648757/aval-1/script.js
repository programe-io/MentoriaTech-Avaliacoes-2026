function brilhar() {
    const lua = document.getElementById("lua");

    lua.style.boxShadow = "0 0 100px white";
    lua.style.transform = "scale(1.1)";

    setTimeout(() => {
        lua.style.boxShadow = "0 0 50px white";
        lua.style.transform = "scale(1)";
    }, 1000);
}