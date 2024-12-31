var left_arrow = document.getElementById("left_arrow");
var slect_level = document.getElementsByClassName("button_level");
var level_div = document.getElementById("level");
var vs_div = document.getElementById("vs_div");
var main_div = document.getElementById("main_div");
var div_buttons = document.getElementById("buttons");
var waiting_L = document.getElementById("waiting_L");
var waiting_R = document.getElementById("waiting_R");
var Lplayer_img = document.getElementById("Lplayer_img");
var Rplayer_img = document.getElementById("Rplayer_img");
var Lplayer_name = document.getElementById("Lplayer_name");
var Rplayer_name = document.getElementById("Rplayer_name");
var player1_score = document.getElementById("player1");
var player2_score = document.getElementById("player2");
var result_div = document.getElementById("Game_over");
var result_text = document.getElementById("rsulte");
var LplayerControl = document.getElementById("LplayerControl");
var RplayerControl = document.getElementById("RplayerControl");
var img_l_player = document.getElementById("img_player2");
var img_r_player = document.getElementById("img_player1");
window.lastloca = "SecondGame";





var level_clik = "";
var game_mode = window.location.href.split("/")[3];

var socket;
function ft_left_arrow(){
    if (socket && socket.readyState === WebSocket.OPEN) {
        socket.close();
    }
  window.Router.navigateTo("/LandingPage",true);
}
function get_level(level) {
  if (level === "easy") {
    level_clik = "easy";
    buttons.style.display = "none";
    if (game_mode === "Hremote") {
      vs_div.style.display = "flex";
    }
    startGame();
  } else if (level === "medium") {
    level_clik = "medium";
    div_buttons.style.display = "none";
    if (game_mode === "Hremote") {
      vs_div.style.display = "flex";
    }
    startGame();
  } else if (level === "hard") {
    level_clik = "hard";
    div_buttons.style.display = "none";
    if (game_mode === "Hremote") {
      vs_div.style.display = "flex";
    }
    startGame();
  }
}

var maze_canvas = document.getElementById("maze_canvas");
ctx = maze_canvas.getContext("2d");

var colors = {
    '1' : '#000000',
    '0' : '#000000',
    'C' : '#fdf0d5',
    'L' : '#d81159',
    'R' : '#d81159',
}



function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
var id = window.dataUserGame.id;
var player_name = window.dataUserGame.username;
var img = window.dataUserGame.picture;

function updateScore(newScore , player_shape_score , maxScore) {
    currentScore = Math.min(newScore, maxScore);
    var fillPercentage = (currentScore / maxScore) * 100;
    document.getElementById(player_shape_score).style.height = fillPercentage + '%';
  }

function startGame() {
    socket = new WebSocket(
        `wss://${parsedUrl.hostname}:4443/ws/second_game/${level_clik}/${id}/${game_mode}/${player_name}/${img}/`
    );
    var key_stat = {};
    var maxScore ;
    var currentScore;
    if (level_clik === "easy") {
        maxScore = 9;
        currentScore = 0;
    } else if (level_clik === "medium") {
        maxScore = 9;
        currentScore = 0;
    } else if (level_clik === "hard") {
        maxScore = 11;
        currentScore = 0;
    }
    
    document.addEventListener('keydown', (event) => {
        if (socket.readyState === WebSocket.OPEN) {
            if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'w', 's', 'a', 'd'].includes(event.key) && !key_stat[event.key]) {
                key_stat[event.key] = true;
                if(socket.readyState === WebSocket.OPEN){
                    socket.send(JSON.stringify({ 'key': key_stat }));
                }
            }
        }
    });

    document.addEventListener('keyup', (event) => {
        if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'w', 's', 'a', 'd'].includes(event.key)  && key_stat[event.key]) {
            key_stat[event.key] = false;
            if(socket.readyState === WebSocket.OPEN){
                socket.send(JSON.stringify({ 'key': key_stat }));
            }
        }
    });

    socket.onclose = function (event) {
		
        Object.assign(key_stat, {});
        if (window.whyExist == "game_over") {
            if (game_mode === "Hlocal") 
		        window.Router.navigateTo("/LandingPage");
            return;
        }
        if (window.whyExist == "Winner") {
            return;
        }
		if (window.whyExist != "skip" && window.whyExist != "remote")
			return
		
		window.Router.navigateTo("/LandingPage");
		
	};
    socket.onmessage = function(event) {
        var gameState = JSON.parse(event.data);
        
        if(game_mode === "Hlocal"){
            level_div.style.display = "none";
            main_div.style.display = "flex";
            
            player1_score.textContent = gameState.players.L.score;
            player2_score.textContent = gameState.players.R.score;
            updateScore(gameState.players.L.score , "FillLshape" , maxScore);
            updateScore(gameState.players.R.score , "FillRshape" , maxScore);
            drawMaze(gameState.map);
            LocalGame_over(gameState.map , gameState.players , socket);
        }
        else if (game_mode === "Hremote"){
            var parsedGameState;
            
            if(typeof gameState.gamestate === "string"){
                parsedGameState = JSON.parse(gameState.gamestate);
                if (parsedGameState.message === "player disconnected"){
                    socket.close();

                    window.Router.navigateTo("/LandingPage", true)
                    window.whyExist = "Winner";
                }
                else if(parsedGameState.message === "Waiting for another player"){
                    
                    if(parsedGameState.symbol === "L"){
                        
                        Lplayer_img.src = parsedGameState.player_container.img;
                        Lplayer_name.textContent = parsedGameState.player_container.player_name;
                        
                        Lplayer_img.style.display = "flex";
                        Lplayer_name.style.display = "flex";
                        waiting_R.style.display = "flex";
                    }
                    if(parsedGameState.symbol === "R"){
                        Rplayer_img.src = parsedGameState.player_container.img;
                        Rplayer_name.textContent = parsedGameState.player_container.player_name;
                        
                        Rplayer_img.style.display = "flex";
                        Rplayer_name.style.display = "flex";
                        waiting_L.style.display = "flex";
                    }
                }
                else if(parsedGameState.message === "Game Start"){
                    
                    if(parsedGameState.symbol === "L"){
                        
                        Lplayer_img.src = parsedGameState.LplayerContainer.img;
                        Lplayer_name.textContent = parsedGameState.LplayerContainer.player_name;
                    }
                    if(parsedGameState.symbol === "R"){
                        
                        Rplayer_img.src = parsedGameState.RplayerContainer.img;
                        Rplayer_name.textContent = parsedGameState.RplayerContainer.player_name;
                    }
                    GameStateHandelre(parsedGameState);
                }
                else if (parsedGameState.gamestate.map != undefined){
             
                    drawMaze(parsedGameState.gamestate.map);
                    if(parsedGameState.gamestate.symbol === "L"){
                        if(parsedGameState.gamestate.id == window.dataUserGame.id)
                            LplayerControl.style.display = "flex";
             
                        img_l_player.src = parsedGameState.gamestate.player_container.img;
                        player2_score.textContent = parsedGameState.gamestate.Lscore;
                        updateScore(parsedGameState.gamestate.Lscore , "FillLshape" , maxScore);

                    }
                    else if(parsedGameState.gamestate.symbol === "R"){
                        if(parsedGameState.gamestate.id == window.dataUserGame.id)
                            RplayerControl.style.display = "flex";

                        img_r_player.src = parsedGameState.gamestate.player_container.img;
                        player1_score.textContent = parsedGameState.gamestate.Rscore;
                        updateScore(parsedGameState.gamestate.Rscore , "FillRshape" , maxScore);

                    }
                    Game_over(parsedGameState.gamestate , socket);
            }
            else{
                parsedGameState = gameState.gamestate;
            }
        }
        }
    };
}

