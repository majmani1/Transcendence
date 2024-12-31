function getCookie(name) {
  var value = `; ${document.cookie}`;
  var parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}
var accessToken = getCookie("access_token");

getDataUser(); //and lqunch everything with it

async function getDataUser() {
  var accessToken = getCookie("access_token");
  try {
    var url = window.location.href;
    const parsedUrl = new URL(url);
    const resp = await fetch(
      `https://${parsedUrl.hostname}:4443/Authe/user/check/token`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    var infos_user = await resp.json();

  if (resp.status == 200) {
    // console.log("Token is valid");
  } else {
    // console.log("Token is invalid");
  }
} catch (error) {
  // console.log(error);
} finally {

if(window.socketChat && window.socketChat.readyState == 1)
    window.socketChat.close();
var usernameGroup;
var passw;
var groupName;
var createRoom = document.querySelector("#createRoom");
var addroom = document.querySelector("#addroom");
var base = document.querySelector(".base");
var blockF = document.querySelector(".blockF");
var profile = document.querySelector(".profile");
var invite = document.querySelector(".invite");
window.freindOrRoom = 'freind';
window.freindOrGroup = 'freind';
var typing  = document.querySelector(".typing");
var warning = document.querySelector("#warning");
window.socketChat = null;
window.groupSocket = null;
var roomName = "";
var messageNotVu = [];
var user1_login = infos_user['id'];
var user2_login;
var typeOfGroup = document.querySelector("#typeOfGroup");
var passwordInput = document.querySelector("#password");
var joinRoom = document.querySelector("#joinRoom");
var groupScroll = document.querySelector("#groupScroll");
var groups_for_join = document.querySelector('#groups_for_join');
var cancel = document.querySelector('#cancel');
var roomPassword = document.querySelector('.enterPassword');
var pass = document.querySelector('#pass');
var changeOrAddPass = document.querySelector('#changeOrAddPass');
var enterPasswordChange = document.querySelector('.enterPasswordChange');
var profileBack = document.querySelector('.profileBack');
var muteTime = document.querySelector('.muteTime');
var rooms = document.querySelector('#rooms');
var join = document.querySelector('#join');
var leaveRoom = document.querySelector('#leaveRoom');
var typeOfRoom;
var createRoomCancel = document.querySelector('.createRoomCancel');
var addFreind = document.querySelector('#addFreind');
var cancelInvite = document.querySelector('#cancelInvite');
var friendsAvailable = document.querySelector('#friendsAvailable');
var cancelchange = document.querySelector('#cancelchange');
var headen = document.querySelector('.hide_others');
var search = document.querySelector(".search");
var username2;

headen.addEventListener('click', function(){
    if(!(search.hidden)){
        search.hidden = true;
        headen.hidden = true;
        base.style.filter = 'blur(0px)';
    }
})

base.addEventListener('click', function(event){
  if ((!(event.target.classList.contains('addFreindDiv')) && event.target.id !== 'addFreind')) {
      var add = document.querySelector(".search")
      
      if(add && !(add.classList.contains('none'))) {
          add.hidden= true;
          base.style.filter = 'blur(0)';
      }
      if (muteTime && muteTime.style.display == 'block' && !(event.target.classList.contains('mute')))
      {
          muteTime.style.display = 'none';
      }
  }
})
window.lastloca = "chat"


var inviteToGroup = async (username) => {
    var user2_login_data = await getIdOfUser(username);
    user2_login = user2_login_data["id"];
    var data = {
      from: infos_user["id"],
      to: user2_login,
      type: "invite to group",
      sender: infos_user["username"],
      groupName: roomName,
    };
    var response = await fetch(
      `https://${parsedUrl.hostname}:4443/notif/notificationDatabase/${infos_user["id"]}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "Application/json",
        },
        body: JSON.stringify(data),
      }
    );
    if (response.ok){
      var responseData = await response.json();
      if(responseData['status'] == 'success')
          postToNotif("invite to group");
    }
    // postToNotif("invite to group");
  };
  if (friendsAvailable) {
    friendsAvailable.addEventListener("click", function (event) {
      if (event.target.matches("#buttonInvite")) {
        var freindS = event.target.closest("#friendS");
        var username = freindS.querySelector("#friendInfo h2").innerText;
        inviteToGroup(username);
    }
})
}
if(cancelchange){
cancelchange.addEventListener('click', function(){
  headen.hidden = true;
  base.style.filter = 'blur(0px)';
  enterPasswordChange.style.display = 'none';
})}
if(cancelchange){
cancelInvite.addEventListener('click', function(){
  headen.hidden = true;
  document.querySelector('#freindToInvite').style.display = 'none';
  base.style.filter = 'blur(0px)';
})}


if(addFreind){
  addFreind.removeEventListener("click", search_addfriend);
  addFreind.addEventListener("click", search_addfriend);
}
var isBlurred = false; 
function search_addfriend() {
  base.style.filter = 'blur(10px)';

  var search = document.querySelector(".search");
  search.hidden = !search.hidden;
  if (isBlurred) {
    search.hidden = true;
    isBlurred = false;
    headen.hidden = true;
} else {
    isBlurred = true;
    search.hidden = false;
    headen.hidden = false;
    document.querySelector(".search__results").innerHTML = "";
    document.querySelector(".search__input").value = "";
}

isBlurred = !isBlurred;
document.querySelector(".search__input").focus();
}
var sendFriendRequest = async (username) => {
  var data = {
      user_friend:username,
  }
  var response = await fetch(`https://${parsedUrl.hostname}:4443/Authe/user/friend/request/`,{
      method: 'POST',
      headers : {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'Application/json',
      },
      body: JSON.stringify(data)
  })
  // const data = await response.json();
  if (response.status == 200) {
      
      var responseData = await response.json();
      var Swap = user2_login;
      user2_login = responseData['into'];
      postToNotif('Friend_request')
      user2_login = Swap;
  }else if (response.status == 201) {
    window.createAlert("Friend request has already been sent", "alert_error");
  }
}


if(createRoomCancel){
createRoomCancel.addEventListener('click', function(){
  headen.hidden = true;
  headen.style.zIndex = 99;
  addroom.style.display = 'none';
  base.style.filter = 'blur(0px)';
})}

var removePass = async (data, typeOfchange) => {
  var response = await fetch(`https://${parsedUrl.hostname}:4443/chatContainer/GroupChanges/${typeOfchange}/`, {
      method : 'PUT',
      headers : {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'Application/json',
      },
      body: JSON.stringify(data)
  })
}
if(changeOrAddPass){
changeOrAddPass.addEventListener('submit', function(event){
  event.preventDefault();
  var passw = document.querySelector('.passwChangeOrAdd').value;
  if(passw != '') {
      var data = {
          groupName:roomName,
          user:user1_login,
          code:passw
      }
      removePass(data, 'add');
      passw = '';
      enterPasswordChange.style.display = 'none';
      base.style.opacity = 1;
      base.style.filter = 'blur(0px)';
      var change = document.querySelector('.changePass');
      headen.hidden = true;
      if (change.classList.contains('none'))
      {
          change.classList.remove('none');
          document.querySelector('.addPass').classList.add('none')
      }
      // else{
          
      //     change.classList.add('none');
      //     document.querySelector('.addPass').classList.remove('none')
    
      // }
  }
  else{
    createAlert('password is empty', 'alert_error');
  }
})
}


var leaveR = async (typeOfchange) => {
    if(roomName){
        var data = {
            groupName:roomName,
            user:user1_login,
        } 
        var response = await fetch(`https://${parsedUrl.hostname}:4443/chatContainer/GroupChanges/${typeOfchange}/`, {
            method : 'PUT',
            headers : {
                'Authorization': `Bearer ${accessToken}`,
            },
            body: JSON.stringify(data)
        })
        if(response.ok)
        {
            user2_login = user1_login;
            fetchGroup();
            profile.innerHTML = "";
            typing.style.display = 'none'; 
            postToNotif('kick');
        }
    }
}

leaveRoom.addEventListener('click', function(){
  leaveR('leave_room'); 
})

    function calculateTimeOfMute(timestring) {
      var [hour, munite, secondMicro] = timestring.split(":");
      var [second, microseconds] = secondMicro.split(".");

      var hourint = parseInt(hour) * 60 * 60 * 1000;
      var minInt = parseInt(munite) * 60 * 1000;
      var secondInt = parseInt(second) * 1000;
      var microsecondsInt = parseInt(microseconds) / 1000;
      return hourint + minInt + secondInt + microsecondsInt;
    }
    if (muteTime) {
      muteTime.addEventListener("click", function (event) {
        if (event.target.tagName === "LI") {
          var value = event.target.value;
          if (value == 0) {
            muteUser("mute", NaN);
            document.querySelector(".mute").src =
              "../imageLandscape/unmute.png";
            document.querySelector(".mute").classList.add("unmute");
            document.querySelector(".mute").classList.remove("mute");
          } else muteUser("mute", value);
          muteTime.style.display = "none";
        }
      });
    }

var checkPass = async () => {
  var data = {
      groupName:groupName ,
      code:passw,
      username:infos_user['username'],
      invite:false
  };
  var response = await fetch(`https://${parsedUrl.hostname}:4443/chatContainer/fetchGroup/${user1_login}/`, {
      method : 'PUT',
      headers : {
          'Authorization': `Bearer ${accessToken}`,
      },
      body : JSON.stringify(data),
  });
  if (response.ok)
  {
      var response_data = await response.json();
      if(response_data['status'] == 'success')
      {
        roomPassword.style.display = 'none';
        groups_for_join.style.filter = 'blur(0px)';
        base.style.filter = 'blur(0px)';
        groups_for_join.style.display = 'none';
        fetchGroup();
      }
      else {
        createAlert(response_data['status'], "alert_error");
        roomPassword.style.display = 'none';
        groups_for_join.style.filter = 'blur(0px)';
        groups_for_join.style.display = 'none';
      }
      headen.hidden = true;
  }
  else {
    headen.hidden = true;
  }
}
if(pass){
pass.addEventListener('submit', function(event){
  event.preventDefault();
  passw = document.querySelector('.passw').value;
  checkPass();
})}

var joinToRoom = async () => {
  var is_protected = await fetch(`https://${parsedUrl.hostname}:4443/chatContainer/is_protected/${groupName}/`,{
      method:'GET',
      headers : {
          'Authorization': `Bearer ${accessToken}`,
      },
  });
  var data = await is_protected.json();
  if(data['type'] != 'protected'){
      var data = {
          groupName:groupName ,
          username:infos_user['username'],
          user_image:infos_user['picture'],
          invite:false
      };
      var response = await fetch(`https://${parsedUrl.hostname}:4443/chatContainer/fetchGroup/${user1_login}/`, {
          method : 'PUT',
          headers : {
              'Authorization': `Bearer ${accessToken}`,
          },
          body : JSON.stringify(data),
      });
      base.style.filter = 'blur(0px)';
      groups_for_join.style.display = 'none';
      fetchGroup()
      headen.hidden = true;
  }
  else {
      roomPassword.style.display = 'flex';
      groups_for_join.style.filter = 'blur(5px)';
  }

}

if(groupScroll){
groupScroll.addEventListener('click', function(event){
  if(event.target.matches('#buttonJoin')){
      headen.style.zIndex = 99;
      var groupDiv = event.target.closest('#group');
      groupName = groupDiv.querySelector('#groupsInfo h2').innerText;
      joinToRoom();
      fetchGroup();
  }
})}
if(cancel){
cancel.addEventListener('click', function(){
  headen.hidden = true;
  base.style.filter = 'blur(0px)';
  groups_for_join.style.display = 'none';
})
}
var groupAvailable = async () =>  {
  var response = await fetch(`https://${parsedUrl.hostname}:4443/chatContainer/fetchGroup/${user1_login}`,{
      method:'GET',
      headers : {
          'Authorization': `Bearer ${accessToken}`,
      },
  });
  var data = await response.json();
  groupScroll.innerHTML = '';
  for (var index = 0; index < data.length; index++) {
      groupScroll.innerHTML += `<div id="group">
                  <div id="groupsInfo">
                      <img src="../imageLandscape/mihok.webp" alt="">
                      <h2>${data[index]["groupName"]}</h2>
                  </div>
                  <button id="buttonJoin">join</button>
              </div>`
  }
}
if(joinRoom){
  joinRoom.addEventListener("click", function(event){
  headen.hidden = false;
  groupAvailable();
  base.style.filter = 'blur(10px)';
  groups_for_join.style.display = 'flex';
})}
function isProtected(){
  if (typeOfGroup.value == 'protected')
      passwordInput.style.display = 'block';
  else {
      passwordInput.style.display = 'none';
      passwordInput.value = "";
  }
}
window.isProtected = isProtected;

var checkBlockStatus = async () => {
      var checkBlock = await checkIsBlockOrNot();
      if (!checkBlock.is_block) typing.style.display = "flex";
};

window.checkBlockStatus = checkBlockStatus;

    var isBlock = async (blockOrUnblock) => {
      var response = await fetch(
        `https://${parsedUrl.hostname}:4443/chatContainer/is_block/${user1_login}/${user2_login}/${blockOrUnblock}/`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (blockOrUnblock == 1) {
        var Block = document.querySelector(".blockF");
        if (Block) {
          Block.src = "../imageLandscape/profile.png";
          Block.classList.add("unblock");
          Block.classList.remove("blockF");
          typing.style.display = "none";
          postToNotif("block");
        }
      } else {
        document.querySelector(".unblock").src = "../imageLandscape/block.png";
        document.querySelector(".unblock").classList.add("blockF");
        document.querySelector(".unblock").classList.remove("unblock");
        data = await checkIsBlockOrNot();
        if(!(data.is_block))
          typing.style.display = "flex";
        postToNotif("unblock");
      }
    };

    var fetchmsg = async () => {
      var resp = await fetch(
        `https://${parsedUrl.hostname}:4443/chatContainer/fetchPrivateMsg/${user1_login}/${user2_login}/`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      var data = await resp.json();
      var element = document.getElementsByClassName("msg-bord")[0];
      element.innerHTML = "";
      for (var index = data.length - 1; index >= 0; index--) {
        var newele = document.createElement("span");
        newele.append(data[index]["message"]);
        if (data[index]["sender"] == user1_login)
          newele.classList.add("sender");
        else newele.classList.add("receiver");
        element.appendChild(newele);
        document.getElementById("msg").value = "";
        element.scroll({
          top: element.scrollHeight,
          behavior: "smooth",
        });
      }
    };

    var warningMsg = () => {
      warning.style.display = "block";
      base.style.filter = "blur(10px)";
      setTimeout(() => {
        warning.style.display = "none";
        base.style.filter = "blur(0)";
      }, 3000);
    };
    // functionwindow.createAlert(message, className) {
    //   const container_message = document.createElement("div");
    //   container_message.classList.add(className);
    //   container_message.textContent = message;
    //   document.body.appendChild(container_message);
    //   if (container_message) {
    //     container_message.addEventListener("animationend", function () {
    //       container_message.remove();
    //     });
    //   }
    // }

    addroom.addEventListener("submit", function (event) {
      event.preventDefault();
      headen.hidden = true;
      headen.style.zIndex = 99;
      var groupname = document.getElementById("roomC").value;
      if (
        groupname.trim() === "" ||
        (typeOfGroup.value === "protected" &&
          passwordInput.value.trim() === "") ||
        groupname.trim().indexOf(" ") > -1
      ) {
        if (
          typeOfGroup.value === "protected" &&
          passwordInput.value.trim() === ""
        )
          window.createAlert(
            "can't create group type protected with empty password",
            "alert_error"
          );
        else
          window.createAlert(
            "the name of group have a space or empty",
            "alert_error"
          );
        addroom.style.display = "none";
      } else {
        var data = {
          groupName: groupname,
          user: user1_login,
          typeOfGroup: typeOfGroup.value,
          password: passwordInput.value,
          username: infos_user["username"],
          user_image: infos_user["picture"],
        };
        var create_room = async () => {
          var response = await fetch(
            `https://${parsedUrl.hostname}:4443/chatContainer/fetchGroup/test/`,
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
              body: JSON.stringify(data),
            }
          );
          addroom.style.display = "none";
          base.style.filter = "blur(0)";
          const response_data = await response.json();
          if (response_data["status"] == "success") {
            fetchGroup();
          } else {
            window.createAlert(response_data["status"], "alert_error");
          }
        };
        create_room();
      }
    });

window.fetchfreindInvite  = async () => {
      var resp = await fetch(
        `https://${parsedUrl.hostname}:4443/Authe/user/friend/list`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "Application/json",
          },
        }
      );
      if (resp.status == 200) {
        var data = await resp.json();
        var ids = data.map((friend) => friend.id);
        var response = await fetch(
          `https://${parsedUrl.hostname}:4443/chatContainer/fetchForInvite/${roomName}/`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "Application/json",
            },
            body: JSON.stringify(ids),
          }
        );
        if (response.ok) {
          var freindInviteData = await response.json();
          var info = [];

          for (var index = 0; index < freindInviteData.length; index++) {
            for (var i = 0; i < data.length; i++) {
              if (freindInviteData[index] == data[i]["id"])
                info.push([data[i]["username"], data[i]["picture"]]);
            }
          }
          var friendsAvailable = document.querySelector("#friendsAvailable");
          friendsAvailable.innerHTML = "";
          for (var i = 0; i < info.length; i++) {
            friendsAvailable.innerHTML += `<div id="friendS">
                      <div id="friendInfo">
                          <img src="${info[i][1]}" alt="">
                          <h2>${info[i][0]}</h2>
                      </div>
                      <button id="buttonInvite">invite</button>
                  </div>`;
          }
      }
  }
}

