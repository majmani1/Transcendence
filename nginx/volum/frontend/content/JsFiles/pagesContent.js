export const LoginPage = `
        <section class="my-container" >
        <img
        class="my-character"
        src="../imageLandscape/character2.png"
        alt="const's play"
        />
        <div class="green-box"></div>
        <div class="green-box2"></div>
        <div class="white-bar"></div>
        <div class="white-bar2"></div>
        <div class="texte-game">
          <span>Get Ready</span>
          <span>To Play</span>
          <span>and chat with your friends</span>
          <div>
            <button type="button" id="sign-in" class="button-box">Get Started</button>
          </div>
        </div>
        <div class="decoration1"></div>
        <div class="decoration3"></div>
        <div class="About_Button">
          <i class="fa-solid fa-circle-info"></i>
        </div>
        <div class="About" hidden>
          <main class="about-content">
            <div class="close-about">
              <img src="../imageLandscape/exit.png" alt="close button" />
            </div>
            <div class="text-content">
              <h2>About</h2>
              <p> 
                This web application,
                ft_transcendence, is the capstone project of the common core curriculum 
                at the 42 networking school. It provides a dynamic platform that blends 
                gaming with social interaction.
                 Users can play games like ping-pong and 
                hunter-game with friends, either online or locally.<br> The platform also 
                supports the creation and participation in tournaments, 
                elevating the competitive experience.<br>
                Additionally, real-time chat functionality allows users to stay connected
                 and interact with friends while playing, making the experience more 
                 immersive and engaging. Ft_transcendence aims to seamlessly integrate 
                 gaming and social networking, delivering a comprehensive and enjoyable 
                 user experience.
              </p>
              </div>
              <div class="custom-cards">
                <div class="custom-card">
                  <div class="card-image">
                    <img src="../imageLandscape/Mourad3.JPG" alt="Mourad El Marssi" />
                  </div>
                  <span class="role">Software Engineer</span>
                  <div class="card-contact">
                    <div class="contact">
                    <a href="https://github.com/Mel-Marssi" target="_blank">
                      <i class="fa-brands fa-github"></i>
                    </a>
                    </div>
                    <div class="contact">
                    <a href="https://www.linkedin.com/in/mourad-el-marssi-4a563620a/" target="_blank">
                      <i class="fa-brands fa-linkedin"></i>
                    </a>
                    </div>
                  </div>
                </div>
                <div class="custom-card">
                  <div class="card-image">
                    <img src="../imageLandscape/khalifa19.JPG" alt="khalifa" />
                  </div>
                  <span class="role">Software Engineer</span>
                  <div class="card-contact">
                    <div class="contact">
                    <a href="https://github.com/khallal42" target="_blank">
                      <i class="fa-brands fa-github"></i>
                    </a>
                    </div>
                    <div class="contact">
                    <a href="https://www.linkedin.com/in/khalifa-hallal-117161276/" target="_blank">
                      <i class="fa-brands fa-linkedin"></i>
                    </a>
                    </div>
                  </div>
                </div>
                <div class="custom-card">
                  <div class="card-image">
                    <img src="../imageLandscape/mouad.png" alt="hamza" />
                  </div>
                  <span class="role">Software Engineer</span>
                  <div class="card-contact">
                    <div class="contact">
                    <a href="https://github.com/majmani1" target="_blank">
                      <i class="fa-brands fa-github"></i>
                    </a>
                    </div>
                    <div class="contact">
                    <a href="https://www.linkedin.com/in/mouad-ajmani-21071021b/" target="_blank">
                      <i class="fa-brands fa-linkedin"></i>
                    </a>
                    </div>
                  </div>
                </div>
                <div class="custom-card">
                  <div class="card-image">
                    <img src="../imageLandscape/happymo.jpeg" alt="hamza" />
                  </div>
                  <span class="role">Software Engineer</span>
                  <div class="card-contact">
                    <div class="contact">
                    <a href="https://github.com/Happy4mou" target="_blank">
                      <i class="fa-brands fa-github"></i>
                    </a>
                    </div>
                    <div class="contact">
                    <a href="https://www.linkedin.com/in/mouhcine-majdoubi-data-scientist/" target="_blank">
                      <i class="fa-brands fa-linkedin"></i>
                    </a>
                    </div>
                  </div>
                </div>
                <div class="custom-card">
                  <div class="card-image">
                    <img src="../imageLandscape/hamza.jpg" alt="hamza Rakik" />
                  </div>
                  <span class="role">Software Engineer</span>
                  <div class="card-contact">
                    <div class="contact">
                    <a href="https://github.com/Hamz2001" target="_blank">
                      <i class="fa-brands fa-github"></i>
                    </a>
                    </div>
                    <div class="contact">
                    <a href="https://www.linkedin.com/in/hamza-rakik-6164a01ab/" target="_blank">
                      <i class="fa-brands fa-linkedin"></i>
                    </a>
                    </div>
                  </div>
                </div>
                
              </div>
          </main>
        </div>
      </section>
    `;
