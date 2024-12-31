export async function user_profile_data(username) {
  var access_token = getCookiee("access_token");
  const response = await fetch(
    `https://${parsedUrl.hostname}:4443/Authe/user/data/${username}`,
    {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${access_token}`,
        // "X-CSRFToken": getCookiee("csrftoken"),
      },
    }
  );
  if (response.status == 200) {
    var data = await response.json();
    return data;
  } else if (response.status == 204) {
    return "/profile";
  } else {
    return null;
  }
}

export async function sendFriendRequest(input) {
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
      const data = await resp.json(); // Parse the response as JSON
      // console.log(data["from"]);
      const dataa = {
        receiver: data["into"],
        sender: data["from"],
        notif: "Friend_request",
        sender_name: data["username_sender"],
      };
      // console.log("-------------->: ", dataa);
      postToSocket(dataa);

      window.globalsocket.send(JSON.stringify({ data: dataa }));
      document.querySelector(".remove_friend").remove();
      window.createAlert("Friend request sent successfully", "alert");
      // window.globalAuth.send(JSON.stringify({'target_user_id': data.message.into, 'from_user_id': data.message.from}));
    }else if (resp.status == 201) {
      window.createAlert("Friend request has already been sent", "alert_error");
    }else if (resp.status == 404) {
    } else {
      // console.log("Request failed:", resp.status);
    }
  } catch (error) {
    console.error("Error:", error);
    // alert("An error occurred while sending the friend request.");
  }
}
var postToSocket = async (data) => {
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
