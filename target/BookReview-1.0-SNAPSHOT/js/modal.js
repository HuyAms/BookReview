"use strict"

// Get the modals
var postModal = document.querySelector('.postModal');
var profileModal = document.querySelector('.profileModal');
var bookModal = document.querySelector('.bookModal');

// Get the triggers
var postTrigger = document.querySelector('.postModalTrigger');
var profileTrigger = document.querySelector('.profileModalTrigger');
var bookTrigger = document.querySelector('.bookModalTrigger');

//Show modals when click on triggers
postTrigger.addEventListener('click', (evt) => {
    postModal.style.display = "block";
})
profileTrigger.addEventListener('click', (evt) => {
    profileModal.style.display = "block";
})
bookTrigger.addEventListener('click', (evt) => {
    bookModal.style.display = "block";
})

// Get the <span> element that closes the modal
var closePost = document.querySelector('.closePostModal');
var closeProfile = document.querySelector('.closeProfileModal');
var closeBook = document.querySelector('.closeBookModal');

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
