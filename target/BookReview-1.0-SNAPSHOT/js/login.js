"use strict"
function showcontent(action) {

    var i, tabcontent, tab;

    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    tab = document.getElementsByClassName("tab-group")[0].children;
    for (i = 0; i < tab.length; i++) {
        tab[i].className = tab[i].className.replace("Active", "");
    }

    document.getElementById(action).style.display = "block";
    event.currentTarget.className += "Active";

}

document.getElementById("defaultOpen").click();

const buttonGetStarted = document.querySelector('#buttonGetStarted');
const pageIntroContainer = document.querySelector('#mainHeader');
const loginContainer = document.querySelector('.container');

if (localStorage.getItem("didSeeOnBoarding")) {
  pageIntroContainer.style.display = 'none';
  loginContainer.style.display = 'block';
}

if (localStorage.getItem("didLogIn") == true) {
  //TODO: Navigate to main page
  window.location.href = "mainpage.html";
}

buttonGetStarted.addEventListener('click', function(){
  pageIntroContainer.style.display = 'none';
  loginContainer.style.display = 'block';
  localStorage.setItem("didSeeOnBoarding", true);
});



//====================Login and register =========================
const buttonLogin = document.querySelector('#buttonLogin');
const buttonSignUp = document.querySelector('#buttonSignUp');

//Login
buttonLogin.addEventListener('click', (evt) => {
  evt.preventDefault();
  const userName = document.querySelector('#textUserNameLogin').value;
  const password = document.querySelector('#textPasswordLogin').value;

  const url = endPointUrl + `webresources/users/login?username=${userName}&&password=${password}`;

  fetch(url, {
    method: 'POST'
  })
  .then(json)
  .then((data) => {
    if (data.hasOwnProperty('error')) {
      alert(data.error);
    } else {
      console.log(data);
      localStorage.setItem("token", data.token);  //save token to use
      localStorage.setItem("didLogIn", true); //save login state

      //TODO: Navigate to main page
      window.location.href = "mainpage.html";
    }
  }).catch((error) => {
    console.log('error: ' + error);
  });
});

//Register
buttonSignUp.addEventListener('click', (evt) => {
  evt.preventDefault();
  console.log('sign up clicked');
  const userName = document.querySelector('#textUserNameSignUp').value;
  const password = document.querySelector('#textPasswordSignUp').value;
  const email = document.querySelector('#textEmailSignUp').value;

  const url = endPointUrl + `webresources/users/register?username=${userName}&&password=${password}&&email=${email}`;

  fetch(url, {
    method: 'POST'
  })
  .then(json)
  .then((data) => {
    if (data.hasOwnProperty('error')) {
      alert(data.error);
    } else {
      console.log(data);
      localStorage.setItem("token", data.token);  //save token to use
      localStorage.setItem("didLogIn", true); //save login state

      //TODO: Navigate to main page
      window.location.href = "mainpage.html";
    }
  }).catch((error) => {
    console.log('error: ' + error);
  });
});

const json = (res) => {
  return res.json();
}
