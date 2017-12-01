"use strict";

let bookId;

document.addEventListener('click', function (e) {
    e = e || window.event;
    var target = e.target || e.srcElement;
    //Button Read review clicked
    if (target.hasAttribute('data-toggle') && target.getAttribute('data-toggle') == 'modal') {
        if (target.hasAttribute('data-target')) {
            e.preventDefault();

            var m_ID = target.getAttribute('data-target');
            bookId = target.getAttribute('book-id');

            // open modal
            document.getElementById(m_ID).classList.add('open');

            switch (m_ID) {
              case 'modalReview':
                //load bookdetail by id
                getBookDetail(bookId);

                //Load comments
                //getPostComment(postID);
                // console.log('bookid: ' + bookId);
                break;
              case 'profile':
                //load my profile
                //getMyProfile();
              default:
            }
        }
    }

    //Close modal window with 'data-dismiss' attribute or when the backdrop is clicked
    if ((target.hasAttribute('data-dismiss') && target.getAttribute('data-dismiss') == 'modal') || target.classList.contains('modal')) {
        var modal = document.querySelector('[class="modal open"]');
        modal.classList.remove('open');
    }
}, false);

const getBookDetail = (bookId) => {
  const url = endPointUrl + `webresources/posts/${bookId}`;

  fetch(url, {
    method: 'GET',
    headers: headers
  })
  .then(json)
  .then((data) => {
    if (data.hasOwnProperty('error')) {
      alert(data.error);
    } else {
      let bookDetail = '';
      //clear list book
      document.querySelector('#bookReview').innerHTML = bookDetail;
      const author = data.bookAuthor;
      const title = data.bookTitle;
      const imgUrl = data.path;
      const review = data.review;

      bookDetail =
      `
        <img src="${imgUrl}" alt="${title}">
        <h2>${title}</h2>
        <p><b>Author:</b> ${author}<br>
        <b>Publish year:</b> 2017</p>
        <pre>${review}</pre>
      `
      //show book reivew
      document.querySelector('#bookReview').innerHTML = bookDetail;
  }
  }).catch((error) => {
    console.log('error: ' + error);
  });

}


// $(document).ready(function () {
//     var token = localStorage.getItem('token');
//     $.ajaxSetup({ contentType: "application/json; charset=utf-8",
//     error: handleError,
//     headers: { 'authorization': token}});
//
//     $('#buttonSend').click(postComment);
//
//     //update profileb
//     $('#buttonUpdateProfile').click(updateProfile);
// })


//GET my profile
// var getMyProfile = function() {
//   var url = endPointUrl + "webresources/users/me";
//   $.get(url, function(returnedData) {
//     var email = returnedData.email;
//     var userName = returnedData.username;
//
//     $('#inputProfileName').prop('value', userName);
//     $('#inputProfileEmail').prop('value', email);
//   });
// }

//UPDATE profile
// var updateProfile = function() {
//   var userName = $('#inputProfileName').val();
//   var email = $('#inputProfileEmail').val();
//   var currentPassword = $('#inputCurrentPassword').val();
//   var newPassword = $('#inputNewPassword').val();
//   var confirmPassword = $('#inputConfirmPassword').val();
//
//   if (newPassword != confirmPassword) {
//     alert('New password does not match confirm password');
//   }
//
//   var object =   { email: email, username: userName, oldpassword: currentPassword, newpassword: newPassword};
//   var request = $.param(object);
//
//   var url = endPointUrl + "webresources/users/me?" + request;
//
//   $.ajax({
//     url: url,
//     method: 'PUT',
//     success: function(returnedData) {
//       console.log(returnedData);
//       //clear field
//       var currentPassword = $('#inputCurrentPassword').val('');
//       var newPassword = $('#inputNewPassword').val('');
//       var confirmPassword = $('#inputConfirmPassword').val('');
//
//       //get update profile
//       getMyProfile();
//     }
//   });
// }


//GET book detail
// var getBookDetail = function(postId) {
//   var url = endPointUrl + "webresources/posts/" + postId;
//
//   $.get(url,
//           function(returnData) {
//             var title = returnData.bookTitle;
//             var author = returnData.bookAuthor;
//             var pictureUrl = returnData.path;
//             var review = returnData.review;
//             var categories = returnData.categoryCollection;
//
//             //Load bookdetail into modal
//             $('#bookReview').html(
//               `
//               <img src="${pictureUrl}" alt="${title}">
//               <h2>${title}</h2>
//               <p><b>Author:</b> ${author}<br>
//               <b>Publish year:</b> 2017</p>
//               <pre>${review}</pre>
//               `
//             );
//           });
// }


//GET comment
// var getPostComment = function(postId) {
//
//   var url = endPointUrl + "webresources/comments/posts/" + postId;
//   $.get(url,
//           function(returnData) {
//              $('#commentList').html("");
//
//              if (returnData.length === 0) {
//                 $('#commentList').html('<p>There are no comments yet Be the first to comment.</p>');
//              } else {
//                $.each(returnData, function(i, item) {
//                  var comment = item.content;
//                  var username = item.userUid.username;
//                  console.log('comment: ' + comment);
//
//                 $('#commentList').append(`
//                   <div class="comment">
//                       <div class="sideinfo">
//                           <h4>${username}</h4>
//                       </div>
//                       <div class="showcomment">
//                           <pre>${comment}</pre>
//                       </div>
//                   </div>
//                 `)
//                });
//              }
//           });
// }


//POST comment
// var postComment = function(e) {
//   e.preventDefault();
//   var comment = $('#inputComment').val();
//
//   var object =   { content: comment };
//   var request = $.param(object);
//
//   $.post( endPointUrl + 'webresources/comments/posts/' + postID + '?' + request,
//       function(returnedData){
//         console.log(returnedData);
//
//         //clear input field
//         $('#inputComment').val('');
//
//         //reload comment
//         getPostComment(postID);
//       }
//   )
// }


//HANDLE Error
// var handleError = function(jqXHR, textStatus, errorThrown) {
//   alert(jqXHR.responseJSON.error);
//   console.log(jqXHR.responseJSON.error);
// };
