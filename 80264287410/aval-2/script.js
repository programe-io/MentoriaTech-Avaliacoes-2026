```javascript
let curtidas = 0;

function curtir() {
    curtidas++;

    document.getElementById("curtidas").textContent =
        curtidas + (curtidas === 1 ? " curtida" : " curtidas");
}
```
