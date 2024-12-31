var backR = document.getElementById("back");
var freinds = document.getElementsByClassName("friends")[0];
var mesgs = document.getElementsByClassName("messages")[0];
// let profile = document.getElementsByClassName("profile")[0];
// let base = document.getElementsByClassName("base")[0];
var allfriendR = document.querySelector(".allfriend");
var det = document.querySelector("#det");
var detImage = document.querySelector("#detImage");
var details_content = document.querySelector(".details-content");

if (window.innerWidth <= 1000) {
}

if (detImage) {
  detImage.addEventListener("click", function () {
    if (details_content.classList.contains("none"))
      details_content.classList.remove("none");
    else details_content.classList.add("none");
  });
}

det.addEventListener("click", function (event) {
  console.log(
    "hellllllllllooooo   " +
      event.target.classList.contains("detail") +
      event.target.textContent
  );
  if (event.target.classList.contains("viewprofile")) {
    details_content.classList.add("none");
    profile.style.display = "flex";
    mesgs.style.display = "none";
    freinds.style.display = "none";
    if (window.freindOrGroup == "freind") {
      profile.innerHTML = `<img src="../imageLandscape/goBack.png" alt="" class="profileBack" style="display: none;">
                    <img class="userImage" src="../imageLandscape/ang.jpeg" alt="">
                    <h2 style="color: aliceblue;">khallal</h2>
                    <div class="blockOrPlaying">
                        <img class="block" src="../imageLandscape/block.png" alt="">
                        <img class="invite" src="../imageLandscape/inviteToGame.png" alt="">
                    </div>
                <ul style="color: aliceblue;">
                    <li>level 6.5</li>
                    <li>score 10</li>
                    <li>first game 9</li>
                    <li>second game 8</li>
                    <li>tournament 7</li>
                </ul>`;
    } else {
      window.freindOrGroup = "user";
      // fetchGroupUsers(roomName);
    }
  }
});

backR.addEventListener("click", function (event) {
  console.log("hnaaaaaaaaaaaaaaaaa");
  if (window.innerWidth <= 900) {
    mesgs.style.display = "none";
    freinds.style.display = "block";
    profile.style.display = "none";
  }
});
var lastresize = document.body.clientWidth;
window.addEventListener("resize", function (event) {
  let currentsize = document.body.clientWidth;
  console.log(lastresize + "    :  " + currentsize);
  if (lastresize <= 900 && currentsize > 900) {
    freinds.style.display = "block";
    profile.style.display = "flex";
    mesgs.style.display = "block";
  } else if (lastresize > 900 && currentsize <= 900) {
    freinds.style.display = "block";
    profile.style.display = "none";
    mesgs.style.display = "none";
  }
  lastresize = currentsize;
});
allfriendR.addEventListener("click", function (event) {
  if (
    event.target.classList.contains("name") ||
    event.target.classList.contains("groupname")
  ) {
    if (window.innerWidth < 900) {
      freinds.style.display = "none";
      mesgs.style.display = "block";
    }
  }
});

// // const back = document.querySelector("#back");
// back.addEventListener("click", function(event){

// })

// view profile
// invite to game
// block
