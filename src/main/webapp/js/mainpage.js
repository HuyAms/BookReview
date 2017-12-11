
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

const handleNavigation = (category) => {    
  hightLightTab(category);
  getMostViewedBook();
  getMostRatedBook();
  getMostCommentBook();
  getMe();
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


const hightLightTab = (tab) => {
  const listTab = document.querySelectorAll('.bookNav ul li');
  listTab.forEach((tab, index) => {
    tab.classList.remove('tabActive');
  });

  const currentTab = document.querySelector(`.bookNav ul li[name=${tab}]`);
  currentTab.classList.add('tabActive');
  localStorage.setItem('currentTab', tab);
}

let bookId;
//====================Get Username=========================
//[GET] Me
const getMe = () => {
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

      document.querySelector('#userNameNav').innerHTML = username;
      
    }
  }).catch((error) => {
    console.log('error: ' + error);
  });
}

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
            <img src="http://10.114.34.135/Upload/${imgPath}" alt="${bookTitle}" class="bookImg bookModalTrigger" bookId="${bookId}"/>
            <p>${bookTitle}</p>
            <p>by <span>${bookAuthor}</span></p>
          </section>
          `
        })

        //set book to list
        document.querySelector('#postList').innerHTML = listBookHTML;

        //set click on book
        let bookTrigger = document.querySelectorAll('.bookModalTrigger');
        bookTrigger.forEach((item, index) => {
          item.addEventListener('click', (evt) => {
            evt.preventDefault();
            document.querySelector('.bookModal').style.display = "block";
            bookId = evt.target.getAttribute('bookId');
            getBookDetail(bookId);
            putBookView(bookId);
            getComment(bookId);
            getRating(bookId);
            getMyRating(bookId);
          })
        })
      } else {
          document.querySelector('#postList').innerHTML = 
              '<p id="noBook">Sorry, no book available yet. Write a new post to add your book here!</p>';  
      }
    }
  }).catch((error) => {
    console.log('error: ' + error);
  });
}

//====================Spot light=========================
  //set click on spotlight button
let buttonReadMore = document.querySelectorAll('.spotLight a');
buttonReadMore.forEach((item, index) => {
  item.addEventListener('click', (evt) => {
    evt.preventDefault();
    document.querySelector('.bookModal').style.display = "block";
    bookId = evt.target.getAttribute('bookId');
    getBookDetail(bookId);
    putBookView(bookId);
    getComment(bookId);
    getRating(bookId);
    getMyRating(bookId);
  })
})

//[GET] Most Viewd book
const getMostViewedBook = () => {
  const url = endPointUrl + `webresources/posts/mostView`;
  fetch(url, {
    method: 'GET',
    headers: headers
  }).then(json).then((data) => {
    if (data.hasOwnProperty('error')) {
      alert(data.error);
    } else {
      const id = data.postid;
      const author = data.bookAuthor;
      const title = data.bookTitle;
      const imgUrl = data.path;
      const review = data.review;
      const view = data.view;

      //show book reivew
      document.querySelector('#mostViewedCover').innerHTML = `<img src="http://10.114.34.135/Upload/${imgUrl}" alt="${title}">`;
      document.querySelector('#mostViewedCount').innerHTML = view + ' Views';
      document.querySelector('#mostViewedTitle').innerHTML = `${title} <br /><span>by ${author}</span>`;
      document.querySelector('#mostViewedReview').innerHTML = review;

      let buttonMostViewed = document.querySelector('#buttonMostViewed');
      buttonMostViewed.setAttribute('bookId', id);
    }
  }).catch((error) => {
    console.log('error: ' + error);
  });
}

//[GET] Most Rated book
const getMostRatedBook = () => {
  const url = endPointUrl + `webresources/posts/mostRate`;
  fetch(url, {
    method: 'GET',
    headers: headers
  }).then(json).then((data) => {
    if (data.hasOwnProperty('error')) {
      alert(data.error);
    } else {
      const id = data.postid;
      const author = data.bookAuthor;
      const title = data.bookTitle;
      const imgUrl = data.path;
      const review = data.review;
      const view = data.view;

      //show book reivew
      document.querySelector('#mostRatedCover').innerHTML = `<img src="http://10.114.34.135/Upload/${imgUrl}" alt="${title}">`;
      document.querySelector('#mostRatedTitle').innerHTML = `${title} <br /><span>by ${author}</span>`;
      document.querySelector('#mostRatedReview').innerHTML = review;

      let buttonMostViewed = document.querySelector('#buttonMostRated');
      buttonMostViewed.setAttribute('bookId', id);

      //set click on book
      // let bookModal = document.querySelector('.bookModal');
      // let bookTrigger = document.querySelectorAll('.bookModalTrigger');

      //[GET] Book Rating Count
      const ratingUrl = endPointUrl + `webresources/ratings/posts/${id}`;

      fetch(ratingUrl, {
        method: 'GET',
        headers: headers
      }).then(json).then((data) => {
        if (data.hasOwnProperty('error')) {
          alert(data.error);
        } else {
          let rating = data.rating;
          document.querySelector('#mostRatedCount').innerHTML = rating + ' Likes';
        }
      }).catch((error) => {
        console.log('error: ' + error);
      });

    }
  }).catch((error) => {
    console.log('error: ' + error);
  });
}

//[GET] Most Comment Book
const getMostCommentBook = () => {
  const url = endPointUrl + `webresources/posts/mostComment`;
  fetch(url, {
    method: 'GET',
    headers: headers
  }).then(json).then((data) => {
    if (data.hasOwnProperty('error')) {
      alert(data.error);
    } else {
      const id = data.postid;
      const author = data.bookAuthor;
      const title = data.bookTitle;
      const imgUrl = data.path;
      const review = data.review;
      const view = data.view;

      //show book reivew
      document.querySelector('#mostCommentCover').innerHTML = `<img src="http://10.114.34.135/Upload/${imgUrl}" alt="${title}">`;
      document.querySelector('#mostCommentTitle').innerHTML = `${title} <br /><span>by ${author}</span>`;
      document.querySelector('#mostCommentReview').innerHTML = review;

      let buttonMostViewed = document.querySelector('#buttonMostComment');
      buttonMostViewed.setAttribute('bookId', id);

      //[GET] Book Comment Count
      const commentUrl = endPointUrl + `webresources/comments/posts/${id}`;

      fetch(commentUrl, {
        method: 'GET',
        headers: headers
      }).then(json).then((data) => {
        if (data.hasOwnProperty('error')) {
          alert(data.error);
        } else {
          console.log('length: ' + data.length);
          document.querySelector('#mostCommentCount').innerHTML = data.length + ' Comments';
        }
      }).catch((error) => {
        console.log('error: ' + error);
      });

    }
  }).catch((error) => {
    console.log('error: ' + error);
  });
}

//====================Book Detail=========================
//[GET] Book Detail
const getBookDetail = (bookId) => {
  const url = endPointUrl + `webresources/posts/${bookId}`;
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
      document.querySelector('#bookTitle').innerHTML = title;
      document.querySelector('#bookCover').innerHTML = `<img src="http://10.114.34.135/Upload/${imgUrl}" alt="gmat">`;
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

//[PUT] Book View
const putBookView = (bookId) => {
  const url = endPointUrl + `webresources/posts/${bookId}/view`;

  fetch(url, {
    method: 'PUT',
    headers: headers
  }).then(json).then((data) => {
    if (data.hasOwnProperty('error')) {
      alert(data.error);
    } else {
      console.log("view: " + data.view);
    }
  }).catch((error) => {
    console.log('error: ' + error);
  });
}
//====================Comment=========================
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
        document.querySelector('#commentsCounts').innerHTML = 0;
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
            <p class="commentContent">${content}</p>
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

//[POST] Comments
const buttonComment = document.querySelector("#buttonComment");
buttonComment.addEventListener("click", (evt) => {
  evt.preventDefault();
  postComment();
})

const postComment = () => {
  let comment = document.querySelector('#inputComment').value;
  const url = endPointUrl + `webresources/comments/posts/${bookId}?content=${comment}`;

  fetch(url, {
    method: 'POST',
    headers: headers
  }).then(json).then((data) => {
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

/* ====================Rating ========================= */
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

//[GET] My rating for book
let myRatingId = '';
const getMyRating = (bookId) => {
  const url = endPointUrl + `webresources/ratings/me/posts/${bookId}`;

  fetch(url, {
    method: 'GET',
    headers: headers
  }).then(json).then((data) => {
    if (data.hasOwnProperty('error')) {
        alert(data.error);
    } else {
      if (data.hasOwnProperty('rateid')){
        document.querySelector('#likeIcon').setAttribute('src', 'images/Like_Button/liked.png');
        myRatingId = data.rateid;
      } else {
        document.querySelector('#likeIcon').setAttribute('src', 'images/Like_Button/unliked.png');
      }

    }
  }).catch((error) => {
    console.log('error: ' + error);
  });
}

document.querySelector('#likeIcon').addEventListener('click', (evt) => {
  evt.preventDefault();
  let src = evt.target.getAttribute('src');

  if (src.indexOf("images/Like_Button/liked.png") != -1) {
    document.querySelector('#likeIcon').setAttribute('src', 'images/Like_Button/unliked.png');
    if (myRatingId != '') {
      //[DELETE] Rating
      const url = endPointUrl + `webresources/ratings/${myRatingId}`;

      fetch(url, {
        method: 'DELETE',
        headers: headers
      }).then(json).then((data) => {
        if (data.hasOwnProperty('error')) {
          alert(data.error);
        } else {
          //reload rating list
          getRating(bookId);
          getMyRating(bookId);
        }
      }).catch((error) => {
        console.log('error: ' + error);
      });
    }
  } else {
    document.querySelector('#likeIcon').setAttribute('src', 'images/Like_Button/liked.png');

    //[POST] Rating
    const url = endPointUrl + `webresources/ratings/posts/${bookId}`;

    fetch(url, {
      method: 'POST',
      headers: headers
    }).then(json).then((data) => {
      if (data.hasOwnProperty('error')) {
        alert(data.error);
      } else {
        //reload rating list
        getRating(bookId);
        getMyRating(bookId);
      }
    }).catch((error) => {
      console.log('error: ' + error);
    });

  }
})

//====================Logout=========================
document.querySelector('#buttonLogout').addEventListener('click', (evt) => {
  evt.preventDefault();
  console.log('log out clicked');
  localStorage.removeItem("didLogIn"); //save login state
  localStorage.removeItem('token'); //remove token

  //TODO: Navigate to main page
  window.location.href = "index.html";
})

const json = (res) => {
  return res.json();
}


if (!localStorage.getItem("didLogIn")) {
  //TODO: Navigate to main page
  window.location.href = "index.html";
    console.log("go to login");
} else {
    //open home tab by default
   document.querySelector('#tabNews').click(); 
}


