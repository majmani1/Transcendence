var url = window.location.href;
const parsedUrl = new URL(url);
document
  .querySelector(".subButton")
  .addEventListener("click", async function (e) {
    e.preventDefault();
    const formD = {
      email: document.getElementById("emailInput").value,
    };
    try {
      const response = await fetch(
        `https://${parsedUrl.hostname}:4443/Authe/user/reset/password/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formD),
        }
      );

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

        throw new Error(errorData.error || "Error Registering User");
      } else {
        const res = await response.json();
        window.createAlert(res.message, "alert");
      }
    } catch (error) {
      window.createAlert(error, "alert_error");
    }
  });

