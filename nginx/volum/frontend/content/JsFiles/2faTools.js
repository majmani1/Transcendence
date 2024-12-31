export function changeTwoFa() {
  var qrcode = document.querySelector(".qrcode");
  qrcode.innerHTML = `
	<span class="disbale2fa">click to disable 2FA</span>
		
		  <div class="icon-container">
			<i class="fa-solid fa-lock"></i>
			<i class="fa-solid fa-lock-open"></i>
		  </div>
	`;
  var disable = document.querySelector(".icon-container");
  disable.removeEventListener("click", () => {
    disableTwoFa();
  });
  disable.addEventListener("click", () => {
    disableTwoFa();
  });
}
function disableTwoFa() {
  var lock = document.querySelector(".fa-lock");
  lock.style.display = "none";
  var lockOpen = document.querySelector(".fa-lock-open");
  lockOpen.style.display = "inline";
  disable_TWOFA_backend();
  //// alert("disable");
}
async function disable_TWOFA_backend() {
  var access = getCookiee("access_token");
  try {
    const response = await fetch(
      `https://${parsedUrl.hostname}:4443/Authe/disable-2fa/`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${access}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Error Verification ");
    } else {
      window.Router.navigateTo("/profile");
    }
  } catch (error) {
    console.error("Fetch error:", error);
  }
}
