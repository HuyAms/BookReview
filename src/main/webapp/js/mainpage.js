/* --------------------------------------------------
  Handle book category navigation
-----------------------------------------------------*/
document.querySelector('#tabNews').addEventListener("click", () => {
  handleNavigation('news')
});
document.querySelector('#tabAll').addEventListener("click", () => {
  handleNavigation('all')
});
document.querySelector('#tabFiction').addEventListener("click", () => {
  handleNavigation('fiction')
});
document.querySelector('#tabNovel').addEventListener("click", () => {
  handleNavigation('novel')
});
document.querySelector('#tabTravel').addEventListener("click", () => {
  handleNavigation('travel')
});
document.querySelector('#tabGuide').addEventListener("click", () => {
  handleNavigation('guide')
});
document.querySelector('#tabHorror').addEventListener("click", () => {
  handleNavigation('horror')
});
document.querySelector('#tabRomance').addEventListener("click", () => {
  handleNavigation('romance')
});
document.querySelector('#tabScience').addEventListener("click", () => {
  handleNavigation('science')
});
document.querySelector('#tabOthers').addEventListener("click", () => {
  handleNavigation('others')
});

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
  }).then(json).then((data) => {
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

          listBookHTML += `
          <section class="book">
            <img src="${imgPath}" alt="${bookTitle}" class="bookImg bookModalTrigger" bookId="${bookId}"/>
            <p>${bookTitle}</p>
            <p>by <span>${bookAuthor}</span></p>
          </section>
          `
        })

        //set book to list
        document.querySelector('#postList').innerHTML = listBookHTML;

        //set click on book
        let bookModal = document.querySelector('.bookModal');
        let bookTrigger = document.querySelectorAll('.bookModalTrigger');
        bookTrigger.forEach((item, index) => {
          item.addEventListener('click', (evt) => {
            bookModal.style.display = "block";
            let bookId = evt.target.getAttribute('bookId');
            getBookDetail(bookId);
            getComment(bookId);
            getRating(bookId)
          })
        })
      }
    }
  }).catch((error) => {
    console.log('error: ' + error);
  });
}

//====================Book Detail=========================
//[GET] Book Detail
const getBookDetail = (bookId) => {
  const url = endPointUrl + `webresources/posts/${bookId}`;
  console.log('getBookDetail: ' + bookId);
  fetch(url, {
    method: 'GET',
    headers: headers
  }).then(json).then((data) => {
    if (data.hasOwnProperty('error')) {
      alert(data.error);
    } else {
      const author = data.bookAuthor;
      const title = data.bookTitle;
      const imgUrl = data.path;
      const review = data.review;
      const view = data.view;
      const user = data.userUid.username;
      const timestamp = data.timestamp;
      console.log(data);

      //show book reivew
      document.querySelector('#modalHeader').innerHTML = title;
      document.querySelector('#bookCover').innerHTML = `<img src="${imgUrl}" alt="gmat">`;
      document.querySelector('#bookAuthor').innerHTML = `Book author: ${author}`;
      document.querySelector('#viewsCounts').innerHTML = view;
      document.querySelector('#reviewAuthor').innerHTML = user;
      document.querySelector('#reviewContent').innerHTML = review;

      let t = new Date(timestamp);
      document.querySelector('#reviewTime').innerHTML = `${t.getDate()}/${t.getMonth()}/${t.getFullYear()} ${t.getHours()}:${t.getMinutes()}`;
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
  }).then(json).then((data) => {
    if (data.hasOwnProperty('error')) {
      alert(data.error);
    } else {
      let listComment = '';
      //clear comment list
      document.querySelector('#commentList').innerHTML = '';

      if (data.length === 0) { //No comment
        document.querySelector('#commentList').innerHTML = `<p>There are no comments yet Be the first to comment.</p>`;
      } else {
        document.querySelector('#commentsCounts').innerHTML = data.length;
        data.forEach((comment) => {
          let username = comment.userUid.username;
          let content = comment.content;
          let timestamp = comment.timestamp;
          let t = new Date(timestamp);
          listComment += `
          <div class="wholeComment">
            <h3 class="commentUser">${username}</h3>
            <p class="commentTime">${t.getDate()}/${t.getMonth()}/${t.getFullYear()} ${t.getHours()}:${t.getMinutes()}</p>
            <pre class="commentContent">${content}</pre>
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

//[GET] Book Rating
const getRating = (bookId) => {
  const url = endPointUrl + `webresources/ratings/posts/${bookId}`;

  fetch(url, {
    method: 'GET',
    headers: headers
  }).then(json).then((data) => {
    if (data.hasOwnProperty('error')) {
      alert(data.error);
    } else {
      let rating = data.rating;
      document.querySelector('#likesCounts').innerHTML = rating;
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
