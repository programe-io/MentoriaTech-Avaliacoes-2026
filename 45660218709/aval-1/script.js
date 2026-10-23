/* Reset */
*{
    margin:0;
    padding:0;
    box-sizing:border-box;
}

body{
    font-family: Arial, sans-serif;
    background:#f5f5f5;
    color:#333;
    line-height:1.6;
}

header{
    background:#4a4a4a;
    color:white;
    padding:20px;
    display:flex;
    justify-content:space-between;
    align-items:center;
    flex-wrap:wrap;
}

header ul{
    display:flex;
    list-style:none;
    gap:20px;
}

header a{
    color:white;
    text-decoration:none;
}

header a:hover{
    text-decoration:underline;
}

main{
    max-width:900px;
    margin:30px auto;
    padding:20px;
}

section{
    background:white;
    padding:20px;
    margin-bottom:20px;
    border-radius:10px;
    box-shadow:0 2px 8px rgba(0,0,0,0.1);
}

h2{
    color:#4a4a4a;
    margin-bottom:10px;
}

ul{
    padding-left:20px;
}

footer{
    background:#4a4a4a;
    color:white;
    text-align:center;
    padding:15px;
    margin-top:30px;
}