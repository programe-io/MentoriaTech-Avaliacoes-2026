<script>
const canvas = document.createElement('canvas');
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');

canvas.style.position = 'absolute';
canvas.style.top = 0;
canvas.style.left = 0;
canvas.style.zIndex = 0; // atrás do conteúdo
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
const particleCount = 80;

// Criar partículas iniciais
for (let i = 0; i < particleCount; i++) {
    particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 3 + 1,
        dx: (Math.random() - 0.5) * 1.5,
        dy: (Math.random() - 0.5) * 1.5
    \});
\}

// Captura posição do mouse
let mouse = { x: null, y: null \};
window.addEventListener('mousemove', function(e) {
    mouse.x = e.x;
    mouse.y = e.y;
\});

// Função para desenhar partículas
function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#0ff';
        ctx.fill();
        ctx.closePath();
    \});
\}

// Função para conectar partículas próximas
function connectParticles() {
    for (let i = 0; i < particleCount; i++) {
        for (let j = i + 1; j < particleCount; j++) {
            let dx = particles[i].x - particles[j].x;
            let dy = particles[i].y - particles[j].y;
            let distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 120) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(0,255,255,\${1 - distance/120\})`;
                ctx.lineWidth = 1;
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
                ctx.closePath();
            \}
        \}
    \}
\}

// Atualiza posição das partículas
function updateParticles() {
    particles.forEach(p => {
        p.x += p.dx;
        p.y += p.dy;

        // Rebate nas bordas
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;

        // Interação com mouse
        if (mouse.x && mouse.y) {
            let dx = p.x - mouse.x;
            let dy = p.y - mouse.y;
            let distance = Math.sqrt(dx*dx + dy*dy);
            if (distance < 100) {
                let angle = Math.atan2(dy, dx);
                p.x += Math.cos(angle);
                p.y += Math.sin(angle);
            \}
        \}
    \});
\}

// Loop de animação
function animate() {
    drawParticles();
    connectParticles();
    updateParticles();
    requestAnimationFrame(animate);
\}
animate();

// Ajusta canvas ao redimensionar a tela
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
\});
</script>$0