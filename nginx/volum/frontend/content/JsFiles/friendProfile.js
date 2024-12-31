async function Friend_List() {
  try {
    const resp = await fetch(
      `https://${parsedUrl.hostname}:4443/Authe/user/friend/list`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${getCookiee("access_token")}`,
          "Content-Type": "Application/json",
        },
      }
    );
    if (resp.status == 200) {
      const dataOfFriend = await resp.json();
      // console.log("dataOfFriend: " + dataOfFriend);
      return dataOfFriend;
    } else if (resp.status == 404) {
      const dataOfFriend = await resp.json();
      return null;
    } else {
      // alert("data cetch failed here!!!!!!");
    }
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}
async function createHistorySection(gameData, username) {
  // Select the parent element with the class name 'history'
  const historySection = document.querySelector(".history");

  // Create the main container section
  const vsContainer = document.createElement("section");
  vsContainer.className = "vs_container";
  vsContainer.title = gameData["typeGame"];
  
  // Create the first player div
  const player1 = document.createElement("div");
  player1.className = "player1";
  const player1Img = document.createElement("img");
  player1Img.src = gameData["pictureUser1"];
  player1Img.alt = gameData["username1"] + " profile picture";

  // Create the score and date span
  const scoreDateSpan = document.createElement("span");
  scoreDateSpan.innerHTML =
    gameData["score_player1"] +
    " - " +
    gameData["score_player2"] +
    "<br>" +
    gameData["date"].split("T")[0];
  // Create the second player div
  const player2 = document.createElement("div");
  player2.className = "player2";
  const player2Img = document.createElement("img");
  player2Img.src = gameData["pictureUser2"];
  player2Img.alt = gameData["username2"] + " profile picture";
  // console.log("username: ", username, " ", gameData["username1"]);
  if (gameData["username1"] != username) {
    player1Img.onclick = function () {
      window.Router.navigateTo("/profile-" + gameData["username1"]);
    };
  } else {
    player2Img.onclick = function () {
      window.Router.navigateTo("/profile-" + gameData["username2"]);
    };
  }
  player1.appendChild(player1Img);
  player2.appendChild(player2Img);
  // Append everything to the main container
  vsContainer.appendChild(player1);
  vsContainer.appendChild(scoreDateSpan);
  vsContainer.appendChild(player2);

  if (gameData["score_player1"] > gameData["score_player2"]) {
    player1Img.style.border = " 3px solid var(--border-color)";
    player2Img.style.border = " 3px solid red";
  } else {
    player2Img.style.border = " 3px solid var(--border-color)";
    player1Img.style.border = " 3px solid red";
  }
  // Append the vsContainer to the history section
  historySection.appendChild(vsContainer);
}

async function createHistrory() {
  try {
    var accessToken = getCookiee("access_token");
    const usernameFriend = window.location.pathname.split("profile-")[1];
    const dataOfFriend = await Friend_List();
    var dataOfUser = dataOfFriend.filter(
      (user) => user["username"] == usernameFriend
    );
    // console.log("dataOfUser-->: ", dataOfUser[0]["id"]);
    var dataMine = await parsNewJWT();
    // console.log("access: ", accessToken);
    const response = await fetch(
      `https://${parsedUrl.hostname}:4443/gameHistory/${dataOfUser[0]["id"]}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "Application/json",
        },
      }
    );
    const data = await response.json();
    // console.log("Errrror:   ", data);
    data.forEach((gameData) => {
      createHistorySection(gameData, dataMine["username"]);
    });
  } catch (error) {
    // console.error("Error fetching game history:", error);
    // alert("Error fetching game history " + error);
  }
}
// Call the function to create and add the section
// createHistorySection();
createHistrory();
