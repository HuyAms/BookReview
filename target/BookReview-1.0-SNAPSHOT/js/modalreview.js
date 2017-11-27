document.addEventListener('click', function (e) {
    e = e || window.event;
    var target = e.target || e.srcElement;
    e.preventDefault();

    //Button Read review clicked
    if (target.hasAttribute('data-toggle') && target.getAttribute('data-toggle') == 'modal') {
        if (target.hasAttribute('data-target')) {
            var m_ID = target.getAttribute('data-target');
            console.log("open modal with bookID:" + m_ID);

            // open modal
            document.getElementById('modalReview').classList.add('open');

            //load bookdetail by id
            getBookDetail(m_ID);

            //Load comments
            getPostComment(m_ID);
        }
    }

    // Close modal window with 'data-dismiss' attribute or when the backdrop is clicked
    if ((target.hasAttribute('data-dismiss') && target.getAttribute('data-dismiss') == 'modal') || target.classList.contains('modal')) {
        var modal = document.querySelector('[class="modal open"]');
        modal.classList.remove('open');
        console.log('dissmiss modal');
    }
}, false);

$(document).ready(function () {
    var token = localStorage.getItem('token');
    console.log('MainPage Ready');
    $.ajaxSetup({ contentType: "application/json; charset=utf-8",
    error: handleError,
    headers: { 'authorization': token}});
})

var getBookDetail = function(postId) {
  url = "http://localhost:43319/BookReview/webresources/posts/" + postId;

  $.get(url,
          function(returnData) {
            var title = returnData.bookTitle;
            var author = returnData.bookAuthor;
            var pictureUrl = returnData.path;
            var review = returnData.review;
            var categories = returnData.categoryCollection;

            console.log("title: " + title);
            console.log("author: " + author);
            console.log("pictureUrl: " + pictureUrl);
            console.log("review: " + review);
            console.log("categories: " + categories);

            //Load bookdetail into modal
            $('#bookReview').html(
              `
              <img src="${pictureUrl}" alt="${title}">
              <h2>${title}</h2>
              <p>Author: publish company<br>
              Publish year: 2017</p>
              <p>${review}</p>
              `
            );
          });
}

var getPostComment = function(postId) {
  url = "http://localhost:43319/BookReview/webresources/comments/posts/" + postId;
  $.get(url,
          function(returnData) {
            console.log('Load comments');
            console.log(returnData);
             $('#commentList').html("");

            $.each(returnData, function(i, item) {
              var commnet = item.content;
              var username = item.userUid.username;

             $('#commentList').append(`
               <div class="comment">
                   <div class="sideinfo">
                       <h4>${username}</h4>
                   </div>
                   <div class="showcomment">
                       <p>${commnet}</p>
                   </div>
               </div>
             `)
            });
          });
}

var handleError = function(jqXHR, textStatus, errorThrown) {
  alert(jqXHR.responseJSON.error);
  console.log(jqXHR.responseJSON.error);
};
