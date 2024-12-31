import Router from "../Router.js";

window.Authorization = {
  isLogin: true,
};

export var accessToken = getCookiee("access_token");

var url = window.location.href;
const parsedUrl = new URL(url);
const hostname = parsedUrl.hostname;
export async function check_authorization() {
  accessToken = getCookiee("access_token");
  try {
    let resp = await fetch(`https://${hostname}:4443/Authe/user/Autorization`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    if (resp.status === 401) {
      const respp = await fetch(
        `https://${hostname}:4443/Authe/user/token/refresh`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (respp.ok) {
        // console.log("New access token generated successfully");
        return true;
      } else {
        if (window.globalsocket)
          {
            window.globalsocket.close();
            sessionStorage.removeItem('globalsocket');
            window.globalsocket = null
          }
        // console.log("Error generating new access token");
        await deleteCookie('access_token');
        window.Authorization = false;
        // Router.navigateTo("/sign-in", true);
        return false;
      }
    } else if (resp.status === 200) {
      return true;
    } else {
      if (window.globalsocket)
        {
          window.globalsocket.close();
          sessionStorage.removeItem('globalsocket');
          window.globalsocket = null
        }
      await deleteCookie("access_token");
      return false;
    }
  } catch (error) {
    if (window.globalsocket)
      {
        window.globalsocket.close();
        sessionStorage.removeItem('globalsocket');
        window.globalsocket = null
      }
    await deleteCookie("access_token");
    return false;
  }
}

// ================== Generate New Access Token ==================

// async function generate_new_access_token_auth() {
// 	const respp = await fetch(`http://${hostname}:8081/Authe/user/token/refresh`, {
// 		method: "GET",
// 		headers: {
// 			"Content-Type": "application/json",
// 		},
// 	});
// 	if (respp.ok) {
//         console.log("New access token generated successfully");
// 		check_authorization();
// 		return true;
// 	} else {
//         console.log("Error generating new access token");
// 		await deleteCookie('access_token');
// 		// deleteCookie('refresh_token');
// 		window.Authorization = false;
// 		return false;
// 	}
// }
