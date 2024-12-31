function Page_already_inGame() {
	var codeHtml = `
	<button class="button_logout">
			<img class="logout" onclick="closeVs()" src="img/left-arrow 1.png" alt="" srcset="" />
		</button>
		<span class="already_inGame">nta kayn flGame</span>
	`;
	return codeHtml;
}

function pageVS() {
	// console.log(infos_user);
	var codeHtml = `

			          <div class="background">
        <span></span><span></span><span></span><span></span><span></span>
        <span></span><span></span><span></span><span></span>
      </div>
		<!-- </div> -->
		<button class="button_logout">
			 <img class="logout" onclick="closeVs()" src="img/left-arrow 1.png" alt="" srcset="" />
		</button>
		<div class="decoration1">
		</div>
		<div class="decoration2">
		</div>
		<div class="decoration3">
		</div>

		<div class="fullVs">

        <div class="playersVs">
            <div class="player1Vs leftVs">
                <div class="picturePlayer1"></div>
                <div class="namePlayer1">${infos_user.username}</div>
            </div>
            <div class="tubeVs">
                <div class="pointPlayer1 "></div>
                <div class="textVs"> VS </div>
                <div class="pointPlayer2"></div>
            </div>
            <div class="player1Vs rightVs">
                <div class="waiting "></div>
                <div class="namePlayer1 nameOther">Player 2</div>
            </div>
     
    </div>`;
	return codeHtml;
}

function retry(cordon) {
	var win_or_lose;
	if (tokenUser == cordon.playerExit) win_or_lose = "LOSE";
	else {
		win_or_lose = "WIN";
	}
	if (
		tokenUser == cordon.idPlayer1 &&
		cordon.player1.score > cordon.player2.score
	) {
		win_or_lose = "WIN";
	} else if (
		tokenUser == cordon.idPlayer1 &&
		cordon.player1.score < cordon.player2.score
	) {
		win_or_lose = "LOSE";
	}
	if (
		tokenUser == cordon.idPlayer2 &&
		cordon.player1.score < cordon.player2.score
	) {
		win_or_lose = "WIN";
	}
	if (
		tokenUser == cordon.idPlayer2 &&
		cordon.player1.score > cordon.player2.score
	) {
		win_or_lose = "LOSE";
	}

	var codeHtml = `
	

			          <div class="background">
        <span></span><span></span><span></span><span></span><span></span>
        <span></span><span></span><span></span><span></span>
      </div>
	  
    <!-- </div> -->
    <div class="decoration1">
    </div>
    <div class="decoration2">
    </div>
    <div class="decoration3">
    </div>
    <div class="fullRetry">
        <div class="PageRetry">
            <div class="profilRetry">
                <div class="pictureRetry ${win_or_lose}"></div>
                <div class="statusMatch text${win_or_lose}">YOU ${win_or_lose}</div>
            </div>
            <div class="choiseButton">
                <button class="homeButton">HOME</button>
                
                <button class="restart">RETRY</button>
            </div>
        </div>
    </div>
    <div class="popUp ">
        <div class="message_popUpR">user want to retry with you !</div>
        <div class="buttonPopup">
            <button class="buttonPop buttonRefuse">refuse</a></button>
            <button class="buttonPop buttonAccept restart">accept</button>

        </div>

    </div>
	
	 <div class="exit">
        <div class="message_popUp">khona khroj f7alo</div>

    </div>`;

	//retry_or_not
	return codeHtml;
}

