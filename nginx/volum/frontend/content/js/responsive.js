
// show div chat 
var text_emojie = document.querySelector(".text_emojie");
var chat = document.querySelector(".chat");
var show = false
var icon_chat = document.querySelector(".icon_chat");
var icon_close = document.querySelector(".icon_close")
 
function showChat() {
    
        text_emojie.style.visibility == "hidden" 
        icon_chat.style.visibility = "hidden"
        icon_close.style.visibility = "visible"
        // chat.style.visibility = "visible";
        text_emojie.style.visibility = "visible";
 
}


function showMessages() {
    chat.style.opacity = "1"

    chat.innerHTML = ""
   
 
    var message = ["Hello", "Hi", "Siuuuu", "How are you", "Fine", "And you", "Fine", "Thanks", "You are welcome", "Bye", "goodbye"];
    for (var i = 0; i < message.length; i++) {
        chat.innerHTML += `<label class="message">${message[i]}</label>`;
    }

}

var emojie = ["😉", "😂","😅","😮‍💨","😤","🤬","🫣","🫡","🤔","😭","🥲","😎", "🤝","🔥", "❤️","🏆"]

function showEmojies() {
    chat.style.opacity = "1"

    chat.innerHTML = ""
    show = true
 
    for (var i = 0; i < emojie.length; i++) {
        chat.innerHTML += `<span class="pic_emojies">${emojie[i]}</span>`;
        
    }
}

function hideChat()
{
    chat.style.opacity = "0"
    chat.innerHTML = "" 
    text_emojie.style.visibility = "hidden";
    icon_chat.style.visibility = "visible"
    icon_close.style.visibility = "hidden"
}

// var all_emojies = document.querySelector(".chat");

// all_emojies.addEventListener("click", function(event) {
//     if (event.target.classList.contains("pic_emojies")) {
//         showMessage.innerHTML = `<span class="messa">${event.target.textContent}</span>`
       
//         showMessage.style.display = "block";
//         hideChat()
//         const myTimeout = setTimeout(timeShow_message, 4500);
//     }
// });


var showMessage = document.querySelector(".showMessage")

var all_messages = document.querySelector(".chat");

all_messages.addEventListener("click", function(event) {
    if (event.target.classList.contains("message")) {
        showMessage.innerHTML = `<span class="messa">${event.target.textContent}</span>`
        
        showMessage.style.display = "block";
        hideChat()
        const myTimeout = setTimeout(timeShow_message, 4500);
    }
});


function timeShow_message() {
    showMessage.style.display = "none";
   
}



var closeScore = document.querySelector(".closeScore")

closeScore.addEventListener("click", function(event){
    window.location.href = './home.html'
})








table.addEventListener('animationend', () => {
    // Apply box-shadow styles after the animation completes
    table.style.cssText = `box-shadow:
            0 0 0vw 0vw #02EB98,
            0 0 2vw 0.4vw #099e6a,
            inset 0 0 .1vw 0.01vw #02EB98,
            inset 0 0 .2vw 0.2vw #00ac70,
            inset 0 0 .25vw 0.2vw #027b50;
            display:block;`
    

    tubeSocer1.style.cssText  = `box-shadow:
    0 0 0vw 0vw #02EB98,
    0 0 2vw 0.4vw #099e6a,
    inset 0 0 .1vw 0.01vw #02EB98,
    inset 0 0 .2vw 0.2vw #00ac70,
    inset 0 0 .25vw 0.2vw #027b50;
    display:block;`
    tubeSocer2.style.cssText  = `box-shadow:
    0 0 0vw 0vw #02EB98,
    0 0 2vw 0.4vw #099e6a,
    inset 0 0 .1vw 0.01vw #02EB98,
    inset 0 0 .2vw 0.2vw #00ac70,
    inset 0 0 .25vw 0.2vw #027b50;
    display:block;`
      play_or_pause = "play"
   
});