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

$(document).ready(function () {
    console.log('ready');
    $.ajaxSetup({ contentType: "application/json; charset=utf-8", error: handleError });
    $("#buttonSignIn").click(signIn);
    $("#buttonSignUp").click(signUp);
})

var signIn = function (e) {
      e.preventDefault();
      var userName = $('#textUserNameSignIn').val();
      var password = $('#textPasswordSignIn').val();

      var object =   { username: userName, password : password};
      var request = $.param(object);

      $.post('http://localhost:43319/BookReview/webresources/users/login?' + request,
          function(returnedData){
            var obj = jQuery.parseJSON(returnedData);
            console.log(obj.token );
            localStorage.setItem("token", obj.token);  //save token to use

            //TODO: Navigate to main page
            window.location.href = "mainpage.html";
      })
}

var signUp = function (e) {
     e.preventDefault();
      var userName = $('#textUserNameSignUp').val();
      var email = $('#textEmailSignUp').val();
      var password = $('#textPasswordSignUp').val();

      var object =   { username: userName, password : password, email : email};
      var request = $.param(object);

      $.post('http://localhost:43319/BookReview/webresources/users/register?' + request,
          function(returnedData){
            var obj = jQuery.parseJSON(returnedData);
            console.log(obj.token );
            localStorage.setItem("token", obj.token); //save token to use
          }
      )

      //TODO: Navigate to main page
      window.location.href = "mainpage.html";
}

var handleError = function(jqXHR, textStatus, errorThrown) {
  alert(jqXHR.responseJSON.error);
  console.log(jqXHR.responseJSON.error);
}
