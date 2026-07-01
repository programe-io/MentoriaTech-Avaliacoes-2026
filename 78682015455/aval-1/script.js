function checkGameOver(){

    let red = 0;
    let black = 0;

    for(let y=0;y<8;y++){
        for(let x=0;x<8;x++){

            if(board[y][x]){
                if(board[y][x].color === "red") red++;
                if(board[y][x].color === "black") black++;
            }

        }
    }

    if(red === 0 || black === 0){
        gameOver = true;

        document.getElementById("status").innerHTML =
            red === 0 ? "🏆 Preto venceu!" : "🏆 Vermelho venceu!";

        setTimeout(() => {
            restartGame();
        }, 2000); // reinicia depois de 2 segundos
    }
}