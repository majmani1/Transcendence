var user1_login;
function get_user() {
  // console.log(document.getElementById("textInput"));
  if (document.getElementById("myForm") != null) {
    document
      .getElementById("myForm")
      .addEventListener("submit", function (event) {
        event.preventDefault();
        user1_login = document.getElementById("textInput").value;
        window.location.replace(
          `http://localhost:80/chat?user1_login=${encodeURIComponent(
            user1_login
          )}`
        );
      });
  }
}