export function animationTmp() {
  let tmp_animation = document.createElement("style");
  tmp_animation.innerHTML = `
    .button-box {
      background-image: linear-gradient(
      -60deg,
      #ffffff00 0%,
      #ffffff00 40%,
      #ffffffe7 40%,
      #ffffffe7 60%,
      #ffffff00 60%,
      #ffffff00 100%
    );
    background-size: 200% 100%;
    background-position-x: 150%;
    transition: scale 0.2s;
    animation: shimmer 0.8s forwards;
    }
    `;
  document.head.appendChild(tmp_animation);
  setTimeout(() => {
    if (tmp_animation) {
      document.head.removeChild(tmp_animation);
      tmp_animation = null;
    }
  }, 850);
}
export const signInPage = `
	<div>
		<img class="exit" src="../imageLandscape/exit.png" alt="exit button" />
	</div>

	<div class="section">
		<div class="container">
			<div class="row full-height justify-content-center">
				<div class="col-12 text-center align-self-center py-5">
				<div class="section pb-5 pt-5 pt-sm-2 text-center">
					<h6 class="mb-0 pb-3">
					<span>Log In </span><span>Sign Up</span>
					</h6>
					<input class="checkbox" type="checkbox" id="reg-log" name="reg-log" />
					<label for="reg-log" class="switcher"></label>
					<div class="card-3d-wrap mx-auto">
					<div class="card-3d-wrapper">
						<div class="card-front">
						<div class="center-wrap">
							<div class="section text-center">
							<div class="otherWay">
								<h3 class="mb-2 pb-3 loginHeader">Log In With:</h3>
								<div class="button">
								<button class="image-button" id="button_google">
									<img src="../imageLandscape/google.png" alt="google" class="LogoGoogle" />
								</button>
								<button class="image-button" id="button_42">
									<img src="../imageLandscape/42.png" alt="42" class="Logo42" id="test" />
								</button>
								</div>
							</div>

							<h4 class="mb-2 pb-3 OrHeader">OR</h4>
							<form>
							<div class="form-group">
								<input
								type="text"
								name="logname"
								class="form-style"
								placeholder="Your Username Or Email"
								id="login"
								autocomplete="off"
								required
								>
								<i class="input-icon uil uil-at"></i>
							</div>
							<div class="form-group mt-2">
								<input
								type="password"
								name="logpass"
								class="form-style"
								placeholder="Your Password"
								id="logpass"
								autocomplete="off"
								required
								>
								<i class="input-icon uil uil-lock-alt"></i>
							</div>
							<button class="btn mt-4" type="submit" id="Loginform">submit</button>
							</form>
							<p class="mb-0 mt-4 text-center">
								<a href="/forget-password" class="link">Forgot your password?</a>
							</p>
							</div>
						</div>
						</div>
						<div class="card-back">
						<div class="center-wrap">
							<div class="section text-center">
							<h4 class="mb-4 pb-3 signup">Sign Up</h4>
							<form>
							<div class="form-group mine1">
								<div class="col-6">
								<input 
									type="text" 
									name="firstname" 
									id="firstname" 
									class="form-style" 
									placeholder="First Name" 
									autocomplete="off"
									pattern="[A-Za-z ]{3,20}" 
									title="First name should only contain letters, with a lenght between  3 and 20 characters." 
									required
								>
								<i class="input-icon uil uil-user"></i>
								</div>
								<div class="col-6 m">
								<input 
									type="text" 
									name="lastname" 
									id="lastname" 
									class="form-style" 
									placeholder="Last Name" 
									autocomplete="off" 
									pattern="[A-Za-z ]{3,20}" 
									title="Last name should only contain letters, with a maximum of 20 characters." 
									required
								>
								<i class="input-icon uil uil-user"></i>
								</div>
							</div>
							<div class="form-group mt-2">
								<input
								type="text"
								name="logname"
								class="form-style"
								placeholder="Your Username"
								id="logname"
								autocomplete="off"
								pattern="[A-Za-z0-9_\\-]{3,8}"
								title="Username can contain letters, numbers, hyphens, and underscores, with a maximum of 8 characters."
								required
								>
								<i class="fa-regular fa-address-card"></i>
							</div>
							<div class="form-group mt-2">
								<input
								type="email"
								name="logemail"
								class="form-style"
								placeholder="Your Email"
								id="registremail"
								autocomplete="off"
								pattern="[a-zA-Z0-9._%+\\-]+@[a-zA-Z0-9.\\-]+\.[a-zA-Z]{2,}"
								title="Please enter a valid email address." 
								required
								>
								<i class="input-icon uil uil-at"></i>
							</div>
							<div class="form-group mt-2">
								<input
								type="password"
								name="logpass"
								class="form-style"
								placeholder="Your Password"
								id="registrepass"
								autocomplete="off"
								pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@#$%!^&*])[A-Za-z\\d@#$%!^&*]{8,}"
								title="Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character (@#$%!^&*)." 
								required
								>
								<i class="input-icon uil uil-lock-alt"></i>
							</div>
							<button class="btn mt-4" type="submit"  id="FormLogin">submit</button>
							</form>
							</div>
						</div>
						</div>
					</div>
					</div>
				</div>
				</div>
			</div>
		</div>
	</div>`;

