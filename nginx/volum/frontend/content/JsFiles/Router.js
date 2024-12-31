import * as Render from "./LoadingPages.js";
import { logoutFunciton } from "./Auth_scripts/Login.js";
const Router = {
  init: () => {
    Router.attachLinkListeners();
    window.addEventListener("popstate", (event) => {
      // alert(window.lastloca);
      if (window.lastloca == "game") {
        // console.log("close socket");
        // console.log(socketGame);
	      window.whyExist = "skip";

        if (socketGame != null && socketGame.readyState == 1) {
          socketGame.close();
          socketGame = null;
        }

        Render.Load_LandingPage();
      } else if (window.lastloca == "chat") {
        if (window.socketChat != null && window.socketChat.readyState == 1) {
          window.socketChat.close();
          window.socketChat = null;
        } else if (
          window.groupSocket != null &&
          window.groupSocket.readyState == 1
        ) {
          window.groupSocket.close();
          window.groupSocket = null;
        }
      }
      if (window.lastloca == "SecondGame") {
				if (socket != null && socket.readyState == 1) {
					socket.close();
					socket = null;
				}

				Render.Load_LandingPage();
			}
      Router.navigateTo(event.state.route, false);
    });
  },

  navigateTo: (route, addHistory = true) => {
    if (window.lastloca == "chat") {
      document.removeEventListener("keydown", window.handleEnter);
      if (window.socketChat != null && window.socketChat.readyState == 1) {
        window.socketChat.close();
        window.socketChat = null;
      } else if (
        window.groupSocket != null &&
        window.groupSocket.readyState == 1
      ) {
        window.groupSocket.close();
        window.groupSocket = null;
      }
    }
    window.lastloca = "";
    if (addHistory) {
      //// alert(route);
      history.pushState({ route }, null, route);
      // window.addEventListener("popstate", (event) => {
      //   Router.navigateTo(event.state.route, false);
      //   console.log(event.state.route);
      // });
    }
    switch (route) {
      case "/LoginPage":
        Render.Load_LoginPage();
        break;
      case "/sign-in":
        Render.Load_SignForm();
        break;
      case "/forget-password":
        Render.Load_ForgetPassword();
        break;
      case "/logout":
        logoutFunciton();
        Router.navigateTo("/LoginPage", true);
        break;
      case "/chat":
        Render.Load_chat();
        break;
      case "/LandingPage":
        Render.Load_LandingPage();
        break;
      case "/profile":
        Render.Load_Profile();
        break;
      case "/remote":
      case "/local":
        Render.Load_Remote();
        break;
      case "/tournament":
        Render.Load_Tournament();
        break;
      case "/Hremote":
      case "/Hlocal":
        Render.Load_Hremote();
        break;
      case "/friendGame":
      case "/AcceptGame":
        Render.Load_acceptGame();
        break;
      default:
        if (route.startsWith("/profile-")) {
          //// alert(route.split("/profile-")[0]);
          Render.Load_friendProfile(route.split("/profile-")[1]);
        } else Render.Load_404();
        break;
    }
    Router.attachLinkListeners();
  },
  attachLinkListeners: () => {
    document.querySelectorAll("a").forEach((link) => {
      link.removeEventListener("click", Router.handleLinkClick); // Remove existing listener
      link.addEventListener("click", Router.handleLinkClick); // Attach new listener
    });
  },
  handleLinkClick: (event) => {
    event.preventDefault();
    let route = event.currentTarget.getAttribute("href");
    Router.navigateTo(route, true);
  },
};

export default Router;
window.Router = Router;
