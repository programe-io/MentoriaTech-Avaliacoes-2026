// Função para pedir permissão de notificação
function pedirPermissao() {
    if (Notification.permission !== "granted") {
        Notification.requestPermission();
    }
}

// Função para enviar o lembrete
function enviarLembrete() {
    if (Notification.permission === "granted") {
        new Notification("Hidratação Smart 💧", {
            body: "Está na hora de beber um copo de água!",
            icon: "https://cdn-icons-png.flaticon.com/512/3105/3105807.png" // Ícone opcional
        });
    } else {
        console.log("Bebe água! (Notificações desativadas)");
    }
}

// Configurar o intervalo (ex: a cada 60 minutos)
const MINUTOS = 60;
const intervalo = MINUTOS * 60 * 1000;

pedirPermissao();
setInterval(enviarLembrete, intervalo);

console.log(`Lembrete de hidratação ativado para cada ${MINUTOS} minutos.`);