var usersDiv;
var fetchGroupUsers = async (roomName) => {
  var users = await fetch(`https://${parsedUrl.hostname}:4443/chatContainer/GroupUsers/${roomName}/`,{
      method:'GET',
      headers : {
          'Authorization': `Bearer ${accessToken}`,
      },
  });
  var usersfetch = await users.json();
  var owner = await fetch(`https://${parsedUrl.hostname}:4443/chatContainer/is_owner/${user1_login}/${roomName}/`,{
      method:'GET',
      headers : {
          'Authorization': `Bearer ${accessToken}`,
      },
  });
  var check_owner = await owner.json();
  profile.innerHTML = `<div id="users"></div>`;
  usersDiv = document.querySelector('#users');
  usersDiv.innerHTML = '<img src="../imageLandscape/goBack.png" alt="" class="profileBack" style="display: none;">';
  for (var index = 0; index < usersfetch.length; index++) {
      if(usersfetch[index]['user'] == user1_login)
          continue ;
      if(usersfetch[index]['owner'])
      {
          usersDiv.innerHTML += `<div class="groupsUsers">
                  <img src="${usersfetch[index]["picture"]}" alt="">
                  <div>
                      <p class="GroupUserName">${usersfetch[index]["username"]}</p>
                      <h6>owner</h6>
                  </div>
                  </div>`;
        } else if (usersfetch[index]["admin"]) {
          usersDiv.innerHTML += `<div class="groupsUsers">
                  <img src="${usersfetch[index]["picture"]}" alt="">
                  <div>
                      <p class="GroupUserName">${usersfetch[index]["username"]}</p>
                      <h6>admin</h6>
                  </div>
                  </div>`;
        } else {
          usersDiv.innerHTML += `<div class="groupsUsers">
                          <img src="${usersfetch[index]["picture"]}" alt="">
                          <p class="GroupUserName">${usersfetch[index]["username"]}</p>
                          </div>`;
        }
      }
      if (check_owner["owner"]) {
        if (typeOfRoom) {
          profile.innerHTML += `<div class="passChanges"><button class="inviteUser">Invite User</button>
                          <button class="addPass none">add password</button>
                          <button class="changePass">change password</button>
                          <button class="removePass">remove password</button>
                          </div>`;
        } else {
          profile.innerHTML += `<div class="passChanges"><button class="inviteUser">Invite User</button>
                                  <button class="addPass">add password</button>
                                  <button class="changePass none">change password</button>
                                  <button class="removePass">remove password</button>
                                </div>`;
        }
        var passChanges = document.querySelector(".passChanges");
        passChanges.addEventListener("click", function (event) {
          var data = {
            groupName: roomName,
            user: user1_login,
          };
          if (event.target.classList.contains("removePass")) {
            removePass(data, "remove");
            var change = document.querySelector(".changePass");
            if (change) {
              change.classList.add("none");
              document.querySelector(".addPass").classList.remove("none");
            }
          } else if (event.target.classList.contains("changePass")) {
            headen.hidden = false;
            enterPasswordChange.style.display = "flex";
            base.style.opacity = 0.8;
            base.style.filter = "blur(8px)";
          } else if (event.target.classList.contains("addPass")) {
            headen.hidden = false;
            enterPasswordChange.style.display = "flex";
            base.style.opacity = 0.8;
            base.style.filter = "blur(8px)";
          } else if (event.target.classList.contains("inviteUser")) {
            headen.hidden = false;
            window.fetchfreindInvite();
            document.querySelector("#freindToInvite").style.display = "flex";
            base.style.filter = "blur(10px)";
          }
        });
      }
    };

