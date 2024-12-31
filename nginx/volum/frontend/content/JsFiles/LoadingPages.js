import Router from "./Router.js";
import * as Pages from "./pagesContent.js";
import { check_Oauth } from "./Auth_scripts/Login.js";
import { openGlobalSocket } from "./globalSocket.js";
import { notif_handler, handle_response_notif, getIdOfUser } from "./notif.js";
import {
  injectScriptElement,
  injectScriptElement2,
  removeScripts,
  injectLinkElement,
  removeLinks,
} from "./injectTools.js";
import {
  initializeSignIn,
  close_button,
  handleClick,
  handleEscapeKey,
  handleEnterKeyPress,
  closeAbout,
  about,
  intial_scroll,
  initialHorizontalScroll,
} from "./LoginTools.js";
import { changeTwoFa } from "./2faTools.js";
import { user_profile_data, sendFriendRequest } from "./userData.js";

let accessToken = getCookiee("access_token");
let dataOfUser;

//// alert(dataOfUser);
let url = window.location.href;
//// alert(url);

// parse url and Get Code
const parsedUrl = new URL(url);
// Use URLSearchParams to get the query parameters
const params = new URLSearchParams(parsedUrl.search);

// Extract the 'code' and 'state' parameters
const code = params.get("code");

// parse url and Get Code
// Use URLSearchParams to get the query parameters

// Extract the 'code' and 'state' parameters

if (code) {
  check_Oauth(code, params);
}

// Game Modification --------------------------

// ----------------------------------------------

export async function Load_LoginPage() {
  const loading = document.querySelector(".custom-loading-spinner");
  if (loading) loading.style.display = "flex";
  removeLinks();
  try {
    await injectLinkElement(
      "stylesheet",
      "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css",
      null,
      null
    );
    await injectLinkElement(
      "stylesheet",
      "https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css",
      null,
      null
    );
    await injectLinkElement(
      "stylesheet",
      "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css",
      null,
      null
    );
    await injectLinkElement(
      "stylesheet",
      "https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css",
      null,
      null
    );
    await injectLinkElement(
      "stylesheet",
      "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css",
      "sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH",
      "anonymous"
    );
    // await injectLinkElement(
    //   "stylesheet",
    //   "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css",
    //   null,
    //   null
    // );
    await injectLinkElement("stylesheet", "/style.css", null, null);
    await injectLinkElement("stylesheet", "/sign_style.css", null, null);
    document.querySelector(".bodyS").innerHTML = "";
    document.querySelector(".bodyS").innerHTML = Pages.LoginPage;

    document.querySelector(".About_Button").removeEventListener("click", about);
    document.querySelector(".About_Button").addEventListener("click", about);
    document
      .querySelector(".close-about")
      .removeEventListener("click", closeAbout);
    document
      .querySelector(".close-about")
      .addEventListener("click", closeAbout);
    document.querySelector("button").removeEventListener("click", handleClick);
    document.querySelector("button").addEventListener("click", handleClick);
    document.querySelector("button").addEventListener("click", function () {
      this.blur();
    });
    Pages.animationTmp();
  } catch (error) {
    // console.log(error);
  } finally {
    const loading = document.querySelector(".custom-loading-spinner");
    setTimeout(() => {
      if (loading) loading.style.display = "none";
    }, 1000);
  }
}