function pageTable() {
	var codeHtml = `
					<button class="button_logout" onClick="button_logoutGame()" >
				     <img class="logout" src="img/home.png" alt="" srcset=""> </button>
					      <div class="background">
        <span></span><span></span><span></span><span></span><span></span>
        <span></span><span></span><span></span><span></span>
      </div>
					<div class="decoration1">
					</div>
					<div class="decoration2">
					</div>
					<div class="decoration3">
					</div>
					
					<div class="afichage_score"></div>
					
					<div class="game">

					     <div class="score">
            <div class="showMessage"></div>
            <div class="showMessage2"></div>
            <div class="fullPro">

                <div class="full_profile">
                    <div class="profile">
                        <img  class="icon_chat" src="img/chat on.png" alt="">
                        <img   class="icon_close" src="img/X_icone.png" alt="">
                         <div   class="img_profile you"  class="img_player"></div>
                    </div>
                    <div class="text_emojie">
                        <div class="text">
                            <img  class = "showMessages" src="img/chat.png" alt="" srcset="">

                        </div>
                        <div class="emojie">
                            <img  class = "show_emojies" src="img/proud.png" alt="" srcset="">
                        </div>
                    </div>
                    <div class="chat"></div>
                </div>
                    
                <h1 class="result_player1">0</h1>
                <span>Vs</span>
                <h1 class="result_player2">0</h1>
                <div class="full_profile">
                    <div class="profile">
					    <img  class="icon_chat2" src="img/chat on.png" alt="">
                        <img   class="icon_close2" src="img/X_icone.png" alt="">

                   <div   class="img_profile other"  class="img_player"></div>
                    
                </div>
				<div class="text_emojie2">
                        <div class="text">
                            <img  class = "showMessages2" src="img/chat.png" alt="" srcset="">

                        </div>
                        <div class="emojie">
                            <img  class = "show_emojies"2 src="img/proud.png" alt="" srcset="">
                        </div>
                    </div>
                <div class="chat2"></div>
                    </div>
                </div>
        </div>
					<div class="tubeAndTable">
						<div class="tubeSocer1">
							<span class="text_tube">you came close to winning</span>
						</div>
						<canvas class="table" ></canvas>
						<div class="tubeSocer2">
							<span class="text_tube">you came close to winning</span>
						</div>
					</div>
					</div>
					</div> 
        <script src="js/pages.js"></script>

					<script src="js/app.js"></script>
					// <script src="js/responsive.js"></script>
				`;
	return codeHtml;
}



function pageTournament(quarterFinals, semiFinals, final, winner) {
	var codeHtml = `
		<button class="button_logout" onClick="button_logoutGame()" >
				     <img class="logout" src="img/home.png" alt="" srcset=""> </button>
	       <div class="background">
        <span></span><span></span><span></span><span></span><span></span>
        <span></span><span></span><span></span><span></span>
      </div>
    <!-- </div> -->
    <div class="decoration1">
    </div>
    <div class="decoration2">
    </div>
    <div class="decoration3">
    </div>
    <div class="full">
        <div class="tournament">
            
            <div class="side1 bottomAnimation ">
                <div class="tour1  ">
                    <div class="players playerUp ">${quarterFinals[0]}</div>
                    <div class="players playerDown ">${quarterFinals[1]}</div> 
                </div>
                <div class="winner">
                    <div class="players playerWinner">${semiFinals[0]}</div>
                </div>
                <div class="demiFinal"></div>
                <div class="cercle exeption "></div>
            </div>

            <div class="side2 bottomAnimation">
                <div class="tour1 ">
                    <div class="players playerUp  "><span class="rotateName">${quarterFinals[4]}</span></div>
                    <div class="players playerDown"><span class="rotateName">${quarterFinals[5]}</span></div>
                </div>
                <div class="winner">
                    <div class="players playerWinner"><span class="rotateName">${semiFinals[2]}</span></div>
                </div>
                <div class="demiFinal"></div>

                <div class="cercle  "></div>
            </div>
            <div class="side3 topAnimation">
                <div class="tour1">
                    <div class="players playerUp">${quarterFinals[2]}</div>
                    <div class="players playerDown">${quarterFinals[3]}</div>
                </div>
                <div class="winner">
                    <div class="players playerWinner">${semiFinals[1]}</div>
                </div>
                <div class="demiFinal"></div>

                <div class="cercle  "></div>
            </div>
            <div class="final">
                <div class="tubeFinal">
                    <div class=" playerfinal playerFinalleft">${final[0]}</div>
                <div class="lineFinal"></div>

                    <div class=" playerWinnerFinal"> ${winner}</div>
                <div class="lineFinal"></div>

                    <div class=" playerfinal playerFinalRight">${final[1]}</div>
                    <img src="../img/crown.png" class="crown" alt="" srcset="">

                </div>
            </div>

            <div class="side4 topAnimation">
                <div class="tour1">
                    <div class="players playerUp"><span class="rotateName">${quarterFinals[6]}</span></div>
                    <div class="players playerDown"><span class="rotateName">${quarterFinals[7]}</span></div>
                </div>
                <div class="winner">
                    <div class="players playerWinner"><span class="rotateName">${semiFinals[3]}</span></div>
                </div>
                <div class="demiFinal"></div>

                <div class="cercle  "></div>
            </div>
        </div>
    </div>
    <script src="js/pages.js"></script>
    <script src="tournament.js"></script>
		<script src="js/app.js"></script>
    `;
	return codeHtml;
}

