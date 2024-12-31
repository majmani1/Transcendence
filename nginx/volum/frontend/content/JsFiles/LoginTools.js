import { registreForm } from "./Auth_scripts/registre.js";
import { LoginForm } from "./Auth_scripts/Login.js";

export async function initializeSignIn() {
  const google = document.querySelector(".LogoGoogle");

  google.addEventListener("click", function () {
    window.location.href = `https://${parsedUrl.hostname}:4443/Authe/google_OAth/`;
  });
  const _42 = document.querySelector(".Logo42");

  _42.addEventListener("click", function () {
    window.location.href = `https://${parsedUrl.hostname}:4443/Authe/Authri/`;
  });
  var loginForm = document.getElementById("Loginform");
  loginForm.removeEventListener("click", sendLoginForm);
  loginForm.addEventListener("click", sendLoginForm);
  const FormLogin = document.getElementById("FormLogin");
  FormLogin.removeEventListener("click", initialFormLogin);
  FormLogin.addEventListener("click", initialFormLogin);
}
async function initialFormLogin(event) {
  event.preventDefault();
  const formData = {
    username: document.getElementById("logname"),
    first_name: document.getElementById("firstname"),
    last_name: document.getElementById("lastname"),
    email: document.getElementById("registremail"),
    password: document.getElementById("registrepass"),
  };
  let allValid = checkFormValidity(formData);
  if (allValid) {
    try {
      //// alert("start");
      const formInputs = {
        username: formData.username.value,
        first_name: formData.first_name.value,
        last_name: formData.last_name.value,
        email: formData.email.value,
        password: formData.password.value,
      };
      await registreForm(formInputs);
      //// alert("end");
    } catch (error) {
      //// alert("333333333/3");
      // console.log(error);
    }
  }
}
function checkFormValidity(formData) {
  let allValid = true;

  for (const key in formData) {
    if (formData.hasOwnProperty(key)) {
      const input = formData[key];
      if (!input.checkValidity()) {
        input.reportValidity(); // Show validation message
        allValid = false;
      }
    }
  }

  return allValid;
}
export function close_button() {
  const exit_button = document.querySelector(".exit");
  exit_button.addEventListener("click", function () {
    const signInForm = document.querySelector(".section");
    signInForm.classList.add("section_reverse");

    const blurEffect = document.querySelector(".my-container");
    blurEffect.style.animation = "RemoveBlurEffect 1s 1";
    blurEffect.style.filter = "blur(0px)";
    const linkElement = document.querySelector(
      'link[href="./forget_pass.css"]'
    );
    if (linkElement) {
      linkElement.parentNode.removeChild(linkElement);
    }
    setTimeout(function () {
      // Router.navigateTo("/LoginPage", true);
      const signInForm = document.querySelector(".sign_form");
      signInForm.remove();
      document.querySelector("button").addEventListener("click", handleClick);
      history.pushState({ route: "/LoginPage" }, null, "/LoginPage");

      signInForm.classList.remove("section_reverse");
    }, 100);
  });
  document.removeEventListener("keydown", handleEscapeKey);
}
export function handleClick(event) {
  event.preventDefault();
  Router.navigateTo("/sign-in", true);
}
async function sendLoginForm(event) {
  event.preventDefault();
  const formD = {
    email: document.getElementById("login").value,
    password: document.getElementById("logpass").value,
  };
  if (formD.email != "" && formD.password != "") {
    try {
      await LoginForm(formD);
    } catch (error) {
      // alert(error);
    }
  }
}
export function handleEscapeKey(event) {
  // console.log(event.key);
  if (event.key === "Escape") {
    let exit_button = document.querySelector(".exit");
    if (exit_button) {
      exit_button.click();
    }
  }
}

export function handleEnterKeyPress(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    const focusedElement = document.activeElement;
    if (focusedElement && typeof focusedElement.click === "function") {
      focusedElement.click();
    }
  }
}
function handleAnimationEnd() {
  var about = document.querySelector(".About");
  about.hidden = true;
  about.removeEventListener("animationend", handleAnimationEnd);
}

export function closeAbout() {
  var about = document.querySelector(".About");
  about.style.animation = "zoomOut 1s";
  about.addEventListener("animationend", handleAnimationEnd);
}
export function about() {
  var about = document.querySelector(".About");
  about.style.animation = "";
  if (about.hidden == true) {
    about.hidden = false;
    var blurEffect = document.querySelector(".my-container");
    blurEffect.style.animation = "";
    blurEffect.style.filter = "";
  }
}

function scrollLeftAction(index, container) {
  const width = document.querySelector(".remote").scrollWidth * -1;
  const Scontainer = document.querySelectorAll(container);
  Scontainer[index].scrollBy({
    left: width, // Adjust the scroll amount as needed
    behavior: "smooth", // Smooth scroll effect
  });
}
function scrollRightAction(index, container) {
  const width = document.querySelector(".remote").scrollWidth;

  const Scontainer = document.querySelectorAll(container);
  // console.log(Scontainer, index, container);
  Scontainer[index].scrollBy({
    left: width, // Adjust the scroll amount as needed
    behavior: "smooth", // Smooth scroll effect
  });
}
export function intial_scroll(container, container2 = ".Modes") {
  const scrollLeftButton = document.querySelector(".scrollLeft");
  const scrollRightButton = document.querySelector(".scrollRight");

  if (scrollLeftButton) {
    scrollLeftButton.addEventListener("click", () =>
      scrollLeftAction(0, container)
    );
  }

  if (scrollRightButton) {
    scrollRightButton.addEventListener("click", () =>
      scrollRightAction(0, container)
    );
  }

  const HscrollLeftButton = document.querySelector(".HscrollLeft");
  const HscrollRightButton = document.querySelector(".HscrollRight");
  let index = 1;
  if (container2 == ".huntergame") index = 0;
  if (HscrollLeftButton) {
    HscrollLeftButton.addEventListener("click", () =>
      scrollLeftAction(index, container2)
    );
  }

  if (HscrollRightButton) {
    HscrollRightButton.addEventListener("click", () =>
      scrollRightAction(index, container2)
    );
  }
}
function initial_down_scroll() {
  //// alert("start");
  const scrollDownButton = document.querySelector(".arrow-down");
  const width = document.querySelector(".pingpong").scrollHeight;
  scrollDownButton.addEventListener("click", () => {
    const container = document.querySelector(".main-content");
    container.scrollBy({
      top: width, // Adjust the scroll amount as needed
      behavior: "smooth", // Smooth scroll effect
    });
  });
}

function initial_up_scroll() {
  const scrollUpButton = document.querySelector(".arrow-up");
  const width = document.querySelector(".pingpong").scrollHeight;
  scrollUpButton.addEventListener("click", () => {
    const container = document.querySelector(".main-content");
    container.scrollBy({
      top: -width, // Adjust the scroll amount as needed
      behavior: "smooth", // Smooth scroll effect
    });
  });
}
export function initialHorizontalScroll() {
  initial_down_scroll();
  initial_up_scroll();
}
