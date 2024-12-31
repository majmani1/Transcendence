var dataOfUser;
var access_token;
async function waitForAccessToken() {
  while (!getCookiee("access_token")) {
    await new Promise((resolve) => setTimeout(resolve, 100)); // wait for 100ms before checking again
  }
}

async function initialize() {
  await waitForAccessToken();
  access_token = getCookiee("access_token");
  dataOfUser = await parsNewJWT();
  // Continue with the rest of your code that depends on dataOfUser
}

initialize();
var url = window.location.href;
const parsedUrl = new URL(url);

var acceptInviteGroup = async (data, dataOfUser) => {
  // var access_token = getCookiee("access_token");

  const dataToSend = {
    groupName: data.groupName,
    username: dataOfUser["username"],
    user_image: dataOfUser["picture"],
    invite: true,
  };
  const response = await fetch(
    `https://${parsedUrl.hostname}:4443/chatContainer/fetchGroup/${dataOfUser["id"]}/`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      body: JSON.stringify(dataToSend),
    }
  );
  if (window.location.pathname == "/chat" && window.freindOrRoom == "room")
    fetchGroup();
  refuseInviteGroup(data, dataOfUser["id"]);
  // console.log("data ---->  ", data);
  postToNotif("accept_group", data.id);
  // parsedUrl
};

var refuseInviteGroup = async (data, user) => {
  // var access_token = getCookiee("access_token");
  const dataToSend = {
    groupName: data.groupName,
    from: data.id,
    to: user,
    type: "invite to group",
  };
  const response = await fetch(
    `https://${parsedUrl.hostname}:4443/notif/notificationDatabase/${user}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      body: JSON.stringify(dataToSend),
    }
  );
};

export var getIdOfUser = async (username) => {
  var getId = await fetch(
    `https://${parsedUrl.hostname}:4443/Authe/user/friendId/${username}/`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "Application/json",
      },
    }
  );
  if (getId.ok) {
    var data = await getId.json();
    return data;
  }
};

var postToNotif = async (typeOfNotif, id) => {
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
      receiver: id,
      sender: dataOfUser["username"],
      picture: dataOfUser["picture"],
    }),
  });
};

async function accept_notif(target) {
  // console.log("Error: --------------------> ", target);
  // var dataOfUser = parsNewJWT();
  var container = document.getElementById(target.id);
  if (container == null) return;
  container = container.closest(".notif_container");
  if (container.id) {
    const data = {
      groupName: container.id.split("+")[0],
      id: container.id.split("+")[1],
    };
    acceptInviteGroup(data, dataOfUser);
  } else {
    const sender = target.id.split("notif_yes")[1];
    // console.log("-----------> ", sender);
    const data = {
      target: dataOfUser["username"],
      from: sender,
    };
    acceptFriend(data);
    //hna khass xi condition bax madkholx lhadxi liltaht ila madaztx response 200
    // {
    var id = await getIdOfUser(sender);
    // console.log("id -----> ", id);
    // alert(window.location.pathname)
    if (window.location.pathname == "/chat") window.fetchfreind();
    postToNotif("accept_freind", id["id"]);
    // }
  }

  container.remove();
}
function decline_notif(target) {
  var container = document.getElementById(target.id);
  if (container)
  {
    container = container.closest(".notif_container");
    if (container.id) {
      const data = {
        groupName: container.id.split("+")[0],
        id: container.id.split("+")[1],
      };
      refuseInviteGroup(data, dataOfUser["id"]);
    } else {
      const sender = target.id.split("notif_no")[1];
      const data = {
        target: dataOfUser["username"],
        from: sender,
      };
      RefuseFriend(data);
    }
    container.remove();
  }
}
async function acceptFriend(message) {
  var accessToken = getCookiee("access_token");
  try {
    const resp = await fetch(
      `https://${parsedUrl.hostname}:4443/Authe/user/friend/accept`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: message.from,
          into: message.target,
        }),
      }
    );
    // console.log(resp.status);
    if ((resp.status == 200)) {
      await createFriendDiv(message.from);
      window.fetchfreind();
    } else {
      const data = await resp.json();
      console.log("Error: --------------------> ", data);
      window.createAlert("Freind Not Added", "alert_error");
    }
  } catch (error) {
    console.log("Error: --------------------> ", error);
    // alert("Error:", error);
  }
}