function generateNames() {
	var codeHtml = `
	<button class="button_logout">
			<a href="/LandingPage"><img class="logout"  src="img/left-arrow 1.png" alt="" srcset="" /></a>
		</button>
	<div class="setNames">
        <div class="names">
            <input type="text" class="player1 player" name="fname" value = "mouad" placeholder="enter name of player1" ><br>
            <input type="text" class="player2 player" name="lname" value = "mouhcine" placeholder="enter name of player2"><br>
            <input type="text" class="player3 player" name="lname" value = "mourad" placeholder="enter name of player3"><br>
            <input type="text" class="player4 player" name="lname" value = "hamza" placeholder="enter name of player4"><br>
            <input type="text" class="player5 player" name="fname" value = "khalifa" placeholder="enter name of player5" ><br>
            <input type="text" class="player6 player" name="lname" value = "younnes" placeholder="enter name of player6"><br>
            <input type="text" class="player7 player" name="lname" value = "youssef" placeholder="enter name of player7"><br>
            <input type="text" class="player8 player" name="lname" value = "anas" placeholder="enter name of player8"><br>
            <button class="play" onclick="play()"> PLAY </button>
        </div> 
    </div>
          <div class="background">
        <span></span><span></span><span></span><span></span><span></span>
        <span></span><span></span><span></span><span></span>
      </div>
    <!-- </div> -->
    <div class="decoration1">
    </div>
    <div class="decoration2">
    </div>
    <div class="decoration3">
    </div>

    <script src="js/pages.js"></script>
    <script src="pageTournament.js"></script>
    <script src="js/app.js"></script>;
    <script src="nameTournament.js"></script>`;
	return codeHtml;
}

var showMap = false;
var showTable = false;
var showVs = false;

var clicks = [];
function moves_player() {
	function add_move(status, key) {
		if (
			status == "down" &&
			clicks.find((clicks) => clicks.letre == key) == undefined
		) {
			// console.log(key);

			clicks.push({ letre: key, player: tokenUser });
			// console.log(clicks);
			window.socketGame.send(JSON.stringify(clicks));
		}
		if (status == "up") {
			clicks.splice(
				clicks.findIndex((click) => click.letre == key),
				1
			);

			window.socketGame.send(JSON.stringify(clicks));
		}
	}

	addEventListener("keydown", function (key) {
		if (window.socketGame == "null") return;
		if (
			showMap == true ||
			showVs == true ||
			(showTable == false && typeGame == "tournament") // hna kayn mochkil
		) {
			// console.log(showMap + "  " + showVs + "  " + showTable);
			return;
		}
		if (typeGame == "remote" && (key.key == "w" || key.key == "s")) {
			return;
		}

		if (
			key.key == "PageDown" ||
			key.key == "PageUp" ||
			key.key == "ArrowUp" ||
			key.key == "s" ||
			key.key == "w" ||
			key.key == "ArrowDown"
		)
			if (key.key == "ArrowUp" || key.key == "PageUp") add_move("down", "up");
			else if (key.key == "ArrowDown" || key.key == "PageDown")
				add_move("down", "down");
			else add_move("down", key.key);
	});

	addEventListener("keyup", function (key) {
		// aler(showMap);
		if (window.socketGame == "null") {
			// alert("window.socketGame == null");
			return;
		}

		// had shotable t9der dir chi mochkil

		if (
			showMap == true ||
			showVs == true ||
			(showTable == false && typeGame == "tournament")
		) {
			// alert("showMap == true || showVs == true || showTable == false");
			return;
		}

		if (
			key.key == "PageDown" ||
			key.key == "PageUp" ||
			key.key == "ArrowUp" ||
			key.key == "s" ||
			key.key == "w" ||
			key.key == "ArrowDown"
		) {
			if (key.key == "ArrowUp" || key.key == "PageUp") add_move("up", "up");
			else if (key.key == "ArrowDown" || key.key == "PageDown")
				add_move("up", "down");
			else add_move("up", key.key);
		}
	});

	var move_or_stop = "stop";
}

