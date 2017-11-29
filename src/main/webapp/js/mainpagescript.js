"use strict"

$(document).ready(function () {
  console.log('document ready');
    var token = localStorage.getItem('token');
    $.ajaxSetup({ contentType: "application/json; charset=utf-8",
    error: handleError,
    headers: { 'authorization': token}});

    //Load all book by default
    loadBook('all');
    hightLightTab('all');
    changeTitle('all');

    $("#tabAll").click(function(){
      loadBook('all');
      hightLightTab('all');
      changeTitle('all');

    });
    $("#tabGuide").click(function(){
      loadBook('guide');
      hightLightTab('guide');
      changeTitle('guide');
    });
    $("#tabNovel").click(function(){
      loadBook('novel');
      hightLightTab('novel');
      changeTitle('novel');
    });
    $("#tabHorror").click(function(){
      loadBook('horror');
      hightLightTab('horror');
      changeTitle('horror');
    });
    $("#tabTravel").click(function(){
      loadBook('travel');
      hightLightTab('travel');
      changeTitle('travel');
    });
    $("#tabFiction").click(function(){
      loadBook('fiction');
      hightLightTab('fiction');
      changeTitle('fiction');
    });
    $("#tabRomance").click(function(){
      loadBook('romance');
      hightLightTab('romance');
      changeTitle('romance');
    });
    $("#tabScience").click(function(){
      loadBook('science');
      hightLightTab('science');
      changeTitle('science');
    });
    $("#tabOthers").click(function(){
      loadBook('others');
      hightLightTab('others');
      changeTitle('others');
    });

    //logOut
    $('#logOut').click(logOut);

    //post reivew
    $('#buttonPosReview').click(postReview);
});

var postReview = function(e) {
  e.preventDefault();

  //uploadFile
  var upLoalImgUrl = endPointUrl + 'webresources/photo';
  var data = new FormData();
  var file = $("#imgFile")[0].files[0];
  data.append('file', file);

  $.ajax({
            type: "POST",
            url: upLoalImgUrl,
            data: data,
            async: false,
            cache: false,
            contentType: false,
            enctype: 'multipart/form-data',
            processData: false,
            success: function (returnData) {
              console.log(returnData);
              alert("Data Uploaded: ");
            }
        });

}

var logOut = function(e) {
  e.preventDefault();
  localStorage.setItem("didLogIn", false); //save login state
  localStorage.removeItem('token'); //remove token

  //TODO: Navigate to main page
  window.location.href = "index.html";
}

var changeTitle = function(tab) {
  $('#title').html(`
    <h2>${tab} Books</h2>
  `)
}

var hightLightTab = function(tab) {
  if ($('li').hasClass('tabActive')) {
    $('li').removeClass('tabActive');
  }

  //hightLightTab
  $(`li[name=${tab}]`).addClass('tabActive');
};


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
                      <img src="${pictureUrl}" alt="gmat">
                      <button class="btn" data-toggle="modal" data-target="modalReview" book-id=${postid}>READ REVIEW</button>
                  </div>`
                );
            });
          });

};

var handleError = function(jqXHR, textStatus, errorThrown) {
  alert(jqXHR.responseJSON.error);
  console.log(jqXHR.responseJSON.error);
};