export const forgetPassword = `
<section class="forget_password">
			<div class="container">
				<div class="row">
						<div class="col-md-4 col-md-offset-4">
							<div class="panel panel-default">
								<div class="panel-body">
									<div class="text-center">
									<h3><i class="fa fa-lock fa-4x"></i></h3>
									<h2 class="text-center">Forgot Password?</h2>
									<p>You can reset your password here.</p>
										<div class="panel-body">
										
										<form class="form">
											<fieldset>
											<div class="form-group">
												<div class="input-group">
												<span class="input-group-addon"><i class="fa-solid fa-envelope"></i></span>
												
												<input id="emailInput" placeholder="Your email address" class="form-control" type="email" oninvalid="setCustomValidity('Please enter a valid email address!')" onchange="try{setCustomValidity('')}catch(e){}" required="">
												</div>
											</div>
											<div class="form-group">
												<input class="btn btn-lg btn-primary btn-block subButton" value="Send My Password" type="submit">
											</div>
											</fieldset>
										</form>
										
										</div>
									</div>
								</div>
							</div>
						</div>
				</div>
			</div>
</section>`;
export const LandingPage = `
	<nav class="navbar">
	<div>
		<a href="/logout">
		<img src="../imageLandscape/logout.png" alt="logout button" class="logo" />
		</a>
	</div>
	</nav>
			<main class="main-content">
			<!-- Main content goes here -->
			<div class="arrow-down">
				<i class="fa-duotone fa-solid fa-angles-down"></i>
			</div>
			<div class="pingpong">
				<div class="description">
				<span>
					<img src="../imageLandscape/character2.png" alt="PingPong Character image" />
				</span>
				<span>Choose your game mode and start playing</span>
				</div>
				<div class="gameModes">
				<span class="Ptitle">Ping-Pong</span>
				<div class="scrollLeft">
					<i class="fa-duotone fa-solid fa-angles-left"></i>
				</div>
				<div class="scrollRight">
					<i class="fa-duotone fa-solid fa-angles-right"></i>
				</div>
				<div class="Modes">
		
					<div class="remote">
					<div class="button-section">
						<span>Gear up for a ping-pong challenge!</span>
						<span>Press Play to begin!</span>
						<a href="/remote">Play</a>
					</div>
					<div class="description-game-mode">
						<div class="monitor-container">
						<div class="monitor">
							<div class="vertical-lines line-left"></div>
							<div class="vertical-lines line-right"></div>
							<div class="ball"></div>
							<div class="stand"></div>
						</div>
		
						<div class="monitor">
							<div class="vertical-lines_1 line-left"></div>
							<div class="vertical-lines_1 line-right"></div>
							<div class="ball_1"></div>
							<div class="stand"></div>
						</div>
						</div>
						<span>Online Game</span>
					</div>
					</div>
					<div class="local">
					<div class="button-section">
						<span>Gear up for a ping-pong challenge!</span>
						<span>Press Play to begin!</span>
						<a href="/local">Play</a>
					</div>
					<div class="description-game-mode">
						<div class="monitor-container">
						<div class="monitor">
							<div class="vertical-lines line-left"></div>
							<div class="vertical-lines line-right"></div>
							<div class="ball"></div>
							<div class="stand"></div>
						</div>
						</div>
		
						<span>Local Game</span>
					</div>
					</div>
					<div class="tournament">
					<div class="button-section">
						<span>Gear up for a ping-pong Tournament!</span>
						<span>Press Play to begin!</span>
						<a href="/tournament">Play</a>
					</div>
					<div class="description-game-mode">
						<div class="scheme">
						<div class="circle circle1">
							<i class="fa-solid fa-user-large"></i>
						</div>
						<div class="circle circle2">
							<i class="fa-solid fa-user-large"></i>
						</div>
						<div class="circle circle3">
							<i class="fa-solid fa-user-large"></i>
						</div>
						<div class="circle circle4">
							<i class="fa-solid fa-user-large"></i>
						</div>
						<div class="circle circle5">
							<i class="fa-solid fa-user-large"></i>
						</div>
						</div>
						<span>Tournament Game</span>
					</div>
					</div>
				</div>
				</div>
			</div>
			<div class="arrow-up">
				<i class="fa-duotone fa-solid fa-angles-up"></i>
			</div>
			<div class="huntgame">
				<div class="description">
				<span>
					<img src="../imageLandscape/game2.png" alt="PingPong Character image" />
				</span>
				<span>Choose your game mode and start playing</span>
				</div>
				<div class="gameModes">
				<span class="Htitle">Hunter-Game</span>
				<div class="HscrollLeft">
					<i class="fa-duotone fa-solid fa-angles-left"></i>
				</div>
				<div class="HscrollRight">
					<i class="fa-duotone fa-solid fa-angles-right"></i>
				</div>
				<div class="Modes">
					<div class="remote">
					<div class="button-section">
						<span>Gear up for a hunting challenge!</span>
						<span>Press Play to begin!</span>
						<a href="/Hremote">Play</a>
					</div>
					<div class="description-game-mode">
						<div class="monitor-container">
						<div class="monitor">
							<div class="playerbot">
							<i class="fa-solid fa-caret-right"></i>
							</div>
							<div class="playerbot2">
							<i class="fa-solid fa-caret-left"></i>
							</div>
							<div>
							<div class="lines lines-1"></div>
							<div class="lines lines-2"></div>
							<div class="lines lines-3"></div>
							<div class="lines lines-4"></div>
							<div class="lines lines-5"></div>
							<div class="lines lines-6"></div>
							<div class="lines lines-7"></div>
							<div class="lines lines-8"></div>
							<div class="lines lines-9"></div>
							<div class="lines lines-10"></div>
							<div class="lines lines-11"></div>
							<div class="lines lines-12"></div>
							<div class="pointgame"></div>
							</div>
							<div class="stand"></div>
						</div>
		
						<div class="monitor">
							<div class="playerbot">
							<i class="fa-solid fa-caret-right"></i>
							</div>
							<div class="playerbot2">
							<i class="fa-solid fa-caret-left"></i>
							</div>
							<div>
							<div class="lines lines-1"></div>
							<div class="lines lines-2"></div>
							<div class="lines lines-3"></div>
							<div class="lines lines-4"></div>
							<div class="lines lines-5"></div>
							<div class="lines lines-6"></div>
							<div class="lines lines-7"></div>
							<div class="lines lines-8"></div>
							<div class="lines lines-9"></div>
							<div class="lines lines-10"></div>
							<div class="lines lines-11"></div>
							<div class="lines lines-12"></div>
							<div class="pointgame"></div>
							</div>
							<div class="stand"></div>
						</div>
						</div>
						<span>Online Game</span>
					</div>
					</div>
					<div class="local">
					<div class="button-section">
						<span>Gear up for a hunting challenge!</span>
						<span>Press Play to begin!</span>
						<a href="/Hlocal">Play</a>
					</div>
					<div class="description-game-mode">
						<div class="monitor-container">
						<div class="monitor">
							<div class="playerbot">
							<i class="fa-solid fa-caret-right"></i>
							</div>
							<div class="playerbot2">
							<i class="fa-solid fa-caret-left"></i>
							</div>
							<div>
							<div class="lines lines-1"></div>
							<div class="lines lines-2"></div>
							<div class="lines lines-3"></div>
							<div class="lines lines-4"></div>
							<div class="lines lines-5"></div>
							<div class="lines lines-6"></div>
							<div class="lines lines-7"></div>
							<div class="lines lines-8"></div>
							<div class="lines lines-9"></div>
							<div class="lines lines-10"></div>
							<div class="lines lines-11"></div>
							<div class="lines lines-12"></div>
							<div class="pointgame"></div>
							</div>
							<div class="stand"></div>
						</div>
						</div>
		
						<span>Local Game</span>
					</div>
					</div>
					<div class="tournament">
					<div class="soon">
						<span>Soon... </span>
					</div>
					<div class="button-section">
						<span>Gear up for a hunting Tournament!</span>
						<span>Press Play to begin!</span>
						<a href="/local">Play</a>
					</div>
					<div class="description-game-mode">
						<div class="scheme">
						<div class="circle circle1">
							<i class="fa-solid fa-user-large"></i>
						</div>
						<div class="circle circle2">
							<i class="fa-solid fa-user-large"></i>
						</div>
						<div class="circle circle3">
							<i class="fa-solid fa-user-large"></i>
						</div>
						<div class="circle circle4">
							<i class="fa-solid fa-user-large"></i>
						</div>
						<div class="circle circle5">
							<i class="fa-solid fa-user-large"></i>
						</div>
						</div>
						<span>Tournament Game</span>
					</div>
					</div>
				</div>
				</div>
			</div>
			</main>
		<section class="profile">
		<aside class="menu_corner">
			<div>
				<a class="home_menu" href="/LandingPage">
				<!-- <i class="fa-solid fa-house"></i> -->
				<img src="imageLandscape/home_hover.png" alt="home button" class="logo" />
				</a>
			</div>
			<div>
				<a class="chat_menu" href="/chat">
				<!-- <i class="fa-solid fa-comment"></i> -->
				<img src="imageLandscape/chat_hover.png" alt="chat button" class="logo" />
				</a>
			</div>
			<div>
				<a class="profile_menu" href="/profile">
				<!-- <i class="fa-solid fa-user"></i> -->
				<img src="imageLandscape/user 1.png" alt="profile button" class="logo" />
				</a>
			</div>
			<div class="notifications">
				<img src="imageLandscape/Union (1).png" alt="notification button" class="logo" />
			</div>
		</aside>
		<aside class="notif_table" hidden></aside>
	</section>
	<div class="background">
	<span></span><span></span><span></span><span></span><span></span>
	<span></span><span></span><span></span><span></span>
	</div>
	`;
