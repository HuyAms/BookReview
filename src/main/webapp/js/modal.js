"use strict"

// Get the modals
let postModal = document.querySelector('.postModal');
let profileModal = document.querySelector('.profileModal');
let bookModal = document.querySelector('.bookModal');

// Get the triggers
let postTrigger = document.querySelector('.postModalTrigger');
let profileTrigger = document.querySelector('.profileModalTrigger');
   let bookTrigger = document.querySelector('.bookModalTrigger');

//Show modals when click on triggers
postTrigger.addEventListener('click', (evt) => {
    postModal.style.display = "block";
})

profileTrigger.addEventListener('click', (evt) => {
    profileModal.style.display = "block";
    getMyProfile();
})

   bookTrigger.addEventListener('click', (evt) => {
       bookModal.style.display = "block";
   })

// Get the <span> element that closes the modal
let closePost = document.querySelector('.closePostModal');
let closeProfile = document.querySelector('.closeProfileModal');
let closeBook = document.querySelector('.closeBookModal');

// When the user clicks on(x), close the modal
closePost.addEventListener('click', (evt) => {
    postModal.style.display = "none";
})
closeProfile.addEventListener('click', (evt) => {
    profileModal.style.display = "none";
})
closeBook.addEventListener('click', (evt) => {
    bookModal.style.display = "none";
})

//When the user clicks outside, close the modal
window.onclick = function(event) {
    if (event.target == postModal || event.target == profileModal || event.target == bookModal) {
        postModal.style.display = "none";
        profileModal.style.display = "none";
        bookModal.style.display = "none";
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
