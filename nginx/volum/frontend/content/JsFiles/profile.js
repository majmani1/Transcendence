// document.addEventListener("DOMContentLoaded", function () {
var settings = document.querySelector(".settings");
// var closed = document.querySelector(".close");
var close = document.getElementById("close");

var add_friend = document.querySelector(".add_friend");
if (add_friend) {
  add_friend.removeEventListener("click", addfriend);
  add_friend.addEventListener("click", addfriend);
}
if (settings) {
  settings.removeEventListener("click", open_settings);
  settings.addEventListener("click", open_settings);
}

var isBlurred = false; // Flag to keep track of blur state

function addfriend() {
  let hide = document.querySelector(".hide_others");
  hide.hidden = false;

  let search = document.querySelector(".search");
  // add_friend.style.zIndex = hideZIndex + 1;
  search.hidden = !search.hidden;
  if (isBlurred) {
    // Remove blur effect
    search.hidden = true;
    hide.hidden = true;
  } else {
    // Apply blur effect
    search.hidden = false;
    hide.hidden = false;
  }
  document.querySelector(".search__input").focus();
  // Toggle the blur state
  isBlurred = !isBlurred;
  hide.removeEventListener("click", close_search);
  hide.addEventListener("click", close_search);
  function close_search(event) {
    let hide = document.querySelector(".hide_others");
    let search = document.querySelector(".search");
    document.querySelector(".search__results").innerHTML = "";
    document.querySelector(".search__input").value = "";
    if (hide.contains(event.target)) {
      search.hidden = true;
      hide.hidden = true;
      isBlurred = !isBlurred;
      hide.removeEventListener("click", close_search);
    }
  }
}
function open_settings(event) {
  let settings_form = document.querySelector(".settings_form");
  if (settings_form.hidden == false) return;
  let hide = document.querySelector(".hide_others");
  hide.hidden = false;
  var hideZIndex = window.getComputedStyle(hide).zIndex;
  hideZIndex = parseInt(hideZIndex, 10);
  settings_form.style.zIndex = hideZIndex + 1;
  settings_form.hidden = false;
  // block of choices save and discard--------------------------
  let save = document.getElementById("save");
  let discard = document.getElementById("discard");
  function save_function(event) {
    event.preventDefault();
    const id_picture = document.getElementById("file-upload").files[0];
    // console.log(id_picture, "++++++++++++++++++++");
    const formData = new FormData();
    formData.append("picture", id_picture); //{
    formData.append("Username", document.getElementById("Username").value);
    formData.append("firstName", document.getElementById("name").value);
    formData.append("Last_name", document.getElementById("lastname").value);
    formData.append("email", document.getElementById("email").value);
    formData.append("password", document.getElementById("password").value);
    Submit_update(formData);
  }
  function discard_function(event) {
    event.preventDefault();
    // save.removeEventListener("click", save_function);
    close_settings();
  }
  save.removeEventListener("click", save_function);
  save.addEventListener("click", save_function);
  discard.removeEventListener("click", discard_function);
  discard.addEventListener("click", discard_function);

  // Block of code to delete account----------------------------
  let check_permessions = document.querySelector(".permissions");
  async function yes_function() {
    dataOfUser = await parsNewJWT();
    window.dataUserGame = dataOfUser;
    accessToken = getCookiee("access_token");
    // dataOfUser = parseJwt(accessToken);
    try {
      let resp = await fetch(
        `https://${parsedUrl.hostname}:4443/Authe/user/remove/profile/${dataOfUser["id"]}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (resp.ok) {
        deleteCookie("access_token");
        window.Router.navigateTo("/sign-in", true);
        // window.location.href = "http://${parsedUrl.hostname}:8081/files/subscrib.html";
      } else {
        // alert("Problem happend");
        deleteCookie("access_token");
      }
    } catch (error) {
      console.error("Catch Error:", error);
    }
  }
  function x_function() {
    check_permessions.hidden = true;
    settings_form.style.animation = "RemoveBlurEffect 1s 1";
    settings_form.style.animation = "none";
    settings_form.style.filter = "none";
    hide.style.zIndex = 99;
    // let yes = document.getElementById("yes");
    yes.removeEventListener("click", yes_function);
  }
  let delete_account = document.getElementById("delete");
  if (delete_account) {
    delete_account.removeEventListener("click", delete_acc);
    delete_account.addEventListener("click", delete_acc);
  }
  function delete_acc() {
    settings_form.style.animation = "blurEffect 1s 1";
    settings_form.style.filter = "blur(10px)";
    check_permessions.hidden = false;
    hide.style.zIndex = 101;
    check_permessions.style.zIndex = 102;
    let yes = document.getElementById("yes");
    let no = document.getElementById("no");
    yes.removeEventListener("click", yes_function);
    yes.addEventListener("click", yes_function);
    no.removeEventListener("click", x_function);
    no.addEventListener("click", x_function);
  }

  // Block of code to close settings form-------------------------
  if (close) {
    //// alert("close");
    close.removeEventListener("click", close_settings);
    close.addEventListener("click", close_settings);
  }
  function close_settings() {
    let settings_form = document.querySelector(".settings_form");

    let hide = document.querySelector(".hide_others");
    hide.hidden = true;
    settings_form.hidden = true;

    // let save = document.getElementById("save");
    // let discard = document.getElementById("discard");
    save.removeEventListener("click", save_function);
    discard.removeEventListener("click", discard_function);
    delete_account.removeEventListener("click", delete_acc);
    yes.removeEventListener("click", yes_function);
    no.removeEventListener("click", x_function);
    // close.removeEventListener("click", close_settings);
  }
}
var fileUpload = document.getElementById("file-upload");
var fileChosen = document.getElementById("file-chosen");

fileUpload.addEventListener("change", () => {
  fileChosen.textContent = fileUpload.files[0]
    ? fileUpload.files[0].name
    : "No profile picture chosen";
});

async function Friend_List() {
  let accessToken = getCookiee("access_token");
  // let dataOfUser = parseJwt(accessToken);
  let dataOfUser = await parsNewJWT();
  window.dataUserGame = dataOfUser;
  try {
    const resp = await fetch(
      `https://${parsedUrl.hostname}:4443/Authe/user/friend/list`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "Application/json",
        },
      }
    );
    if (resp.status == 200) {
      const dataOfFriend = await resp.json();
      // window.dataOfFriend = dataOfFriend;
      // console.log("dataOfFriend: " + dataOfFriend);
      return dataOfFriend;
    } else if (resp.status == 404) {
      // const dataOfFriend = await resp.json();
      return null;
    } else {
      // alert("data cetch failed here!!!!!!");
    }
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

async function createFriendDiv() {
  let container = document.querySelector(".my_friends");

  var dataOfFriend = await Friend_List();
  if (dataOfFriend) {
    dataOfFriend.forEach((friend) => {
      // console.log("friend: ");
      // console.log(friend);
      let friend_div = document.createElement("div");
      friend_div.classList.add("friend_circle", friend["username"]);
      let status = document.createElement("div");
      status.classList.add("status");
      let profile_pic = document.createElement("img");
      profile_pic.src = friend["picture"];
      friend_div.appendChild(profile_pic);
      if (friend["online"] == true) {
        status.style.backgroundColor = "var(--border-color)";
      } else {
        status.style.backgroundColor = "gray";
      }
      friend_div.appendChild(status);
      container.appendChild(friend_div);
      friend_div.addEventListener("click", function () {
        window.Router.navigateTo(`/profile-${friend["username"]}`, true);
      });
      // friend.appendChild(friend_name);
      // container.appendChild(friend);
    });
    // console.log(dataOfFriend[0]);
  }
}
createFriendDiv();
// document.addEventListener("DOMContentLoaded", function() {
// var qrcodeSwitch = document.getElementById("qrcode-switch");
// var qrcode = document.querySelector(".qrcode");

// qrcodeSwitch.addEventListener("change", function() {
//   if (qrcodeSwitch.checked) {
//     qrcode.style.display = "flex"; // Show the QR code
//   } else {
//     qrcode.style.display = "none"; // Hide the QR code
//   }
// });

async function Submit_update(formDataa) {
  var accessToken = getCookiee("access_token");
  var dataOfUser = await parsNewJWT();
  window.dataUserGame = dataOfUser;
  // var dataOfUser = parseJwt(accessToken);
  // console.log("-------dkhalllllll");
  try {
    const resp = await fetch(
      `https://${parsedUrl.hostname}:4443/Authe/user/update/${dataOfUser["id"]}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          // "Content-Type": "application/json",
          // No need for 'Content-Type' here, FormData sets it automatically
        },
        body: formDataa, // Send the FormData object
      }
    );

    if (resp.status == 200) {
      // window.Router.navigate('/profile',true);
      window.Router.navigateTo("/profile", true);
    } else if (resp.status == 413) {
      window.createAlert("Picture size should not exceed 2MB.", "alert_error");
    } else {
      const message = await resp.json();
      window.createAlert(message, "alert_error");
      //// alert("Nooooootttttt");
    }
  } catch (error) {
    // alert("Errrrrooooooorrrrrrr");
    // alert(error);
  }
}

async function createHistorySection(gameData, username) {
  // Select the parent element with the class name 'history'
  const historySection = document.querySelector(".history");

  // Create the main container section
  const vsContainer = document.createElement("section");
  vsContainer.className = "vs_container";
  vsContainer.title = gameData["typeGame"];
  // alert("gameData: " + gameData["typeGame"]);
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
    var dataOfUser = await parsNewJWT();
    // console.log("access: ", accessToken);
    const response = await fetch(
      `https://${parsedUrl.hostname}:4443/gameHistory/${dataOfUser["id"]}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "Application/json",
        },
      }
    );
    const data = await response.json();
    // console.log("-------------");
    // console.log(data);
    // console.log("-------------");

    const dataOfFriend = await Friend_List();

    // ?console.log("---------- : "+ dataOfFriend["0"]);
    data.forEach((gameData) => {
      // console.log("gameData: ");
      // console.log(gameData);
      createHistorySection(gameData, dataOfUser["username"]);
    });
    // console.log("****************************************");
    // const player1 = dataOfFriend.filter((user) => user["id"] == data["id_player1"]);
    // console.log(player1);
  } catch (error) {
    // console.error("Error fetching game history:", error);
    // alert("Error fetching game history " + error);
  }
}
// Call the function to create and add the section
// createHistorySection();
createHistrory();
