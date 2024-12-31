var accessToken = getCookiee("access_token");
var infos_user = window.dataUserGame;
//parseJwt(accessToken);

// if (window.lastLocation != "game") {
// 	window.lastLocation = "game";
// }

// alert(window.lastLocation);
var game = document.querySelector(".game");
var all_scores = document.querySelector(".value_score");
var chose_score = document.querySelector(".chose_score");
var afichage_score = document.querySelector(".afichage_score");
var crown1 = document.querySelector(".crown1");
var crown2 = document.querySelector(".crown2");
window.socketGame = "null"
function showTableFunction() {
	// Selector(".icon_close");
	//--------------------------- emojies ---------------------------
	var tubeSocer1 = document.querySelector(".tubeSocer1");
	var tubeSocer2 = document.querySelector(".tubeSocer2");
	// var show_emojies = document.querySelector(".show_emojies");

	var text_emojie = document.querySelector(".text_emojie");
	var chat = document.querySelector(".chat");
	var show = false;
	var icon_chat = document.querySelector(".icon_chat");
	var icon_close = document.querySelector(".icon_close");

	var text_emojie2 = document.querySelector(".text_emojie2");
	var chat2 = document.querySelector(".chat2");
	var icon_chat2 = document.querySelector(".icon_chat2");
	var icon_close2 = document.querySelector(".icon_close2");

	if (typeGame == "local" || typeGame == "tournament") {
		icon_chat.style.display = "none";
		icon_close.style.display = "none";
		icon_chat2.style.display = "none";
		icon_close2.style.display = "none";
	}
	if (idPlayer2 == tokenUser) {
		icon_chat.style.display = "none";
		icon_close.style.display = "none";
	} else {
		icon_chat2.style.display = "none";
		icon_close2.style.display = "none";
	}
	function showChat(y) {
		if (y == 1) {
			text_emojie.style.visibility == "hidden";
			icon_chat.style.visibility = "hidden";
			icon_close.style.visibility = "visible";
			text_emojie.style.visibility = "visible";
			// alert("HAAAAAAAAAAAAAa")
		} else {
			text_emojie2.style.visibility == "hidden";
			icon_chat2.style.visibility = "hidden";
			icon_close2.style.visibility = "visible";
			// chat.style.visibility = "visible";
			text_emojie2.style.visibility = "visible";
		}
		showEmojies(y);
	}

	function showMessages(y) {
		if (y == 1) {
			chat.style.opacity = "1";

			chat.innerHTML = "";

			var message = [
				"Hello",
				"Hi",
				"Siuuuu",
				"How are you",
				"Fine",
				"And you",
				"Fine",
				"Thanks",
				"You are welcome",
				"Bye",
				"goodbye",
			];
			for (var i = 0; i < message.length; i++) {
				chat.innerHTML += `<label class="message">${message[i]}</label>`;
			}
		} else {
			chat2.style.opacity = "1";

			chat2.innerHTML = "";

			var message = [
				"Hello",
				"Hi",
				"Siuuuu",
				"How are you",
				"Fine",
				"And you",
				"Fine",
				"Thanks",
				"You are welcome",
				"Bye",
				"goodbye",
			];
			for (var i = 0; i < message.length; i++) {
				chat2.innerHTML += `<label class="message">${message[i]}</label>`;
			}
		}
	}

	var emojie = [
		"😉",
		"😂",
		"😅",
		"😮‍💨",
		"😤",
		"🤬",
		"🫣",
		"🫡",
		"🤔",
		"😭",
		"🥲",
		"😎",
		"🤝",
		"🔥",
		"❤️",
		"🏆",
	];

	function showEmojies(y) {
		if (y == 1) {
			chat.style.opacity = "1";

			chat.innerHTML = "";
			show = true;

			for (var i = 0; i < emojie.length; i++) {
				chat.innerHTML += `<span class="pic_emojies">${emojie[i]}</span>`;
			}
		} else {
			chat2.style.opacity = "1";

			chat2.innerHTML = "";
			show = true;

			for (var i = 0; i < emojie.length; i++) {
				chat2.innerHTML += `<span class="pic_emojies">${emojie[i]}</span>`;
			}
		}
	}

	function hideChat(y) {
		if (y == 1) {
			chat.style.opacity = "0";
			chat.innerHTML = "";
			text_emojie.style.visibility = "hidden";
			icon_chat.style.visibility = "visible";
			icon_close.style.visibility = "hidden";
		} else {
			chat2.style.opacity = "0";
			chat2.innerHTML = "";
			text_emojie2.style.visibility = "hidden";
			icon_chat2.style.visibility = "visible";
			icon_close2.style.visibility = "hidden";
		}
	}
	var all_emojies = document.querySelector(".chat");

	all_emojies.addEventListener("click", function (event) {
		if (event.target.classList.contains("pic_emojies")) {
			showMessage.innerHTML = `<span class="messa">${event.target.textContent}</span>`;
			// showMessage2.innerHTML = `<span class="messa2">${event.target.textContent}</span>`;
			if (window.socketGame != "null")
				window.socketGame.send(
					JSON.stringify({
						message: event.target.textContent,
						player: tokenUser,
					})
				);

			showMessage.style.display = "block";
			// showMessage2.style.display = "block";
			hideChat(1);
			const myTimeout = setTimeout(timeShow_message, 4500);
		}
	});

	var all_emojies2 = document.querySelector(".chat2");

	all_emojies2.addEventListener("click", function (event) {
		if (event.target.classList.contains("pic_emojies")) {
			// showMessage.innerHTML = `<span class="messa">${event.target.textContent}</span>`;
			showMessage.innerHTML = `<span class="messa2">${event.target.textContent}</span>`;
			if (window.socketGame != "null")
				window.socketGame.send(
					JSON.stringify({
						message: event.target.textContent,
						player: tokenUser,
					})
				);
			// showMessage.style.display = "block";
			showMessage.style.display = "block";
			hideChat(2);
			const myTimeout = setTimeout(timeShow_message, 4500);
		}
	});

	var showMessage = document.querySelector(".showMessage");
	var showMessage2 = document.querySelector(".showMessage2");

	var all_messages = document.querySelector(".chat");

	all_messages.addEventListener("click", function (event) {
		if (event.target.classList.contains("message")) {
			showMessage.innerHTML = `<span class="messa">${event.target.textContent}</span>`;
			// showMessage2.innerHTML = `<span class="messa">${event.target.textContent}</span>`;
			if (window.socketGame != "null")
				window.socketGame.send(
					JSON.stringify({
						message: event.target.textContent,
						player: tokenUser,
					})
				);
			showMessage.style.display = "block";
			// showMessage2.style.display = "block";
			hideChat(1);
			const myTimeout = setTimeout(timeShow_message, 4500);
		}
	});

	var all_messages2 = document.querySelector(".chat2");

	all_messages2.addEventListener("click", function (event) {
		if (event.target.classList.contains("message")) {
			showMessage2.innerHTML = `<span class="messa">${event.target.textContent}</span>`;

			if (window.socketGame != "null")
				window.socketGame.send(
					JSON.stringify({
						message: event.target.textContent,
						player: tokenUser,
					})
				);
			// showMessage.style.display = "block";
			showMessage2.style.display = "block";
			hideChat(2);
			const myTimeout = setTimeout(timeShow_message, 4500);
		}
	});

	function timeShow_message() {
		showMessage.style.display = "none";
		showMessage2.style.display = "none";
	}

	document.querySelector(".icon_chat").addEventListener("click", function () {
		showChat(1);
	});
	document.querySelector(".icon_close").addEventListener("click", function () {
		hideChat(1);
	});
	document
		.querySelector(".showMessages")
		.addEventListener("click", function () {
			showMessages(1);
		});
	document
		.querySelector(".show_emojies")
		.addEventListener("click", function () {
			showEmojies(1);
		});

	document.querySelector(".icon_chat2").addEventListener("click", function () {
		showChat(2);
	});
	document.querySelector(".icon_close2").addEventListener("click", function () {
		hideChat(2);
	});
	document
		.querySelector(".showMessages2")
		.addEventListener("click", function () {
			showMessages(2);
		});
	document
		.querySelector(".show_emojies")
		.addEventListener("click", function () {
			showEmojies(2);
		});

	// -------------------------------------------------------------
	var table = document.querySelector(".table");

	table.addEventListener("animationend", () => {
		// Apply box-shadow styles after the animation completes
		table.style.cssText = `box-shadow:
            0 0 0vw 0vw #02EB98,
            0 0 2vw 0.4vw #099e6a,
            inset 0 0 .1vw 0.01vw #02EB98,
            inset 0 0 .2vw 0.2vw #00ac70,
            inset 0 0 .25vw 0.2vw #027b50;
            display:block;`;

		tubeSocer1.style.cssText = `box-shadow:
    0 0 0vw 0vw #02EB98,
    0 0 2vw 0.4vw #099e6a,
    inset 0 0 .1vw 0.01vw #02EB98,
    inset 0 0 .2vw 0.2vw #00ac70,
    inset 0 0 .25vw 0.2vw #027b50;
    display:block;`;
		tubeSocer2.style.cssText = `box-shadow:
    0 0 0vw 0vw #02EB98,
    0 0 2vw 0.4vw #099e6a,
    inset 0 0 .1vw 0.01vw #02EB98,
    inset 0 0 .2vw 0.2vw #00ac70,
    inset 0 0 .25vw 0.2vw #027b50;
    display:block;`;
		play_or_pause = "play";
	});
}
// console.log("=======================");
// console.log(window.dataUserGame, " ", infos_user["id"]);
// console.log("=======================");

