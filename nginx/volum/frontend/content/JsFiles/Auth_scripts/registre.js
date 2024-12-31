import Router from "../Router.js";
// ============= registre User Script =============

export async function registreForm(formData) {
  let resp;
  try {
    var url = window.location.href;
    const parsedUrl = new URL(url);
    resp = await fetch(`https://${parsedUrl.hostname}:4443/Authe/user/registre/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!resp.ok) {
      const errorData = await resp.json();

      const firstErrorField = Object.keys(errorData)[0];
      const firstErrorMessage = errorData[firstErrorField][0];

      throw new Error(firstErrorMessage || "Error Registering User");
    }
    Router.navigateTo("/sign-in", true);
    window.createAlert("Your account has been created!", "alert");
  } catch (error) {
    window.createAlert(error.message);
  }
}