export async function Load_SignForm() {
  if (
    document.querySelector(".my-container") == null ||
    document.querySelector(".forget_password") != null
  ) {
    try {
      await Load_LoginPage();
    } catch (error) {
      // console.log(error);
    }
  }
  const button = document.querySelector("button");
  if (button) button.removeEventListener("click", handleClick);
  let blurEffect = document.querySelector(".my-container");
  if (blurEffect) {
    blurEffect.style.animation = "blurEffect 1s 1";
    blurEffect.style.filter = "blur(10px)";
  }
  if (document.querySelector(".sign_form")) {
    const checkbox = document.getElementById("reg-log");
    checkbox.click();
  } else {
    let signInForm = document.createElement("section");
    signInForm.className = "sign_form";
    signInForm.innerHTML = Pages.signInPage;
    document.body.appendChild(signInForm);
  }
  Router.attachLinkListeners();
  close_button();
  await initializeSignIn();

  document.addEventListener("keydown", handleEnterKeyPress);
  document.querySelector(".checkbox").focus();

  const box = document.querySelector(".checkbox");
  box.addEventListener("change", function () {
    if (box.checked) {
      document.getElementById("firstname").focus();
    } else document.getElementById("button_google").focus();
  });
  if (document.querySelector(".sign_form")) {
    document.addEventListener("keydown", handleEscapeKey);
  }
}

export async function Load_ForgetPassword() {
  if (document.querySelector(".sign_form") == null) {
    await Load_SignForm();
  }
  try {
    await injectLinkElement("stylesheet", "/forget_pass.css", null, null);
    document.querySelector(".section").innerHTML = Pages.forgetPassword;
    injectScriptElement2(
      "/JsFiles/Auth_scripts/forgetPass.js",
      null,
      false,
      false
    );
  } catch (error) {
    // console.log(error);
  } finally {
    const loading = document.querySelector(".custom-loading-spinner");
    if (loading) loading.style.display = "none";
  }
}

export async function Load_LandingPage() {
  document.querySelector(".bodyS").innerHTML = "";
  const loading = document.querySelector(".custom-loading-spinner");
  if (loading) loading.style.display = "flex";
  dataOfUser = await parsNewJWT();
  if (!sessionStorage.getItem("globalsocket")) openGlobalSocket();
  window.dataUserGame = dataOfUser;
  removeLinks();
  const sign_form = document.querySelector(".sign_form");
  if (sign_form) sign_form.remove();

  try {
    await injectLinkElement(
      "stylesheet",
      "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css",
      null,
      null
    );
    await injectLinkElement("stylesheet", "/LandingPage.css", null, null);
    document.querySelector(".bodyS").innerHTML = "";
    document.querySelector(".bodyS").innerHTML = Pages.LandingPage;
    if (
      window.whyExist != undefined &&
      window.whyExist != "" &&
      window.whyExist != "skip" &&
      window.whyExist != "remote" &&
      window.whyExist != "exit Player2"
    ) {
      window.createAlert(window.whyExist, "alert");
    }
    window.whyExist = "";
    const notif = document.querySelector(".notifications");
    if (notif) {
      notif.removeEventListener("click", notif_handler);
      notif.addEventListener("click", notif_handler);
    }
    injectScriptElement2("/JsFiles/Auth_scripts/Friend.js", null, true, false);
    // injectScriptElement2("./JsFiles/notif.js", "text/javascript", false, false);
    intial_scroll(".Modes");
    initialHorizontalScroll();

    Router.attachLinkListeners();
    fetch_Friend_Request();
  } catch (error) {
    // alert(error);
    // alert("error");
  } finally {
    const loading = document.querySelector(".custom-loading-spinner");
    if (loading) loading.style.display = "none";
  }
}
export async function Load_chat() {
  const loading = document.querySelector(".custom-loading-spinner");
  if (loading) loading.style.display = "flex";
  let dataOfUser = await parsNewJWT();
  window.dataUserGame = dataOfUser;

  removeLinks();
  removeScripts();
  try {
    await injectLinkElement("stylesheet", "./styleChat.css", null, null);
    await injectLinkElement(
      "stylesheet",
      "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css",
      null,
      null
    );
    await injectLinkElement(
      "stylesheet",
      "https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css",
      null,
      null
    );
    document.querySelector(".bodyS").innerHTML = Pages.chat(dataOfUser);
    injectScriptElement("JsFiles/ChatScript/script.js", "module", false, false);
    injectScriptElement2("/JsFiles/Auth_scripts/Friend.js", null, true, false);
    const notif = document.querySelector(".notifications");
    if (notif) {
      notif.removeEventListener("click", notif_handler);
      notif.addEventListener("click", notif_handler);
    }
    Router.attachLinkListeners();
    fetch_Friend_Request();
  } catch (error) {
    // console.log(error);
  } finally {
    const loading = document.querySelector(".custom-loading-spinner");
    if (loading) loading.style.display = "none";
    if (!sessionStorage.getItem("globalsocket")) openGlobalSocket();
  }
}