// console.log("-----------------------------------");
// console.log("-----------------------------------");

var tokenUser = infos_user["id"];

// console.log("img     ", infos_user.picture.substr(10));
// console.log("imgggg     ", infos_user.picture);

var typeGame = window.location.href.split("/")[3];
var inviteGame = false
function pageShoice() {
	var codeHtml = `
	
			<a href="/LandingPage" class="button_logout"><img class="logout"  src="img/left-arrow 1.png" alt="" srcset="" /></a>
		<div class="chose_score">
			<img src="img/character.png" alt="" srcset="" />
			<div class="value_score">
				<span> Set the number of rounds</span>
				<button class="value value1" onclick="scores(3)">3</button>
				<button class="value value2" onclick="scores(7)">7</button>
				<button class="value value3" onclick="scores(11)">11</button>
			</div>
		</div>
		<!-- <button class="remote">remote</button>
		<button class="tournament">tournament</button> -->
		
		      <div class="background">
        <span></span><span></span><span></span><span></span><span></span>
        <span></span><span></span><span></span><span></span>
      </div>
		<div class="decoration1"></div>
		<div class="decoration2"></div>
		<div class="decoration3"></div>

		<script src="js/pages.js"></script>
		<script src="js/tournament.js"></script>
		<script src="js/app.js"></script>`;
	window.Router.attachLinkListeners();
	return codeHtml;
}


