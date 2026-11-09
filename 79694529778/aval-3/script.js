
const usuario = {
    nome: "Marcella Silva",
    username: "@marcella_silva368",
    bio: "✨ Vivendo momentos especiais",
    seguidores: "1.250",
    seguindo: "980",
    publicacoes: "12",
    foto: "https://placehold.co/150x150?text=Marcella"
};

document.body.innerHTML = `
<style>
body {
    margin: 0;
    background: #fafafa;
    font-family: Arial, sans-serif;
}
header {
    padding: 18px;
    background: white;
    border-bottom: 1px solid #ddd;
    font-size: 23px;
    font-weight: bold;
}
.perfil {
    padding: 25px 15px;
    background: white;
}
.topo {
    display: flex;
    align-items: center;
    gap: 25px;
}
.foto {
    width: 95px;
    height: 95px;
    border-radius: 50%;
    border: 3px solid #e1306c;
}
.estatisticas {
    display: flex;
    gap: 20px;
    text-align: center;
}
.estatisticas strong {
    display: block;
    font-size: 18px;
}
button {
    padding: 10px;
    border: none;
    border-radius: 7px;
    background: #0095f6;
    color: white;
    font-weight: bold;
    cursor: pointer;
}
.botoes {
    display: flex;
    gap: 10px;
    margin-top: 20px;
}
.botoes button {
    flex: 1;
}
.bio {
    margin-top: 20px;
}
.publicacoes {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 3px;
    margin-top: 20px;
}
.publicacoes img {
    width: 100%;
    aspect-ratio: 1;
    object-fit: cover;
}
</style>

<header>Instagram</header>

<section class="perfil">
    <div class="topo">
        <img class="foto" src="${usuario.foto}">
        <div class="estatisticas">
            <div><strong>${usuario.publicacoes}</strong>publicações</div>
            <div><strong>${usuario.seguidores}</strong>seguidores</div>
            <div><strong>${usuario.seguindo}</strong>seguindo</div>
        </div>
    </div>

    <div class="bio">
        <strong>${usuario.nome}</strong>
        <p>${usuario.bio}</p>
        <p>♡ Seja bem-vindo(a) ao meu perfil!</p>
    </div>

    <div class="botoes">
        <button onclick="seguir()">Seguir</button>
        <button onclick="alert('Mensagem enviada!')">Mensagem</button>
    </div>
</section>

<section class="publicacoes">
    <img src="https://picsum.photos/300?random=1">
    <img src="https://picsum.photos/300?random=2">
    <img src="https://picsum.photos/300?random=3">
    <img src="https://picsum.photos/300?random=4">
    <img src="https://picsum.photos/300?random=5">
    <img src="https://picsum.photos/300?random=6">
</section>
`;

function seguir() {
    alert("Você começou a seguir @marcella_silva368!");
}