var fetchGroupMsg = async (roomName) => {
  var response = await fetch(`https://${parsedUrl.hostname}:4443/chatContainer/fetchGroupMsg/${roomName}`,{
      method:'GET',
      headers : {
          'Authorization': `Bearer ${accessToken}`,
      },
  });
  var data = await response.json();
  var element = document.querySelector(".msg-bord");
  element.innerHTML = "";
  for (var index = 0; index < data.length; index++) {
      var newele = document.createElement("div");
      var createP = document.createElement("h6");
      var createSpan = document.createElement("span");
      createP.append(data[index]['sender_username']);
      createSpan.append(data[index]['message']);
      newele.appendChild(createP);
      newele.appendChild(createSpan);
      if(data[index]['sender'] == user1_login){
          newele.classList.add("msgGroupS");}
      else
          newele.classList.add("msgGroupR");
      element.appendChild(newele);
  }
  element.scroll({
      top: element.scrollHeight,
      behavior: "smooth"
  });
  var is_protected = await fetch(`https://${parsedUrl.hostname}:4443/chatContainer/is_protected/${roomName}/`,{
      method:'GET',
      headers : {
          'Authorization': `Bearer ${accessToken}`,
      },
  });
  var type = await is_protected.json();
  if(type['type'] != 'protected')
      typeOfRoom = false;
  else
      typeOfRoom = true;
  fetchGroupUsers(roomName);
}