function aply_css(obj) {
	// console.log("OLOOKOKOM<DMDKMDJMDJMD");
	// console.log(obj);
	var table = document.querySelector(".table");
	if (table == null) {
		// console.log("tabla kama kayna ", obj.startGame);
		return;
	}
	if (obj.idPlayer2 == tokenUser) {
		table.style.transform = `scaleX(-1)`;
		// document.querySelector(".tubeAndTable").style.tronsform = `scaleX(-1)`;
		document.querySelector(".fullPro").style.flexDirection = "row-reverse";
		document.querySelector(".showMessage").style.marginLeft = "-0.8%";
	}
	table.width = 700;
	table.height = 350;
	// var table = document.querySelector(".table");
	document.querySelector(".result_player1").textContent = obj.player1.score;
	document.querySelector(".result_player2").textContent = obj.player2.score;
	const player1 = table.getContext("2d");
	const player2 = table.getContext("2d");
	const ball = table.getContext("2d");
	// table.height = 350;
	// table.width = 700;

	player1.fillStyle = "#02EB98";
	player2.fillStyle = "#02EB98";
	player1.fillRect(
		obj.player1.x,
		obj.player1.y,
		obj.player1.width,
		obj.player1.height
	);
	player2.fillRect(
		obj.player2.x,
		obj.player2.y,
		obj.player2.width,
		obj.player2.height
	);
	player1.stroke();
	ball.beginPath();
	ball.arc(obj.ball.x, obj.ball.y, obj.ball.width, 0, 2 * Math.PI);
	ball.fillStyle = "#02EB98 ";
	ball.fill();
}

var check = false;
window.socketGame = "null";
var idPlayer2;
var idPlayer1;
var startGame = false;

moves_player();
function restart_or_logout() {
	//   console.log("restart_or_logout");
	document.querySelector(".restart").addEventListener("click", function () {
		// console.log("restart");
		window.socketGame.send(JSON.stringify({ restart: true, player: tokenUser }));
		startGame == false;
	});
	document
		.querySelector(".buttonAccept")
		.addEventListener("click", function () {
			//   console.log("buttonAccept");
			window.socketGame.send(JSON.stringify({ restart: true, player: tokenUser }));
			startGame == false;
		});

	document
		.querySelector(".buttonRefuse")
		.addEventListener("click", function () {
			//   console.log("buttonRefuse");

			// document.querySelector(".bodyS").innerHTML = pageShoice();
			// window.Router.attachLinkListeners();
			check = false;
			secorChose = 0;
			secondes = 0;
			startGame = false;
			window.socketGame.close();
			window.socketGame = "null";
		});
	document.querySelector(".homeButton").addEventListener("click", function () {
		// console.log("homeButton");
		// socket.send(JSON.stringify({ restart: false, player: tokenUser }));
		// document.querySelector(".bodyS").innerHTML = pageShoice();
		// Router.attachLinkListeners();
		window.whyExist = "skip";

		// window.Router.navigateTo("/LandingPage");
		check = false;
		secorChose = 0;
		secondes = 0;
		startGame = false;
		socketGame.close();
		socketGame = "null";
		// all_scores = document.querySelector(".value_score");
	});

	document.querySelector(".buttonRefuse").addEventListener("click", function () {
		 
		window.whyExist = "skip";

		// window.Router.navigateTo("/LandingPage");
		check = false;
		secorChose = 0;
		secondes = 0;
		startGame = false;
		if (socketGame.readyState == WebSocket.OPEN)
			socketGame.close();
		socketGame = "null";
		// all_scores = document.querySelector(".value_score");
	});


	// document.querySelector(".continue").addEventListener("click", function () {
	// 	// alert("continue");
	// 	// console.log("continue");
	// 	// document.querySelector(".bodyS").innerHTML = pageShoice();
	// 	// window.Router.attachLinkListeners();
	// 	// console.log("continue");
	// 	// socket.send(JSON.stringify({ contunue: true, player: tokenUser }));
	// 	window.whyExist = "skip";
	// 	socketGame.close();
	// 	check = false;
	// 	socketGame = "null";
	// 	secorChose = 0;
	// 	secondes = 0;
	// 	startGame = false;
	// });
	// document.querySelector(".logout").addEventListener("click", function () {
	// console.log("logout");
	// 	socket.send(JSON.stringify({ restart: false, player: tokenUser }));
	// 	startGame == false;
	// });
}