export async function Load_acceptGame() {
  window.friendGame = true;

  removeLinks();
  removeScripts();

  const loading = document.querySelector(".custom-loading-spinner");
  if (loading) loading.style.display = "flex";
  try {
    await injectLinkElement("stylesheet", "./css/style.css", null, null);
    await injectLinkElement("stylesheet", "./css/responsive.css", null, null);
    await injectLinkElement("stylesheet", "./css/vs.css", null, null);
    await injectLinkElement("stylesheet", "./css/retry.css", null, null);
    await injectLinkElement("stylesheet", "./css/tournament.css", null, null);
    await injectLinkElement("stylesheet", "./css/retry.css", null, null);
    await injectLinkElement("stylesheet", "./css/ErrorInvite.css", null, null);
    removeScripts();
    injectScriptElement("js/pages.js", null, false, true);
    injectScriptElement("js/tournament.js", null, false, true);
    injectScriptElement("js/app.js", null, false, true);
    document.querySelector(".bodyS").innerHTML = "";

    Router.attachLinkListeners();
  } catch (error) {
    // console.log(error);
  } finally {
    const loading = document.querySelector(".custom-loading-spinner");
    if (loading) loading.style.display = "none";
    if (!sessionStorage.getItem("websocketConnected")) openGlobalSocket();
  }
}

export async function PlayFriend() {
  removeLinks();
  removeScripts();
  const loading = document.querySelector(".custom-loading-spinner");
  if (loading) loading.style.display = "flex";
  try {
    await injectLinkElement("stylesheet", "./css/style.css", null, null);
    await injectLinkElement("stylesheet", "./css/responsive.css", null, null);
    await injectLinkElement("stylesheet", "./css/vs.css", null, null);
    await injectLinkElement("stylesheet", "./css/retry.css", null, null);
    await injectLinkElement("stylesheet", "./css/tournament.css", null, null);
    removeScripts();
    injectScriptElement2("js/pages.js", null, false, true);
    injectScriptElement2("js/tournament.js", null, false, true);
    injectScriptElement2("js/app.js", null, false, true);
    document.querySelector(".bodyS").innerHTML = "";

    document.querySelector(
      ".bodyS"
    ).innerHTML = `<button class="value value1" onclick="scores(3)">3</button>`;
    Router.attachLinkListeners();
  } catch (error) {
    // console.log(error);
  } finally {
    const loading = document.querySelector(".custom-loading-spinner");
    if (loading) loading.style.display = "none";
    if (!sessionStorage.getItem("websocketConnected")) openGlobalSocket();
  }
}

export async function Load_Remote() {
  dataOfUser = await parsNewJWT();
  window.dataUserGame = dataOfUser;
  document.querySelector(".bodyS").innerHTML = "";
  removeLinks();
  removeScripts();
  const loading = document.querySelector(".custom-loading-spinner");
  if (loading) loading.style.display = "flex";
  try {
    await injectLinkElement("stylesheet", "./css/style.css", null, null);
    await injectLinkElement("stylesheet", "./css/responsive.css", null, null);
    await injectLinkElement("stylesheet", "./css/vs.css", null, null);
    await injectLinkElement("stylesheet", "./css/retry.css", null, null);
    await injectLinkElement("stylesheet", "./css/tournament.css", null, null);
    removeScripts();

    injectScriptElement2("js/pages.js", null, false, true);
    injectScriptElement2("js/tournament.js", null, false, true);
    injectScriptElement2("js/app.js", null, false, true);
  } catch (error) {
    // console.log(error);
  } finally {
    const loading = document.querySelector(".custom-loading-spinner");
    if (loading) loading.style.display = "none";
    if (!sessionStorage.getItem("websocketConnected")) openGlobalSocket();
  }
}

