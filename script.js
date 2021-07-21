let gameBoard = (() => {
    let gameBoard = ['','','','','','','','',''];

    document.querySelectorAll('.spot').forEach(spot => {
            spot.addEventListener('click', changeSpot)
        })

    function changeSpot(e){
        if(e.srcElement.innerHTML === '' && displayController.getState() === false){
            gameBoard[e.srcElement.id] = displayController.getTurn();
            displayController.flipTurn();
        }
        updateBoard();
        checkWin();
    }

    function updateBoard(){
        document.querySelectorAll('.spot').forEach(spot => {
            spot.innerHTML = gameBoard[spot.id];
        })
    }

    function restart(){
        gameBoard = ['','','','','','','','',''];
        displayController.setState(false);
        document.querySelector('#action').innerHTML = `Player ${displayController.getTurn()}'s turn`
        updateBoard();
    }

    function won(winner){
        let name;
        if(winner === 'X'){
            name = displayController.getXName();
        }
        else{
            name = displayController.getOName();
        }
        document.querySelector('#action').innerHTML = `${winner} won! Congrats ${name}!`
    }

    function checkWin(){
        if(gameBoard[0] == gameBoard[1] && gameBoard[1] == gameBoard[2] && gameBoard[0] !== ''){
            won(gameBoard[0]);
            displayController.setState(true);
        }
        else if(gameBoard[3] == gameBoard[4] && gameBoard[4] == gameBoard[5] && gameBoard[4] !== ''){
            won(gameBoard[3]);
            displayController.setState(true);
        }
        else if(gameBoard[6] == gameBoard[7] && gameBoard[7] == gameBoard[8] && gameBoard[8] !== ''){
            won(gameBoard[6]);
            displayController.setState(true);
        }
        else if(gameBoard[0] == gameBoard[3] && gameBoard[3] == gameBoard[6] && gameBoard[6] !== ''){
            won(gameBoard[0]);
            displayController.setState(true);
        }
        else if(gameBoard[1] == gameBoard[4] && gameBoard[4] == gameBoard[7] && gameBoard[7] !== ''){
            won(gameBoard[1]);
            displayController.setState(true);
        }
        else if(gameBoard[2] == gameBoard[5] && gameBoard[5] == gameBoard[8] && gameBoard[8] !== ''){
            won(gameBoard[2]);
            displayController.setState(true);
        }
        else if(gameBoard[0] == gameBoard[4] && gameBoard[4] == gameBoard[8] && gameBoard[8] !== ''){
            won(gameBoard[0]);
            displayController.setState(true);
        }
        else if(gameBoard[2] == gameBoard[4] && gameBoard[4] == gameBoard[6] && gameBoard[4] !== ''){
            won(gameBoard[2]);
            displayController.setState(true);
        }
        else if(gameBoard[0] !== '' && gameBoard[1] !== '' && gameBoard[2] !== '' && gameBoard[3] !== '' && gameBoard[4] !== '' && gameBoard[5] !== '' && gameBoard[6] !== '' && gameBoard[7] !== '' && gameBoard[8] !== ''){
            document.querySelector('#action').innerHTML = `It's a tie!`;
            displayController.setState(true);
        }
    }

    return {changeSpot, restart, checkWin};
})();

let player = (sign, name) => {
    
    return {sign, name};
};

let displayController = (() => {
    let turn = 'X';
    let gameOver = true;
    let playerX;
    let playerO;
    let playerXName;
    let playerOName;

    var colors = ["lightpink", "lightcoral", "lightyellow", "lightgreen", "violet"];

		var i = 1;

		window.setInterval(function(){
			document.body.style.backgroundColor = colors[i];
			i++;
			if (i === colors.length){
				i=0;
			}
		}, 5000);

    document.querySelector('form').style.transform = "scale(1)";

    document.querySelector('#start').addEventListener('click', start)

    document.querySelector('#restart').addEventListener('click', gameBoard.restart)

    function start(){
        playerX = player('X', document.querySelector('#x').value);
        playerO = player('O', document.querySelector('#o').value);
        playerXName = playerX.name;
        playerOName = playerO.name
        setState(false);
        document.querySelector('form').style.transform = "scale(0)";
    }

    function flipTurn(){
        if(turn === 'X'){
            turn = 'O';
            document.querySelector('#action').innerHTML = 'Player O\'s turn';
        }
        else{
            turn = 'X';
            document.querySelector('#action').innerHTML = 'Player X\'s turn';
        }  
    }

    function getTurn(){
        return turn;
    }

    function getState(){
        return gameOver;
    }

    function setState(state){
        gameOver = state;
    }

    function getXName(){
        return playerXName;
    }

    function getOName(){
        return playerOName;
    }

    return {flipTurn, getTurn, getState, setState, getXName, getOName}
})();