var secoreP1 = 0;
var secoreP2 = 0;

var readyShowVs = false;

function picturePlayers(cordon) {
	if (tokenUser == cordon.idPlayer2) {
		document.querySelector(
			".other"
		).style.backgroundImage = `url(${infos_user.picture})`;
		var tmp;
		var tmpForm;
		if (
			tokenUser == cordon.idPlayer1 &&
			cordon.player1.infosOtherPlayer != "null"
		) {
			tmp = cordon.player2.infosOtherPlayer.picture;
			tmpForm = cordon.player2.infosOtherPlayer.from;
		} else if (
			tokenUser == cordon.idPlayer2 &&
			cordon.player2.infosOtherPlayer != "null"
		) {
			tmp = cordon.player1.infosOtherPlayer.picture;
			tmpForm = cordon.player1.infosOtherPlayer.from;
		}
		document.querySelector(".you").style.backgroundImage = `url(${tmp})`;
	} else {
		document.querySelector(
			".you"
		).style.backgroundImage = `url(${infos_user.picture})`;
		var tmp;
		var tmpForm;
		if (
			tokenUser == cordon.idPlayer1 &&
			cordon.player1.infosOtherPlayer != "null"
		) {
			tmp = cordon.player2.infosOtherPlayer.picture;
			tmpForm = cordon.player2.infosOtherPlayer.from;
		} else if (
			tokenUser == cordon.idPlayer2 &&
			cordon.player2.infosOtherPlayer != "null"
		) {
			tmp = cordon.player1.infosOtherPlayer.picture;
			tmpForm = cordon.player1.infosOtherPlayer.from;
		}
		document.querySelector(".other").style.backgroundImage = `url(${tmp})`;
	}
}

var showPictures = false;

var hideMessage1 = false;
var hideMessage2 = false;

function timeShow_message2() {
	if (document.querySelector(".showMessage2").style.display == "block") {
		hideMessage2 = false;
		document.querySelector(".showMessage2").style.display = "none";
	} else if (document.querySelector(".showMessage").style.display == "block") {
		document.querySelector(".showMessage2").style.display = "none";
		document.querySelector(".showMessage").style.display = "none";
	}
	// hideMessage1 = false;
	// document.querySelector(".showMessage").style.display = "none";
}

function timeShow_message1() {
	// hideMessage2 = false;
	hideMessage1 = false;
	document.querySelector(".showMessage").style.display = "none";
	// document.querySelector(".showMessage2").style.display = "none";
}

async function handleErrorInvite()
{
	if (window.idSender != "-1") {
		window.idSender = "-1";
	}
	
	try {
		resp = await fetch(`https://${parsedUrl.hostname}:4443/Authe/status_player_in_close/`, {
		  method: "POST",
		  headers: {
			"Content-Type": "application/json",
		  },
		  body: JSON.stringify({player_id: infos_user['id'], status: "out Game"}),
		});
	
	  } catch (error) {
		// window.createAlert(error.message);
	}
	// socketGame.close();
	if(window.socketGame && window.socketGame.readyState == WebSocket.OPEN)
		window.socketGame.close();
	window.socketGame = "null";

	window.Router.navigateTo("/LandingPage")
}

