import { createNotification } from "./notif.js";

var url = window.location.href;
const parsedUrl = new URL(url);

export async function spoodyChat(msg) {
  var dataOfUser = await parsNewJWT();
  // console.log(dataOfUser, "   -------!!!!-------====-----");
  const response = await fetch(
    `https://${
      parsedUrl.hostname
    }:4443/chatContainer/spoodyChat/spoody/${dataOfUser["id"].toString()}/`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  const data = await response.json();
  if (data["online"]) {
    const msg_bord = document.querySelector(".msg-bord");
    msg_bord.innerHTML += `<span class="receiver">${msg}</span>`;
  }
  const myFriendElements = document.getElementsByClassName("myfriend");
  const specificFriend = Array.from(myFriendElements).find(
    (el) => el.querySelector(".name").textContent.trim() === "spoody"
  );
}

var postToNotif = async (typeOfNotif, data) => {
  var access_token = getCookiee("access_token");

  const response = await fetch(`https://${parsedUrl.hostname}:4443/notif/`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${access_token}`,
      // "X-CSRFToken": getCookiee("csrftoken"),
    },
    body: JSON.stringify({
      notif: typeOfNotif,
      receiver: data["sender"].toString(),
      sender: data["receiver"].toString(),
      sender_name: data["username_sender"],
      groupName: "",
    }),
  });
  window.idSender = data["sender"];
  Router.navigateTo("/AcceptGame");

  // Load_Remote();
  // window.createSockets(3, "invite", data["sender"]);
};

window.postToNotif = postToNotif;

function createInviteGameDiv(message, data) {
  const flagIsExist = document.querySelector(".GameInviteRequest");
  if (flagIsExist) return;
  const alert = document.createElement("div");
  alert.classList.add("alert", "GameInviteRequest");
  alert.textContent = message;
  const buttonAccept = document.createElement("button");
  buttonAccept.textContent = "Accept";
  buttonAccept.classList.add("acceptGame");
  alert.appendChild(buttonAccept);
  document.body.appendChild(alert);
  const buttonRfiuse = document.createElement("button");
  // buttonRfiuse.textContent = "Refuse";
  // buttonRfiuse.classList.add("refuse");
  // alert.appendChild(buttonRfiuse);
  buttonAccept.onclick = function () {
    // console.log("AcceptPlayeRequest");

    // window.globalsocket.send(JSON.stringify(dataa));
    buttonAccept.style.opacity = "0";
    alert.remove();
    postToNotif("Lets Play", data);
  };

  if (alert) {
    alert.addEventListener("animationend", function () {
      alert.remove();
    });
  }
}

async function vu_check(sender, receiver) {
  var response = await fetch(`https://${parsedUrl.hostname}:4443/chatContainer/vu_check/${sender}/${receiver}/`, {
    method:"GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
  var data = await response.json();
  return (data['user']);
}

export async function openGlobalSocket() {
  if (sessionStorage.getItem("globalsocket")) return;
  var dataOfUser = await parsNewJWT();
  window.dataUserGame = dataOfUser;

  window.globalsocket = new WebSocket(
    `wss://${parsedUrl.hostname}:4443/ws/msgNotification/${dataOfUser[
      "id"
    ].toString()}/`
  );
  window.globalsocket.onopen = function (event) {
    
    console.log("Private WebSocket connection established.111!!!!!");
    sessionStorage.setItem(
      "globalsocket",
      JSON.stringify({
        readyState: window.globalsocket.readyState,
      })
    );
  };

  window.globalsocket.onerror = function (event) {
    console.error("WebSocket error observed:", event);
    sessionStorage.removeItem("globalsocket");
  };

  window.globalsocket.onclose = function (event) {
    console.log("Private WebSocket Closeeee.2222222222222222222!!!!!");
    sessionStorage.removeItem("globalsocket");
  };

  window.globalsocket.onmessage = async function (event) {
    let myfriend = document.querySelectorAll(".myfriend");
    let data = JSON.parse(event.data);
    // console.log("(((((((((((((((((((((((((((  )))))))))))))))))))))))))))))");
    if (data["typeOfNotif"] == "mute")
      window.checkStatusOfMute(NaN, dataOfUser["id"]);
    else if (data["typeOfNotif"] == "invite to game") {
      createInviteGameDiv(data["sender_username"] + " invite you to a game", data);
    } else if (data["typeOfNotif"] == "accept_group") {
      var freindToInvite = document.querySelector("#freindToInvite");
      if (freindToInvite && freindToInvite.style.display == "flex") {
        window.fetchfreindInvite();
      }
    } else if (data["typeOfNotif"] == "Lets Play") {
      // console.log("AHHHHHHHHHHAAAAAAAA Accept");
      Router.navigateTo("/friendGame");
    } else if (data["typeOfNotif"] == "unmute") {
      if (window.freindOrRoom == "room") typing.style.display = "flex";
    } else if (data["typeOfNotif"] == "kick") {
      window.fetchGroup();
    } else if (data["typeOfNotif"] == "block") {
      if (window.freindOrRoom == "freind") {
        var typing = document.querySelector(".typing");
        if (typing) typing.style.display = "none";
      }
    } else if (data["typeOfNotif"] == "unblock") {
      window.checkBlockStatus();
    } else if (data["typeOfNotif"] == "Friend_request") {
      createNotification("A friend request from ", data["sender_username"]);
    } else if (data["typeOfNotif"] == "invite to group") {
      const message = data["sender_username"] + " invite you to ";
      createNotification(
        message,
        data["groupName"],
        data["groupName"],
        data["sender"]
      );
    } else if (data["typeOfNotif"] == "MsgToSpoody") {
      if (window.location.pathname == "/chat") {
        spoodyChat(data["msg"]);
      }
    } else if (data["typeOfNotif"] == "accept_freind") {
      
      if (window.location.pathname.startsWith("/profile-"))
      {  
        window.Router.navigateTo(window.location.pathname, true);
        
      }
      else{
          createFriendDiv(data);
      }
    } else if (data["typeOfNotif"] == "remove_freind") {
      if (window.location.pathname == "/chat") {
        window.fetchfreind();
      } else {
        var container = document.querySelector(".my_friends");
        
        if (container) {
          container.querySelector("." + data["sender_username"]).remove();
        }
      }
    } else if (data["typeOfNotif"] == "statusUpdate") {
      var FriendDiv = document.querySelector("." + data["username"]);
      if (FriendDiv)
        FriendDiv.querySelector(".status").style.backgroundColor =
          data["color"];
    } else if (data["typeOfNotif"] == "msgReceive") {
      myfriend.forEach((myfriend) => {
        if (myfriend.querySelector(".name").textContent == data["sender"]) {
          let number = +myfriend.querySelector(".notif").textContent;
          myfriend.querySelector(".notif").textContent = ++number;
          myfriend.querySelector(".notif").classList.remove("none");
          vu_check(dataOfUser['id'], data['sender_id']).then((cheeck) => {alert(cheeck);
            if(cheeck != 2){
              myfriend.querySelector(".notif").style.display = "block";
            }
            else{
              myfriend.querySelector(".notif").style.display = "none";
              myfriend.querySelector(".notif").textContent = 0;
            }
          });
          
          // if(cheeck != 2){
          //   myfriend.querySelector(".notif").style.display = "block";
          // }
          // else{
          //   myfriend.querySelector(".notif").style.display = "none";
          //   myfriend.querySelector(".notif").textContent = 0;
          // }
          // console.log(myfriend.querySelector(".notif").textContent);
        }
      });
    }

    // console.log(JSON.parse(event.data));
  };
}

async function createFriendDiv(friend) {
  if (window.location.pathname == "/chat") window.fetchfreind();
  else if (window.location.pathname == "/profile") {
    let container = document.querySelector(".my_friends");
    let friend_div = document.createElement("div");
    friend_div.classList.add("friend_circle", friend["sender_username"]);
    let status = document.createElement("div");
    status.classList.add("status");
    let profile_pic = document.createElement("img");
    profile_pic.src = friend["picture"];
    profile_pic.alt = friend["sender_username"];
    friend_div.appendChild(profile_pic);
    status.style.backgroundColor = "var(--border-color)";
    friend_div.appendChild(status);
    container.appendChild(friend_div);
    friend_div.addEventListener("click", function () {
      window.Router.navigateTo(`/profile-${friend["sender_username"]}`, true);
    });
  }
}
window.addEventListener("beforeunload", function () {
  if (
    window.globalsocket &&
    window.globalsocket.readyState === 1
  ) {
    window.globalsocket.close();
    sessionStorage.removeItem("globalsocket");
    // console.log("WebSocket connection closed on page unload.");
  }
});