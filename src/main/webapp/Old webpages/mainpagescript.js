"use strict";

document.querySelector('#tabHome').addEventListener("click", () => {handleNavigation('home')});
document.querySelector('#tabAll').addEventListener("click", () => {handleNavigation('all')});
document.querySelector('#tabFiction').addEventListener("click", () => {handleNavigation('fiction')});
document.querySelector('#tabNovel').addEventListener("click", () => {handleNavigation('novel')});
document.querySelector('#tabTravel').addEventListener("click", () => {handleNavigation('travel')});
document.querySelector('#tabGuide').addEventListener("click",() => {handleNavigation('guide')});
document.querySelector('#tabHorror').addEventListener("click", () => {handleNavigation('horror')});
document.querySelector('#tabRomance').addEventListener("click", () => {handleNavigation('romance')});
document.querySelector('#tabScience').addEventListener("click", () => {handleNavigation('science')});
document.querySelector('#tabOthers').addEventListener("click",() => {handleNavigation('others')});

const handleNavigation = function(category) {
  hightLightTab(category);
  changeTitle(category);
  switch (category) {
    case 'home':
      document.querySelector('.gallery').style.display = 'none';
      document.querySelector('.latestpost').style.display = 'block';
      break;
    default:
      document.querySelector('.latestpost').style.display = 'none';
      document.querySelector('.gallery').style.display = 'block';

      // loadBook
      loadBook(category);
  }
}

const hightLightTab = function(tab) {
  const listTab = document.querySelectorAll('li');
    listTab.forEach((tab, index) => {
    tab.classList.remove('tabActive');
  });

  const currentTab = document.querySelector(`li[name=${tab}]`);
  currentTab.classList.add('tabActive');
  localStorage.setItem('currentTab', tab);
}

var changeTitle = (tab) => {
  const title = document.querySelector('#title');
  title.innerHTML = `<h2>${tab}</h2>`;
}

//[GET] Book List
const loadBook = (category) => {
  let url = "";
  switch (category) {
    case 'all':
       url = endPointUrl + `webresources/posts`;
      break;
    default:
      url = endPointUrl + `webresources/posts/categories?filters=${category}`;
  }

  fetch(url, {
    method: 'GET',
    headers: headers
  })
  .then(json)
  .then((data) => {
    if (data.hasOwnProperty('error')) {
      alert(data.error);
    } else {
      let listBookHTML = '';
      //clear list book
      document.querySelector('#postList').innerHTML = '';
      if (data.length != 0) {
        data.forEach((book) => {
          const numberOfLike = book.numberOfLike;
          const numberOfComment = book.numberOfComment;
          const imgPath = book.post.path;
          const bookTitle = book.post.bookTitle;
          const bookId = book.post.postid;

          listBookHTML +=
          `
          <div class="thumbnail">
              <img data-toggle="modal" data-target="modalReview" book-id=${bookId} src="${imgPath}" alt="${bookTitle}" />

              <button data-toggle="modal" data-target="modalReview" book-id=${bookId}>
                  <ul class="likebtn">
                      <li><img id="heartbtn" src="images/Like_Button/liked.png"></li>
                      <li><p>${numberOfLike}</p></li>
                      <li><img id="heartbtn" src="images/commentbtn.png" style="margin-left:15px"></li>
                      <li><p>${numberOfComment}</p></li>
                  </ul>
              </button>
          </div>
          `
        })

        //set book to list
        document.querySelector('#postList').innerHTML = listBookHTML;
      }
  }
  }).catch((error) => {
    console.log('error: ' + error);
  });

}

//parseJSON
const json = (res) => {
  return res.json();
}

//open home tab by default
document.querySelector('#tabHome').click();

//Log out
const logOutButton = document.querySelector('#logOut');
logOutButton.addEventListener('click', function(evt){
  evt.preventDefault();
  console.log('log out clicked');
  localStorage.setItem("didLogIn", false); //save login state
  localStorage.removeItem('token'); //remove token

  //TODO: Navigate to main page
  window.location.href = "index.html";
});
