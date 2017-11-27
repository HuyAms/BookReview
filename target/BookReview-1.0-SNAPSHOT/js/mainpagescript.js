"use strict"
// function showcontent(){
//
//     var i, book, tab;

    // book = document.getElementsByClassName("book");
    // for (i=0; i<book.length;i++){
    //     book[i].style.display = "none";
    //     console.log(book.length);
    // }

    // tab = document.getElementsByClassName("subnavigation")[0].children;
    // for (i=0; i<tab.length;i++){
    //     tab[i].className= tab[i].className.replace("Active","");
    // }
   //  console.log(action);
   //  document.getElementsByClassName(action)[0].style.display = "block";
   //  event.currentTarget.className += "Active";
   //  event.preventDefault();
   // var action = event.currentTarget.textContent;
   // console.log(action);
// }.


//Load all book by default
// document.getElementById("tabAll").click();

$(document).ready(function () {
  console.log('document ready');
    var token = localStorage.getItem('token');
    $.ajaxSetup({ contentType: "application/json; charset=utf-8",
    error: handleError,
    headers: { 'authorization': token}});

    //Load all book by default
    loadBook('all');

    $("#tabAll").click(function(){
      loadBook('all');
    });
    $("#tabGuide").click(function(){
      loadBook('fiction');
    });
    $("#tabNovel").click(function(){
      loadBook('novel');
    });
    $("#tabHorror").click(function(){
      loadBook('travel');
    });
    $("#tabTravel").click(function(){
      loadBook('guide');
    });
    $("#tabFiction").click(function(){
      loadBook('horror');
    });
    $("#tabRomance").click(function(){
      loadBook('romance');
    });
    $("#tabScience").click(function(){
      loadBook('science');
    });
    $("#tabOthers").click(function(){
      loadBook('science');
    });
    $("#tabOthers").click(function(){
      loadBook('others');
    });
});

var hightLightTab = function(tab) {

};

var loadBook = function(category) {
  switch (category) {
    case 'all':
      url = "http://localhost:43319/BookReview/webresources/posts";
      break;
    default:
      var object =   { category: category};
      var request = $.param(object);
      var url = "http://localhost:43319/BookReview/webresources/posts/categories?" + request;
  }

  console.log('url:' + url);

  $.get(url,
          function(returnData) {
            $("#postList").html("");
            $.each(returnData, function(i, item) {

                //refresh HTML
                var pictureUrl = item.path;
                var postid = item.postid;
                var author = item.bookAuthor;
                var title = item.bookTitle;
                var review = item.review;


                //Load book into book list
                $("#postList").append(
                  `<div class="thumbnail">
                      <img src="${pictureUrl}" alt="gmat">
                      <button class="btn" data-toggle="modal" data-target="${postid}">READ REVIEW</button>
                  </div>`
                );

                //load list commnet
            });
          });

};

var handleError = function(jqXHR, textStatus, errorThrown) {
  alert(jqXHR.responseJSON.error);
  console.log(jqXHR.responseJSON.error);
};
