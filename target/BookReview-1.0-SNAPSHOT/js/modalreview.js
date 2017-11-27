var m_ID;

document.addEventListener('click', function (e) {
    e = e || window.event;
    var target = e.target || e.srcElement;
    e.preventDefault();

    //Button Read review clicked
    if (target.hasAttribute('data-toggle') && target.getAttribute('data-toggle') == 'modal') {
        if (target.hasAttribute('data-target')) {
            m_ID = target.getAttribute('data-target');
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
    }
}, false);

$(document).ready(function () {
    var token = localStorage.getItem('token');
    $.ajaxSetup({ contentType: "application/json; charset=utf-8",
    error: handleError,
    headers: { 'authorization': token}});

    $('#buttonSend').click(postComment);
})

var getBookDetail = function(postId) {
  url = endPointUrl + "webresources/posts/" + postId;

  $.get(url,
          function(returnData) {
            var title = returnData.bookTitle;
            var author = returnData.bookAuthor;
            var pictureUrl = returnData.path;
            var review = returnData.review;
            var categories = returnData.categoryCollection;

            //Load bookdetail into modal
            $('#bookReview').html(
              `
              <img src="${pictureUrl}" alt="${title}">
              <h2>${title}</h2>
              <p><b>Author:</b> ${author}<br>
              <b>Publish year:</b> 2017</p>
              <p>${review}</p>
              `
            );
          });
}

var getPostComment = function(postId) {

  url = endPointUrl + "webresources/comments/posts/" + postId;
  $.get(url,
          function(returnData) {
            console.log('Load comments');
            console.log(returnData);
            console.log('PostId: ' + postId);
             $('#commentList').html("");

             if (returnData.length === 0) {
                $('#commentList').html('<p>There are no comments yet Be the first to comment.</p>');
             } else {
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
             }
          });
}

var postComment = function(e) {
  e.preventDefault();
  var comment = $('#inputComment').val();

  var object =   { content: comment };
  var request = $.param(object);

  $.post( endPointUrl + 'webresources/comments/posts/' + m_ID + '?' + request,
      function(returnedData){
        console.log(returnedData);

        //clear input field
        $('#inputComment').val('');

        //reload comment
        getPostComment(m_ID);
      }
  )
}

var handleError = function(jqXHR, textStatus, errorThrown) {
  alert(jqXHR.responseJSON.error);
  console.log(jqXHR.responseJSON.error);
};
