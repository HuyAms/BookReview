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
                getComment(bookId);

                break;
              case 'profile':
                //load my profile
                getMyProfile();
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

//Listen to button post comment
const buttonComment = document.querySelector("#buttonComment");
buttonComment.addEventListener("click", (evt) => {
  evt.preventDefault();
  postComment();
})

//Listen to button post comment
const buttonUpdateProfile = document.querySelector("#buttonUpdateProfile");
buttonUpdateProfile.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateProfile();
})

//[GET] Book Detail
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

//[GET] Comments
const getComment = (bookId) => {
  const url = endPointUrl + `webresources/comments/posts/${bookId}`;

  fetch(url, {
    method: 'GET',
    headers: headers
  })
  .then(json)
  .then((data) => {
    if (data.hasOwnProperty('error')) {
      alert(data.error);
    } else {
      let listComment = '';
      //clear comment list
      document.querySelector('#commentList').innerHTML = '';

      if(data.length === 0) { //No comment
        document.querySelector('#commentList').innerHTML =
        `<p>There are no comments yet Be the first to comment.</p>`;
      } else {
        data.forEach((comment) => {
          let username = comment.userUid.username;
          let content = comment.content;
          listComment +=
          `
          <div class="comment">
              <div class="sideinfo">
                 <h4>${username}</h4>
              </div>
              <div class="showcomment">
                  <pre>${content}</pre>
              </div>
          </div>
          `
        });

        document.querySelector('#commentList').innerHTML = listComment;
      }

    }
  }).catch((error) => {
    console.log('error: ' + error);
  });
}

//[POST] Comment
const postComment  = () => {
  let comment = document.querySelector('#inputComment').value;
  const url = endPointUrl + `webresources/comments/posts/${bookId}?content=${comment}`;

  fetch(url, {
    method: 'POST',
    headers: headers
  })
  .then(json)
  .then((data) => {
    if (data.hasOwnProperty('error')) {
      alert(data.error);
    } else {
      //reload comment list
      getComment(bookId);
     document.querySelector('#inputComment').value = '';
    }
  }).catch((error) => {
    console.log('error: ' + error);
  });
}

//[GET] My profile
const getMyProfile = () => {
  const url = endPointUrl + `webresources/users/me`;

  fetch(url, {
    method: 'GET',
    headers: headers
  })
  .then(json)
  .then((data) => {
    if (data.hasOwnProperty('error')) {
      alert(data.error);
    } else {
      let username = data.username ;
      let email = data.email;

      document.querySelector('#inputProfileName').value = username;
      document.querySelector('#inputProfileEmail').value = email;
    }
  }).catch((error) => {
    console.log('error: ' + error);
  });
}

//[PUT] My profile
const updateProfile = () => {
  let userName = document.querySelector('#inputProfileName').value;
  let email = document.querySelector('#inputProfileEmail').value;
  let currentPassword = document.querySelector('#inputCurrentPassword').value;
  let newPassword = document.querySelector('#inputNewPassword').value;
  let confirmPassword = document.querySelector('#inputConfirmPassword').value;

  if (newPassword != confirmPassword) {
    alert('New password does not match confirm password');
  }

  const url = endPointUrl + `webresources/users/me?username=${userName}&&email=${email}&&oldpassword=${currentPassword}&&newpassword=${newPassword}&&`;

  fetch(url, {
    method: 'PUT',
    headers: headers
  })
  .then(json)
  .then((data) => {
    if (data.hasOwnProperty('error')) {
      alert(data.error);
    } else {
      console.log(data);
      //reload profile
      getMyProfile(bookId);
      alert('Update profile successfully!')
    }
  }).catch((error) => {
    console.log('error: ' + error);
  });
}

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
