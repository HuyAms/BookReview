"use strict"
function showcontent(action) {

    var i, tabcontent, tab;

    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
        console.log(tabcontent.length);
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

buttonGetStarted.addEventListener('click', function(){
  pageIntroContainer.style.display = 'none';
  loginContainer.style.display = 'block';
});











// $(document).ready(function () {
//     console.log('ready: ' + endPointUrl);
//     $.ajaxSetup({ contentType: "application/json; charset=utf-8", error: handleError });
//     $("#buttonSignIn").click(signIn);
//     $("#buttonSignUp").click(signUp);
// })

//Sign In
// var signIn = function (e) {
//       e.preventDefault();
//       var userName = $('#textUserNameSignIn').val();
//       var password = $('#textPasswordSignIn').val();
//
//       var object =   { username: userName, password : password};
//       var request = $.param(object);
//
//       $.post(endPointUrl + 'webresources/users/login?' + request,
//           function(returnedData){
//             var obj = jQuery.parseJSON(returnedData);
//             console.log(obj.token );
//             localStorage.setItem("token", obj.token);  //save token to use
//             localStorage.setItem("didLogIn", true); //save login state
//
//             //TODO: Navigate to main page
//             window.location.href = "mainpage.html";
//       })
// }


//Sign up
// var signUp = function (e) {
//      e.preventDefault();
//       var userName = $('#textUserNameSignUp').val();
//       var email = $('#textEmailSignUp').val();
//       var password = $('#textPasswordSignUp').val();
//
//       var object =   { username: userName, password : password, email : email};
//       var request = $.param(object);
//
//       $.post(endPointUrl + 'webresources/users/register?' + request,
//           function(returnedData){
//             var obj = jQuery.parseJSON(returnedData);
//             console.log(obj.token );
//             localStorage.setItem("token", obj.token); //save token to use
//             localStorage.setItem("didLogIn", true); //save login state
//
//             //TODO: Navigate to main page
//             window.location.href = "mainpage.html";
//           }
//       )
// }


//HANDLE Error
// var handleError = function(jqXHR, textStatus, errorThrown) {
//   alert(jqXHR.responseJSON.error);
//   console.log(jqXHR.responseJSON.error);
// }
