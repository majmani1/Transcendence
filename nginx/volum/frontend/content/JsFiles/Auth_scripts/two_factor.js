
function handle_many_clicks() {
  var qrcode = document.querySelector(".qrcode");
  var qrImage = qrcode.querySelector("img");
  if (qrImage) {
    qrImage.remove();
    document.getElementById("qr").innerHTML = `
      <ol>
            <li>Click to get the QrCode</li>
            <li>Scan the Qrcode with your <br> authenticator app</li>
            <li>Enter the code to activate <br> the two-factor authentication</li>
          </ol>
      `;
    var input = document.querySelectorAll(".digit");
    input.forEach((inputs) => {
      inputs.disabled = true;
    });
    return true;
  }
  return false;
}
async function Handle_TWOFA() {
  if (handle_many_clicks()) return;
  var access = getCookiee("access_token");
  var data = parseJwt(access);

  //// alert(document.getElementById("qrcode-switch").value);
  if (data["2fa"] == false) {
    try {
      const response = await fetch(
        `https://${parsedUrl.hostname}:4443/Authe/enable-2fa/`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${access}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Logout error ");
      } else {
        //// alert('mazyan')
        const data = await response.json();
        const otpUri = data.otp_uri;
        // console.log(otpUri);

        var qrcodeContainer = document.getElementById("qr");
        if (qrcodeContainer) {
          qrcodeContainer.innerHTML = ""; // Clear any existing QR code
          new QRCode(qrcodeContainer, otpUri); //-----------------------------------> to be added only if he checked the box
          var input = document.querySelectorAll(".digit");
          input.forEach((inputs) => {
            inputs.disabled = false;
          });
          input[0].focus();
        } // Generate the QR code
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  } else {
    document.getElementById("qrcode-switch").value = "on";
    //delete two factor
  }
}

var twofactory = document.querySelector(".twofactory");
if (twofactory) {
  //// alert("twofactory");
  // if (data["2fa"] == true) {
  twofactory.removeEventListener("click", twofactory_function);
  twofactory.addEventListener("click", twofactory_function);
  // }
}
async function twofactory_function() {
  var access = getCookiee("access_token");
  var data = parseJwt(access);
  var qrcode = document.querySelector(".qrcode");
  if (qrcode.hidden == false) return;
  qrcode.hidden = false;
  let hide = document.querySelector(".hide_others");
  hide.hidden = false;
  hide.removeEventListener("click", close_qrcode);
  hide.addEventListener("click", close_qrcode);
  //// alert(data["2fa"]);
  if (data["2fa"] == false) {
    var twofactoryQR = document.querySelector(".slider");

    if (twofactoryQR) {
      twofactoryQR.removeEventListener("click", Handle_TWOFA);
      twofactoryQR.addEventListener("click", Handle_TWOFA);
    }
  }

  function close_qrcode(event) {
    qrcode.style.animation = "zoomOutQrcode 0.5s";
    qrcode.addEventListener("animationend", handleAnimationEnd);
    function handleAnimationEnd() {
      hide.hidden = true;
      hide.removeEventListener("click", close_qrcode);
      qrcode.hidden = true; // Hide the QR code
      qrcode.removeEventListener("animationend", handleAnimationEnd);
      qrcode.style.animation = "";
    }
  }
  // var slid = document.querySelector(".slider");
  // slid.addEventListener("click", slide_activate)
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
          // console.log(input.value);
        });

        Confirme_TWOFA(code);
        // You can now process the collected code as needed
      }
    });
  });
}
collect_code();
async function Confirme_TWOFA(codee) {
  var access = getCookiee("access_token");
  try {
    // const clientTime = Math.floor(Date.now() / 1000);

    //// alert(clientTime)
    const response = await fetch(
      `https://${parsedUrl.hostname}:4443/Authe/verify-2fa/`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${access}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: codee }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      window.createAlert(errorData.non_field_errors[0]);
      throw new Error(errorData.detail || "Error Verification ");
    } else {
      window.Router.navigateTo("/profile");
    }
  } catch (error) {
    console.error("Fetch error:", error);
  }
}