export function chat(dataOfUser) {
  var winRate = (
    (dataOfUser["number_of_wins"] / dataOfUser["number_of_games"]) *
    100
  ).toFixed(2);
  if (winRate == "NaN") winRate = 0;
  const chatContent = `
	 <div class="hide_others" hidden></div>
     <div id="freindToInvite" style="display: none;">
            <img id="cancelInvite" src="../imageLandscape/cancel.png" alt="">
            <div id="friendsAvailable">
            </div>

        </div>
          
          <section class="search AuthFriend" hidden>
            <input type="text" class="search__input" onkeyup='Friend_suggestion(this.value)' placeholder="Search...">
            <i class="fa-solid fa-magnifying-glass"></i>
            <div class="search__results" ></div>
          </section>
        <ul class="muteTime" style="display: none;">
            <li value="2">2 min</li>
            <li value="4">4 min</li>
            <li value="8">8 min</li>
            <li>always</li>
        </ul>
        <form id="pass">
            <div class="enterPassword">
                <input class="passw" type="password" placeholder="Enter the password">
                <button>submit</button>
            </div>
        </form>
        <form id="changeOrAddPass">
            <div class="enterPasswordChange">
                <img id="cancelchange" src="../imageLandscape/cancel.png" alt="">
                <input class="passwChangeOrAdd" type="password" placeholder="Enter the password">
                <button>submit</button>
            </div>
        </form>
        <div id="groups_for_join" style="display: none;">
            <div id="cancelDiv">
                <img id="cancel" src="../imageLandscape/cancel.png" alt="">
                <div id="text">
                    <h1>JOIN YOUR FAVORITE GROUP !</h1>
                    <h3>this is all the groups available</h3>
                </div>
            </div>
            
            <div id="groupScroll">
            </div>
        </div>
        <!-- <div class="msgGroupR">
            <h6>khallal</h6>
            <span>dajcbakjbkajdb ubbcdkbd,j ckdasbc,b </span>
        </div> -->
        <div id="warning">THIS NAME IS ALREADY EXIST !</div>
        <form id="addroom" >
            <div id="infoOfRoom">
                <img src="../imageLandscape/cancel.png" alt="" class="createRoomCancel">
                <input type="text" id="roomC" placeholder="Group Name">
                <!-- <input type="text" id="typeOfGroup"> -->
                <label for="typeOfGroup">please chose the type of group</label>
                <select id="typeOfGroup" onchange="isProtected()">
                    <option value="public">public</option>
                    <option value="protected">protected</option>
                    <option value="private">private</option>
                </select>
                <input type="password"  id="password" placeholder="password of Group" style="display: none;">
                <button id="submetRoom">create room</button>
            </div>
        </form>
        <div class="base">
        <div class="menu_cornerChat">
          <div>
            <a class="home_menu" href="/LandingPage">
              <!-- <i class="fa-solid fa-house"></i> -->
              <img src="imageLandscape/home_hover.png" alt="home button" class="logo" />
            </a>
          </div>
          <div>
            <a class="chat_menu" href="/chat">
              <!-- <i class="fa-solid fa-comment"></i> -->
              <img src="imageLandscape/chat_hover.png" alt="chat button" class="logo" />
            </a>
          </div>
          <div>
            <a class="profile_menu" href="/profile">
              <!-- <i class="fa-solid fa-user"></i> -->
              <img src="imageLandscape/user 1.png" alt="profile button" class="logo" />
            </a>
          </div>
          <div class="notifications">
              <img src="imageLandscape/Union (1).png" alt="notification button" class="logo" />
            
          </div>
        </div>
    <aside class="notif_table" hidden></aside>
            <!-- <nav>
                <img src="../imageLandscape/three.png" alt="">
            </nav> -->
             
            <div class="friends">
                <div class="bar">
                    <img id="msgs" src="../imageLandscape/chat_2.webp" alt="">
                    <img id="grp" src="../imageLandscape/group1.webp" alt="Groups">
                </div>
                <div class="allfriend">
                    <!-- <div class="myfriend">
                        <div class="notif">38</div>
                        <img src="../imageLandscape/shooper.jpg" alt="">
                        <p class="name">shooper</p>
                    </div> -->
                </div>
                <div id="rooms">
                    <img src="../imageLandscape/plus.png" id="createRoom" alt="">
                    <img src="../imageLandscape/leave.png" id="leaveRoom" alt="">
                    <img src="../imageLandscape/join.png" id="joinRoom" alt="">
                </div>
                <div id="join">
                    <img src="../imageLandscape/addFreind.png" id="addFreind" alt="">
                    <!-- <img src="../imageLandscape/join.png" id="joinRoom" alt=""> -->
                </div>

            </div>
            <div class="messages">
                <div class="username">
                    <img id="back" src="../imageLandscape/goBack.png" alt="">
                    <li></li>
                    <img src="../imageLandscape/gifty-.gif" id="typingStatus">
                    <div id="det" class="none">
                        <img  src="../imageLandscape/three.png" id="detImage" alt="">
                        <div class="details-content none">
                            <!-- <p class="detail">view profile</p> -->
                            <img src="../imageLandscape/profile.png" class="viewprofile" alt="">
                            <img src="../imageLandscape/inviteToGame.png" class="game" alt="">
                            <img src="../imageLandscape/block.png" class="block" alt="">
                            <!-- <p class="detail">invite to game </p>
                            <p class="detail">block</p> -->
                        </div>
                    </div>
                </div>
                <div class="msg-bord">
                    <p id="welcomchat">welcom to the chat</p>
                    <img src="../imageLandscape/gifty-.gif" id="typing-gif">
                </div>
                <form>
                    <div class="typing">
                        <input id="msg" type="text" autocomplete="off">
                        <div id="send"><img id="button-send" src="../imageLandscape/send2.webp" alt="" ></div>
                    </div>
                </form>
            </div>
            <div class="profile">
                    <!-- <img src="../imageLandscape/goBack.png" alt="" class="profileBack" > -->
                    <img src="../imageLandscape/goBack.png" alt="" class="profileBack" style="display: none;">
                    <img class="userImage" src="${
                      dataOfUser["picture"]
                    }" alt="Profile Picture">
                    <h2 onclick="goToProfile(this.textContent)" style="color: aliceblue;">${
                      dataOfUser["username"]
                    }</h2>
                <ul style="color: aliceblue; margin-left:15px;">
                    <li>level : ${dataOfUser["level"].toFixed(2)}</li>
                  <li>score : ${dataOfUser["number_of_wins"]}</li>
                  <li>PingPong  : ${dataOfUser["number_of_wins_pong"]}</li>
                  <li>Hunter-Game  : ${dataOfUser["number_of_wins_hunter"]}</li>
                  <li>Win Rate : ${winRate}%</li>
                </ul>
            </div>
            
        </div>
		<div class="background">
            <span></span><span></span><span></span><span></span><span></span>
            <span></span><span></span><span></span><span></span>
        </div>
	`;
  return chatContent;
}
export const TournamentPingPong = `
    <button class="button_logout">
			<a href="/LandingPage"><img class="logout"  src="img/left-arrow 1.png" alt="" srcset="" /></a>
		</button>
    <div class="setNames">
          <div class="names">
              <input type="text" class="player1 player" name="fname" value = "mouad" placeholder="enter name of player1" ><br>
              <input type="text" class="player2 player" name="lname" value = "mouhcine" placeholder="enter name of player2"><br>
              <input type="text" class="player3 player" name="lname" value = "mourad" placeholder="enter name of player3"><br>
              <input type="text" class="player4 player" name="lname" value = "hamza" placeholder="enter name of player4"><br>
              <input type="text" class="player5 player" name="fname" value = "khalifa" placeholder="enter name of player5" ><br>
              <input type="text" class="player6 player" name="lname" value = "younnes" placeholder="enter name of player6"><br>
              <input type="text" class="player7 player" name="lname" value = "youssef" placeholder="enter name of player7"><br>
              <input type="text" class="player8 player" name="lname" value = "anas" placeholder="enter name of player8"><br>
              <button class="play" onclick="play()"> PLAY </button>
          </div> 
      </div>
            <div class="background">
          <span></span><span></span><span></span><span></span><span></span>
          <span></span><span></span><span></span><span></span>
        </div>
      <!-- </div> -->
      <div class="decoration1">
      </div>
      <div class="decoration2">
      </div>
      <div class="decoration3">
      </div>
  `;
