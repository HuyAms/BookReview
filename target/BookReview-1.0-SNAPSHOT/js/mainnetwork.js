$(document).ready(function () {
    $.ajaxSetup({ contentType: "application/json; charset=utf-8", error: handleError });
    $("#buttonSignIn").click(signIn);
    $("#buttonSignUp").click(signUp);
})
