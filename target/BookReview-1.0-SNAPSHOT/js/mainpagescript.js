"use strict";

//default tabs
// let currentTab;

// const subnavigation = document.querySelectorAll('ul.subnavigation li');
// subnavigation.addEventListener('click', function(evt){
//   evt.preventDefault();
//   console.log('navigation clicked');
// });
// const token = localStorage.getItem('token');
// const headers = new Headers({'authorization':token});

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
}

var changeTitle = (tab) => {
  const title = document.querySelector('#title');
  title.innerHTML = `<h2>${tab}</h2>`;
}

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
      document.querySelector('#postList').innerHTML = listBookHTML;
      data.forEach((book) => {
        const numberOfLike = book.numberOfLike;
        const numberOfComment = book.numberOfComment;
        const imgPath = book.post.path;
        const bookTitle = book.post.bookTitle;
        const bookId = book.post.postid;

        listBookHTML +=
        `
        <div class="thumbnail">
            <img data-toggle="modal" data-target="modalReview" book-id=${bookId} src="${imgPath}" alt="${bookTitle}">

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
        //set book to list
        document.querySelector('#postList').innerHTML = listBookHTML;

      })
  }
  }).catch((error) => {
    console.log('error: ' + error);
  });

}

const json = (res) => {
  return res.json();
}

//open home tab by default
document.querySelector('#tabHome').click();

// $(document).ready(function () {
//   console.log('document ready');

    //set up ajax
    // var token = localStorage.getItem('token');
    // $.ajaxSetup({ contentType: "application/json; charset=utf-8",
    // error: handleError,
    // headers: { 'authorization': token}});

    //handle click
    // $("ul.subnavigation li").click(function(event) {
    //   var name = $(event.currentTarget).attr('name');
    //   hightLightTab(name);
    //   currentTab = $(event.currentTarget).attr('id');
    //   switch (name) {
    //     case 'home':
    //       changeTitle(`${name}`);
    //       $("div.latestpost").show();
    //       $("div.gallery").hide();
    //       break;
    //     default:
    //       changeTitle(`${name} Books`);
    //       $("div.latestpost").hide();
    //       $("div.gallery").show();
    //       loadBook(name);
    //   }
    // });

    //open home by default
    // $('#tabHome').click();

    //logOut
    // $('#logOut').click(logOut);

    //post reivew
    // $('#buttonPosReview').click(postReview);
//});


//POST review
// var postReview = function(e) {
//   e.preventDefault();
//
//   var upLoalImgUrl = endPointUrl + 'webresources/photo';
//   var postReviewUrl = endPointUrl + 'webresources/posts';
//
//   var data = new FormData();
//   var file = $("#imgFile")[0].files[0];
//   data.append('file', file);
//
//   var title = $('#inputBookTitle').val();
//   var author = $('#inputBookAuthor').val();
//   var review = $('#inputReview').val();
//
//   //checkbox
//   var input = $('form input:checkbox');
//   var categories = [];
//   $.each(input, function(i, item) {
//     if ($(item).prop('checked')) {
//       // var category = item.prop('');
//       var category = $(item).prop('name');
//       categories.push(category);
//     }
//   });

  //Upload img File
//   $.ajax({
//             type: "POST",
//             url: upLoalImgUrl,
//             data: data,
//             async: false,
//             cache: false,
//             contentType: false,
//             enctype: 'multipart/form-data',
//             processData: false,
//             success: function (returnedData) {
//               console.log('upload picture success');
//               //Upload img success => upload Review
//               var obj = jQuery.parseJSON(returnedData);
//               var imgUrl = obj.url;
//               var title = $('#inputBookTitle').val();
//               var author = $('#inputBookAuthor').val();
//               var review = $('#inputReview').val();
//
//               //checkbox
//               var input = $('form input:checkbox');
//               var categories = [];
//               $.each(input, function(i, item) {
//                 if ($(item).prop('checked')) {
//                   // var category = item.prop('');
//                   var category = $(item).prop('name');
//                   categories.push(category);
//                 }
//               });
//
//               var object =   { title: title, author : author, path : imgUrl, review: review, categories: categories};
//               var postRequest = JSON.stringify(object);
//
//
//               //Post book modalreview
//               $.post(postReviewUrl, postRequest, function(returnedData){
//                 //reload tab
//                 console.log('currentTab: ' + currentTab );
//                 $(`#${currentTab}`).click();
//               });
//             }
//         });
//
// }

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