function pageErrorInviteGame() {
	var codeHtml = `
	
	<div class ="fullError">
        <p class="fullErrorText">An error occurred, try again later.</p>
        <button class="fullErrorButton" onClick="button_logoutGame()">Go To Home</button>
    </div>`;
	window.Router.attachLinkListeners();
	return codeHtml;
}



if (typeGame == "friendGame" || typeGame == "AcceptGame")
{
	document.querySelector(".bodyS").innerHTML = pageErrorInviteGame();
}

if (typeGame == "remote" || typeGame == "local") {
	// alert(typeGame);
	// console.log(typeGame);
	document.querySelector(".bodyS").innerHTML = pageShoice();
	window.Router.attachLinkListeners();
}

function parsePicture(picture, from) {
	let img;
	img = "https://" + picture.substr(10);
	return img;
}

function closeVs() {
	// document.querySelector(".bodyS").innerHTML = pageShoice();
	// if (socket != "null") socket.close();
	check = false;
	window.whyExist = "remote";
	secorChose = 0;
	secondes = 0;
	startGame = false;
	if (window.socketGame.readyState == WebSocket.OPEN) 
		window.socketGame.close();
	window.socketGame = "null";
	// window.Router.navigateTo("/remote");
	// window.location.href = "/remote";
}
// console.log("typeGame", typeGame);

var secondes = 0;
var secorChose = 0;