var postToNotif = async (typeOfNotif) => {
  var response = await fetch(`https://${parsedUrl.hostname}:4443/notif/`, {
      method: 'POST',
      headers : {
          'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify({notif:typeOfNotif, receiver:user2_login.toString(), sender:user1_login.toString(), sender_name:infos_user['username'], groupName:roomName}),
})}

    var userselct;
    var muteUser = async (typeOfchange, time) => {
      var data = {
        groupName: roomName,
        user: user1_login,
        mutedUser: userselct,
        time: time,
      };
      var response = await fetch(
        `https://${parsedUrl.hostname}:4443/chatContainer/GroupChanges/${typeOfchange}/`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(data),
        }
      );
      if (response.ok) {
        user2_login = userselct;
        if (typeOfchange == "mute") postToNotif("mute");
        else if (typeOfchange == "unmute") postToNotif("unmute");
      }
    };

    var kickUser = async (typeOfchange) => {
      var data = {
        groupName: roomName,
        user: user1_login,
        kick_user: userselct,
      };
      var response = await fetch(
        `https://${parsedUrl.hostname}:4443/chatContainer/GroupChanges/${typeOfchange}/`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(data),
        }
      );
      if (response.ok) {
        user2_login = userselct;
        postToNotif("kick");
      }
    };

    var giveOrTakeAdmin = async (typeOfchange) => {
      var data = {
        groupName: roomName,
        user: user1_login,
        targetUser: userselct,
      };
      var response = await fetch(
        `https://${parsedUrl.hostname}:4443/chatContainer/GroupChanges/${typeOfchange}/`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(data),
        }
      );
      if (response.ok) {
        if (typeOfchange == "giveAdmin") {
          window.giveAdmin.classList.add("none");
          window.takeAdmin.classList.remove("none");
        } else {
          window.giveAdmin.classList.remove("none");
          window.takeAdmin.classList.add("none");
        }
      }
    };

    var owner_check = async (data) => {
      var owner = await fetch(
        `https://${parsedUrl.hostname}:4443/chatContainer/is_owner/${user1_login}/${roomName}/`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      var check_owner = await owner.json();
      var winRate = (
        (data["number_of_wins"] / data["number_of_games"]) *
        100
      ).toFixed(2);
      if (winRate == "NaN") winRate = 0;
      if (check_owner["owner"]) {
        owner = await fetch(
          `https://${parsedUrl.hostname}:4443/chatContainer/is_owner/${userselct}/${roomName}/`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        check_owner = await owner.json();
        if (check_owner["admin"]) {
          profile.innerHTML = `<img src="../imageLandscape/goBack.png" alt="" class="profileBack" >
          <img class="userImage" src="${data["picture"]}" alt="">
          <h2 style="color: aliceblue;">${usernameGroup}</h2>
          <div class="blockOrPlaying">
              <img class="mute" src="../imageLandscape/mute.png" alt="">
              <img class="kick" src="../imageLandscape/kick.png" alt="">
              <img class="ban" src="../imageLandscape/ban.png" alt="">
          </div>
          <ul style="color: aliceblue;">
                  <li>level : ${data["level"].toFixed(2)}</li>
                  <li>score : ${data["number_of_wins"]}</li>
                  <li>PingPong  : ${data["number_of_wins_pong"]}</li>
                  <li>Hunter-Game  : ${data["number_of_wins_hunter"]}</li>
                  <li>Win Rate : ${winRate}</li>
          </ul>
          <button class="giveAdmin none">give admin</button>
          <button class="takeAdmin">take admin</button>`;
        } else {
          profile.innerHTML = `<img src="../imageLandscape/goBack.png" alt="" class="profileBack" >
          <img class="userImage" src="${data["picture"]}" alt="">
          <h2 style="color: aliceblue;">${usernameGroup}</h2>
          <div class="blockOrPlaying">
              <img class="mute" src="../imageLandscape/mute.png" alt="">
              <img class="kick" src="../imageLandscape/kick.png" alt="">
              <img class="ban" src="../imageLandscape/ban.png" alt="">
          </div>
          <ul style="color: aliceblue;">
                  <li>level : ${data["level"].toFixed(2)}</li>
                  <li>score :${data["number_of_wins"]}</li>
                  <li>PingPong  : ${data["number_of_wins_pong"]}</li>
                  <li>Hunter-Game  : ${data["number_of_wins_hunter"]}</li>
                  <li>Win Rate : ${winRate}</li>
          </ul>
          <button class="giveAdmin">give admin</button>
          <button class="takeAdmin none">take admin</button>`;
        }
        window.giveAdmin = document.querySelector(".giveAdmin");
        window.takeAdmin = document.querySelector(".takeAdmin");
        giveAdmin.addEventListener("click", function () {
          giveOrTakeAdmin("giveAdmin");
        });
        takeAdmin.addEventListener("click", function () {
          giveOrTakeAdmin("takeAdmin");
        });
      } else if (check_owner["admin"]) {
        profile.innerHTML = `<img src="../imageLandscape/goBack.png" alt="" class="profileBack" >
      <img class="userImage" src="${data["picture"]}" alt="">
      <h2 style="color: aliceblue;">${usernameGroup}</h2>
      <div class="blockOrPlaying">
          <img class="mute" src="../imageLandscape/mute.png" alt="">
          <img class="kick" src="../imageLandscape/kick.png" alt="">
          <img class="ban" src="../imageLandscape/ban.png" alt="">
      </div>
      <ul style="color: aliceblue;">
                <li>level : ${data["level"].toFixed(2)}</li>
                  <li>score : ${data["number_of_wins"]}</li>
                  <li>PingPong  : ${data["number_of_wins_pong"]}</li>
                  <li>Hunter-Game  : ${data["number_of_wins_hunter"]}</li>
                  <li>Win Rate : ${winRate}</li>
      </ul>`;
      } else {
        profile.innerHTML = `<img src="../imageLandscape/goBack.png" alt="" class="profileBack" >
      <img class="userImage" src="${data["picture"]}" alt="">
      <h2 style="color: aliceblue;">${usernameGroup}</h2>
      <ul style="color: aliceblue;">
                  <li>level : ${data["level"].toFixed(2)}</li>
                  <li>score : ${data["number_of_wins"]}</li>
                  <li>PingPong  : ${data["number_of_wins_pong"]}</li>
                  <li>Hunter-Game  : ${data["number_of_wins_hunter"]}</li>
                  <li>Win Rate : ${winRate}</li>
      </ul>`;
      }
    };

    var getIdOfUser = async (username) => {
      var getId = await fetch(
        `https://${parsedUrl.hostname}:4443/Authe/user/friendId/${username}/`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "Application/json",
          },
        }
      );
      if (getId.ok) {
        var data = await getId.json();
        return data;
      }
    };

    var profileClick = async (event) => {
      if (event.target.classList.contains("GroupUserName")) {
        usernameGroup = event.target.textContent;
        var data = await getIdOfUser(usernameGroup);
        userselct = data["id"];
        owner_check(data);
        checkStatusOfMute("li", userselct);
        profileBack.style.display = "block";
      } else if (event.target.classList.contains("unblock")) {
        isBlock(0);
        postToNotif("unblock");
      } else if (event.target.classList.contains("profileBack")) {
        if (
          window.freindOrGroup == "freind" ||
          window.freindOrGroup == "user"
        ) {
          if (window.innerWidth < 900) {
            profile.style.display = "none";
            mesgs.style.display = "block";
            freinds.style.display = "none";
          }
      }
      else if(roomName != "")
          fetchGroupUsers(roomName);
  }
  else if (event.target.classList.contains("mute")) {
      if(document.querySelector(".muteTime").style.display == 'block')
          document.querySelector(".muteTime").style.display = 'none';
      else
          document.querySelector(".muteTime").style.display = 'block';
  }
  else if(event.target.classList.contains("kick"))
      kickUser('kick_out');
  else if (event.target.classList.contains("ban"))
      kickUser('ban');
  else if(event.target.classList.contains("unmute"))
  {
      muteUser('unmute', NaN);
      document.querySelector('.unmute').src = '../imageLandscape/mute.png';
      document.querySelector('.unmute').classList.add('mute');
      document.querySelector('.unmute').classList.remove('unmute');
  }
  else if(event.target.classList.contains("blockF"))
      isBlock(1);
  else if(event.target.classList.contains("invite"))
  {
      var statusOfUser2 = await getIdOfUser(username2);
      if(statusOfUser2['status_player'] == "out Game")
          postToNotif("invite to game");
        else window.createAlert("this player in game", "alert_error");
      }
    };

    profile.addEventListener("click", function (event) {
      profileClick(event);
    });

    function addMessage(event) {
      var data = JSON.parse(event.data);
      var element = document.getElementsByClassName("msg-bord")[0];
      var newele = document.createElement("span");
      newele.append(data["msg"]);
      if (data["sender"] == user1_login) newele.classList.add("sender");
      else newele.classList.add("receiver");
      element.appendChild(newele);
      // document.getElementById("msg").value = "";
      if (data["sender"] == user1_login) {
        element.scroll({
          top: element.scrollHeight,
          behavior: "smooth",
        });
      }
    }

    function sendMessage() {
      var message = document.getElementById("msg").value;
      if (message) {
        var msg_data = {
          type: "message",
          sender: user1_login,
          receiver: user2_login,
          msg: message,
        };
        if (window.socketChat && window.socketChat.readyState == 1) {
          document.getElementById("msg").value = "";
          window.socketChat.send(JSON.stringify(msg_data));
          postToNotif("message");
        }
      }
    }

    function addIsTyping(event) {
      var data = JSON.parse(event.data);
      var typingImg = document.querySelector("#typingStatus");
      if (data["sender"] == user2_login) {
        if (data["typingStatus"]) typingImg.style.display = "block";
        else typingImg.style.display = "none";
      }
    }

    function openNewSocket(user2_login) {
      var urls = `wss://${parsedUrl.hostname}:4443/ws/chat/${user1_login}/${user2_login}/`;
      if (window.socketChat) window.socketChat.close();
      window.socketChat = new WebSocket(urls);
      window.socketChat.onopen = function (event) {
        // console.log("Private WebSocket connection established.");
      };

      window.socketChat.onerror = function (event) {
        console.error("WebSocket error observed:", event);
      };

  window.socketChat.onmessage = function(event) {
      var data = JSON.parse(event.data);
      if (data['type'] == 'typing')
          addIsTyping(event);
      else if (data['type'] == 'error')
      {
          createAlert(data['response'], "alert_error")
          window.socketChat.close();
          window.socketChat = null;
          typing.style.display = "none";
        } else addMessage(event);
      };

      window.socketChat.onclose = function (event) {
        document.getElementById("typingStatus").style.display = "none";
        // console.log("WebSocket connection closed: ", event);
      };
    }

    var timeoutOfTyping;
    function sendTypingStatu(typingStatus) {
      if (window.socketChat && window.socketChat.readyState == 1)
      {
        window.socketChat.send(
          JSON.stringify({
            type: "typing",
            typingStatus: typingStatus,
            sender: user1_login,
          })
        );
      }
    }

    document.getElementById("msg").addEventListener("input", function () {
      clearTimeout(timeoutOfTyping);
      sendTypingStatu(true);
      timeoutOfTyping = setTimeout(() => {
        sendTypingStatu(false);
      }, 2000);
    });

    function sendMessageToGroup() {
      var message = document.getElementById("msg").value;
      if (message) {
        var msg_data = {
          sender: user1_login,
          sender_username: infos_user["username"],
          msg: message,
        };
        if (window.groupSocket.send)
        {
          window.groupSocket.send(JSON.stringify(msg_data));
          document.getElementById("msg").value = "";
        }
      }
    }

    function addMessageInGroup(event) {
      var data = JSON.parse(event.data);
      var element = document.querySelector(".msg-bord");
      var newele = document.createElement("div");
      var createP = document.createElement("h6");
      var createSpan = document.createElement("span");
      createP.append(data["sender_username"]);
      createSpan.append(data["msg"]);
      newele.appendChild(createP);
      newele.appendChild(createSpan);
      if (data["sender"] == user1_login) {
        newele.classList.add("msgGroupS");
      } else newele.classList.add("msgGroupR");
      element.appendChild(newele);
      // document.getElementById("msg").value = "";
      element.scroll({
        top: element.scrollHeight,
        behavior: "smooth",
      });
    }