export function profileContent(dataOfUser) {
  var winRate = (
    (dataOfUser["number_of_wins"] / dataOfUser["number_of_games"]) *
    100
  ).toFixed();

  if (winRate == "NaN") winRate = 0;

  const levelFraction = dataOfUser.level % 1;
  const percentageWidth = (levelFraction * 100).toFixed(2);

  const content = `
		<nav class="navbar">
			<div>
				<a href="/logout">
				<img src="../imageLandscape/logout.png" alt="logout button" class="logo" />
				</a>
			</div>
		</nav>
		<main class="container">
		<section class="profile">
			<div class="settings">
			<i class="fa-solid fa-gear"></i>
			</div>
			<section class="profile_image">
			<div class="image">
				<div class="img">
				<img src="${dataOfUser["picture"]}" alt="profile image" />
				</div>
			</div>
			<div class="trophy">
				<img src="imageLandscape/trophy 1.png" alt="trophy" />
				<span>${dataOfUser["number_of_wins"]}</span>
			</div>
			</section>
			<section class="profile_info">
			<div class="names">
			${dataOfUser["first_name"]} ${dataOfUser["last_name"]}
				<div></div>
			</div>
			<div class="score">
				<h2>Score</h2>
				<div>
				<span>PingPong Game: ${dataOfUser["number_of_wins_pong"]}</span>
				<span>Hunter-Game: ${dataOfUser["number_of_wins_hunter"]}</span>
				<span>Win rate: ${winRate}%</span>
				</div>
			</div>
			<div class="level">
				<div class="percentage" style="width: ${percentageWidth}%;"></div>
				<span>level ${dataOfUser["level"].toFixed(2)}</span>
			</div>
			</section>
		</section>
		<section class="dashboard">
		<section class="mini_container">
			<div class="scrollLeft">
				<i class="fa-duotone fa-solid fa-angles-left"></i>
			</div>
			<div class="scrollRight">
				<i class="fa-duotone fa-solid fa-angles-right"></i>
			</div>
			<h1>Ping-Pong</h1>
			<section class="pingpong">
				<section class="remote">
				<div class="monitor-container">
					<div class="monitor">
					<div class="vertical-lines line-left"></div>
					<div class="vertical-lines line-right"></div>
					<div class="ball"></div>
					<div class="stand"></div>
					</div>

					<div class="monitor">
					<div class="vertical-lines_1 line-left"></div>
					<div class="vertical-lines_1 line-right"></div>
					<div class="ball_1"></div>
					<div class="stand"></div>
					</div>
				</div>
				<h3>Remote Game</h3>
				<a href="/remote" class="button-section">Play</a>
				</section>
				<section class="local">
				<div class="monitor-container">
					<div class="monitor">
					<div class="vertical-lines line-left"></div>
					<div class="vertical-lines line-right"></div>
					<div class="ball"></div>
					<div class="stand"></div>
					</div>
				</div>
				<h3>Local Game</h3>
				<a href="/local" class="button-section">Play</a>
				</section>
				<section class="tournament">
				<div class="scheme">
					<div class="circle circle1">
					<i class="fa-solid fa-user-large"></i>
					</div>
					<div class="circle circle2">
					<i class="fa-solid fa-user-large"></i>
					</div>
					<div class="circle circle3">
					<i class="fa-solid fa-user-large"></i>
					</div>
					<div class="circle circle4">
					<i class="fa-solid fa-user-large"></i>
					</div>
					<div class="circle circle5">
					<i class="fa-solid fa-user-large"></i>
					</div>
				</div>
				<h3>Tournament</h3>
				<a href="/tournament" class="button-section">Registre</a>
				</section>
			</section>
			</section>
			<section class="mini_container history_cont">
			<h1 class="titleHistory">History</h1>
			<section class="history">
			
			</section>
			</section>
			<section class="mini_container">
			<div class="HscrollLeft">
				<i class="fa-duotone fa-solid fa-angles-left"></i>
			</div>
			<div class="HscrollRight">
				<i class="fa-duotone fa-solid fa-angles-right"></i>
			</div>
			<h1>Hunter-Game</h1>
			<section class="huntergame">
				<section class="remote">
				<div class="monitor-container">
					<div class="monitor">
					<div class="playerbot">
						<i class="fa-solid fa-caret-right"></i>
					</div>
					<div class="playerbot2">
						<i class="fa-solid fa-caret-left"></i>
					</div>
					<div>
						<div class="lines lines-1"></div>
						<div class="lines lines-2"></div>
						<div class="lines lines-3"></div>
						<div class="lines lines-4"></div>
						<div class="lines lines-6"></div>
						<div class="lines lines-7"></div>
						<div class="lines lines-8"></div>

						<div class="pointgame"></div>
					</div>
					<div class="stand"></div>
					</div>
					<div class="monitor">
					<div class="playerbot">
						<i class="fa-solid fa-caret-right"></i>
					</div>
					<div class="playerbot2">
						<i class="fa-solid fa-caret-left"></i>
					</div>
					<div>
						<div class="lines lines-1"></div>
						<div class="lines lines-2"></div>
						<div class="lines lines-3"></div>
						<div class="lines lines-4"></div>
						<div class="lines lines-5"></div>
						<div class="lines lines-6"></div>
						<div class="lines lines-7"></div>
						<div class="lines lines-8"></div>

						<div class="pointgame"></div>
					</div>
					<div class="stand"></div>
					</div>
				</div>
				<h3>Remote Game</h3>
				<a href="/Hremote" class="button-section">Play</a>
				</section>
				<section class="local">
				<div class="monitor-container">
					<div class="monitor">
					<div class="playerbot">
						<i class="fa-solid fa-caret-right"></i>
					</div>
					<div class="playerbot2">
						<i class="fa-solid fa-caret-left"></i>
					</div>
					<div>
						<div class="lines lines-1"></div>
						<div class="lines lines-2"></div>
						<div class="lines lines-3"></div>
						<div class="lines lines-4"></div>
						<div class="lines lines-6"></div>
						<div class="lines lines-7"></div>
						<div class="lines lines-8"></div>

						<div class="pointgame"></div>
					</div>
					<div class="stand"></div>
					</div>
				</div>
				<h3>Local Game</h3>
				<a href="/Hlocal" class="button-section">Play</a>
				</section>
				<section class="tournament">
				<div class="soon">
					<h1>Soon...</h1>
				</div>
				<div class="blur_effect">
					<div class="scheme">
					<div class="circle circle1">
						<i class="fa-solid fa-user-large"></i>
					</div>
					<div class="circle circle2">
						<i class="fa-solid fa-user-large"></i>
					</div>
					<div class="circle circle3">
						<i class="fa-solid fa-user-large"></i>
					</div>
					<div class="circle circle4">
						<i class="fa-solid fa-user-large"></i>
					</div>
					<div class="circle circle5">
						<i class="fa-solid fa-user-large"></i>
					</div>
					</div>
					<h3>Tournament</h3>
				</div>
				</section>
			</section>
			</section>
		</section>
		
		</main>
		<aside class="menu_corner">
		<div>
			<a class="home_menu" href="/LandingPage">
			<!-- <i class="fa-solid fa-house"></i> -->
			<img src="imageLandscape/home_hover.png" alt="home button" class="logo" />
			</a>
		</div>
		<div>
			<a class="chat_menu" href="/chat">
			<!-- <i class="fa-solid fa-comment"></i> -->
			<img src="imageLandscape/chat_hover.png" alt="chat button" class="logo" />
			</a>
		</div>
		<div>
			<a class="profile_menu" href="/profile">
			<!-- <i class="fa-solid fa-user"></i> -->
			<img src="imageLandscape/user 1.png" alt="profile button" class="logo" />
			</a>
		</div>
		<div class="notifications">
			<img src="imageLandscape/Union (1).png" alt="notification button" class="logo" />
			
		</div>
		</aside>
		<aside class="notif_table" hidden></aside>
		<aside class="friends">
		<div class="add_friend">
			<img src="imageLandscape/addpicture.png" alt="add friend" />
			
		</div>
		<div class="my_friends">
		</div>
		</aside>
		<section class="search AuthFriend" hidden>
			<input type="text" class="search__input" onkeyup='Friend_suggestion(this.value)' placeholder="Search...">
			<i class="fa-solid fa-magnifying-glass"></i>
			<div class="search__results" ></div>
		</section>
		<menu class="settings_form" hidden>
		<h2>
			Keep your information up to date.
			<img src="imageLandscape/exit.png" alt="close settings" id="close" class="close"/>
		</h2>

		<!-- Here to test action to connect directly to hamza container with action in form attribute -->
		<form>
			<div class="fullname">
			<label for="name">First Name</label>
			<input
				type="text"
				id="name"
				name="name"
				placeholder="First name"
				value=${dataOfUser["first_name"]}
			/>
			<label for="lastname">Last Name</label>
			<input
				type="lastname"
				id="lastname"
				name="lastname"
				placeholder="Last name"
				value="${dataOfUser["last_name"]}"
			/>
			</div>
			<div class="username">
			<label for="Username">Username</label>
			<input
				type="text"
				id="Username"
				name="Username"
				placeholder="Username"
				value=${dataOfUser["username"]}
			/>
			</div>
			<div class="email">
			<label for="email">Email</label>
			<input
				type="email"
				id="email"
				name="email"
				placeholder="Email"
				value=${dataOfUser["email"]}
			/>
			</div>
			<div class="password">
			<label for="password">Password</label>
			<input
				type="password"
				id="password"
				name="password"
				placeholder="password"
			/>
			</div>
			<div class="image-selector">
			<label class="profile">Profile Picture </label>
				<label for="file-upload" class="custom-file-upload">
				<i class="fa-solid fa-upload"></i>
				</label>
				<span id="file-chosen">No profile picture chosen</span>
				<input type="file" id="file-upload" />

			</div>
			<div class="choices">
			<button type="submit" id="save" title="Save changes">
				<i class="fa-solid fa-circle-check"></i>
			</button>
			<button id="discard" title="Discard the changes">
				<i class="fa-solid fa-circle-xmark"></i>
			</button>
			</div>
		</form>
		<div class="delete" title="Delete your account">
			<button id="delete"><i class="fa-solid fa-trash"></i></button>
		</div>
		</menu>
		<main class="permissions" hidden>
		<span>Are you sure about deleting your account?</span>
		<div class="choices">
			<button id="yes" title="Delete your account">
			<i class="fa-solid fa-circle-check"></i>
			</button>
			<button id="no" title="Go back for fun">
			<i class="fa-solid fa-circle-xmark"></i>
			</button>
		</div>
		</main>
		<aside class="twofactory">
			<div>
			<i class="fa-solid fa-qrcode"></i>
			</div>
		</aside>
		<aside class="qrcode" hidden>
			<span>Activate QR Code</span>
			<figure id="qr">
			<ol>
				<li>Click to get the QrCode</li>
				<li>Scan the Qrcode with your <br> authenticator app</li>
				<li>Enter the code to activate <br> the two-factor authentication</li>
			</ol>
			</figure>
			<form >
				<div class="code_input">
				<input
				type="number"
				min="0"
				max="9"
				maxlength="1"
				class="digit"
				placeholder="_"
				autofocus
				disabled>
				<input
				type="number"
				min="0"
				max="9"
				maxlength="1"
				class="digit"
				placeholder="_"
				autofocus
				disabled>
				<input
				type="number"
				min="0"
				max="9"
				maxlength="1"
				class="digit"
				placeholder="_"
				autofocus
				disabled>
				<input
				type="number"
				min="0"
				max="9"
				maxlength="1"
				class="digit"
				placeholder="_"
				autofocus
				disabled>
				<input
				type="number"
				min="0"
				max="9"
				maxlength="1"
				class="digit"
				placeholder="_"
				autofocus
				disabled>
				<input
				type="number"
				min="0"
				max="9"
				maxlength="1"
				class="digit"
				placeholder="_"
				autofocus
				disabled>
				</div>
			</form>
			<div class="switch-container">
			<label class="switch">
				<input type="checkbox" id="qrcode-switch">
				<span class="slider round"></span>
			</label>
			</div>
		</aside>
		<div class="background">
		<span></span><span></span><span></span><span></span><span></span>
		<span></span><span></span><span></span><span></span>
		</div>
		<div class="hide_others" hidden><div>
    `;
  return content;
}
export const notFound = `
    <div class="room">
      <div class="cuboid">
        <div class="side"></div>
        <div class="side"></div>
        <div class="side"></div>
      </div>
      <div class="oops">
        <h2>OOPS!</h2>
        <p>We can't find the page that you're looking for :(</p>
      </div>
      <div class="center-line">
        <div class="hole">
          <div class="ladder-shadow"></div>
          <div class="ladder"></div>
        </div>
        <div class="four">4</div>
        <div class="four">4</div>
        <div class="btn firefox">
          <a href="/">BACK TO HOME</a>
        </div>
      </div>
    </div>
`;
export function friendProfile(dataOfUser) {
  console.log(dataOfUser);
  var winRate = (
    (dataOfUser["number_of_wins"] / dataOfUser["number_of_games"]) *
    100
  ).toFixed();

  if (winRate == "NaN") winRate = 0;

  const levelFraction = dataOfUser.level % 1;
  const percentageWidth = (levelFraction * 100).toFixed(2);

  const content = `<nav class="navbar">
		</nav>
		<main class="container">
		<section class="profile">
			<div class="remove_friend">
				<i class="fa-solid fa-user-minus"></i>
			</div>
			<section class="profile_image">
			<div class="image">
				<div class="img">
				<img src="${dataOfUser["picture"]}" alt="profile image" />
				</div>
			</div>
			<div class="trophy">
				<img src="imageLandscape/trophy 1.png" alt="trophy" />
				<span>${dataOfUser["number_of_wins"]}</span>
			</div>
			</section>
			<section class="profile_info">
			<div class="names">
			${dataOfUser["first_name"]} ${dataOfUser["last_name"]}
				<div></div>
			</div>
			<div class="score">
				<h2>Score</h2>
				<div>
				<span>PingPong Game: ${dataOfUser["number_of_wins_pong"]}</span>
				<span>Hunter-Game: ${dataOfUser["number_of_wins_hunter"]}</span>
				<span>Win rate: ${winRate}%</span>
				</div>
			</div>
			<div class="level">
				<div class="percentage" style="width: ${percentageWidth}%;"></div>
				<span>level ${dataOfUser["level"].toFixed(2)}</span>
			</div>
			</section>
		</section>
		<section class="dashboard">
			<section class="mini_container">
			<h1>Ping-Pong</h1>
			<section class="pingpong">
				<section class="remote">
				<div class="monitor-container">
					<div class="monitor">
					<div class="vertical-lines line-left"></div>
					<div class="vertical-lines line-right"></div>
					<div class="ball"></div>
					<div class="stand"></div>
					</div>

					<div class="monitor">
					<div class="vertical-lines_1 line-left"></div>
					<div class="vertical-lines_1 line-right"></div>
					<div class="ball_1"></div>
					<div class="stand"></div>
					</div>
				</div>
				<h3>Remote Game</h3>
				<a href="/remote" class="button-section">Play</a>
				</section>
				<section class="local">
				<div class="monitor-container">
					<div class="monitor">
					<div class="vertical-lines line-left"></div>
					<div class="vertical-lines line-right"></div>
					<div class="ball"></div>
					<div class="stand"></div>
					</div>
				</div>
				<h3>Local Game</h3>
				<a href="/remote" class="button-section">Play</a>
				</section>
				<section class="tournament">
				<div class="scheme">
					<div class="circle circle1">
					<i class="fa-solid fa-user-large"></i>
					</div>
					<div class="circle circle2">
					<i class="fa-solid fa-user-large"></i>
					</div>
					<div class="circle circle3">
					<i class="fa-solid fa-user-large"></i>
					</div>
					<div class="circle circle4">
					<i class="fa-solid fa-user-large"></i>
					</div>
					<div class="circle circle5">
					<i class="fa-solid fa-user-large"></i>
					</div>
				</div>
				<h3>Tournament</h3>
				<a href="/tournament" class="button-section">Registre</a>
				</section>
			</section>
			</section>
			<section class="mini_container ">
			<h1 class="titleHistory">History</h1>
			<section class="history">
			
			</section>
			</section>
			<section class="mini_container">
			<h1>Hunter-Game</h1>
			<section class="huntergame">
				<section class="remote">
				<div class="monitor-container">
					<div class="monitor">
					<div class="playerbot">
						<i class="fa-solid fa-caret-right"></i>
					</div>
					<div class="playerbot2">
						<i class="fa-solid fa-caret-left"></i>
					</div>
					<div>
						<div class="lines lines-1"></div>
						<div class="lines lines-2"></div>
						<div class="lines lines-3"></div>
						<div class="lines lines-4"></div>
						<div class="lines lines-6"></div>
						<div class="lines lines-7"></div>
						<div class="lines lines-8"></div>

						<div class="pointgame"></div>
					</div>
					<div class="stand"></div>
					</div>
					<div class="monitor">
					<div class="playerbot">
						<i class="fa-solid fa-caret-right"></i>
					</div>
					<div class="playerbot2">
						<i class="fa-solid fa-caret-left"></i>
					</div>
					<div>
						<div class="lines lines-1"></div>
						<div class="lines lines-2"></div>
						<div class="lines lines-3"></div>
						<div class="lines lines-4"></div>
						<div class="lines lines-5"></div>
						<div class="lines lines-6"></div>
						<div class="lines lines-7"></div>
						<div class="lines lines-8"></div>

						<div class="pointgame"></div>
					</div>
					<div class="stand"></div>
					</div>
				</div>
				<h3>Remote Game</h3>
				<a href="/Hremote" class="button-section">Play</a>
				</section>
				<section class="local">
				<div class="monitor-container">
					<div class="monitor">
					<div class="playerbot">
						<i class="fa-solid fa-caret-right"></i>
					</div>
					<div class="playerbot2">
						<i class="fa-solid fa-caret-left"></i>
					</div>
					<div>
						<div class="lines lines-1"></div>
						<div class="lines lines-2"></div>
						<div class="lines lines-3"></div>
						<div class="lines lines-4"></div>
						<div class="lines lines-6"></div>
						<div class="lines lines-7"></div>
						<div class="lines lines-8"></div>

						<div class="pointgame"></div>
					</div>
					<div class="stand"></div>
					</div>
				</div>
				<h3>Local Game</h3>
				<a href="/Hremote" class="button-section">Play</a>
				</section>
				<section class="tournament">
				<div class="soon">
					<h1>Soon...</h1>
				</div>
				<div class="blur_effect">
					<div class="scheme">
					<div class="circle circle1">
						<i class="fa-solid fa-user-large"></i>
					</div>
					<div class="circle circle2">
						<i class="fa-solid fa-user-large"></i>
					</div>
					<div class="circle circle3">
						<i class="fa-solid fa-user-large"></i>
					</div>
					<div class="circle circle4">
						<i class="fa-solid fa-user-large"></i>
					</div>
					<div class="circle circle5">
						<i class="fa-solid fa-user-large"></i>
					</div>
					</div>
					<h3>Tournament</h3>
				</div>
				</section>
			</section>
			</section>
		</section>
		
		</main>
		<aside class="menu_corner">
		<div>
			<a class="home_menu" href="/LandingPage">
			<!-- <i class="fa-solid fa-house"></i> -->
			<img src="imageLandscape/home_hover.png" alt="home button" class="logo" />
			</a>
		</div>
		<div>
			<a class="chat_menu" href="/chat">
			<!-- <i class="fa-solid fa-comment"></i> -->
			<img src="imageLandscape/chat_hover.png" alt="chat button" class="logo" />
			</a>
		</div>
		<div>
			<a class="profile_menu" href="/profile">
			<!-- <i class="fa-solid fa-user"></i> -->
			<img src="imageLandscape/user 1.png" alt="profile button" class="logo" />
			</a>
		</div>
		<div class="notifications">
			<img src="imageLandscape/Union (1).png" alt="notification button" class="logo" />
			
		</div>
		</aside>
		<aside class="notif_table" hidden></aside>
		
		<div class="background">
		<span></span><span></span><span></span><span></span><span></span>
		<span></span><span></span><span></span><span></span>
		</div>
		<div class="hide_others" hidden><div>
	`;
  return content;
}

