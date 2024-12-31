import Router from "../Router.js";
var url = window.location.href;
const parsedUrl = new URL(url);
const hostname = parsedUrl.hostname;

export async function LoginForm(formD) {
  try {
    const response = await fetch(`https://${hostname}:4443/Authe/user/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formD),
    });
    if (!response.ok) {
      const errorData = await response.json();

      if (errorData.errors) {
        const fieldErrors = Object.keys(errorData.errors);
        if (fieldErrors.length > 0) {
          const firstField = fieldErrors[0];
          const firstErrorMessage = errorData.errors[firstField][0];
          throw new Error(firstErrorMessage);
        }
      }

      throw new Error(firstErrorMessage || "Error Registering User");
    }
    const data = await response.json();

    if (data.message == "2FA are enabled") {
      HandleTwoFactor();
    } else {
      var dataOfUser = await parsNewJWT();
      window.dataUserGame = dataOfUser;
      Router.navigateTo("/LandingPage", true);
      window.createAlert(
        "Welcome " +
          dataOfUser["first_name"] +
          " " +
          dataOfUser["last_name"] +
          " !",
        "alert"
      );
    }
  } catch (error) {
    window.createAlert(error.message, "alert_error");
  }
}

// front two factory
function injectScriptElement2(
  src,
  type = "text/javascript",
  async = false,
  defer = false
) {
  const scriptElement = document.createElement("script");
  scriptElement.src = src;
  scriptElement.className = "dynamic-script"; // Add class to identify dynamic scripts
  // scriptElement.type = type; // Set the script type, e.g., "module"

  if (async) {
    scriptElement.async = true; // Enable async loading
  }

  if (defer) {
    scriptElement.defer = true; // Enable deferred execution
  }

  document.body.appendChild(scriptElement);
}
function removeLinks() {
  const dynamicLinks = document.querySelectorAll(".dynamic-link");
  dynamicLinks.forEach((link) => {
    link.parentNode.removeChild(link);
  });
}
function injectLinkElement(rel, href, integrity, crossorigin) {
  return new Promise((resolve, reject) => {
    const link = document.createElement("link");
    link.rel = rel;
    link.href = href;
    link.className = "dynamic-link"; // Add class to identify dynamic links
    if (integrity) link.integrity = integrity;
    if (crossorigin) link.crossOrigin = crossorigin;
    link.onload = () => resolve();
    link.onerror = () => reject(new Error(`Failed to load CSS: ${href}`));
    document.head.appendChild(link);
  });
}
function HandleTwoFactor() {
  var signin = document.querySelector(".sign_form");

  if (signin) signin.hidden = true;
  removeLinks();
  var blureffect = document.querySelector(".my-container");
  blureffect.style.animation = "blurEffect 1s linear";
  blureffect.style.filter = "blur(10px)";

  injectLinkElement(
    "stylesheet",
    "https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css",
    null,
    null
  );
  injectLinkElement("stylesheet", "./twofa.css", null, null);
  injectLinkElement("stylesheet", "./style.css", null, null);

  var twofactory = document.createElement("section");
  twofactory.classList.add("container");
  twofactory.innerHTML = `
      <br />
      <div class="row">
        <div class="col-lg-5 col-md-7 mx-auto my-auto">
          <div class="card">
            <div class="card-body px-lg-5 py-lg-5 text-center">
              <img
                src="../imageLandscape/character2.png"
                class="rounded-circle avatar-lg img-thumbnail mb-4"
                alt="profile-image"
              />
              <h2 class="text-info">2FA Security</h2>
              <p class="mb-4">
                Enter 6-digits code from your athenticatior app.
              </p>
              <form>
                <div class="row mb-4">
                  <div class="col-lg-2 col-md-2 col-2 ps-0 ps-md-2">
                    <input
                      id="digit1"
                      type="number"
                      min="0"
                      max="9"
                      maxlength="1"
                      class="form-control text-lg text-center digit"
                      placeholder="_"
                      aria-label="2fa"
                      autofocus
                    />
                  </div>
                  <div class="col-lg-2 col-md-2 col-2 ps-0 ps-md-2">
                    <input
                      id="digit2"
                      type="number"
                      min="0"
                      max="9"
                      maxlength="1"
                      class="form-control text-lg text-center digit"
                      placeholder="_"
                      aria-label="2fa"
                    />
                  </div>
                  <div class="col-lg-2 col-md-2 col-2 ps-0 ps-md-2">
                    <input
                      id="digit3"
                      type="number"
                      min="0"
                      max="9"
                      maxlength="1"
                      class="form-control text-lg text-center digit"
                      placeholder="_"
                      aria-label="2fa"
                    />
                  </div>
                  <div class="col-lg-2 col-md-2 col-2 pe-0 pe-md-2">
                    <input
                      id="digit4"
                      type="number"
                      min="0"
                      max="9"
                      maxlength="1"
                      class="form-control text-lg text-center digit"
                      placeholder="_"
                      aria-label="2fa"
                    />
                  </div>
                  <div class="col-lg-2 col-md-2 col-2 pe-0 pe-md-2">
                    <input
                      id="digit5"
                      type="number"
                      min="0"
                      max="9"
                      maxlength="1"
                      class="form-control text-lg text-center digit"
                      placeholder="_"
                      aria-label="2fa"
                    />
                  </div>
                  <div class="col-lg-2 col-md-2 col-2 pe-0 pe-md-2">
                    <input
                      id="digit6"
                      type="number"
                      min="0"
                      max="9"
                      maxlength="1"
                      class="form-control text-lg text-center digit"
                      placeholder="_"
                      aria-label="2fa"
                    />
                  </div>
                </div>
                
              </form>
            </div>
          </div>
        </div>
      </div>
  `;
  document.querySelector(".bodyS").appendChild(twofactory);
  document.getElementById("digit1").focus();
  injectScriptElement2(
    "https://code.jquery.com/jquery-1.10.2.min.js",
    "text/javascript",
    false,
    false
  );
  injectScriptElement2(
    "https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.bundle.min.js",
    "text/javascript",
    false,
    false
  );
  injectScriptElement2(
    "JsFiles/FrontTwoFactory.js",
    "text/javascript",
    false,
    false
  );
  collect_code();
}

function collect_code() {
  var digits = document.querySelectorAll(".digit");

  digits.forEach(function (digit) {
    digit.addEventListener("input", function () {
      // Check if all input fields are filled
      var allFilled = Array.from(digits).every(function (input) {
        return input.value !== "";
      });

      if (allFilled) {
        // Collect the values from each input field
        var code = "";
        digits.forEach(function (input) {
          code += input.value;
        });

        Verification_2FA(code);
        // You can now process the collected code as needed
      }
    });
  });
}
async function Verification_2FA(code) {
  // var access = getCookiee("access_token");
  try {
    const response = await fetch(
      `https://${hostname}:4443/Authe/verify-active-2FA/`,
      {
        method: "POST",
        headers: {
          // Authorization: `Bearer ${access}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: code }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      window.createAlert(errorData.non_field_errors[0], "alert_error");

      throw new Error(errorData || "Error Verification ");
    } else {
      var dataOfUser = await parsNewJWT();
      window.Router.navigateTo("/LandingPage", true);
      window.createAlert(
        "Welcome " +
          dataOfUser["first_name"] +
          " " +
          dataOfUser["last_name"] +
          " !",
        "alert"
      );
    }
  } catch (error) {}
}
//END front two factory
export async function logoutFunciton() {
  var accessToken = getCookiee("access_token");
  try {
    const response = await fetch(
      `https://${hostname}:4443/Authe/user/logout/`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Logout error ");
    } else {
      deleteCookie("access_token");
    }
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

export async function check_Oauth(code, params) {
  var url = window.location.href;

  const parsedUrl = new URL(url);

  const hostname = parsedUrl.hostname;
  let google = false;
  const keyword = "google";

  for (const [key, value] of params.entries()) {
    if (value.toLowerCase().includes(keyword.toLowerCase())) {
      google = true;
      break;
    }
  }

  // end parse
  if (!google) {
    let resp = await fetch(`https://${hostname}:4443/Authe/Auth/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code }),
    });
    const data = await resp.json();
    if(!resp.ok){
      window.createAlert("Error happened try later", "alert_error");
    }
    if (data.message == "2FA are enabled") {
      HandleTwoFactor();
    } else {
      var dataOfUser = await parsNewJWT();
      window.dataUserGame = dataOfUser;
      Router.navigateTo("/LandingPage", true);
      window.createAlert(
        "Welcome " +
          dataOfUser["first_name"] +
          " " +
          dataOfUser["last_name"] +
          " !",
        "alert"
      );
    }
  } else {
    let resp = await fetch(`https://${hostname}:4443/Authe/google_callback/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code }),
    });
    const data = await resp.json();
    if(!resp.ok){
      window.createAlert("Error happened try later", "alert_error");
    } else if (data.message == "2FA are enabled") {
      HandleTwoFactor();
    } else if (resp.ok) {
      var dataOfUser = await parsNewJWT();
      window.dataUserGame = dataOfUser;
      const loading = document.querySelector(".loading-spinner");
      if (loading) loading.style.display = "flex";
      Router.navigateTo("/LandingPage", true);
      window.createAlert(
        "Welcome " +
          dataOfUser["first_name"] +
          " " +
          dataOfUser["last_name"] +
          " !",
        "alert"
      );
    }
  }
}
