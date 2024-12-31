var postToNotif = async (data) => {
  var accessToken = getCookiee("access_token");
  const response = await fetch(`https://${parsedUrl.hostname}:4443/notif/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

async function createFriendDiv(target) {
  let container = document.querySelector(".my_friends");

  // console.log("llllllllllllll");
  var dataOfFriend = await Friend_List_1();
  // console.log(dataOfFriend);
  if (dataOfFriend) {
    dataOfFriend.filter((friend) => {
      // console.log("frieeeeeenddd ::  ", friend["username"]);
      if (friend["username"] == target) {
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
      } else {
        // alert("QFriend not found");
      }
    });
  } else {
    // alert("Friend not found");
  }
}

// async function RefuseFriend(message) {
//   var accessToken = getCookiee("access_token");
//   try {
//     const resp = await fetch(
//       `https://${parsedUrl.hostname}:4443/Authe/user/friend/refuse`,
//       {
//         method: "PATCH",
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           from: message.from,
//           into: message.target,
//         }),
//       }
//     );

//   } catch (error) {
//     // alert("Error:", error);
//   }
// }

var search_result = document.querySelector(".search__results");

function createUserGetAuthe(data) {
  // Create the main container div
  var userGetAuthe = document.createElement("div");
  userGetAuthe.classList.add("userGetAuthe");

  // Create the inner container div
  var autheUsers = document.createElement("div");
  autheUsers.classList.add("AutheUsers");

  // Create the profile picture img element
  var profilePic = document.createElement("img");
  profilePic.classList.add("AutheUsersImg");
  profilePic.src = data["picture"]; // Set the src attribute from data
  profilePic.alt = "friend picture";

  // Create the username p element
  var username = document.createElement("p");
  username.id = "username_target";
  username.textContent = data["username"]; // Set the text content from data
  username.onclick = function () {
    window.Router.navigateTo("/profile-" + data["username"], true);
  };
  // Create the add friend img element
  var addUserAuthe = document.createElement("img");
  addUserAuthe.classList.add("addUserAuthe");
  addUserAuthe.id = "addUserAuthee" + data["username"];
  addUserAuthe.src = "../imageLandscape/addFreind.png";
  addUserAuthe.alt = "add friend";

  // Append the children to the inner container
  autheUsers.appendChild(profilePic);
  autheUsers.appendChild(username);
  autheUsers.appendChild(addUserAuthe);

  // Append the inner container to the main container
  userGetAuthe.appendChild(autheUsers);

  // Append the main container to the search__results container
  var searchResults = document.querySelector(".search__results");
  searchResults.appendChild(userGetAuthe);
}

async function Friend_suggestion(value) {
  var accessToken = getCookiee("access_token");
  try {
    const resp = await fetch(
      `https://${parsedUrl.hostname}:4443/Authe/user/friend/suggestion`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_friend: value,
        }),
      }
    );
    if (resp.ok) {
      const data = await resp.json();
      search_result.innerHTML = "";

      data.forEach((item) => {
        createUserGetAuthe(item);
      });
    } else {
      search_result.innerHTML = "";
      //// alert("Errorr Suggestion");
    }
  } catch (error) {
    // console.log(error);
  } finally {
    var table_add = document.querySelector(".search__results");
    if (table_add) {
      table_add.removeEventListener("click", handle_add_click);
      table_add.addEventListener("click", handle_add_click);
    }
  }
}
async function handle_add_click(event) {
  if (event.target && event.target.id.startsWith("addUserAuthee")) {
    let username = event.target.id.split("addUserAuthee")[1];
    await Friend_function(username);
  }
}
window.Friend_suggestion = Friend_suggestion;

async function Friend_function(input) {
  // let input = document.getElementById("username_target").textContent;
  var accessToken = getCookiee("access_token");
  try {
    const resp = await fetch(
      `https://${parsedUrl.hostname}:4443/Authe/user/friend/request/`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_friend: input,
        }),
      }
    );
    if (resp.status == 200) {
      // console.log("Friend request sent successfully");
      const data = await resp.json(); // Parse the response as JSON
      // console.log(data["from"]);
      const dataa = {
        receiver: data["into"],
        sender: data["from"],
        notif: "Friend_request",
        sender_name: data["username_sender"],
      };
      postToNotif(dataa);

      window.globalsocket.send(JSON.stringify({ data: dataa }));
      document.getElementById("addUserAuthee" + input).style.display = "none";
      // window.globalAuth.send(JSON.stringify({'target_user_id': data.message.into, 'from_user_id': data.message.from}));
    } 
    else if (resp.status == 201) {
      window.createAlert("Friend request has already been sent", "alert_error");
    }
  } catch (error) {
    // console.error("Error:", error);
    // alert("An error occurred while sending the friend request.");
  }
}

// async function Friend_List_1() {
//   var accessToken = getCookiee("access_token");
//   try {
//     const resp = await fetch("https://${parsedUrl.hostname}:4443/Authe/user/friend/list", {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//         "Content-Type": "Application/json",
//       },
//     });

//     if (resp.status == 200) {
//       const arr = await resp.json();
//       return arr;
//     } else if (resp.status == 404) {
//       const arr = await resp.json();
//       return null;
//     } else {
//      // alert("data cetch failed here!!!!!!");
//     }
//   } catch (error) {
//     console.error("Error:", error);
//    // alert("An error occurred when Click in List of Friend .");
//   }
// }

async function Friend_List_1() {
  let accessToken = getCookiee("access_token");
  // let dataOfUser = parseJwt(accessToken);
  // let dataOfUser = await parsNewJWT();
  // window.dataUserGame = dataOfUser
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
      // alert("data fetch failed here!!!!!!");
    }
  } catch (error) {
    // console.error("Error:", error);
    return null;
  }
}
// "https://${parsedUrl.hostname}:4443/notif/notificationDatabase/" + dataOfUser["id"],
// async function Friend_request_List() {
//   var accessToken = getCookiee("access_token");
//   try {
//     const resp = await fetch(
//       "https://${parsedUrl.hostname}:4443/Authe/user/friend/request/list",
//       {
//         method: "GET",
//         headers: {
//           'Authorization': `Bearer ${accessToken}`,
//           "Content-Type": "Application/json",
//         },
//       }
//     );
//     if (resp.status == 200) {
//       const arr = await resp.json();
//       return arr;
//     } else if (resp.status == 404) {
//       const arr = await resp.json();
//       return null;
//     } else {
//      // alert("data cetch failed here!!!!!!");
//       return null;
//     }
//   } catch (error) {
//     console.error("Error:", error);
//    // alert("An error occurred when Click in List of Friend .");
//     return null;
//   }
// }
// async function fill_notif_table() {
//   var notif = document.querySelector(".notif_table");
//   if (notif) {
//     var data = await Friend_request_List();
//     if (data) {
//       for (let i = 0; i < data.length; i++) {
//         const item = data[i];

//         createNotification(item.content, item.to_user);
//       }
//     }
//   }
// }
// fill_notif_table();
