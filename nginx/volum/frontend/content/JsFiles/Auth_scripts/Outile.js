// import Router from "../Router";

var url = window.location.href;

const parsedUrl = new URL(url);

function getCookiee(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
}

async function deleteCookie(name) {
  // console.log(window.dataUserGame)
  try {
    resp = await fetch(`https://${parsedUrl.hostname}:4443/Authe/status_player_in_close/`, {
      method: "POST",
      headers: {
      "Content-Type": "application/json",
      },
      body: JSON.stringify({player_id: window.dataUserGame['id'], status: "out Game"}),
    });
  
    } catch (error) {
    // window.createAlert(error.message);
  }
  try {
    const resp = await fetch(
      `https://${parsedUrl.hostname}:4443/Authe/user/delete/cookies/`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (resp.ok) {
      if (window.globalsocket) {
        window.globalsocket.close();
        sessionStorage.removeItem("globalsocket");
        window.globalsocket = null;
      }
    } else {
      // console.log("Error deleting cookie: !!!!");
    }
  } catch (error) {
    // alert("Error deleting cookie: !!!!");
    // console.log(error);
  }
}

function parseJwt(token) {
  if (token == null) return null;

  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}
// =======================================================

async function parsNewJWT() {
  const accessToken = getCookiee("access_token");
  try {
    const resp = await fetch(
      `https://${parsedUrl.hostname}:4443/Authe/user/check/token`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (resp.status == 200) {
      const data = await resp.json();
      return data;
    } else {
      // Router.navigateTo("/sign-in", true);
      // console.log("Token is invalid");
      return null;
    }
  } catch (error) {
    // console.log(error);
  }
}