export async function Load_Tournament() {
  const loading = document.querySelector(".custom-loading-spinner");
  dataOfUser = await parsNewJWT();
  window.dataUserGame = dataOfUser;
  if (loading) loading.style.display = "flex";
  removeLinks();
  try {
    await injectLinkElement("stylesheet", "./css/style.css", null, null);
    await injectLinkElement("stylesheet", "./css/responsive.css", null, null);
    await injectLinkElement("stylesheet", "./css/vs.css", null, null);
    await injectLinkElement("stylesheet", "./css/retry.css", null, null);
    await injectLinkElement("stylesheet", "./css/tournament.css", null, null);
    await injectLinkElement("stylesheet", "./css/retry.css", null, null);
    removeScripts();
    injectScriptElement("js/pages.js", "", false, true);
    injectScriptElement("js/app.js", "", false, true);
    injectScriptElement("js/tournament.js", "", false, true);
    document.querySelector(".bodyS").innerHTML = Pages.TournamentPingPong;
    Router.attachLinkListeners();
  } catch (error) {
    // console.log(error);
  } finally {
    const loading = document.querySelector(".custom-loading-spinner");
    if (loading) loading.style.display = "none";
    if (!sessionStorage.getItem("websocketConnected")) openGlobalSocket();
  }
}
// export async function Load_Fetch() {
//   document.querySelector(".bodyS").innerHTML = `
//     <h1>Ping Pong Game History</h1>
//     <div id="game-history"></div>
//   `;

//   try {
//     const response = await fetch(
//       `https://${parsedUrl.hostname}:4443/gameHistory/`
//     );
//     const data = await response.json();
    // console.log(data);
//   } catch (error) {
//     // console.error("Error fetching game history:", error);
//     document.getElementById("game-history").innerHTML = `<p>${error}</p>`;
//   }
// }

export async function Load_Profile() {
  const loading = document.querySelector(".custom-loading-spinner");
  if (loading) loading.style.display = "flex";
  var dataOfUser = await parsNewJWT();
  // console.log("--------------------------------------> \n", dataOfUser);
  window.dataUserGame = dataOfUser;
  var two_fa = parseJwt(getCookiee("access_token"));

  removeLinks();
  removeScripts();
  try {
    await injectLinkElement(
      "stylesheet",
      "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css",
      null,
      null
    );
    await injectLinkElement(
      "stylesheet",
      "https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css",
      null,
      null
    );
    await injectLinkElement("stylesheet", "/profile.css", null, null);
    // document.querySelector(".bodyS").innerHTML = "";
    document.querySelector(".bodyS").innerHTML =
      Pages.profileContent(dataOfUser);
    injectScriptElement2("/JsFiles/profile.js", null, true, false);
    injectScriptElement2("/JsFiles/Auth_scripts/Friend.js", null, true, false);
    injectScriptElement2(
      "/JsFiles/FrontTwoFactory.js",
      "text/javascript",
      false,
      false
    );
    injectScriptElement2(
      "/JsFiles/Auth_scripts/two_factor.js",
      "text/javascript",
      true,
      false
    );
    injectScriptElement2(
      "https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js",
      null,
      false,
      false
    );
    intial_scroll(".pingpong", ".huntergame");
    const notif = document.querySelector(".notifications");
    if (notif) {
      notif.removeEventListener("click", notif_handler);
      notif.addEventListener("click", notif_handler);
    }
    Router.attachLinkListeners();
    fetch_Friend_Request();
    if (two_fa["2fa"] == true) {
      changeTwoFa();
    }
  } catch (error) {
    // alert("Profile: " + error);
  } finally {
    const loading = document.querySelector(".custom-loading-spinner");
    if (loading) {
      setTimeout(() => {
        loading.style.display = "none";
      }, 800);
    }
    if (!sessionStorage.getItem("globalsocket")) openGlobalSocket();
  }
}

