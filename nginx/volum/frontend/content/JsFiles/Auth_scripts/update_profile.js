
var url = window.location.href;
const parsedUrl = new URL(url);

async function Active_TWOFA() {
  try {
    const response = await fetch(`https://${parsedUrl.hostname}:4443/Authe/enable-2fa/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${access}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Logout error ");
    } else {
      const data = await response.json();
      const otpUri = data.otp_uri; // Extract the OTP URI from the response

      // Generate the QR code using the otpUri
      const qrcodeContainer = document.getElementById("qrcode"); // Make sure this div exists in your HTML
      qrcodeContainer.innerHTML = ""; // Clear any existing QR code
      new QRCode(qrcodeContainer, otpUri); // Generate the QR code

    
    }
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

async function Confirme_TWOFA() {
  try {
    // const clientTime = Math.floor(Date.now() / 1000);
    const codee = document.getElementById("2FA").value;
    //// alert(codee)
    //// alert(clientTime)
    const response = await fetch(`https://${parsedUrl.hostname}:4443/Authe/verify-2fa/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${access}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: codee }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Error Verification ");
    } else {
      window.createAlert("Two Factor Authentication enabled successfully", "alert");
    }
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

async function Verification_2FA() {
  try {
    const codee = document.getElementById("2FA").value;
    const response = await fetch(
      `https://${parsedUrl.hostname}:4443/Authe/verify-active-2FA/`,
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
      throw new Error(errorData.detail || "Error Verification ");
    } else {
     // alert("gggggooooooooodddddddd");
    }
  } catch (error) {
    console.error("Fetch error:", error);
  }
}
