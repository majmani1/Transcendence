import Router from "./Router.js";
import { check_authorization } from "./Auth_scripts/Autorization.js";
const protectedPaths = [
  "/LandingPage",
  "/remote",
  "/local",
  "/chat",
  "/tournament",
  "/logout",
  "/profile",
  "/Hremote",
  "/Hlocal",
  // "/LandingPage/",
  // "/remote/",
  // "/local/",
  // "/chat/",
  // "/tournament/",
  // "/logout/",
  // "/profile/",
];
const publicPaths = [
  "/LoginPage",
  "/sign-in",
  "/forget-password",
  // "/LoginPage/",
  // "/sign-in/",
  // "/forget-password/",
];

Router.init();

// accessToken = getCookiee('access_token');

let lien = window.location.href;
let location = new URL(lien).pathname;
if (location.endsWith("/") && location != "/") location = location.slice(0, -1);
if (
  !protectedPaths.includes(location) &&
  !publicPaths.includes(location) &&
  location != "/" &&
  !location.startsWith("/profile-")
) {
  location = "404";
} else {
  let flagLogin = await check_authorization();
  var accessToken = getCookiee("access_token");
  if (accessToken) {
    //// alert("!1: " + location);
    if (flagLogin) {
      if (publicPaths.includes(location) || location == "/")
        location = "/LandingPage";
      else if (location.startsWith("/profile-")) location = location;
      else if (!protectedPaths.includes(location)) location = "404";
    } else {
      if (protectedPaths.includes(location) || location == "/")
        location = "/LoginPage";
      else if (!publicPaths.includes(location)) location = "404";
    }
  } else {
    if (protectedPaths.includes(location) || location == "/")
      location = "/LoginPage";
    else if (!publicPaths.includes(location)) location = "404";
  }
}

//// alert(location);
// }
// else
// {
//   //// alert("dkhaaaalllllll")

//   if (location != "/index.html")
//     check_authorization()
//   //// alert("lllalalalalalallala")

// }
//// alert(location);
//// alert(location);
// window.addEventListener("load", function () {
//   this.document.getElementById("loadingSpinner").style.display = "none";
// });
Router.navigateTo(location, true);
// document.addEventListener("keydown", function (event) {
//   if (event.key === "Enter") {
//     const activeElement = document.activeElement;
//     if (activeElement && activeElement.tagName === "BUTTON") {
//       activeElement.click();
//     }
//   }
// });