async function RefuseFriend(message) {
  var accessToken = getCookiee("access_token");
  try {
    const resp = await fetch(
      `https://${parsedUrl.hostname}:4443/Authe/user/friend/refuse`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: message.from,
          into: message.target,
        }),
      }
    );
  } catch (error) {
    // alert("Error:", error);
  }
}

export function notif_handler(event) {
  document.querySelector(".notif_table").hidden =
    !document.querySelector(".notif_table").hidden;
  const red_circle = document.querySelector(".red_circle");
  if (
    red_circle ||
    (document.querySelector(".notif_table").hidden == false && red_circle)
  )
    red_circle.remove();
  // event.target.getElementById
  document
    .querySelector(".notif_table")
    .addEventListener("click", notif_respond);
  function notif_respond(event) {
    if (event.target && event.target.id.startsWith("notif_yes")) {
      accept_notif(event.target);
    } else if (event.target && event.target.id.startsWith("notif_no")) {
      decline_notif(event.target);
    }
    document.removeEventListener("click", notif_respond);
  }
}

export function handle_response_notif(response) {
  const friend_requests = response.friend_requests;
  const group_requests = response.group_request;
  const maxLength = Math.max(friend_requests.length, group_requests.length);

  for (let i = 0; i < maxLength; i++) {
    if (i < friend_requests.length) {
      createNotification(
        friend_requests[i].content,
        friend_requests[i].from_user
      );
    }

    if (i < group_requests.length) {
      // console.log(group_requests[i]);
      const message = group_requests[i].sender + " invite you to ";
      createNotification(
        message,
        group_requests[i].groupName,
        group_requests[i].groupName,
        group_requests[i].notifFrom
      );
      //// alert(group_requests[i].receiver)
      // Process group request here
    }
  }
}
export function createNotification(message, sender, group = null, id = null) {
  // create the red circle on the notification icon
  const notifIcon = document.querySelector(".notifications");
  if(notifIcon == null) return;
  const notifCircle = document.createElement("div");
  notifCircle.classList.add("red_circle");
  notifIcon.appendChild(notifCircle);
  // Create the main container
  const notifContainer = document.createElement("div");
  notifContainer.classList.add("notif_container");
  if (group) {
    notifContainer.id = group + "+" + id;
  }

  // Create the content span
  const notifContent = document.createElement("span");
  notifContent.classList.add("notif_content");
  notifContent.textContent = message + " " + sender;

  // Create the choices div
  const choices = document.createElement("div");
  choices.classList.add("notif_choices");

  // Create the choice button
  const yes_button = document.createElement("button");
  // yes_button.id = "notif_yes";
  yes_button.title = "accept";
  const YesIcon = document.createElement("i");
  YesIcon.classList.add("fa-solid", "fa-circle-check", sender);
  YesIcon.id = "notif_yes" + sender;
  yes_button.appendChild(YesIcon);

  // Create the discard button
  const no_button = document.createElement("button");
  // no_button.id = "notif_no";
  no_button.title = "decline ";
  const noIcon = document.createElement("i");
  noIcon.classList.add("fa-solid", "fa-circle-xmark");
  noIcon.id = "notif_no" + sender;
  no_button.appendChild(noIcon);

  // Append buttons to choices div
  choices.appendChild(yes_button);
  choices.appendChild(no_button);

  // Append content and choices to the main container
  notifContainer.appendChild(notifContent);
  notifContainer.appendChild(choices);

  // Append notifContainer to the notif_table
  document.querySelector(".notif_table").appendChild(notifContainer);
}

async function Friend_request_List() {
  // var access_token = getCookiee("access_token");
  try {
    const resp = await fetch(
      `https://${parsedUrl.hostname}:4443/Authe/user/friend/request/list`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "Application/json",
        },
      }
    );
    if (resp.status == 200) {
      const arr = await resp.json();
      return arr;
    } else if (resp.status == 201) {
      window.createAlert("Friend request has already been sent", "alert_error");
    }else if (resp.status == 404) {
      return null;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error:", error);
    // alert("An error occurred when Click in List of Friend .");
    return null;
  }
}
export async function fill_notif_table() {
  var notif = document.querySelector(".notif_table");
  if (notif) {
    var data = await Friend_request_List();
    // console.log(data);
    if (data) {
      for (let i = 0; i < data.length; i++) {
        const item = data[i];

        createNotification(item.content, item.to_user);
      }
    }
  }
}
//   fill_notif_table();
