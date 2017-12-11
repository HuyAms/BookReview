"use strict"

// Get the modals
let postModal = document.querySelector('.postModal');
let profileModal = document.querySelector('.profileModal');
let bookModal = document.querySelector('.bookModal');
let aboutModal = document.querySelector('.aboutModal');

// Get the triggers
let postTrigger = document.querySelector('.postModalTrigger');
let profileTrigger = document.querySelector('.profileModalTrigger');
// let bookTrigger = document.querySelector('.bookModalTrigger');
let aboutTrigger = document.querySelector('.aboutModalTrigger');

//Show modals when click on triggers
postTrigger.addEventListener('click', (evt) => {
    postModal.style.display = "block";
})

profileTrigger.addEventListener('click', (evt) => {
    profileModal.style.display = "block";
    getMyProfile();
})

   // bookTrigger.addEventListener('click', (evt) => {
   //     bookModal.style.display = "block";
   // })
aboutTrigger.addEventListener('click', (evt) => {
    aboutModal.style.display = "block";

// Get the <span> element that closes the modal
let closePost = document.querySelector('.closePostModal');
let closeProfile = document.querySelector('.closeProfileModal');
let closeBook = document.querySelector('.closeBookModal');
let closeAbout = document.querySelector('.closeAboutModal');

// When the user clicks on(x), close the modal
closePost.addEventListener('click', (evt) => {
    postModal.style.display = "none";
})
closeProfile.addEventListener('click', (evt) => {
    profileModal.style.display = "none";
})
closeBook.addEventListener('click', (evt) => {
    bookModal.style.display = "none";
    console.log('close');
})
closeAbout.addEventListener('click', (evt) => {
    aboutModal.style.display = "none";
})

//When the user clicks outside, close the modal
window.onclick = function(event) {
    if (event.target == postModal || event.target == profileModal || event.target == bookModal || event.target == aboutModal) {
        document.querySelector('.postModal').style.display = "none";
        document.querySelector('.profileModal').style.display = "none";
        document.querySelector('.bookModal').style.display = "none";
        document.querySelector('.aboutModal').style.display = "none";
    }
}

/*
====================MY PROFILE =========================
*/
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
document.querySelector('#buttonUpdateProfile').addEventListener('click', (evt) =>{
  evt.preventDefault();
  updateProfile();
});

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
      getMyProfile();
      alert('Update profile successfully!')
    }
  }).catch((error) => {
    console.log('error: ' + error);
  });
}

/*
====================Post Book =========================
*/
//Listen to button submit book
const buttonPosReview = document.querySelector("#buttonPosReview");
buttonPosReview.addEventListener("click", (evt) => {
  evt.preventDefault();
  console.log('clicked');
  postBook();
})
//[POST] Book
const postBook = () => {
  //url
  const upLoalImgUrl = endPointUrl + 'webresources/photo';
  const postBookUrl = endPointUrl + 'webresources/posts';

  //Upload picture
  const input = document.querySelector('#imgFile');

  const  imgData = new FormData();
  const file = input.files[0];
  imgData.append('file', file);

  //[POST] PHOTO
  fetch(upLoalImgUrl, {
    method: 'POST',
    headers: headers,
    body: imgData
  })
  .then(json)
  .then((data) => {
    if (data.hasOwnProperty('error')) {
      alert(data.error);
    } else {
      console.log(data);
      //Get book info
      const title = document.querySelector('#inputBookTitle').value;
      const author = document.querySelector('#inputBookAuthor').value;
      const review = document.querySelector('#inputReview').value;
      const imgUrl = data.url;

      //Get checkbox
      let categories = [];
      const checkboxes = document.querySelectorAll('form input[type="checkbox"]');
      checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
          categories.push(checkbox.getAttribute('name'));
        }
      });

      //Create request body
      const object =   { title: title, author : author, path : imgUrl, review: review, categories: categories};
      const postRequest = JSON.stringify(object);

      const postBodyHeaders = new Headers({'authorization':token, 'Content-Type':'application/json'});

      //[POST] Book
      fetch(postBookUrl, {
        method: 'POST',
        headers: postBodyHeaders,
        body: postRequest
      })
      .then(json)
      .then((data) => {
        if (data.hasOwnProperty('error')) {
          alert(data.error);
        } else {
          console.log(data);
          document.querySelector('.closePostModal').click();
          document.querySelector('#postForm').reset();
          loadBook(localStorage.getItem('currentTab'));
          alert('Congratulations, your book is now shared with everyone!');
        }
      }).catch((error) => {
        console.log('error: ' + error);
      });
    }

  }).catch((error) => {
    console.log('error: ' + error);
  });
}