async function button_logoutGame() {
	// console.log("button_logoutGame");
	check = false;
	window.whyExist = "skip";
	secorChose = 0;
	secondes = 0;
	startGame = false;
	readyShowVs = false
	// typeGame = "null";
	if(window.socketGame.readyState == WebSocket.OPEN)
		window.socketGame.close();
	else
	{
		if (window.idSender != "-1") {
			window.idSender = "-1";
		}
		
		try {
			resp = await fetch(`https://${parsedUrl.hostname}:4443/Authe/status_player_in_close/`, {
			  method: "POST",
			  headers: {
				"Content-Type": "application/json",
			  },
			  body: JSON.stringify({player_id: infos_user['id'], status: "out Game"}),
			});
		
		  } catch (error) {
			// window.createAlert(error.message);
		}
		// window.socketGame.close();

		window.socketGame = "null";

		window.Router.navigateTo("/LandingPage")
	}

	window.socketGame = "null";
}

function infosMatchs(cordon) {
  	// console.log(cordon)           
	if (cordon.out == true) {
		window.whyExist = "exit Player2";
		check = false;
		secorChose = 0;
		secondes = 0;
		startGame = false;
		 if(window.socketGame.readyState == WebSocket.OPEN) window.socketGame.close();
		return;
		// window.Router.navigateTo("/LandingPage");
	}
	if (
		typeGame != "local" && typeGame != "null" && readyShowVs == false && (cordon.player1.infosOtherPlayer == "null" || cordon.player2.infosOtherPlayer == "null") // hadi  ra kama khass tkon ) || cordon.player2.infosOtherPlayer == "null"
	) {
		// console.log(window.dataUserGame)
		// console.log(readyShowVs)
		// console.log()
		
		if (inviteGame == false)
		 	 readyShowVs = true; //7ayadt hadi o dartha fach kaybda lmatch
		// alert("null");
		if (window.socketGame != "null") {
			window.socketGame.send(
				JSON.stringify({ infos_user: window.dataUserGame, player: tokenUser })
			);
		}
	}
	// socket.send(JSON.stringify({ restart: false, player: tokenUser }));
	if (cordon.showVs == true && readyShowVs == true && cordon.player1.infosOtherPlayer != "null" && cordon.player2.infosOtherPlayer != "null" // o hadi khass tkon && machi ||
		
	) {
		// if (typeGame == "friendGame" || typeGame == "AcceptGame") {
		// 	document.querySelector(".bodyS").innerHTML = pageVS();
		// 	typeGame = "remote";
		// 	window.Router.attachLinkListeners();
		// }
		var tmpForm;
		var usernameOther;
		var tmp;
		if (
			tokenUser == cordon.idPlayer1 &&
			cordon.player1.infosOtherPlayer != "null"
		) {
			tmp = cordon.player2.infosOtherPlayer.picture;
			tmpForm = cordon.player2.infosOtherPlayer.from;
			usernameOther = cordon.player2.infosOtherPlayer.username;
		} else if (
			tokenUser == cordon.idPlayer2 &&
			cordon.player2.infosOtherPlayer != "null"
		) {
			tmp = cordon.player1.infosOtherPlayer.picture;
			tmpForm = cordon.player1.infosOtherPlayer.from;
			usernameOther = cordon.player1.infosOtherPlayer.username;
		}
		if (document.querySelector(".waiting") != null) {
			document.querySelector(".waiting").classList.add("picturePlayer2");
			document.querySelector(
				".picturePlayer2"
			).style.backgroundImage = `url(${tmp})`;
			document.querySelector(".nameOther").textContent = usernameOther;
		}
	}
	if (
		startGame == "finish" &&
		((tokenUser != cordon.idPlayer2 && cordon.player2.restart == true) ||
			(tokenUser != cordon.idPlayer1 && cordon.player1.restart == true))
	) {
		document.querySelector(".popUp").classList.add("retry_or_not");
		startGame = "wait";
	}

	if (cordon.startGame == "end" || cordon.playerExit != -1) {
		if (startGame == true) {
			if (typeGame == "local") {
				window.whyExist = "skip";
				check = false;
				secorChose = 0;
				secondes = 0;
				startGame = false;
				window.lastLoca = "";
				window.socketGame.close();
				window.socketGame = "null";

				return;
			}

			document.querySelector(".bodyS").innerHTML = retry(cordon);
			window.Router.attachLinkListeners();

			startGame = "finish";
			document.querySelector(
				".pictureRetry"
			).style.backgroundImage = `url(${infos_user.picture})`;
			restart_or_logout();
		}
		if (cordon.playerExit != -1 && cordon.playerExit != tokenUser) {
			document.querySelector(".exit").classList.add("retry_or_not");
		}
		return;
	}
	if (
		(cordon.player1.infosOtherPlayer != "null" && cordon.player2.infosOtherPlayer != "null" && startGame == false && cordon.startGame == true) ||
		(typeGame == "local" && startGame == false) // hna khass tkon startGame == true
	) {
		readyShowVs = true;
		// console.log("SF TABLA RA BANT tabla");
		// console.log("*******************************")
		// console.log("*******************************")
		// console.log("*******************************")
		// console.log("*******************************")
		// console.log(cordon.player1.infosOtherPlayer, cordon.player2.infosOtherPlayer)
		// console.log(typeGame + "  " + startGame + "  " + cordon.startGame);
		idPlayer2 = cordon.idPlayer2;
		idPlayer1 = cordon.idPlayer1;

		startGame = true;
		document.querySelector(".bodyS").innerHTML = pageTable();
		window.Router.attachLinkListeners();
		showTableFunction();
		document.querySelector(
			".afichage_score"
		).textContent = `${cordon.scoreGame}`;
		if (typeGame != "local") {
			picturePlayers(cordon);
		} else {
			document.querySelector(
				".you"
			).style.backgroundImage = `url(../img/defaultUser.png)`;
			document.querySelector(
				".other"
			).style.backgroundImage = `url(../img/defaultUser.png)`;
		}
	}

	if (
		typeGame != "local" &&
		startGame == true &&
		showPictures == false &&
		cordon.player1.infosOtherPlayer != "null" &&
		cordon.player2.infosOtherPlayer != "null"
	) {
		showPictures = true;
		picturePlayers(cordon);
		// console.log("hna");
	}
	if (startGame == "wait" && cordon.startGame == "restart") {
		startGame = true;
		document.querySelector(".bodyS").innerHTML = pageTable();
		window.Router.attachLinkListeners();
		showTableFunction();
		showPictures = false;

		document.querySelector(
			".afichage_score"
		).textContent = `${cordon.scoreGame}`;

		picturePlayers(cordon);
		if (document.querySelector(".popUp") != null)
			document.querySelector(".popUp").classList.remove("retry_or_not");
	}
	if (startGame == true) aply_css(cordon);

	if (tokenUser == idPlayer2 && cordon.player2.message != "null") {
		document.querySelector(
			".showMessage2"
		).innerHTML = `<span class="messa2">${cordon.player2.message}</span>`;
		document.querySelector(".showMessage2").style.display = "block";
		hideMessage2 = true;
		// hideChat();
	} else if (
		hideMessage2 == true &&
		tokenUser == idPlayer2 &&
		cordon.player2.message == "null"
	) {
		// document.querySelector(".showMessage2").style.display = "none";
		// alert("null");
		hideMessage2 = false;

		const myTimeout = setTimeout(timeShow_message2, 4500);
	}

	if (tokenUser == idPlayer1 && cordon.player1.message != "null") {
		document.querySelector(
			".showMessage2"
		).innerHTML = `<span class="messa">${cordon.player1.message}</span>`;
		document.querySelector(".showMessage2").style.display = "block";
		// hideChat();
		hideMessage1 = true;

		// const myTimeout = setTimeout(timeShow_message2, 4500);
	} else if (
		hideMessage1 == true &&
		tokenUser == idPlayer1 &&
		cordon.player1.message == "null"
	) {
		// document.querySelector(".showMessage2").style.display = "none";
		hideMessage1 = false;
		const myTimeout = setTimeout(timeShow_message2, 4500);
	}

	if (
		startGame == true &&
		typeGame == "local" &&
		(cordon.player1.score != secoreP1 || cordon.player2.score != secoreP2)
	) {
		changeBckroundTubeLocal(cordon);
	} else if (
		startGame == true &&
		(cordon.player1.score != secoreP1 || cordon.player2.score != secoreP2)
	) {
		// console.log("3lach kay dkhol hna");

		changeBckroundTube(cordon);
	}
}
function changeBckroundTubeLocal(cordon) {
	let percentage_win;
	if (cordon.player1.score != secoreP1) {
		percentage_win = (cordon.player1.score * 100) / cordon.scoreGame;
		document.querySelector(
			".tubeSocer1"
		).style.cssText = `background: linear-gradient( 0deg, #02EB98 ${percentage_win}%, transparent 40%);
			box-shadow:
			0 0 0vw 0vw #02EB98,
			0 0 2vw 0.4vw #099e6a,
			inset 0 0 .1vw 0.01vw #02EB98,
			inset 0 0 .2vw 0.2vw #00ac70,
			inset 0 0 .25vw 0.2vw #027b50;
			display:block;`;
	} else if (cordon.player2.score != secoreP2) {
		percentage_win = (cordon.player2.score * 100) / cordon.scoreGame;
		document.querySelector(
			".tubeSocer2"
		).style.cssText = `background: linear-gradient( 0deg, #02EB98 ${percentage_win}%, transparent 40%);
			box-shadow:
			0 0 0vw 0vw #02EB98,
			0 0 2vw 0.4vw #099e6a,
			inset 0 0 .1vw 0.01vw #02EB98,
			inset 0 0 .2vw 0.2vw #00ac70,
			inset 0 0 .25vw 0.2vw #027b50;
			display:block;`;
	}
	secoreP1 = cordon.player1.score;
	secoreP2 = cordon.player2.score;
}

