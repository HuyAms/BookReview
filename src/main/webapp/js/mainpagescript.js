"use strict"

//default tabs
let currentTab;

$(document).ready(function () {
  console.log('document ready');

    //set up ajax
    var token = localStorage.getItem('token');
    $.ajaxSetup({ contentType: "application/json; charset=utf-8",
    error: handleError,
    headers: { 'authorization': token}});

    //handle click
    $("ul.subnavigation li").click(function(event) {
      /* Act on the event */
      var name = $(event.currentTarget).attr('name');
      hightLightTab(name);
      currentTab = $(event.currentTarget).attr('id');
      switch (name) {
        case 'home':
          changeTitle(`${name}`);
          $("div.latestpost").show();
          $("div.gallery").hide();
          break;
        default:
          changeTitle(`${name} Books`);
          $("div.latestpost").hide();
          $("div.gallery").show();
          loadBook(name);
      }
    });

    //open home by default
    $('#tabHome').click();

    //logOut
    $('#logOut').click(logOut);

    //post reivew
    $('#buttonPosReview').click(postReview);
});


//POST review
var postReview = function(e) {
  e.preventDefault();

  var upLoalImgUrl = endPointUrl + 'webresources/photo';
  var postReviewUrl = endPointUrl + 'webresources/posts';

  var data = new FormData();
  var file = $("#imgFile")[0].files[0];
  data.append('file', file);

  var title = $('#inputBookTitle').val();
  var author = $('#inputBookAuthor').val();
  var review = $('#inputReview').val();

  //checkbox
  var input = $('form input:checkbox');
  var categories = [];
  $.each(input, function(i, item) {
    if ($(item).prop('checked')) {
      // var category = item.prop('');
      var category = $(item).prop('name');
      categories.push(category);
    }
  });

  //Upload img File
  $.ajax({
            type: "POST",
            url: upLoalImgUrl,
            data: data,
            async: false,
            cache: false,
            contentType: false,
            enctype: 'multipart/form-data',
            processData: false,
            success: function (returnedData) {
              console.log('upload picture success');
              //Upload img success => upload Review
              var obj = jQuery.parseJSON(returnedData);
              var imgUrl = obj.url;
              var title = $('#inputBookTitle').val();
              var author = $('#inputBookAuthor').val();
              var review = $('#inputReview').val();

              //checkbox
              var input = $('form input:checkbox');
              var categories = [];
              $.each(input, function(i, item) {
                if ($(item).prop('checked')) {
                  // var category = item.prop('');
                  var category = $(item).prop('name');
                  categories.push(category);
                }
              });

              var object =   { title: title, author : author, path : imgUrl, review: review, categories: categories};
              var postRequest = JSON.stringify(object);


              //Post book modalreview
              $.post(postReviewUrl, postRequest, function(returnedData){
                //reload tab
                console.log('currentTab: ' + currentTab );
                $(`#${currentTab}`).click();
              });
            }
        });

}

//Log out
var logOut = function(e) {
  e.preventDefault();
  localStorage.setItem("didLogIn", false); //save login state
  localStorage.removeItem('token'); //remove token

  //TODO: Navigate to main page
  window.location.href = "index.html";
}


//Change Title
var changeTitle = function(tab) {
  $('#title').html(`
    <h2>${tab}</h2>
  `)
}


//Highlight Tab
var hightLightTab = function(tab) {
  if ($('li').hasClass('tabActive')) {
    $('li').removeClass('tabActive');
  }

  //hightLightTab
  $(`li[name=${tab}]`).addClass('tabActive');
};



//GET Books
var loadBook = function(category) {
  switch (category) {
    case 'all':
      url = endPointUrl + "webresources/posts";
      break;
    default:
      var object =   { filters: category};
      var request = $.param(object);
      var url = endPointUrl + "webresources/posts/categories?" + request;
  }

  console.log('url:' + url);

  $.get(url,
          function(returnData) {

            //refresh HTML
            $("#postList").html("");
            $.each(returnData, function(i, item) {
                var pictureUrl = item.path;
                var postid = item.postid;
                var author = item.bookAuthor;
                var title = item.bookTitle;
                var review = item.review;


                //Load book into book list
                $("#postList").append(
                  `<div class="thumbnail">
                      <img src="${pictureUrl}" alt="${title}">
                      <button class="btn" data-toggle="modal" data-target="modalReview" book-id=${postid}>READ REVIEW</button>
                  </div>`
                );
            });
          });

};


//HANDLE Error
var handleError = function(jqXHR, textStatus, errorThrown) {
  alert(jqXHR.responseJSON.error);
  console.log(jqXHR.responseJSON.error);
  console.log(errorThrown);
};
