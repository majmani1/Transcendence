function pageVS_tournament(player1, player2) {
	let codeHtml = `
			
		<!-- </div> -->
		<div class="decoration1">
		</div>
		<div class="decoration2">
		</div>
		<div class="decoration3">
		</div>

		<div class="fullVs">

        <div class="playersVs">
            <div class="player1Vs leftVs">
                <div class="defaultPicture "></div>
                <div class="namePlayer1">${player1}</div>
            </div>
            <div class="tubeVs">
                <div class="pointPlayer1"></div>
                <div class="textVs"> VS </div>
                <div class="pointPlayer2"></div>
            </div>
            <div class="player1Vs rightVs">
                <div class="defaultPicture  "></div>
                <div class="namePlayer1">${player2}</div>
            </div>
			<div class="background">
        <span></span><span></span><span></span><span></span><span></span>
        <span></span><span></span><span></span><span></span>
      </div>
     
    </div>`;
	return codeHtml;
}
var playerNames = [];

var quarterFinals = ["", "", "", "", "", "", "", ""];
var semiFinals = ["", "", "", ""];
var finals = ["", ""];

function play() {
	const players = document.querySelectorAll(".player");
	playerNames = [];
	players.forEach(function (player) {
		playerNames.push(player.value);
	});

	for (let i = 0; i < playerNames.length; i++) {
		if (
			playerNames[i] === "" ||
			playerNames[i] === null ||
			playerNames[i].length < 3 ||
			playerNames[i].length > 8 ||
			playerNames.filter((item) => item === playerNames[i]).length > 1
		) {

			 window.createAlert("The name Should be unique and between 3 to 8 character", "alert_error");
			return;
		}
	}

	typeGame = "tournament";
	createSockets(3, "random", "null");

	function shuffleArray(array) {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
	}

	shuffleArray(playerNames);
	quarterFinals = playerNames;
	document.querySelector(".bodyS").innerHTML = pageTournament(
		playerNames,
		semiFinals,
		finals,
		""
	);
	window.Router.attachLinkListeners();

	// socket = new WebSocket(
	// 	`ws://127.0.0.1:3000/ws/tournament/?${typeGame}=${tokenUser}`
	// );
	if (window.socketGame.readyState === WebSocket.OPEN) {
		window.socketGame.send(JSON.stringify(playerNames));
	} else {
		// Wait for WebSocket to open before sending
		window.socketGame.addEventListener("open", function (event) {
			window.socketGame.send(JSON.stringify(playerNames));
		});
	}
}

function tournament(socket, typeGame) {
	// if (typeGame == "tournament")
	// 	document.querySelector(".bodyS").innerHTML = generateNames();
	// else {
	// 	console.log("tournamentRemote");
	// 	document.querySelector(".bodyS").innerHTML = pageTournament();
	// }

	// play()
	// console.log(typeGame);
	window.socketGame.onmessage = function (event) {
		const data = JSON.parse(event.data);
		// console.log(data);
		// document.querySelector(".bodyS").innerHTML = pageTournament(data);
	};
}

var startGameTournament = false;

function setEmpty(array, array2) {
	for (let i = 0; i < array.length; i++) {
		array2[i] = array[i];
	}
	return array2;
}
var sendToSpoody = async (P1, P2) => {
    var data = {
        sender:infos_user['id'],
        receiver:'spoody',
        msg:`Tournament next Round : ${P1} VS ${P2}`,
    }
    const response = await fetch(`https://${parsedUrl.hostname}:4443/chatContainer/MsgToSpoody/`,{
        method:'POST',
        headers : {
            'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify(data)
    })
    var resp = await fetch(`https://${parsedUrl.hostname}:4443/notif/`, {
        method: 'POST',
        headers : {
            'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({notif:'MsgToSpoody', receiver:infos_user['id'].toString(), sender:'spoody', msg:`Tournament next Round2 : ${P1} VS ${P2}`}),
    })
}

var waiting_replay_tournament = false;
var secore_P1 = 0;
var secore_P2 = 0;
async function infosTournoi(cordon) {
	if (cordon.showVs == true) {
		await sendToSpoody(cordon.player1_name, cordon.player2_name);
		document.querySelector(".bodyS").innerHTML = pageVS_tournament(
			cordon.player1_name,
			cordon.player2_name
		);
		showVs = true;
	} else {
		showVs = false;
	}
	if (cordon.showTable == true && cordon.startGame == true) {
		showTable = true;
		clicks = [];
		clicks.push({ letre: "x", player: tokenUser });
		window.socketGame.send(JSON.stringify(clicks));
		clicks = [];

		// alert("Game started"
		// console.log("llll");startGameTournament
		document.querySelector(".bodyS").innerHTML = pageTable();
		// document.
		document.querySelector(".afichage_score").textContent = `3`;
		window.Router.attachLinkListeners();
		document.querySelector(
			".you"
		).style.backgroundImage = `url(../img/defaultUser.png)`;
		document.querySelector(
			".other"
		).style.backgroundImage = `url(../img/defaultUser.png)`;
		//cordon.player1_avatar

		document.querySelector(".icon_chat").style.display = "none";
		document.querySelector(".icon_close").style.display = "none";
		document.querySelector(".icon_chat2").style.display = "none";
		document.querySelector(".icon_close2").style.display = "none";

		startGameTournament = true;
	}
	if (cordon.startGame == false) {
		startGameTournament = false;
	}
	if (cordon.startGame == true) aply_css(cordon);

	if (
		cordon.startGame == true &&
		(cordon.player1.score != secore_P1 || cordon.player2.score != secore_P2)
	) {
		// alert("score changed");
		changeBckroundTubeLocalTour(cordon);
	}
	if (cordon.showMap == true) {
		showTable = false;
		showMap = true;
		// console.log("show map");

		semiFinals = setEmpty(cordon.semiFinale, semiFinals);
		finals = setEmpty(cordon.finale, finals);
		// console.log("haa ", cordon.finale);
		document.querySelector(".bodyS").innerHTML = pageTournament(
			quarterFinals,
			semiFinals,
			finals,
			cordon.winner
		);
		window.Router.attachLinkListeners();
	} else {
		showMap = false;
	}
	if (cordon.finishing == true && waiting_replay_tournament == false) {
		console.log("finishing");
		// socket.close();
		startGameTournament = false;
		semiFinals = ["", "", "", ""];
		finals = ["", ""];

		// document.querySelector(".bodyS").innerHTML = generateNames();
		waiting_replay_tournament = true;
	}
}

function changeBckroundTubeLocalTour(cordon) {
	let percentage_win;

	if (cordon.player1.score == 0 && cordon.player2.score == 0) return;
	if (cordon.player1.score != secore_P1) {
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
	} else if (cordon.player2.score != secore_P2) {
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
	secore_P1 = cordon.player1.score;
	secore_P2 = cordon.player2.score;
}