export async function Load_404() {
  removeLinks();
  removeScripts();
  try {
    await injectLinkElement("stylesheet", "/404.css", null, null);
    // document.querySelector(".bodyS").innerHTML = "";
    document.querySelector(".bodyS").innerHTML = Pages.notFound;
    setTimeout(() => {
      const btnElement = document.querySelector(".btn");
      if (
        btnElement &&
        navigator.userAgent.toLowerCase().indexOf("firefox") !== -1
      ) {
        btnElement.classList.remove("firefox");
      }
    }, 100);
  } catch (error) {
    // console.log(error);
  } finally {
    const loading = document.querySelector(".custom-loading-spinner");
    if (loading) loading.style.display = "none";
  }
}
async function Friend_List() {
  var dataOfUser = await parsNewJWT();
  accessToken = getCookiee("access_token");
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
      const dataOfFriend = await resp.json();
      return null;
    } else {
      // alert("data cetch failed here!!!!!!");
      return null;
    }
  } catch (error) {
    console.error("11Error:", error);
    return null;
  }
}

async function removeFriend(username) {
  var accessToken = getCookiee("access_token");
  var dataOfUser = await parsNewJWT();
  try {
    const resp = await fetch(
      `https://${parsedUrl.hostname}:4443/Authe/user/friend/remove/${username}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (resp.status == 204) {
      var id = await getIdOfUser(username);
      var data = {
        notif: "remove_freind",
        receiver: id["id"],
        sender: dataOfUser["username"],
        picture: "",
      };
      postToNotif(data);
    } else {
      const data = await resp.json();
      // alert(data.error);
    }
  } catch (error) {
    console.error("Error:", error);
    // alert("An error occurred when remove friend.");
  } finally {
    window.Router.navigateTo("/profile");
  }
}
export async function Load_friendProfile(url) {
  let user = await parsNewJWT();
  window.dataUserGame = user;
  var dataOfFriend = await Friend_List();
  const dataOfUser = dataOfFriend.filter(
    (friend) => friend["username"] == url
  )[0];
  // console.log(dataOfUser);
  // dataOfUser["picture"] = parsePicture(dataOfUser["picture"]);
  if (!dataOfUser) {
    // console.log("--- > ", dataOfUser);
    Load_UserProfile(url);
    return;
  }
  const loading = document.querySelector(".custom-loading-spinner");
  if (loading) loading.style.display = "flex";
  removeLinks();
  removeScripts();
  try {
    await injectLinkElement(
      "stylesheet",
      "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css",
      null,
      null
    );
    await injectLinkElement(
      "stylesheet",
      "https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css",
      null,
      null
    );
    await injectLinkElement("stylesheet", "/profile.css", null, null);
    // document.querySelector(".bodyS").innerHTML = "";
    document.querySelector(".bodyS").innerHTML =
      Pages.friendProfile(dataOfUser);

    injectScriptElement2("/JsFiles/friendProfile.js", null, true, false);
    // injectScriptElement2("/JsFiles/Auth_scripts/Friend.js", null, true, false);
    const notif = document.querySelector(".notifications");
    if (notif) {
      notif.removeEventListener("click", notif_handler);
      notif.addEventListener("click", notif_handler);
    }
    Router.attachLinkListeners();
    var remove_friend = document.querySelector(".remove_friend");
    if (remove_friend) {
      // Correct way to add the event listener
      remove_friend.removeEventListener("click", function () {
        removeFriend(dataOfUser["username"]);
      });
      remove_friend.addEventListener("click", function () {
        removeFriend(dataOfUser["username"]);
      });
    }
    fetch_Friend_Request();
    var status = document.querySelector(".names").firstElementChild;
    if (status && dataOfUser["online"] == false) {
      status.style.backgroundColor = "gray";
    }
  } catch (error) {
    window.Router.navigateTo("/404");
  } finally {
    const loading = document.querySelector(".custom-loading-spinner");
    if (loading) {
      setTimeout(() => {
        loading.style.display = "none";
      }, 1000);
    }
    if (!sessionStorage.getItem("globalsocket")) openGlobalSocket();
  }
}
export async function Load_UserProfile(username) {
  let user = await parsNewJWT();
  window.dataUserGame = user;
  var dataOfUser = await user_profile_data(username);
  if (dataOfUser == "/profile") {
    window.Router.navigateTo("/profile");
    return;
  }
  // console.log(dataOfUser);
  // dataOfUser["picture"] = parsePicture(dataOfUser["picture"]);

  const loading = document.querySelector(".custom-loading-spinner");
  if (loading) loading.style.display = "flex";
  removeLinks();
  removeScripts();
  try {
    await injectLinkElement(
      "stylesheet",
      "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css",
      null,
      null
    );
    await injectLinkElement(
      "stylesheet",
      "https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css",
      null,
      null
    );
    await injectLinkElement("stylesheet", "/profile.css", null, null);

    document.querySelector(".bodyS").innerHTML = Pages.userProfile(dataOfUser);

    injectScriptElement2("/JsFiles/userProfile.js", null, true, false);
    // injectScriptElement2("/JsFiles/Auth_scripts/Friend.js", null, true, false);
    const notif = document.querySelector(".notifications");
    if (notif) {
      notif.removeEventListener("click", notif_handler);
      notif.addEventListener("click", notif_handler);
    }
    Router.attachLinkListeners();
    var add_friend = document.querySelector(".remove_friend");
    if (add_friend) {
      // Correct way to add the event listener
      add_friend.removeEventListener("click", function () {
        sendFriendRequest(dataOfUser["username"]);
      });
      add_friend.addEventListener("click", function () {
        sendFriendRequest(dataOfUser["username"]);
      });
    }
    fetch_Friend_Request();
    var status = document.querySelector(".names").firstElementChild;
    if (status && dataOfUser["online"] == false) {
      status.style.backgroundColor = "gray";
    }
  } catch (error) {
    window.Router.navigateTo("/404");
  } finally {
    const loading = document.querySelector(".custom-loading-spinner");
    if (loading) {
      setTimeout(() => {
        loading.style.display = "none";
      }, 1000);
    }
    if (!sessionStorage.getItem("globalsocket")) openGlobalSocket();
  }
}
async function fetch_Friend_Request() {
  var notification = document.querySelector(".notifications");
  if (notification) {
    var accessToken = getCookiee("access_token");
    var dataOfUser = await parsNewJWT();
    try {
      const resp = await fetch(
        `https://${parsedUrl.hostname}:4443/notif/notificationDatabase/` +
          dataOfUser["id"],

        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "Application/json",
          },
        }
      );
      if (resp.status == 200) {
        const response = await resp.json();
        handle_response_notif(response);
      }
    } catch (error) {
      console.error("Error:", error.message);
      // alert("An error occurred when Click in List of Friend .");
    }
  }
}

export async function Load_Hremote() {
  const loading = document.querySelector(".custom-loading-spinner");
  if (loading) loading.style.display = "flex";
  removeLinks();
  removeScripts();
  var dataOfUser = await parsNewJWT();
  window.dataUserGame = dataOfUser;
  try {
    await injectLinkElement("stylesheet", "/styleG.css", null, null);
    document.querySelector(".bodyS").innerHTML = ``;
    document.querySelector(".bodyS").innerHTML = Pages.HunterPage(dataOfUser);
    injectScriptElement2(
      "/JsFiles/scriptsSecondG/second_game.js",
      "text/javascript",
      false,
      false
    );
    window.Router.attachLinkListeners();
    // injectScriptElement2(, null, false, false);
  } catch (error) {
    // console.log(error);
  } finally {
    const loading = document.querySelector(".custom-loading-spinner");
    if (loading) {
      setTimeout(() => {
        loading.style.display = "none";
      }, 1000);
    }
    if (!sessionStorage.getItem("globalsocket")) openGlobalSocket();
  }
}