export function userProfile(dataOfUser) {
  var winRate = (
    (dataOfUser["number_of_wins"] / dataOfUser["number_of_games"]) *
    100
  ).toFixed();

  if (winRate == "NaN") winRate = 0;

  const levelFraction = dataOfUser.level % 1;
  const percentageWidth = (levelFraction * 100).toFixed(2);

  const content = `<nav class="navbar">
		</nav>
		<main class="container">
		<section class="profile">
			<div class="remove_friend">
				<i class="fa-solid fa-user-plus"></i>
			</div>
			<section class="profile_image">
			<div class="image">
				<div class="img">
				<img src="${dataOfUser["picture"]}" alt="profile image" />
				</div>
			</div>
			<div class="trophy">
				<img src="imageLandscape/trophy 1.png" alt="trophy" />
				<span>${dataOfUser["number_of_wins"]}</span>
			</div>
			</section>
			<section class="profile_info">
			<div class="names">
			${dataOfUser["first_name"]} ${dataOfUser["last_name"]}
				<div></div>
			</div>
			<div class="score">
				<h2>Score</h2>
				<div>
				<span>PingPong Game: ${dataOfUser["number_of_wins"]}</span>
				<span>Hunter-Game: ${dataOfUser["number_of_wins_hunter"]}</span>
				<span>Win rate: ${winRate}%</span>
				</div>
			</div>
			<div class="level">
				<div class="percentage" style="width: ${percentageWidth}%;"></div>
				<span>level ${dataOfUser["level"].toFixed(2)}</span>
			</div>
			</section>
		</section>
		<section class="dashboard">
			<section class="mini_container">
			<h1>Ping-Pong</h1>
			<section class="pingpong">
				<section class="remote">
				<div class="monitor-container">
					<div class="monitor">
					<div class="vertical-lines line-left"></div>
					<div class="vertical-lines line-right"></div>
					<div class="ball"></div>
					<div class="stand"></div>
					</div>

					<div class="monitor">
					<div class="vertical-lines_1 line-left"></div>
					<div class="vertical-lines_1 line-right"></div>
					<div class="ball_1"></div>
					<div class="stand"></div>
					</div>
				</div>
				<h3>Remote Game</h3>
				<a href="/remote" class="button-section">Play</a>
				</section>
				<section class="local">
				<div class="monitor-container">
					<div class="monitor">
					<div class="vertical-lines line-left"></div>
					<div class="vertical-lines line-right"></div>
					<div class="ball"></div>
					<div class="stand"></div>
					</div>
				</div>
				<h3>Local Game</h3>
				<a href="/remote" class="button-section">Play</a>
				</section>
				<section class="tournament">
				<div class="scheme">
					<div class="circle circle1">
					<i class="fa-solid fa-user-large"></i>
					</div>
					<div class="circle circle2">
					<i class="fa-solid fa-user-large"></i>
					</div>
					<div class="circle circle3">
					<i class="fa-solid fa-user-large"></i>
					</div>
					<div class="circle circle4">
					<i class="fa-solid fa-user-large"></i>
					</div>
					<div class="circle circle5">
					<i class="fa-solid fa-user-large"></i>
					</div>
				</div>
				<h3>Tournament</h3>
				<a href="/tournament" class="button-section">Registre</a>
				</section>
			</section>
			</section>
			<section class="mini_container ">
			<h1 class="titleHistory">History</h1>
			<section class="history">
			
			</section>
			</section>
			<section class="mini_container">
			<h1>Hunter-Game</h1>
			<section class="huntergame">
				<section class="remote">
				<div class="monitor-container">
					<div class="monitor">
					<div class="playerbot">
						<i class="fa-solid fa-caret-right"></i>
					</div>
					<div class="playerbot2">
						<i class="fa-solid fa-caret-left"></i>
					</div>
					<div>
						<div class="lines lines-1"></div>
						<div class="lines lines-2"></div>
						<div class="lines lines-3"></div>
						<div class="lines lines-4"></div>
						<div class="lines lines-6"></div>
						<div class="lines lines-7"></div>
						<div class="lines lines-8"></div>

						<div class="pointgame"></div>
					</div>
					<div class="stand"></div>
					</div>
					<div class="monitor">
					<div class="playerbot">
						<i class="fa-solid fa-caret-right"></i>
					</div>
					<div class="playerbot2">
						<i class="fa-solid fa-caret-left"></i>
					</div>
					<div>
						<div class="lines lines-1"></div>
						<div class="lines lines-2"></div>
						<div class="lines lines-3"></div>
						<div class="lines lines-4"></div>
						<div class="lines lines-5"></div>
						<div class="lines lines-6"></div>
						<div class="lines lines-7"></div>
						<div class="lines lines-8"></div>

						<div class="pointgame"></div>
					</div>
					<div class="stand"></div>
					</div>
				</div>
				<h3>Remote Game</h3>
				<a href="/Hremote" class="button-section">Play</a>
				</section>
				<section class="local">
				<div class="monitor-container">
					<div class="monitor">
					<div class="playerbot">
						<i class="fa-solid fa-caret-right"></i>
					</div>
					<div class="playerbot2">
						<i class="fa-solid fa-caret-left"></i>
					</div>
					<div>
						<div class="lines lines-1"></div>
						<div class="lines lines-2"></div>
						<div class="lines lines-3"></div>
						<div class="lines lines-4"></div>
						<div class="lines lines-6"></div>
						<div class="lines lines-7"></div>
						<div class="lines lines-8"></div>

						<div class="pointgame"></div>
					</div>
					<div class="stand"></div>
					</div>
				</div>
				<h3>Local Game</h3>
				<a href="/Hremote" class="button-section">Play</a>
				</section>
				<section class="tournament">
				<div class="soon">
					<h1>Soon...</h1>
				</div>
				<div class="blur_effect">
					<div class="scheme">
					<div class="circle circle1">
						<i class="fa-solid fa-user-large"></i>
					</div>
					<div class="circle circle2">
						<i class="fa-solid fa-user-large"></i>
					</div>
					<div class="circle circle3">
						<i class="fa-solid fa-user-large"></i>
					</div>
					<div class="circle circle4">
						<i class="fa-solid fa-user-large"></i>
					</div>
					<div class="circle circle5">
						<i class="fa-solid fa-user-large"></i>
					</div>
					</div>
					<h3>Tournament</h3>
				</div>
				</section>
			</section>
			</section>
		</section>
		
		</main>
		<aside class="menu_corner">
		<div>
			<a class="home_menu" href="/LandingPage">
			<!-- <i class="fa-solid fa-house"></i> -->
			<img src="imageLandscape/home_hover.png" alt="home button" class="logo" />
			</a>
		</div>
		<div>
			<a class="chat_menu" href="/chat">
			<!-- <i class="fa-solid fa-comment"></i> -->
			<img src="imageLandscape/chat_hover.png" alt="chat button" class="logo" />
			</a>
		</div>
		<div>
			<a class="profile_menu" href="/profile">
			<!-- <i class="fa-solid fa-user"></i> -->
			<img src="imageLandscape/user 1.png" alt="profile button" class="logo" />
			</a>
		</div>
		<div class="notifications">
			<img src="imageLandscape/Union (1).png" alt="notification button" class="logo" />
			
		</div>
		</aside>
		<aside class="notif_table" hidden></aside>
		
		<div class="background">
		<span></span><span></span><span></span><span></span><span></span>
		<span></span><span></span><span></span><span></span>
		</div>
		<div class="hide_others" hidden><div>
	`;
  return content;
}