function createSockets(score, typeInvite, idSender) {
	window.lastloca = "game";
	typeGame = window.location.href.split("/")[3];
	// console.log("TypeGame +++++++++++ ", typeGame);
	if (typeInvite == "Lets Play") {
		// console.log("safi khassna nla3bo am3alem ", window.idSender);
		typeGame = "friendGame";
		inviteGame = true
		// alert(window.idSender);
		window.idSender = "-1"
		if (window.socketGame != "null" && window.socketGame.readyState == WebSocket.OPEN)
		{
			
			window.socketGame.close()
		}
		window.socketGame = new WebSocket(
			`wss://${parsedUrl.hostname}:4443/ws/index/?${typeGame.toString()}=${tokenUser.toString()}=${
				window.idSender
			}`
		);

		// typeGame = "remote";
		// window.idSender = undefined;
		// return;
	}
	if (typeInvite == "invite") {
		inviteGame = true
		typeGame = "friendGame";
		score = 3;
		// alert(window.idSender);
		// console.log("/*/-/*-/*/*/-/-*/-/-*/-/*-/*")
		// console.log("AHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
		// console.log("/*/-/*-/*/*/-/-*/-/-*/-/*-/*")
		if (window.socketGame.readyState == WebSocket.OPEN)
		{
			
			window.socketGame.close()
		}
		window.socketGame = new WebSocket(
			`wss://${parsedUrl.hostname}:4443/ws/index/?${typeGame.toString()}=${tokenUser.toString()}=${window.idSender.toString()}`
		);

		// typeGame = "remote";

		// window.idSender = undefined;
	}
	var table = document.querySelector(".table");

	var showMessage = document.querySelector(".showMessage");
	if (typeInvite == "random") {
		// console.log(typeGame);
		if (typeGame == "tournament" || typeGame == "tournamentRemote") {
			// console.log("goood", typeGame);
			if (typeGame == "tournament") {
				window.socketGame = new WebSocket(
					`wss://${parsedUrl.hostname}:4443/ws/tournament/?${typeGame}=${tokenUser}`
				);
			}
		 
			// if (typeGame == "tournament") tournament(socket, typeGame);
		} else {
			window.socketGame = new WebSocket(
				`wss://${parsedUrl.hostname}:4443/ws/index/?${typeGame}=${tokenUser.toString()}=${score}`
			);
		}
	}
	window.socketGame.onclose = async function (event) {
		// alert("whyExist");
		window.socketGame = "null";

		// try {
		// 	resp = await fetch(`https://${parsedUrl.hostname}:4443/Authe/status_player_in_close/`, {
		// 	  method: "POST",
		// 	  headers: {
		// 		"Content-Type": "application/json",
		// 	  },
		// 	  body: JSON.stringify({player_id: infos_user['id'], status: "out Game"}),
		// 	});
		
		//   } catch (error) {
		// 	// window.createAlert(error.message);
		// }

		// console.log("*************************")
		// console.log(window.whyExist)
		// console.log("*************************")
		if (window.idSender != "-1") {
			window.idSender = "-1";
		}
		if (window.whyExist == "exit Player2")
			window.whyExist = "Your friend leave the game";

		else if (window.whyExist != "" && window.whyExist != "skip" && window.whyExist != "remote")
			window.whyExist = "Error while establish connection";
		else if (window.whyExist == "remote") {
			window.Router.navigateTo("/remote");
			return;
		}
		window.Router.navigateTo("/LandingPage");
		// 		document.querySelector(".bodyS").innerHTML += `
		//     <div class="exit">
		//         <div class="message_popUp retry_or_not">The user has exited successfully</div>
		//     </div>
		// `;

		// if (event.code == 1001)
		// 	alert("The game is already started, please wait for the next game");
		// document.querySelector(".bodyS").innerHTML = Page_already_inGame();
		// console.log("Socket Closed Connection: ", event);
	};

	window.socketGame.onmessage = function (event) {
		const message = event.data;
		var cordon = JSON.parse(message);

		if (typeGame != "tournament") {
			infosMatchs(cordon);
		} else {
			infosTournoi(cordon);
		}
	};
}

if (typeGame == "friendGame") {
	// console.log("friendGameEEEEEEEEEEEEEE");
	createSockets(3, "Lets Play", 3);
}

if (typeGame == "AcceptGame") {
	// console.log("AcceptGameEEEEEEEEEEEEEE");
	createSockets(3, "invite", 3);
	window.idSender = undefined;
}

function scores(y) {
	typeGame = window.location.href.split("/")[3];
	// console.log("test");
	if (typeGame == "remote") {
		document.querySelector(".bodyS").innerHTML = pageVS();
		window.Router.attachLinkListeners();

		window.document.querySelector(
			".picturePlayer1"
		).style.backgroundImage = `url(${infos_user.picture})`; //../img/avatar.jpg
	}
	createSockets(y, "random", "null");
}

function test() {
	// console.log("test");
}

// if (typeGame == "tournament" || typeGame == "tournamentRemote") {
// 	// socket = new WebSocket(
// 	// 	`ws://localhost:4443/ws/tournament/?${typeGamnothinge}=${tokenUser}`
// 	// );

// 	console.log("HADIII TOURNAMENT");
// 	createSockets(3, "random", "null");
// }