function changeBckroundTube(cordon) {
	let percentage_win;
	if (cordon.idPlayer1 == tokenUser)
		percentage_win = (cordon.player1.score * 100) / cordon.scoreGame;
	else if (cordon.idPlayer2 == tokenUser)
		percentage_win = (cordon.player2.score * 100) / cordon.scoreGame;

	secoreP1 = cordon.player1.score;
	secoreP2 = cordon.player2.score;
	if (percentage_win > 0) {
		document.querySelector(
			".tubeSocer1"
		).style.cssText = `background: linear-gradient( 0deg, #02EB98 ${percentage_win}%, transparent 40%);
			box-shadow:
			0 0 0vw 0vw #02EB98,
			0 0 2vw 0.4vw #099e6a,
			inset 0 0 .1vw 0.01vw #02EB98,
			inset 0 0 .2vw 0.2vw #00ac70,
			inset 0 0 .25vw 0.2vw #027b50;
			display:block;`;
	}

	let percentage_win2;
	if (cordon.idPlayer1 == tokenUser)
		percentage_win2 = (cordon.player2.score * 100) / cordon.scoreGame;
	else if (cordon.idPlayer2 == tokenUser)
		percentage_win2 = (cordon.player1.score * 100) / cordon.scoreGame;

	//   console.log(percentage_win2);
	if (percentage_win2 > 0) {
		document.querySelector(
			".tubeSocer2"
		).style.cssText = `background: linear-gradient( 0deg, #02EB98 ${percentage_win2}%, transparent 40%);
			box-shadow:
			0 0 0vw 0vw #02EB98,
			0 0 2vw 0.4vw #099e6a,
			inset 0 0 .1vw 0.01vw #02EB98,
			inset 0 0 .2vw 0.2vw #00ac70,
			inset 0 0 .25vw 0.2vw #027b50;
			display:block;`;
	}
}