export function HunterPage(dataOfUser) {
  const content = `
    <main id="main_div">
	  <img
        onclick="ft_left_arrow()"
        id="left_arrow"
        src="../imageLandscape/goBack.png"
        alt="left_arrow"
      />
      <img id="LplayerControl" src="../imageLandscape/L_player_control.png" alt="">
      <img id="RplayerControl" src="../imageLandscape/R_player_control.png" alt="">
      <div id="score">
        <div class="player" id="player_1">
          <img class="player_img" id="img_player1" src="../imageLandscape/player.png" alt="player1" />
          <h1 class="score_player" id="player1">0</h1>
        </div>
        <div class="player" id="player_2">
          <h1 class="score_player" id="player2">0</h1>
          <img class="player_img" id="img_player2" src="../imageLandscape/player.png" alt="player2" />
        </div>
      </div>
      <div id="game_div">
        <div class="shape_score" id="Lscore_shape">
			<div id="FillLshape"></div>
		</div>
        <canvas id="maze_canvas" width="600" height="300"> </canvas>
        <div class="shape_score"id="Rscore_shape">
			<div id="FillRshape"></div>
		</div>
      </div>
    </main>
    <div id="level">
      <img
        onclick="ft_left_arrow()"
        id="left_arrow"
        src="../imageLandscape/goBack.png"
        alt="left_arrow"
      />
      <div id="buttons">
        <img id="gameII_character" src="../imageLandscape/game2.png" alt="" />
        <div id="center_buttons">
          <button onclick="get_level('easy')" class="button_level" id="easy">
            easy
          </button>
          <button
            onclick="get_level('medium')"
            class="button_level"
            id="medium"
          >
            medium
          </button>
          <button onclick="get_level('hard')" class="button_level" id="hard">
            hard
          </button>
        </div>
      </div>
      <div id="vs_div">
        <div id="vs_line"></div>
        <div id="vs_cercle">
          <h1 id="VS">VS</h1>
        </div>
        <div id="Lpoint"></div>
        <div id="Rpoint"></div>
        <div class="vs_player" id="L_player">
          <h1 id="waiting_L">Waiting for another player...</h1>
          <img id="Lplayer_img" src="../imageLandscape/player.png" alt="player1" />
          <h1 id="Lplayer_name">Lplayer</h1>
        </div>
        <div class="vs_player" id="R_player">
          <h1 id="waiting_R">Waiting for another player...</h1>
          <img id="Rplayer_img" src="../imageLandscape/player.png" alt="player1" />
          <h1 id="Rplayer_name">Rplayer</h1>
        </div>
      </div>
      <div id="Game_over">
        <img id="player_img_gameOver" src="${dataOfUser["picture"]}" />
        <h1 id="rsulte">Game Over</h1>
      </div>
    </div>
`;
  return content;
}

function createAlert(message, className = "alert") {
  const flagIsExist = document.querySelector(".alert");
  if (flagIsExist) return;
  const alert = document.createElement("div");
  alert.classList.add(className);
  alert.textContent = message;
  document.body.appendChild(alert);
  if (alert) {
    alert.addEventListener("animationend", function () {
      alert.remove();
    });
  }
}

window.createAlert = createAlert;