async function GameStateHandelre(parsedGameState) {
  Rplayer_img.style.display = "flex";
  Rplayer_name.style.display = "flex";
  Lplayer_img.style.display = "flex";
  Lplayer_name.style.display = "flex";
  waiting_L.style.display = "none";
  waiting_R.style.display = "none";
  await delay(2000);
  level_div.style.display = "none";
  main_div.style.display = "flex";
  drawMaze(parsedGameState.map);
}

function LocalGame_over(map , players , socket)
{
    if(!map.flat().includes('C'))
        {
            main_div.style.display = "none";
            socket.close()
            window.whyExist = "game_over";
        }
}

function Game_over(game_state, socket) {
  if (game_state.result) {
            if(game_state.result === "Rplayer Win")
            {
                if (game_state.id == window.dataUserGame.id)
                {
                    result_text.textContent = "Winner";

                }
                else
                {
                    result_text.textContent = "Loser";
                }
            }
            else if(game_state.result === "Lplayer Win")
            {
                if (game_state.id == window.dataUserGame.id)
                {

        result_text.textContent = "Winner";
      } else {
        result_text.textContent = "Loser";
      }
    } else if (game_state.result === "Draw") {
      result_text.textContent = "Draw";
    }
    level_div.style.display = "flex";
    result_div.style.display = "flex";
    vs_div.style.display = "none";
    main_div.style.display = "none";
    socket.close();
    window.whyExist = "game_over";
  }
}

function drawMaze(map) {
    const cellSize = 25;
    maze_canvas.width = map[0].length * cellSize;
    maze_canvas.height = map.length * cellSize;

    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[0].length; j++) {
            const cell = map[i][j];

            if (cell === 'L' || cell === 'R') {
                ctx.save();
                ctx.shadowColor = '#02eb98';
                ctx.shadowBlur = 5;
                ctx.shadowOffsetX = 1;
                ctx.shadowOffsetY = 1;

                ctx.beginPath();
                ctx.arc(
                    j * cellSize + cellSize / 2,
                    i * cellSize + cellSize / 2,
                    cellSize / 4,
                    0,
                    2 * Math.PI
                );
                ctx.fillStyle = '#f0f3f4';
                ctx.fill();

                ctx.restore();
            } else if (cell === 'C') {
                ctx.save();
                ctx.shadowColor = 'rgba(255, 255, 255, 1)';
                ctx.shadowBlur = 2;
                ctx.shadowOffsetX = 1;
                ctx.shadowOffsetY = 1;
                ctx.translate(j * cellSize, i * cellSize); 
                ctx.scale(cellSize / 150, cellSize / 150); 

                ctx.beginPath();
                ctx.moveTo(75, 40);
                ctx.bezierCurveTo(75, 37, 70, 25, 50, 25);
                ctx.bezierCurveTo(20, 25, 20, 62.5, 20, 62.5);
                ctx.bezierCurveTo(20, 80, 40, 102, 75, 120);
                ctx.bezierCurveTo(110, 102, 130, 80, 130, 62.5);
                ctx.bezierCurveTo(130, 62.5, 130, 25, 100, 25);
                ctx.bezierCurveTo(85, 25, 75, 37, 75, 40);
                ctx.fillStyle = '#02eb98';
                ctx.fill();

                ctx.restore();
            } else if (cell === '1') {
                ctx.save();
                ctx.shadowColor = '#02eb98';
                ctx.shadowBlur = 10;
                ctx.shadowOffsetX = 0;
                ctx.shadowOffsetY = 0;

                ctx.fillStyle = colors['1'];
                ctx.fillRect(j * cellSize, i * cellSize, cellSize, cellSize);

                ctx.restore();
            }
        }
    }
}

