/* --------------------------------------------------
  Handle book category navigation
-----------------------------------------------------*/
document.querySelector('#tabNews').addEventListener("click", () => {handleNavigation('news')});
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
  switch (category) {
    case 'news':
      document.querySelector('.bookList').style.display = 'none';
      document.querySelector('.news').style.display = 'flex';
      document.querySelector('.gallery a.button').style.display = 'none';
      break;
    default:
      document.querySelector('.news').style.display = 'none';
      document.querySelector('.bookList').style.display = 'flex';
      document.querySelector('.gallery a.button').style.display = 'block';

      // loadBook
      loadBook(category);
  }
}

const hightLightTab = function(tab) {
  const listTab = document.querySelectorAll('.bookNav ul li');
    listTab.forEach((tab, index) => {
    tab.classList.remove('tabActive');
  });

  const currentTab = document.querySelector(`.bookNav ul li[name=${tab}]`);
  currentTab.classList.add('tabActive');
  localStorage.setItem('currentTab', tab);
}

//open home tab by default
document.querySelector('#tabNews').click();

//====================Book=========================
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
          const bookAuthor = book.post.bookAuthor;
          console.log('imagepath: ' + imgPath);

          listBookHTML +=
          `
          <section class="book">
            <img src="${imgPath}" alt="${bookTitle}" class="bookImg bookModalTrigger" />
            <p>${bookTitle}</p>
            <p>by <span>${bookAuthor}</span></p>
          </section>
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


//====================Logout=========================
document.querySelector('#buttonLogout').addEventListener('click', (evt) => {
  evt.preventDefault();
  console.log('log out clicked');
  localStorage.setItem("didLogIn", false); //save login state
  localStorage.removeItem('token'); //remove token

  //TODO: Navigate to main page
  window.location.href = "index.html";
})

const json = (res) => {
  return res.json();
}
