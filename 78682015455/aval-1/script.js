function restartGame(){

    gameOver = false;
    currentPlayer = "red";
    selected = null;

    for(let y=0;y<8;y++){
        board[y]=[];

        for(let x=0;x<8;x++){

            board[y][x]=null;

            if((x+y)%2==1){

                if(y<3){
                    board[y][x]={
                        color:"black",
                        king:false
                    };
                }

                if(y>4){
                    board[y][x]={
                        color:"red",
                        king:false
                    };
                }

            }

        }
    }

    document.getElementById("status").innerHTML =
    "Vez: Vermelho";

    restartBtn.style.display="none";

    draw();

}