document.getElementById("button-send").addEventListener("click", function(event){
  event.preventDefault();
  if(window.freindOrGroup == "freind")
      sendMessage();
  else
      sendMessageToGroup();
})


function handleEnter(event){
    if (event.key == "Enter")
    {
        event.preventDefault();
        if (window.freindOrGroup == "freind") sendMessage();
        else sendMessageToGroup();
      }
    }

    window.handleEnter = handleEnter;

    document.addEventListener("keydown", window.handleEnter);

var allfriend = document.querySelector('.allfriend');
function openGroup(nameOfGroup) {
  if (window.groupSocket)
      window.groupSocket.close();
  if (window.socketChat)
      window.socketChat.close();
  window.groupSocket = new WebSocket(`wss://${parsedUrl.hostname}:4443/ws/group/${nameOfGroup}/`);
  window.groupSocket.onopen = function(event) {
      // console.log('Private WebSocket connection established.');
  };
  window.groupSocket.onerror = function(event) {
      console.error('WebSocket error observed:', event);
  };
  window.groupSocket.onmessage = function(event) {
      addMessageInGroup(event);
  };
  window.groupSocket.onclose = function(event) {
      // console.log('WebSocket connection closed:        1');
  };
}

    var countVu = async (user2_login) => {
      var response = await fetch(
        `https://${parsedUrl.hostname}:4443/chatContainer/update_vu/${user1_login}/${user2_login}/`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      var data = await response.json();
      return data["unread_messages_count"];
    };

    var updateVu = async () => {
      var response = await fetch(
        `https://${parsedUrl.hostname}:4443/chatContainer/update_vu/${user1_login}/${user2_login}/`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
    };

    function goToProfile(profileName) {
      if (profileName) {
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
        if(profileName == infos_user['username'])
          window.Router.navigateTo("/profile");
        else
          window.Router.navigateTo("/profile" + "-" + profileName);
      }
    }

    window.goToProfile = goToProfile;

    var checkIsBlockOrNot = async () => {
      var response = await fetch(
        `https://${
          parsedUrl.hostname
        }:4443/chatContainer/is_block/${user1_login}/${user2_login}/${1}/`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      var data = await response.json();
      return { is_block: data.is_block, userBlock: data.userBlock };
    };

var clickOnFreind = async (event) => {
      window.freindOrGroup = "freind";
      if (event.target.textContent != "spoody") {
        var data = await getIdOfUser(event.target.textContent);
        username2 = event.target.textContent;
        user2_login = data["id"];
        fetchmsg();
        updateVu();
        openNewSocket(user2_login);
        var check = await checkIsBlockOrNot();
        if (!check.is_block) {
          var freindDiv = event.target.closest(".myfriend");
          typing.style.display = "flex";
          var notifobj = messageNotVu.find((item) =>
            item.hasOwnProperty(event.target.textContent)
          );
          notifobj[event.target.textContent] = 0;
          freindDiv.querySelector(".notif").style.display = "none";
          freindDiv.querySelector(".notif").textContent = 0;
        } else typing.style.display = "none";
        var winRate = (
          (data["number_of_wins"] / data["number_of_games"]) *
          100
        ).toFixed(2);
        if (winRate == "NaN") winRate = 0;
        profile.innerHTML = `<!-- <img src="../imageLandscape/goBack.png" alt="" class="profileBack" > -->
                  <img src="../imageLandscape/goBack.png" alt="" class="profileBack" style="display: none;">
                  <img class="userImage" src="${
                    data["picture"]
                  }" alt="Profile Picture">
                  <h2 onclick="goToProfile(this.textContent)" style="color: aliceblue;">${
                    event.target.textContent
                  }</h2>
                  <div class="blockOrPlaying">
                      <img class="blockF" src="../imageLandscape/block.png" alt="block user">
                      <img class="invite" src="../imageLandscape/inviteToGame.png" alt="invite user">
                  </div>
              <ul style="color: aliceblue; margin-left:15px;">
                  <li>level : ${data["level"].toFixed(2)}</li>
                  <li>score : ${data["number_of_wins"]}</li>
                  <li>PingPong  : ${data["number_of_wins_pong"]}</li>
                  <li>Hunter-Game  : ${data["number_of_wins_hunter"]}</li>
                  <li>Win Rate : ${winRate}%</li>
              </ul>`
      if(check.userBlock){
          document.querySelector('.blockF').src = '../imageLandscape/profile.png';
          document.querySelector('.blockF').classList.add('unblock');
          document.querySelector('.blockF').classList.remove('blockF');
      }
  }
  else {
      user2_login = "spoody";
      fetchmsg();
      updateVu();
      openNewSocket(user2_login);
      var freindDiv = event.target.closest(".myfriend");
      typing.style.display = 'flex';
      var notifobj = messageNotVu.find(item => item.hasOwnProperty(event.target.textContent));
      notifobj[event.target.textContent] = 0;
      freindDiv.querySelector(".notif").style.display = 'none';
      profile.innerHTML = `<!-- <img src="../imageLandscape/goBack.png" alt="" class="profileBack" > -->
                  <img src="../imageLandscape/goBack.png" alt="" class="profileBack" style="display: none;">
                  <img class="userImage" src="../imageLandscape/GroupImage.png" alt="Profile Picture">
                  <h2 style="color: aliceblue;">${event.target.textContent}</h2>
              <ul style="color: aliceblue; margin-left:15px;">
                  <li>level : <i class="fa-solid fa-infinity"></i></li>
                  <li>score : <i class="fa-solid fa-infinity"></i></li>
                  <li>first game : <i class="fa-solid fa-infinity"></i></li>
                  <li>second game : <i class="fa-solid fa-infinity"></i></li>
                  <li>tournament : <i class="fa-solid fa-infinity"></i></li>
              </ul>`;
      }
    };

    var checkStatusOfMute = async (check, user) => {
      var data = {
        groupName: roomName,
        user: user,
      };
      var response = await fetch(
        `https://${parsedUrl.hostname}:4443/chatContainer/GroupChanges/checkStatus/`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(data),
        }
      );
      var status = await response.json();
      if (response.ok) {
        if (status["statusOfMute"] != 0 && check == "li") {
          if (document.querySelector(".mute")) {
            if (status["statusOfMute"] == "always") {
              document.querySelector(".mute").src =
                "../imageLandscape/unmute.png";
              document.querySelector(".mute").classList.add("unmute");
              document.querySelector(".mute").classList.remove("mute");
            }
          }
        } else if (
          status["statusOfMute"] != 0 &&
          status["statusOfMute"] != "always"
        ) {
          var timeMilisecond = calculateTimeOfMute(status["statusOfMute"]);
          typing.style.display = "none";
          setTimeout(() => {
            typing.style.display = "flex";
          }, timeMilisecond);
        } else if (status["statusOfMute"] == "always")
          typing.style.display = "none";
      }
    };

    window.checkStatusOfMute = checkStatusOfMute;

    allfriend.addEventListener("click", function (event) {
      if (
        event.target.classList.contains("name") ||
        event.target.classList.contains("groupname")
      ) {
        var username = document.querySelector(".username li");
        if (document.getElementById("typing-gif")) {
          document.getElementById("typing-gif").style.display = "none";
          document.getElementById("welcomchat").style.display = "none";
        }
        username.style.setProperty("--before-content", "'•'");
        username.textContent = event.target.textContent;
        if (event.target.classList.contains("name")) clickOnFreind(event);
        else if (event.target.classList.contains("groupname")) {
          window.freindOrGroup = "room";
          roomName = event.target.textContent;
          typing.style.display = "flex";
          checkStatusOfMute("none", user1_login);
          fetchGroupMsg(roomName);
          openGroup(event.target.textContent);
        }
      }
    });


var message = document.querySelector("#msgs");
var group = document.querySelector("#grp");
var firstload = true;


var fetchf = async () => {
  var contSpoody = await countVu("spoody");
  messageNotVu.push({["spoody"] : contSpoody});
  var resp = await fetch(`https://${parsedUrl.hostname}:4443/Authe/user/friend/list`, {
      method: 'GET',
      headers:{
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'Application/json',
      },
  });
  if (resp.status == 200)
  {
      
      var data = await resp.json()
      va = 0;
      if(contSpoody == 0) 
          allfriend.innerHTML = `<div class="myfriend">
                                          <img src="../imageLandscape/GroupImage.png" alt="">
                                          <div class="notif none">${contSpoody}</div>
                                          <p class="name">spoody</p>
                                      </div>`;
        else
          allfriend.innerHTML = `<div class="myfriend">
              <img src="../imageLandscape/GroupImage.png" alt="">
              <div class="notif">${contSpoody}</div>
              <p class="name">spoody</p>
              </div>`;  
      for(var i = 0; i < data.length; i++)
      {
          var notif = await countVu(data[i]['id']);
          var usernameVu = data[i]['username'];
          var pushVu = {[usernameVu] : notif};
          messageNotVu.push(pushVu);
          if (notif != 0)
            allfriend.innerHTML += `<div class="myfriend">
                                          <img src="${data[i]["picture"]}" alt="">
                                          <div class="notif">${notif}</div>
                                          <p class="name">${data[i]["username"]}</p>
                                      </div>`;
          else
            allfriend.innerHTML += `<div class="myfriend">
                                          <img src="${data[i]["picture"]}" alt="">
                                          <div class="notif none">${notif}</div>
                                          <p class="name">${data[i]["username"]}</p>
                                      </div>`;
        }
      }
    };

function fetchfreind() {
    if(window.freindOrRoom == "freind")
    {
        message.src = '../imageLandscape/chatClick.png';
        group.src= '../imageLandscape/group1.webp';
        fetchf()
    }
}

window.fetchfreind = fetchfreind;

    var fetchg = async () => {
      var resp = await fetch(
        `https://${parsedUrl.hostname}:4443/chatContainer/GroupChanges/${user1_login}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      var data = await resp.json();
      allfriend.innerHTML = "";
      for (var i = 0; i < data.length; i++) {
        allfriend.innerHTML += `<div class="groups">
                                      <img src="../imageLandscape/GroupImage.png" alt="">
                                      <p class="groupname">${data[i]["groupName"]}</p>
                                 </div>`;
      }
    };

    function fetchGroup() {
      group.src = "../imageLandscape/groupClick.png";
      message.src = "../imageLandscape/chat_2.webp";
      fetchg();
      rooms.style.display = "flex";
      join.style.display = "none";
    }

    window.fetchGroup = fetchGroup;

    createRoom.addEventListener("click", function (event) {
      if (window.freindOrRoom == "room") {
        headen.hidden = false;
        headen.style.zIndex = 18;
        addroom.style.display = "block";
        base.style.filter = "blur(10px)";
      }
    });

    var onlinecounter = async () => {
      var response = await fetch(
        `https://${parsedUrl.hostname}:4443/chatContainer/onlinecount/`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
    };

    if (firstload) {
      fetchfreind();
      firstload = false;
    }

    message.addEventListener("click", function (event) {
      window.freindOrRoom = "freind";
      fetchfreind();
      rooms.style.display = "none";
      join.style.display = "flex";
    });

    group.addEventListener("click", function (event) {
      window.freindOrRoom = "room";
      fetchGroup();
    });
  }
}
